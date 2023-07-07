import { Button, ButtonProps } from 'flowbite-react'
import { ReactNode } from 'react'

type Props = {
  children: string | ReactNode
  className?: string
} & Omit<ButtonProps, 'className'>

const ButtonMain = ({ children, className, ...props }: Props) => {
  return (
    <div>
      <Button
        className={`flex w-full justify-center rounded-md bg-primary text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 items-center gap-2 ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}

export default ButtonMain
