import React, { useState, useEffect, Suspense } from "react";
import {
  HashRouter as Router,
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
import ModalContextContainer from "contexts/ModalContext";

window.onload = () => {
  if (window.location.href === "http://1111.koi.rocks") window.location.href = "https://1111.koi.rocks/#/gallery"
};

function App() {
  const genRand = () => Math.floor(Math.random() * 1001);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );

  useEffect(() => {
    if (!loading) {
      const nftArray = [];
      let source = "";
      let id = 0;
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          const [name, extension] = key.split(".");

          if (extension === "json") {
            nftArray.push({
              name: name.slice(5),
              source: `${preUrl}${source}?t=${Math.random() * 999999}`,
              json: `${preUrl}${value}?t=${Math.random() * 999999}`,
              txId: source,
              id: id,
            });
            id++;
          } else {
            source = value;
          }
        }

        setItems(nftArray);
        setIsLoading(false);
      }
    }
    if (error) {
      console.log(error);
      refetch();
    }
  }, [loading, data, error, refetch]);

  return (
    <div className="App">
      <BasicStyle />
      <GlobalStyle />
      {!isLoading && (
        <Router>
          <Switch>
            <ModalContextContainer>
              <DataContextContainer images={items}>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={`/gallery/${genRand()}`} />}
                />
                <Suspense fallback={<h1>Loading</h1>}>
                  <MyRoute path="/gallery/:id" component={Gallery} />
                </Suspense>
                <MyRoute exact path="/about" component={About} />
                <MyRoute exact path="/collection" component={Collection} />
                <Route
                  exact
                  path="/gallery"
                  render={() => <Redirect to="/gallery/1" />}
                />
              </DataContextContainer>
            </ModalContextContainer>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
