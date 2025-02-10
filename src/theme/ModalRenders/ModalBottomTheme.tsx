import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";


export const ModalBottomStyles = (theme?: Theme, typeTheme?: string) => StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: theme?.background_color,
        shadowColor: theme?.background_color_tertiary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme?.color_border_tertiary
    },
    modalHeader:{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        minHeight: 40,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: typeTheme === 'light' ? theme?.color_border_tertiary : theme?.color_border_tertiary,
    },
    modalHeader__Title: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center'
    },
    modalHeader__icon: {
        width: "10%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    modalChildren: {
        padding: globalStyles(theme).globalPadding.padding,
        paddingTop: 10,
        minHeight: 80
    },
    menuModal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    menuModalOption: {
        display: 'flex',
        flexShrink: 1,
        width: 'auto',
        padding:  globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        paddingHorizontal: globalStyles().globalPadding.padding,
        minHeight: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme?.color_border
    }
});
