import { ErrorMessage, useField } from "formik";
import React from "react";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4" style={{ width: 350 }}>
      <label htmlFor={field.name} style={{ fontSize: 14, fontWeight: "600" }}>
        {label} <span className="text-danger">*</span>
      </label>
      <input
        {...field}
        {...props}
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        autoComplete="off"
      />
      {ErrorMessage && (
        <ErrorMessage name={field.name} component="div" className="error " />
      )}
    </div>
  );
};

export default Input;
