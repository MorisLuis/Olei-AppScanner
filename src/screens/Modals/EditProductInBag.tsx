import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { editProductStyles } from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { ProductInterfaceBag } from '../../interface/product';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { Counter } from '../../components/Ui/Counter';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

type EditProductInBagInterface = {
    route?: {
        params: {
            product: ProductInterfaceBag;
        };
    };
};

export const EditProductInBag = ({ route }: EditProductInBagInterface) => {

    const { product } = route?.params ?? {};
    const { editProduct, removeProduct } = useContext(InventoryBagContext);
    const navigation = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [piezasCount, setPiezasCount] = useState(0)
    const buttondisabled = false;

    const handleCloseModal = () => {
        navigation.goBack()
    }

    const onEdit = () => {
        if (!product) return;

        if(piezasCount < 1) {
            removeProduct(product)
        } else {
            editProduct({ ...product, Cantidad: piezasCount });
        }

        handleCloseModal()
    }

    useEffect(() => {
        const handleProductPiezasCount = () => {
            setPiezasCount(product?.Cantidad as number)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalMiddle
            visible={true}
            onClose={handleCloseModal}
        >
            <View>
                <Text style={editProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</Text>
                <Counter counter={piezasCount} setCounter={setPiezasCount} />
            </View>

            {
                piezasCount < 1 &&
                <View>
                    <Text style={editProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</Text>
                </View>
            }

            <TouchableOpacity
                style={[buttonStyles(theme).button, buttonStyles(theme).black, globalStyles(theme).globalMarginBottomSmall,
                ...(buttondisabled ? [buttonStyles(theme).disabled] : [])
                ]}
                onPress={onEdit}
                disabled={buttondisabled}
            >
                <Text style={buttonStyles(theme).buttonText}>{loadingSearch ? "Editando..." : "Editar"}</Text>
            </TouchableOpacity>
        </ModalMiddle>
    );
};