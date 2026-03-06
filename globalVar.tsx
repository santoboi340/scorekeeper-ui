const HARDCODED_API_URL = 'https://scorepal-dev.mts-lab.net'

const resolveDefaultApiUrl = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return process.env.NEXT_PUBLIC_WEB_ORIGIN || HARDCODED_API_URL
}

let apiUrl = resolveDefaultApiUrl()
let apiUrlPromise: Promise<string> | null = null

const fetchApiUrl = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    return apiUrl
  }

  if (!apiUrlPromise) {
    apiUrlPromise = fetch('/api/config', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch config')
        }
        return res.json()
      })
      .then((config) => {
        if (config?.apiUrl) {
          apiUrl = config.apiUrl
        }
        return apiUrl
      })
      .catch((err) => {
        console.error('Failed to load config:', err)
        return apiUrl
      })
  }

  return apiUrlPromise
}

export { fetchApiUrl }

// if(API_URL===undefined)
// API_URL = `http://${window.location.hostname}:8080`