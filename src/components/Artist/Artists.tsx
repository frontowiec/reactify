import { StatelessComponent } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import ArtistItem from "./ArtistItem";
import * as React from "react";
import { StyledComponentProps, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { forkJoin } from "rxjs";
import { first, tap } from "rxjs/operators";
import { compose, lifecycle, withState } from "recompose";
import { Artist } from "../../types/artist";
import { getArtist } from "../../utils/getArtist";
import { Spinner } from "../Shared/Spinner";

const styles = (theme: any) => ({
  root: {
    overflow: "hidden",
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  wrapper: {
    minWidth: 400
  }
});

const Artists: StatelessComponent<
  StyledComponentProps & RouteComponentProps & ArtistsState & LoaderState
> = ({ classes, history, artists, isLoading }) =>
  isLoading ? (
    <Spinner msg="Fetching artists..." />
  ) : (
    <React.Fragment>
      <Typography component="h3" variant="h3" gutterBottom>
        Favorite artists
      </Typography>
      <div className={classes!.root}>
        <div className={classes!.wrapper}>
          {artists.map((artist, index) => (
            <ArtistItem
              key={index}
              artist={artist}
              onShowDetails={artist =>
                history.push(`/artists/${artist.name}/events`)
              }
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );

function getArtists(callback: (artists: Artist[]) => void) {
  const favoriteArtists = [
    "metalica",
    "buckethead",
    "steve vai",
    "slash",
    "ludovico einaudi"
  ];

  const favoriteArtistsRequest = favoriteArtists.map(getArtist);

  forkJoin(favoriteArtistsRequest)
    .pipe(
      first(),
      tap((artists: Artist[]) => callback(artists))
    )
    .subscribe();
}

const enhance = compose<
  StyledComponentProps & RouteComponentProps & ArtistsState & LoaderState,
  {}
>(
  withStyles(styles),
  withState("artists", "setArtists", []),
  withState("isLoading", "setLoading", false),
  lifecycle<ArtistsState & LoaderState, {}>({
    componentDidMount() {
      this.props.setLoading(true);
      getArtists(artists => {
        this.props.setArtists(artists);
        this.props.setLoading(false);
      });
    }
  })
);

interface ArtistsState {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
}

interface LoaderState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export default enhance(Artists);
