import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from 'root/utils/context/AuthContext'
import type {
    RegisterRequest,
    RegisterResponse,
    AuthError,
} from 'root/types/auth'

export const useRegisterApi = () => {
    const router = useRouter()
    const { login } = useAuth()

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
            login(data.access_token)

            // Redirect to home
            router.push('/')
        },

        onError: (error) => {
            console.error('Registration error:', error)
        },
    })
}
