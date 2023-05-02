import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={"/main"} />}
    </Route>
  );
}

export default ProtectedRoute;
