import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from 'root/types/user'
import { fetchApiUrl } from '../../globalVar'

const BASE = '/api/v1/user/account'

async function accountFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const apiUrl = await fetchApiUrl()
    const token =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token')
    const res = await fetch(`${apiUrl}${BASE}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
    if (!res.ok) throw new Error(`Account API error: ${res.status}`)
    return res.json()
}

// GET /api/v1/user/account/me
export const useMyAccount = () =>
    useQuery({
        queryKey: ['account', 'me'],
        queryFn: () => accountFetch<User>('/me'),
    })

// GET /api/v1/user/account/getinfo
export const useAccountInfo = () =>
    useQuery({
        queryKey: ['account', 'info'],
        queryFn: () => accountFetch<User>('/getinfo'),
    })

// DELETE /api/v1/user/account/{UserId}
export const useDeleteAccount = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (userId: string) =>
            accountFetch<void>(`/${userId}`, { method: 'DELETE' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['account'] }),
    })
}

// PUT /api/v1/user/account/update/{attribute}/{value}
export const useUpdateAccount = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({
            attribute,
            value,
        }: {
            attribute: string
            value: string
        }) =>
            accountFetch<User>(`/update/${attribute}/${value}`, {
                method: 'PUT',
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['account'] }),
    })
}
