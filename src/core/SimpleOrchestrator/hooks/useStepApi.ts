import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import type { ApiRequestProps } from '../SimpleOrchestrator.types'
import type { ApiResponse } from '../SimpleOrchestrator.types'

export type StepApiResult = {
    isError: boolean
    isPending: boolean
    isSuccess: boolean
    data: unknown
    error: unknown
    triggerApi: () => void
}

const noOpResult: Omit<StepApiResult, 'triggerApi'> = {
    isError: false,
    isPending: false,
    isSuccess: false,
    data: null,
    error: null,
}

export const useStepApi = (
    apiConfig: ApiRequestProps | undefined,
    step: number,
    updateApi: (api: ApiResponse) => void
): StepApiResult => {
    // Refs avoid stal closuers without triggering effects
    const apiConfigRef = useRef(apiConfig)
    const updateApiRef = useRef(updateApi)

    // Sync refs arter commit
    useEffect(() => {
        apiConfigRef.current = apiConfig
        updateApiRef.current = updateApi
    })

    const [currentApi, setCurrentApi] = useState<ApiRequestProps>({
        url: '',
        method: 'GET',
        enabled: false,
        ...apiConfig,
    })

    // Reset fetch state on step change - prevent stale API from previous step.
    useEffect(() => {
        setCurrentApi({
            url: '',
            method: 'GET',
            enabled: false,
            ...apiConfigRef.current,
        })
    }, [step])

    const fetchResult = useFetchData(currentApi)

    // Derive a stable API state object 0 only recomputed when fetch values change.
    const apiState = useMemo<ApiResponse>(
        () => ({
            isError: fetchResult.isError ?? false,
            isPending: fetchResult.isPending ?? false,
            isSuccess: fetchResult.isSuccess ?? false,
            data: (fetchResult.data as Record<string, unknown> | null) ?? null,
            error:
                (fetchResult.error as Record<string, unknown> | null) ?? null,
        }),
        [
            fetchResult.isError,
            fetchResult.isPending,
            fetchResult.isSuccess,
            fetchResult.data,
            fetchResult.error,
        ]
    )

    // Push API state into context ( reducer's shallow check prevents loops)
    useEffect(() => {
        updateApiRef.current(apiState)
    }, [apiState])

    //Calling trigger Api sets enabled: true, which activates useFetchData
    const triggerApi = useCallback(() => {
        if (!apiConfigRef.current) return
        setCurrentApi({
            ...apiConfigRef.current,
            enabled: true,
        })
    }, [])

    // Steps without Api Config get no-op results
    if (!apiConfig) {
        return { ...noOpResult, triggerApi }
    }

    return {
        isError: apiState.isError ?? false,
        isPending: apiState.isPending ?? false,
        isSuccess: apiState.isSuccess ?? false,
        data: apiState.data ?? null,
        error: apiState.error ?? null,
        triggerApi,
    }
}
