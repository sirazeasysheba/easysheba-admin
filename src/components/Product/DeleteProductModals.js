import React from "react";
import Modals from "../UI/Modals";

const DeleteProductModals = (props) => {
  const { title, show, handleClose, deleteProductById } = props;
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
            onClick: deleteProductById,
          },
        ]}
      >
        <div className="text-center">
          <h5 className="text-danger">Are your sure?</h5>
        </div>
      </Modals>
    </div>
  );
};

export default DeleteProductModals;
