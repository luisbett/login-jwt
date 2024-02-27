import { ButtonProps } from "../types/button"

import classes from './Button.module.css'

export default function Button({ buttonStyle, buttonTitle, buttonClick }: ButtonProps) {
    return (
        <button className={`${classes[buttonStyle]}`} onClick={buttonClick}>{buttonTitle}</button>
    )
}