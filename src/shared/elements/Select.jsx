import React, { forwardRef } from "react";

const Select = forwardRef(({ className = "", children, ...props }, ref) => (
    <select
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 ${className}`}
        {...props}
    >
        {children}
    </select>
));

Select.displayName = "Select";

export default Select;
