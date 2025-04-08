import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../context/ThemeContext';
import {ModalBottomStyles} from '../../theme/ModalRenders/ModalBottomTheme';
import CustomText from '../CustumText';
import { globalStyles } from '../../theme/appTheme';

interface ModalBottomInterface {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;

  blurNotAvailable?: boolean;
  blurAmount?: number;
  title?: string;
}

const ModalBottom = ({
  visible,
  onClose,
  children,
  blurNotAvailable = false,
  title,
}: ModalBottomInterface) : JSX.Element => {
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const render = () : JSX.Element => {
    return (
      <TouchableWithoutFeedback>
        <SafeAreaView style={globalStyles().flex}>
          <View style={ModalBottomStyles(theme).modalBottom}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.select({ios: 60, android: 60})}>
              <View style={ModalBottomStyles(theme, typeTheme).modalContent}>
                {/* Header */}
                <View style={ModalBottomStyles(theme, typeTheme).modalHeader}>
                  <View
                    style={
                      ModalBottomStyles(theme, typeTheme).modalHeader__Title
                    }>
                    {title && <CustomText>{title}</CustomText>}
                  </View>
                  <TouchableWithoutFeedback onPress={onClose}>
                    <TouchableOpacity
                      style={
                        ModalBottomStyles(theme, typeTheme).modalHeader__icon
                      }
                      onPress={onClose}>
                      <Icon name="close-outline" size={24} color={iconColor} />
                    </TouchableOpacity>
                  </TouchableWithoutFeedback>
                </View>

                {/* Children */}
                <View style={ModalBottomStyles(theme).modalChildren}>
                  {children}
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      {blurNotAvailable ? (
        <View style={ModalBottomStyles().modalBottom_wrapp}>
          {render()}
        </View>
      ) : (
        <View style={ModalBottomStyles().modalBottom_wrapp}>
          {render()}
        </View>
      )}
    </Modal>
  );
};

export default ModalBottom;
