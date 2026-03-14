import type { UserProfile } from '../../types/user'

export interface ProfileViewProps {
    profile: UserProfile
    onEdit: () => void
}
