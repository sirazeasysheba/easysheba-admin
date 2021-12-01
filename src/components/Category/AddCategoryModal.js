import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";
const AddCategoryModal = (props) => {
  const {
    title,
    show,
    handleClose,
    categoryList,
    setCategoryName,
    setParentId,
    categoryName,
    parentId,
    handleCategoryImage,
    handleSubmit,
  } = props;
  return (
    <Modals
      show={show}
      handleClose={handleClose}
      title={title}
      handleSubmit={handleSubmit}
    >
      <Row>
        <Col>
          <ModalInput
            type="text"
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <Form.Select
            aria-label="Default select example"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="form-control-sm"
            size="sm"
          >
            <option>Select Category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalInput
            type="file"
            placeholder="Category Image"
            name="categoryImage"
            onChange={handleCategoryImage}
            className="form-control-sm"
          />
        </Col>
      </Row>
    </Modals>
  );
};
export default AddCategoryModal;
