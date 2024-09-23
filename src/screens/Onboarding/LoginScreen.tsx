import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import { globalStyles } from '../../theme/appTheme';
import { loginStyles } from '../../theme/loginTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { buttonStyles } from '../../theme/UI/buttons';

import { LoadingScreen } from '../LoadingScreen';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { useForm } from '../../hooks/useForm';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { InputPassword } from '../../components/Ui/InputPassword';
import { useProtectPage } from '../../hooks/useProtectPage';
import ModalMiddle from '../../components/Modals/ModalMiddle';

export const LoginScreen = () => {
    const { signIn, errorMessage, removeError, loggingIn, status } = useContext(AuthContext);

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const [errorModal, setErrorModal] = useState(false);

    const navigation = useNavigation<any>();
    const { Id_Usuario, password, onChange } = useForm({
        Id_Usuario: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;
        setErrorModal(true)
    }, []);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ Id_Usuario, password });
    };

    const handleNavigateToProfile = () => {
        navigation.navigate('BottomNavigation', {
            screen: 'BottomNavigation - Profile', params: {
                screen: '[ProfileNavigation] - personalInformationScreen',
                params: { fromLogIn: true }
            }
        });
    };
    const { protectThisPage } = useProtectPage({
        protectionCondition: status === 'authenticated',
        navigatePage: 'typeOfMovementScreen'
    })

    const keyboardActive = useKeyboardStatus();
    if (loggingIn) return <LoadingScreen message='Iniciando sesion...' state={loggingIn} />;

    return !protectThisPage ? (
        <>
            <KeyboardAvoidingView
                style={[loginStyles(theme).LoginScreen]}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={loginStyles(theme).formContainer}>
                        <View style={loginStyles(theme).imageContainer}>
                            <Image
                                style={[keyboardActive ? loginStyles(theme).logoActived : loginStyles(theme).logo]}
                                source={require('../../assets/logo01.png')}
                            />
                        </View>
                        <Text style={loginStyles(theme).title}>Bienvenido!</Text>
                        <Text style={loginStyles(theme).textLogin}>Ingresar datos de Usuario</Text>

                        <TextInput
                            placeholder="Escribe tu Id Usuario..."
                            placeholderTextColor={theme.text_color}
                            keyboardType="email-address"
                            style={[inputStyles(theme, typeTheme).input, globalStyles(theme).globalMarginBottom]}
                            selectionColor={theme.text_color}
                            onChangeText={(value) => onChange(value, 'Id_Usuario')}
                            value={Id_Usuario}
                            onSubmitEditing={onLogin}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <InputPassword
                            password={password}
                            onChange={onChange}
                            onLogin={onLogin}
                            placeholder={"Escribe tu contraseña..."}
                            inputName="password"
                        />

                        <View style={loginStyles(theme).buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                                onPress={onLogin}
                            >
                                <Text style={buttonStyles(theme).buttonText}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={loginStyles(theme).footer} onPress={handleNavigateToProfile}>
                        <Text style={loginStyles(theme).footerText}>Configuración</Text>
                        <Icon name="cog-outline" size={20} color={iconColor} />
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAvoidingView>

            <ModalMiddle
                visible={errorModal}
                onClose={() => {
                    setErrorModal(false);
                    removeError();
                }}
                title="Login incorrecto"
            >
                <View>
                    <Text>{errorMessage}</Text>
                </View>
            </ModalMiddle>
        </>
    )
        :
        <LoadingScreen message='Redireccionando...' state={!protectThisPage} />
};

