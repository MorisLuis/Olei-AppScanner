import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { scanButtonStyles } from '../../theme/UI/buttons';
import { useTheme } from '../../context/ThemeContext';
import { NUMBER_1 } from '../../utils/globalConstants';

interface Props {
    onPress: () => void;
}

const BUTTON_PRESS_SCALE = 0.92;


export const ScanButton = ({ onPress }: Props): JSX.Element => {
    const scale = useSharedValue(NUMBER_1);
    const { theme } = useTheme();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = (): void => {
        // Animación de escala
        scale.value = withSpring(BUTTON_PRESS_SCALE, { stiffness: 250 }, () => {
            scale.value = withSpring(NUMBER_1);
        });

        // Callback del botón
        onPress();
    };

    return (
        <Animated.View
            style={[
                scanButtonStyles(theme).scanButton,
                animatedStyle
            ]}
        >
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={1}
                style={scanButtonStyles(theme).scanButton_touch}
            >
                <Icon name="scan-outline" size={30} color={theme.text_color} />
            </TouchableOpacity>
        </Animated.View>
    );
};
