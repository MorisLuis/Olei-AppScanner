import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalBottomStyles } from '../../theme/ModalRenders/ModalBottomTheme';
import { useTheme } from '../../context/ThemeContext';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;

    blurNotAvailable?: boolean;
    blurType?: 'light' | 'dark';
    blurAmount?: number
}

const ModalBottom = ({
    visible,
    onClose,
    children,

    blurNotAvailable = false,
    blurType = "light",
    blurAmount = 5
}: ModalBottomInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };


    const render = () => {
        return (
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <View style={ModalBottomStyles(theme).modalBottom}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View style={ModalBottomStyles(theme, typeTheme).modalContent}>
                            <TouchableWithoutFeedback onPress={onClose}>
                                <TouchableOpacity style={ModalBottomStyles(theme, typeTheme).header} onPress={onClose}>
                                    <Icon name="close-outline" size={24} color={iconColor} />
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>
                            <View style={ModalBottomStyles(theme).modalChildren}>
                                {children}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            {
                blurNotAvailable ?
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        {render()}
                    </View>
                    :
                    <BlurView style={StyleSheet.absoluteFill} blurType={blurType} blurAmount={blurAmount}>
                        {render()}
                    </BlurView>
            }
        </Modal>
    );
};

export default ModalBottom;

