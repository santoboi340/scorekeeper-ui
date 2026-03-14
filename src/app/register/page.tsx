'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Logo } from 'root/components/Logo'
import { useRegisterApi } from 'root/hooks/useAuthApi'
import type { RegisterRequest } from 'root/types/auth'

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const registerMutation = useRegisterApi()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== confirmPassword) {
            registerMutation.reset()
            alert('Passwords do not match')
            return
        }

        registerMutation.mutate(formData)
    }

    const handleChange = (field: keyof RegisterRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (registerMutation.error?.errors?.[field]) {
            registerMutation.reset()
        }
    }

    const getFieldError = (field: keyof RegisterRequest) => {
        return registerMutation.error?.errors?.[field]
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
                <div className="w-full max-w-md">
                    {/* Brand/Logo */}
                    <div className="text-center mb-8">
                        <div className="justify-center flex">
                            <Logo href="/" imageUrl="/Logos/Scorepal2.png" />
                        </div>
                        <p className="text-secondary-green text-sm md:text-base">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Registration Card */}
                    <div className="bg-white rounded-lg md:rounded-xl shadow-lg md:shadow-xl border border-neutral p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold text-primary-green mb-6">
                            Create Account
                        </h2>

                        {/* General Error Message */}
                        {registerMutation.error &&
                            !registerMutation.error.errors && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700 text-sm">
                                        {registerMutation.error.message}
                                    </p>
                                </div>
                            )}

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields Row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-secondary-green font-medium mb-2 text-sm md:text-base"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            handleChange(
                                                'firstName',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="John"
                                        required
                                        disabled={registerMutation.isPending}
                                    />
                                    {getFieldError('firstName') && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {getFieldError('firstName')}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-secondary-green font-medium mb-2 text-sm md:text-base"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            handleChange(
                                                'lastName',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Doe"
                                        required
                                        disabled={registerMutation.isPending}
                                    />
                                    {getFieldError('lastName') && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {getFieldError('lastName')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-secondary-green font-medium mb-2 text-sm md:text-base"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleChange('email', e.target.value)
                                    }
                                    className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="you@example.com"
                                    required
                                    disabled={registerMutation.isPending}
                                />
                                {getFieldError('email') && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {getFieldError('email')}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-secondary-green font-medium mb-2 text-sm md:text-base"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleChange('password', e.target.value)
                                    }
                                    className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    disabled={registerMutation.isPending}
                                />
                                {getFieldError('password') && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {getFieldError('password')}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-secondary-green font-medium mb-2 text-sm md:text-base"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    disabled={registerMutation.isPending}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="w-full bg-pickleball-yellow text-primary-green py-3 md:py-3.5 rounded-lg font-semibold text-sm md:text-base hover:bg-gold focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {registerMutation.isPending
                                    ? 'Creating Account...'
                                    : 'Create Account'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-neutral"></div>
                            <span className="px-4 text-neutral text-xs md:text-sm font-medium">
                                OR
                            </span>
                            <div className="flex-1 border-t border-neutral"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                type="button"
                                onClick={() => console.log('Google signup')}
                                disabled={registerMutation.isPending}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-neutral text-secondary-green py-3 md:py-3.5 rounded-lg font-medium hover:bg-cream hover:border-secondary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaGoogle className="text-lg text-red-500" />
                                <span className="text-sm md:text-base">
                                    Continue with Google
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => console.log('GitHub signup')}
                                disabled={registerMutation.isPending}
                                className="w-full flex items-center justify-center gap-3 bg-primary-green text-cream py-3 md:py-3.5 rounded-lg font-medium hover:bg-secondary-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaGithub className="text-lg" />
                                <span className="text-sm md:text-base">
                                    Continue with GitHub
                                </span>
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <p className="mt-6 text-center text-secondary-green text-sm">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-teal font-semibold hover:text-secondary-green"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <Link
                            href="/"
                            className="text-secondary-green hover:text-primary-green transition-colors text-sm md:text-base inline-flex items-center gap-2"
                        >
                            <span>←</span>
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
