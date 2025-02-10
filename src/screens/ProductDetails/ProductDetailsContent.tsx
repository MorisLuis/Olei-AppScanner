import React, { useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import ProductInterface from "../../interface/product";
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { productDetailsStyles } from "../../theme/productDetailsTheme";
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailItem } from "./ProductDetailsItem";
import ButtonCustum from "../../components/Ui/ButtonCustum";
import FooterScreen from "../../components/Navigation/Footer";

interface ProductDetailsContentInterface {
    productDetailsData: ProductInterface;
    handleOptionsToUpdateCodebar: () => void;
    handleAddToInventory: () => void;
    hideActions?: boolean;
}

export const ProductDetailsContent = React.memo(({
    productDetailsData,
    handleOptionsToUpdateCodebar,
    handleAddToInventory,
    hideActions = false
}: ProductDetailsContentInterface) => {

    const { theme, typeTheme } = useTheme();

    const memoizedHandleOptionsToUpdateCodebar = useCallback(handleOptionsToUpdateCodebar, []);
    const memoizedHandleAddToInventory = useCallback(handleAddToInventory, []);

    const getIconColor = () => (typeTheme === 'dark' ? "white" : "black");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={!hideActions && { paddingBottom: 150 }}>
                <View style={productDetailsStyles(theme).ProductDetailsPage}>
                    <View style={productDetailsStyles(theme).content}>
                        {/* Imagen del Producto */}
                        <View style={productDetailsStyles(theme, typeTheme).imageContainer}>
                            {productDetailsData.imagen ? (
                                <Image
                                    style={productDetailsStyles(theme).image}
                                    source={{ uri: productDetailsData.imagen }}
                                />
                            ) : (
                                <View style={productDetailsStyles(theme).notImage}>
                                    <Icon name="camera" size={24} color={getIconColor()} />
                                    <Text style={productDetailsStyles(theme).notImageText} numberOfLines={2}>
                                        OLEI SOFTWARE
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Descripción */}
                        <View style={productDetailsStyles(theme).header}>
                            <Text style={productDetailsStyles(theme).description}>{productDetailsData.Descripcion}</Text>
                        </View>

                        {/* Información */}
                        <View style={productDetailsStyles(theme, typeTheme).information}>
                            <ProductDetailItem theme={theme} label="Código:" value={productDetailsData.Codigo} />
                            <ProductDetailItem theme={theme} label="Existencia:" value={productDetailsData.Existencia} />
                            <ProductDetailItem theme={theme} label="Familia:" value={productDetailsData.Familia} />
                            <ProductDetailItem theme={theme} label="Marca:" value={productDetailsData.Marca} />
                            {productDetailsData.CodBar && (
                                <ProductDetailItem
                                    theme={theme}
                                    label="Código de barras:"
                                    value={productDetailsData.CodBar}
                                    isLastChild
                                />
                            )}
                        </View>

                        {/* Botón para Código de Barras */}
                        {(!productDetailsData.CodBar && !hideActions) && (
                            <ButtonCustum
                                title="Crear código de barras"
                                onPress={memoizedHandleOptionsToUpdateCodebar}
                                disabled={false}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            {!hideActions && (
                <FooterScreen
                    buttonTitle="Agregar a inventario"
                    buttonOnPress={memoizedHandleAddToInventory}
                    buttonDisabled={false}
                    buttonProperties={{
                        buttonColor: 'color_yellow',
                        textColor: 'text_color',
                    }}
                />
            )}
        </SafeAreaView>
    );


});
