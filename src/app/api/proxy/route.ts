/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/proxy/route.ts
import { NextResponse } from 'next/server'

const BACKEND_BASE_URL = 'https://scorepal-dev.mts-lab.net'

async function handleProxyRequest(request: Request, method: string) {
    console.log('INCOMING REQUEST', request)

    try {
        let endpoint: string
        let requestBody: any = null

        // For GET/DELETE, check query params for endpoint
        // For POST/PUT/PATCH, get from body
        if (method === 'GET' || method === 'DELETE') {
            const { searchParams } = new URL(request.url)
            endpoint = searchParams.get('endpoint') || ''

            if (!endpoint) {
                return NextResponse.json(
                    { message: 'Missing "endpoint" query parameter' },
                    { status: 400 }
                )
            }
        } else {
            // POST/PUT/PATCH - read from body
            const body = await request.json()
            endpoint = body.endpoint
            requestBody = body.body
            if (!endpoint) {
                return NextResponse.json(
                    { message: 'Missing "endpoint" in request body' },
                    { status: 400 }
                )
            }
        }

        // Get token from Authorization header
        const authHeader = request.headers.get('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Unauthorized - No token provided' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]

        // Build full URL
        const url = `${BACKEND_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

        console.log(`📤 Proxying ${method} to:`, url)

        // Build fetch options
        const fetchOptions: RequestInit = {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }

        // Add body for POST/PUT/PATCH
        if (requestBody && ['POST', 'PUT', 'PATCH'].includes(method)) {
            fetchOptions.body = JSON.stringify(requestBody)
        }

        // Make the request
        const response = await fetch(url, fetchOptions)

        console.log(`📥 Backend response: ${response.status}`)

        // Get response text
        const text = await response.text()
        console.log(`📄 Backend body:`, text)

        // Return error responses as-is
        if (!response.ok) {
            let errorData
            try {
                errorData = text
                    ? JSON.parse(text)
                    : { message: 'Backend error' }
            } catch {
                errorData = { message: text || 'Backend error' }
            }
            console.error(`❌ Backend error:`, errorData)

            return NextResponse.json(errorData, { status: response.status })
        }

        // Parse successful response
        let data
        try {
            data = text ? JSON.parse(text) : null
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError)
            return NextResponse.json(
                {
                    message: 'Invalid JSON from backend',
                    body: text.substring(0, 100),
                },
                { status: 502 }
            )
        }

        return NextResponse.json(data || { message: 'Success' }, {
            status: response.status,
        })
    } catch (error) {
        console.error('❌ Proxy error:', error)
        return NextResponse.json(
            {
                message: 'Proxy error',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// Export all HTTP method handlers
export async function GET(request: Request) {
    return handleProxyRequest(request, 'GET')
}

export async function POST(request: Request) {
    return handleProxyRequest(request, 'POST')
}

export async function PUT(request: Request) {
    return handleProxyRequest(request, 'PUT')
}

export async function PATCH(request: Request) {
    return handleProxyRequest(request, 'PATCH')
}

export async function DELETE(request: Request) {
    return handleProxyRequest(request, 'DELETE')
}
