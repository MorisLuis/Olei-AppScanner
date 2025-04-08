import React, { useContext, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../theme/appTheme';
import { loginStyles } from '../../theme/loginTheme';
import { inputStyles } from '../../theme/UI/inputs';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { useForm } from '../../hooks/useForm';
import { InputPassword } from '../../components/Ui/InputPassword';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import { DELAY_HALF_A_SECOND } from '../../utils/globalConstants';

// Reemplaza require con import
import logo from '../../assets/logo01.png';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigationStackParamList } from '../../navigator/AppNavigation';
import { AuthNavigationProp } from '../../interface/navigation';

export type AppNavigationProp = NativeStackNavigationProp<
  AppNavigationStackParamList
>;

export const LoginScreen = (): JSX.Element => {
  const { loginClient } = useContext(AuthContext);

  const { theme, typeTheme } = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigation = useNavigation<AuthNavigationProp>();
  const keyboardActive = useKeyboardStatus();

  const { user, password, onChange } = useForm({
    user: '',
    password: '',
  });

  const onLogin = (): void => {
    setLoadingLogin(true);
    Keyboard.dismiss();
    loginClient({ Id_Usuario: user, password });
    setTimeout(() => {
      setLoadingLogin(false);
    }, DELAY_HALF_A_SECOND);
  };

  const handleNavigateToProfile = (): void => {
    navigation.navigate('PersonalInformationScreen', { fromLogIn: true });
  }

  return (
    <KeyboardAvoidingView
      style={[loginStyles(theme).LoginScreen]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={globalStyles().flex}>
        <View style={loginStyles(theme).formContainer}>
          <View style={loginStyles(theme).imageContainer}>
            <Image
              style={[
                keyboardActive
                  ? loginStyles(theme).logoActived
                  : loginStyles(theme).logo,
              ]}
              source={logo} // Logo importado directamente
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
              globalStyles().globalMarginBottom,
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
