import { PropsWithChildren } from "react"

const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const
const sizes = ['sm', 'lg'] as const

interface ButtonProps {
    color: typeof colors[number]
    outline?: boolean
    uppercase?: boolean
    size?: typeof sizes[number]
    block?: boolean
    cssClasses?: string | string[]
    [key: string]: any
}


const Button = (props: PropsWithChildren<ButtonProps>) => {
    const cssClasses = ['btn']
    if (props.block) cssClasses.push('btn-block')
    if (props.color) props.outline ? cssClasses.push(`btn-outline-${props.color}`) : cssClasses.push(`btn-${props.color}`)
    if (props.size) cssClasses.push(`btn-${props.size}`)
    if (props.cssClasses) Array.isArray(props.cssClasses) ? cssClasses.push(...props.cssClasses) : cssClasses.push(props.cssClasses)
    return (
        <button
            className={cssClasses.join(' ')}
            type={props.type || "submit"}
            style={{
                textTransform: props.uppercase ? 'uppercase' : 'none'
            }}
        >
            {props.children}
        </button>
    )
}

export { Button }
