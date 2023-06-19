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
      <div className={styles["input-container"]}>
        <label className={styles["input-label"]} htmlFor={name}>
          {label}
        </label>

        <input
          className={styles["input-element"]}
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
