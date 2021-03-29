import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import PostList from "../pages/PostList";

import Header from "../components/Header";
import {Grid} from "../elements"




function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
