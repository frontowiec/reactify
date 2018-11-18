import * as React from "react";
import { FunctionComponent } from "react";
import {
  Grid,
  Paper,
  StyledComponentProps,
  withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import { ArtistMediaButtons } from "../Shared/ArtistMediaButtons";
import { Artist } from "../../types/artist";
import { Img } from "the-platform";

const styles = (theme: any) => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: "90%",
    height: 250
  }
});

const ArtistInfo: FunctionComponent<StyledComponentProps & Props> = ({
  classes,
  artist
}) => (
  <Paper className={classes!.paper}>
    <Grid container direction={"row"}>
      <Grid item xs={3}>
        {/*todo: bez maxDuration Suspense jest bezsensu, bo React i tak czeka na .big-image*/}
        {/*<Suspense
            fallback={
              <Img
                className="MuiAvatar-img-140"
                alt={artist.name}
                src={artist.thumb_url}
                style={{ width: 256, height: 256, filter: "blur(5px)" }}
              />
            }
          >*/}
        <Img
          className="big-image MuiAvatar-img-140"
          alt={artist.name}
          src={artist.image_url}
          style={{ width: 256, height: 256 }}
        />
        {/*</Suspense>*/}
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h2" gutterBottom>
          {artist.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint ista
          Graecorum; Nihilo magis. Duo Reges: constructio interrete. Ergo hoc
          quidem apparet, nos ad agendum esse natos. Magno hic ingenio, sed res
          se tamen sic habet, ut nimis imperiosi philosophi sit vetare
          meminisse. Ne discipulum abducam, times.
        </Typography>
        <ArtistMediaButtons artist={artist} />
      </Grid>
    </Grid>
  </Paper>
);

interface Props {
  artist: Artist;
}

export default withStyles(styles)(ArtistInfo);
