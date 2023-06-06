import styles from "./styles.module.css";

import { FormEventHandler } from "react";

type Props = {
  name?: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: FormEventHandler<HTMLElement>;
};
const Input = ({
  name,
  label,
  required,
  type,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor={name}>
          {label}
        </label>

        <input
          className={styles.inputElement}
          placeholder={placeholder}
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Input;
