import * as React from "react";
import { lazy, StatelessComponent, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { StyledComponentProps, withStyles } from "@material-ui/core";

const ArtistInfo = lazy(() => import("./ArtistInfo"));
const EventsList = lazy(() => import("./EventsList"));

const styles = () => ({
  eventsList: {
    marginTop: 20
  }
});

const EventDetails: StatelessComponent<
  StyledComponentProps & RouteComponentProps<{ artistName: string }>
> = ({ match }) => (
  <Fragment>
    <ArtistInfo artistName={match.params.artistName} />
    <EventsList artistName={match.params.artistName} />
  </Fragment>
);

export default withStyles(styles)(EventDetails);
