import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";

const UpdateProductModal = (props) => {
  const {
    size,
    title,
    show,
    handleClose,
    handleProductInput,
    productToUpdate,
    handleSubmit,
  } = props;
  return (
    <div>
      <Modals
        show={show}
        handleClose={handleClose}
        title={title}
        size={size}
        handleProductInput={handleProductInput}
        productToUpdate={productToUpdate}
        handleSubmit={handleSubmit}
      >
        <Row>
          <Col>
            <ModalInput
              className="form-control-sm"
              type="text"
              value={productToUpdate.name}
              placeholder="Package Name"
              onChange={(e) => handleProductInput("name", e.target.value)}
            />
          </Col>
          <Col>
            <ModalInput
              className="form-control-sm"
              type="text"
              value={productToUpdate.price}
              placeholder="Price"
              onChange={(e) => handleProductInput("price", e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Additional Info <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productToUpdate.info}
                onChange={(e) => handleProductInput("info", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modals>
    </div>
  );
};

export default UpdateProductModal;
