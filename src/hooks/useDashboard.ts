/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useDashboard.ts
import { useApiQuery, useApiMutation } from './useApi'

// GET /dashboard
export function useDashboard() {
    return useApiQuery(['dashboard'], '/dashboard')
}

// GET /users
export function useUsers() {
    return useApiQuery(['users'], '/users')
}

// GET /users/:id
export function useUser(userId: string) {
    return useApiQuery(['users', userId], `/users/${userId}`, {
        enabled: !!userId, // Only fetch if userId exists
    })
}

// GET /stats
export function useStats() {
    return useApiQuery(['stats'], '/stats', {
        refetchInterval: 1000 * 60, // Refetch every minute
    })
}

// POST /scores
export function useCreateScore() {
    return useApiMutation<any, { game: string; score: number }>(
        '/scores',
        'POST',
        {
            invalidateQueries: [['scores']], // Refetch scores after creating one
            onSuccess: (data) => {
                console.log('Score created:', data)
            },
        }
    )
}

// PUT /users/me
export function useUpdateProfile() {
    return useApiMutation<any, { firstname: string; lastname: string }>(
        '/users/me',
        'PUT',
        {
            invalidateQueries: [['users'], ['dashboard']], // Refetch multiple queries
        }
    )
}

// DELETE /users/:id
export function useDeleteUser() {
    return useApiMutation<any, { userId: string }>(
        (vars) => `/users/${vars.userId}`,
        'DELETE',
        {
            invalidateQueries: [['users']],
        }
    )
}
