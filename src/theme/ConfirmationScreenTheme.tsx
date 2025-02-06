import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConfirmationScreenStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({

    ConfirmationScreen: {
        flex: 1
    },
    content:{
        padding: globalStyles(theme).globalPadding.padding
    },
    confirmationHeader: {
        height: hp("20%"),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationHeader__icon: {
        position: 'relative',
        marginBottom: 15
    },
    confirmationHeaderTitle: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    confirmationInfo: {
        backgroundColor: typeTheme === "light" ? theme.background_color_tertiary : theme.background_color,
        borderWidth: 1,
        borderColor: typeTheme === "light" ? theme.color_border_secondary : theme.color_border_tertiary,
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2,
    },
    confirmationProductsContent: {
    },
    confirmationProductsContentHeader: {
        color: theme.text_color,
        fontSize: globalFont.font_sm,
        textTransform: "uppercase",
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2
    },

    confirmationText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    footer: {
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
        height: hp("25%"),
        maxHeight: 150,
        width: "100%",
        position: "absolute",
        bottom: 0,
        display: "flex",
        borderTopWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary,
    }
})