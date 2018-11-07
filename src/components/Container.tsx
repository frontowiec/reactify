import * as React from "react";
import { CSSProperties, StatelessComponent } from "react";
import Grid from "@material-ui/core/Grid/Grid";

const styles: CSSProperties = {
  backgroundColor: "#212121",
  minHeight: "100vh"
};

export const Container: StatelessComponent = props => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    style={styles}
  >
    {props.children}
  </Grid>
);
