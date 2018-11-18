import { ajax } from "rxjs/ajax";

export const getJSON = (url: string) => ajax.get(url).toPromise();
