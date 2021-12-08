import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { usePagination, useSortBy, useTable } from "react-table";
import Modals from "../UI/Modals";
import { COLUMNS } from "./OrderColums";
import Stepper from "react-stepper-horizontal";
import format from "date-fns/format";
import { cancelOrder, updateOrder } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
const OrderTable = () => {
  const data = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.initialData.users);
  const addresses = useSelector((state) => state.initialData.addresses);
  const columns = useMemo(() => COLUMNS, []);
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState();
  const [user, setUser] = useState("");
  const [address, setAddress] = useState({});
  const [status, setStatus] = useState(1);
  const dispatch = useDispatch();

  const handleShow = (product) => {
    setShow(true);
    setProductId(product);
  };

  useEffect(() => {
    if (productId) {
      const product = data.find((pro) => pro.id === productId);
      setProduct(product);
      if (product.orderStatus[3].isCompleted === true) {
        console.log(product);
        setStatus(3);
      } else if (product.orderStatus[0].isCompleted === false) {
        setStatus(0);
      } else {
        setStatus(1);
      }
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      const user = users.find((u) => u._id === product.user);
      setUser(user);
      const address = addresses.find((add) => (add.user = product.user));
      setAddress(address);
    }
  }, [product]);

  const onOrderComplete = (product) => {
    const payload = {
      orderId: product._id,
      type: "delivered",
    };
    console.log(payload);
    dispatch(updateOrder(payload));
    toast("Order Completed Successfully!", {
      type: "success",
      position: "top-right",
      theme: "colored",
    });
  };
  const onOrderCancel = (product) => {
    const payload = {
      orderId: product._id,
      type: "ordered",
    };
    console.log(payload);
    dispatch(cancelOrder(payload));
    toast("Order has been Cancelled!", {
      type: "error",
      position: "top-right",
      theme: "colored",
    });
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },

    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  //
  const renderOrderDetailsModal = () => {
    return (
      <Modals
        show={show}
        handleClose={() => setShow(false)}
        title={"Product Details"}
        size="lg"
      >
        <Container className="my-3" style={{ fontSize: 12 }}>
          <Row>
            <Col md={4}>
              <div className="d-flex">
                <p style={{ width: 80 }}>Order Id:</p>
                <p className="fw-bold">{product?.id}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex ">
                <p style={{ width: 80 }}>Service:</p>
                <p className="fw-bold">{product?.items[0]?.serviceName}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex ">
                <p style={{ width: 80 }}>Ordered by:</p>
                <p className="fw-bold">{user?.name}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="d-flex">
                <p style={{ width: 80 }}>Price:</p>
                <p className="fw-bold">{product?.totalAmount} Tk.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex ">
                <p style={{ width: 80 }}>Ordered On:</p>
                {product?.createdAt && (
                  <p className="fw-bold">
                    {" "}
                    {format(new Date(product.createdAt), "dd/MM/yyyy")}
                  </p>
                )}
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex ">
                <p style={{ width: 80 }}>Payment Status:</p>
                <p className="fw-bold">{product?.paymentStatus}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="d-flex">
                <p style={{ width: 80 }}>Schedule:</p>
                <p className="fw-bold">{product?.schedule}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex ">
                <p style={{ width: 80 }}>Address:</p>
                {address.address ? (
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <p className="fw-bold mb-0" style={{ width: 65 }}>
                          House No:
                        </p>
                        <p className="fw-bold mb-0">
                          {address?.address[0]?.house} ,
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold mb-0" style={{ width: 65 }}>
                          Road No:
                        </p>
                        <p className="fw-bold mb-0">
                          {address?.address[0]?.road}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex me-5">
                        <p className="fw-bold mb-0" style={{ width: 50 }}>
                          Sector:
                        </p>
                        <p className="fw-bold mb-0">
                          {address?.address[0]?.sector} ,
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold mb-0" style={{ width: 35 }}>
                          Area:
                        </p>
                        <p className="fw-bold mb-0">
                          {address?.address[0]?.area}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <div className="mx-5" style={{ maxWidth: 700, fontSize: 10 }}>
          {status === 0 ? (
            <Stepper
              steps={[{ title: "Order Placed" }, { title: "Order Canceled" }]}
              activeStep={1}
            />
          ) : (
            <Stepper
              steps={[
                { title: "Order Placed" },
                { title: "Order Confirmed" },
                { title: "Order Processing" },
                { title: "Order Completed" },
              ]}
              activeStep={status}
            />
          )}
        </div>
        {status !== 3 && status !== 0 && (
          <div className="my-3 d-flex justify-content-center mt-5">
            <button
              className="complete-order-btn me-5"
              onClick={() => onOrderComplete(product)}
            >
              Complete Order?{" "}
            </button>

            <button
              className="complete-order-btn text-danger"
              onClick={() => onOrderCancel(product)}
            >
              Cancel Order?{" "}
            </button>
            {/* <ToastContainer position="top-center" /> */}
          </div>
        )}
      </Modals>
    );
  };
  return (
    <div className="react-data-table">
      <Container className="mb-3">
        <div className="d-flex justify-content-between">
          <div>
            <input type="text" />
            <input type="submit" value="Search" />
          </div>
          <p className="fw-bold">Total Orders : {data.length}</p>
        </div>
      </Container>
      <Container>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ cursor: "pointer" }}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          onClick: (e) =>
                            handleShow && handleShow(row.cells[0].value),
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="d-flex justify-content-between mt-3"
          style={{ fontSize: 12 }}
        >
          <div>
            <span>
              Showing
              <small className="ms-2">
                {pageIndex * 10 + 1} - {(pageIndex + 1) * 10}
              </small>{" "}
            </span>
          </div>
          <div>
            <span>Page {pageIndex + 1} |</span>
            <button
              className="ms-3"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{" "}
          </div>
        </div>
        {productId && renderOrderDetailsModal()}
        <ToastContainer position="top-center" />
      </Container>
    </div>
  );
};

export default OrderTable;
