import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { InventoryBagContext } from '../context/Inventory/InventoryBagContext';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { AppNavigationProp } from '../interface/navigation';
import { AuthContext } from '../context/auth/AuthContext';

const TODOS_ALMACENES_ON = 1;

export const SuccesMessage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { reset } = useNavigation<AppNavigationProp>();
  const { inventoryData } = useContext(InventoryBagContext);
  const { theme, typeTheme } = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const handleNavigate = (): void => {
    if (user?.TodosAlmacenes === TODOS_ALMACENES_ON) {
      reset({
        index: 0,
        routes: [{ name: 'almacenScreen' }]
      });
    } else {
      reset({
        index: 0,
        routes: [{ name: 'typeOfMovementScreen' }]
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background_color }}>
      <View style={[SuccesMessageScreenStyles(theme).SuccesMessage]}>
        <TouchableOpacity
          style={[SuccesMessageScreenStyles(theme).header]}
          onPress={handleNavigate}>
          <Icon name="close-outline" size={24} color={iconColor} />
        </TouchableOpacity>
        <View style={SuccesMessageScreenStyles(theme).content}>
          <Text style={SuccesMessageScreenStyles(theme).title}>
            Tu inventario ha sido exitoso
          </Text>
          <Text style={SuccesMessageScreenStyles(theme).text}>
            Tu inventario con el folio {inventoryData.Folio} ha sido realizado.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
