import { useState, useCallback, useEffect } from 'react';
import { ProductInterfaceBag } from '../../interface/product';

export const useInventoryBag = (bag: ProductInterfaceBag[], pageSize: number) => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredBag, setFilteredBag] = useState<ProductInterfaceBag[]>([]);
    const [page, setPage] = useState(1);

    const updateProductBySearch = useCallback(() => {
        const filteredData = bag.filter(product =>
            product?.Descripcion?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBag(filteredData.slice(0, page * pageSize));
    }, [searchText, bag, page, pageSize]);

    useEffect(() => {
        updateProductBySearch();
    }, [searchText, page, updateProductBySearch]);

    return {
        searchText,
        setSearchText,
        filteredBag,
        page,
        setPage,
    };
};
