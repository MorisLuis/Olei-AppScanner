import React, {useCallback, useContext, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {InventoryBagContext} from '../../context/Inventory/InventoryBagContext';
import {ProductInventoryCard} from '../../components/Cards/ProductInventoryCard';
import {globalFont, globalStyles} from '../../theme/appTheme';
import {EmptyMessageCard} from '../../components/Cards/EmptyMessageCard';
import ModalDecision from '../../components/Modals/ModalDecision';
import {ProductInterfaceBag} from '../../interface/product';
import {inputStyles} from '../../theme/UI/inputs';
import {useTheme} from '../../context/ThemeContext';
import {InventoryBagScreenStyles} from '../../theme/InventoryBagScreenTheme';
import {AppNavigationProp} from '../../interface/navigation';
import {useInventoryBag} from './useInventoryBag';
import ButtonCustum from '../../components/Ui/ButtonCustum';


const INITITAL_PAGE = 1;
const BAG_EMPTY = 0;
const ITEMS_EMPTY = 0;
const PAGE_SIZE_INITIAL = 5;

export const InventoryBagScreen = () : JSX.Element => {

  const {bag, cleanBag, numberOfItems, removeProduct} = useContext(InventoryBagContext);
  const {navigate, goBack} = useNavigation<AppNavigationProp>();
  const {theme, typeTheme} = useTheme();

  const [openModalDecision, setOpenModalDecision] = useState(false);
  const [pageSize] = useState(PAGE_SIZE_INITIAL);
  const inputRef = useRef<TextInput>(null);

  const {searchText, setSearchText, filteredBag, setPage} = useInventoryBag(
    bag,
    pageSize
  );

  const onNavigateToPostInventary = async () : Promise<void>=> {
    goBack();
    navigate('confirmationScreen');
  };

  const handleLoadMore = () : void  => {
    if (filteredBag.length >= numberOfItems) return;
    setPage((prevPage) => prevPage + INITITAL_PAGE);
  };

  const handleCleanTemporal = () : void => {
    setOpenModalDecision(false);
    cleanBag();
    setPage(INITITAL_PAGE);
  };

  const renderItem = useCallback(
    ({item}: {item: ProductInterfaceBag}) => (
      <ProductInventoryCard
        product={item}
        onDelete={() => removeProduct(item)}
        showDelete
      />
    ),
    [removeProduct],
  );

  return (
    <>
      <SafeAreaView
        style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>
        {/* SEARCH BAR */}
        {bag.length > BAG_EMPTY && (
          <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <View
              style={[
                InventoryBagScreenStyles(theme, typeTheme).searchBar,
                inputStyles(theme).input,
              ]}>
              <Icon name={'search'} color="gray" />
              <TextInput
                ref={inputRef}
                placeholder="Buscar producto..."
                placeholderTextColor="gray"
                style={{
                  fontSize: globalFont.font_normal,
                  color: theme.text_color,
                }}
                value={searchText}
                selectionColor={theme.text_color}
                onChangeText={(text: string) => {
                  setSearchText(text);
                  setPage(INITITAL_PAGE);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* PRODUCTS */}
        {filteredBag.length > BAG_EMPTY ? (
          <FlatList
            style={InventoryBagScreenStyles(theme, typeTheme).content}
            data={filteredBag}
            renderItem={renderItem}
            keyExtractor={(product) =>
              `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.key}`
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
            <EmptyMessageCard
              title="No hay productos con ese nombre."
              message="Intenta escribiendo algo diferente."
              icon="sad-outline"
            />
          </View>
        )}

        {/* FOOTER */}
        {numberOfItems > ITEMS_EMPTY && (
          <View style={InventoryBagScreenStyles(theme, typeTheme).footer}>
            <ButtonCustum
              title={'Guardar'}
              onPress={onNavigateToPostInventary}
              disabled={false}
              loading={false}
              extraStyles={{
                marginBottom:
                  globalStyles().globalMarginBottomSmall.marginBottom,
              }}
            />
            <ButtonCustum
              title={'Limpiar carrito'}
              onPress={() => setOpenModalDecision(true)}
              disabled={false}
              loading={false}
              buttonColor="color_red_light"
              textColor="text_color"
            />
          </View>
        )}
      </SafeAreaView>

      <ModalDecision
        visible={openModalDecision}
        message="Seguro de limpiar el inventario actual?">
        <ButtonCustum
          title={'Limpiar carrito'}
          onPress={() => handleCleanTemporal()}
          disabled={false}
          loading={false}
          buttonColor="color_red_light"
          textColor="text_color"
          extraStyles={{
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
          }}
        />

        <ButtonCustum
          title={'Cancelar'}
          onPress={() => setOpenModalDecision(false)}
          disabled={false}
          loading={false}
          butonSecondary
        />
      </ModalDecision>
    </>
  );
};
