import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {ProductInventoryConfirmationCardTheme} from '../../theme/UI/cardsStyles';
import {ProductInterfaceBag} from '../../interface/product.js';
import {useTheme} from '../../context/ThemeContext';

interface ProductInventoryConfirmationCardInterface {
  product: ProductInterfaceBag;
  onClick?: () => void;
}

export const ProductInventoryConfirmationCard = ({
  product,
  onClick,
}: ProductInventoryConfirmationCardInterface) :  JSX.Element => {
  const {theme, typeTheme} = useTheme();

  return (
    <TouchableOpacity
      style={
        ProductInventoryConfirmationCardTheme(theme, typeTheme)
          .ProductInventoryConfirmationCard
      }
      onPress={onClick}>
      <View style={ProductInventoryConfirmationCardTheme(theme).data}>
        <View style={ProductInventoryConfirmationCardTheme(theme).information}>
          <View>
            <Text
              style={ProductInventoryConfirmationCardTheme(theme).description}>
              {product.Descripcion}
            </Text>
          </View>

          <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
            <Text style={ProductInventoryConfirmationCardTheme(theme).label}>
              Codigo:
            </Text>
            <Text
              style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>
              {product?.Codigo}
            </Text>
          </View>

          <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
            <Text style={ProductInventoryConfirmationCardTheme(theme).label}>
              Cantidad:
            </Text>
            <Text
              style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>
              {product?.Cantidad}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
