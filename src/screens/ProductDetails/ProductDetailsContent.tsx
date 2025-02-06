import React from "react";
import { useTheme } from "../../context/ThemeContext";
import ProductInterface from "../../interface/product";
import { Image, ScrollView, Text, View } from 'react-native';
import { productDetailsStyles } from "../../theme/productDetailsTheme";
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailItem } from "./ProductDetailsItem";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from "../../theme/appTheme";
import ButtonCustum from "../../components/Ui/ButtonCustum";
import FooterScreen from "../../components/Navigation/Footer";

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
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    return (
        <>
            <ScrollView style={[
                productDetailsStyles(theme).ProductDetailsPage,
                !fromModal && { marginBottom: hp("20%") } //the height of footer
            ]}>
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
                    <ButtonCustum
                        title="Crear codigo de barras"
                        onPress={handleOptionsToUpdateCodebar}
                        disabled={false}
                        extraStyles={{
                            marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2
                        }}
                    />
                )}
            </ScrollView>

            {!fromModal && (
                <FooterScreen
                    buttonTitle="Agregar a inventario"
                    buttonOnPress={handleAddToInventory}
                    buttonDisabled={false}
                    buttonProperties={{
                        buttonColor: 'color_yellow',
                        textColor: 'text_color',
                    }}
                />

            )}
        </>
    );
});
