import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const buttonStyles = (theme: Theme, typeTheme?: string) =>  StyleSheet.create({
    // Button size
    button: {
        height: hp("5%"),
        backgroundColor: theme.color_tertiary,
        borderWidth: 1,
        borderColor: theme.color_border_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        width: "100%",
        color: theme.text_color_secondary,
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "row",
        gap: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2
    },

    button_small: {
        height: hp("5%"),
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: theme.color_border_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        width: "100%",
        color: theme.color_tertiary,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    },

    button_line: {
        height: 36,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        width: "100%",
        color: theme.text_color_secondary,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    },

    // Button text
    buttonText: {
        color: theme.text_color_secondary,
        fontSize: globalFont.font_normal
    },

    buttonTextSecondary: {
        color: typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
        fontSize: globalFont.font_normal
    },

    buttonTextTertiary: {
        color: typeTheme === 'light' ? theme.text_color : theme.text_color,
        fontSize: globalFont.font_normal
    },

    buttonTextRed: {
        color: theme.color_red,
        fontSize: globalFont.font_normal
    },

    button_line_text: {
        textDecorationLine: "underline"
    },

    svg: {
        marginRight: 8
    },

    white: {
        backgroundColor: typeTheme === 'light' ? theme.color_primary : "transparent",
        color: theme.text_color,
        borderWidth: 1,
        borderColor: theme.color_border_tertiary,
    },

    search: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.color_border_tertiary,
        color: theme.text_color
    },

    black: {
        backgroundColor: theme.color_tertiary,
        color: theme.text_color_secondary
    },


    yellow: {
        backgroundColor: theme.color_yellow,
        color: theme.text_color_secondary
    },


    red: {
        backgroundColor: theme.color_red_light,
        color: theme.color_red_light,
    },

    transparent: {
        backgroundColor: "transparent",
        textDecorationLine: "underline"
    },


    disabled: {
        opacity: 0.5,
    }

})