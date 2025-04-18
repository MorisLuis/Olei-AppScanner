import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { globalStyles } from '../../theme/appTheme';
import {
  getTypeOfMovements,
} from '../../services/typeOfMovement';
import { AuthContext } from '../../context/auth/AuthContext';
import { Selector } from '../../components/Ui/Selector';
import Toggle from '../../components/Ui/Toggle';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { Counter } from '../../components/Ui/Counter';
import { buttonStyles } from '../../theme/UI/buttons';
import { SettingsScreenStyles } from '../../theme/SettingsScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import { ID_TIPO_MOVIMIENTO } from '../../interface/user';

const TYPE_MOVEMENT_EMPTY = 0;

export const SettingsScreen = (): JSX.Element => {

  const { updateTypeOfMovements } = useContext(AuthContext);
  const { theme, toggleTheme, typeTheme } = useTheme();
  const { handleError } = useErrorHandler();

  const {
    vibration,
    handleVibrationState,
    limitProductsScanned,
    handleLimitProductsScanned,
  } = useContext(SettingsContext);
  const [typeSelected, setTypeSelected] = useState<number>();

  const [typeOfMovement, setTypeOfMovement] = useState<ID_TIPO_MOVIMIENTO[]>([]);
  const { user } = useContext(AuthContext);

  const [editingLimitProducts, setEditingLimitProducts] = useState(false);
  const [limitProductValue, setLimitProductValue] = useState(limitProductsScanned);

  const onChangetTypeOfMovement = (value: number): void => {
    const type = typeOfMovement.find((item) => item.Id_TipoMovInv == value);
    if (type === undefined || type === null) return;
    setTypeSelected(type.Accion);
    updateTypeOfMovements(type);
  };

  const onChangeLimitProducts = (): void => {
    handleLimitProductsScanned(limitProductValue);
    setEditingLimitProducts(!editingLimitProducts);
    Toast.show({
      type: 'tomatoToast',
      text1: 'Se cambio el limite de productos!',
    });
  };

  const handleGetTypeOfMovements = useCallback(async (): Promise<void> => {
    try {
      const { TiposMovimiento } = await getTypeOfMovements();
      setTypeOfMovement(TiposMovimiento);
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  useEffect(() => {
    setTypeSelected(user?.Id_TipoMovInv?.Id_TipoMovInv);
    handleGetTypeOfMovements();
  }, [handleGetTypeOfMovements, user?.Id_TipoMovInv?.Id_TipoMovInv]);

  const visible = typeOfMovement?.length > TYPE_MOVEMENT_EMPTY ? true : false;

  return (
    <>
      <View style={SettingsScreenStyles(theme).SettingsScreen}>
        {visible ? (
          <>
            <Selector
              label={'Tipo de movimiento'}
              items={typeOfMovement.map((item) => {
                return { label: item?.Descripcion, value: item?.Id_TipoMovInv };
              })}
              value={
                typeSelected !== undefined && typeOfMovement.length > TYPE_MOVEMENT_EMPTY
                  ? (typeOfMovement
                    .find((item) => item.Id_TipoMovInv === typeSelected)
                    ?.Descripcion.trim() as string)
                  : 'Selecciona una opción...'
              }
              //Methods
              onValueChange={(value) => onChangetTypeOfMovement(value)}
            />

            <View style={SettingsScreenStyles(theme).divider}></View>

            <Toggle
              label="Vibracion en escaneo"
              message="Hacer vibrar el celular cuando escaneas."
              extraStyles={{}}
              value={vibration}
              onChange={(value: boolean) => handleVibrationState(value)}
            />

            <View style={SettingsScreenStyles(theme).divider}></View>

            <View style={SettingsScreenStyles(theme).section}>
              <View style={SettingsScreenStyles(theme).sectionContent}>
                <View>
                  <Text style={SettingsScreenStyles(theme).label}>
                    Limite de productos a escanear
                  </Text>
                  {!editingLimitProducts && (
                    <Text style={{ color: theme.text_color }}>
                      {limitProductValue}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setEditingLimitProducts(!editingLimitProducts)
                  }>
                  <Text style={SettingsScreenStyles(theme).edit}>
                    {!editingLimitProducts ? 'Editar' : 'Cancelar'}
                  </Text>
                </TouchableOpacity>
              </View>
              {editingLimitProducts && (
                <>
                  <View style={SettingsScreenStyles(theme).sectionClosed}>
                    <Counter
                      counter={limitProductValue}
                      setCounter={setLimitProductValue}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      buttonStyles(theme).button_small,
                      {
                        marginBottom: globalStyles().globalMarginBottom.marginBottom,
                      },
                    ]}
                    onPress={onChangeLimitProducts}>
                    <Text
                      style={buttonStyles(theme, typeTheme).buttonTextTertiary}>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={SettingsScreenStyles(theme).divider}></View>

            <Toggle
              label="Apariencia"
              message="Personaliza el aspecto de Olei en tu dispositivo."
              extraStyles={{}}
              value={typeTheme === 'light' ? true : false}
              onChange={() => toggleTheme()}
            />

            <View style={SettingsScreenStyles(theme).divider}></View>
          </>
        ) : (
          <View>
            <Text style={{ color: theme.text_color }}>Cargando...</Text>
          </View>
        )}
      </View>
    </>
  );
};
