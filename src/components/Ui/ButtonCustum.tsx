import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme, globalFont } from '../../theme/appTheme'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import DotLoader from '../Ui/DotLaoder';
import CustomText from '../CustumText';
import { buttonStyles } from '../../theme/UI/buttons';

interface ButtonCustumInterface {
    onPress: () => void;
    title: string;

    disabled?: boolean;
    loading?: boolean;
    buttonColor?: keyof Theme;
    iconName?: string;
    iconColor?: string;
    extraStyles?: StyleProp<ViewStyle>;
}

const ButtonCustum = ({
    onPress,
    title,
    iconName,
    iconColor,
    extraStyles,
    disabled,
    loading,
    buttonColor
}: ButtonCustumInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                buttonStyles(theme, typeTheme).button,
                disabled && { opacity: 0.6 },
                extraStyles,
                buttonColor ? { backgroundColor: theme[`${buttonColor}`] } : {}
            ]}
            onPress={onPress}
            disabled={disabled}
        >

            {
                (iconName && !disabled) && <Icon name={iconName} color={iconColor} size={globalFont.font_normal} />
            }
            {
                disabled ?
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {loading ? <DotLoader /> : title}
                    </CustomText>
                    :
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {title}
                    </CustomText>
            }

        </TouchableOpacity>
    )
}

export default ButtonCustum