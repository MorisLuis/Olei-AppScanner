import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme, globalFont } from '../../theme/appTheme';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import DotLoader from '../Ui/DotLaoder';
import CustomText from '../CustumText';
import { buttonStyles } from '../../theme/UI/buttons';

interface ButtonCustomProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    loading?: boolean;
    iconName?: string;
    iconColor?: string;
    buttonColor?: keyof Theme;
    textColor?: keyof Theme;
    extraStyles?: StyleProp<ViewStyle>;
    butonSecondary?: boolean;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
    onPress,
    title,
    iconName,
    iconColor,
    extraStyles,
    disabled = false,
    loading = false,
    buttonColor,
    textColor,
    butonSecondary
}) => {
    const { theme, typeTheme } = useTheme();

    // Memoiza los estilos para evitar recalculaciones innecesarias
    const buttonStyle = useMemo(() => [
        buttonStyles(theme, typeTheme).button,
        disabled && { opacity: 0.6 },
        extraStyles,
        buttonColor ? { backgroundColor: theme[buttonColor] } : {},

        // button secondary
        butonSecondary && buttonStyles(theme, typeTheme).button_secondary,
    ], [theme, typeTheme, disabled, extraStyles, buttonColor]);

    const textStyle = useMemo(() => [
        buttonStyles(theme, typeTheme).buttonText,
        textColor ? { color: theme[textColor] } : {},

        // button secondary
        butonSecondary && buttonStyles(theme, typeTheme).buttonTextSecondary,
    ], [theme, typeTheme, textColor]);

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}
        >
            {iconName && (
                <Icon name={iconName} color={iconColor} size={globalFont.font_normal} />
            )}

            <CustomText style={textStyle}>
                {loading ? <DotLoader /> : title}
            </CustomText>
        </TouchableOpacity>
    );
};

export default ButtonCustom;
