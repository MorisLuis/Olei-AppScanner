import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface QueryServiceOptions<T> {
  queryKey: string;
  service: () => Promise<{ items: T[] }>;
  enabled?: boolean;
}

export function useApiQueryWithService<T>({
  queryKey,
  service,
  enabled = true,
}: QueryServiceOptions<T>): UseQueryResult<{ items: T[] }, Error> {
  return useQuery({
    queryKey: [queryKey],
    queryFn: service,
    enabled,
  });
}
