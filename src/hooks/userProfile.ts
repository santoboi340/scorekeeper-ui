// src/hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query'
import type { UserProfile } from 'root/types/user'
import { API_URL } from '../../globalVar'


const useProfile = (uuid: any) => {
    return useQuery({
        // 1. queryKey: Unique identifier for this data
        queryKey: ['profile', uuid],

        // 2. queryFn: Function that fetches the data
        queryFn: async () => {
            const token = localStorage.getItem('access_token')

            const response = await fetch(
                 `${API_URL}/api/v1/user/profile/getprofile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch profile')
            }

            return response.json() as Promise<UserProfile>
        },
    })
}

export { useProfile }
