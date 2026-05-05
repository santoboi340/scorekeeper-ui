import { StatsRow } from './StatsRow/StatsRow'
import { CreateGameButtons } from './CreateGameButtons/CreateGameButtons'
import { RecentMatches } from './RecentMatches/RecentMatches'
import { StepComponentProps } from 'root/core/SimpleOrchestrator/SimpleOrchestrator.types'

const LiveLandingPage = ({ GoNext, GoBack, GoTo }: any) => {
    return (
        <>
            <>
                <StatsRow />
                <CreateGameButtons
                    GoNext={GoNext}
                    GoBack={GoBack}
                    GoTo={GoTo}
                />
                <RecentMatches />
            </>
        </>
    )
}

export { LiveLandingPage }
