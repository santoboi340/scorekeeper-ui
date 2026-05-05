import React from 'react'
/**
 * API configuration for a step
 */

/** All possible actions dispatched to the Reducer. */
export type OrchestratorAction =
    | { type: 'GO_NEXT'; data?: Record<string, unknown> }
    | { type: 'GO_BACK' }
    | { type: 'GO_TO'; step: number }
    | { type: 'CANCEL' }
    | { type: 'UPDATE_API'; api: ApiResponse }

/** Internal dispatch functions (includes UpdateApi, not exposed to steps). */
export type DispatchActions = {
    GoBack: () => void
    GoNext: (data?: Record<string, unknown>) => void
    GoTo: (step: number) => void
    Cancel: () => void
    UpdateApi: (api: ApiResponse) => void
}
/** Configuration for a single sten in the wizard */
export type Step = {
    onEntry?: () => void // Called when entering the step.
    onExit?: () => void // Called when exiting the step.
    component: (props: StepComponentProps) => React.JSX.Element // Component for the step
    api?: ApiRequestProps // Optional api config for this step.
}
/* Public props injected into every step component */
export type StepComponentProps = {
    /**Navigate to the previous step */
    GoBack: () => void
    /** Navigate to the next step, optionally passing data */
    GoNext: (data?: Record<string, unknown>, action?: unknown) => void
    /** Jump to a specific step by index */
    GoTo: (step: number) => void
    /** Cancel the flow and reset to the initial step */
    Cancel: () => void
    /** Update flowState without changing steps */
    Update?: (payload: Partial<FlowState>) => void
    /**Trigger Api calls */
    triggerApi: () => void
    /** Current state of the flow */
    flowState: FlowState
}

export type AlertProps = {
    /**
     * a unique identifier for the alert.
     */
    id: string
    /**
     * The title of the alert
     */
    title: string | React.JSX.Element
    /**
     * Additional information about the alert.
     */
    message?: string | React.JSX.Element
}

export type ApiRequestProps = {
    /**
     * The URL of the Api endpoint to which the request will be sent.
     * It should return a JSON response with sections to be rendered.
     */
    url: string

    /**
     * The HTTP Method to be used for the request.
     */
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

    /**
     * Optional. A unique key for the query, used to ID the request in caching.
     * This can be a string that represents the specific request.
     * It is useful for avoiding duplicate requests and managing the request lifecycle.
     */
    queryKey?: string

    /**
     * Optional. A boolean flag indicating whether the Api request is enabled.
     * If set to false, the request will not be made.
     */
    enabled?: boolean

    /**
     * Optional. The payload to be sent with the request, which can be a string
     * or a record (object) containing key-value pairs.
     */
    payload?: string | Record<string, unknown>

    /**
     * Optional. Additional params to be included in the request.
     */
    params?: string | Record<string, string>

    /**
     * Optional. Additional headers to be included in the request.
     */
    headers?: string | Record<string, string>
}

/** API Request Status and Response Data */
export type ApiResponse = {
    /**
     * Indicates if the request resulted in an error
     */
    isError?: boolean
    /**
     * Indicates if the request is currently pending
     */
    isPending?: boolean
    /**
     * Indicates if the request was successful
     */
    isSuccess?: boolean
    /**
     * Data returned from a successful request
     */
    data?: Record<string, unknown> | null
    /** Error object from a failed request */
    error?: Record<string, unknown> | null
}

/* The State of the Machine */
export type FlowState = {
    /* Current step index */
    step: number
    /* Total number of steps in the flow */
    maxSteps: number
    /* Accumulated form data from previous steps */
    formData: Record<string, unknown>
    /* Page level error alert displayed when an Api's onError callback returns an alert */
    pageAlert?: AlertProps
    /**
     * Api State
     */
    api?: ApiResponse & {
        currentRequest?: Record<string, unknown> | null
    }
}

export type SimpleOrchestratorProps = {
    /* Array of Step Objects defining the flow */
    steps: Step[]
    /* Enable tracking of the flow's progress */
    tracker?: boolean
    initialData?: Record<string, unknown> | undefined
}
