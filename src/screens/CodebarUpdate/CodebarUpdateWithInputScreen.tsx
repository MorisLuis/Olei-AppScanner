import React, { useContext, useState } from 'react'
import { KeyboardType, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { updateCodbar } from '../../services/costos';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import codebartypes from '../../utils/codebarTypes.json';
import { CodebarUpdateWithInputScreenStyles } from '../../theme/CodebarUpdateWithInputScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import { CodebarUpdateNavigationProp } from '../../interface/navigation';

interface CodebarUpdateWithInputScreenInterface {
    Codigo: string; 
    Id_Marca: number
}

export const CodebarUpdateWithInputScreen = ({ Codigo, Id_Marca }: CodebarUpdateWithInputScreenInterface) => {

    const [text, setText] = useState('');
    const navigation = useNavigation<CodebarUpdateNavigationProp>();
    const { codebarType } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);


    const hanldeUpdateCodebarWithCodeRandom = async () => {

        try {            
            if (!Codigo || !Id_Marca ) {
                handleError({
                    status: 400,
                    Message: "Codigo, Id_Marca  neccesary in hanldeUpdateCodebarWithCodeRandom/CodebarUpdateWithInputScreen",
                    Metodo: "B-PUT"
                })
                return;
            };
    
            if (!regex.test(text)) return;
    
            const response = await updateCodbar({
                codigo: Codigo,
                Id_Marca: Id_Marca,
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