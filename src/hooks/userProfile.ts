import { useQuery } from '@tanstack/react-query'
import type { UserProfile } from 'root/types/user'
import { fetchApiUrl } from '../../globalVar'

export const useProfile = (uuid: string) =>
    useQuery({
        queryKey: ['profile', uuid],
        queryFn: async () => {
            const apiUrl = await fetchApiUrl()
            const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
            const res = await fetch(`${apiUrl}/api/v1/user/profile/getProfile`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error('Failed to fetch profile')
            return res.json() as Promise<UserProfile>
        },
    })
