import React from "react";
import { Col, Row } from "react-bootstrap";
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
      </Modals>
    </div>
  );
};

export default UpdateProductModal;
