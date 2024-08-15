import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getSearchProductInStock } from '../services/Search/products';
import ProductInterface from '../interface/product';
import { ProductItemSearch } from '../components/Cards/ProductItemSearch';
import { CustomBackButton } from '../components/Ui/CustomHeader';
import ModalBottom from '../components/Modals/ModalBottom';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductInventoryCardSkeleton } from '../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../context/settings/SettingsContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchProductScreenStyles } from '../theme/SearchProductScreenTheme';
import { useTheme } from '../context/ThemeContext';


type SearchProductScreenInterface = {
    route?: {
        params: {
            modal: boolean;
            isModal?: boolean,
        };
    };
};


export const SearchProductScreen = ({ route }: SearchProductScreenInterface) => {

    const { modal, isModal } = route?.params ?? {};
    const { codeBar } = useContext(SettingsContext,);
    const { theme, typeTheme } = useTheme();


    const navigation = useNavigation<any>();
    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalAdvice, setOpenModalAdvice] = useState(false)

    const getSearchData = async (searchTerm: string) => {
        const products = await getSearchProductInStock(searchTerm ? searchTerm : "")
        setProductsInInventory(products);
    }

    const renderItem = ({ item }: { item: ProductInterface }) => {
        return (
            <ProductItemSearch fromModal={modal ? modal : false} product={item} onClick={() => navigateToProduct(item)} />
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: ProductInterface) => {

        if (modal) {
            if (isModal) {
                navigation?.goBack()
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromUpdateCodebar: true })
            } else {
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromUpdateCodebar: true })
            }
        } else {
            navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
        }
    };


    useEffect(() => {
        setOpenModalAdvice(modal ? true : false)
        getSearchData("")
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: modal ? false : true,
            headerTitle: "Productos",
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: theme.text_color
            },
            headerStyle: {
                backgroundColor: theme.background_color
            },
            headerLeft: () =>
                <CustomBackButton
                    navigation={navigation}
                />,
            headerSearchBarOptions: {
                placeholderTextColor: theme.color_green,
                placeholder: "Buscar producto por nombre...",
                tintColor: theme.text_color,
                textColor: theme.text_color,
                onChangeText: (event: any) => {
                    getSearchData(event.nativeEvent.text);
                },
            }
        });
    }, [navigation, theme]);

    return (productsInInventory && productsInInventory.length > 0) ? (

        <>
            <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
                <View style={SearchProductScreenStyles(theme).content}>
                    <FlatList
                        data={productsInInventory}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                    />
                </View>
            </SafeAreaView>

            <ModalBottom
                visible={openModalAdvice}
                onClose={() => setOpenModalAdvice(false)}

                blurNotAvailable={true}
                blurType="dark"
                blurAmount={0}
            >
                <View style={SearchProductScreenStyles(theme, typeTheme).searchAdvice}>
                    <View style={SearchProductScreenStyles(theme, typeTheme).adviceHeader}>
                        <Icon name="bulb" size={hp("3%")} color={typeTheme === 'light' ? "red" : "white"} />
                        <Text style={SearchProductScreenStyles(theme, typeTheme).titleHeader}>Asignar producto</Text>
                    </View>
                    <View style={SearchProductScreenStyles(theme, typeTheme).adviceMessage}>
                        <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage1}>
                            Selecciona un producto al cual podrás asignarle el código de barras: <Text style={{ fontWeight: 'bold' }}>{codeBar}</Text>
                        </Text>

                        <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage2}>Los productos con mensaje "No tiene codigo" son elegibles por que aun no tienen codigo de barras.</Text>
                    </View>
                </View>
            </ModalBottom>
        </>
    )
        :
        <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
            <View style={SearchProductScreenStyles(theme).content}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))}
            </View>
        </SafeAreaView>
}






