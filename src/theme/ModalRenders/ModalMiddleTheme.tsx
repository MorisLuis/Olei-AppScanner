import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const ModalMiddlenStyles = (theme: Theme, typeTheme: string) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.background_color,
      shadowColor: theme.color_secondary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: wp('95%'),
      height: 'auto',
      borderRadius: globalStyles(theme).borderRadius.borderRadius,
      borderWidth: 1,

      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.background_color,
    },
    modalBackground: {
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      opacity: 0.6,
      position: 'absolute',
    },
    modalChildren: {
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    },
    header: {
      width: '100%',
      top: 0,
      right: 0,
      paddingVertical: 10,
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.color_border_tertiary,
    },
    title: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
    },
  });
