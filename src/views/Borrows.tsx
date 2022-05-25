import React, {FC, ReactElement} from "react";
import {Grid} from "@mui/material";
import {InfoBorrows} from "../components/borrows";

export const Borrows: FC<any> = (): ReactElement => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <InfoBorrows/>
      </Grid>
    </Grid>
  );
};