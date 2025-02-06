import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import { globalFont, globalStyles } from '../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../interface/navigation';
import ButtonCustum from '../components/Ui/ButtonCustum';

export const SessionExpiredScreen = () => {

    const { theme } = useTheme();
    const navigation = useNavigation<AppNavigationProp>();

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

            <ButtonCustum
                title={'Volver'}
                onPress={() => navigation.navigate('LoginDatabaseScreen')}
                disabled={false}
                loading={false}
            />
        </View>
    )
}
