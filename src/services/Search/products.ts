import { api } from "../../api/api";


const getSearchProductInStock = async (searchTerm: string) => {

    try {
        const getProduct = await api.get(`/api/inventory/search/product?searchTerm=${searchTerm}`);
        const products = getProduct.data;
        return products
    } catch (error) {
        return { error: error };
    }

};

const getSearchProductInStockWithoutCodebar = async (searchTerm: string) => {

    try {
        const getProduct = await api.get(`/api/inventory/search/product/withoutcodebar?searchTerm=${searchTerm}`);
        const products = getProduct.data;
        return products
    } catch (error) {
        return { error: error };
    }

}


export {
    getSearchProductInStock,
    getSearchProductInStockWithoutCodebar
}