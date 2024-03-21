import { createContext, useContext, useState } from "react"

type UserContextProps = {
    children: React.ReactNode
}

type User = {
    firstName: string,
    fullName: string,
    email: string
}

type ContextProps = {
    user: User | null;
    setUser: (user: User) => void;
}

export const UserContext = createContext<ContextProps>({
    user: null,
    setUser: () => null
})

export const UserProvider = ({children}: UserContextProps) => {

    const [ user, setUser ] = useState<User | null>({
        firstName: '',
        fullName: '',
        email: ''
    })

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {

    const user = useContext(UserContext)

    if(!user) {
        throw new Error('UserContext must be used within UserProvider');
    }

    return user
}