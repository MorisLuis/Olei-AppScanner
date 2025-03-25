import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Id_TipoMovInvInterface,
  getTypeOfMovements,
} from '../services/typeOfMovement';
import {TypeOfMovementSkeleton} from '../components/Skeletons/TypeOfMovementSkeleton';
import {AuthContext} from '../context/auth/AuthContext';
import {useTheme} from '../context/ThemeContext';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppNavigationProp} from '../interface/navigation';
import FooterScreen from '../components/Navigation/Footer';
import {TypeOfMovementScreenStyles} from '../theme/TypeOfMovementScreenTheme';

export const TypeOfMovementScreen = () => {
  const {updateTypeOfMovements} = useContext(AuthContext);
  const {theme, typeTheme} = useTheme();
  const {navigate} = useNavigation<AppNavigationProp>();
  const {handleError} = useErrorHandler();

  const [typeOfMovement, setTypeOfMovement] = useState<
    Id_TipoMovInvInterface[]
  >([]);
  const [typeSelected, setTypeSelected] = useState<Id_TipoMovInvInterface>();
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option: Id_TipoMovInvInterface) => {
    setTypeSelected(option);
  };

  const renderOption = ({item}: {item: Id_TipoMovInvInterface}) => {
    const isSelected = typeSelected?.Id_TipoMovInv === item.Id_TipoMovInv;

    return (
      <TouchableOpacity
        style={[
          TypeOfMovementScreenStyles(theme).optionContainer,
          isSelected && TypeOfMovementScreenStyles(theme).selectedOption,
        ]}
        onPress={() => handleOptionSelect(item)}>
        <Text
          style={
            isSelected
              ? TypeOfMovementScreenStyles(theme, typeTheme).optionTextSelected
              : TypeOfMovementScreenStyles(theme).optionText
          }>
          {item.Descripcion}
        </Text>
      </TouchableOpacity>
    );
  };

  const onChangetTypeOfMovement = () => {
    try {
      if (typeSelected === undefined || typeSelected === null) return;
      updateTypeOfMovements(typeSelected);
    } catch (error) {
      handleError(error, true);
    } finally {
      navigate('BottomNavigation');
    }
  };

  const renderLoader = () => {
    return isLoading
      ? Array.from({length: 10}).map((_, index) => (
          <TypeOfMovementSkeleton key={index} />
        ))
      : null;
  };

  const handleGetTypeOfMovements = async () => {
    try {
      setIsLoading(true);
      const types = await getTypeOfMovements();
      if (types.error) return handleError(types.error);
      setTypeOfMovement(types);
    } catch (error) {
      handleError(error, true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetTypeOfMovements();
  }, []);

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
          ItemSeparatorComponent={() => <View style={{height: 20}} />} // Espaciado de 10px
        />
      </View>

      <FooterScreen
        buttonTitle="Avanzar"
        buttonOnPress={onChangetTypeOfMovement}
        buttonDisabled={typeSelected || typeSelected == 0 ? false : true}
      />
    </View>
  );
};
