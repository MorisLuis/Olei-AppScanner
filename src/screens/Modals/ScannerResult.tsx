import React, { useContext, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import ProductInterface, { ProductInterfaceBag } from '../../interface/product';
import { Counter } from '../../components/Ui/Counter';
import { globalStyles } from '../../theme/appTheme';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../theme/ModalRenders/ScannerResultTheme';
import ModalBottom from '../../components/Modals/ModalBottom';
import { useTheme } from '../../context/ThemeContext';
import { AppNavigationProp } from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import { AuthContext } from '../../context/auth/AuthContext';
import CustomText from '../../components/CustumText';

// Constants to avoid magic numbers
const ID_TIPO_MOVIMIENTO_2 = 2;
const NO_EXISTENCE = 0;
const MIN_COUNTER_VALUE = 1;
const TIMEOUT_DELAY = 500;

interface ScannerResultInterface {
  fromInput?: boolean;
  seeProductDetails?: boolean;
  route?: {
    params: {
      product: ProductInterface;
      fromProductDetails?: boolean;
    };
  };
}

const ScannerResult = ({
  fromInput,
  seeProductDetails = true,
  route,
}: ScannerResultInterface): JSX.Element => {
  const { product, fromProductDetails } = route?.params || {};
  const { theme } = useTheme();
  const { addProduct } = useContext(InventoryBagContext);
  const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
  const {
    user: { SalidaSinExistencias, Id_TipoMovInv },
  } = useContext(AuthContext);
  const showLimit =
    Id_TipoMovInv?.Id_TipoMovInv === ID_TIPO_MOVIMIENTO_2 && SalidaSinExistencias === NO_EXISTENCE;
  const doNotAllowProductOutputs = showLimit && (product?.Existencia ?? NO_EXISTENCE) < MIN_COUNTER_VALUE;
  const navigation = useNavigation<AppNavigationProp>();

  const [loadingAddProduct, setLoadingAddProduct] = useState(false);
  const [counterProduct, setCounterProduct] = useState<number>(NO_EXISTENCE);
  const buttondisabled = loadingAddProduct || counterProduct < MIN_COUNTER_VALUE;

  const handleAddToInventory = (): void => {
    setLoadingAddProduct(true);
    if (!product?.Codigo) return;

    const productData: ProductInterfaceBag = {
      Codigo: product?.Codigo,
      Id_Marca: product?.Id_Marca ?? NO_EXISTENCE,
      Existencia: product?.Existencia ?? NO_EXISTENCE,
      Id_Ubicacion: NO_EXISTENCE,
      Diferencia: NO_EXISTENCE,
      Descripcion: product?.Descripcion,
      Marca: product?.Marca,
      Cantidad: counterProduct === NO_EXISTENCE ? MIN_COUNTER_VALUE : counterProduct,
    };

    addProduct(productData);
    setLoadingAddProduct(false);
    navigation.goBack();
  };

  const handleExpandProductDetails = (): void => {
    if (!product) return;
    navigation.goBack();
    navigation.navigate('[ProductDetailsPage] - productDetailsScreen', {
      selectedProduct: product,
      hideActions: true,
    });
  };

  const handleAssignCodeToProduct = (): void => {
    handleCameraAvailable(false);
    setTimeout(() => {
      navigation.goBack();
      navigation.navigate('[Modal] - searchProductModal', {
        modal: true,
        withCodebar: false,
      });
    }, TIMEOUT_DELAY);
  };

  const renderDoesntExistProduct = (): JSX.Element => {
    return (
      <View>
        <EmptyMessageCard
          title={
            fromInput
              ? `No existe producto con este codigo.`
              : `No existe producto con codigo de barras:`
          }
          message={`${codeBar}`}
          icon="help-circle"
        />

        <ButtonCustum
          title={'Asignar a un producto'}
          onPress={handleAssignCodeToProduct}
          disabled={false}
          extraStyles={{
            marginVertical: globalStyles().globalMarginBottomSmall.marginBottom,
          }}
          buttonColor="color_yellow"
          textColor="text_color"
        />
      </View>
    );
  };

  const styles_counter_heigh: StyleProp<ViewStyle> = { width: fromProductDetails ? '100%' : wp('42.5%') }

  return (
    <ModalBottom visible={true} onClose={() => navigation.goBack()}>
      {product ? (
        <View style={modalRenderstyles(theme).ScannerResult}>
          <View style={modalRenderstyles(theme).product}>
            <View style={modalRenderstyles(theme).productText}>
              <View style={modalRenderstyles(theme).productMessage}>
                <CustomText style={modalRenderstyles(theme).codeLabel}>
                  Codigo:{' '}
                </CustomText>
                <CustomText style={modalRenderstyles(theme).codeValue}>
                  {product?.Codigo}
                </CustomText>
                <View style={modalRenderstyles(theme).otherInfo}>
                  <CustomText>
                    {product?.CodBar ? product?.CodBar : 'Sin Codigo de barras'}
                  </CustomText>
                  <CustomText>/</CustomText>
                  <CustomText>{product?.Marca}</CustomText>
                </View>
              </View>
            </View>
          </View>

          {!doNotAllowProductOutputs ? (
            <>
              <View style={modalRenderstyles(theme).counterContainer}>
                {seeProductDetails && !fromProductDetails && (
                  <View style={{ width: wp('42.5%') }}>
                    <ButtonCustum
                      title={'Ver producto'}
                      onPress={handleExpandProductDetails}
                      disabled={false}
                      buttonSmall
                    />
                  </View>
                )}

                <View style={styles_counter_heigh}>
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
          ) : (
            <EmptyMessageCard
              title="Necesario permisos"
              message="No se permiten salidas de productos sin existencia."
            />
          )}
        </View>
      ) : (
        renderDoesntExistProduct()
      )}
    </ModalBottom>
  );
};

export default ScannerResult;
