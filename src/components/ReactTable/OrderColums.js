import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "items[0].serviceName",
    sticky: "left",
  },
  {
    Header: "User ID",
    Footer: "User ID",
    accessor: "user",
    sticky: "left",
  },
  {
    Header: "Price",
    Footer: "Price",
    accessor: "totalAmount",
  },
  {
    Header: "Payment Status",
    Footer: "Payment Status",
    accessor: "paymentStatus",
  },
  {
    Header: "Ordered On",
    Footer: "Ordered On",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Schedule",
    Footer: "Schedule",
    accessor: "schedule",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
