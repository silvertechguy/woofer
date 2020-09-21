import React, { useRef } from "react";
import { Link } from "react-router-dom";
import MyButton from "../layout/button/button";
import dayjs from "dayjs";
import EditUser from "./edit-user";
import ProfileSkeleton from "../skeletons/profile-skeleton";

import { connect } from "react-redux";
import { logout, uploadImage } from "../../redux/auth/authActions";

import { makeStyles } from "@material-ui/core/styles";
import { Link as MUILink, Paper, Typography, Button } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({ ...theme.spreadThis }));

const User = (props) => {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    props.dispatch(uploadImage(formData));
  };

  const imageInputRef = useRef();
  const handleEditPicture = () => imageInputRef.current.click();

  const handleLogout = () => props.dispatch(logout());

  const {
    auth: { user, isAuthenticated, loading },
  } = props;

  const classes = useStyles();

  return !loading ? (
    isAuthenticated ? (
      user && (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={user.imageurl}
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                accept="image/*"
                id="imageInput"
                ref={imageInputRef}
                hidden="hidden"
                onChange={handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MUILink
                component={Link}
                to={`/users/${user.username}`}
                color="primary"
                variant="h5"
              >
                @{user.username}
              </MUILink>
              <hr />
              {user.bio && <Typography variant="body2">{user.bio}</Typography>}
              <hr />
              {user.location && (
                <>
                  <LocationOn color="primary" /> <span>{user.location}</span>
                  <hr />
                </>
              )}
              {user.website && (
                <>
                  <LinkIcon color="primary" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {user.website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(user.createdat).format("MMM YYYY")}</span>
            </div>
            <MyButton tip="Logout" onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditUser />
          </div>
        </Paper>
      )
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(User);
