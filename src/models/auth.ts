import { object, string, z } from "zod"

export const loginModel = object({
    username: string().nonempty(),
    password: string().nonempty(),
})
  
export type LoginModel = z.infer<typeof loginModel>
  
export const initLoginForm = {
    username: '',
    password: '',
}