import { useNavigate } from "react-router-dom"

import { FaUserCheck } from "react-icons/fa"

import classes from './Home.module.css'

import Button from "../components/Button"

export default function Home() {

    const navigate = useNavigate()

    const handleClick = () => {

    }

    return(
        <div className={classes.container}>
            <div className={classes.title}>
                <FaUserCheck fill="#D63AFF" size="35px" />
                <h1>Welcome (username)</h1>
            </div>
            <p>Luis Fellipy Bett</p>
            <p>luisfbett@gmail.com</p>
            <div className={classes.buttons}>
                <Button buttonStyle="pink" buttonTitle="Update details" buttonOnClick={handleClick}/>
                <Button buttonStyle="red" buttonTitle="Log out" buttonOnClick={() => navigate('/')}/>
            </div>
        </div>
    )
}