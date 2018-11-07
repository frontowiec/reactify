import * as React from "react";
import { StatelessComponent } from "react";
import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  StyledComponentProps,
  withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import { ArtistMediaButtons } from "../Shared/ArtistMediaButtons";
import { Artist } from "../../types/artist";
import { compose, lifecycle, withState } from "recompose";
import { getArtist } from "../../utils/getArtist";

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: "90%",
    height: 250
  }
});

const ArtistInfo: StatelessComponent<
  StyledComponentProps & ArtistState & LoaderState & Props
> = ({ classes, artist, isLoading }) =>
  isLoading ? (
    <CircularProgress />
  ) : (
    <Paper className={classes!.paper}>
      <Grid container direction={"row"}>
        <Grid item xs={3}>
          <Avatar
            alt={artist.name}
            src={artist.image_url}
            style={{ width: 256, height: 256 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h2" gutterBottom>
            {artist.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint ista
            Graecorum; Nihilo magis. Duo Reges: constructio interrete. Ergo hoc
            quidem apparet, nos ad agendum esse natos. Magno hic ingenio, sed
            res se tamen sic habet, ut nimis imperiosi philosophi sit vetare
            meminisse. Ne discipulum abducam, times.
          </Typography>
          <ArtistMediaButtons artist={artist} />
        </Grid>
      </Grid>
    </Paper>
  );

const enhance = compose<ArtistState & LoaderState & Props, Props>(
  withStyles(styles),
  withState("artist", "setArtist", null),
  withState("isLoading", "setLoading", true),
  lifecycle<ArtistState & LoaderState & Props, {}>({
    componentDidMount() {
      this.props.setLoading(true);
      getArtist(this.props.artistName)
        .toPromise()
        .then(artist => {
          this.props.setArtist(artist);
          this.props.setLoading(false);
        });
    }
  })
);

interface ArtistState {
  artist: Artist;
  setArtist: (artist: Artist) => void;
}

interface Props {
  artistName: string;
}

interface LoaderState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export default enhance(ArtistInfo);