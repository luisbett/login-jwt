import { useNavigate } from 'react-router-dom'
import { VscError } from 'react-icons/vsc'
import Button from '../components/Button'
import classes from './NotFound.module.css'

export default function NotFound() {

    const navigate = useNavigate()

    return(
        <div className={classes.container}>
            <div className={classes.title}>
                <VscError fill="#FF3333" size="35px" />
                <h1>Page not found</h1>
            </div>
            <p>Sorry, the page you are looking for does not exists</p>
            <Button buttonStyle="pink" buttonTitle="Go back" buttonOnClick={() => {navigate('/')}} />
        </div>
    )
}