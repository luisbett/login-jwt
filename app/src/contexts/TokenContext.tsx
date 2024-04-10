import { createContext, useContext, useState } from "react"

type TokenContextProps = {
    children: React.ReactNode
}

type ContextProps = {
    token: string | null;
    setToken: (token: string) => void;
}

export const TokenContext = createContext<ContextProps>({
    token: null,
    setToken: () => null
})

export const TokenProvider = ({children}: TokenContextProps) => {

    const [ token, setToken ] = useState<string | null>('')

    return(
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}

export const useTokenContext = () => {

    const token = useContext(TokenContext)

    if(!token) {
        throw new Error('TokenContext must be used within TokenProvider');
    }

    return token
}