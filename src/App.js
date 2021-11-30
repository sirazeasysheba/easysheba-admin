import { Route, Switch } from "react-router";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./styles/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInitialData, isUserLoggedIn } from "./redux/actions";
import Home from "./pages/Home";
import Category from "./components/Category/Category";
import Orders from "./components/Orders/Orders";
import Product from "./components/Product/Product";
import Services from "./components/Services/Services";
import User from "./pages/User";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

    dispatch(getInitialData());
  }, []);
  return (
    <div className="App">
      <Layout />
      <Switch>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/category">
          <Category />
        </PrivateRoute>
        <PrivateRoute exact path="/services">
          <Services />
        </PrivateRoute>
        <PrivateRoute exact path="/products">
          <Product />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <Orders />
        </PrivateRoute>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/user">
          <User />
        </PrivateRoute>
      </Switch>
    </div>
  );
}
export default App;
