import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const counterStyles = (theme: Theme) => StyleSheet.create({
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    input: {
        textAlign: 'center',
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        backgroundColor: theme.background_color_secondary,
        paddingHorizontal: wp("7.5%"),
        paddingVertical: 10,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    counterButton: {
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        minWidth: "20%",
        display:"flex",
        alignItems:'center'
    }
})