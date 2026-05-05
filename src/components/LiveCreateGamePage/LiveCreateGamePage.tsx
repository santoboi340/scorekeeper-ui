import { useState } from 'react'
const LiveCreateGamePage = () => {
    const [format, setFormat] = useState('singles') // singles | doubles
    const [targetScore, setTargetScore] = useState(11)
    const [winBy, setWinBy] = useState(2)
    const [serveFormat, setServeFormat] = useState('traditional') // traditional | rally
    const C = {
        primary: '#1b3527', // brand-primary (deep green)
        secondary: '#2a5740', // brand-secondary
        yellow: '#e6b93a', // pickleball yellow
        cream: '#f4efe5', // brand-cream
        olive: '#232a25',
        orange: '#c8641f', // burnt orange
        teal: '#3f8e90',
        gold: '#b8961f',
        neutral: '#8e8e8e',
        ink: '#0f1a14',
    }

    return (
        <div className={`flex h-full flex-col  'px-12 py-8' `}>
            <TopNav />

            <div className={`mt-4 flex-1 ${'grid grid-cols-2 gap-8'}`}>
                {/* LEFT / TOP */}
                <div className="flex flex-col gap-5">
                    <FieldGroup label="Format">
                        <div className="grid grid-cols-2 gap-2">
                            <OptionTile
                                active={format === 'singles'}
                                onClick={() => setFormat('singles')}
                                title="Singles"
                                sub="1v1"
                                icon={
                                    <div className="flex gap-1">test icon</div>
                                }
                            />
                            <OptionTile
                                active={format === 'doubles'}
                                onClick={() => setFormat('doubles')}
                                title="Doubles"
                                sub="2v2"
                                icon={<>Another Test ICon</>}
                            />
                        </div>
                    </FieldGroup>

                    <FieldGroup label="Serve format">
                        <div className="grid grid-cols-2 gap-2">
                            <OptionTile
                                active={serveFormat === 'traditional'}
                                onClick={() => setServeFormat('traditional')}
                                title="Traditional"
                                sub="Serve to score"
                                small
                            />
                            <OptionTile
                                active={serveFormat === 'rally'}
                                onClick={() => setServeFormat('rally')}
                                title="Rally"
                                sub="Any team scores"
                                small
                            />
                        </div>
                    </FieldGroup>
                </div>

                {/* RIGHT / BOTTOM */}
                <div className="flex flex-col gap-5">
                    <FieldGroup label="Target score">
                        <div className="grid grid-cols-3 gap-2">
                            {[11, 15, 21].map((s) => (
                                <ScoreChip
                                    key={s}
                                    active={targetScore === s}
                                    onClick={() => setTargetScore(s)}
                                >
                                    {s}
                                </ScoreChip>
                            ))}
                        </div>
                    </FieldGroup>

                    <FieldGroup label="Win by">
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2].map((s) => (
                                <ScoreChip
                                    key={s}
                                    active={winBy === s}
                                    onClick={() => setWinBy(s)}
                                >
                                    {s}
                                </ScoreChip>
                            ))}
                        </div>
                    </FieldGroup>

                    <div
                        className="mt-auto rounded-2xl p-4"
                        style={{
                            background: C.primary + '0c',
                            border: `1px dashed ${C.primary}33`,
                        }}
                    >
                        <div
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: C.secondary }}
                        >
                            Summary
                        </div>
                        <div
                            className="mt-1 text-sm font-semibold"
                            style={{ color: C.primary }}
                        >
                            {format === 'singles' ? 'Singles' : 'Doubles'} ·
                            First to {targetScore}, win by {winBy}
                        </div>
                        <div className="text-xs" style={{ color: C.secondary }}>
                            {serveFormat === 'traditional'
                                ? 'Traditional serve'
                                : 'Rally scoring'}
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-transform active:scale-[0.98]"
                style={{
                    background: C.primary,
                    color: C.yellow,
                    boxShadow: `0 8px 24px -4px ${C.primary}66`,
                }}
            >
                Create match & get code
            </button>
        </div>
    )
}

export { LiveCreateGamePage }

function FieldGroup({ label, children }: any) {
    const C = {
        primary: '#1b3527', // brand-primary (deep green)
        secondary: '#2a5740', // brand-secondary
        yellow: '#e6b93a', // pickleball yellow
        cream: '#f4efe5', // brand-cream
        olive: '#232a25',
        orange: '#c8641f', // burnt orange
        teal: '#3f8e90',
        gold: '#b8961f',
        neutral: '#8e8e8e',
        ink: '#0f1a14',
    }
    return (
        <div>
            <div
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: C.secondary }}
            >
                {label}
            </div>
            {children}
        </div>
    )
}

function OptionTile({ active, onClick, title, sub, icon, small }: any) {
    const C = {
        primary: '#1b3527', // brand-primary (deep green)
        secondary: '#2a5740', // brand-secondary
        yellow: '#e6b93a', // pickleball yellow
        cream: '#f4efe5', // brand-cream
        olive: '#232a25',
        orange: '#c8641f', // burnt orange
        teal: '#3f8e90',
        gold: '#b8961f',
        neutral: '#8e8e8e',
        ink: '#0f1a14',
    }
    return (
        <button
            onClick={onClick}
            className={`group relative overflow-hidden rounded-xl p-3 text-left transition-all ${
                small ? 'py-2.5' : ''
            }`}
            style={{
                background: active ? C.primary : '#ffffff',
                color: active ? C.cream : C.primary,
                border: `1.5px solid ${active ? C.primary : C.primary + '15'}`,
            }}
        >
            {icon && <div className="mb-1 opacity-80">{icon}</div>}
            <div
                className="text-sm font-bold"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
                {title}
            </div>
            <div className="text-[11px] opacity-75">{sub}</div>
            {active && (
                <div
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: C.yellow }}
                >
                    Check
                </div>
            )}
        </button>
    )
}

function ScoreChip({ active, onClick, children }: any) {
    const C = {
        primary: '#1b3527', // brand-primary (deep green)
        secondary: '#2a5740', // brand-secondary
        yellow: '#e6b93a', // pickleball yellow
        cream: '#f4efe5', // brand-cream
        olive: '#232a25',
        orange: '#c8641f', // burnt orange
        teal: '#3f8e90',
        gold: '#b8961f',
        neutral: '#8e8e8e',
        ink: '#0f1a14',
    }
    return (
        <button
            onClick={onClick}
            className="rounded-xl py-3 text-lg font-bold transition-transform active:scale-95"
            style={{
                background: active ? C.primary : '#ffffff',
                color: active ? C.yellow : C.primary,
                border: `1.5px solid ${active ? C.primary : C.primary + '15'}`,
                fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
        >
            {children}
        </button>
    )
}

function TopNav() {
    const C = {
        primary: '#1b3527', // brand-primary (deep green)
        secondary: '#2a5740', // brand-secondary
        yellow: '#e6b93a', // pickleball yellow
        cream: '#f4efe5', // brand-cream
        olive: '#232a25',
        orange: '#c8641f', // burnt orange
        teal: '#3f8e90',
        gold: '#b8961f',
        neutral: '#8e8e8e',
        ink: '#0f1a14',
    }
    return (
        <div className="flex items-center justify-between">
            <button
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                    background: '#ffffff',
                    color: C.primary,
                    border: `1px solid ${C.primary}15`,
                }}
            >
                Back
            </button>
            <div
                className={`${'text-lg'} font-bold`}
                style={{
                    color: C.primary,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
            >
                Title
            </div>
            <div className="h-9 w-9" />
        </div>
    )
}
