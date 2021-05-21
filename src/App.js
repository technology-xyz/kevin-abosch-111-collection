import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import "assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import BasicStyle from "theme/basicStyle";
import GlobalStyle from "theme/globalStyle";

import MyRoute from "service/MyRoute";

import Gallery from "containers/Gallery";





function App() {
  return (
    <div className="App">
      
        <BasicStyle />
        <GlobalStyle />
        
        <Router>
         
            <Switch>
             
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to="/gallery" />}
                    />
                    
                    <MyRoute exact path="/gallery" component={Gallery}/>
                    
              
            </Switch>
        
        </Router>
     
    </div>
  );
}

export default App;
