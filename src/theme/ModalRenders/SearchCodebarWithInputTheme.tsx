import { StyleSheet } from 'react-native';

import { Theme, globalFont, globalStyles } from '../appTheme';

export const modalRenderstyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
  SearchCodebarWithInput: {},
  SearchCodebarWithInput_title: {
    marginBottom: 10,
    fontSize: globalFont.font_normal,
    color: theme.text_color,
  },
  SearchCodebarWithInput_input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 10,
  },
  SearchCodebarWithInput_button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
  },
  SearchCodebarWithInput_button_text: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los elementos se rompan a la siguiente línea
    justifyContent: 'flex-start'
  },
  option: {
    backgroundColor: theme.background_color_tertiary,
    padding: globalStyles().globalPadding.padding / 2,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.color_border_tertiary,
    margin: 5
  },
  optionText: {
    fontSize: globalFont.font_normal,
    color: typeTheme === 'light' ? theme.text_color : theme.text_color,
  },
  optionTextActive: {
    fontSize: globalFont.font_normal,
    color:
      typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
  },
  optionActive: {
    backgroundColor: theme.color_yellow,
    borderColor: theme.color_border_tertiary,
  },
});

export const editProductStyles = (theme: Theme) =>
  StyleSheet.create({
    EditProductInBag_title: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    EditProductInBag_warning: {
      fontSize: globalFont.font_normal,
      color: theme.color_red,
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
    },
  });
