import React, {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {inputStyles} from '../../theme/UI/inputs';
import {useTheme} from '../../context/ThemeContext';

type FieldType = 'password' | 'user'; // Puedes agregar más valores aquí

interface InputPasswordInterface {
  password?: string;
  onChange: (_value: string, _field: FieldType) => void;
  onLogin: () => void;
  placeholder: string;

  inputName: FieldType;
}

export const InputPassword = ({
  password,
  onChange,
  onLogin,
  placeholder,
  inputName,
}: InputPasswordInterface) : JSX.Element => {
  const {theme, typeTheme} = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[inputStyles(theme, typeTheme).passwordContainer]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.text_color}
        secureTextEntry={!showPassword}
        style={[
          inputStyles(theme, typeTheme).input,
          inputStyles(theme, typeTheme).passwordInput,
        ]}
        selectionColor={theme.text_color}
        onChangeText={(value) => onChange(value, inputName)}
        value={password}
        onSubmitEditing={onLogin}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={inputStyles(theme, typeTheme).passwordToggle}
      >
        <Icon
          name={showPassword ? 'eye-off' : 'eye'}
          size={22}
          color={theme.text_color}
        />
      </TouchableOpacity>
    </View>
  );
};
