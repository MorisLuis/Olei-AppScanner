import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';

interface ProductItemSearchInterface {
    product: ProductInterface;
    showDelete?: boolean;
    onDelete?: (product: ProductInterface) => void;
    onClick?: () => void;
    fromModal?: boolean
}

export const ProductItemSearch = ({
    product,
    onClick,
    fromModal
}: ProductItemSearchInterface) => {
    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity style={ProductItemSearchStyles(theme, typeTheme).ProductItemSearch} onPress={onClick}>
            <View style={ProductItemSearchStyles(theme, typeTheme).information}>
                <Text style={ProductItemSearchStyles(theme, typeTheme).description}>{product.Descripcion.trim()}</Text>
                <View style={ProductItemSearchStyles(theme, typeTheme).otherInformation}>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Codigo: {product.Codigo.trim()}</Text>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>-</Text>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Marca: {product.Marca.trim()}</Text>
                </View>
                {
                    fromModal &&
                    <View style={[product.CodBar ? ProductItemSearchStyles(theme, typeTheme).codebarAvailable : ProductItemSearchStyles(theme, typeTheme).codebarNotAvailable]}>
                        <Text style={product.CodBar ? ProductItemSearchStyles(theme, typeTheme).textAvailable : ProductItemSearchStyles(theme, typeTheme).textNotAvailable}>
                            {product?.CodBar?.trim() !== "" ? "Tiene código" : "No tiene código"}
                        </Text>
                    </View>

                }
            </View>
        </TouchableOpacity>
    )
}