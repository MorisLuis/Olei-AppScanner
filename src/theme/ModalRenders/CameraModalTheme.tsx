import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const CameraModalStyles = (theme: Theme) =>
  StyleSheet.create({
    cameraScreen: {},
    content: {
      display: 'flex',
      flexDirection: 'row',
      height: 200,
      width: '100%',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      borderRadius: 10,
      overflow: 'hidden',
    },
    camera: {
      width: '100%',
      backgroundColor: 'black',
    },
    header: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    header_title: {
      fontSize: globalFont.font_med,
      fontWeight: 'bold',
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
      color: theme.text_color,
    },
    header_message: {
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    header_message_scanner: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    codebarFound: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textcodebarFound: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    warningMessage: {
      paddingBottom: globalStyles().globalPadding.padding,
      fontSize: globalFont.font_normal,
      color: theme.color_red,
    },
  });
