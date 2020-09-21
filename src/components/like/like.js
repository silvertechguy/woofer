import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../layout/button/button";

import { connect } from "react-redux";
import { likeWoof, unLikeWoof } from "../../redux/woofs/woofsActions";

// import { makeStyles } from "@material-ui/core/styles";
import { Favorite as FavoriteIcon, FavoriteBorder } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   ...theme.spreadThis,
//   card: {
//     position: "relative",
//     display: "flex",
//     marginBottom: 20,
//   },
//   image: {
//     minWidth: 200,
//   },
//   content: {
//     padding: 25,
//     objectFit: "cover",
//   },
//   deleteButton: {
//     position: "absolute",
//     left: "90%",
//     top: "10%",
//   },
// }));

const Like = (props) => {
  return !props.auth.isAuthenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : props.auth.user &&
    props.auth.user.likes.find((like) => like.id === props.id) ? (
    <MyButton
      tip="Undo like"
      onClick={() => props.dispatch(unLikeWoof(props.id))}
    >
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={() => props.dispatch(likeWoof(props.id))}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Like);
