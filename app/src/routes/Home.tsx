import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { FaUserCheck, FaUserEdit } from "react-icons/fa"
import { isExpired, decodeToken } from "react-jwt"
import { useUserContext } from "../contexts/UserContext"
import Input from "../components/Input"
import Button from "../components/Button"
import { decodedTokenProps } from "../types/decodedToken"
import classes from './Home.module.css'
import useEmail from "../hooks/useEmail"
import useFetch from "../hooks/useFetch"
import useToken from "../hooks/useToken"

export default function Home() {

    //Navigation hook
    const navigate = useNavigate()

    //State to control if show inputs for editing fields
    const [ update, setUpdate ] = useState(false)

    //States to control loading spinner buttons
    const [ isLoadingSave, setIsLoadingSave ] = useState(false)
    const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)

    //Context used to fetch user data
    const { user, setUser } = useUserContext()

    //States to control input fields
    const [ fullName, setFullName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    //Get user data from server
    const getUser = async () => {

        //Get token from localStorage
        const token = localStorage.getItem('token')

        //If token exists and it is a valid token
        if(token && await useToken(token)) {

            //Decode token
            const decodedToken = decodeToken<decodedTokenProps>(token)
            
            //Get user id from token
            const userId = decodedToken?.id

            //Call API
            const data = await useFetch({ url: `http://localhost:3333/users/${userId}`, 
                                        method: 'GET',
                                        token: token })

            if(data.ok) {
                console.log(data.data[0])
                setUser({
                    firstName: data.data[0].name.split(" ")[0],
                    fullName: data.data[0].name,
                    email: data.data[0].email
                })
            } else {
                toast.error(data.data.message)
                console.log(data)
            }

        } else {
            navigate('/')
            window.location.reload()
        }
    }

    //Set effect to getUser function
    useEffect(() => {
        getUser()
    },[])

    //Function called on save button click
    const handleSave = async () => {
        
        //Set loading spinner to true
        setIsLoadingSave(true)

        //Validate input fields
        if(validateFields()) {
            
            //Get token from localStorage
            const token = localStorage.getItem('token')

            //If token exists and it is a valid token
            if(token && await useToken(token)) {

                //Decode token
                const decodedToken = decodeToken<decodedTokenProps>(token)
                
                //Get user id from token
                const userId = decodedToken?.id

                //Call API
                const data = await useFetch({ url: `http://localhost:3333/users/${userId}`, 
                                            method: 'PUT',
                                            body: {
                                                name: fullName,
                                                email: email,
                                                password: password
                                            },
                                            token: token })

                if(data.ok) {
                    console.log(data)
                    toast.success('Data updated successfully')
                    setUpdate(false)
                } else {
                    console.log(data)
                    toast.error(data.data.message)
                }

            } else {
                navigate('/')
                window.location.reload()
            }
        }

        //Set loading spinner to false
        setIsLoadingSave(false)
    }

    //Handle delete button click
    const handleDelete = async () => {

        //Set loading spinner to true
        setIsLoadingDelete(true)
        
        //Get token from localstorage
        const token = localStorage.getItem('token')

        //If token exists and it is a valid token
        if(token && await useToken(token)) {

            //Decode token
            const decodedToken = decodeToken<decodedTokenProps>(token)
            
            //Get user id from token
            const userId = decodedToken?.id

            //Call API
            const data = await useFetch({ url: `http://localhost:3333/users/${userId}`, 
                                        method: 'DELETE',
                                        token: token })

            if(data.ok) {
                console.log(data)
                toast.success('Account deleted successfully')
                setUser({
                    firstName: '',
                    fullName: '',
                    email: ''
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 2000)
            } else {
                console.log(data)
                toast.error(data.data.message)
            }

        } else {
            navigate('/')
            window.location.reload()
        }

        //Set loading spinner to false
        setIsLoadingDelete(false)
    }

    //Handle logout button click
    const handleLogout = () => {
        setUser({
            firstName: '',
            fullName: '',
            email: ''
        })
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }

    //Validate input fields
    const validateFields = () => {
        
        //Custom hook to validate email
        let emailError = useEmail(email, true)

        if(!fullName) {
            toast.error('Name is required')
        } else if (emailError) {
            toast.error(emailError)
        } else if(password && !confirmPassword) {
            toast.error('Both password fields are required')
        } else if(!password && confirmPassword) {
            toast.error('Both password fields are required')
        } else if(password !== confirmPassword) {
            toast.error('Passwords does not match')
        } else {
            return true
        }
    }

    return(
        <div className={classes.container}>
            <Toaster />
            { update ? 
            <div className={classes.title}>
                <FaUserEdit fill="#D63AFF" size="35px" />
                <h1>Update your details</h1>
            </div> :
            <div className={classes.title}>
                <FaUserCheck fill="#D63AFF" size="35px" />
                <h1>Welcome, {user?.firstName}</h1>
            </div> }
            { update ? 
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={(e) => {setFullName(e.target.value)}} inputDefaultValue={user?.fullName} /> : 
            <p>Name: {user?.fullName}</p> }
            { update ? 
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {setEmail(e.target.value)}} inputDefaultValue={user?.email} /> :
            <p>Email: {user?.email}</p> }
            { update && <Input inputType="password" inputPlaceholder="Enter your new password..." inputOnChange={(e) => {setPassword(e.target.value)}} /> }
            { update && <Input inputType="password" inputPlaceholder="Confirm your new password..." inputOnChange={(e) => {setConfirmPassword(e.target.value)}} /> }
            { update ?
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Save" buttonOnClick={handleSave} isLoading={isLoadingSave} />
                <Button buttonStyle="red" buttonTitle="Delete account" buttonOnClick={handleDelete} isLoading={isLoadingDelete} />
            </div> :
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Update details" buttonOnClick={() => {setUpdate(true)}}/>
                <Button buttonStyle="red" buttonTitle="Log out" buttonOnClick={handleLogout}/>
            </div> }
        </div>
    )
}