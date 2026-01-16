/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useApiDashboard.ts
import { useMutation } from '@tanstack/react-query'

export interface ApiCallRequest {
    method: string
    url: string
    params?: Array<{ key: string; value: string }>
    body?: string
}

export interface ApiCallResponse {
    status: number
    statusText: string
    time: number
    data: any
    headers: Record<string, string>
}

export function useApiCall() {
    return useMutation<ApiCallResponse, Error, ApiCallRequest>({
        mutationFn: async ({ method, url, params, body }) => {
            const startTime = Date.now()

            // Parse body if present
            let bodyData = null
            if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
                try {
                    bodyData = JSON.parse(body)
                } catch (e) {
                    throw new Error('Invalid JSON in request body')
                }
            }

            const token =
                localStorage.getItem('access_token') ||
                sessionStorage.getItem('access_token')

            if (!token) {
                throw new Error('No authentication token found')
            }

            console.log('📤 API Call:', { method, url, bodyData })

            let fetchUrl = '/api/proxy'
            let fetchOptions: RequestInit = {
                method, // ✅ Now matches the actual HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }

            // For GET/DELETE, pass endpoint as query param
            if (method === 'GET' || method === 'DELETE') {
                fetchUrl = `/api/proxy?endpoint=${encodeURIComponent(url)}`
            } else {
                // For POST/PUT/PATCH, pass endpoint and body in request body
                fetchOptions.body = JSON.stringify({
                    endpoint: url,
                    body: bodyData,
                })
            }

            const res = await fetch(fetchUrl, fetchOptions)

            const responseTime = Date.now() - startTime

            if (!res.ok) {
                const errorData = await res
                    .json()
                    .catch(() => ({ message: 'Request failed' }))
                throw new Error(
                    errorData.message || `HTTP ${res.status}: ${res.statusText}`
                )
            }

            const data = await res.json()

            console.log('✅ Response:', {
                status: res.status,
                time: responseTime,
            })

            return {
                status: res.status,
                statusText: res.statusText,
                time: responseTime,
                data,
                headers: Object.fromEntries(res.headers.entries()),
            }
        },

        onError: (error) => {
            console.error('❌ API call failed:', error)
        },
    })
}
