import { Form, Formik } from "formik";
import React from "react";
import { Col, Row, Button, Form as Form2, Container } from "react-bootstrap";
import Input from "../UI/Input";
import Modals from "../UI/Modals";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addService } from "../../redux/actions";
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
  } = props;
  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    priceRange: Yup.string().required("Price Range is required"),
    information: Yup.string().required("Information is required"),
    details: Yup.string().required("Details is required"),
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
                  information: "",
                  details: "",
                  rating: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  const service = values;
                  service.parentId = parentId;
                  service.category = category;
                  console.log(service);
                  dispatch(addService(service));
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
                            label="Information"
                            type="text"
                            placeholder="Service Information"
                            name="information"
                            style={{ maxWidth: 300 }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Input
                            label="Details"
                            type="text"
                            placeholder="Service Details"
                            name="details"
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
    </div>
  );
};

export default AddServiceModal;
