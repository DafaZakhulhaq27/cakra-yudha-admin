import { object, string, z } from "zod"

export const loginModel = object({
    email: string().email().nonempty(),
    password: string().nonempty(),
})
  
export type LoginModel = z.infer<typeof loginModel>
  
export const initLoginForm = {
    email: '',
    password: '',
}