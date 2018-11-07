import { StatelessComponent } from "react";
import { Artist } from "../../types/artist";
import { IconButton } from "@material-ui/core";
import * as React from "react";

export const ArtistMediaButtons: StatelessComponent<{ artist: Artist }> = ({
  artist
}) => (
  <section>
    <IconButton href={artist.url} color="default" target="_blank">
      <img src="bandisintown.ico" width={24} height={24} />
    </IconButton>
    <IconButton
      href={artist.facebook_page_url}
      color="default"
      target="_blank"
    >
      <img src="facebook.png" />
    </IconButton>
  </section>
);
