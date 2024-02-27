import { ChangeEventHandler } from "react"

export type InputProps = {
    inputType: string,
    inputPlaceholder: string,
    inputOnChange: ChangeEventHandler<HTMLInputElement>
}