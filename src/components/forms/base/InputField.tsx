"use client";

import styles from "./inputField.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import Input from "@/components/ui/inputs/Input";

type InputFieldProps = {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string | number;
  error?: FieldError;
  hidden?: boolean;
  options?: { label: string; value: string | number }[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
  options,
}: InputFieldProps) => {
  if (hidden) {
    return (
      <input
        type="hidden"
        {...register(name)}
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      {options ? (
        <select
          className={styles.select}
          {...register(name)}
          defaultValue={defaultValue}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          type={type}
          defaultValue={defaultValue}
          {...register(name, {
            valueAsNumber: type === "number",
          })}
          {...inputProps}
        />
      )}

      {error?.message && (
        <p className={styles.error}>{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;

// import { FieldError, UseFormRegister } from "react-hook-form";

// type InputFieldProps = {
//   label: string;
//   type?: string;
//   register: UseFormRegister<any>;
//   name: string;
//   defaultValue?: string;
//   error?: FieldError;
//   hidden?: boolean;
//   options?: { label: string; value: string | number }[]; // para selects
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
// };

// const InputField = ({
//   label,
//   type = "text",
//   register,
//   name,
//   defaultValue,
//   error,
//   hidden,
//   inputProps,
//   options,
// }: InputFieldProps) => {
//   return (
//     <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
//       <label className="text-xs text-gray-500">{label}</label>
//       <input
//         type={type}
//         {...(register(name, { valueAsNumber: type === "number" }))}
//         className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//         {...inputProps}
//         defaultValue={defaultValue}
//       />
//       {error?.message && (
//         <p className="text-xs text-red-400">{error.message.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;
