import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { editProductStyles } from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { ProductInterfaceBag } from '../../interface/product';
import { globalStyles } from '../../theme/appTheme';
import { Counter } from '../../components/Ui/Counter';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { AppNavigationProp } from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';

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
    const navigation = useNavigation<AppNavigationProp>();
    const { theme } = useTheme();
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
            if(!product?.Cantidad) return;
            setPiezasCount(product?.Cantidad)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalBottom
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

            <ButtonCustum
                title={'Editar'}
                onPress={onEdit}
                disabled={buttondisabled}
                loading={loadingSearch}
                extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
            />
        </ModalBottom>
    );
};