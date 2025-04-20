import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ErrorScreenStyles } from '../theme/ErrorScreenTheme';
import ButtonCustom from '../components/Ui/ButtonCustum';
import { globalStyles } from '../theme/appTheme';


interface ErroScreenInterface {
    onRetry: () => void;
    title: string;
}

export const ErroScreen = ({
    onRetry,
    title
}: ErroScreenInterface): JSX.Element => {

    const { theme } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={[ErrorScreenStyles(theme).SuccesMessage]}>
                <View style={ErrorScreenStyles(theme).content}>
                    <Text style={ErrorScreenStyles(theme).title}>
                        {title}
                    </Text>
                    <Text style={ErrorScreenStyles(theme).text}>
                        Intentatalo de nuevo.
                    </Text>
                    <ButtonCustom
                        title={'Reintentar'}
                        onPress={onRetry}
                        disabled={false}
                        loading={false}
                        buttonColor="color_yellow"
                        textColor="text_color"
                        extraStyles={{ marginBottom: globalStyles().globalMarginBottomSmall.marginBottom }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
