import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { buttonStyles } from '../theme/UI/buttons';
import { globalFont, globalStyles } from '../theme/appTheme';
import { useNavigation } from '@react-navigation/native';

interface SessionExpiredScreenInterface {
    message?: string;
    state?: boolean;
    loading?: boolean

};

export const SessionExpiredScreen = ({
    message,
    state,
    loading
}: SessionExpiredScreenInterface) => {

    const { theme } = useTheme();
    const navigation = useNavigation<any>();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: globalStyles(theme).globalPadding.padding,
            backgroundColor: theme.background_color,
            height: "100%"
        }}>
            <Text
                style={{
                    color: theme.text_color,
                    marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                    fontSize: globalFont.font_med
                }}
            >
                La sentimos por las molestias pero la sesión término, es necesario volver iniciar sesión.
            </Text>
            <TouchableOpacity
                style={[buttonStyles(theme).button_small, buttonStyles(theme).yellow, { width: "50%" }]}
                onPress={() => navigation.navigate('LoginDatabaseScreen')}
            >
                <Text style={buttonStyles(theme).buttonTextTertiary}>Volver</Text>
            </TouchableOpacity>
        </View>
    )
}
