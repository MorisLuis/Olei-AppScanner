import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { LoaderStyles } from '../../theme/UI/LoaderStyles';
import { useTheme } from '../../context/ThemeContext';

const DotLoader = () => {
    const { theme, typeTheme } = useTheme();

    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDot = (dot: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, {
                        toValue: -10,
                        duration: 500,
                        delay: delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animateDot(dot1, 0);
        animateDot(dot2, 150);
        animateDot(dot3, 300);
    }, [dot1, dot2, dot3]);

    const dotStyle = (dot: Animated.Value): ViewStyle => ({
        transform: [
            {
                translateY: dot,
            },
        ],
    });

    return (
        <View style={LoaderStyles(theme).container}>
            <Animated.View style={[LoaderStyles(theme).dot, dotStyle(dot1)]} />
            <Animated.View style={[LoaderStyles(theme).dot, dotStyle(dot2)]} />
            <Animated.View style={[LoaderStyles(theme).dot, dotStyle(dot3)]} />
        </View>
    );
};


export default DotLoader;
