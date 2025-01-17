import { useCallback, useState } from "react";

interface UseLoadMoreDataInterface<TFilters = unknown> {
    fetchInitialData: (filters?: TFilters) => Promise<[]>;
    fetchPaginatedData: (filters?: TFilters, page?: number) => Promise<[]>;
    fetchTotalCount?: (filters?: TFilters) => Promise<number>;
    filters?: TFilters;
}

export const useLoadMoreData = ({
    fetchInitialData,
    fetchPaginatedData,
    fetchTotalCount,
    filters,
}: UseLoadMoreDataInterface) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isButtonLoading, setButtonIsLoading] = useState(false);
    const [total, setTotal] = useState<number | null>(null);

    const handleResetData = useCallback(async () => {
        setIsLoading(true);
        try {
            const initialData = await fetchInitialData(filters);
            setData(initialData);
            setPage((prevPage) => prevPage + 1); // Actualizar página de forma segura

            if (fetchTotalCount) {
                const total = await fetchTotalCount(filters);
                setTotal(total);
            }
        } catch (error) {
            // handleError(error as ErrorResponse)
        } finally {
            setIsLoading(false);
        }
    }, [fetchInitialData, filters, fetchTotalCount]);

    const handleLoadMore = useCallback(async () => {
        // Evitar múltiples llamadas simultáneas
        if (isButtonLoading) return;

        // Calcular nueva página
        const nextPage = page + 1;

        // Verificar si se alcanzó el total de elementos
        if (total !== null && data.length >= total) return;

        setButtonIsLoading(true);

        try {
            const moreData = await fetchPaginatedData(filters, nextPage);
            setData((prevData) => [...prevData, ...moreData]);
            setPage((prevPage) => prevPage + 1); // Actualizar página de forma segura
        } catch (error) {
            // handleError(error as ErrorResponse)
        } finally {
            setButtonIsLoading(false);
        }
    }, [fetchPaginatedData, filters, isButtonLoading, data.length, total, page]);

    return {
        data,
        isLoading,
        isButtonLoading,
        total,
        handleResetData,
        handleLoadMore,
    };
};
