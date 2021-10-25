import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions";
import Modals from "../UI/Modals";
import Layout from "../Layout/Layout";
import ModalInput from "../UI/ModalInput";
import { generatePublicUrl } from "../../urlConfig";
const Services = (props) => {
  //Product
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [options, setOptions] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const dispatch = useDispatch();

  //

  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("options", options);
    form.append("optionTitle", optionsTitle);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  console.log(product.products);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //handle product pictures
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
                <tr
                  key={product._id}
                  onClick={() => showProductDetailsModal(product)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                  <td>{product.quantity}</td>
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
        title={"Add New Service"}
        size="lg"
      >
        <Row>
          <Col>
            <ModalInput
              label="Name"
              type="text"
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
              className="form-control-sm"
            />
          </Col>
          <Col>
            <label for="Category" class="form-label">
              Category
            </label>
            <Form.Select
              aria-label="Default select example"
              id="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              size="sm"
            >
              <option>Select Category</option>
              {createCategoryList(category.categories).map((option) => (
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
        <Row>
          <Col>
            <ModalInput
              label="Quantity"
              type="text"
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control-sm"
            />
          </Col>
          <Col>
            <ModalInput
              label="Options"
              type="text"
              value={options}
              placeholder="Options"
              onChange={(e) => setOptions(e.target.value)}
              className="form-control-sm"
            />
          </Col>
          <Col>
            <ModalInput
              label="Options Title"
              type="text"
              value={optionsTitle}
              placeholder="Options Title"
              onChange={(e) => setOptionsTitle(e.target.value)}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <label for="Description" class="form-label">
          Description
        </label>
        <textarea
          className="form-control form-control-sm mb-3"
          id="Description"
          rows="3"
          label="Description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <ModalInput
          label="Images"
          type="file"
          placeholder="Image"
          name="productPicture"
          onChange={handleProductPictures}
          className="form-control-sm"
        />
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index} className="mt-3" style={{ fontSize: 12 }}>
                {index + 1}. {pic.name}
              </div>
            ))
          : null}
      </Modals>
    );
  };
  const handleCloseProductDetails = () => {
    setProductShow(false);
  };
  const showProductDetailsModal = (product) => {
    setProductShow(true);
    setProductDetails(product);
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
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <label> Product Pictures</label>
          <Col className="d-flex mt-3 justify-content-center">
            {productDetails.productPictures.map((pic) => (
              <div>
                <img
                  src={generatePublicUrl(pic.img)}
                  alt=""
                  style={{ height: 100, marginRight: 10 }}
                />
              </div>
            ))}
          </Col>
        </Row>
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
                  Add
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

export default Services;
