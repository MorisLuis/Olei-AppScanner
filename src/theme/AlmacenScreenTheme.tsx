import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";


export const almacenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    AlmacenScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding
    },

    header:{
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    headerTitle:{
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    }
})