import { StatelessComponent } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import * as React from "react";
import {
  IconButton,
  StyledComponentProps,
  Tooltip,
  withStyles
} from "@material-ui/core";
import "./artistItem.css";
import { Artist } from "../../types/artist";
import {ArtistMediaButtons} from "../Shared/ArtistMediaButtons";

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  }
});

const ArtistItem: StatelessComponent<StyledComponentProps & Props> = props => (
  <Tooltip title="Show details" placement={"right"}>
    <Paper
      className={props.classes!.paper + " artist-item"}
      onClick={() => props.onShowDetails(props.artist)}
    >
      <Grid container wrap="nowrap" spacing={16}>
        <Grid item>
          <Avatar src={props.artist.thumb_url} />
        </Grid>
        <Grid item xs>
          <Grid
            container
            justify={"space-between"}
            alignItems={"center"}
            direction={"row"}
            style={{ minWidth: 250 }}
          >
            <Typography variant="h6" gutterBottom>
              {props.artist.name}
            </Typography>
            <ArtistMediaButtons artist={props.artist}/>
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            upcoming event: {props.artist.upcoming_event_count}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Tooltip>
);

interface Props {
  artist: Artist;
  onShowDetails: (artist: Artist) => void;
}

export default withStyles(styles)(ArtistItem);
