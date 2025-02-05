import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const uiNavigationStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    FooterScreen: {
        backgroundColor: theme.background_color,
        position: 'absolute',
        bottom: 0,
        right: globalStyles(theme).globalPadding.padding,
        width: wp("100%") - globalStyles().globalPadding.padding * 2,
    },
    FooterScreenContainer: {
        marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom
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