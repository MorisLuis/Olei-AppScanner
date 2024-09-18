import React, { useContext, useState } from 'react'
import { KeyboardType, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { updateCodbar } from '../../services/costos';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import codebartypes from '../../utils/codebarTypes.json';
import ProductInterface from '../../interface/product';
import { CodebarUpdateWithInputScreenStyles } from '../../theme/CodebarUpdateWithInputScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';

interface CodebarUpdateWithInputScreenInterface {
    productDetails?: ProductInterface
}

export const CodebarUpdateWithInputScreen = ({ productDetails }: CodebarUpdateWithInputScreenInterface) => {

    const [text, setText] = useState('');
    const navigation = useNavigation<any>();
    const { codebarType } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);


    const hanldeUpdateCodebarWithCodeRandom = async () => {

        try {            
            if (!productDetails) {
                handleError({
                    status: 400,
                    Message: "productDetails neccesary in hanldeUpdateCodebarWithCodeRandom/CodebarUpdateWithInputScreen",
                    Metodo: "B-PUT"
                })
                return;
            };
    
            if (!regex.test(text)) return;
    
            const response = await updateCodbar({
                codigo: productDetails?.Codigo,
                Id_Marca: productDetails?.Id_Marca,
                body: { CodBar: text }
            });

            if (response.error) {
                handleError(response.error);
                return;
            }

        } catch (error) {
            handleError(error);
        } finally{
            navigation.goBack()
            navigation.goBack()
        }

    }

    const handleTextChange = (value: string) => {
        setText(value);
    };

    return (
        <View style={CodebarUpdateWithInputScreenStyles(theme).CodebarUpdateWithInputScreen}>

            <Text style={CodebarUpdateWithInputScreenStyles(theme, typeTheme).inputLabel}>Escribe el codigo que quieras.</Text>

            <TextInput
                style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottomSmall]}
                placeholder="Ej: 654s1q"
                onChangeText={handleTextChange}
                keyboardType={currentType?.keyboardType as KeyboardType}
                maxLength={currentType?.maxLength}
                placeholderTextColor={"gray"}
            />

            <Text style={CodebarUpdateWithInputScreenStyles(theme).warningMessage}>{currentType?.errorMessage}</Text>

            {regex.test(text) && (
                <TouchableOpacity style={buttonStyles(theme).button} onPress={hanldeUpdateCodebarWithCodeRandom}>
                    <Text style={buttonStyles(theme).buttonText}>Actualizar</Text>
                </TouchableOpacity>
            )}
        </View>)
}