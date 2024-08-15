import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProductInventoryConfirmationCardTheme } from '../../theme/UI/cardsStyles';
import ProductInterface, { ProductInterfaceBag } from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductInventoryConfirmationCardInterface {
    product: ProductInterfaceBag;
    onClick?: () => void;
    disabled: boolean
}

export const ProductInventoryConfirmationCard = ({
    product,
    onClick,
    disabled
}: ProductInventoryConfirmationCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = theme.color_tertiary

    return (
        <View style={ProductInventoryConfirmationCardTheme(theme, typeTheme).ProductInventoryConfirmationCard}>
            <View style={ProductInventoryConfirmationCardTheme(theme).data}>
                <View style={ProductInventoryConfirmationCardTheme(theme).information}>
                    <View>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).description}>{product.Descripcion}</Text>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).label}>Codigo:</Text>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.Codigo}</Text>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).label}>Cantidad:</Text>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.Cantidad}</Text>
                    </View>
                </View>

                <TouchableOpacity style={ProductInventoryConfirmationCardTheme(theme, typeTheme).edit}  onPress={onClick} disabled={disabled}>
                    <Icon name="create-outline" size={18} color={iconColor} />
                </TouchableOpacity>

            </View>
        </View>
    )
}
