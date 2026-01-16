// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()

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

    return NextResponse.json(data, { status: response.status })
}
