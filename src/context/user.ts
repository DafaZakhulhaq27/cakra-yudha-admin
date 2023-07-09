import { UserProfile } from '@/app/(auth)/login/Models'
import { createContext } from 'react'

interface UserContextInterface {
  currentUser: UserProfile | null
}

export const UserContext = createContext<UserContextInterface>({
  currentUser: null,
})
