import React from "react";

interface IFormErrorProps {
  message: string | string[];
}
const FormError = (props: IFormErrorProps) => {
  return <p className="text-xs text-red-500">{props.message}</p>;
};

export default FormError;
