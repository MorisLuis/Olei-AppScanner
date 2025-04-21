import { View, SafeAreaView, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import CustomText from '../../components/CustumText';
import { almacenStyles } from '../../theme/AlmacenScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import CardSelect from '../../components/Cards/CardSelect';
import { AlmacenInterface } from '../../interface/almacen';
import { getAlmacenes, updateCurrentAlmacen } from '../../services/almacenes';
import FooterScreen from '../../components/Navigation/Footer';
import { TypeOfMovementSkeleton } from '../../components/Skeletons/TypeOfMovementSkeleton';
import { AppNavigationProp } from '../../interface/navigation';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import { useApiQueryWithService } from '../../hooks/useApiQueryWithService';
import { ErroScreen } from '../ErrorScreen';

interface AlmacenScreenInterface {
  route: {
    params: {
      valueDefault?: number
    };
  };
};

export default function AlmacenScreen({ route }: AlmacenScreenInterface): JSX.Element {

  const { valueDefault } = route.params ?? {};
  const { theme } = useTheme();
  const { updateUser } = useContext(AuthContext);
  const { navigate } = useNavigation<AppNavigationProp>();

  const [value, setValue] = useState<AlmacenInterface>();
  const [valueDefaultLocal, setValueDefaultLocal] = useState<number>();
  const buttondisabled = !value && !valueDefault ? true : false;
  const { handleError } = useErrorHandler();

  const { isError, data, isLoading, refetch } = useApiQueryWithService({
    queryKey: 'almacenes',
    service: getAlmacenes,
  });
  const almacenes = data?.items;

  const handleSelectAlmacen = (value: AlmacenInterface): void => {
    setValue(value);
  };

  const renderAlmacenItem = ({ item }: { item: AlmacenInterface }): JSX.Element => {
    return (
      <CardSelect
        onPress={() => handleSelectAlmacen(item)}
        message={item.Nombre}
        sameValue={
          value
            ? item?.Id_Almacen === value?.Id_Almacen
            : item?.Id_Almacen === valueDefaultLocal
        }
      />
    );
  };

  const handleSaveAlmacen = async (): Promise<void> => {
    if (!value?.Id_Almacen) return;
    const { almacen } = await updateCurrentAlmacen(value?.Id_Almacen);
    if (!almacen) return handleError("No se encontro almacen actualizado");
    if (almacen.Id_Almacen) {
      updateUser({
        Id_Almacen: almacen.Id_Almacen,
        AlmacenNombre: almacen.Nombre.trim(),
      });
    }
    navigate('typeOfMovementScreen');
  };

  const renderLoader = (): React.ReactElement[] | null => {
    return isLoading ?
      Array.from({ length: 10 }).map((_, index) => (
        <TypeOfMovementSkeleton key={index} />
      ))
      : null;
  };

  useEffect(() => {
    if (valueDefault) setValueDefaultLocal(valueDefault);
  }, [valueDefault]);


  if (isError) {
    return (
      <ErroScreen
        onRetry={() => refetch()}
        title={'No pudimos cargar los almacenes.'}
      />
    );
  };

  return (
    <View style={almacenStyles(theme).AlmacenScreen}>
      <View style={almacenStyles(theme).content}>
        <SafeAreaView style={almacenStyles(theme).header}>
          <CustomText style={almacenStyles(theme).headerTitle}>
            Selecciona el almacen.
          </CustomText>
        </SafeAreaView>

        <FlatList
          data={almacenes}
          renderItem={renderAlmacenItem}
          keyExtractor={(product) => `${product.Id_Almacen}`}
          onEndReachedThreshold={0}
          ListFooterComponent={renderLoader}
          ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
        />
      </View>

      <FooterScreen
        buttonTitle="Cambiar almacen"
        buttonOnPress={handleSaveAlmacen}
        buttonDisabled={buttondisabled}
      />
    </View>
  );
}
