import * as React from "react";
import { StatelessComponent } from "react";
import {
  Grid,
  Paper,
  StyledComponentProps,
  Typography,
  withStyles
} from "@material-ui/core";
import { getJSON } from "../../ajax/getJSON";
import { unstable_createResource } from "react-cache";

const EventsResource = unstable_createResource((artistName: string) =>
  getJSON(
    `https://rest.bandsintown.com/artists/${artistName}/events?app_id=123`
  ).then(({ response }) => response)
);

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: "90%"
  }
});

const EventsList: StatelessComponent<StyledComponentProps & Props> = ({
  classes,
  artistName
}) => {
  const events: EventDetail[] = EventsResource.read(artistName);

  return (
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
};

interface Props {
  artistName: string;
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

export default withStyles(styles)(EventsList);
