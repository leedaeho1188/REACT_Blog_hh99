import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";

import Header from "../components/Header";
import {Grid} from "../elements"

import styled from "styled-components"



function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}


export default App;
