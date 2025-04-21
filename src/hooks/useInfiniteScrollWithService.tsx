// hooks/useInfiniteScrollWithService.ts

import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { NUMBER_1 } from '../utils/globalConstants';

interface InfiniteServiceOptions<T> {
    queryKey: string;
    service: (_page: number) => Promise<{ items: T[] }>;
    enabled?: boolean;
    select?: (_data: T[]) => T[];
}

// Definir constantes para evitar números mágicos
const INITIAL_PAGE = 1;
const EMPTY_PAGE_SIZE = 0;

export function useInfiniteScrollWithService<T>({
    queryKey,
    service,
    enabled = true,
    select,
}: InfiniteServiceOptions<T>): UseInfiniteQueryResult<{ pages: T[][]; pageParams: number[] }, Error> {

    return useInfiniteQuery({
        queryKey: [queryKey],
        enabled,
        initialPageParam: INITIAL_PAGE,  // Usando la constante
        queryFn: async ({ pageParam = INITIAL_PAGE }) => {
            const { items } = await service(pageParam);
            return { items, pageParam };
        },
        getNextPageParam: (lastPage) => {
            // Usando la constante EMPTY_PAGE_SIZE para evitar el número mágico
            return lastPage.items.length === EMPTY_PAGE_SIZE ? undefined : lastPage.pageParam + NUMBER_1;
        },
        select: (data) => {
            const merged = data.pages.flatMap((page) => page.items);
            return {
                ...data,
                pages: [select ? select(merged) : merged],
            };
        }
    });
}
