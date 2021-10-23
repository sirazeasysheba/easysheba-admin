import React from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute({ children, ...rest }) {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
