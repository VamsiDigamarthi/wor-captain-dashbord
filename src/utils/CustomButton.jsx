import React from "react";

export default function CustomButton({
  text,
  type = "button",
  onClick,
  className,
  bg = "#EA4C89",
  textColor = "#ffffff",
}) {
  return (
    <button
      className={`cursor-pointer
    bg-[${bg}] w-full p-2 rounded-xl text-[${textColor}] font-semibold cusrsor-pointer
    ${className}`}
      onClick={type === "button" ? onClick : null}
    >
      {text}
    </button>
  );
}
