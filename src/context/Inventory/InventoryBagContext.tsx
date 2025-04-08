import {createContext} from 'react';

import {ProductInterfaceBag} from '../../interface/product';
import {inventoryDataInterface} from './InventoryBagProvider';

interface ContextProps {
  addProduct: (_product: ProductInterfaceBag) => void;
  removeProduct: (_product: ProductInterfaceBag) => void;
  editProduct: (_product: ProductInterfaceBag) => void;
  postInventory: (_inventoryDetails: ProductInterfaceBag[]) => Promise<void>;
  cleanBag: () => void;
  bag: ProductInterfaceBag[];
  inventoryCreated: boolean;
  numberOfItems: number;
  inventoryData: inventoryDataInterface;
  productAdded: boolean;
}

export const InventoryBagContext = createContext({} as ContextProps);
