import * as React from "react";
import { StatelessComponent } from "react";
import {
  CircularProgress,
  Grid,
  Paper,
  StyledComponentProps,
  Typography,
  withStyles
} from "@material-ui/core";
import { compose, lifecycle, withState } from "recompose";
import { ajax } from "rxjs/ajax";
import { getJSON } from "../../ajax/getJSON";

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: "90%"
  }
});

const EventsList: StatelessComponent<
  StyledComponentProps & EventsState & LoaderState & Props
> = ({ classes, events, isLoading }) =>
  isLoading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        Upcoming Events
      </Typography>
      {events.map((event, index) => (
        <Paper className={classes!.paper} key={index}>
          <Grid container direction={"row"} justify={"space-between"}>
            <section>{event.datetime}</section>
            <section>
              {event.venue.city} {event.venue.region} {event.venue.country}
            </section>
            <section>Offers: {event.offers.length}</section>
          </Grid>
        </Paper>
      ))}
    </React.Fragment>
  );

const enhance = compose<
  EventsState & StyledComponentProps & LoaderState & Props,
  Props
>(
  withStyles(styles),
  withState("events", "setEvents", []),
  withState("isLoading", "setLoading", true),
  lifecycle<EventsState & LoaderState & Props, {}>({
    componentDidMount() {
      this.props.setLoading(true);
      getJSON(
        `https://rest.bandsintown.com/artists/${
          this.props.artistName
        }/events?app_id=123`
      )
        .then(({ response }) => response)
        .then(events => {
          this.props.setEvents(events);
          this.props.setLoading(false);
        });
    }
  })
);

interface Props {
  artistName: string;
}

interface EventsState {
  events: EventDetail[];
  setEvents: (events: EventDetail[]) => void;
}

interface LoaderState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

interface Venue {
  country: string;
  city: string;
  latitude: string;
  name: string;
  region: string;
  longitude: string;
}

interface Offer {
  type: string;
  url: string;
  status: string;
}

interface EventDetail {
  id: string;
  artist_id: string;
  url: string;
  on_sale_datetime: Date | string;
  datetime: Date | string;
  description: string;
  venue: Venue;
  lineup: string[];
  offers: Offer[];
}

export default enhance(EventsList);
