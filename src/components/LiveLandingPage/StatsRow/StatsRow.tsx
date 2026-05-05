import { StatCard } from './StatCard'
const StatsRow = () => (
    <div className={`mt-6 grid ${'grid-cols-4 gap-4'}`}>
        <StatCard label="Win rate" value="73%" tone="primary" />
        <StatCard label="Streak" value="W4" tone="orange" />
        <StatCard label="Matches" value="24" tone="teal" />
        {<StatCard label="Rating" value="4.2" tone="gold" />}
    </div>
)

export { StatsRow }
