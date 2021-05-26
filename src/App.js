import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
  }, [loading, data]);

  return (
    <div className="App">
      <BasicStyle />
      <GlobalStyle />

      <Router>
        {!isLoading && (
          <Switch>
            <DataContextContainer images={items}>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/gallery/1" />}
              />

              <Suspense fallback={<h1>Loading</h1>}>
                <MyRoute path="/gallery/:id" component={Gallery} />
              </Suspense>

              <MyRoute exact path="/about" component={About} />

              <MyRoute exact path="/collection" component={Collection} />
            </DataContextContainer>
            <Route
              exact
              path="/gallery"
              render={() => <Redirect to="/gallery/1" />}
            />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
