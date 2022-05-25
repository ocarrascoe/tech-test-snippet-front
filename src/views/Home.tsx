import React, {FC, ReactElement} from "react";
import {Grid, Typography} from "@mui/material";
import {InfoHome} from "../components/home";


export const Home: FC<any> = (): ReactElement => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" align='center'>¡Bienvenidos!</Typography>
      </Grid>
      <Grid item xs={12}>
        <InfoHome/>
      </Grid>
    </Grid>
  );
};