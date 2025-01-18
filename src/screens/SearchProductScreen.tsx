import React, { useContext, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { FlatList, NativeSyntheticEvent, SafeAreaView, Text, TextInputChangeEventData, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
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
import useErrorHandler from '../hooks/useErrorHandler';
import { AppNavigationProp } from '../interface/navigation';

type SearchProductScreenInterface = {
    route?: {
        params: {
            modal: boolean;
            isModal?: boolean;
        };
    };
};

export const SearchProductScreen = ({ route }: SearchProductScreenInterface) => {
    const { modal, isModal } = route?.params ?? {};
    const { codeBar } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler();

    const navigation = useNavigation<AppNavigationProp>();
    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalAdvice, setOpenModalAdvice] = useState(false);
    const [searchingProducts, setSearchingProducts] = useState(false);

    const getSearchData = async (searchTerm: string) => {
        try {
            setSearchingProducts(true);
            const products = await getSearchProductInStock(searchTerm ? searchTerm : "");
            if (products.error) {
                handleError(products.error);
                return;
            }
            setProductsInInventory(products);
        } catch (error) {
            console.log({ error });
            handleError(error);
        } finally {
            setSearchingProducts(false);
        }
    };

    // Crear la función debounced para evitar múltiples llamadas
    const debouncedSearch = useCallback(
        debounce((text: string) => {
            getSearchData(text);
        }, 300),
        [] // Se asegura que debounce se cree solo una vez
    );

    const renderItem = ({ item }: { item: ProductInterface }) => (
        <ProductItemSearch
            fromModal={modal ? modal : false}
            product={item}
            onClick={() => navigateToProduct(item)}
        />
    );

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: ProductInterface) => {
        if (modal) {
            if (isModal) {
                navigation?.goBack();
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
            } else {
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
            }
        } else {
            navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
        }
    };

    useEffect(() => {
        setOpenModalAdvice(modal ? true : false);
        getSearchData("");
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: modal ? false : true,
            headerTitle: "Productos",
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: theme.text_color,
            },
            headerStyle: {
                backgroundColor: theme.background_color,
            },
            headerLeft: () => <CustomBackButton navigation={navigation} />,
            headerSearchBarOptions: {
                placeholder: "Buscar producto por nombre...",
                tintColor: theme.text_color,
                textColor: theme.text_color,
                onChangeText: (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    debouncedSearch(event.nativeEvent.text);
                },
            },
        });
    }, [navigation, theme, debouncedSearch]);

    if (searchingProducts) {
        return (
            <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
                <View style={SearchProductScreenStyles(theme).content}>
                    <Text>Buscando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return productsInInventory && productsInInventory.length > 0 ? (
        <>
            <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
                <View style={SearchProductScreenStyles(theme).content}>
                    <FlatList
                        data={productsInInventory}
                        renderItem={renderItem}
                        keyExtractor={(product) => product.UniqueKey || product.Codigo}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
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
                            Selecciona un producto al cual podrás asignarle el código de barras:{" "}
                            <Text style={{ fontWeight: 'bold' }}>{codeBar}</Text>
                        </Text>
                        <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage2}>
                            Los productos con mensaje "No tiene codigo" son elegibles por que aun no tienen codigo de barras.
                        </Text>
                    </View>
                </View>
            </ModalBottom>
        </>
    ) : (
        <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
            <View style={SearchProductScreenStyles(theme).content}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))}
            </View>
        </SafeAreaView>
    );
};
