import React, {ReactNode} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';

import {useTheme} from '../../context/ThemeContext';
import {ModalCompleteStyles} from '../../theme/ModalRenders/ModalCompleteTheme';

interface ModalCompleteInterface {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const ModalComplete = ({
  visible,
  onClose,
  title,
  children,
}: ModalCompleteInterface) => {
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={5}>
        <View style={ModalCompleteStyles(theme).modalComplete}>
          <View style={ModalCompleteStyles(theme).modalContent}>
            <TouchableOpacity
              style={ModalCompleteStyles(theme).header}
              onPress={onClose}>
              <Icon name="close-outline" size={24} color={iconColor} />
              {title && (
                <Text style={ModalCompleteStyles(theme).title}>{title}</Text>
              )}
            </TouchableOpacity>
            <View style={ModalCompleteStyles(theme).modalChildren}>
              {children}
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ModalComplete;
