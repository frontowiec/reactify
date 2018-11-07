import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export const getArtist = (artist: string) =>
  ajax
    .get(`https://rest.bandsintown.com/artists/${artist}?app_id=123`)
    .pipe(map(({ response }) => response));
