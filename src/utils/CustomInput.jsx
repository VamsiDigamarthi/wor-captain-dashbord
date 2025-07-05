import React, { useId } from "react";

export default function CustomInput({
  label,
  register,
  name,
  type = "text",
  errors,
  rightElement,
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`w-full p-2 rounded-lg border border-gray-600 outline-none *:
                ${errors?.name && "outline outline-red-500"}
            `}
        type={type}
        {...register(name)}
        id={id}
      />
      {errors?.[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}

      {rightElement && (
        <div className="absolute right-2 top-1/2">{rightElement}</div>
      )}
    </div>
  );
}
