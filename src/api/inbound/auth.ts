import { fetcher } from "@/utils/fetcher"

type Login = {
    username : string,
    password : string
}

export const login = ({username,password} : Login) => 
 fetcher('/auth/login', {
        method: 'POST',
        body: { username, password },
    })
  
  