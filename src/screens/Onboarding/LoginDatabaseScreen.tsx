import React, { useContext, useEffect, useState } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useForm } from '../../hooks/useForm';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { LoadingScreen } from '../LoadingScreen';

import { inputStyles } from '../../theme/UI/inputs';
import { globalStyles } from '../../theme/appTheme';
import { loginDBStyles } from '../../theme/loginTheme';

import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import Banner from "../../assets/OLEIAPP.svg";
import Logo from "../../assets/Logo.svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../../context/ThemeContext';
import { InputPassword } from '../../components/Ui/InputPassword';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import ButtonCustum from '../../components/Ui/ButtonCustum';


export const LoginDatabaseScreen = () => {

    const { signInDB, errorMessage, removeError, loggingIn } = useContext(DbAuthContext);
    const { user, password, onChange } = useForm({ user: '', password: '' });
    const { theme, typeTheme } = useTheme();
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        if (errorMessage.length === 0) return;
        setErrorModal(true)
    }, [errorMessage]);

    const onLogin = () => {
        setLoadingLogin(true)
        try {
            Keyboard.dismiss();
            signInDB({ IdUsuarioOLEI: user, PasswordOLEI: password });
        } catch (error) {
            console.log({error})
        } finally {
            setLoadingLogin(false)
        };
    }


    const keyboardActive = useKeyboardStatus();

    if (loggingIn) return <LoadingScreen message='Iniciando sesion...' state={loggingIn} />;

    return (
        <>
            <KeyboardAvoidingView
                style={loginDBStyles(theme).LoginDBScreen}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginDBStyles(theme).formContainer}>

                    <View style={loginDBStyles(theme).logoContainer}>
                        <Logo width={keyboardActive ? wp("35%") : wp("60%")} height={"100%"} />
                    </View>

                    <View style={[keyboardActive ? loginDBStyles(theme).imageContainerActive : loginDBStyles(theme).imageContainer]}>
                        <Banner width={keyboardActive ? "50%" : "90%"} height={"100%"} />
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
                        style={[inputStyles(theme, typeTheme).input, globalStyles(theme).globalMarginBottom]}
                        selectionColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'user')}
                        value={user}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <InputPassword
                        onChange={onChange}
                        onLogin={onLogin}
                        placeholder={"Escribe Contraseña Olei"}
                        inputName="password"
                    />

                    <ButtonCustum
                        title={'Ingresar'}
                        onPress={onLogin}
                        disabled={user === '' || password === ''}
                        loading={loadingLogin}
                        extraStyles={{
                            marginTop: globalStyles().globalMarginBottom.marginBottom
                        }}
                    />

                </View>
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
    );
};