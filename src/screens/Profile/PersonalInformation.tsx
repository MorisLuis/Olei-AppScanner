import React, { useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { AuthContext } from '../../context/auth/AuthContext';
import { PersonalInformationStyles } from '../../theme/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProfileNavigationStackParamList } from '../../navigator/ProfileNavigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import { NUMBER_0, NUMBER_1 } from '../../utils/globalConstants';
import { AuthNavigationStackParamList } from '../../navigator/AuthNavigation';

type PersonalInformationRouteProp = RouteProp<ProfileNavigationStackParamList, '[ProfileNavigation] - personalInformationScreen'> | RouteProp<AuthNavigationStackParamList, 'PersonalInformationScreen'>;

interface PersonalInformationInterface {
  route: PersonalInformationRouteProp;
}

export const PersonalInformation = ({ route }: PersonalInformationInterface): JSX.Element => {

  const { user, logOutServer } = useContext(AuthContext);
  const { fromLogIn } = route.params ?? {};
  const { theme, typeTheme } = useTheme();
  const { cleanBag } = useContext(InventoryBagContext);

  const handleLogOut = (): void => {
    const Accept = async (): Promise<void> => {
      cleanBag();
      await logOutServer();
    };

    Alert.alert(
      'Cerrar la base de datos', // Título del cuadro de diálogo
      '¿Estás seguro de que deseas cambiar la base de datos? Se cerrara la actual.', // Mensaje del cuadro de diálogo
      [
        {
          text: 'Cancelar',
          //onPress: () : void => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: Accept,
        },
      ],
      { cancelable: false }, // Puedes ponerlo en true para permitir cerrar el diálogo tocando fuera de él
    );
  };

  const PersonalInformationData = [
    { label: 'Razón Social:', value: user?.RazonSocial },
    { label: 'Usuario:', value: user?.Id_Usuario },
    { label: 'Almacen Origen:', value: user?.AlmacenNombre },
    { label: 'Base de datos:', value: user?.BaseSQL },
  ];

  return (
    <View style={PersonalInformationStyles(theme).PersonalInformation}>
      <View style={PersonalInformationStyles(theme).profile}>
        <View style={PersonalInformationStyles(theme).circle}>
          <View style={PersonalInformationStyles(theme).circleContent}>
            <Text style={PersonalInformationStyles(theme).circleText}>
              {user?.RazonSocial?.slice(NUMBER_0, NUMBER_1)}
            </Text>
          </View>
        </View>

        <View>
          <Text style={PersonalInformationStyles(theme).name}>
            {user?.RazonSocial}
          </Text>
        </View>
      </View>

      <View style={PersonalInformationStyles(theme, typeTheme).information}>
        {PersonalInformationData.map((item, index) => {
          return (
            item.value && (
              <View style={PersonalInformationStyles(theme).data} key={index}>
                <Text style={PersonalInformationStyles(theme).label}>
                  {item.label}
                </Text>
                <Text style={{ color: theme.text_color }}>{item.value}</Text>
                <View style={PersonalInformationStyles(theme).separator} />
              </View>
            )
          );
        })}
      </View>

      {fromLogIn && (
        <ButtonCustum
          title="Cerrar sesión de base de datos"
          onPress={handleLogOut}
          disabled={false}
        />
      )}
    </View>
  );
};
