// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        console.log('📤 Registration request for:', body.email)

        const response = await fetch(
            'https://scorepal-dev.mts-lab.net/api/v1/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        )

        const data = await response.json()

        console.log('📥 Backend response:', { status: response.status })

        // Pass through the exact status code
        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('❌ Registration error:', error)

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
