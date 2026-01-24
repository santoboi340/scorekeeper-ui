const Footer = () => {
    return (
        <footer className="text-cream mt-auto bg-primary-green">
            <div className="max-w-7xl w-full mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-pickleball-yellow">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#about"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#careers"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#press"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Press
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#blog"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-pickleball-yellow">
                            Product
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#features"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#security"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Security
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#updates"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Updates
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-pickleball-yellow">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#docs"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#guides"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#support"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#api"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-pickleball-yellow">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#privacy"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#terms"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#cookies"
                                    className="text-cream/80 hover:text-pickleball-yellow transition-colors"
                                >
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-secondary-green pt-10 text-center">
                <p className="text-cream/80">
                    &copy; 2025 YourBrand. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
