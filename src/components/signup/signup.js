import React, { useState, useEffect } from "react";
import AppIcon from "../../assets/icon.png";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { register } from "../../redux/auth/authActions";
import { clearUIErrors } from "../../redux/ui/uiActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ ...theme.spread }));

const Signup = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
  });

  const { email, password, username, confirmpassword } = formData;

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setErrors({ ...props.ui.errors });
  }, [props.ui.errors]);

  useEffect(() => {
    return () => props.dispatch(clearUIErrors());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(register({ email, username, password, confirmpassword }));
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          SignUp
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
            fullWidth
            error={errors && errors.email && (errors.email ? true : false)}
            helperText={errors && errors.email && errors.email}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
            error={errors && errors.password && errors.password ? true : false}
            helperText={errors && errors.password && errors.password}
          />
          <TextField
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            label="Confrim Password"
            className={classes.textField}
            value={confirmpassword}
            onChange={handleChange}
            fullWidth
            error={
              errors && errors.confirmpassword && errors.confirmpassword
                ? true
                : false
            }
            helperText={
              errors && errors.confirmpassword && errors.confirmpassword
            }
          />
          <TextField
            id="username"
            type="text"
            name="username"
            label="Username"
            className={classes.textField}
            value={username}
            onChange={handleChange}
            fullWidth
            error={errors && errors.username && errors.username ? true : false}
            helperText={errors && errors.username && errors.username}
          />
          {errors && errors.msg && (
            <Typography variant="body2" className={classes.customError}>
              {errors.msg}
            </Typography>
          )}
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={props.ui.loading}
          >
            SignUp
            {props.ui.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(Signup);
