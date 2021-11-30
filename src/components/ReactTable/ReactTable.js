import React, { useMemo } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usePagination, useSortBy, useTable } from "react-table";
import { COLUMNS } from "./Columns";

const ReactTable = () => {
  const users = useSelector((state) => state.initialData);
  const columns = useMemo(() => COLUMNS, []);
  const data = users.users;

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
  return (
    <div className="react-data-table">
      <Container className="mb-3">
        <div className="d-flex justify-content-between">
          <div>
            <input type="text" />
            <input type="submit" value="Search" />
            {/* <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Search User</Form.Label>
                <Form.Control type="text" className="shadow-none" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form> */}
          </div>
          <p className="fw-bold">Total Users : {users.users.length}</p>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
      </Container>
    </div>
  );
};

export default ReactTable;
