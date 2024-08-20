import React, { useCallback, useContext, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../services/products';
import ProductInterface from '../interface/product';
import { buttonStyles } from '../theme/UI/buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../components/Skeletons/ProductDetailsSkeleton';
import { productDetailsStyles } from '../theme/productDetailsTheme';
import { SettingsContext } from '../context/settings/SettingsContext';
import { globalStyles } from '../theme/appTheme';
import { useTheme } from '../context/ThemeContext';

type ProductDetailsPageInterface = {
    route?: {
        params: {
            selectedProduct: { Codigo: string; Marca: string };
            fromModal?: boolean;
            fromUpdateCodebar: boolean
        };
    };
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface) => {
    const { selectedProduct, fromModal, fromUpdateCodebar } = route?.params ?? {};
    const { Codigo, Marca } = selectedProduct ?? {};
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const shouldCleanUp = useRef(true);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation<any>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface | null>(null);

    const handleOptionsToUpdateCodebar = useCallback(() => {
        navigation.navigate('CodebarUpdateNavigation', { productDetails: selectedProduct });
    }, [navigation, selectedProduct]);

    const handleGetProductDetails = async () => {
        try {
            setIsLoading(true);
            const productData = await getProductDetails(Codigo as string, Marca as string);
            setProductDetailsData(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToInventory = useCallback(() => {
        shouldCleanUp.current = false;
        navigation.navigate('[Modal] - scannerResultScreen', { product: selectedProduct, fromProductDetails: true });
    }, [navigation, selectedProduct]);

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();

            return () => {
                if (shouldCleanUp.current) {
                    setProductDetailsData(null);
                }

                if (fromUpdateCodebar) {
                    shouldCleanUp.current = true;
                }
            };
        }, [selectedProduct])
    );

    if (isLoading) {
        return <ProductDetailsSkeleton />;
    }
    
    if (!productDetailsData) {
        return <Text>No se encontraron detalles del producto.</Text>;
    }
    
    return (
        <ProductDetailsContent
            productDetailsData={productDetailsData}
            handleOptionsToUpdateCodebar={handleOptionsToUpdateCodebar}
            handleAddToInventory={handleAddToInventory}
            fromModal={fromModal}
            codeBar={codeBar}
            fromUpdateCodebar={fromUpdateCodebar}
        />
    );
};


interface ProductDetailsContentInterface {
    productDetailsData: ProductInterface,
    handleOptionsToUpdateCodebar: () => void,
    handleAddToInventory: () => void,
    fromModal?: boolean,
    codeBar?: string,
    fromUpdateCodebar?: boolean
}

const ProductDetailsContent = React.memo(({ productDetailsData, handleOptionsToUpdateCodebar, handleAddToInventory, fromModal, codeBar, fromUpdateCodebar }: ProductDetailsContentInterface) => {
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <>
            <ScrollView style={productDetailsStyles(theme).ProductDetailsPage}>
                <View style={productDetailsStyles(theme, typeTheme).imageContainer}>
                    {productDetailsData.imagen ? (
                        <Image
                            style={productDetailsStyles(theme).image}
                            source={{
                                uri: productDetailsData.imagen[0]?.url
                            }}
                        />
                    ) : (
                        <View style={productDetailsStyles(theme).notImage}>
                            <Icon name={'camera'} size={24} color={iconColor} />
                            <Text style={productDetailsStyles(theme).notImageText} numberOfLines={2}>OLEI SOFTWARE</Text>
                        </View>
                    )}
                </View>
                <View style={productDetailsStyles(theme).header}>
                    <Text style={productDetailsStyles(theme).description}>{productDetailsData.Descripcion}</Text>
                </View>

                <View style={productDetailsStyles(theme, typeTheme).information}>
                    <ProductDetailItem theme={theme} label="Codigo:" value={productDetailsData.Codigo} />
                    <ProductDetailItem theme={theme} label="Existencia:" value={productDetailsData.Existencia} />
                    <ProductDetailItem theme={theme} label="Familia:" value={productDetailsData.Familia} />
                    <ProductDetailItem theme={theme} label="Marca:" value={productDetailsData.Marca} />
                    {productDetailsData.CodBar && (
                        <ProductDetailItem theme={theme} label="Codigo de barras:" value={productDetailsData.CodBar} isLastChild />
                    )}
                </View>

                {(!productDetailsData.CodBar && !fromModal) && (
                    <TouchableOpacity
                        style={[buttonStyles(theme).button, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}
                        onPress={handleOptionsToUpdateCodebar}
                    >
                        <Text style={buttonStyles(theme).buttonText}>Crear codigo de barras</Text>
                    </TouchableOpacity>
                )}


            </ScrollView>

            {!fromModal && (
                <View style={productDetailsStyles(theme, typeTheme).footer}>
                    <TouchableOpacity
                        style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row', width: "100%" }]}
                        onPress={handleAddToInventory}
                    >
                        <Icon name="add-circle-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar a inventario</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
});


interface ProductDetailItem {
    label: string,
    value: string | number,
    theme: any,
    isLastChild?: boolean
}

const ProductDetailItem = React.memo(({ label, value, theme, isLastChild = false }: ProductDetailItem) => (

    <View style={productDetailsStyles(theme).data}>
        <Text style={productDetailsStyles(theme).label}>{label}</Text>
        <Text style={productDetailsStyles(theme).dataValue}>{value}</Text>
        {
            !isLastChild &&
            <View style={productDetailsStyles(theme).separator} />
        }
    </View>
));

