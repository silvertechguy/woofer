import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/layout/navbar/navbar";
import UserDetails from "./components/user/user-details";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

import { connect } from "react-redux";
import { loadAuthUser } from "./redux/auth/authActions";
import { getWoofs } from "./redux/woofs/woofsActions";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import themeObject from "./utils/theme";
const theme = createMuiTheme(themeObject);

const App = (props) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    props.dispatch(loadAuthUser());
  }, []);

  useEffect(() => {
    props.dispatch(getWoofs());
    return () => {};
  }, []);

  const auth = props.auth;

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => {
              return auth.isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} />
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={(props) => {
              return auth.isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <Signup {...props} />
              );
            }}
          />
          <Route
            exact
            path="/users/:username"
            render={(props) => <UserDetails {...props} />}
          />
          <Route
            exact
            path="/users/:username/woof/:woofId"
            render={(props) => <UserDetails {...props} />}
          />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
