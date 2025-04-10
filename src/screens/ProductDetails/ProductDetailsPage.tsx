import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';

import {getProductDetails} from '../../services/products';
import ProductInterface from '../../interface/product';
import {ProductDetailsSkeleton} from '../../components/Skeletons/ProductDetailsSkeleton';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppNavigationStackParamList} from '../../navigator/AppNavigation';
import {AppNavigationProp} from '../../interface/navigation';
import {ProductDetailsContent} from './ProductDetailsContent';
import {SettingsContext} from '../../context/settings/SettingsContext';

type ProductDetailsPageRouteProp = RouteProp<
  AppNavigationStackParamList,
  '[ProductDetailsPage] - productDetailsScreen'
>;
type ProductDetailsInventorySectionPageRouteProp = RouteProp<
  AppNavigationStackParamList,
  '[ProductDetailsPage] - inventoryDetailsScreen'
>;

interface ProductDetailsPageInterface {
  route:
    | ProductDetailsPageRouteProp
    | ProductDetailsInventorySectionPageRouteProp;
}

export const ProductDetailsPage = ({route}: ProductDetailsPageInterface) : JSX.Element => {

  const {selectedProduct, hideActions} = route.params ?? {};
  const {Codigo, Marca} = selectedProduct ?? {};
  const shouldCleanUp = useRef(true);
  const {handleError} = useErrorHandler();
  const navigation = useNavigation<AppNavigationProp>();
  const {codeBarStatus} = useContext(SettingsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [productDetailsData, setProductDetailsData] = useState<ProductInterface | null>(null);

  const handleGetProductDetails = useCallback(async () : Promise<void> => {
    try {
      setIsLoading(true);
      const { product } = await getProductDetails(Codigo, Marca);
      if (!product) return handleError('No hay producto');
      setProductDetailsData(product);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, Codigo, Marca]);

  const handleOptionsToUpdateCodebar = useCallback(() => {
    if (!productDetailsData?.Codigo || !productDetailsData?.Id_Marca) {
      return;
    }

    navigation.navigate('CodebarUpdateNavigation', {
      Id_Marca: productDetailsData?.Id_Marca,
      Codigo: productDetailsData?.Codigo,
    });
  }, [navigation, productDetailsData]);

  const handleAddToInventory = useCallback(() => {
    if (!selectedProduct) return;

    shouldCleanUp.current = false;
    navigation.navigate('[Modal] - scannerResultScreen', {
      product: selectedProduct,
      fromProductDetails: true,
    });
  }, [navigation, selectedProduct]);

  useEffect(() => {
    handleGetProductDetails();
  }, [handleGetProductDetails, codeBarStatus]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!productDetailsData) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <ProductDetailsContent
      productDetailsData={productDetailsData}
      handleOptionsToUpdateCodebar={handleOptionsToUpdateCodebar}
      handleAddToInventory={handleAddToInventory}
      hideActions={hideActions}
    />
  );
};
