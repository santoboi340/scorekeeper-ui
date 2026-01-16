// components/RegisterForm.tsx
'use client'

import { useState } from 'react'
import type { RegisterRequest } from '../../types/auth'

export default function RegisterForm() {
    const [formData, setFormData] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER', // Default as per your schema
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof RegisterRequest, string>>
    >({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (field: keyof RegisterRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({})

        try {
            // const response = await fetch(
            //     'https://scorepal-dev.mts-lab.net/api/v1/auth/register',
            //     {
            //         // Update with your actual endpoint
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify(formData),
            //     }
            // )

            // TEMPORARYY: Use local API route as a proxy to avoid CORS issues during development
            const response = await fetch('/api/auth/register', {
                // Local proxy
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                // Handle validation errors from API
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    setErrors({
                        email:
                            data.message ||
                            'Registration failed. Please try again.',
                    })
                }
                return
            }

            // Success! Handle accordingly
            console.log('Registration successful:', data)

            // Store token if your API returns one
            if (data.token) {
                localStorage.setItem('authToken', data.token)
            }

            // Redirect to dashboard or login
            window.location.href = '/' // Or use Next.js router
        } catch (error) {
            console.error('Registration failed:', error)
            setErrors({
                email: 'Network error. Please check your connection and try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto p-6"
        >
            <div>
                <label
                    htmlFor="firstname"
                    className="block text-sm font-medium mb-1"
                >
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                />
                {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.firstName}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="lastname"
                    className="block text-sm font-medium mb-1"
                >
                    Last Name
                </label>
                <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                />
                {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.lastName}
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
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minLength={8} // Basic security requirement
                    disabled={isSubmitting}
                />
                {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.password}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isSubmitting ? 'Creating Account...' : 'Register'}
            </button>
        </form>
    )
}
