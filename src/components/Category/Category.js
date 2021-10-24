import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategoryAction,
} from "../../redux/actions";
import ModalInput from "../UI/ModalInput";
import Modals from "../UI/Modals";
import Layout from "../Layout/Layout";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import { IoCheckbox } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { AiOutlineCheckSquare } from "react-icons/ai";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category.name}>
        //   {category.name}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }
    return categoryList;
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    // const cat = {
    //   categoryName,
    //   parentId,
    //   categoryImage,
    // };
    // console.log(cat);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleCategoryInput = (key, value, index, type) => {
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
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategoryAction(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategoryModal(false);
  };

  const renderUpdateModal = () => {
    return (
      <Modals
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        title={"Update Category"}
        size="lg"
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
                <Col>
                  <ModalInput
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
                    {createCategoryList(category.categories).map((option) => (
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
                    {createCategoryList(category.categories).map((option) => (
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

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const renderDeleteCategoryModal = () => {
    return (
      <Modals
        title="Confirm? "
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("No");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: () => {
              alert("Yes");
            },
          },
        ]}
      >
        <div className="text-center">
          <h6> Expanded</h6>
          {expandedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
          <h6 className="mt-3"> Checked</h6>
          {checkedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </Modals>
    );
  };
  const renderAddCategoryModal = () => {
    return (
      <Modals show={show} handleClose={handleClose} title={"Add New Category"}>
        <ModalInput
          type="text"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Form.Select
          aria-label="Default select example"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="mb-3"
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
        <ModalInput
          type="file"
          placeholder="Category Image"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
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
                <h3>Category</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add Category
                  {renderAddCategoryModal()}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {/* <ul>{renderCategories(category.categories)}</ul> */}
              <CheckboxTree
                nodes={renderCategories(category.categories)}
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
        </Container>

        <div className="m-5">
          <button className="edit-btn me-5" onClick={updateCategory}>
            Edit
          </button>
          <button className="delete-btn" onClick={deleteCategory}>
            Delete
          </button>
        </div>
        {renderUpdateModal()}
        {renderDeleteCategoryModal()}
      </Layout>
    </div>
  );
};

export default Category;
