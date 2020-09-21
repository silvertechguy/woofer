import React, { useEffect, useState } from "react";
import UserWoof from "../woof/user-woof";
import UserStaticPage from "./user-static-page";
import WoofSkeleton from "../skeletons/woof-skeleton";
import ProfileSkeleton from "../skeletons/profile-skeleton";

import { connect } from "react-redux";
import { getUserDetails, clearUserDetails } from "../../redux/user/userActions";

import Grid from "@material-ui/core/Grid";

const UserDetails = (props) => {
  const [user, setUser] = useState(null);
  const [woofIdParam, setWoofIdParam] = useState(null);

  useEffect(() => {
    if (!props.user.loading && props.user.userDetails) {
      setUser(props.user.userDetails);
    }
  }, [props.user]);

  const woofId = props.match.params.woofId;
  const username = props.match.params.username;

  useEffect(() => {
    if (woofId) setWoofIdParam(woofId);

    props.dispatch(getUserDetails(username));

    return () => props.dispatch(clearUserDetails());
  }, [woofId, username]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {props.user.loading ? (
          <WoofSkeleton />
        ) : (user && user.woofs === null) || (user && !user.woofs.length) ? (
          <p>No woofs from this user</p>
        ) : !woofIdParam ? (
          user &&
          user.woofs.map((woof) => <UserWoof key={woof.id} woof={woof} />)
        ) : (
          user &&
          user.woofs.map((woof) =>
            woof.id === woofIdParam ? (
              <UserWoof key={woof.id} woof={woof} openDialog />
            ) : (
              <UserWoof key={woof.id} woof={woof} />
            )
          )
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {user === null ? <ProfileSkeleton /> : <UserStaticPage user={user} />}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(UserDetails);
