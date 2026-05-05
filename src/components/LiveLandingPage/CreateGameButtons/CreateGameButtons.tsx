import { StepComponentProps } from 'root/core/SimpleOrchestrator/SimpleOrchestrator.types'

const CreateGameButtons = ({ GoNext, GoBack, GoTo }: any) => {
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

    const handleClick = () => {
        console.log('handled click')
        GoNext()
    }
    return (
        <>
            {/* Main actions */}
            <div className={`mt-6 grid gap-3 ${'grid-cols-2'}`}>
                <button
                    onClick={() => handleClick()}
                    className="group relative overflow-hidden rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                        background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`,
                        minHeight: 180,
                    }}
                >
                    {/* Ball decoration */}
                    <div
                        className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-20 transition-transform group-hover:scale-110"
                        style={{ background: C.yellow }}
                    />
                    <div
                        className="absolute right-8 top-8 h-16 w-16 rounded-full border-2 opacity-40"
                        style={{ borderColor: C.yellow }}
                    />
                    <div className="relative">
                        <div
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: C.yellow, color: C.primary }}
                        >
                            Host
                        </div>
                        <div
                            className={`mt-3 ${'text-2xl'} font-bold leading-tight`}
                            style={{
                                color: C.cream,
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                            }}
                        >
                            Create a match
                        </div>
                        <div
                            className="mt-1 text-xs"
                            style={{ color: C.cream + 'aa' }}
                        >
                            Start a game, invite players
                        </div>
                    </div>
                </button>

                <div
                    className="rounded-2xl p-5"
                    style={{
                        background: '#ffffff',
                        border: `1px solid ${C.primary}15`,
                        minHeight: 180,
                    }}
                >
                    <div
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: C.teal + '22', color: C.teal }}
                    >
                        Join
                    </div>
                    <div
                        className={`mt-3 ${'text-2xl'} font-bold leading-tight`}
                        style={{
                            color: C.primary,
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                    >
                        Got a code
                    </div>
                    <div className="mt-3 flex gap-2">
                        <input
                            placeholder="ABC123"
                            className="flex-1 rounded-xl border px-3 py-2.5 text-center text-sm font-bold tracking-[0.3em] outline-none focus:border-opacity-100"
                            style={{
                                borderColor: C.primary + '22',
                                color: C.primary,
                                background: C.cream,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        />
                        <button
                            className="rounded-xl px-4 py-2.5 text-sm font-bold transition-transform active:scale-95"
                            style={{ background: C.primary, color: C.cream }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CreateGameButtons }
