export const StatCard = ({ label, value, tone, icon, isWeb = true }: any) => {
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
