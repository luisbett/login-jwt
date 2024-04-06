import { KeyboardEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { SiJsonwebtokens } from "react-icons/si"
import Button from "../components/Button"
import Input from "../components/Input"
import classes from './SignIn.module.css'
import useEmail from "../hooks/useEmail"
import useFetch from "../hooks/useFetch"
import useToken from "../hooks/useToken"

export default function SignIn() {

    //Navigation hook
    const navigate = useNavigate()

    //State that controls loading spinner
    const [ isLoading, setIsLoading ] = useState(false)

    //States to control input fields
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    //Get user data from server
    const verifyLogin = async () => {

        //Get token from localStorage
        const token = localStorage.getItem('token')

        //If token exists and it is a valid token
        if(token && await useToken(token)) {
            navigate('/home')
            window.location.reload()
        }
    }

    //Set effect to verifyLogin function
    useEffect(() => {
        verifyLogin()
    },[])

    //Function called when enter button is pressed
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if( e.key === 'Enter') {
            handleClick()
        }
    }

    //Function called on sign in button
    const handleClick = async () => {

        //Set loading spinner to true
        setIsLoading(true)

        //Validate input fields
        if(validateFields()) {

            const data = await useFetch({ url: 'http://localhost:3333/auth/user', 
                                        method: 'POST', 
                                        body: {
                                            email,
                                            password
                                        },
                                        token: '' })

            if(data.ok) {
                //Save token and navigate to home page
                console.log(data)
                localStorage.setItem('token',data.data.token)
                navigate('/home')
                window.location.reload()
            } else {
                console.log(data)
                toast.error(data.data.message)
            }
        }

        //Set loading spinner to false
        setIsLoading(false)
    }

    //Validate input fields
    const validateFields = () => {
        
        //Custom hook to validate email
        let emailError = useEmail(email, true)

        if (emailError) {
            toast.error(emailError)
        } else if(!password) {
            toast.error('Password is required')
        } else {
            return true
        }
    }

    return(
        <div className={classes.container}>
            <div className={classes.title}>
                <SiJsonwebtokens fill="#D63AFF" size="35px" />
                <h1>Login with JWT</h1>
            </div>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {setEmail(e.target.value)}} inputOnKeyDown={handleKeyDown} />
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={(e) => {setPassword(e.target.value)}} inputOnKeyDown={handleKeyDown} />
            <Button buttonStyle="pink" buttonTitle="Sign in" buttonOnClick={handleClick} isLoading={isLoading} />
            <p>Are you new here? <Link to={'/signup'}>Register now</Link></p>
        </div>
    )
}