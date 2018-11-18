import * as React from "react";
import { lazy, StatelessComponent, Suspense, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import {
  CircularProgress,
  StyledComponentProps,
  withStyles
} from "@material-ui/core";

const ArtistInfo = lazy(() => import("./ArtistInfo"));
const EventsList = lazy(() => import("./EventsList"));

const styles = (theme: any) => ({
  eventsList: {
    marginTop: 20
  }
});

const EventDetails: StatelessComponent<
  StyledComponentProps & RouteComponentProps<{ artistName: string }>
> = ({ match, classes }) => (
  <Fragment>
    <ArtistInfo artistName={match.params.artistName} />
    <EventsList artistName={match.params.artistName} />
  </Fragment>
);

export default withStyles(styles)(EventDetails);


// todo: a co jeśli ten komponent zaciągałby dane i potem renderował widok?? <--- mało elastyczne rozwiązanie