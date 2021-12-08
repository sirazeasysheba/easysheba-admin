import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";

const Home = (props) => {
  const service = useSelector((state) => state.service);
  const orders = useSelector((state) => state.initialData.orders);
  const users = useSelector((state) => state.initialData);
  // console.log(service, categories);
  const createServiceList = (services, options = []) => {
    for (let service of services) {
      if (service.children) {
        for (let serve of service.children) {
          options.push(serve);
        }
      }
    }
    return options;
  };

  return (
    <div>
      <Layout sidebar>
        <h3 className="text-center border-bottom py-3">Admin DashBoard</h3>
        <Container>
          <Row className="mt-3">
            <Col md={3} className="py-2  text-center">
              <div
                className="py-2 shadow-lg rounded"
                style={{ background: "#333333" }}
              >
                <h5
                  className="mb-0 pb-0 text-white mt-1"
                  style={{ lineHeight: 1 }}
                >
                  {createServiceList(service.services).length}+
                </h5>
                <h5 className="mt-0 text-white">Services</h5>
              </div>
            </Col>
            <Col md={3} className="py-2 text-center">
              <div className="py-2 rounded" style={{ background: "#333333" }}>
                <h5
                  className="mb-0 pb-0 text-white mt-1"
                  style={{ lineHeight: 1 }}
                >
                  {users.users.length}+
                </h5>
                <h5 className="mt-0 text-white">Users</h5>
              </div>
            </Col>
            <Col md={3} className="py-2 text-center">
              <div className="py-2 rounded" style={{ background: "#333333" }}>
                <h5
                  className="mb-0 pb-0 text-white mt-1"
                  style={{ lineHeight: 1 }}
                >
                  {orders.length}+
                </h5>
                <h5 className="mt-0 text-white">Order Served</h5>
              </div>
            </Col>
            <Col md={3} className="py-2 text-center">
              <div className="py-2 rounded" style={{ background: "#333333" }}>
                <h5
                  className="mb-0 pb-0 text-white mt-1"
                  style={{ lineHeight: 1 }}
                >
                  500+
                </h5>
                <h5 className="mt-0 text-white">Five Star Ratings</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
