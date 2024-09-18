import React, { useContext, useEffect } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { PersonalInformationStyles } from '../../theme/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

interface PersonalInformationInterface {
    route: {
        params: {
            fromLogIn?: boolean;
        };
    };
}

export const PersonalInformation = ({ route }: PersonalInformationInterface) => {
    const { user } = useContext(AuthContext);
    const { user: userFromDB, logOut } = useContext(DbAuthContext);
    const { fromLogIn } = route.params || {};
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

    }


    return (
        <View style={PersonalInformationStyles(theme).PersonalInformation}>
            <View style={PersonalInformationStyles(theme).profile}>
                <View style={PersonalInformationStyles(theme).circle}>
                    <View style={PersonalInformationStyles(theme).circleContent}>
                        <Text style={PersonalInformationStyles(theme).circleText}>
                            {user?.Nombre?.slice(0, 1) || userFromDB?.Nombre?.slice(0, 1)}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={PersonalInformationStyles(theme).name}>{user?.Nombre || userFromDB?.Nombre}</Text>
                    <Text style={{ color: theme.text_color }}>{user?.Company}</Text>
                </View>
            </View>

            <View style={PersonalInformationStyles(theme, typeTheme).information}>
                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Razón Social:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.RazonSocial || userFromDB?.RazonSocial}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                {(user?.Id_Usuario || userFromDB?.Id_Usuario) && (
                    <View style={PersonalInformationStyles(theme).data}>
                        <Text style={PersonalInformationStyles(theme).label}>Usuario:</Text>
                        <Text style={{ color: theme.text_color }}>{user?.Id_Usuario || userFromDB?.Id_Usuario}</Text>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>
                )}

                {(user?.Id_Almacen || userFromDB?.Id_Almacen) && (
                    <View style={PersonalInformationStyles(theme).data}>
                        <Text style={PersonalInformationStyles(theme).label}>Almacen:</Text>
                        <Text style={{ color: theme.text_color }}>{user?.Id_Almacen || userFromDB?.Id_Almacen}</Text>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>
                )}


                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Base de datos:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.baseclientes || userFromDB?.baseclientes}</Text>
                </View>
            </View>

            {fromLogIn && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={handleLogOut}
                >
                    <Text style={buttonStyles(theme).buttonText}>Cerrar sesión de base de datos</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
