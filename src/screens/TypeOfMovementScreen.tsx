import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  getTypeOfMovements,
} from '../services/typeOfMovement';
import { TypeOfMovementSkeleton } from '../components/Skeletons/TypeOfMovementSkeleton';
import { AuthContext } from '../context/auth/AuthContext';
import { useTheme } from '../context/ThemeContext';
import useErrorHandler from '../hooks/useErrorHandler';
import { AppNavigationProp } from '../interface/navigation';
import FooterScreen from '../components/Navigation/Footer';
import { TypeOfMovementScreenStyles } from '../theme/TypeOfMovementScreenTheme';
import { globalStyles } from '../theme/appTheme';
import { ID_TIPO_MOVIMIENTO } from '../interface/user';
import CardSelect from '../components/Cards/CardSelect';

const ID_TIPO_MOVIMIENTO_0 = 0;

export const TypeOfMovementScreen = (): JSX.Element => {

  const { updateTypeOfMovements } = useContext(AuthContext);
  const { theme, typeTheme } = useTheme();
  const { navigate } = useNavigation<AppNavigationProp>();
  const { handleError } = useErrorHandler();

  const [typeOfMovement, setTypeOfMovement] = useState<ID_TIPO_MOVIMIENTO[]>([]);
  const [typeSelected, setTypeSelected] = useState<ID_TIPO_MOVIMIENTO>();
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option: ID_TIPO_MOVIMIENTO): void => {
    setTypeSelected(option);
  };

  const renderOption = ({ item }: { item: ID_TIPO_MOVIMIENTO }): JSX.Element => {
    return (
      <CardSelect
        onPress={() => handleOptionSelect(item)}
        message={item.Descripcion}
        sameValue={typeSelected?.Id_TipoMovInv === item.Id_TipoMovInv}
      />
    );
  };

  const onChangetTypeOfMovement = (): void => {
    try {
      if (typeSelected === undefined || typeSelected === null) return;
      updateTypeOfMovements(typeSelected);
    } catch (error) {
      handleError(error, true);
    } finally {
      navigate('BottomNavigation');
    }
  };

  const renderLoader = (): React.ReactElement[] | null => {
    return isLoading
      ? Array.from({ length: 10 }).map((_, index) => (
        <TypeOfMovementSkeleton key={index} />
      ))
      : null;
  };

  const handleGetTypeOfMovements = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { error, TiposMovimiento } = await getTypeOfMovements();
      if (error) return handleError(error);
      setTypeOfMovement(TiposMovimiento);
    } catch (error) {
      handleError(error, true);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    handleGetTypeOfMovements();
  }, [handleGetTypeOfMovements]);

  return (
    <View style={TypeOfMovementScreenStyles(theme).TypeOfMovementScreen}>
      <View style={TypeOfMovementScreenStyles(theme, typeTheme).content}>
        <SafeAreaView style={TypeOfMovementScreenStyles(theme).header}>
          <Text style={TypeOfMovementScreenStyles(theme).title}>
            Selecciona que movimiento haras?
          </Text>
        </SafeAreaView>

        <FlatList
          data={typeOfMovement}
          renderItem={renderOption}
          keyExtractor={(typeOfMovement) => `${typeOfMovement.Id_TipoMovInv}`}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
          ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
        />
      </View>

      <FooterScreen
        buttonTitle="Avanzar"
        buttonOnPress={onChangetTypeOfMovement}
        buttonDisabled={typeSelected || typeSelected == ID_TIPO_MOVIMIENTO_0 ? false : true}
      />
    </View>
  );
};
