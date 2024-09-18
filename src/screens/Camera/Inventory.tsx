import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, VirtualizedList } from 'react-native';

import { getProductsByStock, getTotalProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import ProductInterface from '../../interface/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductInventoryCardSkeleton } from '../../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { InventoryScreenStyles } from '../../theme/InventoryScreenTheme';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import useErrorHandler from '../../hooks/useErrorHandler';

export const Inventory = () => {
    const { handleCodebarScannedProcces } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleError } = useErrorHandler()

    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Lógica mejorada para mostrar el mensaje solo cuando no hay productos y no está cargando
    const showNoProductsMessage = productsInInventory.length === 0 && !isLoading;

    const handleGetProductsByStock = async (page: number) => {

        try {
            setIsLoading(true);
            const products = await getProductsByStock(page);
            if (products.error) {
                handleError(products.error);
                return;
            }
            setProductsInInventory((prevProducts) => {
                const newProducts = products.filter(
                    (product: any) =>
                        !prevProducts.some(
                            (prevProduct) =>
                                prevProduct.Codigo === product.Codigo &&
                                prevProduct.Id_Marca === product.Id_Marca &&
                                prevProduct.Marca === product.Marca &&
                                prevProduct.Id_Almacen === product.Id_Almacen &&
                                prevProduct.Id_ListaPrecios === product.Id_ListaPrecios
                        )
                );
                return prevProducts ? [...prevProducts, ...newProducts] : newProducts;
            });
        } catch (error) {
            handleError(error);
        } finally{
            setIsLoading(false);
        }
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePressProduct = (selectedProduct: ProductInterface) => {
        handleCodebarScannedProcces(false);
        navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
    };

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => {
        return <ProductInventoryCard product={item} onClick={() => handlePressProduct(item)} />;
    }, []);

    const renderLoader = () => {
        return isLoading ? (Array.from({ length: 10 }).map((_, index) => (<ProductInventoryCardSkeleton key={index} />))) : null;
    };

    const renderFooter = () => {
        return (
            <View style={InventoryScreenStyles(theme).footerContent}>
                {productsInInventory.length > 0 && productsInInventory.length >= totalProducts ?
                    <Text style={InventoryScreenStyles(theme).footerMessage}>Estos son todos los productos que tienes. ({totalProducts})</Text> : renderLoader()
                }
            </View>
        );
    };

    const getItem = (data: ProductInterface[], index: number): ProductInterface => {
        return data[index];
    };

    const getItemCount = () => productsInInventory.length;

    const getKey = (item: ProductInterface) => `${item.Codigo}-${item.Id_Marca}-${item.Marca}-${item.Id_Almacen}-${item.Id_ListaPrecios}`;

    useEffect(() => {
        handleGetProductsByStock(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            try {
                const total = await getTotalProductsByStock();
                if (total.error) {
                    handleError(total.error);
                    return;
                }
                setTotalProducts(total);
            } catch (error) {
                handleError(error)
            }
        }
        getTotalCountOfProducts();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setCurrentPage(1);
            handleGetProductsByStock(1);
        }, [])
    );

    return (
        <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
            <View style={InventoryScreenStyles(theme).content}>
                <View style={InventoryScreenStyles(theme).header}>
                    <Text style={InventoryScreenStyles(theme).title}>Inventario</Text>
                    {
                        (!showNoProductsMessage && !isLoading) &&
                        <View style={InventoryScreenStyles(theme).actions}>
                            <Icon
                                name="search-outline"
                                size={30}
                                style={InventoryScreenStyles(theme).iconSearch}
                                onPress={() => navigate('searchProductScreen')}
                                color={iconColor}
                            />
                        </View>
                    }
                </View>

                {/* Mostrar mensaje si no hay productos y no se está cargando */}
                {showNoProductsMessage ? (
                    <EmptyMessageCard
                        title='No hay productos'
                        message='Hablar con el administrador.'
                    />
                ) : (
                    <VirtualizedList
                        data={productsInInventory}
                        initialNumToRender={5}
                        renderItem={renderItem}
                        keyExtractor={(item) => getKey(item)}
                        getItem={getItem}
                        getItemCount={getItemCount}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};
