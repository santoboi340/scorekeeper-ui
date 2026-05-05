import { Provider } from './logic/Provider'
import { Machine } from './logic/Machine'
import { type SimpleOrchestratorProps } from './SimpleOrchestrator.types'

/**
 * Simple Orhcestrator - Multi-Step wizard for generic flows.
 * Wraps Machine (renderer) inside Provider (state management)
 */

const SimpleOrchestrator = ({
    steps,
    tracker,
    initialData,
}: SimpleOrchestratorProps) => {
    if (!steps || steps.length === 0) {
        console.error(
            'SimpleOrchestrator: `steps` array must contain at least one step.'
        )
        return null
    }

    return (
        <Provider maxSteps={steps.length - 1} initialData={initialData}>
            <Machine tracker={tracker} steps={steps} />
        </Provider>
    )
}

export { SimpleOrchestrator }
