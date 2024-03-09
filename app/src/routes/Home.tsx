import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { FaUserCheck, FaUserEdit } from "react-icons/fa"
import { jwtDecode } from "jwt-decode"
import Input from "../components/Input"
import Button from "../components/Button"
import { decodedTokenProps } from "../types/decodedToken"
import classes from './Home.module.css'
import { UserProps } from "../types/user"

export default function Home() {

    const navigate = useNavigate()

    const [ update, setUpdate ] = useState(false)

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

    //Get user data from server
    const getUser = async () => {

        //Get token from localStorage
        const token = localStorage.getItem('token')

        //If token exists
        if(token) {
            const decodedToken = await jwtDecode<decodedTokenProps>(token)
            
            const userId = decodedToken.id

            await fetch(`http://localhost:3333/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
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
                console.log(data[0])
                setUser({ ...user, ['name']: data[0].name})
                setUser({ ...user, ['email']: data[0].email})
                setUser({ ...user, ['password']: data[0].password})
            })
            .catch((err) => {
                //Show errors to user
                console.error(err)
                toast.error(err.message || 'Error on login, please try again later')
            })
        } else {
            navigate('/')
            window.location.reload()
        }
    }

    //Set effect to getUser function
    useEffect(() => {
        getUser()
    },[])

    //Handle save button click
    const handleSave = async () => {

        const token = localStorage.getItem('token')

        if(token) {
            const decodedToken = await jwtDecode<decodedTokenProps>(token)

            const userId = decodedToken.id

            await fetch(`http://localhost:3333/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json()
                    throw new Error(errorData.message || 'Server error') // Throw error with server message if available, otherwise default message
                }
            })
            .then(() => {
                toast.success('Data updated successfully')
            })
            .catch((err) => {
                //Show errors to user
                console.error(err)
                toast.error(err.message || 'Error on login, please try again later')
            })
        } else {
            navigate('/')
            window.location.reload()
        }

        setUpdate(false)
    }

    //Handle delete button click
    const handleDelete = async () => {
        
        const token = localStorage.getItem('token')

        if(token) {
            const decodedToken = await jwtDecode<decodedTokenProps>(token)

            const userId = decodedToken.id

            await fetch(`http://localhost:3333/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json()
                    throw new Error(errorData.message || 'Server error') // Throw error with server message if available, otherwise default message
                }
            })
            .then(() => {
                toast.success('Account deleted successfully')
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 2000)
            })
            .catch((err) => {
                //Show errors to user
                console.error(err)
                toast.error(err.message || 'Error on login, please try again later')
            })
        } else {
            navigate('/')
            window.location.reload()
        }
    }

    //Handle logout button click
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
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
                <h1>Welcome, {user.name}</h1>
            </div> }
            { update ? 
            <Input inputType="text" inputPlaceholder="Enter your name..." inputOnChange={(e) => {handleChange('name',e.target.value)}} inputDefaultValue={user.name} /> : 
            <p>Name: {user.name}</p> }
            { update ? 
            <Input inputType="email" inputPlaceholder="Enter your email..." inputOnChange={(e) => {handleChange('email',e.target.value)}} inputDefaultValue={user.email} /> :
            <p>Email: {user.email}</p> }
            { update ? 
            <Input inputType="password" inputPlaceholder="Enter your new password..." inputOnChange={(e) => {handleChange('password',e.target.value)}} /> :
            <p>Password: {user.password}</p> }
            { update && <Input inputType="password" inputPlaceholder="Confirm your new password..." inputOnChange={(e) => {handleChange('confirmPassword',e.target.value)}} /> }
            { update ?
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Save" buttonOnClick={handleSave}/>
                <Button buttonStyle="red" buttonTitle="Delete account" buttonOnClick={handleDelete}/>
            </div> :
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Update details" buttonOnClick={() => {setUpdate(true)}}/>
                <Button buttonStyle="red" buttonTitle="Log out" buttonOnClick={handleLogout}/>
            </div> }
        </div>
    )
}