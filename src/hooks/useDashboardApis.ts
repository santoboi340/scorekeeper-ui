/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useApiDashboard.ts
import { useMutation } from '@tanstack/react-query'
import { fetchApiUrl } from '../../globalVar'

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

export const useDashboardApis = () => {
    return useMutation<ApiCallResponse, Error, ApiCallRequest>({
        mutationFn: async ({ method, url, params, body }) => {
            const baseUrl = await fetchApiUrl()
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

            let fetchUrl = url
            console.log('FETCH URL', fetchUrl)
            let fetchOptions: RequestInit = {
                method, // ✅ Now matches the actual HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }

            if (method === 'POST' || method === 'PUT') {
                fetchOptions.body = JSON.stringify({
                    endpoint: url,
                    body: bodyData,
                })
            }

            const res = await fetch(`${baseUrl}${fetchUrl}`, fetchOptions)

            const responseTime = Date.now() - startTime

            if (!res.ok) {
                const errorData = await res
                    .json()
                    .catch(() => ({ message: 'Request failed' }))
                throw new Error(
                    errorData.message || `HTTP ${res.status}: ${res.statusText}`
                )
            }

            const text = await res.text()
            const data = text ? JSON.parse(text) : null

            return {
                status: res.status,
                statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
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
