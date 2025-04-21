import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  getProductsByStock,
  getTotalProductsByStock,
} from '../../services/products';
import { ProductInventoryCardComponent } from '../../components/Cards/ProductInventoryCard';
import ProductInterface from '../../interface/product';
import { ProductInventoryCardSkeleton } from '../../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { InventoryScreenStyles } from '../../theme/InventoryScreenTheme';
import { AppNavigationProp } from '../../interface/navigation';
import { useInfiniteScrollWithService } from '../../hooks/useInfiniteScrollWithService';
import { ErroScreen } from '../ErrorScreen';
import { NUMBER_0 } from '../../utils/globalConstants';

const TOTAL_PRODUCTS_EMPTY = 0;

export const Inventory: React.FC = () => {

  const { handleCodebarScannedProcces } = useContext(SettingsContext);
  const { navigate } = useNavigation<AppNavigationProp>();
  const [totalProducts, settotalProducts] = useState(TOTAL_PRODUCTS_EMPTY)
  const { theme, typeTheme } = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useInfiniteScrollWithService<ProductInterface>({
    queryKey: 'productsByStock',
    service: getProductsByStock,
  });
  const productsData = data?.pages[NUMBER_0];

  const getTotalProducts = async (): Promise<void> => {
    const { total } = await getTotalProductsByStock();
    settotalProducts(total ?? TOTAL_PRODUCTS_EMPTY);
  };

  useEffect(() => {
    getTotalProducts()
  }, [])

  const handlePressProduct = useCallback(
    (selectedProduct: ProductInterface) => {
      handleCodebarScannedProcces(false);
      navigate('[ProductDetailsPage] - inventoryDetailsScreen', {
        selectedProduct,
      });
    },
    [handleCodebarScannedProcces, navigate],
  );

  const renderHeader = (): JSX.Element => {
    return (
      <View style={InventoryScreenStyles(theme).header}>
        <Text style={InventoryScreenStyles(theme).title}>Inventario</Text>
        {!isLoading && (
          <View style={InventoryScreenStyles(theme).actions}>
            <Icon
              name="search-outline"
              size={30}
              style={InventoryScreenStyles(theme).iconSearch}
              onPress={() => navigate('searchProductScreen')}
              color={iconColor}
            />
          </View>
        )}
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: ProductInterface }) => {
      return (
        <ProductInventoryCardComponent
          product={item}
          onClick={() => handlePressProduct(item)}
        />
      );
    },
    [handlePressProduct],
  );

  const renderFooter = (): JSX.Element | null => {
    const visible = !isLoading && (productsData?.length || TOTAL_PRODUCTS_EMPTY) >= (totalProducts ?? TOTAL_PRODUCTS_EMPTY);

    if (isLoading) {
      return (
        <View>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return visible ? (
      <View style={InventoryScreenStyles(theme).footerContent}>
        <Text style={InventoryScreenStyles(theme).footerMessage}>
          Estos son todos los productos que tienes.
        </Text>
      </View>
    ) : null;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
        <View style={InventoryScreenStyles(theme).content}>
          {renderHeader()}
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductInventoryCardSkeleton key={index} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <ErroScreen
        onRetry={() => refetch()}
        title={'No pudimos cargar los productos.'}
      />
    );
  };

  return (
    <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
      <View style={InventoryScreenStyles(theme).content}>
        {renderHeader()}
        <FlatList
          data={productsData || []}
          renderItem={renderItem}
          keyExtractor={(product) => `${product.Codigo}-${product.Id_Marca}`}
          ListFooterComponent={renderFooter}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      </View>
    </SafeAreaView>
  );
};
