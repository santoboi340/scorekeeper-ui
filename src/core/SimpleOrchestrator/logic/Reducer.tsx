import { FlowState, OrchestratorAction } from '../SimpleOrchestrator.types'
import { initialFlowState } from './Context'

const Reducer = (state: FlowState, action: OrchestratorAction): FlowState => {
    switch (action.type) {
        case 'GO_NEXT': {
            // Boundary guard: can't advance past the last step
            if (state.step === state.maxSteps) {
                console.error(
                    `Simple Orchestrator - Cannot GoNext: already at final step (${state.step}/${state.maxSteps})`
                )
                return state
            }
            // Advance step and merge any new form data into accumulate state
            return {
                ...state,
                step: state.step + 1,
                formData: {
                    ...state.formData,
                    ...action.data,
                },
            }
        }

        case 'GO_BACK': {
            // Boundary guard: can't step back past initial step.
            if (state.step === 0) {
                console.error(
                    `Simple Orchestrator - Cannot GoBack: already at first step (0)`
                )
                return state
            }
            return {
                ...state,
                step: state.step - 1,
            }
        }

        case 'GO_TO': {
            // Boundary guard: Validate target step is within bounds
            if (action.step < 0 || action.step > state.maxSteps) {
                console.error(
                    `Simple Orhcestrator - Invalid GoTo: step ${action.step} is out of bounds (0 - ${state.maxSteps})`
                )
                return state
            }
            return {
                ...state,
                step: action.step,
            }
        }

        case 'CANCEL': {
            // Full reset, but preserve maxSteps ( structural, not runtime state)
            console.warn(
                `Simple Orchestrator - Flow Cancelled. Resetting to initial state`
            )
            return {
                ...initialFlowState,
                maxSteps: state.maxSteps,
            }
        }

        case 'UPDATE_API': {
            // Shallow equality check. if nothing changed, return same reference.
            // This breaks the useEffect -> dispatch -> re-render -> useEffect loop.
            const prev = state.api
            const next = action.api

            if (
                prev &&
                prev.isError === next.isError &&
                prev.isPending === next.isPending &&
                prev.isSuccess === next.isSuccess &&
                prev.data === next.data &&
                prev.error === next.error
            ) {
                return state // Same reference = no re-render
            }
            return {
                ...state,
                api: action.api,
            }
        }

        default: {
            // Exhaustive check - Typescript ensures all action types are handled.
            const _exhaustive: never = action
            console.error(
                `Simple Orchestrator - Unkown action type: ${(_exhaustive as any).type}`
            )
            return state
        }
    }
}

export { Reducer }
