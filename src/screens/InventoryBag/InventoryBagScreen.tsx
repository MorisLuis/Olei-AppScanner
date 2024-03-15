import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../interface/product'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'
import { buttonStyles } from '../../theme/UI/buttons'
import { colores, globalStyles } from '../../theme/appTheme'
import { LoadingScreen } from '../LoadingScreen'
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard'

export const InventoryBagScreen = () => {


    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext)
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false)

    const handleCleanTemporal = () => {
        cleanBag()
    }

    const onDelete = (product: PorductInterface) => {
        removeProduct(product)
    }

    const onPostInventary = async () => {
        setCreateInventaryLoading(true)
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        setCreateInventaryLoading(false)
    }

    return !createInventaryLoading ? (
        <SafeAreaView style={styles.InventoryBagScreen}>
            {
                bag.length > 0 &&
                <View style={styles.content}>
                    {
                        bag.map((product) =>
                            <ProductInventoryCard
                                key={`${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}`}
                                product={product}
                                onDelete={onDelete}
                                showDelete
                            />
                        )
                    }
                </View>
            }
            {
                numberOfItems > 0 ?
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.white, globalStyles.globalMarginBottomSmall]}
                            onPress={handleCleanTemporal}
                        >
                            <Text style={buttonStyles.buttonTextSecondary}>Limpiar carrito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.black]}
                            onPress={onPostInventary}
                        >
                            <Text style={buttonStyles.buttonText}>Crear Inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.message}>
                        <EmptyMessageCard
                            title="No tienes productos en inventario"
                            message='Agrega productos al inventario'
                            icon='albums-outline'
                        />
                    </View>
            }
        </SafeAreaView>
    )
        :
        <LoadingScreen />
}


const styles = StyleSheet.create({
    InventoryBagScreen: {
        backgroundColor: colores.background_color,
        height: "100%",
    },

    content: {
        minHeight: "auto",
        height: "85%",
        padding: globalStyles.globalPadding.padding
    },
    message: {
        padding: globalStyles.globalPadding.padding
    },
    footer: {
        backgroundColor: colores.background_color_tertiary,
        padding: globalStyles.globalPadding.padding,
        height: "100%",
        display: "flex",
        borderTopWidth: 1,
        borderColor: colores.color_border
    }
});