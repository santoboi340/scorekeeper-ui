// src/hooks/useAuth.ts (add this to your existing file)
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    AuthError,
} from '@/types/auth'

// ... existing useLogin hook ...

export function useRegister() {
    const router = useRouter()
    const { login: setAuthUser } = useAuth()

    return useMutation<RegisterResponse, AuthError, RegisterRequest>({
        mutationFn: async (registerData) => {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw {
                    message:
                        data.message ||
                        'Registration failed. Please try again.',
                    code: response.status,
                    errors: data.errors,
                } as AuthError
            }

            return data as RegisterResponse
        },

        onSuccess: (data) => {
            console.log('Registration successful:', data)

            // Store token
            localStorage.setItem('access_token', data.access_token)

            // Update auth context
            setAuthUser(data.access_token)

            // Redirect to home
            router.push('/')
        },

        onError: (error) => {
            console.error('Registration error:', error)
        },
    })
}
