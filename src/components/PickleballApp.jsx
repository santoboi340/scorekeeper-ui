import React, { useState, useEffect, useRef } from 'react'
import {
    Plus,
    Users,
    Trophy,
    Zap,
    ChevronLeft,
    Copy,
    Check,
    Undo2,
    ArrowRightLeft,
    Circle,
    Share2,
    Crown,
    Dot,
    Clock,
    Flame,
    Target,
    Hash,
    Sparkles,
    ArrowUpRight,
    MoreVertical,
    Bell,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Design tokens — matches user's globals.css palette
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Root: two device frames side-by-side (mobile + web)
// ─────────────────────────────────────────────────────────────
export default function PickleballApp() {
    const [sharedState, setSharedState] = useState(createInitialState())

    return (
        <div
            className="min-h-screen w-full p-4 md:p-10"
            style={{
                background: `
          radial-gradient(ellipse 80% 50% at 20% 0%, ${C.secondary}22, transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 100%, ${C.orange}18, transparent 60%),
          ${C.cream}
        `,
                fontFamily:
                    "'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif",
            }}
        >
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
                rel="stylesheet"
            />

            <Header />

            <div className="mx-auto mt-6 flex max-w-[1600px] flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-center">
                {/* Mobile device */}
                <div className="flex w-full flex-col items-center lg:w-auto">
                    <DeviceLabel label="MOBILE · iOS" />
                    <MobileFrame>
                        <AppRouter
                            state={sharedState}
                            setState={setSharedState}
                            platform="mobile"
                        />
                    </MobileFrame>
                </div>

                {/* Web device */}
                <div className="flex w-full flex-1 flex-col items-center">
                    <DeviceLabel label="WEB · RESPONSIVE" />
                    <DesktopFrame>
                        <AppRouter
                            state={sharedState}
                            setState={setSharedState}
                            platform="web"
                        />
                    </DesktopFrame>
                </div>
            </div>

            <Footer />
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Device chrome
// ─────────────────────────────────────────────────────────────
function Header() {
    return (
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
            <div className="flex items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: C.primary }}
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke={C.yellow}
                            strokeWidth="2"
                        />
                        <circle cx="9" cy="9" r="1" fill={C.yellow} />
                        <circle cx="15" cy="9" r="1" fill={C.yellow} />
                        <circle cx="12" cy="12" r="1" fill={C.yellow} />
                        <circle cx="9" cy="15" r="1" fill={C.yellow} />
                        <circle cx="15" cy="15" r="1" fill={C.yellow} />
                    </svg>
                </div>
                <div>
                    <div
                        className="text-xl font-bold leading-none tracking-tight"
                        style={{
                            color: C.primary,
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                    >
                        Dink
                    </div>
                    <div
                        className="text-[11px] font-medium"
                        style={{ color: C.secondary }}
                    >
                        Interactive prototype · clickable
                    </div>
                </div>
            </div>

            <div
                className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium md:flex"
                style={{
                    borderColor: C.primary + '33',
                    color: C.primary,
                    background: '#ffffff80',
                }}
            >
                <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: C.teal }}
                />
                Both screens share state — try it
            </div>
        </div>
    )
}

function Footer() {
    return (
        <div
            className="mx-auto mt-10 max-w-[1600px] text-center text-[11px]"
            style={{ color: C.primary + '99' }}
        >
            Tap around — create a match on one device, join with the code on the
            other.
        </div>
    )
}

function DeviceLabel({ label }) {
    return (
        <div
            className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: C.primary + '99' }}
        >
            <div
                className="h-px w-6"
                style={{ background: C.primary + '33' }}
            />
            {label}
            <div
                className="h-px w-6"
                style={{ background: C.primary + '33' }}
            />
        </div>
    )
}

function MobileFrame({ children }) {
    return (
        <div
            className="relative"
            style={{
                width: 380,
                height: 780,
                borderRadius: 48,
                padding: 10,
                background: `linear-gradient(145deg, ${C.ink}, #2a2f2b)`,
                boxShadow: `
          0 30px 60px -20px rgba(27, 53, 39, 0.45),
          0 0 0 2px rgba(0,0,0,0.8),
          inset 0 0 0 1px rgba(255,255,255,0.05)
        `,
            }}
        >
            {/* side buttons */}
            <div
                className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l"
                style={{ background: '#1a1f1c' }}
            />
            <div
                className="absolute -left-[3px] top-44 h-12 w-[3px] rounded-l"
                style={{ background: '#1a1f1c' }}
            />
            <div
                className="absolute -left-[3px] top-60 h-12 w-[3px] rounded-l"
                style={{ background: '#1a1f1c' }}
            />
            <div
                className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r"
                style={{ background: '#1a1f1c' }}
            />

            <div
                className="relative h-full w-full overflow-hidden"
                style={{ borderRadius: 40, background: C.cream }}
            >
                {/* dynamic island */}
                <div
                    className="absolute left-1/2 top-2 z-40 h-7 w-[110px] -translate-x-1/2 rounded-full"
                    style={{ background: '#000' }}
                />
                <div
                    className="h-full w-full overflow-y-auto"
                    style={{ paddingTop: 44 }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

function DesktopFrame({ children }) {
    return (
        <div
            className="w-full"
            style={{
                borderRadius: 16,
                padding: 0,
                background: `linear-gradient(145deg, ${C.ink}, #2a2f2b)`,
                boxShadow: `
          0 30px 60px -20px rgba(27, 53, 39, 0.45),
          0 0 0 1px rgba(0,0,0,0.6)
        `,
                maxWidth: 1100,
            }}
        >
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-3">
                <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: '#ff5f57' }}
                />
                <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: '#febc2e' }}
                />
                <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: '#28c840' }}
                />
                <div
                    className="ml-4 flex-1 rounded-md px-3 py-1 text-center text-xs"
                    style={{ background: '#0000004d', color: C.cream + 'aa' }}
                >
                    app.dink.co
                </div>
                <div className="w-16" />
            </div>

            <div
                className="relative overflow-hidden"
                style={{
                    height: 740,
                    background: C.cream,
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                }}
            >
                {children}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Shared app state + routing
// ─────────────────────────────────────────────────────────────
function createInitialState() {
    return {
        screen: 'home', // home | create | lobby | live | summary
        match: null,
        playerRole: 'host', // "host" | "guest"
        history: [],
        toasts: [],
    }
}

function AppRouter({ state, setState, platform }) {
    const go = (screen, patch = {}) =>
        setState((s) => ({
            ...s,
            screen,
            ...patch,
            history: [...s.history, s.screen],
        }))

    const pushToast = (msg, kind = 'ok') => {
        const id = Date.now() + Math.random()
        setState((s) => ({ ...s, toasts: [...s.toasts, { id, msg, kind }] }))
        setTimeout(
            () =>
                setState((s) => ({
                    ...s,
                    toasts: s.toasts.filter((t) => t.id !== id),
                })),
            2200
        )
    }

    const screenProps = { state, setState, go, pushToast, platform }

    return (
        <div className="relative h-full w-full">
            {state.screen === 'home' && <HomeScreen {...screenProps} />}
            {state.screen === 'create' && <CreateScreen {...screenProps} />}
            {state.screen === 'lobby' && <LobbyScreen {...screenProps} />}
            {state.screen === 'live' && <LiveScreen {...screenProps} />}
            {state.screen === 'summary' && <SummaryScreen {...screenProps} />}

            {/* Toasts */}
            <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4">
                {state.toasts.map((t) => (
                    <div
                        key={t.id}
                        className="pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg animate-fadeIn"
                        style={{
                            background: t.kind === 'ok' ? C.primary : C.orange,
                            color: C.cream,
                        }}
                    >
                        {t.kind === 'ok' ? (
                            <Check className="h-3.5 w-3.5" />
                        ) : (
                            <Zap className="h-3.5 w-3.5" />
                        )}
                        {t.msg}
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        @keyframes pulseBall {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 ${C.yellow}66; }
          50% { transform: scale(1.06); box-shadow: 0 0 0 10px ${C.yellow}00; }
        }
        .pulse-ball { animation: pulseBall 1.6s ease-in-out infinite; }
        @keyframes scorePop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .score-pop { animation: scorePop 0.35s cubic-bezier(.2,.9,.3,1.3); }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up { animation: slideUp 0.4s cubic-bezier(.2,.9,.3,1.1); }
      `}</style>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────────────────────
function HomeScreen({ go, setState, pushToast, platform, state }) {
    const isWeb = platform === 'web'
    const [joinCode, setJoinCode] = useState('')

    const handleJoin = () => {
        if (joinCode.trim().length < 4) {
            pushToast('Enter a match code', 'err')
            return
        }
        // If a match exists (host created one), allow guest to join it
        if (
            state.match &&
            state.match.code.toUpperCase() === joinCode.toUpperCase().trim()
        ) {
            setState((s) => ({
                ...s,
                match: {
                    ...s.match,
                    players: s.match.players.map((p, i) =>
                        i === 1 ? { ...p, name: 'You', joined: true } : p
                    ),
                },
                playerRole: 'guest',
            }))
            go('lobby')
            pushToast('Joined match!')
        } else {
            // Demo: create a placeholder match so join works standalone
            const demo = makeDemoMatch(joinCode.toUpperCase())
            demo.players[1] = { ...demo.players[1], name: 'You', joined: true }
            setState((s) => ({ ...s, match: demo, playerRole: 'guest' }))
            go('lobby')
            pushToast('Joined match!')
        }
    }

    return (
        <div
            className={`flex h-full flex-col ${isWeb ? 'px-12 py-10' : 'px-5 pb-24 pt-4'}`}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between">
                <div>
                    <div
                        className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: C.secondary }}
                    >
                        Sunday · 3:42 PM
                    </div>
                    <div
                        className={`${isWeb ? 'text-4xl' : 'text-2xl'} mt-1 font-bold leading-tight`}
                        style={{
                            color: C.primary,
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Hey, Alex.
                        <br />
                        <span style={{ color: C.secondary }}>
                            Ready to dink?
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="relative flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                            background: '#ffffff',
                            boxShadow: '0 2px 10px #0002',
                        }}
                    >
                        <Bell
                            className="h-4 w-4"
                            style={{ color: C.primary }}
                        />
                        <span
                            className="absolute right-2 top-2 h-2 w-2 rounded-full"
                            style={{ background: C.orange }}
                        />
                    </button>
                    <div
                        className="h-10 w-10 rounded-full"
                        style={{
                            background: `linear-gradient(135deg, ${C.orange}, ${C.yellow})`,
                            boxShadow: '0 2px 10px #0002',
                        }}
                    />
                </div>
            </div>

            {/* Stats row */}
            <div
                className={`mt-6 grid ${isWeb ? 'grid-cols-4 gap-4' : 'grid-cols-3 gap-2.5'}`}
            >
                <StatCard
                    label="Win rate"
                    value="73%"
                    tone="primary"
                    icon={<Trophy className="h-3.5 w-3.5" />}
                    isWeb={isWeb}
                />
                <StatCard
                    label="Streak"
                    value="W4"
                    tone="orange"
                    icon={<Flame className="h-3.5 w-3.5" />}
                    isWeb={isWeb}
                />
                <StatCard
                    label="Matches"
                    value="24"
                    tone="teal"
                    icon={<Hash className="h-3.5 w-3.5" />}
                    isWeb={isWeb}
                />
                {isWeb && (
                    <StatCard
                        label="Rating"
                        value="4.2"
                        tone="gold"
                        icon={<Sparkles className="h-3.5 w-3.5" />}
                        isWeb={isWeb}
                    />
                )}
            </div>

            {/* Main actions */}
            <div
                className={`mt-6 grid gap-3 ${isWeb ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
                <button
                    onClick={() => go('create')}
                    className="group relative overflow-hidden rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                        background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`,
                        minHeight: isWeb ? 180 : 130,
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
                            <Plus className="h-3 w-3" />
                            Host
                        </div>
                        <div
                            className={`mt-3 ${isWeb ? 'text-2xl' : 'text-xl'} font-bold leading-tight`}
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
                        <ArrowUpRight
                            className="absolute right-0 top-0 h-5 w-5 opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            style={{ color: C.yellow }}
                        />
                    </div>
                </button>

                <div
                    className="rounded-2xl p-5"
                    style={{
                        background: '#ffffff',
                        border: `1px solid ${C.primary}15`,
                        minHeight: isWeb ? 180 : 'auto',
                    }}
                >
                    <div
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: C.teal + '22', color: C.teal }}
                    >
                        <Users className="h-3 w-3" />
                        Join
                    </div>
                    <div
                        className={`mt-3 ${isWeb ? 'text-2xl' : 'text-xl'} font-bold leading-tight`}
                        style={{
                            color: C.primary,
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                    >
                        Got a code?
                    </div>
                    <div className="mt-3 flex gap-2">
                        <input
                            value={joinCode}
                            onChange={(e) =>
                                setJoinCode(
                                    e.target.value.toUpperCase().slice(0, 6)
                                )
                            }
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
                            onClick={handleJoin}
                            className="rounded-xl px-4 py-2.5 text-sm font-bold transition-transform active:scale-95"
                            style={{ background: C.primary, color: C.cream }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>

            {/* Active match banner (if exists) */}
            {state.match && state.match.status === 'live' && (
                <button
                    onClick={() => go('live')}
                    className="mt-4 flex items-center gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
                    style={{
                        background: `linear-gradient(90deg, ${C.orange}, ${C.yellow})`,
                    }}
                >
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full pulse-ball"
                        style={{ background: '#ffffff' }}
                    >
                        <Circle
                            className="h-5 w-5 fill-current"
                            style={{ color: C.orange }}
                        />
                    </div>
                    <div className="flex-1">
                        <div
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: '#ffffff' }}
                        >
                            Live now
                        </div>
                        <div
                            className="text-sm font-bold"
                            style={{ color: '#ffffff' }}
                        >
                            Match in progress — tap to return
                        </div>
                    </div>
                    <ArrowUpRight
                        className="h-5 w-5"
                        style={{ color: '#ffffff' }}
                    />
                </button>
            )}

            {/* Recent matches */}
            <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                    <div
                        className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                        style={{ color: C.secondary }}
                    >
                        Recent matches
                    </div>
                    <button
                        className="text-[11px] font-semibold"
                        style={{ color: C.teal }}
                    >
                        See all
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <RecentMatchRow
                        result="W"
                        score="11–7"
                        opp="vs. Jordan & Sam"
                        when="Yesterday"
                        isWeb={isWeb}
                    />
                    <RecentMatchRow
                        result="W"
                        score="11–9"
                        opp="vs. Morgan"
                        when="2 days ago"
                        isWeb={isWeb}
                    />
                    <RecentMatchRow
                        result="L"
                        score="8–11"
                        opp="vs. Casey & Pat"
                        when="Last week"
                        isWeb={isWeb}
                    />
                </div>
            </div>
        </div>
    )
}

function StatCard({ label, value, tone, icon, isWeb }) {
    const toneMap = {
        primary: { bg: C.primary, fg: C.cream, accent: C.yellow },
        orange: { bg: C.orange, fg: '#ffffff', accent: C.yellow },
        teal: { bg: C.teal, fg: '#ffffff', accent: C.cream },
        gold: { bg: C.gold, fg: '#ffffff', accent: C.cream },
    }
    const t = toneMap[tone]
    return (
        <div
            className="relative overflow-hidden rounded-xl p-3"
            style={{ background: t.bg, color: t.fg }}
        >
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider opacity-80">
                {icon}
                {label}
            </div>
            <div
                className={`mt-1 ${isWeb ? 'text-3xl' : 'text-2xl'} font-bold leading-none`}
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
                {value}
            </div>
        </div>
    )
}

function RecentMatchRow({ result, score, opp, when, isWeb }) {
    const win = result === 'W'
    return (
        <div
            className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white"
            style={{ background: '#ffffff88' }}
        >
            <div
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold"
                style={{
                    background: win ? C.primary : C.orange + '22',
                    color: win ? C.yellow : C.orange,
                }}
            >
                {result}
            </div>
            <div className="flex-1">
                <div
                    className="text-sm font-semibold"
                    style={{ color: C.primary }}
                >
                    {opp}
                </div>
                <div
                    className="text-[11px]"
                    style={{ color: C.secondary + 'aa' }}
                >
                    {when}
                </div>
            </div>
            <div
                className={`${isWeb ? 'text-lg' : 'text-base'} font-bold`}
                style={{
                    color: C.primary,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
            >
                {score}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// CREATE MATCH SCREEN
// ─────────────────────────────────────────────────────────────
function CreateScreen({ go, setState, platform, pushToast }) {
    const isWeb = platform === 'web'
    const [format, setFormat] = useState('singles') // singles | doubles
    const [targetScore, setTargetScore] = useState(11)
    const [winBy, setWinBy] = useState(2)
    const [serveFormat, setServeFormat] = useState('traditional') // traditional | rally

    const handleCreate = () => {
        const match = makeDemoMatch(generateCode(), {
            format,
            targetScore,
            winBy,
            serveFormat,
        })
        setState((s) => ({ ...s, match, playerRole: 'host' }))
        go('lobby')
        pushToast('Match created!')
    }

    return (
        <div
            className={`flex h-full flex-col ${isWeb ? 'px-12 py-8' : 'px-5 pb-6 pt-4'}`}
        >
            <TopNav onBack={() => go('home')} title="New Match" isWeb={isWeb} />

            <div
                className={`mt-4 flex-1 ${isWeb ? 'grid grid-cols-2 gap-8' : 'flex flex-col gap-5'}`}
            >
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
                                    <div className="flex gap-1">
                                        <Dot size={20} />
                                        <Dot size={20} />
                                    </div>
                                }
                            />
                            <OptionTile
                                active={format === 'doubles'}
                                onClick={() => setFormat('doubles')}
                                title="Doubles"
                                sub="2v2"
                                icon={<Users className="h-5 w-5" />}
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
                onClick={handleCreate}
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-transform active:scale-[0.98]"
                style={{
                    background: C.primary,
                    color: C.yellow,
                    boxShadow: `0 8px 24px -4px ${C.primary}66`,
                }}
            >
                <Sparkles className="h-4 w-4" />
                Create match & get code
            </button>
        </div>
    )
}

function FieldGroup({ label, children }) {
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

function OptionTile({ active, onClick, title, sub, icon, small }) {
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
                    <Check className="h-3 w-3" style={{ color: C.primary }} />
                </div>
            )}
        </button>
    )
}

function ScoreChip({ active, onClick, children }) {
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

// ─────────────────────────────────────────────────────────────
// LOBBY SCREEN
// ─────────────────────────────────────────────────────────────
function LobbyScreen({ state, setState, go, pushToast, platform }) {
    const isWeb = platform === 'web'
    const { match, playerRole } = state
    const [copied, setCopied] = useState(false)

    if (!match) {
        go('home')
        return null
    }

    const copyCode = () => {
        navigator.clipboard?.writeText(match.code).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
        pushToast('Code copied')
    }

    const simulateJoin = () => {
        const emptySlot = match.players.findIndex((p) => !p.joined)
        if (emptySlot === -1) return
        const names = ['Jordan', 'Casey', 'Morgan']
        setState((s) => ({
            ...s,
            match: {
                ...s.match,
                players: s.match.players.map((p, i) =>
                    i === emptySlot
                        ? { ...p, name: names[i - 1] || 'Guest', joined: true }
                        : p
                ),
            },
        }))
        pushToast('Player joined!')
    }

    const startMatch = () => {
        setState((s) => ({
            ...s,
            match: { ...s.match, status: 'live', startedAt: Date.now() },
        }))
        go('live')
    }

    const allJoined = match.players.every((p) => p.joined)

    return (
        <div
            className={`flex h-full flex-col ${isWeb ? 'px-12 py-8' : 'px-5 pb-6 pt-4'}`}
        >
            <TopNav
                onBack={() => go('home')}
                title="Match Lobby"
                isWeb={isWeb}
            />

            <div
                className={`mt-4 flex-1 ${isWeb ? 'grid grid-cols-5 gap-8' : 'flex flex-col gap-5'}`}
            >
                {/* Code card */}
                <div className={isWeb ? 'col-span-2' : ''}>
                    <div
                        className="relative overflow-hidden rounded-3xl p-6"
                        style={{
                            background: `linear-gradient(145deg, ${C.primary} 0%, ${C.secondary} 100%)`,
                            color: C.cream,
                        }}
                    >
                        {/* court lines decoration */}
                        <svg
                            className="absolute -right-6 -top-6 h-48 w-48 opacity-10"
                            viewBox="0 0 200 200"
                            fill="none"
                        >
                            <rect
                                x="20"
                                y="20"
                                width="160"
                                height="160"
                                stroke={C.yellow}
                                strokeWidth="2"
                            />
                            <line
                                x1="20"
                                y1="100"
                                x2="180"
                                y2="100"
                                stroke={C.yellow}
                                strokeWidth="2"
                            />
                            <line
                                x1="100"
                                y1="20"
                                x2="100"
                                y2="180"
                                stroke={C.yellow}
                                strokeWidth="2"
                            />
                            <rect
                                x="50"
                                y="50"
                                width="100"
                                height="100"
                                stroke={C.yellow}
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                            />
                        </svg>

                        <div className="relative">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                                Share code
                            </div>
                            <div
                                className={`mt-3 ${isWeb ? 'text-6xl' : 'text-5xl'} font-bold tracking-[0.1em]`}
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: C.yellow,
                                }}
                            >
                                {match.code}
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-2">
                                <button
                                    onClick={copyCode}
                                    className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-transform active:scale-95"
                                    style={{
                                        background: C.yellow,
                                        color: C.primary,
                                    }}
                                >
                                    {copied ? (
                                        <Check className="h-3.5 w-3.5" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                    {copied ? 'Copied!' : 'Copy code'}
                                </button>
                                <button
                                    className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-transform active:scale-95"
                                    style={{
                                        background: 'transparent',
                                        color: C.cream,
                                        border: `1.5px solid ${C.cream}44`,
                                    }}
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                    Share link
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Match specs */}
                    <div
                        className="mt-3 grid grid-cols-3 gap-2 rounded-2xl p-3"
                        style={{
                            background: '#ffffff',
                            border: `1px solid ${C.primary}15`,
                        }}
                    >
                        <Spec
                            label="Format"
                            value={match.format === 'singles' ? '1v1' : '2v2'}
                        />
                        <Spec label="Target" value={match.targetScore} />
                        <Spec label="Win by" value={match.winBy} />
                    </div>
                </div>

                {/* Players */}
                <div className={isWeb ? 'col-span-3' : ''}>
                    <div className="mb-2 flex items-center justify-between">
                        <div
                            className="text-[11px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: C.secondary }}
                        >
                            Players (
                            {match.players.filter((p) => p.joined).length}/
                            {match.players.length})
                        </div>
                        {playerRole === 'host' && !allJoined && (
                            <button
                                onClick={simulateJoin}
                                className="text-[11px] font-semibold"
                                style={{ color: C.teal }}
                            >
                                + Simulate join
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {match.players.map((p, i) => (
                            <PlayerRow
                                key={i}
                                player={p}
                                team={
                                    match.format === 'doubles'
                                        ? i < 2
                                            ? 'A'
                                            : 'B'
                                        : i === 0
                                          ? 'A'
                                          : 'B'
                                }
                                isHost={i === 0}
                            />
                        ))}
                    </div>

                    {allJoined && (
                        <button
                            onClick={startMatch}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-transform active:scale-[0.98] slide-up"
                            style={{
                                background: C.orange,
                                color: '#ffffff',
                                boxShadow: `0 8px 24px -4px ${C.orange}66`,
                            }}
                        >
                            <Zap className="h-4 w-4 fill-current" />
                            Start match
                        </button>
                    )}
                    {!allJoined && (
                        <div
                            className="mt-4 flex items-center gap-2 rounded-2xl p-3 text-xs"
                            style={{
                                background: C.yellow + '22',
                                color: C.primary,
                            }}
                        >
                            <Clock
                                className="h-4 w-4"
                                style={{ color: C.orange }}
                            />
                            Waiting for{' '}
                            {match.players.filter((p) => !p.joined).length} more
                            player
                            {match.players.filter((p) => !p.joined).length > 1
                                ? 's'
                                : ''}
                            …
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Spec({ label, value }) {
    return (
        <div className="text-center">
            <div
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: C.secondary }}
            >
                {label}
            </div>
            <div
                className="text-lg font-bold"
                style={{
                    color: C.primary,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
            >
                {value}
            </div>
        </div>
    )
}

function PlayerRow({ player, team, isHost }) {
    return (
        <div
            className="flex items-center gap-3 rounded-xl p-3 transition-all"
            style={{
                background: player.joined ? '#ffffff' : C.primary + '06',
                border: player.joined
                    ? `1px solid ${C.primary}15`
                    : `1px dashed ${C.primary}22`,
                opacity: player.joined ? 1 : 0.6,
            }}
        >
            <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold"
                style={{
                    background: team === 'A' ? C.primary : C.orange,
                    color: C.cream,
                }}
            >
                {player.joined ? player.name[0] : '?'}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div
                        className="text-sm font-semibold"
                        style={{ color: C.primary }}
                    >
                        {player.joined ? player.name : 'Waiting…'}
                    </div>
                    {isHost && (
                        <span
                            className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                            style={{ background: C.yellow, color: C.primary }}
                        >
                            <Crown className="h-2.5 w-2.5" />
                            HOST
                        </span>
                    )}
                </div>
                <div
                    className="text-[11px]"
                    style={{ color: C.secondary + 'aa' }}
                >
                    Team {team}
                </div>
            </div>
            {player.joined && (
                <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: C.teal }}
                />
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// LIVE SCORING SCREEN
// ─────────────────────────────────────────────────────────────
function LiveScreen({ state, setState, go, pushToast, platform }) {
    const isWeb = platform === 'web'
    const { match } = state
    const [elapsed, setElapsed] = useState(0)
    const [lastScored, setLastScored] = useState(null)
    const historyRef = useRef([])

    useEffect(() => {
        const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
        return () => clearInterval(interval)
    }, [])

    if (!match) {
        go('home')
        return null
    }

    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
    const ss = String(elapsed % 60).padStart(2, '0')

    const pushAction = (action) => {
        historyRef.current = [
            ...historyRef.current,
            { ...action, ts: Date.now() },
        ]
    }

    const scorePoint = (team) => {
        const prev = { ...match }
        pushAction({ type: 'point', team, prev })

        const newScore = { ...match.score, [team]: match.score[team] + 1 }

        // Check win
        const winTarget = match.targetScore
        const winBy = match.winBy
        const aScore = newScore.A
        const bScore = newScore.B
        const winner =
            aScore >= winTarget && aScore - bScore >= winBy
                ? 'A'
                : bScore >= winTarget && bScore - aScore >= winBy
                  ? 'B'
                  : null

        setLastScored(team)
        setTimeout(() => setLastScored(null), 500)

        setState((s) => ({
            ...s,
            match: {
                ...s.match,
                score: newScore,
                serving: team, // side-out logic: server keeps ball on point
                status: winner ? 'done' : 'live',
                winner,
            },
        }))

        if (winner) {
            setTimeout(() => go('summary'), 800)
        }
    }

    const sideOut = () => {
        pushAction({ type: 'sideout', prev: { ...match } })
        setState((s) => ({
            ...s,
            match: { ...s.match, serving: s.match.serving === 'A' ? 'B' : 'A' },
        }))
        pushToast('Side-out')
    }

    const undo = () => {
        const last = historyRef.current.pop()
        if (!last) {
            pushToast('Nothing to undo', 'err')
            return
        }
        setState((s) => ({ ...s, match: last.prev }))
        pushToast('Undone')
    }

    return (
        <div
            className={`flex h-full flex-col ${isWeb ? 'px-10 py-6' : 'px-5 pb-5 pt-4'}`}
            style={{ background: C.cream }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => go('home')}
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: C.secondary }}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Exit
                </button>

                <div
                    className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: C.orange, color: '#ffffff' }}
                >
                    <span
                        className="h-2 w-2 animate-pulse rounded-full"
                        style={{ background: '#ffffff' }}
                    />
                    LIVE · {mm}:{ss}
                </div>

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ color: C.secondary }}
                >
                    <MoreVertical className="h-4 w-4" />
                </button>
            </div>

            {/* Main scoreboard */}
            <div
                className={`mt-4 flex-1 ${isWeb ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}
            >
                {/* Team A */}
                <TeamPanel
                    side="A"
                    team="A"
                    players={
                        match.format === 'doubles'
                            ? match.players.slice(0, 2)
                            : [match.players[0]]
                    }
                    score={match.score.A}
                    serving={match.serving === 'A'}
                    onTap={() => scorePoint('A')}
                    pulse={lastScored === 'A'}
                    targetScore={match.targetScore}
                    isWeb={isWeb}
                    color={C.primary}
                />

                {/* Center: court viz + controls */}
                <div
                    className={`flex flex-col items-center justify-center gap-3 ${isWeb ? '' : 'order-last'}`}
                >
                    <CourtVisualization
                        serving={match.serving}
                        format={match.format}
                        isWeb={isWeb}
                    />

                    <div className="flex w-full gap-2">
                        <ControlButton
                            onClick={undo}
                            icon={<Undo2 className="h-4 w-4" />}
                            label="Undo"
                            tone="neutral"
                        />
                        <ControlButton
                            onClick={sideOut}
                            icon={<ArrowRightLeft className="h-4 w-4" />}
                            label="Side-out"
                            tone="accent"
                        />
                    </div>

                    <div
                        className="w-full rounded-xl p-2 text-center text-[10px]"
                        style={{
                            background: C.primary + '08',
                            color: C.secondary,
                        }}
                    >
                        <span className="font-bold">Tip:</span> Tap a team's
                        card to award a point
                    </div>
                </div>

                {/* Team B */}
                <TeamPanel
                    side="B"
                    team="B"
                    players={
                        match.format === 'doubles'
                            ? match.players.slice(2, 4)
                            : [match.players[1]]
                    }
                    score={match.score.B}
                    serving={match.serving === 'B'}
                    onTap={() => scorePoint('B')}
                    pulse={lastScored === 'B'}
                    targetScore={match.targetScore}
                    isWeb={isWeb}
                    color={C.orange}
                />
            </div>
        </div>
    )
}

function TeamPanel({
    side,
    team,
    players,
    score,
    serving,
    onTap,
    pulse,
    targetScore,
    isWeb,
    color,
}) {
    const displayPlayers = players.filter(Boolean)
    return (
        <button
            onClick={onTap}
            className="group relative flex flex-col overflow-hidden rounded-3xl p-5 text-left transition-transform active:scale-[0.98]"
            style={{
                background: color,
                color: C.cream,
                minHeight: isWeb ? '100%' : 200,
            }}
        >
            {/* Decorative */}
            <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10"
                style={{ background: C.yellow }}
            />

            <div className="relative flex items-center justify-between">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                        Team {team}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">
                        {displayPlayers.map((p) => p.name).join(' & ')}
                    </div>
                </div>
                {serving && (
                    <div
                        className="pulse-ball flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ background: C.yellow }}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5">
                            <circle cx="12" cy="12" r="10" fill={C.primary} />
                            <circle cx="9" cy="9" r="1.2" fill={C.yellow} />
                            <circle cx="15" cy="9" r="1.2" fill={C.yellow} />
                            <circle cx="12" cy="12" r="1.2" fill={C.yellow} />
                            <circle cx="9" cy="15" r="1.2" fill={C.yellow} />
                            <circle cx="15" cy="15" r="1.2" fill={C.yellow} />
                        </svg>
                    </div>
                )}
            </div>

            <div className="relative flex flex-1 items-center justify-center py-4">
                <div
                    key={score}
                    className="score-pop font-bold leading-none"
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: isWeb ? 180 : 110,
                        color: C.yellow,
                        letterSpacing: '-0.05em',
                        textShadow: `0 4px 20px ${C.ink}33`,
                    }}
                >
                    {score}
                </div>
            </div>

            <div className="relative flex items-center justify-between text-[11px] opacity-70">
                <div>to {targetScore}</div>
                <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {Math.round((score / targetScore) * 100)}%
                </div>
            </div>

            {/* Progress bar */}
            <div
                className="relative mt-1 h-1 overflow-hidden rounded-full"
                style={{ background: '#ffffff20' }}
            >
                <div
                    className="h-full transition-all duration-300"
                    style={{
                        width: `${Math.min(100, (score / targetScore) * 100)}%`,
                        background: C.yellow,
                    }}
                />
            </div>

            {/* Tap hint */}
            <div className="absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-60">
                Tap to score
            </div>
        </button>
    )
}

function CourtVisualization({ serving, format, isWeb }) {
    const w = isWeb ? 220 : 160
    const h = isWeb ? 180 : 130
    return (
        <div
            className="relative w-full rounded-2xl p-3"
            style={{
                background: '#ffffff',
                border: `1px solid ${C.primary}15`,
            }}
        >
            <div
                className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider"
                style={{ color: C.secondary }}
            >
                Court · Serving Team {serving}
            </div>
            <svg viewBox="0 0 220 180" style={{ width: '100%', height: h }}>
                {/* court background */}
                <rect
                    x="10"
                    y="10"
                    width="200"
                    height="160"
                    rx="4"
                    fill={C.teal}
                    opacity="0.1"
                />
                {/* outer boundary */}
                <rect
                    x="10"
                    y="10"
                    width="200"
                    height="160"
                    rx="2"
                    fill="none"
                    stroke={C.primary}
                    strokeWidth="2"
                />
                {/* non-volley zone (kitchen) */}
                <rect
                    x="10"
                    y="70"
                    width="200"
                    height="40"
                    fill={C.yellow}
                    opacity="0.25"
                />
                <line
                    x1="10"
                    y1="70"
                    x2="210"
                    y2="70"
                    stroke={C.primary}
                    strokeWidth="1.5"
                />
                <line
                    x1="10"
                    y1="110"
                    x2="210"
                    y2="110"
                    stroke={C.primary}
                    strokeWidth="1.5"
                />
                {/* net */}
                <line
                    x1="10"
                    y1="90"
                    x2="210"
                    y2="90"
                    stroke={C.orange}
                    strokeWidth="2"
                    strokeDasharray="3 2"
                />
                {/* service boxes */}
                <line
                    x1="110"
                    y1="10"
                    x2="110"
                    y2="70"
                    stroke={C.primary}
                    strokeWidth="1"
                    opacity="0.5"
                />
                <line
                    x1="110"
                    y1="110"
                    x2="110"
                    y2="170"
                    stroke={C.primary}
                    strokeWidth="1"
                    opacity="0.5"
                />

                {/* team labels */}
                <text
                    x="110"
                    y="30"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill={C.primary}
                >
                    TEAM B
                </text>
                <text
                    x="110"
                    y="160"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill={C.orange}
                >
                    TEAM A
                </text>

                {/* players */}
                {format === 'doubles' ? (
                    <>
                        <circle
                            cx="60"
                            cy="40"
                            r="7"
                            fill={serving === 'B' ? C.orange : C.primary}
                        />
                        <circle
                            cx="160"
                            cy="40"
                            r="7"
                            fill={serving === 'B' ? C.orange : C.primary}
                        />
                        <circle
                            cx="60"
                            cy="140"
                            r="7"
                            fill={serving === 'A' ? C.orange : C.primary}
                        />
                        <circle
                            cx="160"
                            cy="140"
                            r="7"
                            fill={serving === 'A' ? C.orange : C.primary}
                        />
                    </>
                ) : (
                    <>
                        <circle
                            cx="110"
                            cy="40"
                            r="8"
                            fill={serving === 'B' ? C.orange : C.primary}
                        />
                        <circle
                            cx="110"
                            cy="140"
                            r="8"
                            fill={serving === 'A' ? C.orange : C.primary}
                        />
                    </>
                )}

                {/* Ball */}
                <g
                    style={{
                        transform:
                            serving === 'A'
                                ? 'translate(0, 50px)'
                                : 'translate(0, -50px)',
                        transition: 'transform 0.4s cubic-bezier(.2,.9,.3,1.3)',
                    }}
                >
                    <circle
                        cx="110"
                        cy="90"
                        r="6"
                        fill={C.yellow}
                        stroke={C.primary}
                        strokeWidth="1.5"
                    />
                </g>
            </svg>
        </div>
    )
}

function ControlButton({ onClick, icon, label, tone }) {
    const styles = {
        neutral: {
            bg: '#ffffff',
            color: C.primary,
            border: `1.5px solid ${C.primary}22`,
        },
        accent: { bg: C.teal, color: '#ffffff', border: 'none' },
    }
    const s = styles[tone]
    return (
        <button
            onClick={onClick}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-transform active:scale-95"
            style={{ background: s.bg, color: s.color, border: s.border }}
        >
            {icon}
            {label}
        </button>
    )
}

// ─────────────────────────────────────────────────────────────
// SUMMARY SCREEN
// ─────────────────────────────────────────────────────────────
function SummaryScreen({ state, setState, go, platform }) {
    const isWeb = platform === 'web'
    const { match } = state
    if (!match) {
        go('home')
        return null
    }
    const winner = match.winner
    const winTeam =
        winner === 'A'
            ? match.format === 'doubles'
                ? match.players.slice(0, 2)
                : [match.players[0]]
            : match.format === 'doubles'
              ? match.players.slice(2, 4)
              : [match.players[1]]

    const resetAndHome = () => {
        setState((s) => ({ ...s, match: null, screen: 'home', history: [] }))
    }

    return (
        <div
            className={`flex h-full flex-col ${isWeb ? 'px-12 py-10' : 'px-5 pb-6 pt-4'}`}
        >
            <TopNav
                onBack={resetAndHome}
                title="Match Complete"
                isWeb={isWeb}
            />

            <div className="flex flex-1 flex-col items-center justify-center">
                <div
                    className="relative flex h-24 w-24 items-center justify-center rounded-full slide-up"
                    style={{
                        background: `conic-gradient(from 0deg, ${C.yellow}, ${C.orange}, ${C.yellow})`,
                    }}
                >
                    <div
                        className="flex h-20 w-20 items-center justify-center rounded-full"
                        style={{ background: C.primary }}
                    >
                        <Trophy
                            className="h-10 w-10"
                            style={{ color: C.yellow }}
                        />
                    </div>
                </div>

                <div
                    className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.3em] slide-up"
                    style={{ color: C.secondary }}
                >
                    Winners
                </div>
                <div
                    className={`mt-1 text-center font-bold slide-up ${isWeb ? 'text-5xl' : 'text-3xl'}`}
                    style={{
                        color: C.primary,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        letterSpacing: '-0.02em',
                    }}
                >
                    {winTeam.map((p) => p.name).join(' & ')}
                </div>

                <div
                    className={`mt-6 flex items-baseline gap-4 slide-up ${isWeb ? 'text-6xl' : 'text-5xl'} font-bold`}
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        letterSpacing: '-0.04em',
                    }}
                >
                    <span
                        style={{
                            color: winner === 'A' ? C.primary : C.neutral,
                        }}
                    >
                        {match.score.A}
                    </span>
                    <span className="text-xl" style={{ color: C.neutral }}>
                        –
                    </span>
                    <span
                        style={{ color: winner === 'B' ? C.orange : C.neutral }}
                    >
                        {match.score.B}
                    </span>
                </div>

                <div
                    className={`mt-8 grid ${isWeb ? 'grid-cols-4 gap-3' : 'grid-cols-2 gap-2'} w-full`}
                >
                    <SummaryStat label="Duration" value="12:34" />
                    <SummaryStat
                        label="Total points"
                        value={match.score.A + match.score.B}
                    />
                    <SummaryStat label="Longest rally" value="14" />
                    <SummaryStat label="Side-outs" value="7" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={resetAndHome}
                    className="rounded-2xl py-4 text-sm font-bold transition-transform active:scale-[0.98]"
                    style={{
                        background: '#ffffff',
                        color: C.primary,
                        border: `1.5px solid ${C.primary}22`,
                    }}
                >
                    Home
                </button>
                <button
                    onClick={() => {
                        setState((s) => ({ ...s, match: null }))
                        go('create')
                    }}
                    className="rounded-2xl py-4 text-sm font-bold transition-transform active:scale-[0.98]"
                    style={{ background: C.primary, color: C.yellow }}
                >
                    Rematch
                </button>
            </div>
        </div>
    )
}

function SummaryStat({ label, value }) {
    return (
        <div
            className="rounded-xl p-3 text-center"
            style={{
                background: '#ffffff',
                border: `1px solid ${C.primary}15`,
            }}
        >
            <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: C.secondary }}
            >
                {label}
            </div>
            <div
                className="mt-0.5 text-xl font-bold"
                style={{
                    color: C.primary,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
            >
                {value}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Shared nav
// ─────────────────────────────────────────────────────────────
function TopNav({ onBack, title, isWeb }) {
    return (
        <div className="flex items-center justify-between">
            <button
                onClick={onBack}
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                    background: '#ffffff',
                    color: C.primary,
                    border: `1px solid ${C.primary}15`,
                }}
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <div
                className={`${isWeb ? 'text-lg' : 'text-base'} font-bold`}
                style={{
                    color: C.primary,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
            >
                {title}
            </div>
            <div className="h-9 w-9" />
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function generateCode() {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    const digits = '23456789'
    return (
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)] +
        digits[Math.floor(Math.random() * digits.length)] +
        digits[Math.floor(Math.random() * digits.length)] +
        digits[Math.floor(Math.random() * digits.length)]
    )
}

function makeDemoMatch(code, opts = {}) {
    const format = opts.format || 'doubles'
    const isDoubles = format === 'doubles'
    return {
        id: 'm_' + Math.random().toString(36).slice(2, 9),
        code,
        format,
        targetScore: opts.targetScore || 11,
        winBy: opts.winBy || 2,
        serveFormat: opts.serveFormat || 'traditional',
        status: 'lobby',
        score: { A: 0, B: 0 },
        serving: 'A',
        winner: null,
        startedAt: null,
        players: isDoubles
            ? [
                  { name: 'Alex', joined: true },
                  { name: '', joined: false },
                  { name: '', joined: false },
                  { name: '', joined: false },
              ]
            : [
                  { name: 'Alex', joined: true },
                  { name: '', joined: false },
              ],
    }
}
