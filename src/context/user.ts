import { UserProfileToken } from '@/app/(auth)/login/Models'
import { createContext } from 'react'

interface UserContextInterface {
  currentUser: UserProfileToken | null
}

export const UserContext = createContext<UserContextInterface>({
  currentUser: null,
})
