import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { CodebarUpdateScreenStyles } from '../../theme/CodebarUpdateScreenTheme';

interface CodebarUpdateOptionCardInterface {
    message: string;
    icon?: string;
    onClick: () => void;
    active: boolean;
    visible?: boolean;
}

export const CodebarUpdateOptionCard = ({
    message,
    icon = 'close-outline',
    onClick,
    active,
    visible = true
}: CodebarUpdateOptionCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return visible && (
        <TouchableOpacity
            style={[productDetailsStyles(theme).optionCodebar, active && productDetailsStyles(theme).selectedOption]}
            onPress={onClick}
        >
            <Icon
                name={icon}
                size={24}
                color={iconColor} style={productDetailsStyles(theme).optionCodebar_icon}
            />
            <Text
                style={CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText}
            >
                {message}
            </Text>
        </TouchableOpacity>
    );
};
