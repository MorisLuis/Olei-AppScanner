import React from "react";
import { useTheme } from "../../context/ThemeContext";
import ProductInterface from "../../interface/product";
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { productDetailsStyles } from "../../theme/productDetailsTheme";
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailItem } from "./ProductDetailsItem";
import { buttonStyles } from "../../theme/UI/buttons";
import { globalStyles } from "../../theme/appTheme";

interface ProductDetailsContentInterface {
    productDetailsData: ProductInterface,
    handleOptionsToUpdateCodebar: () => void,
    handleAddToInventory: () => void,
    fromModal?: boolean
}

export const ProductDetailsContent = React.memo(({
    productDetailsData,
    handleOptionsToUpdateCodebar,
    handleAddToInventory,
    fromModal
}: ProductDetailsContentInterface) => {

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
                                uri: productDetailsData.imagen
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
