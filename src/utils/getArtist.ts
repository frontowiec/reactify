import { getJSON } from "../ajax/getJSON";

export const getArtist = (artist: string) =>
  getJSON(`https://rest.bandsintown.com/artists/${artist}?app_id=123`).then(
    ({ response }) => response
  );
