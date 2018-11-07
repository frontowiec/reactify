import React, { Component } from "react";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Artists from "./components/Artist/Artists";
import EventDetails from "./components/EventDetails/EventDetails";
import { Container } from "./components/Container";

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
            <Route path="/" exact component={Artists} />
            <Route path="/artists/" exact component={Artists} />
            <Route
              path="/artists/:artistName/events"
              exact
              component={EventDetails}
            />
          </Container>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
