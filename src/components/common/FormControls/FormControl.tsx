import { Component, HTMLAttributes, ReactComponentElement, ReactNode } from "react";
import { Field, WrappedFieldProps } from "redux-form";
import styles from "./FormControls.module.css";
import { required } from "../../../utils/validators";
import { JsxElement } from "typescript";

type FormControlProps = WrappedFieldProps &
  HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const FormControl = ({ input, meta, children, ...props }: FormControlProps) => {
  const hasError = meta.error && meta.touched;

  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
      <div>{children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props: FormControlProps) => {
  const { input } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} />
    </FormControl>
  );
};

export const Input = (props: FormControlProps) => {
  const { input } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...props} />
    </FormControl>
  );
};

// type CreateFieldProps = {
//   placeholder: string;
//   name: string;
//   component: Component;
//   validators: Function[];
// };

export const createField = (
  name: string,
  component: ReactNode,
  validators: Function[],
  type: string,
  placeholder?: string,
) => {
  return (
    <Field
      name={name}
      component={component}
      placeholder={placeholder}
      validate={validators}
      type={type}
    />
  );
};
