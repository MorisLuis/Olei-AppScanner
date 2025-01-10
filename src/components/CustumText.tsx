import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { globalFont } from '../theme/appTheme';

// Componente de texto personalizado
const CustomText: React.FC<TextProps & { style?: TextStyle }> = ({ style, ...props }) => {
    const { theme } = useTheme();

    return (
        <Text
            style={[{ fontFamily: 'SourceSans3-Regular', fontSize: globalFont.font_normal, color: theme.text_color }, style]}
            {...props}
        />
    );
};

export default CustomText;
