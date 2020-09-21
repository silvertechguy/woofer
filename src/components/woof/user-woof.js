import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../layout/button/button";
import WoofDialog from "./woof-dialog";
import Like from "../like/like";

import { connect } from "react-redux";
import { deleteWoof } from "../../redux/woofs/woofsActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { Chat as ChatIcon, DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
}));

dayjs.extend(relativeTime);

const UserWoof = (props) => {
  const [open, setOpen] = useState(false);

  const handleDeleteWoof = () => {
    props.dispatch(deleteWoof(props.woof.id));
    setOpen(false);
  };

  const {
    id,
    body,
    username,
    likescount,
    commentscount,
    imageurl,
    createdat,
  } = props.woof;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        image={imageurl}
        title="User image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${username}`}
          color="primary"
        >
          {username}
        </Typography>
        {props.auth.isAuthenticated && props.auth.user.username === username && (
          <>
            <MyButton
              tip="Delete woof"
              onClick={() => setOpen(true)}
              btnClassName={classes.deleteButton}
            >
              <DeleteOutline color="secondary" />
            </MyButton>
            <Dialog
              open={open}
              onClick={() => setOpen(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                Are you sure you want to delete this scream ?
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteWoof} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdat).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <Like id={id} />
        <span>{likescount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentscount} comments</span>
        <WoofDialog
          id={id}
          username={username}
          likescount={likescount}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(UserWoof);
