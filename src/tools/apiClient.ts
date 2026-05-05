import axios, { all } from 'axios'
import { ApiRequestProps } from 'root/core/SimpleOrchestrator/SimpleOrchestrator.types'

export const fetchSingleApi = async (apiRequest: ApiRequestProps) => {
    const finalOptions = {
        url: apiRequest.url,
        method: apiRequest.method,
        data: apiRequest?.payload,
        params: apiRequest?.params,
        headers: { 'Content-Type': 'application/json' },
    }

    return await axios(finalOptions).then((res) => res.data)
}

export const fetchMultipleApi = async (apiRequest: ApiRequestProps[]) => {
    const responses = await all(
        apiRequest.map((apiProps) => {
            const finalOptions = {
                url: apiProps.url,
                method: apiProps.method,
                data: apiProps?.payload,
                params: apiProps?.params,
                headers: { 'Content-Type': 'application/json' },
            }
            return axios(finalOptions)
        })
    )
    return responses.map((res) => res.data)
}
