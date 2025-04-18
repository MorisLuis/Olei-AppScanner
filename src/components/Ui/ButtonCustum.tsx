import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { Theme, globalFont } from '../../theme/appTheme';
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
  buttonSmall?: boolean;
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
  butonSecondary,
  buttonSmall,
}) => {
  const { theme, typeTheme } = useTheme();

  // Memoiza los estilos para evitar recalculaciones innecesarias
  const buttonStyle = useMemo(
    () => [
      buttonStyles(theme, typeTheme).button,
      disabled && { opacity: 0.6 },
      extraStyles,
      buttonColor ? { backgroundColor: theme[buttonColor] } : {},

      // button secondary
      butonSecondary && buttonStyles(theme, typeTheme).button_secondary,
      buttonSmall && buttonStyles(theme, typeTheme).button_small,
    ],
    [theme, typeTheme, disabled, extraStyles, buttonColor, butonSecondary, buttonSmall],
  );

  const textStyle = useMemo(
    () => [
      buttonStyles(theme, typeTheme).buttonText,
      textColor ? { color: theme[textColor] } : {},

      // button secondary
      butonSecondary && buttonStyles(theme, typeTheme).buttonTextSecondary,
      buttonSmall && buttonStyles(theme, typeTheme).buttonTextSecondary,
    ],
    [theme, typeTheme, textColor, butonSecondary, buttonSmall],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
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
