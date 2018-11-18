import * as React from "react";
import { StatelessComponent } from "react";
import {
  Grid,
  Paper,
  StyledComponentProps,
  Typography,
  withStyles
} from "@material-ui/core";
import { EventDetail } from "./EventDetails";

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: "90%"
  }
});

const EventsList: StatelessComponent<StyledComponentProps & Props> = ({
  classes,
  events
}) => (
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

interface Props {
  events: EventDetail[];
}

export default withStyles(styles)(EventsList);
