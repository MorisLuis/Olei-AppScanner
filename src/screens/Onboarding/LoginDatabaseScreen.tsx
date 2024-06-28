import React, { useContext, useEffect } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useForm } from '../../hooks/useForm';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { LoadingScreen } from '../LoadingScreen';

import { buttonStyles } from '../../theme/UI/buttons';
import { inputStyles } from '../../theme/UI/inputs';
import { globalStyles } from '../../theme/appTheme';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import Banner from "../../assets/OLEIAPP.svg";
import Logo from "../../assets/Logo.svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { loginDBStyles } from '../../theme/loginTheme';
import { useTheme } from '../../context/ThemeContext';


export const LoginDatabaseScreen = () => {
    const { signInDB, errorMessage, removeError, loggingIn } = useContext(DbAuthContext);
    const { IdUsuarioOLEI, PasswordOLEI, onChange } = useForm({ IdUsuarioOLEI: '', PasswordOLEI: '' });
    const { theme } = useTheme();

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage ? errorMessage : errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signInDB({ IdUsuarioOLEI, PasswordOLEI });
    };

    const keyboardActive = useKeyboardStatus();

    if (loggingIn) return <LoadingScreen />;

    return (
        <KeyboardAvoidingView
            style={loginDBStyles(theme).LoginDBScreen}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={loginDBStyles(theme).formContainer}>

                <View style={loginDBStyles(theme).logoContainer}>
                    <Logo width={keyboardActive ? wp("35%") : wp("60%")} height={"100%"} />
                </View>

                <View style={[keyboardActive ? loginDBStyles(theme).imageContainerActive : loginDBStyles(theme).imageContainer]}>
                    <Banner width={keyboardActive ? "50%" : "90%"} height={"100%"}  />
                </View>

                <View style={[keyboardActive ? loginDBStyles(theme).headersActive : loginDBStyles(theme).headers]}>
                    <Text style={[keyboardActive ? loginDBStyles(theme).titleDBActive : loginDBStyles(theme).titleDB]}>Con OLEI APP agilice la captura de sus movimientos</Text>
                    <Text style={[keyboardActive ? loginDBStyles(theme).textDBActive : loginDBStyles(theme).textDB]}>
                        Iniciemos conectadonos a tu base de datos.
                    </Text>
                </View>

                <TextInput
                    placeholder="Escribe Id Usuario Olei"
                    placeholderTextColor={theme.text_color}          
                    keyboardType="email-address"
                    style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottom]}
                    selectionColor={theme.text_color}
                    onChangeText={(value) => onChange(value, 'IdUsuarioOLEI')}
                    value={IdUsuarioOLEI}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Escribe Contraseña Olei"
                    placeholderTextColor={theme.text_color}                
                    secureTextEntry
                    style={[inputStyles(theme).input]}
                    selectionColor={theme.text_color}
                    onChangeText={(value) => onChange(value, 'PasswordOLEI')}
                    value={PasswordOLEI}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={loginDBStyles(theme).buttonContainerDB}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[buttonStyles(theme).button, buttonStyles(theme).yellow]}
                        onPress={onLogin}
                    >
                        <Text style={buttonStyles(theme).buttonTextSecondary}>Ingresar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};