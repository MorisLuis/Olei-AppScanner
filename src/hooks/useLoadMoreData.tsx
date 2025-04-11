import { useCallback, useState } from 'react';

import useErrorHandler from './useErrorHandler';


interface UseLoadMoreDataInterface<TData = unknown, TFilters = unknown> {
  fetchInitialData: (_filters?: TFilters) => Promise<TData[]>;
  fetchPaginatedData: (_filters?: TFilters, _page?: number) => Promise<TData[]>;
  fetchTotalCount?: (_filters?: TFilters) => Promise<number>;
  filters?: TFilters;
}


const PAGE_INITIAL = 1;

export const useLoadMoreData = <TData, TFilters = unknown>({
  fetchInitialData,
  fetchPaginatedData,
  fetchTotalCount,
  filters,
}: UseLoadMoreDataInterface<TData, TFilters>): {
  data: TData[],
  isLoading: boolean,
  isButtonLoading: boolean,
  total: number | null,
  handleResetData: () => Promise<void>,
  handleLoadMore: () => Promise<void>,
  hasError: boolean
} => {

  const [data, setData] = useState<TData[]>([]);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(PAGE_INITIAL);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setButtonIsLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const { handleError } = useErrorHandler();

  const handleResetData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);

    try {
      const initialData = await fetchInitialData(filters);
      setData(initialData);
      setPage((prevPage) => prevPage + PAGE_INITIAL); // Actualizar página de forma segura

      if (fetchTotalCount) {
        const total = await fetchTotalCount(filters);
        setTotal(total);
      }
    } catch (error) {
      setHasError(true);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, fetchInitialData, filters, fetchTotalCount]);

  const handleLoadMore = useCallback(async (): Promise<void> => {
    // Evitar múltiples llamadas simultáneas
    if (isButtonLoading) return;
    setHasError(false);


    // Verificar si se alcanzó el total de elementos
    if (total !== null && data?.length >= total) return;

    setButtonIsLoading(true);

    try {
      const moreData = await fetchPaginatedData(filters, page);
      setData((prevData) => [...prevData, ...moreData]);
      setPage((prevPage) => prevPage + PAGE_INITIAL); // Actualizar página de forma segura
    } catch (error) {
      setHasError(true);
      handleError(error);
    } finally {
      setButtonIsLoading(false);
    }
  }, [handleError, fetchPaginatedData, filters, isButtonLoading, data?.length, total, page]);

  return {
    data,
    isLoading,
    isButtonLoading,
    total,
    handleResetData,
    handleLoadMore,
    hasError
  };
};
