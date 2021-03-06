import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../Header/Header';

const PrivetRout = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext);
  return (
      <Route
          {...rest}
          render={({ location }) =>
              loggedInUser.name ? (
                  children
              ) : (
                      <Redirect
                          to={{
                              pathname: "/login",
                              state: { from: location }
                          }}
                      />
                  )
          }
      />
  );
};

export default PrivetRout;