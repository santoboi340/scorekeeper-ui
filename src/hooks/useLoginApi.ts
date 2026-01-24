import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from 'root/context/AuthContext'
import type { LoginRequest, LoginResponse, AuthError } from 'root/types/auth'

export const useLoginApi = () => {
    const router = useRouter()
    const { login } = useAuth()

    return useMutation<
        LoginResponse,
        AuthError,
        LoginRequest & { rememberMe: boolean }
    >({
        mutationFn: async ({ email, password }) => {
            const response = await fetch(
                'https://scorepal-dev.mts-lab.net/api/v1/auth/authenticate',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw {
                    message:
                        data.message ||
                        'Login failed. Please check your credentials.',
                    code: response.status,
                } as AuthError
            }

            return data as LoginResponse
        },

        onSuccess: (data, variables) => {
            // Store token based on "remember me"
            if (variables.rememberMe) {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('remembered_email', variables.email)
            } else {
                sessionStorage.setItem('access_token', data.access_token)
            }

            console.log('Login successful:', data.message)

            // Update auth context
            login(data.access_token)

            // Redirect to home
            router.push('/')
        },

        onError: (error) => {
            console.error('Login error:', error)
        },
    })
}
