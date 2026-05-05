import { useContext } from 'react'

import { DispatchContext, StateContext } from './Context'
import { useStepApi } from '../hooks/useStepApi'
import { useStepLifecycle } from '../hooks/useStepLifecycle'
import { StepErrorDisplay } from '../components/StepErrorDisplay'
import { StepErrorBoundary } from '../components/StepErrorBoundary'
import { StepProgressTracker } from '../components/StepProgressTracker'
import { type SimpleOrchestratorProps } from '../SimpleOrchestrator.types'

const Machine = ({ steps, tracker }: SimpleOrchestratorProps) => {
    const { GoNext, GoBack, GoTo, Cancel, UpdateApi } =
        useContext(DispatchContext)
    const flowState = useContext(StateContext)

    const currentStep = steps[flowState.step]
    const StepComponent = currentStep.component

    // useStepApi now syncs to context internally - no bridge useEffect needed.
    const { isError, isPending, error, triggerApi } = useStepApi(
        currentStep.api,
        flowState.step,
        UpdateApi
    )

    //Fire onEntry/onExit callbacks on step transitions.
    useStepLifecycle(currentStep, flowState.step)

    return (
        <div aria-live="polite">
            {isError && <StepErrorDisplay error={error as any} />}
            {isPending && <div> Currently Pending </div>}
            {(isPending || isError) && <br />}
            {tracker && (
                <StepProgressTracker steps={steps} flowState={flowState} />
            )}
            <StepErrorBoundary
                key={`boundary-${flowState.step}`}
                stepIndex={flowState.step}
            >
                <StepComponent
                    key={`step-${flowState.step}`}
                    GoNext={GoNext}
                    GoBack={GoBack}
                    GoTo={GoTo}
                    Cancel={Cancel}
                    triggerApi={triggerApi}
                    flowState={flowState}
                />
            </StepErrorBoundary>
        </div>
    )
}

export { Machine }
