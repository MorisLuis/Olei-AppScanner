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
    filters
}: UseLoadMoreDataInterface) => {

    //const { handleError } = useErrorHandler();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isButtonLoading, setButtonIsLoading] = useState(false);
    const [total, setTotal] = useState<number | null>(null);

    const handleResetData = useCallback(async () => {
        console.log("handleResetData")
        setIsLoading(true);
        try {
            const initialData = await fetchInitialData(filters);
            setData(initialData);
            setPage(1);

            if (fetchTotalCount) {
                const total = await fetchTotalCount(filters);
                setTotal(total);
            }
        } catch (error) {
            //handleError(error as ErrorResponse)
        } finally {
            setIsLoading(false);
        }
    }, [fetchInitialData, filters]);

    const handleLoadMore = useCallback(async () => {
        console.log("handleLoadMore")
        setButtonIsLoading(true);
        try {
            const nextPage = page + 1;
            const moreData = await fetchPaginatedData(filters, nextPage);
            setData(prevData => [...prevData, ...moreData]);
            setPage(nextPage);
        } catch (error) {
            //handleError(error as ErrorResponse)
        } finally {
            setButtonIsLoading(false);
        }
    }, [fetchPaginatedData, filters, page]);

    return {
        data,
        isLoading,
        isButtonLoading,
        total,
        handleResetData,
        handleLoadMore,
    };
}