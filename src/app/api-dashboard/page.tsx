/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ProtectedRoute } from '../components/ProtectedRoute.tsx/ProtectedRoute'
import ApiDashboard from '../components/ApiDashboard/ApiDashboard'

const ApiDashboardPage = () => {
    return (
        <ProtectedRoute>
            <ApiDashboard />
        </ProtectedRoute>
    )
}
export default ApiDashboardPage
