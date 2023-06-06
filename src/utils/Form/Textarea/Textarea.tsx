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
    <div className={styles.textareaContainer}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={styles.textareaElement}
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
