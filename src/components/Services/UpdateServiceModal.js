import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";
import { ToastContainer, toast } from "react-toastify";
const UpdateServiceModal = (props) => {
  const {
    size,
    title,
    show,
    handleClose,
    expandedArray,
    checkedArray,
    handleServiceInput,
    serviceList,
    handleSubmit,
  } = props;
  return (
    <div>
      <Modals
        show={show}
        handleClose={handleClose}
        title={title}
        size={size}
        handleSubmit={handleSubmit}
      >
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
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Name"
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
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Price Range"
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
                </Row>
                <Row>
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Rating"
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        Parent Service
                      </Form.Label>
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={item.notes}
                        placeholder="notes"
                        onChange={(e) =>
                          handleServiceInput(
                            "notes",
                            e.target.value,
                            index,
                            "expanded"
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            ))}

          <h6>Checked</h6>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={index}>
                <Row>
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Name"
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
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Price Range"
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
                </Row>
                <Row>
                  <Col md={6}>
                    <ModalInput
                      className="form-control-sm"
                      label="Rating"
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        Parent Service
                      </Form.Label>
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={item.notes}
                        placeholder="notes"
                        onChange={(e) =>
                          handleServiceInput(
                            "notes",
                            e.target.value,
                            index,
                            "checked"
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            ))}
        </Row>
      </Modals>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UpdateServiceModal;
