import React from "react";
import Layout from "../Layout/Layout";
import OrderTable from "../ReactTable/OrderTable";

const Orders = () => {
  return (
    <div>
      <Layout sidebar>
        <h2>Orders</h2>
        <OrderTable />
      </Layout>
    </div>
  );
};

export default Orders;
