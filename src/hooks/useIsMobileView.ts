'use client'

import { useState, useEffect, useMemo } from 'react'

/**
 * Viewport breakpoint size names
 */
export type ViewportSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * Viewport hook return type
 */
export interface ViewportInfo {
    isMobile: boolean
    width: number
    breakpoint: ViewportSize
    isXS: boolean
    isSM: boolean
    isMD: boolean
    isLG: boolean
    isXL: boolean
    isXXL: boolean
}

/**
 * Breakpoint definitions in pixels
 */
const BREAKPOINTS = {
    xs: 576,
    sm: 767,
    md: 991,
    lg: 1199,
    xl: 1399,
} as const

/**
 * Determine the current viewport size based on width
 */
const getViewportSize = (width: number): ViewportSize => {
    if (width <= BREAKPOINTS.xs) return 'xs'
    if (width <= BREAKPOINTS.sm) return 'sm'
    if (width <= BREAKPOINTS.md) return 'md'
    if (width <= BREAKPOINTS.lg) return 'lg'
    if (width <= BREAKPOINTS.xl) return 'xl'
    return 'xxl'
}

/**
 * Custom hook to detect viewport size and breakpoints
 *
 * Breakpoints:
 * - XS: 576px and below
 * - SM: 577px - 767px
 * - MD: 768px - 991px
 * - LG: 992px - 1199px
 * - XL: 1200px - 1399px
 * - XXL: 1400px and above
 *
 * @returns ViewportInfo object with current viewport information
 */
export const useViewport = (): ViewportInfo => {
    const [width, setWidth] = useState<number>(() => {
        if (typeof window === 'undefined') return 1024
        return window.innerWidth
    })

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const viewport = useMemo(() => {
        const breakpoint = getViewportSize(width)
        const isMobile = width <= BREAKPOINTS.sm

        return {
            isMobile,
            width,
            breakpoint,
            isXS: breakpoint === 'xs',
            isSM: breakpoint === 'sm',
            isMD: breakpoint === 'md',
            isLG: breakpoint === 'lg',
            isXL: breakpoint === 'xl',
            isXXL: breakpoint === 'xxl',
        }
    }, [width])

    return viewport
}

/**
 * Simplified hook that only returns isMobile boolean
 * @returns boolean - true if viewport is XS or SM (mobile), false otherwise
 */
export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.innerWidth <= BREAKPOINTS.sm
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= BREAKPOINTS.sm)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return isMobile
}
