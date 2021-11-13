import React from "react";
import Modals from "../UI/Modals";

const DeleteServiceModal = (props) => {
  const {
    title,
    show,
    handleClose,
    deleteServices,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <div>
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
            onClick: deleteServices,
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
    </div>
  );
};

export default DeleteServiceModal;
