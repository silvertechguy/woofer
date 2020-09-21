import React, { useEffect } from "react";
import Woof from "../woof/woof";
import User from "../user/user";
import WoofSkeleton from "../skeletons/woof-skeleton";

import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

const Home = (props) => {
  const { woofs, loading } = props.woofs;

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={8}>
        {!loading ? (
          woofs && woofs.map((woof) => <Woof key={woof.id} {...woof} />)
        ) : (
          <WoofSkeleton />
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <User />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({ woofs: state.woofs });

export default connect(mapStateToProps)(Home);
