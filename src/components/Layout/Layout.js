import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
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
                  <NavLink to={`/products`}>Sub-Services</NavLink>
                </li>
                <li>
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="accordion-header shadow-none">
                        Details
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          <li>
                            <NavLink to={`/user`}>User</NavLink>
                          </li>
                          <li>
                            <NavLink to={`/category`}>Category</NavLink>
                          </li>
                          <li>
                            <NavLink to={`/services`}>Services</NavLink>
                          </li>
                          <li>
                            <NavLink to={`/products`}>Sub-Services</NavLink>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
