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

export const useDashboardApis = () => {
    return useMutation<ApiCallResponse, Error, ApiCallRequest>({
        mutationFn: async ({ method, url, params, body }) => {
            console.log('incoming data', method, url, params, body)
            const baseUrl = 'https://scorepal-dev.mts-lab.net'
            const startTime = Date.now()

            // Parse body if present
            let bodyData = null
            if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
                console.log(
                    'The API Contains a Body, AND , is of method POST PUT OR PATCH'
                )
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

            console.log('API CALL CHECKPOINT - Contains Token')
            console.log('API CALL CHECKPOINT - satisfies method body reqs')
            console.log('📤 API Call:', { method, url, bodyData })

            let fetchUrl = url
            let fetchOptions: RequestInit = {
                method, // ✅ Now matches the actual HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }

            // // For GET/DELETE, pass endpoint as query param
            // if (method === 'GET' || method === 'DELETE') {
            //     console.log(' API CALL CHECKPOINT - REQUEST WAS GET REQUEST')
            //     fetchUrl = `/api/proxy?endpoint=${encodeURIComponent(url)}`
            //     console.log(
            //         ' API CALL CHECKPOINT - THIS IS THE GET URL',
            //         fetchUrl
            //     )
            // }
            // For POST/PUT/PATCH, pass endpoint and body in request body
            if (method === 'POST' || method === 'PUT') {
                fetchOptions.body = JSON.stringify({
                    endpoint: url,
                    body: bodyData,
                })
            }

            if (method === 'PATCH') {
                fetchOptions.body = JSON.stringify({
                    endpoint: `${url}/${bodyData.attribute}/${bodyData.value}`,
                })
            }

            console.log(fetchUrl)
            console.log(fetchOptions)

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
