import { Oval } from "react-loading-icons"

import classes from './LoadingSpinner.module.css'
import { LoadingSpinnerProps } from "../types/loadingSpinner"

export default function LoadingSpinner({ spinnerSize }: LoadingSpinnerProps) {
    return(
        <Oval className={`${classes[spinnerSize]}`}/>
    )
}