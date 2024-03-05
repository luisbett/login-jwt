import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserCheck, FaUserEdit } from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast'
import classes from './Home.module.css'
import Button from "../components/Button"
import { jwtDecode } from "jwt-decode"
import { decodedTokenProps } from "../types/decodedToken"
import Input from "../components/Input"

export default function Home() {

    const navigate = useNavigate()

    const [ update, setUpdate ] = useState(false)
    const [ name, setName ] = useState('Name not found')
    const [ email, setEmail ] = useState('Email not found')
    const [ password, setPassword ] = useState('')

    const getUser = async () => {

        const token = localStorage.getItem('token')

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
                setName(data[0].name)
                setEmail(data[0].email)
                setPassword(data[0].password)
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

    useEffect(() => {
        getUser()
    },[])

    const handleUpdate = () => {
        setUpdate(true)
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSave = async () => {

        const token = localStorage.getItem('token')

        if(token) {
            const decodedToken = await jwtDecode<decodedTokenProps>(token)

            const userId = decodedToken.id

            await fetch(`http://localhost:3333/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    email,
                    password
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
                <h1>Welcome, {name}</h1>
            </div> }
            { update ? 
            <Input inputType="text" inputOnChange={handleChangeName} inputDefaultValue={name} /> : 
            <p>Name: {name}</p> }
            { update ? 
            <Input inputType="email" inputOnChange={handleChangeEmail} inputDefaultValue={email} /> :
            <p>Email: {email}</p> }
            { update ? 
            <Input inputType="password" inputOnChange={handleChangePassword} inputDefaultValue={password} /> :
            <p>Password: {password}</p> }
            { update ?
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Save" buttonOnClick={handleSave}/>
                <Button buttonStyle="red" buttonTitle="Delete account" buttonOnClick={handleDelete}/>
            </div> :
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Update details" buttonOnClick={handleUpdate}/>
                <Button buttonStyle="red" buttonTitle="Log out" buttonOnClick={handleLogout}/>
            </div> }
        </div>
    )
}