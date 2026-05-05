const RecentMatchRow = ({ result, score, opp, when, isWeb = true }: any) => {
    const win = result === 'W'
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

export { RecentMatchRow }
