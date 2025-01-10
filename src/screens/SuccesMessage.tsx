import React, { useContext } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { InventoryBagContext } from '../context/Inventory/InventoryBagContext';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { AppNavigationProp } from '../interface/navigation';


export const SuccesMessage = () => {

    const { navigate } = useNavigation<AppNavigationProp>();
    const { inventoryData } = useContext(InventoryBagContext);
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={[SuccesMessageScreenStyles(theme).SuccesMessage]}>
                <TouchableOpacity style={[SuccesMessageScreenStyles(theme).header]} onPress={() => {
                    navigate('typeOfMovementScreen');
                }}>
                    <Icon name="close-outline" size={24} color={iconColor} />
                </TouchableOpacity>
                <View style={SuccesMessageScreenStyles(theme).content}>
                    <Text style={SuccesMessageScreenStyles(theme).title}>Tu inventario ha sido exitoso</Text>
                    <Text style={SuccesMessageScreenStyles(theme).text}>Tu inventario con el folio {inventoryData.Folio} ha sido realizado.</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}