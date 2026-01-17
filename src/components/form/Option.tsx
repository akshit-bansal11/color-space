import React from "react";

const Option = ({
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props}>{children}</option>
);

export default Option;
