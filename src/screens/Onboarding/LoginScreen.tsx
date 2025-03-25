import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../context/auth/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import {globalStyles} from '../../theme/appTheme';
import {loginStyles} from '../../theme/loginTheme';
import {inputStyles} from '../../theme/UI/inputs';
import {LoadingScreen} from '../LoadingScreen';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import {useForm} from '../../hooks/useForm';
import {InputPassword} from '../../components/Ui/InputPassword';
import {useProtectPage} from '../../hooks/useProtectPage';
import ButtonCustum from '../../components/Ui/ButtonCustum';

export const LoginScreen = () => {
  const {login, status, user: userAuth} = useContext(AuthContext);

  /* useProtectPage({
        condition: status === 'authenticated',
        navigatePage: userAuth?.TodosAlmacenes === 1 ? 'almacenScreen' : 'typeOfMovementScreen' //redireccion
    }); */

  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigation = useNavigation<any>();
  const keyboardActive = useKeyboardStatus();

  const {user, password, onChange} = useForm({
    user: '',
    password: '',
  });

  const onLogin = () => {
    setLoadingLogin(true);
    try {
      Keyboard.dismiss();
      login({usuario: user, password});
    } catch (error) {
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('BottomNavigation', {
      screen: 'BottomNavigation - Profile',
      params: {
        screen: '[ProfileNavigation] - personalInformationScreen',
        params: {fromLogIn: true},
      },
    });
  };

  //if (loggingIn) return <LoadingScreen message='Iniciando sesion...' state={loggingIn} />;

  return (
    <KeyboardAvoidingView
      style={[loginStyles(theme).LoginScreen]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1}}>
        <View style={loginStyles(theme).formContainer}>
          <View style={loginStyles(theme).imageContainer}>
            <Image
              style={[
                keyboardActive
                  ? loginStyles(theme).logoActived
                  : loginStyles(theme).logo,
              ]}
              source={require('../../assets/logo01.png')}
            />
          </View>
          <Text style={loginStyles(theme).title}>Bienvenido!</Text>
          <Text style={loginStyles(theme).textLogin}>
            Ingresar datos de Usuario
          </Text>

          <TextInput
            placeholder="Escribe tu Id Usuario..."
            placeholderTextColor={theme.text_color}
            keyboardType="email-address"
            style={[
              inputStyles(theme, typeTheme).input,
              globalStyles(theme).globalMarginBottom,
            ]}
            selectionColor={theme.text_color}
            onChangeText={(value) => onChange(value, 'user')}
            value={user}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <InputPassword
            password={password}
            onChange={onChange}
            onLogin={onLogin}
            placeholder={'Escribe tu contraseña...'}
            inputName="password"
          />

          <ButtonCustum
            title={'Iniciar sesión'}
            onPress={onLogin}
            disabled={user === '' || password === ''}
            loading={loadingLogin}
            extraStyles={{
              marginTop: globalStyles().globalMarginBottom.marginBottom,
            }}
          />
        </View>

        <TouchableOpacity
          style={loginStyles(theme).footer}
          onPress={handleNavigateToProfile}>
          <Text style={loginStyles(theme).footerText}>Configuración</Text>
          <Icon name="cog-outline" size={20} color={iconColor} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
