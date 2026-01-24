/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = '/api/proxy'

function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return (
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token')
    )
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export async function apiCall<T = any>(
    endpoint: string,
    method: string = 'GET',
    body?: any
): Promise<T> {
    const token = getToken()

    if (!token) {
        throw new ApiError(401, 'No authentication token')
    }

    const options: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options)

    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: 'Request failed' }))
        throw new ApiError(
            response.status,
            error.message || 'API request failed'
        )
    }

    return response.json()
}
