import * as React from "react";
import { lazy, StatelessComponent, Fragment, Suspense } from "react";
import { RouteComponentProps } from "react-router";
import { StyledComponentProps, withStyles } from "@material-ui/core";
import { Spinner } from "../Shared/Spinner";

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
    <Suspense fallback={<Spinner msg="Fetch events..." />} maxDuration={1500}>
      <EventsList artistName={match.params.artistName} />
    </Suspense>
  </Fragment>
);

export default withStyles(styles)(EventDetails);
