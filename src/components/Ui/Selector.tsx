import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, Text, View} from 'react-native';

import {selectStyles} from '../../theme/UI/inputs';
import {Theme, globalFont, globalStyles} from '../../theme/appTheme';
import {useTheme} from '../../context/ThemeContext';

export type OptionType = {
  label: string;
  value: string | number;
};

interface SelectorInterface {
  items: OptionType[];
  onDone?: () => void;
  onValueChange: (_value: number) => void;
  value: string;
  label: string;
}

export const Selector = ({
  items,
  onDone,
  onValueChange,
  value,
  label,
}: SelectorInterface) : JSX.Element => {
  const {theme} = useTheme();

  const handleValueChange = (value: string) : void => {
    if (value == null) return;
    onValueChange(parseInt(value));
  };

  return (
    <View>
      <Text style={extraStyles(theme).selector}>
        {label}
      </Text>

      <RNPickerSelect
        onValueChange={handleValueChange}
        placeholder={{
          label: 'Selecciona una opción...',
          value: null,
        }}
        items={items}
        onDonePress={onDone}>
        <View style={selectStyles(theme).input}>
          <Text style={{color: theme.text_color}}>{value}</Text>
        </View>
      </RNPickerSelect>
    </View>
  );
};

const extraStyles = (theme: Theme): ReturnType<typeof StyleSheet.create> => ({
  selector: {
    fontWeight: 'bold',
    fontSize: globalFont.font_normal,
    marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
    color: theme.text_color
  }
})