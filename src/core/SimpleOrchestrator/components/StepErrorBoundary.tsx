import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { StepErrorDisplay } from './StepErrorDisplay'

interface StepErrorBoundaryProps {
    stepIndex: number
    children: React.ReactNode
    onError?: (error: Error, info: React.ErrorInfo) => void
}

const ErrorFallback = ({ error }: FallbackProps) => {
    if (error instanceof Error) {
        return <StepErrorDisplay error={{ message: error.message }} />
    }
}

export const StepErrorBoundary = ({
    stepIndex,
    children,
    onError,
}: StepErrorBoundaryProps) => (
    <ErrorBoundary
        key={`boundary-${stepIndex}`} // Resets on step change
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
            if (error instanceof Error) {
                console.error(
                    `SimpleOrchestrator - Step ${stepIndex} crashed:`,
                    error
                )
                onError?.(error, info)
            }
        }}
    >
        {children}
    </ErrorBoundary>
)
