import React, { useState, useEffect } from "react";
import AppIcon from "../../assets/icon.png";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../redux/auth/authActions";
import { clearUIErrors } from "../../redux/ui/uiActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ ...theme.spreadThis }));

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(login({ email, password }));
  };

  const loading = props.ui.loading;

  const [errors, setErrors] = useState(null);
  useEffect(() => {
    setErrors({ ...props.ui.errors });
  }, [props.ui.errors]);

  useEffect(() => {
    return () => props.dispatch(clearUIErrors());
  }, []);

  const classes = useStyles();

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            error={
              errors && errors.password && (errors.password ? true : false)
            }
            helperText={errors && errors.password && errors.password}
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
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account ? sign up <Link to="/signup">here</Link>
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

export default connect(mapStateToProps)(Login);
