import React, { useState, useEffect } from "react";
import MyButton from "../layout/button/button";

import { connect } from "react-redux";
import { updateProfile } from "../../redux/auth/authActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
}));

const EditUser = (props) => {
  const [data, setData] = useState({
    bio: "",
    website: "",
    location: "",
    open: false,
  });

  useEffect(() => {
    const {
      auth: {
        user: { bio, website, location },
      },
    } = props;

    setData({
      ...data,
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : "",
    });
  }, []);

  const handleOpen = () => {
    const {
      auth: {
        user: { bio, website, location },
      },
    } = props;

    setData({
      ...data,
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : "",
      open: true,
    });
  };

  const handleClose = () => {
    setData({
      ...data,
      open: false,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    props.dispatch(
      updateProfile({
        bio: data.bio,
        website: data.website,
        location: data.location,
      })
    );
    handleClose();
  };

  const classes = useStyles();

  return (
    <>
      <MyButton
        tip="Edit Profile"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={data.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={data.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={data.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={data.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(EditUser);
