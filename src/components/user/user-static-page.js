import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Link as MuiLink, Paper, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}));

const UserStaticPage = (props) => {
  const {
    user: { username, createdat, imageurl, bio, website, location },
  } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageurl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdat).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

export default UserStaticPage;
