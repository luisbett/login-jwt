import { isExpired } from "react-jwt"
import useFetch from "./useFetch"

export default async function useToken(token: string) {

    //Check if token is expired - ???
    if(isExpired(token)) {
        return false
    }

    //Call API
    const data = await useFetch({ url: `http://localhost:3333/auth/token`, 
                                method: 'POST',
                                token })

    if(!data.ok) {
        localStorage.removeItem('token')
    }

    return data.ok
}