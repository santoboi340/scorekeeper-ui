'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Logo } from '../components/Logo'
import { useLoginApi } from 'root/hooks/useLoginApi'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const loginMutation = useLoginApi()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate({ email, password, rememberMe })
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
                            Welcome back! Sign in to continue
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-lg md:rounded-xl shadow-lg md:shadow-xl border border-neutral p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold text-primary-green mb-6">
                            Sign In
                        </h2>

                        {/* Error Message */}
                        {loginMutation.error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">
                                    {loginMutation.error.message}
                                </p>
                            </div>
                        )}

                        {/* Email/Password Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (loginMutation.error) {
                                            loginMutation.reset() // Clear error on input
                                        }
                                    }}
                                    className="w-full px-4 py-3 md:py-3.5 border text-secondary-green border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="you@example.com"
                                    required
                                    disabled={loginMutation.isPending}
                                />
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
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (loginMutation.error) {
                                            loginMutation.reset() // Clear error on input
                                        }
                                    }}
                                    className="w-full px-4 py-3 md:py-3.5 border border-neutral rounded-lg text-secondary-green focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="••••••••"
                                    required
                                    disabled={loginMutation.isPending}
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                        disabled={loginMutation.isPending}
                                        className="w-4 h-4 text-teal border-neutral rounded focus:ring-teal disabled:opacity-50"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-sm text-secondary-green"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-teal hover:text-secondary-green font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="w-full bg-pickleball-yellow text-primary-green py-3 md:py-3.5 rounded-lg font-semibold text-sm md:text-base hover:bg-gold focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loginMutation.isPending
                                    ? 'Signing in...'
                                    : 'Sign In'}
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
                                onClick={() => console.log('Google login')}
                                disabled={loginMutation.isPending}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-neutral text-secondary-green py-3 md:py-3.5 rounded-lg font-medium hover:bg-cream hover:border-secondary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaGoogle className="text-lg text-red-500" />
                                <span className="text-sm md:text-base">
                                    Continue with Google
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => console.log('GitHub login')}
                                disabled={loginMutation.isPending}
                                className="w-full flex items-center justify-center gap-3 bg-primary-green text-cream py-3 md:py-3.5 rounded-lg font-medium hover:bg-secondary-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaGithub className="text-lg" />
                                <span className="text-sm md:text-base">
                                    Continue with GitHub
                                </span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="mt-6 text-center text-secondary-green text-sm">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                className="text-teal font-semibold hover:text-secondary-green"
                            >
                                Register
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
