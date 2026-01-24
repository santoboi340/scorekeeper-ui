/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { useDashboardApis } from 'root/hooks/useDashboardApis'

import DashHeader from './_components/DashHeader'
import DashSidebar from './_components/DashSidebar'
import RequestBuilder from './_components/RequestBuilder'
import ResponseViewer from './_components/ResponseViewer'

const ApiDashboard = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState({
        id: '',
        method: '',
        name: '',
        path: '',
        body: '',
    })

    const apiCall = useDashboardApis()
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
                    <RequestBuilder
                        apiCall={apiCall}
                        selectedEndpoint={selectedEndpoint}
                    />

                    {/* Response Section */}
                    <ResponseViewer apiCall={apiCall} />
                </main>
            </div>
        </div>
    )
}

export default ApiDashboard
