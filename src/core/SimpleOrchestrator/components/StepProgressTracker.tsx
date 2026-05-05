import { type Step, type FlowState } from '../SimpleOrchestrator.types'

interface StepProgressTrackerProps {
    steps: Step[]
    flowState: FlowState
}

/**
 * Receives flowState via props ( not context ) - can be wrapped in React.memo
 * to only re-render when step index changes.
 */

export const StepProgressTracker = ({
    steps,
    flowState,
}: StepProgressTrackerProps) => {
    const totalSteps = steps.length
    const currentStep = flowState.step + 1 // 0-indexed -> 1-indexed for display
    const isComplete = currentStep === totalSteps

    return (
        <div>
            {isComplete
                ? 'We Are Completed'
                : `We are currently on  ${currentStep}`}
        </div>
    )
}
