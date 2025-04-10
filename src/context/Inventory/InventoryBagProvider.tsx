import React, {
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';

import {ProductInterfaceBag} from '../../interface/product';
import {InventoryBagContext} from './InventoryBagContext';
import {innventoryBagReducer} from './InventoryBagReducer';
import {api} from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import { NUMBER_0 } from '../../utils/globalConstants';

export interface inventoryDataInterface {
  Folio: number;
}

export interface InventoryBagInterface {
  bag: ProductInterfaceBag[];
  numberOfItems: number;
  inventoryData: inventoryDataInterface;
}

const DEFAULT_FOLIO = 0;
const DEFAULT_TIMEOUT_MS = 1000;
const SINGLE_PIECE = 1;
const DOUBLE_PIECES = 2;

export const InventoryBagInitialState: InventoryBagInterface = {
  bag: [],
  numberOfItems: 0,
  inventoryData: {
    Folio: DEFAULT_FOLIO,
  },
};

export const InventoryProvider = ({children}: {children: ReactNode}): JSX.Element => {

  const [state, dispatch] = useReducer(
    innventoryBagReducer,
    InventoryBagInitialState,
  );
  const {user} = useContext(AuthContext);

  const [inventoryCreated, setInventoryCreated] = useState<boolean>(false);
  const [productAdded, setProductAdded] = useState<boolean>(false);
  const [keyNumber, setKeyNumber] = useState<number>(NUMBER_0);
  const {handleError} = useErrorHandler();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addProduct = (product: ProductInterfaceBag): void => {
    try {
      const newKey = keyNumber + SINGLE_PIECE;
      setKeyNumber(newKey);

      dispatch({
        type: '[InventoryBag] - Add Product',
        payload: {...product, key: newKey},
      });

      setProductAdded(true);
    } catch (error) {
      handleError(error);
    } finally {
      timeoutRef.current = setTimeout(() => {
        setProductAdded(false);
      }, DEFAULT_TIMEOUT_MS);
    }
  };

  const removeProduct = (product: ProductInterfaceBag): void => {
    dispatch({type: '[InventoryBag] - Remove Product', payload: product});
  };

  const editProduct = (product: ProductInterfaceBag): void => {
    dispatch({type: '[InventoryBag] - Edit Product', payload: product});
    Toast.show({
      type: 'tomatoToast',
      text1:
        product.Cantidad < DOUBLE_PIECES
          ? `Se cambio a ${product.Cantidad} pieza.`
          : `Se cambio a ${product.Cantidad} piezas.`,
    });
  };

  const cleanBag = (): void => {
    dispatch({type: '[InventoryBag] - Clear Bag', payload: []});
  };

  const postInventory = async (inventoryDetails: ProductInterfaceBag[]): Promise<void> => {
    try {
      const tipoMovInvId = user?.Id_TipoMovInv;

      const inventorybody = {
        inventoryDetails,
        typeOfMovement: tipoMovInvId,
      };
      const inventory = await api.post(`/api/inventory`, inventorybody);
      dispatch({
        type: '[InventoryBag] - Post Inventory',
        payload: inventory.data,
      });
      setInventoryCreated(true);
    } catch (error) {
      handleError(error);
    } finally {
      timeoutRef.current = setTimeout(() => {
        setInventoryCreated(false);
      }, DEFAULT_TIMEOUT_MS);
    }
  };

  useEffect((): (() => void) => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect((): void => {
    const numberOfItems = state.bag.length;
    const orderSummary = {
      numberOfItems,
    };

    dispatch({type: '[InventoryBag] - Update Summary', payload: orderSummary});
  }, [state.bag]);

  return (
    <InventoryBagContext.Provider
      value={{
        ...state,
        addProduct,
        removeProduct,
        editProduct,
        postInventory,
        inventoryCreated,
        productAdded,
        cleanBag,
      }}>
      {children}
    </InventoryBagContext.Provider>
  );
};
