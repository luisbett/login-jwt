import { ButtonProps } from '../types/button'

import classes from './Button.module.css'

export default function Button({ buttonStyle, buttonTitle, buttonOnClick }: ButtonProps) {
    return <button className={`${classes[buttonStyle]}`} onClick={buttonOnClick}>{buttonTitle}</button>
}