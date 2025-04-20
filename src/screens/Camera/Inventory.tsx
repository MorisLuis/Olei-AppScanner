import React, {useCallback, useContext, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  getProductsByStock,
  getTotalProductsByStock,
} from '../../services/products';
import {ProductInventoryCardComponent} from '../../components/Cards/ProductInventoryCard';
import ProductInterface from '../../interface/product';
import {ProductInventoryCardSkeleton} from '../../components/Skeletons/ProductInventoryCardSkeleton';
import {SettingsContext} from '../../context/settings/SettingsContext';
import {useTheme} from '../../context/ThemeContext';
import {InventoryScreenStyles} from '../../theme/InventoryScreenTheme';
import {EmptyMessageCard} from '../../components/Cards/EmptyMessageCard';
import {AppNavigationProp} from '../../interface/navigation';
import {useLoadMoreData} from '../../hooks/useLoadMoreData';
import {ErroScreen} from '../ErrorScreen';

const PAGE_NUMBER_INITIAL = 1;
const TOTAL_PRODUCTS_EMPTY = 0;

export const Inventory: React.FC = () => {
  const {handleCodebarScannedProcces} = useContext(SettingsContext);
  const {navigate} = useNavigation<AppNavigationProp>();
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const fetchInitialData = useCallback(async (): Promise<
    ProductInterface[]
  > => {
    const {products} = await getProductsByStock(PAGE_NUMBER_INITIAL);
    return products;
  }, []);

  const fetchPaginatedData = useCallback(
    async (_: unknown, page?: number): Promise<ProductInterface[]> => {
      const {products} = await getProductsByStock(page as number);
      return products;
    },
    [],
  );

  const fetchTotalCount = useCallback(async (): Promise<number> => {
    const {total} = await getTotalProductsByStock();
    return total ?? TOTAL_PRODUCTS_EMPTY;
  }, []);

  const {
    data,
    handleLoadMore,
    handleResetData,
    isLoading,
    isButtonLoading,
    total,
    hasError,
  } = useLoadMoreData({
    fetchInitialData,
    fetchPaginatedData,
    fetchTotalCount,
  });

  const showNoProductsMessage = total === TOTAL_PRODUCTS_EMPTY && !isLoading;

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
        {!showNoProductsMessage && !isLoading && (
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
    ({item}: {item: ProductInterface}) => {
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
    const visible =
      !isLoading && data?.length >= (total ?? TOTAL_PRODUCTS_EMPTY);

    if (isButtonLoading) {
      return (
        <View>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return visible ? (
      <View style={InventoryScreenStyles(theme).footerContent}>
        <Text style={InventoryScreenStyles(theme).footerMessage}>
          Estos son todos los productos que tienes. ({total})
        </Text>
        {/* {renderLoader()} */}
      </View>
    ) : null;
  };

  useEffect(() => {
    handleResetData();
  }, [handleResetData]);

  if (isLoading) {
    return (
      <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
        <View style={InventoryScreenStyles(theme).content}>
          {renderHeader()}
          {Array.from({length: 10}).map((_, index) => (
            <ProductInventoryCardSkeleton key={index} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (hasError) {
    return (
      <ErroScreen
        onRetry={handleResetData}
        title={'No pudimos cargar los productos.'}
      />
    );
  }

  return (
    <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
      <View style={InventoryScreenStyles(theme).content}>
        {renderHeader()}

        {/* Mostrar mensaje si no hay productos y no se está cargando */}
        {showNoProductsMessage ? (
          <EmptyMessageCard
            title="No hay productos"
            message="Hablar con el administrador."
          />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(product) => `${product.Codigo}-${product.Id_Marca}`}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
