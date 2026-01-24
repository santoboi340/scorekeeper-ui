/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ProtectedRoute } from 'root/components/ProtectedRoute/ProtectedRoute'
import ApiDashboard from 'root/components/ApiDashboard/ApiDashboard'

const ApiDashboardPage = () => {
    return (
        <ProtectedRoute>
            <ApiDashboard />
        </ProtectedRoute>
    )
}
export default ApiDashboardPage
