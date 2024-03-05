import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'

import { FaUserPlus } from 'react-icons/fa'

import Button from '../components/Button'
import Input from '../components/Input'

import classes from './SignUp.module.css'

export default function SignUp() {

    const navigate = useNavigate()

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

    const handleClick = async () => {
        if (validateFields()) {
            await fetch('http://localhost:3333/users', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(() => {
                toast.success('User registered succesfully')
                setTimeout(() => {
                    navigate('/')
                }, 2000)  
            })
            .catch((err) => {
                toast.error('Error on saving user')
                console.log(err)
            })
        }
    }

    const validateFields = () => {
        if(!name) {
            toast.error('Name is required')
        } else if(!email) {
            toast.error('Email is required')
        } else if(!password) {
            toast.error('Password is required')
        } else if(!confirmPassword) {
            toast.error('Confirm password is required')
        } else if(password !== confirmPassword) {
            toast.error('Passwords does not match')
        } else {
            return true
        }
    }

    return(
        <div className={classes.container}>
            <Toaster />
            <div className={classes.title}>
                <FaUserPlus fill="#D63AFF" size="35px" />
                <h1>Create an account</h1>
            </div>
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={handleChangeName}/>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={handleChangeEmail}/>
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={handleChangePassword}/>
            <Input inputType="password" inputPlaceholder="Confirm your password..." inputOnChange={handleChangeConfirmPassword}/>
            <Button buttonStyle="pink" buttonTitle="Sign up" buttonOnClick={handleClick}/>
            <p>Already have an account? <Link to={'/'}>Sign in here</Link></p>
        </div>
    )
}