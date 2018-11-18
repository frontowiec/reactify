import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Spinner } from "./components/Shared/Spinner";

const Artists = lazy(() => import("./components/Artist/Artists"));
const EventDetails = lazy(() =>
  import("./components/EventDetails/EventDetails")
);

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Container>
            <Suspense fallback={<Spinner />}>
              <Route path="/" exact component={Artists} />
              <Route path="/artists/" exact component={Artists} />
              <Route
                path="/artists/:artistName/events"
                exact
                component={EventDetails}
              />
            </Suspense>
          </Container>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
