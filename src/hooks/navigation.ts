import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
  
  export function useQueryNavigation() {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()
  
    const appendQuery = (
      query: Record<string, string>,
      removes: string[] = [],
    ) => {
      const params = new URLSearchParams(currentParams?.toString())
  
      removes.forEach(key => {
        params.delete(key)
      })
  
      Object.keys(query).forEach(key => {
        params.set(key, query[key])
      })
  
      router.push(`${pathName}?${params.toString()}`)
      router.refresh()
    }
  
    return { currentParams, appendQuery }
  }
  