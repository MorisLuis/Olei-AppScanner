import React, {useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getProductByCodeBar} from '../../services/products';
import {globalStyles} from '../../theme/appTheme';
import {inputStyles} from '../../theme/UI/inputs';
import {modalRenderstyles} from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import {SettingsContext} from '../../context/settings/SettingsContext';
import {useTheme} from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import ProductInterface from '../../interface/product';
import {AppNavigationProp} from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';

type typeOfSearch = 'code' | 'barcode' | 'sku';

export const SearchCodebarWithInput = () => {
  const {updateCodeBarProvider} = useContext(SettingsContext);
  const navigation = useNavigation<AppNavigationProp>();
  const {theme, typeTheme} = useTheme();
  const {handleError} = useErrorHandler();

  const [Barcode, onChangeBarcode] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState<typeOfSearch>('code');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const buttondisabled = Barcode.length < 1 || loadingSearch;

  const handleSearchProductByCodebarInput = async () => {
    updateCodeBarProvider('');
    setLoadingSearch(true);

    let response;
    try {
      if (typeOfSearch === 'code') {
        response = await getProductByCodeBar({codigo: Barcode});
        if (response.error) handleError(response.error);
        handleNavigatoToProduct(response);
      } else if (typeOfSearch === 'sku') {
        updateCodeBarProvider(Barcode);
        response = await getProductByCodeBar({sku: Barcode});
        if (response.error) handleError(response.error);
        handleNavigatoToProduct(response);
      } else {
        updateCodeBarProvider(Barcode);
        response = await getProductByCodeBar({codeBar: Barcode});
        if (response.error) handleError(response.error);
        handleNavigatoToProduct(response);
      }
    } catch (error) {
      handleError(error, true);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleNavigatoToProduct = (products: ProductInterface[]) => {
    navigation.goBack();
    if (products.length === 1) {
      navigation.navigate('[Modal] - scannerResultScreen', {
        product: products[0],
      });
    } else if (products.length > 0) {
      navigation.navigate('[Modal] - productsFindByCodeBarModal', {
        products: products,
      });
    } else {
      navigation.navigate('[Modal] - scannerResultScreen', {
        product: products[0],
      });
    }
  };

  const handleCloseModal = () => {
    navigation.goBack();
  };

  return (
    <ModalBottom visible={true} onClose={handleCloseModal}>
      <View style={modalRenderstyles(theme).SearchCodebarWithInput}>
        <Text
          style={
            modalRenderstyles(theme, typeTheme).SearchCodebarWithInput_title
          }>
          Escribe el {typeOfSearch === 'code' ? 'Codigo' : 'Codigo de barras'}:
        </Text>
        <TextInput
          style={[
            inputStyles(theme).input,
            globalStyles(theme).globalMarginBottomSmall,
          ]}
          onChangeText={onChangeBarcode}
          value={Barcode}
          placeholder="Ej: 6541q"
          placeholderTextColor={theme.color_gray}
        />

        <ButtonCustum
          title={'Buscar producto'}
          onPress={handleSearchProductByCodebarInput}
          disabled={buttondisabled}
          loading={loadingSearch}
          extraStyles={{
            marginBottom:
              globalStyles(theme).globalMarginBottomSmall.marginBottom,
          }}
        />

        <View style={modalRenderstyles(theme).optionsContainer}>
          <TouchableOpacity
            style={[
              modalRenderstyles(theme).option,
              typeOfSearch === 'code' && modalRenderstyles(theme).optionActive,
            ]}
            onPress={() => setTypeOfSearch('code')}>
            <Text
              style={
                typeOfSearch === 'code'
                  ? modalRenderstyles(theme, typeTheme).optionTextActive
                  : modalRenderstyles(theme, typeTheme).optionText
              }>
              Codigo de producto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              modalRenderstyles(theme).option,
              typeOfSearch === 'barcode' &&
                modalRenderstyles(theme).optionActive,
            ]}
            onPress={() => setTypeOfSearch('barcode')}>
            <Text
              style={
                typeOfSearch === 'barcode'
                  ? modalRenderstyles(theme, typeTheme).optionTextActive
                  : modalRenderstyles(theme, typeTheme).optionText
              }>
              Codigo de barras
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              modalRenderstyles(theme).option,
              typeOfSearch === 'sku' && modalRenderstyles(theme).optionActive,
            ]}
            onPress={() => setTypeOfSearch('sku')}>
            <Text
              style={
                typeOfSearch === 'sku'
                  ? modalRenderstyles(theme, typeTheme).optionTextActive
                  : modalRenderstyles(theme, typeTheme).optionText
              }>
              SKU
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalBottom>
  );
};
