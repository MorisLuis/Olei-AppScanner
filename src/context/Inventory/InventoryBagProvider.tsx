import React, { ReactNode, useContext, useEffect, useReducer, useRef, useState } from 'react';
import ProductInterface, { ProductInterfaceBag } from '../../interface/product';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { api } from '../../api/api';
import { AuthContext } from '../auth/AuthContext';
import Toast from 'react-native-toast-message';
import useErrorHandler from '../../hooks/useErrorHandler';

export interface inventoryDataInterface {
    Folio: number
}

export interface InventoryBagInterface {
    bag: ProductInterfaceBag[];
    numberOfItems: number;
    inventoryData: inventoryDataInterface
}

export const InventoryBagInitialState: InventoryBagInterface = {
    bag: [],
    numberOfItems: 0,
    inventoryData: {
        Folio: 0,
    }
}


export const InventoryProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);
    const { user } = useContext(AuthContext);

    const [inventoryCreated, setInventoryCreated] = useState(false);
    const [productAdded, setProductAdded] = useState(false);
    const [keyNumber, setKeyNumber] = useState(0);
    const { handleError } = useErrorHandler()


    const addProduct = (product: ProductInterfaceBag) => {
        try {
            setKeyNumber(keyNumber + 1)
            const newKey = keyNumber + 1;

            dispatch({ type: '[InventoryBag] - Add Product', payload: { ...product, key: newKey } })
            setProductAdded(true);
        } catch (error) {
            handleError(error, true)
        } finally {
            timeoutRef.current = setTimeout(() => {
                setProductAdded(false);
            }, 1000);
        }
    }

    const removeProduct = (product: ProductInterfaceBag) => {
        dispatch({ type: '[InventoryBag] - Remove Product', payload: product })
    }

    const editProduct = (product: ProductInterfaceBag) => {
        dispatch({ type: '[InventoryBag] - Edit Product', payload: product })
        Toast.show({
            type: 'tomatoToast',
            text1: product.Cantidad < 2 ? `Se cambio a ${product.Cantidad} pieza.` : `Se cambio a ${product.Cantidad} piezas.`
        })
    }

    const cleanBag = () => {
        dispatch({ type: '[InventoryBag] - Clear Bag', payload: [] })
    }

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const postInventory = async (inventoryDetails: ProductInterfaceBag[]) => {
        try {
            const tipoMovInvId = user?.Id_TipoMovInv;

            const inventorybody = {
                inventoryDetails: inventoryDetails,
                typeOfMovement: tipoMovInvId
            };

            const inventory = await api.post(`/api/inventory`, inventorybody);
            dispatch({ type: '[InventoryBag] - Post Inventory', payload: inventory.data })
            setInventoryCreated(true)
        } catch (error) {
            handleError(error, true);
        } finally {
            timeoutRef.current = setTimeout(() => {
                setInventoryCreated(false);
            }, 1000);
        }
    };


    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const numberOfItems = state.bag.length;
        const orderSummary = {
            numberOfItems
        }

        dispatch({ type: '[InventoryBag] - Update Summary', payload: orderSummary })
    }, [state.bag])

    return (
        <InventoryBagContext.Provider value={{
            ...state,
            addProduct,
            removeProduct,
            editProduct,
            postInventory,
            inventoryCreated,
            productAdded,
            cleanBag
        }}
        >
            {children}
        </InventoryBagContext.Provider>
    )

}