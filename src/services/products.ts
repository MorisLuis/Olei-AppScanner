import { api } from '../api/api';
import ProductInterface from '../interface/product';

const getProductDetails = async (id: string, marca: string): Promise<{ product?: ProductInterface, error?: unknown }> => {
  try {
    const { data: { product } } = await api.get<{ product?: ProductInterface }>(`/api/product/${id}?Marca=${marca}`);
    return { product }
  } catch (error) {
    return { error };
  }
};

interface getProductByCodeBarInterface {
  codeBar?: string;
  codigo?: string;
  sku?: string;
}

const getProductByCodeBar = async ({
  codeBar,
  codigo,
  sku,
}: getProductByCodeBarInterface): Promise<{ products: ProductInterface[], error?: unknown }> => {
  try {
    const { data: { products } } = await api.get<{ products: ProductInterface[] }>(
      `/api/product/byStockAndCodeBar?CodBar=${codeBar ?? ''}&Codigo=${codigo ?? ''}&SKU=${sku ?? ''}`,
    );
    return { products }
  } catch (error) {
    return { error: error, products: [] };
  }
};

const getProductsByStock = async (PageNumber: number): Promise<{ products: ProductInterface[], error?: unknown }> => {
  try {
    const { data: { products } } = await api.get<{ products: ProductInterface[] }>(
      `/api/product/byStock?PageNumber=${PageNumber}&PageSize=10`,
    );
    return { products }
  } catch (error) {
    return { error, products: [] };
  }
};

const getTotalProductsByStock = async (): Promise<{ total?: number, error?: unknown }> => {
  try {
    const { data: { total } } = await api.get<{ total: number }>(`/api/product/byStockCount`);
    return { total }
  } catch (error) {
    return { error };
  }

};

export {
  getProductByCodeBar,
  getProductsByStock,
  getTotalProductsByStock,
  getProductDetails,
};
