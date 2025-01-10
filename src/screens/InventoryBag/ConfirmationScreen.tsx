import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProductInventoryConfirmationCard } from '../../components/Cards/ProductInventoryConfirmationCard';
import { buttonStyles } from '../../theme/UI/buttons';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import DotLoader from '../../components/Ui/DotLaoder';
import { ProductInterfaceBag } from '../../interface/product';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useProtectPage } from '../../hooks/useProtectPage';
import { CombineNavigationProp } from '../../interface/navigation';

export const ConfirmationScreen = () => {

    const { typeTheme, theme } = useTheme();
    const { getTypeOfMovementsName, user } = useContext(AuthContext);
    const { bag, cleanBag, numberOfItems, postInventory } = useContext(InventoryBagContext);
    const { navigate } = useNavigation<CombineNavigationProp>();

    const iconColor = theme.color_tertiary;
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const filteredBag = useMemo(() => {
        return bag.slice(0, page * pageSize);
    }, [bag, page, pageSize]);

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryConfirmationCard
            product={item}
            disabled={createInventaryLoading}
            onClick={() => {
                navigate(
                    '[Modal] - editProductInBag',
                    { product: item }
                )
            }}
        />
    ), [createInventaryLoading]);

    const onPostInventary = useCallback(async () => {
        setCreateInventaryLoading(true);
        await postInventory(bag);

        setTimeout(() => {
            cleanBag();
            setCreateInventaryLoading(false);
            navigate('BottomNavigation - Scanner');
            navigate('succesMessageScreen');
        }, 500);
    }, [bag, postInventory, cleanBag, navigate]);


    const handleLoadMore = () => {
        if (filteredBag.length >= numberOfItems) return;
        setPage(prevPage => prevPage + 1);
    };

    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItems,
        loading: createInventaryLoading,
        navigatePage: 'BottomNavigation'
    });

    return !protectThisPage ? (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={{ flex: 1, marginBottom: hp("12.5%") }}>
                <FlatList
                    data={filteredBag}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.key}`}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={
                        <>
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader}>
                                <View style={{ position: 'relative', marginBottom: 15 }}>
                                    <Icon name={typeTheme === 'light' ? "document-text-outline" : "document-text"} size={50} color={iconColor} />
                                    <View style={{ position: "absolute", right: 0, bottom: -8 }}>
                                        <Icon name="checkmark-circle" size={22} color={"green"} />
                                    </View>
                                </View>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeaderTitle}>Confirmación de {getTypeOfMovementsName()}</Text>
                            </View>
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados {numberOfItems}</Text>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento: {getTypeOfMovementsName()}</Text>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Almacen: {user?.Id_Almacen}</Text>
                            </View>
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                            </View>
                        </>
                    }
                />
            </View>
            <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={onPostInventary}
                    disabled={createInventaryLoading}
                >
                    <Text style={buttonStyles(theme).buttonText}>
                        {createInventaryLoading ? <DotLoader /> : "Confirmar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
        :
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                <Text>Redireccionando...</Text>
            </View>
        </SafeAreaView>
};
