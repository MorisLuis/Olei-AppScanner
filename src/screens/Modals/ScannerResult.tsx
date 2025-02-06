import React, { useContext, useState } from 'react';

import { Text, View } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import ProductInterface, { ProductInterfaceBag } from '../../interface/product';
import { Counter } from '../../components/Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../theme/appTheme';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../theme/ModalRenders/ScannerResultTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalBottom from '../../components/Modals/ModalBottom';
import { useTheme } from '../../context/ThemeContext';
import { AppNavigationProp } from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route?: {
        params: {
            product: ProductInterface;
            fromProductDetails?: boolean
        };
    };
};

const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface) => {

    const { product, fromProductDetails } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<AppNavigationProp>();

    const [loadingAddProduct, setLoadingAddProduct] = useState(false)
    const [counterProduct, setCounterProduct] = useState<number>(0);
    const buttondisabled = loadingAddProduct || counterProduct < 1;

    const handleAddToInventory = () => {
        setLoadingAddProduct(true)
        if (!product?.Codigo) return;

        const productData: ProductInterfaceBag = {
            Codigo: product?.Codigo,
            Id_Marca: product?.Id_Marca ?? 0,
            Existencia: product?.Existencia ?? 0,
            Id_Ubicacion: 0,
            Diferencia: 0,

            Descripcion: product?.Descripcion,
            Marca: product?.Marca,
            Cantidad: counterProduct === 0 ? 1 : counterProduct
        };

        addProduct(productData);
        handleCameraAvailable(true)
        setLoadingAddProduct(false)
        navigation.goBack()
    }

    const handleExpandProductDetails = () => {
        if (!product) return
        navigation.goBack()
        navigation.navigate('[ProductDetailsPage] - productDetailsScreen',
            {
                selectedProduct: product,
                fromModal: true
            }
        );
    }

    const handleSearchByCode = () => {
        navigation.goBack()
        navigation.navigate('[Modal] - findByCodebarInputModal');
    }

    const handleAssignCodeToProduct = () => {
        handleCameraAvailable(false)
        setTimeout(() => {
            navigation.goBack()
            navigation.navigate('[Modal] - searchProductModal',
                {
                    modal: true
                }
            )
        }, 500);
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            {
                (product) ?
                    <View style={modalRenderstyles(theme).ScannerResult}>
                        <View style={modalRenderstyles(theme).product}>
                            <View style={modalRenderstyles(theme).productText}>
                                <View style={modalRenderstyles(theme).productMessage}>
                                    <Text style={modalRenderstyles(theme).codeLabel}>Codigo: </Text>
                                    <Text style={modalRenderstyles(theme).codeValue}>{product?.Codigo}</Text>
                                    <View style={modalRenderstyles(theme).otherInfo}>
                                        <Text style={{ color: theme.text_color }}>{product?.CodBar ? product?.CodBar : "Sin Codigo de barras"}</Text>
                                        <Text style={{ color: theme.text_color }}>/</Text>
                                        <Text style={{ color: theme.text_color }}>{product?.Marca}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={modalRenderstyles(theme).counterContainer}>
                            {
                                (seeProductDetails && !fromProductDetails) &&
                                <View style={{ width: wp("42.5%") }}>
                                    <ButtonCustum
                                        title={'Ver producto'}
                                        onPress={handleExpandProductDetails}
                                        disabled={false}
                                    />
                                </View>
                            }

                            <View style={{ width: fromProductDetails ? "100%" : wp("42.5%") }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} />
                            </View>
                        </View>

                        <ButtonCustum
                            title={'Agregar al inventario'}
                            onPress={handleAddToInventory}
                            disabled={buttondisabled}
                        />
                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <ButtonCustum
                            title={'Buscar producto'}
                            onPress={handleSearchByCode}
                            disabled={false}
                            extraStyles={{
                                marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom
                            }}
                        />

                        {
                            (codeBar && codeBar !== "") &&
                            <ButtonCustum
                                title={'Asignar a un producto'}
                                onPress={handleAssignCodeToProduct}
                                disabled={false}
                                extraStyles={{
                                    marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
                                }}
                            />
                        }
                    </View>
            }
        </ModalBottom>
    )
}


export default ScannerResult;