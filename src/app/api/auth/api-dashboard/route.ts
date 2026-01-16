// src/app/api/proxy/[...path]/route.ts
import { NextResponse } from 'next/server'

const BACKEND_BASE_URL = 'https://scorepal-dev.mts-lab.net/api/v1'

async function handleRequest(
    request: Request,
    method: string,
    pathSegments: string[]
) {
    try {
        const authHeader = request.headers.get('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]
        const path = pathSegments.join('/')
        const url = `${BACKEND_BASE_URL}/${path}`

        console.log(`📤 ${method} ${url}`)

        const fetchOptions: RequestInit = {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }

        // Add body for POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const body = await request.json()
            fetchOptions.body = JSON.stringify(body)
        }

        const response = await fetch(url, fetchOptions)
        const text = await response.text()

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Backend error', body: text },
                { status: response.status }
            )
        }

        let data
        try {
            data = text ? JSON.parse(text) : null
        } catch {
            return NextResponse.json(
                { message: 'Invalid JSON' },
                { status: 502 }
            )
        }

        return NextResponse.json(data || { message: 'Success' })
    } catch (error) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { message: 'Proxy error', error: String(error) },
            { status: 500 }
        )
    }
}

export async function GET(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, 'GET', params.path)
}

export async function POST(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, 'POST', params.path)
}

export async function PUT(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, 'PUT', params.path)
}

export async function PATCH(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, 'PATCH', params.path)
}

export async function DELETE(
    request: Request,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, 'DELETE', params.path)
}
