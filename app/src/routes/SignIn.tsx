import { SiJsonwebtokens } from "react-icons/si"
import Button from "../components/Button"

import classes from './SignIn.module.css'
import Input from "../components/Input"
import { useState } from "react"

export default function SignIn() {
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleClick = () => {
        console.log('Button clicked')
    }

    return(
        <div className={classes.container}>
            <div className={classes.title}>
                <SiJsonwebtokens fill="#D63AFF" size="35px" />
                <h1>Login with JWT</h1>
            </div>
            <Input inputType="text" inputPlaceholder="Enter your email..." inputOnChange={handleChangeEmail}/>
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={handleChangePassword}/>
            <Button buttonStyle="pink" buttonTitle="Sign in" buttonClick={handleClick}/>
        </div>
    )
}