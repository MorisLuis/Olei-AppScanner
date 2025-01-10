import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ModalDecisionStyles } from '../../theme/ModalRenders/ModalDecisionTheme';
import { useTheme } from '../../context/ThemeContext';

interface ModalDecisionInterface {
    visible: boolean;
    children: ReactNode;
    message: string
}

const ModalDecision = ({
    visible,
    children,
    message
}: ModalDecisionInterface) => {

    const { theme, typeTheme } = useTheme();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={1}>
                <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                    <View style={ModalDecisionStyles(theme, typeTheme).ModalDecision}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <View style={ModalDecisionStyles(theme, typeTheme).modalContent}>
                                <Text style={ModalDecisionStyles(theme, typeTheme).message}>{message}</Text>
                                <View style={ModalDecisionStyles(theme, typeTheme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </BlurView>
        </Modal>
    );
};

export default ModalDecision;
