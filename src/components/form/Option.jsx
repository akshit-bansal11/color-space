import React from "react";

const Option = ({ children, ...props }) => (
    <option {...props}>
        {children}
    </option>
);

export default Option;
