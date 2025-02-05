
import { Dimensions, StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const cameraStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: theme.color_black,
        position: "relative"
    },
    camera: {
        flex: 1,
        height: hp("100%"),
        width: wp('100%'),
        position: "absolute",
        top: 0
    },
    backgroundBlurTop: {
        backgroundColor: theme.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2
    },
    backgroundBlurBottom: {
        backgroundColor: theme.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2
    },
    scannerOptions: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        bottom: hp("10%"),
        right: wp("6%"),
        padding: globalStyles(theme).globalPadding.padding / 2,
        zIndex: 2,
        width: wp("20%"),
        height: wp("20%"),

    },
    option: {
        flex: 1,
        borderRadius: 30,
        padding: 5,
        backgroundColor: theme.background_color_blur,
    },
    optionAndroid: {
        flex: 1,
        borderRadius: 30,
        padding: 5,
        backgroundColor: theme.background_color,
    },
    optionContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: typeTheme === 'light' ? theme.color_black : theme.color_black
    },
    message: {
        position: "absolute",
        top: hp("25%"),
        left: wp("20%"),
        width: wp("60%"),
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2,
    },
    textmessage: {
        color: typeTheme === 'light' ? theme.text_color_secondary : theme.text_color,
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        fontSize: globalFont.font_normal
    },
    actions: {
        position: "absolute",
        right: wp("5%"),
        top: hp("50%"),
        zIndex: 2,
        transform: [{ translateY: hp("-15%") }] 
    },
    flash: {
        marginBottom: 20
    },
    cog: {
        marginBottom: 20
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
})
