import { UserContext } from '@/context/user'
import { useContext } from 'react'

export const useUserContext = () => useContext(UserContext)
