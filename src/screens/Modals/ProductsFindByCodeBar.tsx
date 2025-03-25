import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProductInterface from '../../interface/product';
import {ProductInventoryCard} from '../../components/Cards/ProductInventoryCard';
import {ProductFindByCodebarInputStyles} from '../../theme/ModalRenders/ProductFindByCodebarInputTheme';
import {useTheme} from '../../context/ThemeContext';
import {AppNavigationProp} from '../../interface/navigation';
import ModalBottom from '../../components/Modals/ModalBottom';

interface ProductFindByCodeBarInterface {
  route?: {
    params: {
      products: ProductInterface[];
    };
  };
}

export const ProductsFindByCodeBar = ({
  route,
}: ProductFindByCodeBarInterface) => {
  const {products} = route?.params || {};
  const navigation = useNavigation<AppNavigationProp>();
  const {theme} = useTheme();

  const onSelectProduct = (product: ProductInterface) => {
    navigation.goBack();
    navigation.navigate('[Modal] - scannerResultScreen', {product: product});
  };

  if (!products) return;

  return (
    <ModalBottom visible={true} onClose={() => navigation.goBack()}>
      <View style={ProductFindByCodebarInputStyles(theme).ProductFindByCodeBar}>
        <Text style={ProductFindByCodebarInputStyles(theme).title}>
          Productos
        </Text>
        {products.map((product) => (
          <ProductInventoryCard
            key={`${product.Codigo}-${product.Id_Marca}-${product.Id_Almacen}`}
            product={product}
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </View>
    </ModalBottom>
  );
};
