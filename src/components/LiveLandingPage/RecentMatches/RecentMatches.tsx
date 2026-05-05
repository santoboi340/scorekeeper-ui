import { RecentMatchRow } from './RecentMatchRow'
const RecentMatches = () => {
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
        <>
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
                    />
                    <RecentMatchRow
                        result="W"
                        score="11–9"
                        opp="vs. Morgan"
                        when="2 days ago"
                    />
                    <RecentMatchRow
                        result="L"
                        score="8–11"
                        opp="vs. Casey & Pat"
                        when="Last week"
                    />
                </div>
            </div>
        </>
    )
}
export { RecentMatches }
