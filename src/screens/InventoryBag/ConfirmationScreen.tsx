import React, { useCallback, useContext, useState, useEffect } from 'react';
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

export const ConfirmationScreen = () => {
    const { typeTheme, theme, toggleTheme } = useTheme();
    const { getTypeOfMovementsName, user } = useContext(AuthContext);
    const { bag, cleanBag, numberOfItems, postInventory, postInventoryDetails } = useContext(InventoryBagContext);
    const { navigate } = useNavigation<any>();

    const iconColor = theme.color_tertiary;
    const [filteredBag, setFilteredBag] = useState<ProductInterfaceBag[]>([]);
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryConfirmationCard product={item} onClick={() => navigate('[Modal] - editProductInBag', { product: item })} disabled={createInventaryLoading}/>
    ), [createInventaryLoading]);

    const onPostInventary = async () => {
        setCreateInventaryLoading(true);
        await postInventory(bag);
        //await postInventoryDetails();
        
        setTimeout(() => {
            cleanBag();
            setCreateInventaryLoading(false);
            navigate('BottomNavigation - Scanner');
            navigate('succesMessageScreen');
        }, 500); // Espera de 500ms antes de navegar
    };

    const handleLoadMore = () => {
        if (filteredBag.length >= numberOfItems) return;
        setPage(prevPage => prevPage + 1);
    };

    const loadMoreData = useCallback(() => {
        setFilteredBag(bag.slice(0, page * pageSize));
    }, [bag, page, pageSize]);

    useEffect(() => {
        loadMoreData();
    }, [page, loadMoreData]);

    return (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={{ flex: 1, marginBottom: hp("12.5%") }}>
                <FlatList
                    data={filteredBag}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.key}`}
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
                {/* <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={toggleTheme}
                >
                    <Text style={buttonStyles(theme).buttonText}>Toggle Theme</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};
