import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import { ProductInterfaceBag } from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';

interface ProductInventoryCardInterface {
    product: ProductInterfaceBag;
    showDelete?: boolean;
    onDelete?: (product: ProductInterfaceBag) => void;
    onClick?: () => void;
}

const ProductInventoryCardComponent = ({
    product,
    showDelete,
    onDelete,
    onClick,
}: ProductInventoryCardInterface) => {
    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <Text style={styles(theme).description}>{product.Descripcion}</Text>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Codigo:</Text>
                        <Text style={styles(theme).dataItemText}>{product?.Codigo}</Text>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Marca:</Text>
                        <Text style={styles(theme).dataItemText}>{product?.Marca}</Text>
                    </View>

                    {showDelete && (
                        <Text style={styles(theme).delete} onPress={() => onDelete?.(product)}>
                            Eliminar
                        </Text>
                    )}
                </View>

                <View style={styles(theme, typeTheme).stock}>
                    <Text style={{ color: theme.text_color }}>{product.Cantidad || product.Existencia}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const ProductInventoryCard = React.memo(ProductInventoryCardComponent, (prevProps, nextProps) => {
    // Comparar las propiedades previas y nuevas para evitar renderizados innecesarios
    return (
        prevProps.product.Codigo === nextProps.product.Codigo &&
        prevProps.product.Marca === nextProps.product.Marca &&
        prevProps.product.Cantidad === nextProps.product.Cantidad &&
        prevProps.showDelete === nextProps.showDelete &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.onDelete === nextProps.onDelete
    );
});
