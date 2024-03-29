import React, { useEffect, useLayoutEffect, useState } from 'react'

import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getSearchProductInStock } from '../services/Search/products';
import PorductInterface from '../interface/product';
import { ProductItemSearch } from '../components/Cards/ProductItemSearch';
import { LoadingScreen } from './LoadingScreen';
import { colores, globalStyles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomBackButton } from '../components/Ui/CustomHeader';

export const SearchProductScreen = () => {

    const navigation = useNavigation<any>();
    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const getSearchData = async (searchTerm: string) => {
        const products = await getSearchProductInStock(searchTerm ? searchTerm : "")
        setProductsInInventory(products);
    }

    const renderItem = ({ item }: { item: PorductInterface }) => {
        return (
            <ProductItemSearch product={item} onClick={() => handlePress(item)} />
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: PorductInterface) => {
        navigation.navigate('InventoryDetails', { selectedProduct });
    };

    const handlePress = (item: PorductInterface) => {
        navigateToProduct(item)
    };

    useEffect(() => {
        getSearchData("")
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Productos",
            headerLeft: () => <CustomBackButton navigation={navigation} />,
            headerSearchBarOptions: {
                placeholder: "Buscar producto por nombre...",
                placeholderTextColor: colores.color_blue,
                onChangeText: (event: any) => {
                    getSearchData(event.nativeEvent.text);
                },
            }
        });
    }, [navigation]);


    return (productsInInventory && productsInInventory.length > 0) ? (
        <SafeAreaView style={styles.SearchProductScreen}>
            <View style={styles.content}>
                <FlatList
                    data={productsInInventory}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                />
            </View>
        </SafeAreaView>
    )
        :
        <LoadingScreen />
}


const styles = StyleSheet.create({
    SearchProductScreen: {
        backgroundColor: colores.background_color
    },
    content:{
        paddingHorizontal:  globalStyles.globalPadding.padding,
        marginTop: globalStyles.globalPadding.padding,
    }
})
