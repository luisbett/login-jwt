import { Oval } from "react-loading-icons"

import classes from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
    return(
        <Oval className={classes.spinner}/>
    )
}