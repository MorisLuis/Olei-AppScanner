import { useState, useCallback, useEffect } from 'react';

import { ProductInterfaceBag } from '../../interface/product';
import { NUMBER_0 } from '../../utils/globalConstants';

const PAGE_INITIAL = 1;

export const useInventoryBag = (
  bag: ProductInterfaceBag[],
  pageSize: number,
): {
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  filteredBag: ProductInterfaceBag[],
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
} => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredBag, setFilteredBag] = useState<ProductInterfaceBag[]>([]);
  const [page, setPage] = useState(PAGE_INITIAL);

  const updateProductBySearch = useCallback(() : void => {
    const filteredData = bag.filter((product) =>
      product?.Descripcion?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredBag(filteredData.slice(NUMBER_0, page * pageSize));
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
