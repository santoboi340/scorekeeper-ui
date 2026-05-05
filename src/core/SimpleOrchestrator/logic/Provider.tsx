import { useCallback, useMemo, useReducer } from 'react'
import { Reducer } from './Reducer'
import { DispatchContext, StateContext, initialFlowState } from './Context'
import { ApiResponse } from '../SimpleOrchestrator.types'
import React from 'react'
/**
 * Provider wrpas the orchestrator with 2 separate contexts.
 *
 * DispatchContext:
 *  Holds stable navigation functions. (GoBack, GoNext, etc.)
 *  Created with useCallback -> identity NEVER changes.
 *  Wrapped in useMemo with stable deps -> context NEVER changes.
 *
 *
 *
 * StateContext:
 *  Changes on every reducer dispatch.
 *  Only components that read flowstate re-render.
 */

const Provider = ({
    children,
    maxSteps,
    initialData,
}: {
    children: React.ReactNode
    maxSteps: number
    initialData: Record<string, unknown> | undefined
}) => {
    const [flowState, dispatch] = useReducer(Reducer, {
        ...initialFlowState,
        maxSteps: maxSteps,
        formData: initialData ?? {},
    })

    /**
     * Navigation functions useCallback with EMPTY dependency arrays.
     * They close over `dispatch` which is stable.
     * This means these function references NEVER change across renders.
     */

    const GoNext = useCallback((data?: Record<string, unknown>): void => {
        dispatch({
            type: 'GO_NEXT',
            data: data,
        })
    }, [])

    const GoBack = useCallback((): void => {
        dispatch({
            type: 'GO_BACK',
        })
    }, [])

    const GoTo = useCallback((step: number) => {
        dispatch({
            type: 'GO_TO',
            step,
        })
    }, [])

    /**
     * Resets the flow to initial stae. Clears all accumulated Form Data.
     * maxSteps is preserved by the reducer ( see CANCEL case in Reducer.)
     */
    const Cancel = useCallback((): void => {
        dispatch({
            type: 'CANCEL',
        })
    }, [])

    /**
     * Internal Only: Bridges useStepApi hook state -> context state.
     * Called by Machine.tsx via useEffect to keep flowState.api in sync.
     * NOT exposed to step components.
     */
    const UpdateApi = useCallback((api: ApiResponse): void => {
        dispatch({
            type: 'UPDATE_API',
            api,
        })
    }, [])

    /**
     * Dispatch context value is memoized with ALL stable dependencies.
     * Since GoNext, GoBack, GoTo, Cancel, UpdateApi are all useCallback,
     * their identities never change -> this useMemo NEVER recomputes.
     * DispatchContext Provider never triggers re-renders.
     * This will help with performance
     */
    const dispatchValue = useMemo(
        () => ({
            GoNext,
            GoBack,
            GoTo,
            Cancel,
            UpdateApi,
        }),
        [GoNext, GoBack, GoTo, Cancel, UpdateApi]
    )

    /**
     * State context value is the raw flowState from useReducer.
     *
     * We do not spread flowState here because useReducer already returns a new object on every dispatch.
     * Spreading Would create Another new object, adding pressure for the Global Context.
     * If Reducer returns the same reference, we want to preserve it to skip re-renders.
     *
     * React uses Object.is - if reducer returns the same state, consumers wont re-render.
     */

    return (
        <DispatchContext.Provider value={dispatchValue}>
            <StateContext.Provider value={flowState}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export { Provider }
