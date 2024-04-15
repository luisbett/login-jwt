import { isExpired } from "react-jwt"
import useFetch from "./useFetch"

export default async function useToken(token: string) {

    //Control variable
    let refreshToken = false

    //Check if token was sent
    if(!token || isExpired(token)) {

        //Set refresh token
        refreshToken = true

    }

    //Refresh token
    if(refreshToken) {

        //Call API
        const newData = await useFetch({ url: 'https://login-jwt.onrender.com/auth/refresh', 
                                        method: 'GET',
                                        token: '' })

        if(newData.ok) {
            token = newData.data.token
        }
    }

    //If a token is set
    if(token) {

        //Call API
        const data = await useFetch({ url: `https://login-jwt.onrender.com/auth/token`, 
                                    method: 'POST',
                                    token })

        if(data.ok) {
            return token
        }
    }

    return ''
}