import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'

import { inputStyles } from '../../theme/UI/inputs';

import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';


interface InputPasswordInterface {
    password?: string;
    onChange: (value: string, field: any) => void;
    onLogin: () => void;
    placeholder: string;

    inputName: string
}

export const InputPassword = ({
    password,
    onChange,
    onLogin,
    placeholder,
    inputName
}: InputPasswordInterface) => {

    const { theme, typeTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);


    return (
        <View style={[inputStyles(theme, typeTheme).passwordContainer]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.text_color}
                secureTextEntry={!showPassword}
                style={[inputStyles(theme, typeTheme).input, inputStyles(theme, typeTheme).passwordInput]}
                selectionColor={theme.text_color}
                onChangeText={(value) => onChange(value, inputName)}
                value={password}
                onSubmitEditing={onLogin}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={[inputStyles(theme, typeTheme).passwordToggle, { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }]} // Aumenta el área táctil a 48x48
            >
                <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={theme.text_color}
                />
            </TouchableOpacity>
        </View>
    )
};