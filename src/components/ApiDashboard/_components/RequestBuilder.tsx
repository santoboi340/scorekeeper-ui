/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { useAuth } from 'root/context/AuthContext'

const RequestBuilder = ({ selectedEndpoint, apiCall }: any) => {
    const [activeTab, setActiveTab] = useState('headers')
    const [method, setMethod] = useState(selectedEndpoint.method || 'POST')
    const [url, setUrl] = useState(
        selectedEndpoint.path || '/api/v1/auth/authenticate'
    )
    const [params, setParams] = useState<Array<{ key: string; value: string }>>(
        []
    )
    const [body, setBody] = useState(
        selectedEndpoint.body || '{\n  "email": "",\n  "password": ""\n}'
    )
    const [pathParams, setPathParams] = useState<Record<string, string>>({})
    const [prevEndpoint, setPrevEndpoint] = useState(selectedEndpoint)

    // Extract path parameters from URL (e.g., {attribute}, {value})
    const extractPathParams = (urlPath: string): string[] => {
        const matches = urlPath.match(/\{([^}]+)\}/g)
        return matches ? matches.map((m) => m.slice(1, -1)) : []
    }

    // Build the final URL with path parameters substituted
    const buildFinalUrl = (): string => {
        let finalUrl = url
        Object.entries(pathParams).forEach(([key, value]) => {
            finalUrl = finalUrl.replace(`{${key}}`, encodeURIComponent(value))
        })
        return finalUrl
    }

    const pathParamKeys = extractPathParams(url)

    if (selectedEndpoint !== prevEndpoint) {
        setMethod(selectedEndpoint.method)
        setUrl(selectedEndpoint.path)
        setBody(selectedEndpoint.body)
        setPathParams({})
        setPrevEndpoint(selectedEndpoint)
    }

    const { user } = useAuth()
    const addParam = () => {
        setParams([...params, { key: '', value: '' }])
    }

    const updateParam = (
        index: number,
        field: 'key' | 'value',
        value: string
    ) => {
        const updated = [...params]
        updated[index][field] = value
        setParams(updated)
    }

    const removeParam = (index: number) => {
        setParams(params.filter((_, i) => i !== index))
    }

    return (
        <div className="request-builder">
            {/* Auth Info */}
            <div className="auth-info">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <span className="auth-icon">🔒</span>
                        <span>
                            Using JWT from local/session storage for
                            authenticated requests
                        </span>
                    </div>
                </div>
            </div>

            {/* URL Input */}
            <div className="builder-section">
                <div className="url-input-group">
                    <select
                        className="method-select"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input
                        type="text"
                        className="url-input"
                        placeholder="/api/endpoint"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
            </div>

            {/* Path Parameters */}
            {pathParamKeys.length > 0 && (
                <div className="builder-section">
                    <label className="section-label">Path Parameters</label>
                    <div className="path-params-grid">
                        {pathParamKeys.map((paramKey) => (
                            <div
                                key={paramKey}
                                className="path-param-input-group"
                            >
                                <label className="path-param-label">{`{${paramKey}}`}</label>
                                <input
                                    type="text"
                                    className="param-input"
                                    placeholder={`Enter ${paramKey}`}
                                    value={pathParams[paramKey] || ''}
                                    onChange={(e) =>
                                        setPathParams((prev) => ({
                                            ...prev,
                                            [paramKey]: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'headers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('headers')}
                >
                    Headers
                </button>
                <button
                    className={`tab ${activeTab === 'params' ? 'active' : ''}`}
                    onClick={() => setActiveTab('params')}
                >
                    Params
                </button>
                <button
                    className={`tab ${activeTab === 'body' ? 'active' : ''}`}
                    onClick={() => setActiveTab('body')}
                >
                    Body
                </button>
            </div>

            {/* Tab Content - Headers */}
            <div
                className={`tab-content ${
                    activeTab === 'headers' ? 'active' : ''
                }`}
            >
                <div className="builder-section">
                    <div className="header-info">
                        <p>
                            <strong>Content-Type:</strong> application/json
                        </p>
                        <p>
                            <strong>Authorization:</strong>{' '}
                            {`Bearer ${user && user.uuid}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Content - Params */}
            <div
                className={`tab-content ${
                    activeTab === 'params' ? 'active' : ''
                }`}
            >
                <div className="builder-section">
                    {params.map((param, index) => (
                        <div key={index} className="param-input-group">
                            <input
                                type="text"
                                className="param-input"
                                placeholder="Key"
                                value={param.key}
                                onChange={(e) =>
                                    updateParam(index, 'key', e.target.value)
                                }
                            />
                            <input
                                type="text"
                                className="param-input"
                                placeholder="Value"
                                value={param.value}
                                onChange={(e) =>
                                    updateParam(index, 'value', e.target.value)
                                }
                            />
                            <button
                                className="btn-remove"
                                onClick={() => removeParam(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button className="btn-add" onClick={addParam}>
                        + Add Param
                    </button>
                </div>
            </div>

            {/* Tab Content - Body */}
            <div
                className={`tab-content ${activeTab === 'body' ? 'active' : ''}`}
            >
                <div className="builder-section">
                    <textarea
                        className="code-editor"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Request body (JSON)"
                    />
                </div>
            </div>

            {/* Send Button */}
            <button
                className="btn-send"
                onClick={() =>
                    apiCall.mutate({
                        method,
                        url: buildFinalUrl(),
                        params,
                        body,
                    })
                }
                disabled={apiCall.isPending}
            >
                {apiCall.isPending ? 'Sending...' : 'Send Request'}
            </button>
        </div>
    )
}

export default RequestBuilder
