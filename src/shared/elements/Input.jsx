import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => (
    <input
        ref={ref}
        className={`${className}`}
        {...props}
    />
));

Input.displayName = "Input";

export default Input;
