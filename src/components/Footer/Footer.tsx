import Link from 'next/link'

const sections = [
    { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Updates'] },
    {
        title: 'Resources',
        links: ['Documentation', 'Guides', 'Support', 'API'],
    },
    {
        title: 'Legal',
        links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    },
]

const toHref = (label: string) => `#${label.toLowerCase().replace(/\s+/g, '-')}`

const linkStyle = 'text-cream/80 hover:text-pickleball-yellow transition-colors'

const Footer = () => (
    <footer className="text-cream mt-auto bg-primary-green">
        <div className="max-w-7xl w-full mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                {sections.map(({ title, links }) => (
                    <div key={title}>
                        <h4 className="text-lg font-semibold mb-4 text-pickleball-yellow">
                            {title}
                        </h4>
                        <ul className="space-y-2">
                            {links.map((label) => (
                                <li key={label}>
                                    <Link
                                        href={toHref(label)}
                                        className={linkStyle}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div className="border-t border-secondary-green pt-10 text-center">
            <p className="text-cream/80">
                &copy; 2025 YourBrand. All rights reserved.
            </p>
        </div>
    </footer>
)

export default Footer
