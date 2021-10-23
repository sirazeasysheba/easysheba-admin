import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Input from "../components/UI/Input";
import { login } from "../redux/actions";
const Login = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Redirect to={`/home`} />;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          const user = values;
          dispatch(login(user));
        }}
      >
        {(formik) => (
          <div className="mb-5  form-wrapper px-2" style={{ marginTop: 80 }}>
            <h3 className="text-center mb-2">EasySheba Admin </h3>
            <p className="text-center text-muted">Login to continue</p>
            <div>
              <div className="d-flex justify-content-center">
                <Form>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="abc@xyz.com"
                    name="email"
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="*******"
                    name="password"
                    //onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="mb-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckIndeterminate"
                      style={{ fontSize: 14 }}
                    >
                      Remember me?
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-100 fw-medium shadow-none bg-success"
                  >
                    Login
                  </Button>
                </Form>
              </div>

              <div
                className="d-flex justify-content-center mt-3"
                style={{ fontSize: 14 }}
              >
                <div>
                  <p className="text-center">
                    {" "}
                    <Link
                      to="/forget-password"
                      className="fw-medium text-danger"
                    >
                      Forget Password?
                    </Link>
                  </p>
                  <p className="text-muted text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="fw-medium ">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
