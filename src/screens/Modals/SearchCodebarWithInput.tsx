import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../services/products';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { modalRenderstyles } from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';

export const SearchCodebarWithInput = () => {

    const { updateBarCode } = useContext(SettingsContext);
    const navigation = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [Barcode, onChangeBarcode] = useState('');
    const [typeOfSearch, setTypeOfSearch] = useState('code')
    const [loadingSearch, setLoadingSearch] = useState(false)
    const buttondisabled = Barcode.length < 1 || loadingSearch;

    const handleSearchProductByCodebarInput = async () => {
        updateBarCode('')
        setLoadingSearch(true)

        let response;
        try {            
            if (typeOfSearch === 'code') {
                response = await getProductByCodeBar({ codigo: Barcode });
                if (response.error) {
                    handleError(response.error);
                    return;
                }
                handleNavigatoToProduct(response);
            } else {
                updateBarCode(Barcode)
                response = await getProductByCodeBar({ codeBar: Barcode });
                if (response.error) {
                    handleError(response.error);
                    return;
                }
                handleNavigatoToProduct(response);
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadingSearch(false);
        }
    }

    const handleNavigatoToProduct = (response: any) => {
        navigation.goBack()
        if (response.length === 1) {
            navigation.navigate('[Modal] - scannerResultScreen', { product: response[0] });
        } else if (response.length > 0) {
            navigation.navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigation.navigate('[Modal] - scannerResultScreen', { product: response[0] });
        }

    }

    const handleCloseModal = () => {
        navigation.goBack()
    }

    return (
        <ModalMiddle
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={modalRenderstyles(theme).SearchCodebarWithInput}>
                <Text style={modalRenderstyles(theme, typeTheme).SearchCodebarWithInput_title}>Escribe el {typeOfSearch === 'code' ? 'Codigo' : 'Codigo de barras'}:</Text>
                <TextInput
                    style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottomSmall]}
                    onChangeText={onChangeBarcode}
                    value={Barcode}
                    placeholder="Ej: 6541q"
                    placeholderTextColor={theme.color_gray}
                />
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black, globalStyles(theme).globalMarginBottomSmall,
                    ...(buttondisabled ? [buttonStyles(theme).disabled] : [])
                    ]}
                    onPress={handleSearchProductByCodebarInput}
                    disabled={buttondisabled}
                >
                    <Text style={buttonStyles(theme).buttonText}>{loadingSearch ?  "Buscando..." : "Buscar producto"}</Text>
                </TouchableOpacity>

                <View style={modalRenderstyles(theme).optionsContainer}>
                    <TouchableOpacity
                        style={[modalRenderstyles(theme).option, typeOfSearch === 'code' && modalRenderstyles(theme).optionActive]}
                        onPress={() => setTypeOfSearch('code')}
                    >
                        <Text style={
                            typeOfSearch === 'code' ?
                                modalRenderstyles(theme, typeTheme).optionTextActive : modalRenderstyles(theme, typeTheme).optionText
                        }>
                            Codigo de producto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[modalRenderstyles(theme).option, typeOfSearch === 'barcode' && modalRenderstyles(theme).optionActive]}
                        onPress={() => setTypeOfSearch('barcode')}
                    >
                        <Text style={
                            typeOfSearch === 'barcode' ?
                                modalRenderstyles(theme, typeTheme).optionTextActive : modalRenderstyles(theme, typeTheme).optionText
                        }>
                            Codigo de barras
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ModalMiddle>
    );
};