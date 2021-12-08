import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategoryAction,
  deleteCategories as deleteCategoriesAction,
} from "../../redux/actions";
import Layout from "../Layout/Layout";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import { IoCheckbox } from "react-icons/io5";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { AiOutlineCheckSquare } from "react-icons/ai";
import UpdateCategoriesModal from "./UpdateCategoriesModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import AddCategoryModal from "./AddCategoryModal";
import { ToastContainer, toast } from "react-toastify";

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

  const handleSubmit = () => {
    const form = new FormData();
    // if (categoryName === "") {
    //   alert("Name is required");
    //   return;
    // }
    form.append("name", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    if (category.error) {
      toast(category.error, {
        type: "error",
        theme: "colored",
      });
    } else {
      toast("Added Successfully!", {
        type: "success",
        position: "top-right",
        theme: "colored",
      });
    }
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
        type: category.type,
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
    dispatch(updateCategoryAction(form));
    setUpdateCategoryModal(false);
    toast("Category Updated Successfully", {
      type: "success",
      position: "top-right",
      theme: "colored",
    });
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray));
    }
    setDeleteCategoryModal(false);
    toast("Category Deleted !!", {
      type: "error",
      position: "top-right",
      theme: "colored",
    });
  };

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between mt-3">
                <h3>Category</h3>
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
          <Row>
            <Col>
              <div className="action-btn-container mt-5">
                <button className="add-btn" onClick={handleShow}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosAdd />

                    <span className="ms-1">Add</span>
                  </div>
                </button>
                <button className="edit-btn" onClick={updateCategory}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosCloudUpload /> <span className="ms-2">Edit</span>
                  </div>
                </button>
                <button className="delete-btn" onClick={deleteCategory}>
                  <div className="d-flex align-items-center justify-content-center">
                    <IoIosTrash /> <span className="ms-2">Delete</span>
                  </div>
                </button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Add Category Modal */}
        <AddCategoryModal
          title="Add New Category"
          show={show}
          handleClose={handleClose}
          categoryList={createCategoryList(category.categories)}
          setCategoryName={setCategoryName}
          setParentId={setParentId}
          categoryName={categoryName}
          parentId={parentId}
          handleCategoryImage={handleCategoryImage}
          handleSubmit={handleSubmit}
        ></AddCategoryModal>

        {/* Update Modal */}
        <UpdateCategoriesModal
          size="lg"
          title="Update Category"
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={createCategoryList(category.categories)}
          handleSubmit={updateCategoriesForm}
        ></UpdateCategoriesModal>

        {/* DeleteCategoryModal */}
        <DeleteCategoryModal
          title="Confirm? "
          show={deleteCategoryModal}
          handleClose={() => setDeleteCategoryModal(false)}
          deleteCategories={deleteCategories}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
        ></DeleteCategoryModal>
        <ToastContainer position="top-center" />
        {/* {renderAddCategoryModal()} */}
        {/* {renderUpdateModal()} */}
        {/* {renderDeleteCategoryModal()} */}
      </Layout>
    </div>
  );
};

export default Category;
