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
import { array } from "prop-types";


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [preLoaded, setPreloaded] = useState([])
  const [{ data, loading, error }, refetch] = useAxios(
    "https://5vgwb6smju7uduepxbruar4paai3xfutjksugh67nsaxy5gejq6q.arweave.net/7U1g-kxNP0HQj7hjQEePABG7lpNKpUMf32yBfHTETD0/"
  );
  const cachedImages = async (arr) => {
    const promises = await array.map(src => {
      console.log(src)
        return new Promise ((resolve,reject) =>{
          const img = new Image()
          img.src = src;
          img.onload = resolve()
          img.onerror = reject()
        })
    })
    await Promise.all(promises)
    setIsLoading(false)
  }
  useEffect(()=>{
    if (!loading) {
      const nftArray = [];
      let source = "";
      for (const [key, value] of Object.entries(data)) {
        const [name, extension] = key.split(".");

        if (extension !== "json") {
          nftArray.push(`${preUrl}${value}?t=${Math.random() * 999999}`);
        }
      }
      setPreloaded(cachedImages(nftArray))
      setIsLoading(false)
    }
    
  },[])
  return (
    <div className="App">
      <BasicStyle />
      <GlobalStyle />

      <Router>
        <Switch>
          {isLoading ? <h1>wait</h1> :
          <DataContextContainer images={preLoaded}>
          <Route exact path="/" render={() => <Redirect to="/gallery" />} />
          <MyRoute exact path="/gallery" component={Gallery} />
          <MyRoute exact path="/about" component={About} />
          <MyRoute exact path="/collection" component={Collection} />
        </DataContextContainer>
          }
          
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
