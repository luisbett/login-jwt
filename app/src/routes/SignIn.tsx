import { KeyboardEvent, useState } from "react"

import { Link } from "react-router-dom"

import { SiJsonwebtokens } from "react-icons/si"

import Button from "../components/Button"
import Input from "../components/Input"

import classes from './SignIn.module.css'

export default function SignIn() {
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if( e.key === 'Enter') {
            handleClick()
        }
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
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={handleChangeEmail} />
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={handleChangePassword} inputOnKeyDown={handleKeyDown} />
            <Button buttonStyle="pink" buttonTitle="Sign in" buttonOnClick={handleClick} />
            <p>Are you new here? <Link to={'/signup'}>Register now</Link></p>
        </div>
    )
}