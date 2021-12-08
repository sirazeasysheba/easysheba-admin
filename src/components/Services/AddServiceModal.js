import { Form, Formik } from "formik";
import React from "react";
import { Col, Row, Button, Form as Form2, Container } from "react-bootstrap";
import Input from "../UI/Input";
import Modals from "../UI/Modals";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addService } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
const AddServiceModal = (props) => {
  const {
    size,
    title,
    show,
    handleClose,
    setParentId,
    parentId,
    category,
    setCategory,
    handleServiceImage,
    serviceList,
    categoryList,
    btnTitle,
    details,
    setDetails,
    information,
    setInformation,
    notes,
    setNotes,
    serviceImage,
  } = props;
  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    priceRange: Yup.string().required("Price Range is required"),
    rating: Yup.number().required("Rating is required"),
  });
  const dispatch = useDispatch();
  return (
    <div>
      <Modals
        show={show}
        handleClose={handleClose}
        title={title}
        size={size}
        btnTitle={btnTitle}
      >
        <Container>
          <Row>
            <div className="border">
              <h3 className=" fw-bold text-center">Add New Service</h3>
              <Formik
                initialValues={{
                  name: "",
                  priceRange: "",
                  rating: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  const service = values;
                  service.parentId = parentId;
                  service.category = category;
                  service.details = details;
                  service.information = information;
                  service.notes = notes;
                  // service.serviceImage = serviceImage;

                  dispatch(addService(service));
                  toast("Service Added Successfully", {
                    type: "success",
                    position: "top-right",
                    theme: "colored",
                  });
                }}
              >
                {(formik) => (
                  <div className="mx-5">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Input
                            label="Service Name"
                            type="text"
                            placeholder="Service Name"
                            name="name"
                            style={{ maxWidth: 300 }}
                          />
                        </Col>
                        <Col md={6}>
                          <Input
                            label="Service Image"
                            type="file"
                            placeholder="Service Image"
                            name="serviceImage"
                            onChange={handleServiceImage}
                            style={{ maxWidth: 300 }}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Input
                            label="Price Range"
                            type="text"
                            placeholder="Price Range"
                            name="priceRange"
                            style={{ maxWidth: 300 }}
                          />
                        </Col>
                        <Col md={6}>
                          <Input
                            label="Rating"
                            type="text"
                            placeholder="Service Rating"
                            name="rating"
                            style={{ maxWidth: 300 }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form2.Group className="mb-3">
                            <Form2.Label className="fw-bold">
                              Details <span className="text-danger">*</span>
                            </Form2.Label>
                            <Form2.Control
                              as="textarea"
                              rows={3}
                              value={details}
                              onChange={(e) => setDetails(e.target.value)}
                            />
                          </Form2.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form2.Group className="mb-3">
                            <Form2.Label className="fw-bold">
                              Information <span className="text-danger">*</span>
                            </Form2.Label>
                            <Form2.Control
                              as="textarea"
                              rows={3}
                              value={information}
                              onChange={(e) => setInformation(e.target.value)}
                            />
                          </Form2.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form2.Group className="mb-3">
                            <Form2.Label className="fw-bold">
                              Notes <span className="text-danger">*</span>
                            </Form2.Label>
                            <Form2.Control
                              as="textarea"
                              rows={3}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </Form2.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#212529",
                              marginBottom: 5,
                            }}
                          >
                            Select Service{" "}
                          </p>
                          <Form2.Select
                            aria-label="Default select example"
                            style={{ maxWidth: 300 }}
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                          >
                            <option>Select Service</option>
                            {serviceList.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </Form2.Select>
                        </Col>
                        <Col md={6}>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#212529",
                              marginBottom: 5,
                            }}
                          >
                            Select Category{" "}
                            <span className="text-danger">*</span>
                          </p>
                          <Form2.Select
                            aria-label="Default select example"
                            value={category}
                            style={{ maxWidth: 300 }}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option>Select Category</option>
                            {categoryList.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </Form2.Select>
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-center">
                        <Button
                          type="submit"
                          className="mt-5 w-50 fw-medium shadow-none bg-success"
                        >
                          Submit
                        </Button>
                      </Row>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </Row>
        </Container>
      </Modals>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddServiceModal;
