import { useState } from 'react'

import { FaUserPlus } from 'react-icons/fa'

import Button from '../components/Button'
import Input from '../components/Input'

import classes from './SignUp.module.css'

export default function SignUp() {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleClick = () => {
        
    }

    return(
        <div className={classes.container}>
            <div className={classes.title}>
                <FaUserPlus fill="#D63AFF" size="35px" />
                <h1>Create an account</h1>
            </div>
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={handleChangeName}/>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={handleChangeEmail}/>
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={handleChangePassword}/>
            <Input inputType="password" inputPlaceholder="Confirm your password..." inputOnChange={handleChangeConfirmPassword}/>
            <Button buttonStyle="pink" buttonTitle="Sign up" buttonOnClick={handleClick}/>
        </div>
    )
}