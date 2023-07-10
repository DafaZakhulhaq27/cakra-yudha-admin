import LoadingMain from '@/components/loading'
import React, { ReactNode, useState } from 'react'

type LoadingOverlayProps = {
  children: ReactNode
}

type UseLoadingResult = {
  setLoading: (value: boolean) => void
  LoadingOverlay: React.FC<LoadingOverlayProps>
}

function useLoading(): UseLoadingResult {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (value: boolean): void => {
    setIsLoading(value)
  }

  const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ children }) => {
    return (
      <>
        {children}
        {isLoading && (
          <div className="flex items-center justify-center  fixed top-0 left-0  bg-gray-200 bg-opacity-50 z-50 h-screen w-screen">
            <LoadingMain />
          </div>
        )}
      </>
    )
  }

  return { setLoading, LoadingOverlay }
}

export default useLoading
