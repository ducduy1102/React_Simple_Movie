import React from "react";

// {} destructuring
const Button = ({
  onClick,
  className = "",
  children,
  type = "button",
  bgColor = "primary",
  full = false,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 mt-auto capitalize rounded-lg ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
