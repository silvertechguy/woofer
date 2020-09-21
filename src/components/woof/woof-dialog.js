import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../layout/button/button";
import Like from "../like/like";
import Comments from "../comment/comments";
import CommentForm from "../comment/comment-form";

import { connect } from "react-redux";
import {
  getWoof,
  // clearWoofErrors,
  // clearWoof,
} from "../../redux/woof/woofActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  UnfoldMore,
  Chat as ChatIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
}));

const WoofDialog = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({ open: false, oldPath: "", newPath: "" });

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const newPath = `/users/${props.username}/woof/${props.id}`;

    if (oldPath === newPath) oldPath = `/users/${props.username}`;

    window.history.pushState(null, null, newPath);

    setState({ open: true, oldPath, newPath });

    props.dispatch(getWoof(props.id));
  };

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    setState({ open: false });

    return () => {};
    // dispatch(clearWoofErrors());
    // dispatch(clearWoof());
  };

  useEffect(() => {
    if (props.openDialog) handleOpen();
  }, []);

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand woof"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {props.woof.loading ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress size={200} thickness={2} />
            </div>
          ) : (
            <Grid container spacing={10}>
              <Grid item sm={5}>
                <img
                  src={props.woof.woof && props.woof.woof.imageurl}
                  alt="Profile"
                  className={classes.profileImage}
                />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
                  to={`/users/${props.woof.woof && props.woof.woof.username}`}
                >
                  @{props.woof.woof && props.woof.woof.username}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                  {dayjs(props.woof.woof && props.woof.woof.createdat).format(
                    "h:mm a, MMMM DD YYYY"
                  )}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">
                  {props.woof.woof && props.woof.woof.body}
                </Typography>
                <Like id={props.woof.woof && props.woof.woof.id} />
                <span>{props.likescount} likes</span>
                <MyButton tip="comments">
                  <ChatIcon color="primary" />
                </MyButton>
                <span>
                  {props.woof.woof && props.woof.woof.commentscount} comments
                </span>
              </Grid>
              <hr className={classes.visibleSeparator} />
              <CommentForm id={props.woof.woof && props.woof.woof.id} />
              <Comments
                comments={props.woof.woof && props.woof.woof.comments}
              />
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({ woof: state.woof });

export default connect(mapStateToProps)(WoofDialog);
