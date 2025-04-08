import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../context/ThemeContext';
import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';
import CustomText from '../CustumText';

interface CardSelectInterface {
  onPress: () => void;
  message: string;
  sameValue?: boolean;
  icon?: string;

  subMessage?: string | number;
  visible?: boolean;
  showSelect?: boolean;
}

const CardSelect = ({
  onPress,
  message,
  sameValue,
  icon,

  subMessage,
  visible = true,
  showSelect = true,
}: CardSelectInterface): JSX.Element | null => {
  const { theme, typeTheme } = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  return visible ? (
    <TouchableOpacity
      style={[
        ProductCardSelectTheme(theme).CardSelect,
        sameValue && { backgroundColor: theme.color_blue + '20' },
      ]}
      onPress={onPress}>
      <View style={ProductCardSelectTheme(theme).CardSelectInfo}>
        {icon && <Icon name={icon} size={20} color={iconColor} />}
        <View>
          <CustomText
            style={[
              ProductCardSelectTheme(theme).CardSelectMessage,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {message}
          </CustomText>

          {subMessage && (
            <CustomText
              style={
                ProductCardSelectTheme(theme).CardSelectSubMessage
              }
              numberOfLines={1}
              ellipsizeMode="tail">
              {subMessage}
            </CustomText>
          )}
        </View>
      </View>

      {showSelect && (
        <>
          {sameValue ? (
            <Icon
              name="checkmark-circle"
              size={20}
              color={theme.color_blue}
            />
          ) : (
            <View
              style={
                ProductCardSelectTheme(theme).optionCheck
              }></View>
          )}
        </>
      )}
    </TouchableOpacity>
  )
    : null
};

export default CardSelect;
