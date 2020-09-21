import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
}));

const Comments = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      {props.comments &&
        props.comments.map((comment, index) => {
          const { body, createdat, imageurl, username } = comment;

          return (
            <Fragment key={createdat}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={imageurl}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${username}`}
                        color="primary"
                      >
                        {username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdat).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== props.comments && props.comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
    </Grid>
  );
};

export default Comments;
