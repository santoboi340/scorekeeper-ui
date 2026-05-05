interface StepErrorDisplayProps {
    error: { message?: string } | null | undefined
}

const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred. Please try again'

export const StepErrorDisplay = ({ error }: StepErrorDisplayProps) => {
    //Fallback to default if message is missing or empty
    const errorMessage =
        typeof error?.message === 'string' && error.message.trim().length > 0
            ? error.message
            : DEFAULT_ERROR_MESSAGE

    return errorMessage
}
