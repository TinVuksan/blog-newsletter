import React, { SyntheticEvent } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  form?: string;
  hidden?: boolean;
  children: React.ReactNode | React.ReactNode[];

  onClick?(e?: SyntheticEvent): void;
}

const Button = ({ onClick, hidden, children, form, ...props }: ButtonProps) => {
  return (
    <button form={form} hidden={hidden} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
