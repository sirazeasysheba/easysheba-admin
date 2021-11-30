import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import ReactTable from "../components/ReactTable/ReactTable";

const User = () => {
  const users = useSelector((state) => state.initialData);
  console.log(users);
  return (
    <div>
      <Layout sidebar>
        <h1 className="text-center">User</h1>
        <ReactTable />
      </Layout>
    </div>
  );
};

export default User;
