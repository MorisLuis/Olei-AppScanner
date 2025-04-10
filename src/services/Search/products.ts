import { api } from '../../api/api';
import ProductInterface from '../../interface/product';

const getSearchProductInStock = async (
  searchTerm: string
): Promise<{ products: ProductInterface[] }> => {
  const { data: { products } } = await api.get<{ products: ProductInterface[] }>(`/api/inventory/search/product?searchTerm=${searchTerm}`);
  return { products };
};

const getSearchProductInStockWithoutCodebar = async (
  searchTerm: string
): Promise<{ products: ProductInterface[] }> => {
  const { data: { products } } = await api.get<{ products: ProductInterface[] }>(`/api/inventory/search/product/withoutcodebar?searchTerm=${searchTerm}`,);
  return { products };
};

export {
  getSearchProductInStock,
  getSearchProductInStockWithoutCodebar
};
