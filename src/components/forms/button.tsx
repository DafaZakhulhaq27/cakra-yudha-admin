import { ButtonHTMLAttributes } from 'react'

type Props = {
  text: string
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

const Button = ({ text, className, ...props }: Props) => {
  return (
    <div>
      <button
        className={`flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
        {...props}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
