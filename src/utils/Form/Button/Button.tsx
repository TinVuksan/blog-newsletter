import styles from "./styles.module.css";

type Props = {
    form?:string,
    onClick?():void,
    hidden?:boolean,
    text:string
}
const Button =  ({ onClick, hidden, text, form}: Props) => {
    return (
        <button form = {form} className = {styles.button} hidden = {hidden} onClick = {onClick}>{text}</button>
    )

}

export default Button;