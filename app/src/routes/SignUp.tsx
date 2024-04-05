import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaUserPlus } from 'react-icons/fa'
import Button from '../components/Button'
import Input from '../components/Input'
import classes from './SignUp.module.css'
import useFetch from '../hooks/useFetch'
import useEmail from '../hooks/useEmail'

export default function SignUp() {

    //Navigation hook
    const navigate = useNavigate()

    //State that controls loading spinner
    const [ isLoading, setIsLoading ] = useState(false)

    //States to control input fields
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    //Function called on sign up button
    const handleClick = async () => {

        //Set loading spinner to true
        setIsLoading(true)

        //Validate input fields
        if (validateFields()) {

            //Call API
            const data = await useFetch({ url: 'http://localhost:3333/users', 
                                        method: 'POST', 
                                        body: { 
                                            name,
                                            email,
                                            password
                                        },
                                        token: '' })

            if(data.ok) {
                toast.success('User registered succesfully')
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            } else {
                toast.error(data.data.message)
                console.log(data)
            }
        }

        //Set loading spinner to false
        setIsLoading(false)
    }

    //Validate input fields
    const validateFields = () => {

        //Custom hook to validate email
        let emailError = useEmail(email, true)

        if(!name) {
            toast.error('Name is required')
        } else if(emailError) {
            toast.error(emailError)
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
            <div className={classes.title}>
                <FaUserPlus fill="#D63AFF" size="35px" />
                <h1>Create an account</h1>
            </div>
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={(e) => {setName(e.target.value)}}/>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {setEmail(e.target.value)}}/>
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={(e) => {setPassword(e.target.value)}}/>
            <Input inputType="password" inputPlaceholder="Confirm your password..." inputOnChange={(e) => {setConfirmPassword(e.target.value)}}/>
            <Button buttonStyle="pink" buttonTitle="Sign up" buttonOnClick={handleClick} isLoading={isLoading} />
            <p>Already have an account? <Link to={'/'}>Sign in here</Link></p>
        </div>
    )
}