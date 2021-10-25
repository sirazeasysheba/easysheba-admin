import React from "react";
import Modals from "../UI/Modals";
const DeleteCategoryModal = (props) => {
  const {
    title,
    show,
    handleClose,
    deleteCategories,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <Modals
      title={title}
      show={show}
      handleClose={handleClose}
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
          onClick: deleteCategories,
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
export default DeleteCategoryModal;
