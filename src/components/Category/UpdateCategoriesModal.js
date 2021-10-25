import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";

const UpdateCategoriesModal = (props) => {
  const {
    size,
    title,
    show,
    handleClose,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <Modals show={show} handleClose={handleClose} title={title} size={size}>
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      <Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <ModalInput
                  className="form-control-sm"
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select Category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  value=""
                  size="sm"
                  //onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="page">Page</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>

                  {/* {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))} */}
                </Form.Select>
              </Col>
            </Row>
          ))}

        <h6>Checked</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <ModalInput
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  className="form-control-sm"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select Category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  value=""
                  //onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="page">Page</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>

                  {/* {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))} */}
                </Form.Select>
              </Col>
            </Row>
          ))}
      </Row>
    </Modals>
  );
};
export default UpdateCategoriesModal;
