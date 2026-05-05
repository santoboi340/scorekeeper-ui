import { createContext } from 'react'
import {
    type ApiResponse,
    type FlowState,
    type DispatchActions,
} from '../SimpleOrchestrator.types'

/* Initial state for the flow, found within the Machine. */

export const initialFlowState: FlowState = {
    step: 0,
    maxSteps: 0,
    formData: {},
    api: {
        isError: undefined,
        isPending: undefined,
        isSuccess: undefined,
        error: undefined,
        currentRequest: {},
    } as ApiResponse & { currentRequest?: Record<string, unknown> | null },
}

/* Placeholder dispatch actions - replaced by Provider at runtime */
export const initialDispatchActions: DispatchActions = {
    GoBack: () => {},
    GoNext: () => {},
    GoTo: () => {},
    Cancel: () => {},
    UpdateApi: () => {},
}

/**Stable Context - Navigation functions that never change
 * Components consuming only this context never re-render from state changes.
 */

export const DispatchContext = createContext<DispatchActions>(
    initialDispatchActions
)

/**Volatile context - flow state that changes on every dispatch.
 * Only components reading flowState re-render whn it updates.
 */

export const StateContext = createContext<FlowState>(initialFlowState)
