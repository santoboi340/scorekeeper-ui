const TOKEN_KEY = 'access_token'

export const tokenStorage = {
    get: (): string | null => {
        if (typeof window === 'undefined') return null
        return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
    },

    set: (token: string, persistent = false) => {
        ;(persistent ? localStorage : sessionStorage).setItem(TOKEN_KEY, token)
    },

    clear: () => {
        localStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem('remembered_email')
    },
}
