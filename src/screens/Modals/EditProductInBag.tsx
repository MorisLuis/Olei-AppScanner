import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {editProductStyles} from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import {useTheme} from '../../context/ThemeContext';
import {ProductInterfaceBag} from '../../interface/product';
import {globalStyles} from '../../theme/appTheme';
import {Counter} from '../../components/Ui/Counter';
import {InventoryBagContext} from '../../context/Inventory/InventoryBagContext';
import {AppNavigationProp} from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';
import CustomText from '../../components/CustumText';
import {AuthContext} from '../../context/auth/AuthContext';

// Constantes descriptivas para los "magic numbers"
const MIN_PIEZAS_COUNT = 1;
const NO_EXISTENCIA_LIMIT = 0;
const ID_TIPO_MOVIMIENTO_2 = 2;
const PIEZAS_COUNT_DEFAULT = 0;

type EditProductInBagInterface = {
  route?: {
    params: {
      product: ProductInterfaceBag;
    };
  };
};

export const EditProductInBag = ({route}: EditProductInBagInterface): JSX.Element => {
  const {product} = route?.params ?? {};
  const {editProduct, removeProduct} = useContext(InventoryBagContext);
  const {
    user: {SalidaSinExistencias, Id_TipoMovInv},
  } = useContext(AuthContext);

  // Se usa la constante para mostrar el límite
  const showLimit = Id_TipoMovInv?.Id_TipoMovInv === ID_TIPO_MOVIMIENTO_2 && SalidaSinExistencias === NO_EXISTENCIA_LIMIT;
  const navigation = useNavigation<AppNavigationProp>();
  const {theme} = useTheme();
  const [piezasCount, setPiezasCount] = useState(PIEZAS_COUNT_DEFAULT);
  const buttondisabled = false;

  const handleCloseModal = (): void => {
    navigation.goBack();
  };

  const onEdit = (): void => {
    if (!product) return;

    if (piezasCount < MIN_PIEZAS_COUNT) {
      removeProduct(product);
    } else {
      editProduct({...product, Cantidad: piezasCount});
    }

    handleCloseModal();
  };

  const handleProductPiezasCount = useCallback((): void => {
    if (!product?.Cantidad) return;
    setPiezasCount(product?.Cantidad);
  }, [product?.Cantidad]);

  useEffect(() => {
    handleProductPiezasCount();
  }, [handleProductPiezasCount]);

  return (
    <ModalBottom visible={true} onClose={handleCloseModal}>
      <View>
        <CustomText style={editProductStyles(theme).EditProductInBag_title}>
          Deseas cambiar la cantidad de piezas?
        </CustomText>
        <Counter
          counter={piezasCount}
          setCounter={setPiezasCount}
          limit={showLimit ? product?.Existencia : undefined}
        />
      </View>

      {piezasCount < MIN_PIEZAS_COUNT && (
        <View>
          <CustomText style={editProductStyles(theme).EditProductInBag_warning}>
            Si lo dejas en {MIN_PIEZAS_COUNT} se eliminara el producto.
          </CustomText>
        </View>
      )}

      <ButtonCustum
        title={'Editar'}
        onPress={onEdit}
        disabled={buttondisabled}
        loading={false}
        extraStyles={{
          marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
        }}
      />
    </ModalBottom>
  );
};
