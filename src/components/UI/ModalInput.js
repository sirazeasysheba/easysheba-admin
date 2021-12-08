import React from "react";
import { Form } from "react-bootstrap";

const ModalInput = (props) => {
  return (
    <Form.Group className="mb-3">
      {props.label && (
        <Form.Label className="fw-bold">{props.label}</Form.Label>
      )}
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        {...props}
      />
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default ModalInput;
