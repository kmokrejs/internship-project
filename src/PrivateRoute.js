import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth2";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext); // returns value that is passed to Provider in Auth2.js
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (       // if we have user, render component
          <RouteComponent {...routeProps} />
        ) : ( 
          <Redirect to={"/login"} />   // if there is no user, redirect to /login page
        )
      }
    />
  );
};


export default PrivateRoute