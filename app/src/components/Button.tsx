import { ButtonProps } from '../types/button'

import classes from './Button.module.css'
import LoadingSpinner from './LoadingSpinner'

export default function Button({ buttonStyle, buttonTitle, buttonOnClick, isLoading = false }: ButtonProps) {
    return (
        <button className={`${classes[buttonStyle]}`} onClick={buttonOnClick}>
            { isLoading
            ? <LoadingSpinner spinnerSize='small' />
            : <span>{buttonTitle}</span> }
        </button>
    )
}