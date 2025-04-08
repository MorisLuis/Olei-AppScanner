import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import {counterStyles} from '../../theme/UI/counterStyles';
import {useTheme} from '../../context/ThemeContext';
import { NUMBER_0 } from '../../utils/globalConstants';

interface CounterInterface {
  counter: number;
  setCounter:
    | React.Dispatch<React.SetStateAction<number>>
    | ((_value: number) => void);
  limit?: number;
}

const COUNT_MINIMUM = 1;
export const Counter = ({counter, setCounter, limit}: CounterInterface) : JSX.Element => {
  const {theme, typeTheme} = useTheme();
  const iconColor = typeTheme === 'dark' ? 'white' : 'black';

  const addProduct = () : void => {
    if (counter === limit) {
      Toast.show({
        type: 'tomatoError',
        text1: 'Este es el limite de productos que pueden salir',
      });
      return;
    }
    setCounter(counter + COUNT_MINIMUM);
  };

  const handleInputChange = (value: string) : void => {
    const numericValue = parseInt(value) || NUMBER_0;
    if (limit && numericValue > limit) {
      Toast.show({
        type: 'tomatoError',
        text1: 'Este es el limite de productos que pueden salir',
      });
      return;
    }
    setCounter(numericValue);
  };

  const subtractProduct = () : void => {
    if (counter === NUMBER_0) return;
    setCounter(counter - COUNT_MINIMUM);
  };

  return (
    <View style={counterStyles(theme).counter}>
      <TouchableOpacity
        onPress={subtractProduct}
        style={counterStyles(theme).counterButton}>
        <Icon name="remove-outline" size={hp('3.5%')} color={iconColor} />
      </TouchableOpacity>

      <TextInput
        style={counterStyles(theme).input}
        value={counter.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={addProduct}
        style={counterStyles(theme).counterButton}>
        <Icon name="add-outline" size={hp('3.5%')} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};
