import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalFont } from '../../theme/appTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ModalMiddleInterface {
    visible: boolean;
    onClose: () => void;
    children: any;
    title?: string
}

const ModalMiddle = ({
    visible,
    onClose,
    children,
    title
}: ModalMiddleInterface) => {

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
                        <View style={styles.ModalMiddle}>
                            <View style={styles.modalBackground}></View>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.header} onPress={onClose}>
                                    {
                                        title ?
                                            <Text style={styles.title}>{title}</Text> : <Text></Text>
                                    }
                                    <Icon name="close-outline" size={hp("4%")} color="black" />
                                </TouchableOpacity>
                                <View style={styles.modalChildren}>
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
                        <View style={styles.ModalMiddle}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.header} onPress={onClose}>
                                    {
                                        title ?
                                            <Text style={styles.title}>{title}</Text> : <Text></Text>
                                    }
                                    <Icon name="close-outline" size={hp("4%")} color="black" />
                                </TouchableOpacity>
                                <View style={styles.modalChildren}>
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

const styles = StyleSheet.create({
    ModalMiddle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: colores.background_color,
        shadowColor: colores.color_secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: wp("95%"),
        height: "auto",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    modalBackground: {
        height: "100%",
        width: "100%",
        backgroundColor: 'black',
        opacity: 0.6,
        position: "absolute",
    },
    modalChildren: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: colores.color_border
    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal
    }
});

