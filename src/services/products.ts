import { api } from '../api/api';
import ProductInterface from '../interface/product';

const getProductDetails = async (id: string, marca: string): Promise<{ product?: ProductInterface }> => {
  const { data: { product } } = await api.get<{ product?: ProductInterface }>(`/api/product/${id}?Marca=${marca}`);
  return { product }
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
}: getProductByCodeBarInterface): Promise<{ products: ProductInterface[] }> => {
  const { data: { products } } = await api.get<{ products: ProductInterface[] }>(
    `/api/product/byStockAndCodeBar?CodBar=${codeBar ?? ''}&Codigo=${codigo ?? ''}&SKU=${sku ?? ''}`,
  );
  return { products }
};

const getProductsByStock = async (PageNumber: number): Promise<{ products: ProductInterface[] }> => {
  const { data: { products } } = await api.get<{ products: ProductInterface[] }>(
    `/api/product/byStock?PageNumber=${PageNumber}&PageSize=10`,
  );
  return { products }
};

const getTotalProductsByStock = async (): Promise<{ total?: number }> => {
  const { data: { total } } = await api.get<{ total: number }>(`/api/product/byStockCount`);
  return { total }

};


const getIntentionError = async (): Promise<any> => {
  const data = await api.get('/api/auth/error-test');
  return data
};



export {
  getProductByCodeBar,
  getProductsByStock,
  getTotalProductsByStock,
  getProductDetails,
  getIntentionError
};
