import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
