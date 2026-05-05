import { useEffect, useRef } from 'react'
import { Step } from '../SimpleOrchestrator.types'

export const useStepLifecycle = (step: Step, stepIndex: number) => {
    //Refs ensure we always call the latest callbacks without re-triggering the effect
    const onEntryRef = useRef(step.onEntry)
    const onExitRef = useRef(step.onExit)

    useEffect(() => {
        onEntryRef.current = step.onEntry
        onExitRef.current = step.onExit
    })

    // only fires when stepIndex changes.
    useEffect(() => {
        onEntryRef.current?.()
        return () => onExitRef.current?.()
    }, [stepIndex])
}
