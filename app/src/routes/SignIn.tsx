import { KeyboardEvent, useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import toast, { Toaster } from 'react-hot-toast'

import { SiJsonwebtokens } from "react-icons/si"

import Button from "../components/Button"
import Input from "../components/Input"

import classes from './SignIn.module.css'

export default function SignIn() {

    const navigate = useNavigate()
    
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

    const handleClick = async () => {
        await fetch('http://localhost:3333/auth/user', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || 'Server error') // Throw error with server message if available, otherwise default message
            }
            return res.json()
        })
        .then((data) => {
            //Save token and navigate to home page
            console.log(data)
            localStorage.setItem('token',data.token)
            navigate('/home')
            window.location.reload()
        })
        .catch((err) => {
            //Show errors to user
            console.error(err)
            toast.error(err.message || 'Error on login, please try again later')
        })
    }

    return(
        <div className={classes.container}>
            <Toaster />
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