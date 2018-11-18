import { StatelessComponent } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import ArtistItem from "./ArtistItem";
import * as React from "react";
import { StyledComponentProps, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { forkJoin } from "rxjs";
import { Artist } from "../../types/artist";
import { getArtist } from "../../utils/getArtist";
import { unstable_createResource } from "react-cache";

const ArtistsResource = unstable_createResource(() => getArtists());

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
  StyledComponentProps & RouteComponentProps
> = ({ classes, history }) => {
  const artists: Artist[] = ArtistsResource.read();

  return (
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
};

function getArtists(): Promise<Artist[]> {
  const favoriteArtists = [
    "metalica",
    "buckethead",
    "steve vai",
    "slash",
    "ludovico einaudi"
  ];

  const favoriteArtistsRequest = favoriteArtists.map(getArtist);

  return forkJoin(favoriteArtistsRequest).toPromise();
}

export default withStyles(styles)(Artists);
