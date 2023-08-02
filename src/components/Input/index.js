import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const Input = ({ name, ...otherProps }) => {
  const [field, data] = useField(name);

  const inputProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  if (data && data.touched && data.error) {
    inputProps.error = true;
    inputProps.helperText = data.error;
  }

  return <TextField {...inputProps} />;
};

export default Input;
