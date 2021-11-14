import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { IoCheckbox } from "react-icons/io5";

import AddServiceModal from "./AddServiceModal";
import { deleteServicesAction, updateServiceAction } from "../../redux/actions";
import UpdateServiceModal from "./UpdateServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
const Services = () => {
  //States
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [serviceImage, setServiceImage] = useState("");
  const [showUpdateServiceModal, setShowUpdateServiceModal] = useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
  const [parentId, setParentId] = useState("");
  const [category, setCategory] = useState("");
  //Redux Store data
  const service = useSelector((state) => state.service);
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
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
        priceRange: service.priceRange,
        rating: service.rating,
        information: service.information,
        details: service.details,
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
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //handle Service Input

  const handleServiceInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
    console.log(checkedArray, expandedArray);
  };

  //Add Service
  const handleClose = () => setShow(false);

  //Update Service
  const updateService = () => {
    updateCheckedAndExpandedServices();
    setShowUpdateServiceModal(true);
  };
  const updateServiceForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("priceRange", item.priceRange);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
      form.append("information", item.information);
      form.append("details", item.details);
      form.append("rating", item.rating);
      form.append("category", item.category ? item.category : "");
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("priceRange", item.priceRange);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
      form.append("information", item.information);
      form.append("details", item.details);
      form.append("rating", item.rating);
      form.append("category", item.category ? item.category : "");
    });
    dispatch(updateServiceAction(form));
    setShowUpdateServiceModal(false);
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

  //Delete Service
  const deleteService = () => {
    updateCheckedAndExpandedServices();
    setShowDeleteServiceModal(true);
  };

  const deleteServices = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    if (checkedIdsArray.length > 0) {
      dispatch(deleteServicesAction(checkedIdsArray));
    }
    setShowDeleteServiceModal(false);
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
                <button className="add-btn" onClick={() => setShow(true)}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosAdd />
                    <span className="ms-1">Add</span>
                  </div>
                </button>
                <button className="edit-btn" onClick={updateService}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosCloudUpload /> <span className="ms-2">Edit</span>
                  </div>
                </button>
                <button className="delete-btn" onClick={deleteService}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosTrash /> <span className="ms-2">Delete</span>
                  </div>
                </button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Add Service Modal */}
        <AddServiceModal
          size="lg"
          title="Add New Service"
          show={show}
          handleClose={handleClose}
          categoryList={createCategoryList(categories.categories)}
          serviceList={createServiceList(service.services)}
          handleServiceImage={handleServiceImage}
          parentId={parentId}
          setParentId={setParentId}
          category={category}
          setCategory={setCategory}
          btnTitle="Close"
        />

        {/* Update Service Modal */}
        <UpdateServiceModal
          size="lg"
          title="Update Service"
          show={showUpdateServiceModal}
          handleClose={updateServiceForm}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleServiceInput={handleServiceInput}
          categoryList={createCategoryList(categories.categories)}
          serviceList={createServiceList(service.services)}
        />

        {/* DeleteCategoryModal */}
        <DeleteServiceModal
          title="Confirm? "
          show={showDeleteServiceModal}
          handleClose={() => setShowDeleteServiceModal(false)}
          deleteServices={deleteServices}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
        ></DeleteServiceModal>
      </Layout>
    </div>
  );
};

export default Services;
