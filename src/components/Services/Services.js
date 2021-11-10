import React, { useState } from "react";
import { Col, Collapse, Container, Row, Form as Form2 } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { IoCheckbox } from "react-icons/io5";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
const Services = () => {
  //States
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [serviceImage, setServiceImage] = useState("");
  const [updateServiceModal, setUpdateServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [parentId, setParentId] = useState("");
  const [category, setCategory] = useState("");
  //Redux Store data
  const service = useSelector((state) => state.service);
  const categories = useSelector((state) => state.category);
  //Render Service Data
  const renderServices = (services) => {
    let serviceList = [];
    for (let service of services) {
      serviceList.push({
        label: service.name,
        value: service._id,
        children:
          service.children.length > 0 && renderServices(service.children),
      });
    }
    return serviceList;
  };

  //Create Service List
  const createServiceList = (services, options = []) => {
    for (let service of services) {
      options.push({
        value: service._id,
        name: service.name,
        parentId: service.parentId,
        category: service.category,
      });
      if (service.children.length > 0) {
        createServiceList(service.children, options);
      }
    }
    return options;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      for (let child of category.children)
        options.push({ value: child._id, name: child.name });
    }
    return options;
  };

  //Add Service
  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  //Update Service
  const updateService = () => {
    updateCheckedAndExpandedServices();
    setUpdateServiceModal(true);
  };
  const updateCheckedAndExpandedServices = () => {
    const services = createServiceList(service.services);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((serviceId, index) => {
        const service = services.find(
          (service, _index) => serviceId === service.value
        );
        service && checkedArray.push(service);
      });

    expanded.length > 0 &&
      expanded.forEach((serviceId, index) => {
        const service = services.find(
          (service, _index) => serviceId === service.value
        );
        service && expandedArray.push(service);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleServiceImage = (e) => {
    setServiceImage(e.target.files[0]);
  };

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between mt-3">
                <h3>Service</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CheckboxTree
                nodes={renderServices(service.services)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoCheckbox />,
                  uncheck: <AiOutlineCheckSquare />,
                  halfCheck: <AiOutlineCheckSquare />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="action-btn-container mt-5">
                <button
                  className="add-btn"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosAdd />
                    <span className="ms-1">Add</span>
                  </div>
                </button>
                <button className="edit-btn">
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosCloudUpload /> <span className="ms-2">Edit</span>
                  </div>
                </button>
                <button className="delete-btn">
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosTrash /> <span className="ms-2">Delete</span>
                  </div>
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Collapse in={open}>
              <div id="add-collapse" className="mt-5">
                <div className="border">
                  <Formik
                    initialValues={{
                      name: "",
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                      const user = values;
                      user.parentId = parentId;
                      user.category = category;
                      console.log(user);
                    }}
                  >
                    {(formik) => (
                      <div className="m-5">
                        <Form>
                          <Row>
                            <Col md={6}>
                              <Input
                                label="Service Name"
                                type="text"
                                placeholder="Service Name"
                                name="serviceName"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </Col>
                            <Col md={6}>
                              <Input
                                label="Service Image"
                                type="file"
                                placeholder="Service Image"
                                name="serviceImage"

                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Form2.Select
                                aria-label="Default select example"
                                style={{ maxWidth: 350 }}
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                              >
                                <option>Select Service</option>
                                {createServiceList(service.services).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </Form2.Select>
                            </Col>
                            <Col md={6}>
                              <Form2.Select
                                aria-label="Default select example"
                                value={category}
                                style={{ maxWidth: 350 }}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option>Select Service</option>
                                {createCategoryList(categories.categories).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </Form2.Select>
                            </Col>
                          </Row>
                          {/* <Button
                                type="submit"
                                className="w-100 fw-medium shadow-none bg-success"
                              >
                                Login
                              </Button> */}
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </Collapse>
          </Row>
        </Container>

        {/* Add Service Modal */}
      </Layout>
    </div>
  );
};

export default Services;
