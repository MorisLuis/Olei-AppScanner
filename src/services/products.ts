import { api } from "../api/api";

const getProductDetails = async (id: string, marca: string) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/${id}?Marca=${marca}`);
        product = getProduct.data;
    } catch (error) {
        return { error: error };
    }

    return product;
}

interface getProductByCodeBarInterface {
    codeBar?: string, codigo?: string, sku?: string
}

const getProductByCodeBar = async ({ codeBar, codigo, sku }: getProductByCodeBarInterface) => {

    let product;
    try {
        const getProduct = await api.get(`/api/product/byStockAndCodeBar?CodBar=${codeBar ?? ''}&Codigo=${codigo ?? ''}&SKU=${sku ?? ''}`);
        console.log({getProduct: getProduct.config})
        product = getProduct.data;
    } catch (error) {
        return { error: error };
    }

    return product
};


const getProductsByStock = async (PageNumber: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/byStock?PageNumber=${PageNumber}&PageSize=10`);
        products = getProduct.data;
    } catch (error) {
        return { error: error };
    }

    return products
}

const getTotalProductsByStock = async () => {

    let total;
    try {
        const getProduct = await api.get(`/api/product/byStockCount`);
        total = getProduct.data[0].TotalProductos;
    } catch (error) {
        return { error: error };

    }

    return total;
}



export {
    getProductByCodeBar,
    getProductsByStock,
    getTotalProductsByStock,
    getProductDetails
}