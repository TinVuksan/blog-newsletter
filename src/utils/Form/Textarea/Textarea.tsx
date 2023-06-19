import styles from "./styles.module.css";
import { FormEventHandler } from "react";

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  cols: number;
  rows: number;
  value?: string;
  className?: string;
  onChange?: FormEventHandler<HTMLElement>;
};

const Textarea = ({
  name,
  cols,
  rows,
  value,
  onChange,
  label,
  placeholder,
}: Props) => {
  return (
    <div className={styles["textarea-container"]}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={styles["textarea-element"]}
        id={name}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default Textarea;
