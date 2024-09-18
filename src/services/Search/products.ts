import { api } from "../../api/api";


const getSearchProductInStock = async (searchTerm: string) => {

    try {
        const getProduct = await api.get(`/api/search/inventory?searchTerm=${searchTerm}`);
        const products = getProduct.data;
        return products
    } catch (error: any) {
        return { error: error };
    }

}


export {
    getSearchProductInStock
}