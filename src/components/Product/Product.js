import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProductAction,
  updateProductAction,
} from "../../redux/actions";
import Modals from "../UI/Modals";
import Layout from "../Layout/Layout";
import ModalInput from "../UI/ModalInput";
import DeleteProductModals from "./DeleteProductModals";
import { IoIosTrash } from "react-icons/io";
import UpdateProductModal from "./UpdateProductModal";
const Product = (props) => {
  //Product
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState("");

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [productById, setProductById] = useState([]);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState("");

  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");
  const handleClose = () => {
    const product = { name, price, service };
    dispatch(addProduct(product));
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const services = useSelector((state) => state.service);
  const product = useSelector((state) => state.product);

  const createServiceList = (services, options = []) => {
    for (let service of services) {
      for (let child of service.children) {
        options.push({
          value: child._id,
          name: child.name,
          priceRange: child.priceRange,
          rating: child.rating,
          details: child.details,
          information: child.information,
          category: child.category.name,
          parentId: child.parentId,
        });
      }
    }
    return options;
  };
  //
  const getServiceById = (parentId) => {
    const service = services.services.find(
      (service) => service._id === parentId
    );
    const serviceName = service.name;
    return serviceName;
  };

  const showProductDetailsModal = (service) => {
    setProductShow(true);
    const productList = [];
    for (let pro of product.products) {
      if (pro.service && pro.service._id === service.value) {
        productList.push(pro);
      }
    }
    setProductDetails(service);
    setProductById(productList);
  };

  const updateProductModal = (product) => {
    setProductToUpdate(product);
    setShowUpdateProductModal(true);
  };
  const updateProductForm = () => {
    const form = new FormData();
    form.append("_id", productToUpdate.value);
    form.append("name", productToUpdate.name);
    form.append("price", productToUpdate.price);
    dispatch(updateProductAction(form));
    setShowUpdateProductModal(false);
  };

  const handleProductInput = (key, value) => {
    const updatedProductToUpdate = { ...productToUpdate, [key]: value };
    setProductToUpdate(updatedProductToUpdate);
  };

  //Delete product
  const deleteProductModal = (product) => {
    console.log(product._id);
    setProductToDelete(product._id);
    setShowDeleteProductModal(true);
  };
  const deleteProductById = () => {
    if (productToDelete) {
      console.log(productToDelete);
      dispatch(deleteProductAction(productToDelete));
    }
    setShowDeleteProductModal(false);
  };

  const renderProducts = () => {
    return (
      <Table responsive style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Parent Service</th>
            <th>Price Range</th>
            <th>Rating</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {createServiceList(services.services).length > 0
            ? createServiceList(services.services).map((service, index) => (
                <tr
                  key={index}
                  onClick={() => showProductDetailsModal(service)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{getServiceById(service.parentId)}</td>
                  <td>{service.priceRange}</td>
                  <td>{service.rating}</td>
                  <td>{service.category}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modals
        show={show}
        handleClose={handleClose}
        title={"Add New Package"}
        size="lg"
      >
        <Row>
          <Col>
            <ModalInput
              label="Package Name"
              type="text"
              value={name}
              placeholder="Package Name"
              onChange={(e) => setName(e.target.value)}
              className="form-control-sm"
            />
          </Col>
          <Col>
            <label for="Category" class="form-label">
              Sub-Service
            </label>
            <Form.Select
              aria-label="Default select example"
              id="Category"
              value={service}
              onChange={(e) => setService(e.target.value)}
              size="sm"
            >
              <option>Select Sub-Service</option>
              {createServiceList(services.services).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <ModalInput
              label="Price"
              type="text"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="form-control-sm"
            />
          </Col>
        </Row>
      </Modals>
    );
  };
  const handleCloseProductDetails = () => {
    setProductShow(false);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modals
        show={productShow}
        handleClose={handleCloseProductDetails}
        title={"Product Details"}
        size="lg"
      >
        <Row>
          <h5 className="value text-center fw-bold mb-3">
            {productDetails.name}
          </h5>
        </Row>
        <Row>
          <Col md={4}>
            <label className="key text-center">Price Range</label>
            <p className="value">{productDetails.priceRange}</p>
          </Col>
          <Col md={4}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category}</p>
          </Col>
          <Col md={4}>
            <label className="key">Rating</label>
            <p className="value">{productDetails.rating} out of 5</p>
          </Col>
        </Row>
        <Row>
          <label className="key">Details</label>
          <p className="value">{productDetails.details}</p>
        </Row>
        <Row>
          <label className="key">Information</label>
          <p className="value">{productDetails.information}</p>
        </Row>
        <Row className="m-5">
          <h5 className="text-center fw-bold">Packages</h5>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {productById.length > 0
                ? productById.map((pro, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{pro.name}</td>
                      <td>{pro.price}</td>
                      <td style={{ cursor: "pointer" }}>
                        {" "}
                        <IoIosTrash className="text-danger" />{" "}
                        <span
                          className="ms-2"
                          onClick={() => updateProductModal(pro)}
                        >
                          Edit
                        </span>
                      </td>
                      <td style={{ cursor: "pointer" }}>
                        {" "}
                        <IoIosTrash className="text-danger" />{" "}
                        <span
                          className="ms-2"
                          onClick={() => deleteProductModal(pro)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Row>

        {/* UpdateProductModal */}
        <UpdateProductModal
          show={showUpdateProductModal}
          handleClose={updateProductForm}
          title={"Update Package"}
          size={"md"}
          handleProductInput={handleProductInput}
          productToUpdate={productToUpdate}
        ></UpdateProductModal>

        {/* Delete Product Modal */}

        <DeleteProductModals
          title="Confirm? "
          show={showDeleteProductModal}
          handleClose={() => setShowDeleteProductModal(false)}
          deleteProductById={deleteProductById}
        ></DeleteProductModals>
      </Modals>
    );
  };
  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between">
                <h3>All Services</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add Package
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12}>{renderProducts()}</Col>
          </Row>
        </Container>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Layout>
    </div>
  );
};

export default Product;
