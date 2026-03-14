import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserProfile, UserProfileUpdate } from 'root/types/user'
import { fetchApiUrl } from '../../globalVar'

const BASE = '/api/v1/user/profile'

async function profileFetch<T>(
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
    if (!res.ok) throw new Error(`Profile API error: ${res.status}`)
    return res.json()
}

// GET /api/v1/user/profile/getProfile
export const useProfile = (uuid: string) =>
    useQuery({
        queryKey: ['profile', uuid],
        queryFn: () => profileFetch<UserProfile>('/getProfile'),
    })

// GET /api/v1/user/profile/me
export const useMyProfile = () =>
    useQuery({
        queryKey: ['profile', 'me'],
        queryFn: () => profileFetch<UserProfile>('/me'),
    })

// GET /api/v1/user/profile/{userName}
export const useProfileByUsername = (userName: string) =>
    useQuery({
        queryKey: ['profile', userName],
        queryFn: () => profileFetch<UserProfile>(`/${userName}`),
        enabled: !!userName,
    })

// GET /api/v1/user/profile/preview/{userName}
export const useProfilePreview = (userName: string) =>
    useQuery({
        queryKey: ['profile', 'preview', userName],
        queryFn: () => profileFetch<UserProfile>(`/preview/${userName}`),
        enabled: !!userName,
    })

// GET /api/v1/user/profile/all
export const useAllProfiles = () =>
    useQuery({
        queryKey: ['profiles'],
        queryFn: () => profileFetch<UserProfile[]>('/all'),
    })

// POST /api/v1/user/profile/create
export const useCreateProfile = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: UserProfileUpdate) =>
            profileFetch<UserProfile>('/create', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
    })
}

// PUT /api/v1/user/profile/update
export const useUpdateProfile = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: UserProfileUpdate) =>
            profileFetch<UserProfile>('/update', {
                method: 'PATCH',
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
    })
}
