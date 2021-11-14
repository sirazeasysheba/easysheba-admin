import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";

const UpdateServiceModal = (props) => {
  const {
    size,
    title,
    show,
    handleClose,
    expandedArray,
    checkedArray,
    handleServiceInput,
    categoryList,
    serviceList,
  } = props;
  return (
    <div>
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
                <Row>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.name}
                      placeholder="Service Name"
                      onChange={(e) =>
                        handleServiceInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.priceRange}
                      placeholder="Price Range"
                      onChange={(e) =>
                        handleServiceInput(
                          "priceRange",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.rating}
                      placeholder="Rating"
                      onChange={(e) =>
                        handleServiceInput(
                          "rating",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.details}
                      placeholder="details"
                      onChange={(e) =>
                        handleServiceInput(
                          "details",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.information}
                      placeholder="information"
                      onChange={(e) =>
                        handleServiceInput(
                          "information",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      value={item.parentId}
                      onChange={(e) =>
                        handleServiceInput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option>Select Service</option>
                      {serviceList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      value={item.category}
                      onChange={(e) =>
                        handleServiceInput(
                          "category",
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
                </Row>
              </Row>
            ))}

          <h6>Checked</h6>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={index}>
                <Row>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.name}
                      placeholder="Service Name"
                      onChange={(e) =>
                        handleServiceInput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.priceRange}
                      placeholder="Price Range"
                      onChange={(e) =>
                        handleServiceInput(
                          "priceRange",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.rating}
                      placeholder="Rating"
                      onChange={(e) =>
                        handleServiceInput(
                          "rating",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.details}
                      placeholder="details"
                      onChange={(e) =>
                        handleServiceInput(
                          "details",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <ModalInput
                      className="form-control-sm"
                      type="text"
                      value={item.information}
                      placeholder="information"
                      onChange={(e) =>
                        handleServiceInput(
                          "information",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      value={item.parentId}
                      onChange={(e) =>
                        handleServiceInput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option>Select Service</option>
                      {serviceList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      value={item.category}
                      onChange={(e) =>
                        handleServiceInput(
                          "category",
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
                </Row>
              </Row>
            ))}
        </Row>
      </Modals>
    </div>
  );
};

export default UpdateServiceModal;
