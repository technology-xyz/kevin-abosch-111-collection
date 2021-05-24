import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import "assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import BasicStyle from "theme/basicStyle";
import GlobalStyle from "theme/globalStyle";

import MyRoute from "service/MyRoute";
import useAxios from "axios-hooks";
import Gallery from "containers/Gallery";
import About from "containers/About";
import Collection from "containers/Collection";
import { preUrl } from "config";

import DataContextContainer from "contexts/DataContextContainer";


function App() {
  const [items, setItems] = useState([])

  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  useEffect(() => {
    if (!loading) {
      const nftArray = [];
      let source = "";
      for (const [key, value] of Object.entries(data)) {
        const [name, extension] = key.split(".");

        if (extension === "json") {
          nftArray.push({
            name: name.slice(5),
            source: source,
            json: `${preUrl}${value}?t=${Math.random() * 999999}`,
          });
        } else {
          source = `${preUrl}${value}?t=${Math.random() * 999999}`;
        }
      }
     
      setItems(nftArray);
    }
  }, [loading, data]);
 

  return (
    <div className="App">
      <BasicStyle />
      <GlobalStyle />

      <Router>
        <Switch>
          <DataContextContainer>
            <Route exact path="/" render={() => <Redirect to="/gallery" />} />
            <MyRoute exact path="/gallery" component={Gallery} />
            <MyRoute exact path="/about" component={About} />
            <MyRoute exact path="/collection" component={Collection} />
          </DataContextContainer>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
