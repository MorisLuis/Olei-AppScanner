import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

export const Inventory = () => {

    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { inventoryCreated } = useContext(InventoryBagContext);
    const { navigate } = useNavigation<any>();

    const navigateToInventaryDetails = (selectedProduct: PorductInterface) => {
        navigate('InventoryDetails', { selectedProduct });
    };

    const navigateToSearch = () => {
        navigate('SearchProduct');
    };

    const renderItem = ({ item }: { item: PorductInterface }) => {
        return <ProductInventoryCard product={item} onClick={() => handlePress(item)} />;
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View>
                    <Text>Cargando...</Text>
                </View> : null
        );
    };

    const handleGetProductsByStock = async () => {
        setIsLoading(true);
        const products = await getProductsByStock(currentPage)
        setProductsInInventory(prevProducts =>
            inventoryCreated ? products :
                prevProducts ? [...prevProducts, ...products] : products
        );
        setIsLoading(false);
    }

    const loadMoreItem = () => {
        if (inventoryCreated) return;
        setCurrentPage(currentPage + 1);
    };

    const handlePress = (item: PorductInterface) => {
        navigateToInventaryDetails(item)
    };

    const resetInventory = () => {
        setCurrentPage(1);
        setProductsInInventory([]);
    };

    useEffect(() => {
        if (!inventoryCreated) return;
        resetInventory();
        handleGetProductsByStock();
    }, [inventoryCreated]);


    useEffect(() => {
        if (inventoryCreated) return;
        handleGetProductsByStock()
    }, [currentPage])

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}> Inventario </Text>
                <View style={styles.actions}>
                    <Icon
                        name="search-outline"
                        size={30}
                        style={styles.iconSearch}
                        onPress={navigateToSearch}
                    />
                </View>
            </View>
            <FlatList
                data={productsInInventory}
                renderItem={renderItem}
                keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        display: "flex",
        fontSize: 40
    },
    actions: {
        display: "flex",
        flexDirection: "row"
    },
    iconSearch: {
        marginLeft: 15
    }
})