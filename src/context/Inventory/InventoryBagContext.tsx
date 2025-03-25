import {createContext} from 'react';

import {ProductInterfaceBag} from '../../interface/product';
import {inventoryDataInterface} from './InventoryBagProvider';

interface ContextProps {
  addProduct: (product: ProductInterfaceBag) => void;
  removeProduct: (product: ProductInterfaceBag) => void;
  editProduct: (product: ProductInterfaceBag) => void;
  postInventory: (inventoryDetails: ProductInterfaceBag[]) => Promise<void>;
  cleanBag: () => void;
  bag: ProductInterfaceBag[];
  inventoryCreated: boolean;
  numberOfItems: number;
  inventoryData: inventoryDataInterface;
  productAdded: boolean;
}

export const InventoryBagContext = createContext({} as ContextProps);
