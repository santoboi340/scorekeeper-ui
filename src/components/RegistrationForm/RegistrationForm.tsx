'use client'

import { useState } from 'react'
import { useRegisterApi } from 'root/hooks/useAuthApi'
import type { RegisterRequest } from 'root/types/auth'

const fields: { field: keyof RegisterRequest; label: string; type: string; minLength?: number }[] = [
    { field: 'firstName', label: 'First Name', type: 'text' },
    { field: 'lastName', label: 'Last Name', type: 'text' },
    { field: 'email', label: 'Email', type: 'email' },
    { field: 'password', label: 'Password', type: 'password', minLength: 8 },
]

const inputCx = 'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'

export default function RegisterForm() {
    const [formData, setFormData] = useState<RegisterRequest>({
        firstName: '', lastName: '', email: '', password: '', role: 'USER',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const mutation = useRegisterApi()

    const handleChange = (field: keyof RegisterRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (mutation.error?.errors?.[field]) mutation.reset()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password !== confirmPassword) {
            mutation.reset()
            alert('Passwords do not match')
            return
        }
        mutation.mutate(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
            {mutation.error && !mutation.error.errors && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 text-sm">{mutation.error.message}</p>
                </div>
            )}

            {fields.map(({ field, label, type, minLength }) => (
                <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium mb-1">{label}</label>
                    <input id={field} type={type} value={formData[field]} onChange={(e) => handleChange(field, e.target.value)}
                        className={inputCx} required minLength={minLength} disabled={mutation.isPending} />
                    {mutation.error?.errors?.[field] && (
                        <p className="text-red-600 text-sm mt-1">{mutation.error.errors[field]}</p>
                    )}
                </div>
            ))}

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputCx} required minLength={8} disabled={mutation.isPending} />
            </div>

            <button type="submit" disabled={mutation.isPending}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {mutation.isPending ? 'Creating Account...' : 'Register'}
            </button>
        </form>
    )
}
