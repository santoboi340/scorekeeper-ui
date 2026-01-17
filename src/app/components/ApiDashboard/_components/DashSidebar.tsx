/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
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
