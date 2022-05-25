import React, {FC, ReactElement} from "react";
import {Grid} from "@mui/material";
import {InfoUsers} from "../components/users";

export const Users: FC<any> = (): ReactElement => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <InfoUsers/>
      </Grid>
    </Grid>
  );
};