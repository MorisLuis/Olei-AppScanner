import React, { useCallback, useContext } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useTheme } from '../../context/ThemeContext';
import ProductInterface from '../../interface/product';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { ProductDetailItem } from './ProductDetailsItem';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import FooterScreen from '../../components/Navigation/Footer';
import { globalStyles } from '../../theme/appTheme';
import { AuthContext } from '../../context/auth/AuthContext';

interface ProductDetailsContentInterface {
  productDetailsData: ProductInterface;
  handleOptionsToUpdateCodebar: () => void;
  handleAddToInventory: () => void;
  hideActions?: boolean;
}

const ACCION_SALIDA = 2;
const NO_EXISTENCIA_LIMIT = 0;
const EXSITENCIAS_EMPTY = 0;

export const ProductDetailsContent = React.memo(
  ({
    productDetailsData,
    handleOptionsToUpdateCodebar,
    handleAddToInventory,
    hideActions = false,
  }: ProductDetailsContentInterface): JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const { SalidaSinExistencias, Id_TipoMovInv } = useContext(AuthContext).user ?? {};
    const showLimit = Id_TipoMovInv?.Id_TipoMovInv === ACCION_SALIDA && SalidaSinExistencias === NO_EXISTENCIA_LIMIT;
    const dontShowAddButton = showLimit && productDetailsData.Existencia <= EXSITENCIAS_EMPTY;

    const memoizedHandleOptionsToUpdateCodebar = useCallback(
      handleOptionsToUpdateCodebar,
      [handleOptionsToUpdateCodebar],);

    const memoizedHandleAddToInventory = useCallback(handleAddToInventory, [handleAddToInventory]);

    const getIconColor = (): string => (typeTheme === 'dark' ? 'white' : 'black');

    return (
      <View style={globalStyles().flex}>
        <ScrollView contentContainerStyle={!hideActions && { paddingBottom: hp('20%') }}>
          <View style={productDetailsStyles(theme).ProductDetailsPage}>
            <View style={productDetailsStyles(theme).content}>
              {/* Imagen del Producto */}
              <View
                style={productDetailsStyles(theme, typeTheme).imageContainer}>
                {productDetailsData.imagen ? (
                  <Image
                    style={productDetailsStyles(theme).image}
                    source={{ uri: productDetailsData.imagen }}
                  />
                ) : (
                  <View style={productDetailsStyles(theme).notImage}>
                    <Icon name="camera" size={24} color={getIconColor()} />
                    <Text
                      style={productDetailsStyles(theme).notImageText}
                      numberOfLines={2}>
                      OLEI SOFTWARE
                    </Text>
                  </View>
                )}
              </View>

              {/* Descripción */}
              <View style={productDetailsStyles(theme).header}>
                <Text style={productDetailsStyles(theme).description}>
                  {productDetailsData.Descripcion}
                </Text>
              </View>

              {/* Información */}
              <View style={productDetailsStyles(theme, typeTheme).information}>
                <ProductDetailItem
                  theme={theme}
                  label="Código:"
                  value={productDetailsData.Codigo}
                />
                <ProductDetailItem
                  theme={theme}
                  label="Existencia:"
                  value={productDetailsData.Existencia}
                />
                <ProductDetailItem
                  theme={theme}
                  label="Familia:"
                  value={productDetailsData.Familia}
                />
                <ProductDetailItem
                  theme={theme}
                  label="Marca:"
                  value={productDetailsData.Marca}
                />
                {/* <ProductDetailItem theme={theme} label="Marca:" value={productDetailsData.Id_Marca} /> */}

                {productDetailsData.CodBar && (
                  <ProductDetailItem
                    theme={theme}
                    label="Código de barras:"
                    value={productDetailsData.CodBar}
                    isLastChild
                  />
                )}
              </View>

              {/* Botón para Código de Barras */}
              {!productDetailsData.CodBar && !hideActions && (
                <ButtonCustum
                  title="Crear código de barras"
                  onPress={memoizedHandleOptionsToUpdateCodebar}
                  disabled={false}
                  extraStyles={{
                    marginTop: globalStyles().globalMarginBottom.marginBottom,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        {!hideActions && (
          <FooterScreen
            buttonTitle={
              dontShowAddButton ? 'No hay existencias' : 'Agregar a inventario'
            }
            buttonOnPress={memoizedHandleAddToInventory}
            buttonDisabled={dontShowAddButton}
            buttonProperties={{
              buttonColor: dontShowAddButton
                ? 'color_red_light'
                : 'color_yellow',
              textColor: 'text_color',
            }}
          />
        )}
      </View>
    );
  },
);

ProductDetailsContent.displayName = "ProductDetailsContent"; // Asigna el displayName aquí