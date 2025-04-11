import { StyleSheet } from 'react-native';
import { Theme, globalFont, globalStyles } from './appTheme';

export const ErrorScreenStyles = (theme: Theme) =>
    StyleSheet.create({
        SuccesMessage: {
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: theme.background_color,
            zIndex: 9999,
            padding: globalStyles().globalPadding.padding,
            justifyContent: 'center',
        },
        content: {
            padding: globalStyles().globalPadding.padding,
        },
        title: {
            fontSize: globalFont.font_big,
            width: '80%',
            color: theme.color_tertiary,
            fontWeight: 'bold',
            marginBottom: globalStyles().globalMarginBottom.marginBottom,
        },
        text: {
            fontSize: globalFont.font_normal,
            width: '80%',
            color: theme.color_tertiary,
            marginBottom: globalStyles().globalMarginBottom.marginBottom,
        },
        actions: {
            width: '40%',
        },
    });
