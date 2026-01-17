/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'

import DashHeader from './_components/DashHeader'
import DashSidebar from './_components/DashSidebar'
import RequestBuilder from './_components/RequestBuilder'
import ResponseViewer from './_components/ResponseViewer'

const ApiDashboard = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState({
        id: 'auth-register',
        method: 'POST',
        name: 'Register',
        path: '/api/v1/auth/register',
        body: '{\n  "email": "",\n  "password": "",\n  "firstname": "",\n  "lastname": "",\n  "role": ""\n}',
    })

    const handleEndpointClick = (endpoint: any) => {
        setSelectedEndpoint(endpoint)
    }

    return (
        <div className="api-dashboard">
            {/* Header */}
            <DashHeader />
            <div className="dashboard-container">
                {/* Sidebar */}
                <DashSidebar
                    selectedEndpoint={selectedEndpoint}
                    handleEndpointClick={handleEndpointClick}
                />
                {/* Main Content */}
                <main className="main-content">
                    <RequestBuilder selectedEndpoint={selectedEndpoint} />

                    {/* Response Section */}
                    <ResponseViewer />
                </main>
            </div>
        </div>
    )
}

export default ApiDashboard
