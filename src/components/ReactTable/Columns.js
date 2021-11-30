import { format } from "date-fns";
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "_id",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    sticky: "left",
  },
  {
    Header: "User Name",
    Footer: "User Name",
    accessor: "username",
    sticky: "left",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "contactNumber",
  },
  {
    Header: "Created On",
    Footer: "Created On",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
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
