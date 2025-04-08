import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ProductInterface from '../../interface/product';
import {customHeaderStyles} from '../../theme/UI/customHeader';
import {useTheme} from '../../context/ThemeContext';
import { Theme } from '../../theme/appTheme';

interface CustomHeaderInterface {
  navigation: {
    goBack: () => void;
  };
  title: string;

  backAvailable?: boolean;
  back?: () => void;
  backCustum?: boolean;
  secondaryDesign?: boolean;
  route?: {
    params?: {
      selectedProduct?: ProductInterface;
      fromModal?: boolean;
    };
  };
}

export const CustomHeader = ({
  navigation,
  title,
  backAvailable = true,
  backCustum = false,
  back,
  secondaryDesign,
  route,
}: CustomHeaderInterface) : JSX.Element => {
  const {fromModal} = route?.params || {};
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const handleOnPress = () : void => {
    if (typeof back === 'function' && backCustum) {
      back();
    } else if (typeof back === 'function') {
      back?.();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      {fromModal ? (
        <SafeAreaView style={customHeaderStyles(theme).CustomHeader}>
          {backAvailable && (
            <TouchableOpacity
              style={customHeaderStyles(theme).back}
              onPress={handleOnPress}>
              <Icon name="chevron-back-outline" size={20} color={iconColor} />
              <Text style={customHeaderStyles(theme).backText}>Atrás</Text>
            </TouchableOpacity>
          )}
          <Text style={customHeaderStyles(theme).titleHeader}>{title}</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: secondaryDesign
              ? theme.background_color_secondary
              : theme.background_color,
          }}>
          <View
            style={
              secondaryDesign
                ? customHeaderStyles(theme).CustomHeaderSecondary
                : customHeaderStyles(theme).CustomHeader
            }>
            {backAvailable && (
              <TouchableOpacity
                style={customHeaderStyles(theme).back}
                onPress={handleOnPress}>
                <Icon
                  name="chevron-back-outline"
                  size={hp('2.5%')}
                  color={iconColor}
                />
                <Text style={customHeaderStyles(theme).backText}>Atrás</Text>
              </TouchableOpacity>
            )}
            <Text style={customHeaderStyles(theme).titleHeader}>{title}</Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

interface CustomBackButtonProps {
  navigation: {
    goBack: () => void;
  };
  onClick?: () => void; // Define el tipo como una función opcional
}

export const CustomBackButton = ({
  navigation,
  onClick,
}: CustomBackButtonProps) : JSX.Element => {
  const {typeTheme, theme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const handlePress = () : void => {
    onClick?.();
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={extraStyles().back} onPress={handlePress}>
      <Icon name="chevron-back-outline" size={20} color={iconColor} />
      <Text
        style={extraStyles(theme).back_text}>
        Atrás
      </Text>
    </TouchableOpacity>
  );
};

const extraStyles = (theme?: Theme): ReturnType<typeof StyleSheet.create> => ({
  back: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    bottom: 0,
  },
  back_text: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 3,
    color: theme?.text_color
  }
});
