'use client'
import { MobileMenu } from '../../MobileMenu/MobileMenu'
import { Logo } from '../../Logo'

const MobileView = () => {
    return (
        <nav className={`${styles.position} ${styles.borders}`}>
            <div className={`${styles.contentAlignment}`}>
                <div className={`${styles.brandFont}`}>
                    <Logo href="/" imageUrl="/Logos/Scorepal1.png" />
                </div>
                <MobileMenu />
            </div>
        </nav>
    )
}

export { MobileView }

const styles = {
    position: 'relative top-0 z-50 sticky bg-white',
    contentAlignment: 'flex justify-between items-center px-3 pt-3 pb-6',
    borders: '',
    brandFont: 'w-full',
}
