import React from "react";

const Label = ({
  className = "",
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`block text-sm text-neutral-400 mb-2 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
