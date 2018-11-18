import * as React from "react";
import { lazy, Fragment, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { StyledComponentProps, withStyles } from "@material-ui/core";
import { compose, lifecycle, withState } from "recompose";
import { getArtist } from "../../utils/getArtist";
import { getJSON } from "../../ajax/getJSON";
import { Artist } from "../../types/artist";
import { Spinner } from "../Shared/Spinner";

const ArtistInfo = lazy(() => import("./ArtistInfo"));
const EventsList = lazy(() => import("./EventsList"));

const styles = (theme: any) => ({
  eventsList: {
    marginTop: 20
  }
});

const EventDetails: FunctionComponent<Props> = ({
  match,
  artist,
  events,
  isLoading
}) =>
  !isLoading ? (
    <Fragment>
      <ArtistInfo artist={artist} />
      <EventsList events={events} />
    </Fragment>
  ) : (
    <Spinner msg="Fetching data..." />
  );

interface Props
  extends StyledComponentProps,
    EventsState,
    ArtistState,
    LoadingState,
    RouteComponentProps<{ artistName: string }> {}

interface EventsState {
  events: EventDetail[];
  setEvents: (events: EventDetail[]) => void;
}

interface Venue {
  country: string;
  city: string;
  latitude: string;
  name: string;
  region: string;
  longitude: string;
}

interface Offer {
  type: string;
  url: string;
  status: string;
}

export interface EventDetail {
  id: string;
  artist_id: string;
  url: string;
  on_sale_datetime: Date | string;
  datetime: Date | string;
  description: string;
  venue: Venue;
  lineup: string[];
  offers: Offer[];
}

interface ArtistState {
  artist: Artist;
  setArtist: (artist: Artist) => void;
}

interface LoadingState {
  isLoading: boolean;
  setLoader: (isLoading: boolean) => void;
}

// fetch and merge data for artist info and event list prevent double spinner
const enhance = compose<Props, {}>(
  withStyles(styles),
  withState("artist", "setArtist", null),
  withState("events", "setEvents", []),
  withState("isLoading", "setLoader", true),
  lifecycle<Props, {}>({
    componentDidMount() {
      const { artistName } = this.props.match.params;
      const artist = getArtist(artistName);
      const events = getJSON(
        `https://rest.bandsintown.com/artists/${artistName}/events?app_id=123`
      ).then(({ response }) => response);

      Promise.all([artist, events]).then(([artistDetails, eventsList]) => {
        this.props.setArtist(artistDetails);
        this.props.setEvents(eventsList);
        this.props.setLoader(false);
      });
    }
  })
);

export default enhance(EventDetails);

// wady tego rozwiązania:

// ręczne zarządzanie stanem
// komponent może z czasem puchnąć wraz z ilością komponentów dla których musimy zarządzać stanem
// wszystkie dane albo zostają załadowane albo żadne
// nie można wyświetlić częściowo widoku np. jeśli artist details ściągnęły się prędziej
// dużo bolierplatu - związane z zarządzniem statem i loaderem
