import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConfirmationScreenStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({

    ConfirmationScreen: {
        flex: 1,
        backgroundColor: theme.background_color_secondary
    },
    content:{
        height: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        paddingBottom: hp("20%")
    },
    confirmationHeader: {
        height: hp("20%"),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationHeader__icon: {
        position: 'relative',
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
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
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,

        // Sombra para iOS
        shadowColor: theme.text_color, // O el color que desees para la sombra
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.1, // Opacidad de la sombra
        shadowRadius: 4, // Difusión de la sombra
        
        // Sombra para Android
        elevation: 5, // Elevación de la vista para dar la sombra en Android
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
    ConfirmationScreen__redirection: {
        height: "100%",
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})