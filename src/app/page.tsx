'use client'
import Link from 'next/link'
import { FaUsers, FaTrophy, FaCalendarAlt, FaChartLine } from 'react-icons/fa'
import PickleballApp from '../components/PickleballApp'
import { useAuth } from '../context/AuthContext'
import { LiveLandingPage } from 'root/components/LiveLandingPage/LiveLandingPage'
import { LiveCreateGamePage } from 'root/components/LiveCreateGamePage/LiveCreateGamePage'
import { SimpleOrchestrator } from 'root/core/SimpleOrchestrator/SimpleOrchestrator'
import { Step } from 'root/core/SimpleOrchestrator/SimpleOrchestrator.types'
const Home = () => {
    const { user, isAuthenticated } = useAuth()

    const steps: Step[] = [
        {
            onEntry: () => console.log('Entered Step 0'),
            onExit: () => console.log('Exited step 0'),
            component: ({ GoNext, GoBack, GoTo }) => (
                <LiveLandingPage GoNext={GoNext} GoBack={GoBack} GoTo={GoTo} />
            ),
        },
        {
            onEntry: () => console.log('Entered Step 0'),
            onExit: () => console.log('Exited step 0'),
            component: ({ GoNext, GoBack, GoTo }) => <LiveCreateGamePage />,
        },
    ]
    return (
        <div className="min-h-screen flex flex-col bg-cream">
            {isAuthenticated ? (
                <SimpleOrchestrator steps={steps} tracker={true} />
            ) : (
                <>
                    {/* Hero Section */}
                    <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold text-primary-green mb-4 md:mb-6">
                                Your Sports,{' '}
                                <span className="text-teal">
                                    Your Community
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-secondary-green mb-8 md:mb-10 max-w-2xl mx-auto">
                                Connect with fellow athletes, track your games,
                                and build lasting friendships through the sports
                                you love.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/register"
                                    className="w-full sm:w-auto bg-pickleball-yellow text-primary-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold transition-colors shadow-lg"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href="#features"
                                    className="w-full sm:w-auto bg-white text-teal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cream transition-colors border-2 border-teal"
                                >
                                    Learn More
                                </Link>
                            </div>

                            {/* Social Proof */}
                            <p className="mt-8 text-sm text-neutral">
                                Join 10,000+ athletes already playing together
                            </p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section
                        id="features"
                        className="py-16 md:py-24 bg-white px-4"
                    >
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12 md:mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4">
                                    Everything You Need to Play
                                </h2>
                                <p className="text-lg text-secondary-green max-w-2xl mx-auto">
                                    Organize games, track scores, and connect
                                    with your sports community all in one place.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {/* Feature 1 */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="bg-teal/20 p-4 rounded-full mb-4">
                                        <FaUsers className="text-4xl text-teal" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-green mb-2">
                                        Find Your Team
                                    </h3>
                                    <p className="text-secondary-green">
                                        Connect with players in your area and
                                        form teams for your favorite sports.
                                        Build a community around what you love.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="bg-gold/20 p-4 rounded-full mb-4">
                                        <FaTrophy className="text-4xl text-gold" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-green mb-2">
                                        Track Scores & Stats
                                    </h3>
                                    <p className="text-secondary-green">
                                        Keep detailed records of all your games,
                                        track individual and team stats, and
                                        celebrate your victories.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="bg-burnt-orange/20 p-4 rounded-full mb-4">
                                        <FaCalendarAlt className="text-4xl text-burnt-orange" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-green mb-2">
                                        Schedule Games
                                    </h3>
                                    <p className="text-secondary-green">
                                        Organize matches with ease. Send
                                        invites, manage RSVPs, and never miss a
                                        game with calendar integration.
                                    </p>
                                </div>

                                {/* Feature 4 */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="bg-pickleball-yellow/20 p-4 rounded-full mb-4">
                                        <FaChartLine className="text-4xl text-primary-green" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-green mb-2">
                                        View Progress
                                    </h3>
                                    <p className="text-secondary-green">
                                        Visualize your improvement over time
                                        with detailed analytics and insights
                                        into your performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 md:py-24 bg-primary-green px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-lg md:text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
                                Join thousands of athletes who are already
                                connecting, competing, and having fun together.
                            </p>
                            <Link
                                href="/register"
                                className="inline-block bg-pickleball-yellow text-primary-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold transition-colors shadow-lg"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </section>
                </>
            )}
            {/* ========================================================================= */}
            <PickleballApp />
        </div>
    )
}

export default Home
