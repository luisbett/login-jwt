import { InputProps } from '../types/input'

import classes from './Input.module.css'

export default function Input({ inputType, inputPlaceholder, inputOnChange, inputOnKeyDown }: InputProps) {
    return <input className={classes.input} type={inputType} placeholder={inputPlaceholder} onChange={inputOnChange} onKeyDown={inputOnKeyDown} />
}