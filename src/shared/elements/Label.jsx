import React from "react";

const Label = ({ className = "", children, ...props }) => (
    <label
        className={`block text-sm text-neutral-400 mb-2 ${className}`}
        {...props}
    >
        {children}
    </label>
);

export default Label;
