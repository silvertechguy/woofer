import React, { useEffect, useState } from "react";
import MyButton from "../layout/button/button";

import { connect } from "react-redux";
import { addWoof } from "../../redux/woofs/woofsActions";
import { clearUIErrors } from "../../redux/ui/uiActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
}));

const AddWoof = (props) => {
  const [state, setState] = useState({ open: false, body: "", errors: null });

  const { open, body, errors } = state;

  useEffect(() => {
    if (props.ui.errors)
      setState((pre) => ({ ...pre, errors: props.ui.errors }));

    if (!props.ui.errors && !props.ui.loading) {
      setState((pre) => ({ ...pre, open: false, body: "", errors: null }));
    }
  }, [props.ui]);

  const classes = useStyles();

  return (
    <>
      <MyButton
        onClick={() => setState((pre) => ({ ...pre, open: true }))}
        tip="Add a Woof!"
      >
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => {
          setState((pre) => ({ ...pre, open: false, errors: null }));
          props.dispatch(clearUIErrors());
        }}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={() => {
            setState((pre) => ({ ...pre, open: false, errors: null }));
            props.dispatch(clearUIErrors());
          }}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a new woof</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              props.dispatch(addWoof({ body }));
            }}
          >
            <TextField
              name="body"
              type="text"
              label="WOOF!!"
              multiline
              rows="3"
              placeholder="Woof at your fellows"
              error={errors && errors.body ? true : false}
              helperText={errors && errors.body}
              className={classes.textField}
              onChange={(event) => {
                const value = event.target.value;
                setState((pre) => ({ ...pre, body: value }));
              }}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={props.ui.loading}
            >
              Submit
              {props.ui.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({ ui: state.ui });

export default connect(mapStateToProps)(AddWoof);
