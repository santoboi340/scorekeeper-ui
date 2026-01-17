/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from 'root/app/context/AuthContext'

const RequestBuilder = ({ selectedEndpoint, apiCall }: any) => {
    const [activeTab, setActiveTab] = useState('headers')
    const [method, setMethod] = useState('POST')
    const [url, setUrl] = useState('/api/v1/auth/authenticate')
    const [params, setParams] = useState<Array<{ key: string; value: string }>>(
        []
    )
    const [body, setBody] = useState('{\n  "email": "",\n  "password": ""\n}')

    console.log(method, url, body, params)
    // Update form when endpoint changes
    useEffect(() => {
        setMethod(selectedEndpoint.method)
        setUrl(selectedEndpoint.path)
        setBody(selectedEndpoint.body)
    }, [selectedEndpoint])

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
                onClick={() => apiCall.mutate({ method, url, params, body })}
                disabled={apiCall.isPending}
            >
                {apiCall.isPending ? 'Sending...' : 'Send Request'}
            </button>
        </div>
    )
}

export default RequestBuilder
