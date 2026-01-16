// components/RegisterForm.tsx
'use client'

import { useState } from 'react'
import { useRegister } from 'root/hooks/useRegister'
import type { RegisterRequest } from '@/types/auth'

export default function RegisterForm() {
    const [formData, setFormData] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Client-side validation
        if (formData.password !== confirmPassword) {
            // Manually set error on mutation
            registerMutation.reset()
            alert('Passwords do not match')
            return
        }

        registerMutation.mutate(formData)
    }

    const registerMutation = useRegister()

    const handleChange = (field: keyof RegisterRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear errors when user starts typing
        if (registerMutation.error?.errors?.[field]) {
            registerMutation.reset()
        }
    }

    // Get field-specific error or general error
    const getFieldError = (field: keyof RegisterRequest) => {
        return registerMutation.error?.errors?.[field]
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto p-6"
        >
            {/* General Error Message */}
            {registerMutation.error && !registerMutation.error.errors && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 text-sm">
                        {registerMutation.error.message}
                    </p>
                </div>
            )}

            <div>
                <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-1"
                >
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={registerMutation.isPending}
                />
                {getFieldError('firstName') && (
                    <p className="text-red-600 text-sm mt-1">
                        {getFieldError('firstName')}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-1"
                >
                    Last Name
                </label>
                <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={registerMutation.isPending}
                />
                {getFieldError('lastName') && (
                    <p className="text-red-600 text-sm mt-1">
                        {getFieldError('lastName')}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={registerMutation.isPending}
                />
                {getFieldError('email') && (
                    <p className="text-red-600 text-sm mt-1">
                        {getFieldError('email')}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    minLength={8}
                    disabled={registerMutation.isPending}
                />
                {getFieldError('password') && (
                    <p className="text-red-600 text-sm mt-1">
                        {getFieldError('password')}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={8}
                    disabled={registerMutation.isPending}
                />
            </div>

            <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {registerMutation.isPending
                    ? 'Creating Account...'
                    : 'Register'}
            </button>
        </form>
    )
}
