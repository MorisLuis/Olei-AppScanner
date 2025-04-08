import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../context/ThemeContext';
import {EmptyMessageCardStyles} from '../../theme/UI/cardsStyles';

interface EmptyMessageCardInterface {
  title: string;
  message: string;
  icon?: string;
}

export const EmptyMessageCard = ({
  message,
  title,
  icon = 'close-outline',
}: EmptyMessageCardInterface) : JSX.Element => {
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  return (
    <View style={EmptyMessageCardStyles(theme, typeTheme).EmptyMessageCard}>
      <View style={EmptyMessageCardStyles(theme, typeTheme).iconContainer}>
        <Icon
          name={icon}
          size={24}
          color={iconColor}
          style={EmptyMessageCardStyles(theme, typeTheme).icon}
        />
      </View>

      <Text style={EmptyMessageCardStyles(theme, typeTheme).title}>
        {title}
      </Text>
      <Text style={EmptyMessageCardStyles(theme, typeTheme).message}>
        {message}
      </Text>
    </View>
  );
};
