/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import { useApiCall } from 'root/hooks/useDashboard'
import './api.css'

const ApiDashboard = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS.auth[0])
    const [activeTab, setActiveTab] = useState('headers')
    const [method, setMethod] = useState('POST')
    const [url, setUrl] = useState('/api/v1/auth/authenticate')
    const [params, setParams] = useState<Array<{ key: string; value: string }>>(
        []
    )
    const [body, setBody] = useState('{\n  "email": "",\n  "password": ""\n}')

    const apiCall = useApiCall()

    // Update form when endpoint changes
    useEffect(() => {
        setMethod(selectedEndpoint.method)
        setUrl(selectedEndpoint.path)
        setBody(selectedEndpoint.body)
    }, [selectedEndpoint])

    const handleEndpointClick = (endpoint: any) => {
        setSelectedEndpoint(endpoint)
    }

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

    const sendRequest = () => {
        apiCall.mutate({ method, url, params, body })
    }

    const formatJSON = (obj: any) => {
        return JSON.stringify(obj, null, 2)
    }

    const syntaxHighlight = (json: string) => {
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                let cls = 'json-number'
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key'
                    } else {
                        cls = 'json-string'
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean'
                } else if (/null/.test(match)) {
                    cls = 'json-null'
                }
                return `<span class="${cls}">${match}</span>`
            }
        )
    }

    return (
        <div className="api-dashboard">
            {/* Header */}
            <header className="header">
                <h1>
                    <span>⚡</span> API Dashboard
                </h1>
            </header>

            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    {Object.entries(ENDPOINTS).map(([category, endpoints]) => (
                        <div key={category} className="category">
                            <div className="category-header">
                                <span
                                    className="category-dot"
                                    style={{
                                        background:
                                            CATEGORY_CONFIG[category].color,
                                    }}
                                />
                                {CATEGORY_CONFIG[category].label}
                            </div>
                            {endpoints.map((endpoint) => (
                                <div
                                    key={endpoint.id}
                                    className={`endpoint-item ${
                                        selectedEndpoint.id === endpoint.id
                                            ? 'active'
                                            : ''
                                    } ${category}`}
                                    onClick={() =>
                                        handleEndpointClick(endpoint)
                                    }
                                    style={
                                        selectedEndpoint.id === endpoint.id
                                            ? {
                                                  borderLeftColor:
                                                      CATEGORY_CONFIG[category]
                                                          .color,
                                              }
                                            : {}
                                    }
                                >
                                    <span
                                        className={`method-badge method-${endpoint.method.toLowerCase()}`}
                                    >
                                        {endpoint.method}
                                    </span>
                                    <span className="endpoint-name">
                                        {endpoint.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="request-builder">
                        {/* Auth Info */}
                        <div className="auth-info">
                            <span className="auth-icon">🔒</span>
                            <span>
                                Using JWT from local/session storage for
                                authenticated requests
                            </span>
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
                                        <strong>Content-Type:</strong>{' '}
                                        application/json
                                    </p>
                                    <p>
                                        <strong>Authorization:</strong> Bearer
                                        [token]
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
                                    <div
                                        key={index}
                                        className="param-input-group"
                                    >
                                        <input
                                            type="text"
                                            className="param-input"
                                            placeholder="Key"
                                            value={param.key}
                                            onChange={(e) =>
                                                updateParam(
                                                    index,
                                                    'key',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="param-input"
                                            placeholder="Value"
                                            value={param.value}
                                            onChange={(e) =>
                                                updateParam(
                                                    index,
                                                    'value',
                                                    e.target.value
                                                )
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
                            onClick={sendRequest}
                            disabled={apiCall.isPending}
                        >
                            {apiCall.isPending ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>

                    {/* Response Section */}
                    <div className="response-section">
                        <div className="section-title">Response</div>

                        {apiCall.isError && (
                            <div className="error-state">
                                <div className="error-icon">❌</div>
                                <p>Error: {apiCall.error.message}</p>
                            </div>
                        )}

                        {apiCall.data ? (
                            <>
                                <div className="response-header">
                                    <span
                                        className={`status-badge ${
                                            apiCall.data.status >= 200 &&
                                            apiCall.data.status < 300
                                                ? 'success'
                                                : 'error'
                                        }`}
                                    >
                                        {apiCall.data.status}{' '}
                                        {apiCall.data.statusText}
                                    </span>
                                    <span className="response-time">
                                        {apiCall.data.time}ms
                                    </span>
                                </div>
                                <div
                                    className="response-body"
                                    dangerouslySetInnerHTML={{
                                        __html: syntaxHighlight(
                                            formatJSON(apiCall.data.data)
                                        ),
                                    }}
                                />
                            </>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📡</div>
                                <p>Send a request to see the response</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ApiDashboard

// ... CATEGORY_CONFIG and ENDPOINTS remain the same
const CATEGORY_CONFIG: any = {
    auth: { color: '#10b981', label: 'Auth' },
    user: { color: '#3b82f6', label: 'User' },
    gateway: { color: '#f59e0b', label: 'Gateway' },
    match: { color: '#8b5cf6', label: 'Match' },
}

const ENDPOINTS = {
    auth: [
        {
            id: 'auth-register',
            method: 'POST',
            name: 'Register',
            path: '/api/v1/auth/register',
            body: '{\n  "email": "",\n  "password": "",\n  "firstname": "",\n  "lastname": "",\n  "role": ""\n}',
        },
        {
            id: 'auth-authenticate',
            method: 'POST',
            name: 'Authenticate',
            path: '/api/v1/auth/authenticate',
            body: '{\n  "email": "",\n  "password": ""\n}',
        },
    ],
    user: [
        {
            id: 'update-user-attribute',
            method: 'PATCH',
            name: 'Update User Attribute',
            path: '/api/v1/user/update',
            body: '{\n  "attribute": "",\n  "value": ""\n}',
        },
        {
            id: 'user-patch-user',
            method: 'PATCH',
            name: 'Patch User',
            path: '/api/v1/user/me',
            body: '{\n  "additionalProp1": "",\n  "additionalProp2": "",\n  "additionalProp3": ""\n}',
        },
        {
            id: 'user-get-user',
            method: 'GET',
            name: 'Get User',
            path: '/api/v1/user',
            body: '',
        },
        {
            id: 'user-get-user-by-id',
            method: 'GET',
            name: 'Get User By ID',
            path: '/api/v1/user/:id',
            body: '',
        },
        {
            id: 'user-get-current-user',
            method: 'GET',
            name: 'Get Current User',
            path: '/api/v1/user/getinfo',
            body: '',
        },
        {
            id: 'user-get-user-by-email',
            method: 'GET',
            name: 'Get User By Email',
            path: '/api/v1/user/email/:email',
            body: '',
        },
        {
            id: 'user-get-all-users',
            method: 'GET',
            name: 'Get All Users',
            path: '/api/v1/user/all',
            body: '',
        },
        {
            id: 'user-delete-user',
            method: 'DELETE',
            name: 'Delete User',
            path: '/api/v1/user/:UserId',
            body: '',
        },
    ],
    gateway: [
        {
            id: 'gateway-status',
            method: 'GET',
            name: 'Health Check',
            path: '/api/gateway/health',
            body: '',
        },
        {
            id: 'gateway-metrics',
            method: 'GET',
            name: 'Metrics',
            path: '/api/gateway/metrics',
            body: '',
        },
        {
            id: 'gateway-config',
            method: 'POST',
            name: 'Update Config',
            path: '/api/gateway/config',
            body: '{\n  "setting": "",\n  "value": ""\n}',
        },
    ],
    match: [
        {
            id: 'match-create',
            method: 'POST',
            name: 'Create Match',
            path: '/api/matches',
            body: '{\n  "player1Id": "",\n  "player2Id": ""\n}',
        },
        {
            id: 'match-get',
            method: 'GET',
            name: 'Get Match',
            path: '/api/matches/:id',
            body: '',
        },
        {
            id: 'match-list',
            method: 'GET',
            name: 'List Matches',
            path: '/api/matches',
            body: '',
        },
        {
            id: 'match-update',
            method: 'PATCH',
            name: 'Update Status',
            path: '/api/matches/:id/status',
            body: '{\n  "status": ""\n}',
        },
    ],
}
