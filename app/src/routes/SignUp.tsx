import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FaUserPlus } from 'react-icons/fa'
import Button from '../components/Button'
import Input from '../components/Input'
import classes from './SignUp.module.css'
import useFetch from '../hooks/useFetch'
import { UserProps } from '../types/user'

export default function SignUp() {

    const navigate = useNavigate()

    //Define state to contain user information
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    //Generic function
    const handleChange = <U extends keyof UserProps>(prop: U, value: UserProps[U]) => {
        setUser({ ...user, [prop]: value})
    }

    const handleClick = async () => {
        if (validateFields()) {
            const data = await useFetch({ url: 'http://localhost:3333/users', 
                                        method: 'POST', 
                                        body: { 
                                            name: user.name,
                                            email: user.email,
                                            password: user.password
                                        },
                                        token: '' })

            if(data.ok) {
                toast.success('User registered succesfully')
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            } else {
                toast.error('Error on saving user')
                console.log(data)
            }
        }
    }

    const validateFields = () => {
        if(!user.name) {
            toast.error('Name is required')
        } else if(!user.email) {
            toast.error('Email is required')
        } else if(!user.password) {
            toast.error('Password is required')
        } else if(!user.confirmPassword) {
            toast.error('Confirm password is required')
        } else if(user.password !== user.confirmPassword) {
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
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={(e) => {handleChange('name',e.target.value)}}/>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {handleChange('email',e.target.value)}}/>
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={(e) => {handleChange('password',e.target.value)}}/>
            <Input inputType="password" inputPlaceholder="Confirm your password..." inputOnChange={(e) => {handleChange('confirmPassword',e.target.value)}}/>
            <Button buttonStyle="pink" buttonTitle="Sign up" buttonOnClick={handleClick}/>
            <p>Already have an account? <Link to={'/'}>Sign in here</Link></p>
        </div>
    )
}