import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  children: string | ReactNode
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

const Button = ({ children, className, ...props }: Props) => {
  return (
    <div>
      <button
        className={`flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 items-center gap-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
