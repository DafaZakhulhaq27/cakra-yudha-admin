import { LoginData } from "@/api/auth/model"
import { fetcher } from "@/utils/fetcher"

type Login = {
    username : string,
    password : string
}

export const login = async ({username,password} : Login) => 
  fetcher<LoginData>('/auth/login', {
    method: 'POST',
    body: { username, password },
})
  
  