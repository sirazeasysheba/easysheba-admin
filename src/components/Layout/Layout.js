import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={`/home`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={`/category`}>Category</NavLink>
                </li>
                <li>
                  <NavLink to={`/services`}>Services</NavLink>
                </li>
                <li>
                  <NavLink to={`/products`}>Products</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: 60 }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </div>
  );
};

export default Layout;
