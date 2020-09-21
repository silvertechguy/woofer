import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/button";
import AddWoof from "../../woof/add-woof";
import Notifications from "../../notifications/notifications";

import { connect } from "react-redux";

import { AppBar, Button, Toolbar } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";

const Navbar = (props) => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {props.isAuthenticated ? (
          <>
            <AddWoof />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
