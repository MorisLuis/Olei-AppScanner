// hooks/useApiMutation.ts
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';


export function useApiMutation<TData, TVariables>(
    mutationFn: (_variables: TVariables) => Promise<TData>,
    options?: UseMutationOptions<TData, AxiosError, TVariables>
): UseMutationResult<TData, AxiosError, TVariables> {

    return useMutation<TData, AxiosError, TVariables>({
        mutationFn,
        onError: (error) => {
            const message = (error.response?.data as { message: string })?.message || 'Error interno del servidor';

            Toast.show({
                type: 'error',
                text1: 'Ups... algo falló 😓',
                text2: message,
            });
        },
        ...options,
    });
}
