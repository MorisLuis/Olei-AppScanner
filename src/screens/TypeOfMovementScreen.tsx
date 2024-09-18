import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { buttonStyles } from '../theme/UI/buttons';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../services/typeOfMovement';
import { useNavigation } from '@react-navigation/native';
import { TypeOfMovementSkeleton } from '../components/Skeletons/TypeOfMovementSkeleton';
import { AuthContext } from '../context/auth/AuthContext';
import { TypeOfMovementScreenStyles } from '../theme/TypeOfMovementScreenTheme';
import { useTheme } from '../context/ThemeContext';
import useErrorHandler from '../hooks/useErrorHandler';

export const TypeOfMovementScreen = () => {

    const { updateTypeOfMovements } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<any>();
    const { handleError } = useErrorHandler()

    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const [typeSelected, setTypeSelected] = useState<Id_TipoMovInvInterface>()
    const [isLoading, setIsLoading] = useState(false);

    const handleOptionSelect = (option: Id_TipoMovInvInterface) => {
        setTypeSelected(option);
    };

    const renderOption = ({ item }: { item: Id_TipoMovInvInterface }) => {
        const isSelected = typeSelected?.Id_TipoMovInv === item.Id_TipoMovInv;

        return (
            <TouchableOpacity
                style={[TypeOfMovementScreenStyles(theme).optionContainer, isSelected && TypeOfMovementScreenStyles(theme).selectedOption]}
                onPress={() => handleOptionSelect(item)}
            >
                <Text
                    style={
                        isSelected ? TypeOfMovementScreenStyles(theme, typeTheme).optionTextSelected : TypeOfMovementScreenStyles(theme).optionText
                    }
                >
                    {item.Descripcion}
                </Text>
            </TouchableOpacity>
        );
    };

    const onChangetTypeOfMovement = () => {
        try {
            if (typeSelected === undefined || typeSelected === null) return
            updateTypeOfMovements(typeSelected);
        } catch (error) {
            handleError(error)
        } finally {
            navigate('BottomNavigation');
        }
    }

    const renderLoader = () => {
        return (
            isLoading ?
                Array.from({ length: 10 }).map((_, index) => (
                    <TypeOfMovementSkeleton key={index} />
                ))
                : null
        );
    };

    const handleGetTypeOfMovements = async () => {

        try {
            setIsLoading(true);
            const types = await getTypeOfMovements();
            if (types.error) {
                handleError(types.error);
                return;
            }
            setTypeOfMovement(types);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        handleGetTypeOfMovements()
    }, []);



    return (
        <View style={TypeOfMovementScreenStyles(theme).container}>
            <SafeAreaView style={TypeOfMovementScreenStyles(theme).header}>
                <Text style={TypeOfMovementScreenStyles(theme).title}>Selecciona que movimiento haras?</Text>
            </SafeAreaView>

            <FlatList
                data={typeOfMovement}
                renderItem={renderOption}
                keyExtractor={typeOfMovement => `${typeOfMovement.Id_TipoMovInv}`}
                ListFooterComponent={renderLoader}
                onEndReachedThreshold={0}
            />

            {(typeSelected || typeSelected == 0) && (
                <View style={TypeOfMovementScreenStyles(theme, typeTheme).footer}>
                    <TouchableOpacity style={[buttonStyles(theme).button]} onPress={onChangetTypeOfMovement}>
                        <Text style={[buttonStyles(theme).buttonText]}>Avanzar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};