import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";

import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
} from "@material-ui/icons";

import { connect } from "react-redux";

import { markNotificationsRead } from "../../redux/auth/authActions";

dayjs.extend(relativeTime);

const Notifications = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onMenuOpened = () => {
    // when you expand notifications menus >> automaticaly marked as read (like Twitter)
    const unreadNotificationsIds = props.notifications &&
      props.notifications
        .filter((notification) => !notification.read) // give me unRead notification which (read: false)
        .map((notification) => notification.id); // give me the id values only ([4, 7, 1])

    // make them as read (which result in > read: true)
    props.dispatch(markNotificationsRead(unreadNotificationsIds));
  };

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {props.notifications
            ? (
              <Badge
                badgeContent={props.notifications.filter(
                  (notification) => notification.read === false,
                ).length}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            )
            : (
              <NotificationsIcon />
            )}
        </IconButton>
      </Tooltip>

      {/*  MENU */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {!(props.notifications && props.notifications.length > 0)
          ? (
            <MenuItem onClick={handleClose}>
              You have no notifications yet
            </MenuItem>
          )
          : (
            props.notifications &&
            props.notifications.map((notification) => {
              const verb = notification.type === "like"
                ? "liked"
                : "commented on";
              const time = dayjs(notification.createdat).fromNow();
              const iconColor = notification.read ? "primary" : "secondary";
              const icon = notification.type === "like"
                ? (
                  <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                )
                : (
                  <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                );

              return (
                <MenuItem key={notification.createdat} onClick={handleClose}>
                  {icon}
                  <Typography
                    component={Link}
                    color="primary"
                    variant="body1"
                    to={`/users/${props.user &&
                      props.user.username}/woof/${notification.woof_id}`}
                  >
                    {notification.sender}
                    {" "}
                    {verb} your woof {time}
                  </Typography>
                </MenuItem>
              );
            })
          )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  notifications: state.auth.notifications,
});

export default connect(mapStateToProps)(Notifications);
