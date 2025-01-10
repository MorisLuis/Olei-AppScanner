import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ModalMiddlenStyles } from '../../theme/ModalRenders/ModalMiddleTheme';
import { useTheme } from '../../context/ThemeContext';

interface ModalMiddleInterface {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string
}

const ModalMiddle = ({
    visible,
    onClose,
    children,
    title
}: ModalMiddleInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {
                Platform.OS === "android" ?
                    <View style={[StyleSheet.absoluteFill]}>
                        <View style={ModalMiddlenStyles(theme, typeTheme).ModalMiddle}>
                            <View style={ModalMiddlenStyles(theme, typeTheme).modalBackground}></View>
                            <View style={ModalMiddlenStyles(theme, typeTheme).modalContent}>
                                <TouchableOpacity style={ModalMiddlenStyles(theme, typeTheme).header} onPress={onClose}>
                                    {
                                        title ?
                                            <Text style={ModalMiddlenStyles(theme, typeTheme).title}>{title}</Text> : <Text></Text>
                                    }
                                    <View style={{ backgroundColor: 'red', width: 24, height: 24 }}>
                                        <Icon name="close-outline" size={hp("4%")} color={iconColor} />
                                    </View>
                                </TouchableOpacity>
                                <View style={ModalMiddlenStyles(theme, typeTheme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                        </View>

                    </View>
                    :
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={5}
                    >
                        <View style={ModalMiddlenStyles(theme, typeTheme).ModalMiddle}>
                            <View style={ModalMiddlenStyles(theme, typeTheme).modalContent}>
                                <TouchableOpacity style={ModalMiddlenStyles(theme, typeTheme).header} onPress={onClose}>
                                    {
                                        title ?
                                            <Text style={ModalMiddlenStyles(theme, typeTheme).title}>{title}</Text> : <Text></Text>
                                    }
                                    <View style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="close-outline" size={24} color={iconColor} />
                                    </View>
                                </TouchableOpacity>
                                <View style={ModalMiddlenStyles(theme, typeTheme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                        </View>
                    </BlurView>
            }
        </Modal>

    );
};

export default ModalMiddle;
