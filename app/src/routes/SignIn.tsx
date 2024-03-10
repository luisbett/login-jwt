import { KeyboardEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { SiJsonwebtokens } from "react-icons/si"
import Button from "../components/Button"
import Input from "../components/Input"
import classes from './SignIn.module.css'
import { UserProps } from "../types/user"
import useEmail from "../hooks/useEmail"

export default function SignIn() {

    const navigate = useNavigate()

    const [ isLoading, setIsLoading ] = useState(false)

    //Define state to contain user information
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    })

    //Generic function
    const handleChange = <U extends keyof UserProps>(prop: U, value: UserProps[U]) => {
        setUser({ ...user, [prop]: value})
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if( e.key === 'Enter') {
            //Validate input fields
            if(validateFields()) {
                handleClick()
            }
        }
    }

    const handleClick = async () => {

        setIsLoading(true)

        //Validate input fields
        if(validateFields()) {

            await fetch('http://localhost:3333/auth/user', {
                method: 'POST',
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
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

        setIsLoading(false)
    }

    //Validate input fields
    const validateFields = () => {
        
        //Custom hook to validate email
        let emailError = useEmail(user.email, true)

        if (emailError) {
            toast.error(emailError)
        } else if(!user.password) {
            toast.error('Password is required')
        } else {
            return true
        }
    }

    return(
        <div className={classes.container}>
            <Toaster />
            <div className={classes.title}>
                <SiJsonwebtokens fill="#D63AFF" size="35px" />
                <h1>Login with JWT</h1>
            </div>
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {handleChange('email',e.target.value)}} />
            <Input inputType="password" inputPlaceholder="Enter your password..." inputOnChange={(e) => {handleChange('password',e.target.value)}} inputOnKeyDown={handleKeyDown} />
            <Button buttonStyle="pink" buttonTitle="Sign in" buttonOnClick={handleClick} isLoading={isLoading} />
            <p>Are you new here? <Link to={'/signup'}>Register now</Link></p>
        </div>
    )
}