/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiCall, ApiError } from '@/lib/api'

// Generic GET hook
export function useApiQuery<T = any>(
    queryKey: string[],
    endpoint: string,
    options?: {
        enabled?: boolean
        staleTime?: number
        refetchInterval?: number
    }
) {
    return useQuery<T, ApiError>({
        queryKey,
        queryFn: () => apiCall<T>(endpoint, 'GET'),
        ...options,
    })
}

// Generic mutation hook (POST/PUT/PATCH/DELETE)
export function useApiMutation<TData = any, TVariables = any>(
    endpoint: string | ((variables: TVariables) => string),
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    options?: {
        onSuccess?: (data: TData, variables: TVariables) => void
        invalidateQueries?: string[][]
    }
) {
    const queryClient = useQueryClient()

    return useMutation<TData, ApiError, TVariables>({
        mutationFn: async (variables) => {
            const url =
                typeof endpoint === 'function' ? endpoint(variables) : endpoint
            const body = method !== 'DELETE' ? variables : undefined
            return apiCall<TData>(url, method, body)
        },
        onSuccess: (data, variables) => {
            // Invalidate queries to refetch data
            if (options?.invalidateQueries) {
                options.invalidateQueries.forEach((queryKey) => {
                    queryClient.invalidateQueries({ queryKey })
                })
            }
            options?.onSuccess?.(data, variables)
        },
    })
}
