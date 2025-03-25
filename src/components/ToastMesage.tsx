import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import CustomText from './CustumText';
import { globalFont, globalStyles } from '../theme/appTheme';

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),

    tomatoToast: ({ text1 }: BaseToastProps) => (
        <View style={styles.ToastMessage}>
            <Icon name="checkmark-circle" size={24} color="yellowgreen" style={styles.icon} />
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.message}>
                {text1}
            </CustomText>
        </View>
    ),

    tomatoError: ({ text1 }: BaseToastProps) => (
        <View style={styles.ToastMessage}>
            <Icon name="close-circle" size={24} color="red" style={styles.icon} />
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.message}>
                {text1}
            </CustomText>
        </View>
    )
};


export const ShowToastMessage = () => {
    return <Toast config={toastConfig} />
}

const styles = StyleSheet.create({
    ToastMessage: {
        display: "flex",
        minHeight: 50,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: globalStyles().borderRadius.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        padding: globalStyles().globalPadding.padding,
        position: 'absolute',
        top: 20,
        zIndex: 999999999,
        elevation: 999999999,     // Para Android
    },
    icon: {
        marginRight: 10,
    },
    message: {
        fontSize: globalFont.font_normal,
        flexShrink: 1,
        marginRight: 10,

    }
});
