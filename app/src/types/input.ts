import { ChangeEventHandler, KeyboardEventHandler } from "react"

export type InputProps = {
    inputType: string,
    inputPlaceholder: string,
    inputOnChange: ChangeEventHandler<HTMLInputElement>,
    inputOnKeyDown?: KeyboardEventHandler
}