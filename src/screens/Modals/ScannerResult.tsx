import React, { useContext, useState } from 'react';

import { View } from 'react-native';
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
import { AuthContext } from '../../context/auth/AuthContext';
import CustomText from '../../components/CustumText';

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
    const { theme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const { user: { SalidaSinExistencias, Id_TipoMovInv } } = useContext(AuthContext);
    const showLimit = Id_TipoMovInv?.Id_TipoMovInv === 2 && SalidaSinExistencias === 0;
    const doNotAllowProductOutputs = showLimit && (product?.Existencia ?? 0) < 1;
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
        setLoadingAddProduct(false)
        navigation.goBack()
    }

    const handleExpandProductDetails = () => {
        if (!product) return
        navigation.goBack()
        navigation.navigate('[ProductDetailsPage] - productDetailsScreen',
            {
                selectedProduct: product,
                hideActions: true
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
                    modal: true,
                    withCodebar: false
                }
            )
        }, 500);
    };

    const renderDoesntExistProduct = () => {
        return (
            <View>
                <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                <ButtonCustum
                    title={'Asignar a un producto'}
                    onPress={handleAssignCodeToProduct}
                    disabled={false}
                    extraStyles={{
                        marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom                    }}
                    buttonColor='color_yellow'
                    textColor='text_color'
                />
            </View>
        )
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            {product ? (
                <View style={modalRenderstyles(theme).ScannerResult}>
                    <View style={modalRenderstyles(theme).product}>
                        <View style={modalRenderstyles(theme).productText}>
                            <View style={modalRenderstyles(theme).productMessage}>
                                <CustomText style={modalRenderstyles(theme).codeLabel}>Codigo: </CustomText>
                                <CustomText style={modalRenderstyles(theme).codeValue}>{product?.Codigo}</CustomText>
                                <View style={modalRenderstyles(theme).otherInfo}>
                                    <CustomText>{product?.CodBar ? product?.CodBar : "Sin Codigo de barras"}</CustomText>
                                    <CustomText>/</CustomText>
                                    <CustomText>{product?.Marca}</CustomText>
                                </View>
                            </View>
                        </View>
                    </View>

                    {
                        !doNotAllowProductOutputs ?
                            <>
                                <View style={modalRenderstyles(theme).counterContainer}>
                                    {
                                        (seeProductDetails && !fromProductDetails) &&
                                        <View style={{ width: wp("42.5%") }}>
                                            <ButtonCustum
                                                title={'Ver producto'}
                                                onPress={handleExpandProductDetails}
                                                disabled={false}
                                                buttonSmall
                                            />
                                        </View>
                                    }

                                    <View style={{ width: fromProductDetails ? "100%" : wp("42.5%") }}>
                                        <Counter
                                            counter={counterProduct}
                                            setCounter={setCounterProduct}
                                            limit={showLimit ? product.Existencia : undefined}
                                        />
                                    </View>
                                </View>

                                <ButtonCustum
                                    title={'Agregar al inventario'}
                                    onPress={handleAddToInventory}
                                    disabled={buttondisabled}
                                />
                            </>
                            :
                            <EmptyMessageCard
                                title='Necesario permisos'
                                message='No se permiten salidas de productos sin existencia.'
                            />
                    }
                </View>
            ) : (
                renderDoesntExistProduct()
            )}
        </ModalBottom>
    )
}


export default ScannerResult;