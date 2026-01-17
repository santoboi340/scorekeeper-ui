// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const response = await fetch(
            'https://scorepal-dev.mts-lab.net/api/v1/auth/authenticate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        )

        const data = await response.json()

        // Pass through the exact status code from the backend
        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('❌ API Route Error:', error) // This will show in your terminal

        return NextResponse.json(
            {
                message: 'Server error. Please try again.',
                code: 500,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
