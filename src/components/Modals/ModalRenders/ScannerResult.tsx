import React, { useContext, useState } from 'react';

import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import PorductInterface from '../../../interface/product';
import { Counter } from '../../Ui/Counter';
import { useNavigation } from '@react-navigation/native';

interface ScannerResultInterface {
    product: PorductInterface;
    onClose: () => void;
}

export const ScannerResult = ({
    product,
    onClose
}: ScannerResultInterface) => {

    const { addProduct } = useContext(InventoryBagContext)
    const [counterProduct, setCounterProduct] = useState<number>(0);
    const { navigate } = useNavigation<any>();

    const handleAddToInventory = () => {

        console.log({counterProduct})

        const inventoryBody = {
            ...product,
            Piezas: counterProduct
        }

        addProduct(inventoryBody)
        onClose()
    }

    const handleExpandProductDetails = () => {
        onClose()
        navigate('ProductDetails', { selectedProduct: product });
    }
    
    return (
        <KeyboardAvoidingView>
            {
                product ?
                    <View>
                        <View style={styles.product}>
                            <View style={styles.productText}>
                                <Image
                                    style={styles.productIcon}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />

                                <View style={styles.productMessage}>
                                    <Text>Codigo: </Text>
                                    <Text>{product?.CodBar}</Text>
                                    <Text>{product?.Marca}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleExpandProductDetails}
                            >
                                <Icon name="expand-outline" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Counter counter={counterProduct} setCounter={setCounterProduct} />

                        <TouchableOpacity
                            style={styles.toogleButton}
                            onPress={handleAddToInventory}
                        >
                            <Text style={styles.buttonText}>Agregar al inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text>
                            No existe producto
                        </Text>
                    </View>
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
    },
    productText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row"
    },
    productMessage: {
        marginLeft: 10
    },
    productIcon: {
        width: 50,
        height: 50,
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25
    },
    toogleButton: {
        backgroundColor: "blue",
        width: "100%",
        color: "white",
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        display: "flex",
        textAlign: "center"
    },
    productNotFound: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
    },
    productNotFoundText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        width: "50%"
    },
    productNotFoundMessage: {
        marginLeft: 10
    },
    productNotFoundTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    }
});