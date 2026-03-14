import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from 'root/context/AuthContext'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, AuthError } from 'root/types/auth'
import { fetchApiUrl } from '../../globalVar'

async function authFetch<T>(endpoint: string, body: object): Promise<T> {
    const apiUrl = await fetchApiUrl()
    const res = await fetch(`${apiUrl}/api/v1/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw { message: data.message || 'Request failed', code: res.status, errors: data.errors } as AuthError
    return data as T
}

export const useLoginApi = () => {
    const router = useRouter()
    const { login } = useAuth()

    return useMutation<LoginResponse, AuthError, LoginRequest & { rememberMe: boolean }>({
        mutationFn: ({ email, password }) => authFetch<LoginResponse>('authenticate', { email, password }),
        onSuccess: (data, { rememberMe, email }) => {
            if (rememberMe) {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('remembered_email', email)
            } else {
                sessionStorage.setItem('access_token', data.access_token)
            }
            login(data.access_token)
            router.push('/')
        },
        onError: (error) => console.error('Login error:', error),
    })
}

export const useRegisterApi = () => {
    const router = useRouter()
    const { login } = useAuth()

    return useMutation<RegisterResponse, AuthError, RegisterRequest>({
        mutationFn: (registerData) => authFetch<RegisterResponse>('register', registerData),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token)
            login(data.access_token)
            router.push('/')
        },
        onError: (error) => console.error('Registration error:', error),
    })
}
