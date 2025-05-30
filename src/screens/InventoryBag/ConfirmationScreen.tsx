import React, { useCallback, useContext, useState, useMemo } from 'react';
import { SafeAreaView, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProductInventoryConfirmationCard } from '../../components/Cards/ProductInventoryConfirmationCard';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProductInterfaceBag } from '../../interface/product';
import { CombineNavigationProp } from '../../interface/navigation';
import FooterScreen from '../../components/Navigation/Footer';
import { NUMBER_0 } from '../../utils/globalConstants';
import { globalStyles } from '../../theme/appTheme';
import { useApiMutation } from '../../hooks/useApiMutation';
import Toast from 'react-native-toast-message';

const INITIAL_PAGE = 1;
const PAGE_SIZE = 5;
const END_REACHED_THRESHOLD = 0.5;
const ITEMS_EMPTY = 0;

export const ConfirmationScreen = (): JSX.Element => {
  const { typeTheme, theme } = useTheme();
  const { getTypeOfMovementsName, user } = useContext(AuthContext);
  const { bag, cleanBag, numberOfItems, postInventory } = useContext(InventoryBagContext);
  const { navigate, reset } = useNavigation<CombineNavigationProp>();
  const [errorFound, setErrorFound] = useState<boolean>(false)

  const { mutate, isPending } = useApiMutation(postInventory, {
    onSuccess: () => {
      cleanBag();
      setCreateInventaryLoading(false);
      reset({
        index: 0,
        routes: [{ name: 'succesMessageScreen' }]
      });
    },
    onError: (error) => {
      const errorMessage = (error?.response?.data as { message: string })?.message || 'Error con inventario - 500';
      setCreateInventaryLoading(false);
      setErrorFound(true);
      Toast.show({
        type: 'tomatoError',
        text1: errorMessage,
      });
    }

  });

  const iconColor = theme.color_tertiary;
  const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize] = useState(PAGE_SIZE);

  const filteredBag = useMemo(() => {
    return bag.slice(NUMBER_0, page * pageSize);
  }, [bag, page, pageSize]);

  const renderItem = useCallback(
    ({ item }: { item: ProductInterfaceBag }): JSX.Element => (
      <ProductInventoryConfirmationCard
        product={item}
        //disabled={createInventaryLoading}
        onClick={() => {
          navigate('[Modal] - editProductInBag', { product: item });
        }}
      />
    ),
    [navigate],
  );

  const onPostInventary = useCallback(async (): Promise<void> => {
    setCreateInventaryLoading(true);
    await mutate(bag);
  }, [bag, mutate]);

  const handleLoadMore = (): void => {
    if (filteredBag.length >= numberOfItems) return;
    setPage((prevPage) => prevPage + INITIAL_PAGE);
  };

  const protectThisPage = numberOfItems <= ITEMS_EMPTY && !createInventaryLoading;

  return !protectThisPage ? (
    <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
      <View style={ConfirmationScreenStyles(theme, typeTheme).content}>
        <FlatList
          data={filteredBag}
          renderItem={renderItem}
          keyExtractor={(product) =>
            `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.key}`
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={END_REACHED_THRESHOLD}
          ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
          ListHeaderComponent={
            <>
              <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader}>
                <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader__icon}>
                  <Icon
                    name={typeTheme === 'light' ? 'document-text-outline' : 'document-text'}
                    size={50}
                    color={iconColor}
                  />
                  <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader__icon__correct}>
                    <Icon name="checkmark-circle" size={22} color={'green'} />
                  </View>
                </View>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeaderTitle}>
                  Confirmación de {getTypeOfMovementsName()}
                </Text>
              </View>
              <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>
                  Productos afectados {numberOfItems}
                </Text>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>
                  Tipo de movimiento: {getTypeOfMovementsName()}
                </Text>
                <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: theme.color_blue }]}>
                  Almacen Origen: {user?.AlmacenNombre}
                </Text>
                {getTypeOfMovementsName() === 'Traspaso' && (
                  <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: theme.color_green }]}>
                    Almacen Destino: {user?.Id_TipoMovInv?.Id_AlmDest}
                  </Text>
                )}
              </View>
              <View>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>
                  Productos
                </Text>
              </View>
            </>
          }
        />
      </View>

      <FooterScreen
        buttonTitle={errorFound ? "Volver a intentar" : "Confirmar"}
        buttonOnPress={onPostInventary}
        buttonDisabled={createInventaryLoading}
        buttonLoading={isPending}
      />
    </View>
  ) : (
    <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
      <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen__redirection}>
        <Text>Redireccionando...</Text>
      </View>
    </SafeAreaView>
  );
};
