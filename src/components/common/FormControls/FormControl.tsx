import { HTMLAttributes } from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "./FormControls.module.css";

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
