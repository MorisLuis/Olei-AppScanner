import React, { useContext } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProfileNavigationProp } from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';

export const ProfileScreen = (): JSX.Element => {
  const { logOutClient, logOutServer } = useContext(AuthContext);
  const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

  const { theme, typeTheme } = useTheme();
  const { navigate } = useNavigation<ProfileNavigationProp>();
  const { cleanBag } = useContext(InventoryBagContext);

  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const logOutSesion = (): void => {
    const Accept = async (): Promise<void> => {
      cleanBag();
      await logOutClient();
    };

    Alert.alert(
      'Carrar sesión', // Título del cuadro de diálogo
      '¿Estás seguro de cerrar sesión?', // Mensaje del cuadro de diálogo
      [
        {
          text: 'Cancelar',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: Accept,
        },
      ],
      { cancelable: false },
    );
  };

  const logOutDataBase = (): void => {
    const Accept = async (): Promise<void> => {
      cleanBag();
      await logOutServer();
    };

    Alert.alert(
      'Cambiar la base de datos',
      '¿Estás seguro de que deseas cambiar la base de datos? Se cerrara la actual.',
      [
        {
          text: 'Cancelar',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: Accept,
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={ProfileScreenStyles(theme).ProfileScreen}>
      <SafeAreaView style={ProfileScreenStyles(theme).content}>
        <Text style={ProfileScreenStyles(theme).title}>Configuación</Text>

        <TouchableOpacity
          onPress={() =>
            navigate('[ProfileNavigation] - personalInformationScreen')
          }
          style={ProfileScreenStyles(theme).section}>
          <Text style={{ color: theme.text_color }}>Información Personal</Text>
          <Icon name="person-outline" size={22} color={iconColor} />
        </TouchableOpacity>

        <View style={ProfileScreenStyles(theme).divider}></View>

        <TouchableOpacity
          onPress={() => navigate('[ProfileNavigation] - settingsSceen')}
          style={[ProfileScreenStyles(theme).section]}>
          <Text style={{ color: theme.text_color }}>Configuración General</Text>
          <Icon name="settings-outline" size={22} color={iconColor} />
        </TouchableOpacity>

        <View style={ProfileScreenStyles(theme).divider}></View>

        <Text style={ProfileScreenStyles(theme).title}>Legal</Text>

        <TouchableOpacity
          onPress={() => navigate('[ProfileNavigation] - privacyScreen')}
          style={[ProfileScreenStyles(theme).section]}>
          <Text style={{ color: theme.text_color }}>Aviso de privacidad</Text>
          <Icon name="book-outline" size={22} color={iconColor} />
        </TouchableOpacity>

        <View style={ProfileScreenStyles(theme).divider}></View>

        <ButtonCustum
          title="Cerrar sesión"
          onPress={logOutSesion}
          disabled={false}
          extraStyles={ProfileScreenStyles(theme).button_close_session}
        />

        <TouchableOpacity
          onPress={logOutDataBase}
          style={[
            ProfileScreenStyles(theme).logOutDB,
            {
              marginBottom:
                globalStyles().globalMarginBottomSmall.marginBottom,
            },
          ]}>
          <Text style={ProfileScreenStyles(theme).logOutDBText}>
            Cambiar base de datos
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={{ color: theme.text_color }}>Version: {version}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
