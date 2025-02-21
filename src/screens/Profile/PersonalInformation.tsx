import React, { useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { PersonalInformationStyles } from '../../theme/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { RouteProp } from '@react-navigation/native';
import { ProfileNavigationStackParamList } from '../../navigator/ProfileNavigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';

type PersonalInformationRouteProp = RouteProp<ProfileNavigationStackParamList, '[ProfileNavigation] - personalInformationScreen'>

interface PersonalInformationInterface {
    route: PersonalInformationRouteProp;
}

export const PersonalInformation = ({ route }: PersonalInformationInterface) => {

    const { user } = useContext(AuthContext);
    const { user: userFromDB, logOut } = useContext(DbAuthContext);
    const { fromLogIn } = route.params ?? {};
    const { theme, typeTheme } = useTheme();
    const { cleanBag } = useContext(InventoryBagContext);

    const handleLogOut = () => {

        const Accept = async () => {
            cleanBag();
            await logOut();
        }

        Alert.alert(
            "Cerrar la base de datos", // Título del cuadro de diálogo
            "¿Estás seguro de que deseas cambiar la base de datos? Se cerrara la actual.", // Mensaje del cuadro de diálogo
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Aceptar", onPress: Accept
                }
            ],
            { cancelable: false } // Puedes ponerlo en true para permitir cerrar el diálogo tocando fuera de él
        );

    };

    const PersonalInformationData = [
        { label: "Razón Social:", value: userFromDB?.RazonSocial },
        { label: "Usuario:", value: user.Id_Usuario },
        { label: "Almacen Origen:", value: user.AlmacenNombre },
        { label: "Base de datos:", value: userFromDB?.BaseSQL }
    ]

    return (
        <View style={PersonalInformationStyles(theme).PersonalInformation}>
            <View style={PersonalInformationStyles(theme).profile}>
                <View style={PersonalInformationStyles(theme).circle}>
                    <View style={PersonalInformationStyles(theme).circleContent}>
                        <Text style={PersonalInformationStyles(theme).circleText}>
                            {userFromDB?.RazonSocial?.slice(0, 1)}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={PersonalInformationStyles(theme).name}>{user?.RazonSocial || userFromDB?.RazonSocial}</Text>
                </View>
            </View>

            <View style={PersonalInformationStyles(theme, typeTheme).information}>
                {
                    PersonalInformationData.map((item, index) => {
                        return item.value && (
                            <View style={PersonalInformationStyles(theme).data} key={index}>
                                <Text style={PersonalInformationStyles(theme).label}>{item.label}</Text>
                                <Text style={{ color: theme.text_color }}>{item.value}</Text>
                                <View style={PersonalInformationStyles(theme).separator} />
                            </View>
                        )
                    })
                }
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
