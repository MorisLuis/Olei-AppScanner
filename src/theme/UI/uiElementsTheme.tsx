import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const uiNavigationStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    FooterScreen: {
        backgroundColor: theme.background_color,
        height: hp("20%"),
        width: '100%',
        position: "absolute",
        bottom: 0,
        display: "flex",
        borderTopWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary
    },
    FooterScreenContainer: {
        marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        paddingHorizontal:  globalStyles(theme).globalPadding.padding,
    },
    FooterTwoButtonsScreen: {
        backgroundColor: theme.background_color,
        position: 'absolute',
        bottom: 0,
        right: globalStyles(theme).globalPadding.padding,
        width: wp("100%") - globalStyles().globalPadding.padding * 2,
        borderEndWidth: 0,
        display: 'flex',
        alignItems: 'flex-end',
        height: hp("12.5%")
    },
    FooterTwoButtonsScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
});