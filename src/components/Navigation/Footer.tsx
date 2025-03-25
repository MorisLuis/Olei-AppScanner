import {View} from 'react-native';
import React from 'react';

import {useTheme} from '../../context/ThemeContext';
import ButtonCustum from '../Ui/ButtonCustum';
import {uiNavigationStyles} from '../../theme/UI/uiElementsTheme';
import {Theme} from '../../theme/appTheme';

interface FooterScreenInterface {
  buttonTitle: string;
  buttonOnPress: () => void;
  buttonDisabled: boolean;
  buttonLoading?: boolean;

  visible?: boolean;
  buttonProperties?: {
    iconName?: string;
    iconColor?: string;
    buttonColor?: keyof Theme;
    textColor?: keyof Theme;
  };
}

const FooterScreen = ({
  buttonTitle,
  buttonOnPress,
  buttonDisabled,
  buttonLoading,
  buttonProperties,
  visible = true,
}: FooterScreenInterface) => {
  const {typeTheme, theme} = useTheme();

  return (
    visible && (
      <View style={uiNavigationStyles(theme, typeTheme).FooterScreen}>
        <View
          style={uiNavigationStyles(theme, typeTheme).FooterScreenContainer}>
          <ButtonCustum
            title={buttonTitle}
            onPress={buttonOnPress}
            disabled={buttonDisabled}
            loading={buttonLoading}
            iconName={buttonProperties?.iconName}
            iconColor={buttonProperties?.iconColor}
            buttonColor={buttonProperties?.buttonColor}
            textColor={buttonProperties?.textColor}
          />
        </View>
      </View>
    )
  );
};

export default FooterScreen;
