/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { API_URL } from '../../../../globalVar'
const DashSidebar = ({ selectedEndpoint, handleEndpointClick }: any) => {
    return (
        <aside className="sidebar">
            {Object.entries(ENDPOINTS).map(([category, endpoints]) => (
                <div key={category} className="category">
                    <div className="category-header">
                        <span
                            className="category-dot"
                            style={{
                                background: CATEGORY_CONFIG[category].color,
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
                            onClick={() => handleEndpointClick(endpoint)}
                            style={
                                selectedEndpoint.id === endpoint.id
                                    ? {
                                          borderLeftColor:
                                              CATEGORY_CONFIG[category].color,
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
    )
}

export default DashSidebar

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
            path: `${API_URL}/api/v1/auth/register`,
            body: '{\n  "email": "",\n  "password": "",\n  "firstname": "",\n  "lastname": "",\n  "role": ""\n}',
        },
        {
            id: 'auth-authenticate',
            method: 'POST',
            name: 'Authenticate',
            path: `${API_URL}/api/v1/auth/authenticate`,
            body: '{\n  "email": "",\n  "password": ""\n}',
        },
    ],
    user: [
        {
            id: 'user-get-user',
            method: 'GET',
            name: 'Get User',
            path: `${API_URL}/api/v1/user`,
            body: '',
        },
        {
            id: 'user-get-user-by-id',
            method: 'GET',
            name: 'Get User By ID',
            path: `${API_URL}/api/v1/user/:id`,
            body: '',
        },
        {
            id: 'user-get-current-user',
            method: 'GET',
            name: 'Get Current User',
            path: `${API_URL}/api/v1/user/getInfo`,
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
    gateway: [],
    match: [],
}
