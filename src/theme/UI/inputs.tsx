import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const inputStyles = (theme: Theme) => StyleSheet.create({
    input: {
        height: hp("5%"),
        minHeight: 45,
        borderWidth: 1,
        borderColor: theme.color_border_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color_secondary,
        gap: 10,
        color: theme.text_color
    },

    inputicon: {
        marginLeft: 20
    },

    focusedInput: {
        borderWidth: 1,
        borderColor: 'transparent'
    }
});


export const selectStyles = (theme: Theme) => StyleSheet.create({
    input: {
        fontSize: globalFont.font_normal,
        paddingVertical: globalStyles(theme).globalPadding.padding,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        borderWidth: 1,
        borderColor: theme.color_border,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        color: theme.text_color,
        paddingRight: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
    }
});


export const toggleStyles = (theme: Theme) => StyleSheet.create({
    Toggle: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    toggleText: {

    },
    togglelabel: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold",
        color: theme.text_color
    },
    togglemessage: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    }
})