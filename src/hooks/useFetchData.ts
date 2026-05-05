import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchMultipleApi, fetchSingleApi } from 'root/tools/apiClient'
import { ApiRequestProps } from 'root/core/SimpleOrchestrator/SimpleOrchestrator.types'

export const useFetchData = (
    apiRequest: ApiRequestProps | ApiRequestProps[]
) => {
    // Check if the api request is an array or Object
    const isArrayRequest = Array.isArray(apiRequest)
    const isEmptyArray = isArrayRequest && apiRequest.length === 0

    // Using a unique query key to avoid conflicts with other queries.
    const query_key =
        isArrayRequest && !isEmptyArray
            ? (apiRequest[0]?.queryKey ?? `fetchApis-${apiRequest[0]?.url}`)
            : !isArrayRequest
              ? ((apiRequest as ApiRequestProps)?.queryKey ??
                `fetchApis- ${(apiRequest as ApiRequestProps)?.url}`)
              : `fetchApis-empty`

    const postQueryResult = useMutation({
        mutationKey: [query_key, apiRequest],
        mutationFn: (apiRequest: ApiRequestProps | ApiRequestProps[]) => {
            if (isEmptyArray) {
                return Promise.resolve([{}, {}])
            }
            return isArrayRequest
                ? fetchMultipleApi(apiRequest as ApiRequestProps[])
                : fetchSingleApi(apiRequest as ApiRequestProps)
        },
    })

    useEffect(() => {
        if (
            !isEmptyArray &&
            ((isArrayRequest &&
                apiRequest[0]?.method === 'POST' &&
                apiRequest[0]?.enabled) ||
                (!isArrayRequest &&
                    (apiRequest as ApiRequestProps).method === 'POST' &&
                    (apiRequest as ApiRequestProps).enabled))
        ) {
            postQueryResult.mutate(apiRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiRequest])

    // If the method is POST, we use postQuery, otherwise we use getQuery
    // Get method is the default method for fetching data.
    const isGetMethod = isEmptyArray
        ? true
        : isArrayRequest
          ? apiRequest[0]?.method !== 'POST'
          : (apiRequest as ApiRequestProps).method !== 'POST'

    const getQueryResult = useQuery({
        queryKey: [query_key, apiRequest, isArrayRequest, isEmptyArray],
        enabled: isEmptyArray
            ? false
            : isArrayRequest
              ? (apiRequest[0]?.enabled ?? isGetMethod)
              : ((apiRequest as ApiRequestProps).enabled ?? isGetMethod),
        queryFn: () => {
            if (isEmptyArray) {
                return Promise.resolve([{}, {}])
            }
            return isArrayRequest
                ? fetchMultipleApi(apiRequest as ApiRequestProps[])
                : fetchSingleApi(apiRequest as ApiRequestProps)
        },
    })

    // If empty array, return success state immediately
    if (isEmptyArray) {
        return {
            data: [{}, {}],
            isPending: false,
            isError: false,
            isSuccess: true,
            error: null,
        }
    }

    const { data, isPending, isSuccess, isError, error } = isGetMethod
        ? getQueryResult
        : postQueryResult

    return { data, isPending, isError, isSuccess, error }
}
