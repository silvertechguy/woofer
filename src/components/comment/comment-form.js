import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { addComment } from "../../redux/woof/woofActions";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}));

const CommentForm = (props) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (props.woof.errors) setErrors(props.woof.errors);
    if (!props.woof.errors && !props.woof.loading) {
      setBody("");
      setErrors(null);
    }
  }, [props.woof]);

  const classes = useStyles();

  return (
    props.isAuthenticated && (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.dispatch(addComment(props.id, { body }));
          }}
        >
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors && errors.body ? true : false}
            helperText={errors && errors.body}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    )
  );
};

const mapStateToProps = (state) => ({
  woof: state.woof,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CommentForm);
