import React, { useContext, useEffect } from 'react'

import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { logOut: logOutDB } = useContext(DbAuthContext);
    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<any>();
    const { cleanBag } = useContext(InventoryBagContext);

    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const logOutSesion = () => {

        const Accept = async () => {
            cleanBag();
            await logOut();
        }

        Alert.alert(
            "Carrar sesión", // Título del cuadro de diálogo
            "¿Estás seguro de cerrar sesión?", // Mensaje del cuadro de diálogo
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

    const logOutDataBase = () => {

        const Accept = async () => {
            cleanBag();
            await logOutDB();
            await logOut();
        }

        Alert.alert(
            "Cambiar la base de datos", // Título del cuadro de diálogo
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
        <View style={ProfileScreenStyles(theme).ProfileScreen}>
            <SafeAreaView style={ProfileScreenStyles(theme).content}>

                <Text style={ProfileScreenStyles(theme).title}>Configuación</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme).section}>
                    <Text style={{ color: theme.text_color }}>Información Personal</Text>
                    <Icon name="person-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>


                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme).section]}>
                    <Text style={{ color: theme.text_color }}>Configuración General</Text>
                    <Icon name="settings-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>


                <Text style={ProfileScreenStyles(theme).title}>Legal</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme).section]}>
                    <Text style={{ color: theme.text_color }}>Aviso de privacidad</Text>
                    <Icon name="book-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>

                <TouchableOpacity onPress={logOutSesion} style={[buttonStyles(theme).button, globalStyles(theme).globalMarginBottom, { marginTop: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}>
                    <Text style={buttonStyles(theme).buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={logOutDataBase} style={[ProfileScreenStyles(theme).logOutDB, { marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>
                    <Text style={ProfileScreenStyles(theme).logOutDBText}>Cambiar base de datos</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ color: theme.text_color }}>Version: {version}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}