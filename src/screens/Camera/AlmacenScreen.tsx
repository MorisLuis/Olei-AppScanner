import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import CustomText from '../../components/CustumText';
import {almacenStyles} from '../../theme/AlmacenScreenTheme';
import {useTheme} from '../../context/ThemeContext';
import CardSelect from '../../components/Cards/CardSelect';
import {AlmacenInterface} from '../../interface/almacen';
import {getAlmacenes, updateCurrentAlmacen} from '../../services/almacenes';
import FooterScreen from '../../components/Navigation/Footer';
import {TypeOfMovementSkeleton} from '../../components/Skeletons/TypeOfMovementSkeleton';
import {AppNavigationProp} from '../../interface/navigation';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AuthContext} from '../../context/auth/AuthContext';

interface AlmacenScreenInterface {
  route: any;
}

export default function AlmacenScreen({route}: AlmacenScreenInterface) {
  const {valueDefault} = route.params ?? {};
  const {theme, typeTheme} = useTheme();
  const {updateUser} = useContext(AuthContext);
  const {navigate} = useNavigation<AppNavigationProp>();

  const [value, setValue] = useState<AlmacenInterface>();
  const [valueDefaultLocal, setValueDefaultLocal] = useState<number>();
  const [almacenes, setAlmacenes] = useState<AlmacenInterface[]>();
  const buttondisabled = !value && !valueDefault ? true : false;
  const {handleError} = useErrorHandler();

  const handleSelectOption = (value: AlmacenInterface) => {
    setValue(value);
  };

  const handleGetAlmacenes = async () => {
    try {
      const productData = await getAlmacenes();
      setAlmacenes(productData);
      if (productData.error) return handleError(productData.error);
    } catch (error) {
      handleError(error, true);
    }
  };

  const renderItem = ({item}: {item: AlmacenInterface}) => {
    return (
      <CardSelect
        onPress={() => handleSelectOption(item)}
        message={item.Nombre}
        sameValue={
          value
            ? item?.Id_Almacen === value?.Id_Almacen
            : item?.Id_Almacen === valueDefaultLocal
        }
      />
    );
  };

  const handleSave = async () => {
    if (!value?.Id_Almacen) return;
    const almacenUpdated = await updateCurrentAlmacen(value?.Id_Almacen);
    if (almacenUpdated.Id_Almacen) {
      updateUser({
        Id_Almacen: almacenUpdated.Id_Almacen,
        AlmacenNombre: almacenUpdated.Nombre.trim(),
      });
    }
    navigate('typeOfMovementScreen');
  };

  const renderLoader = () => {
    return !almacenes
      ? Array.from({length: 10}).map((_, index) => (
          <TypeOfMovementSkeleton key={index} />
        ))
      : null;
  };

  useEffect(() => {
    handleGetAlmacenes();
  }, []);

  useEffect(() => {
    if (valueDefault) setValueDefaultLocal(valueDefault);
  }, []);

  return (
    <View style={almacenStyles(theme, typeTheme).AlmacenScreen}>
      <View style={almacenStyles(theme, typeTheme).content}>
        <SafeAreaView style={almacenStyles(theme, typeTheme).header}>
          <CustomText style={almacenStyles(theme, typeTheme).headerTitle}>
            Selecciona el almacen.
          </CustomText>
        </SafeAreaView>

        <FlatList
          data={almacenes}
          renderItem={renderItem}
          keyExtractor={(product) => `${product.Id_Almacen}`}
          onEndReachedThreshold={0}
          ListFooterComponent={renderLoader}
        />
      </View>

      <FooterScreen
        buttonTitle="Cambiar almacen"
        buttonOnPress={handleSave}
        buttonDisabled={buttondisabled}
      />
    </View>
  );
}
