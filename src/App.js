import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import "react-circular-progressbar/dist/styles.css";
import "assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import BasicStyle from "theme/basicStyle";
import GlobalStyle from "theme/globalStyle";

import MyRoute from "service/MyRoute";

import Gallery from "containers/Gallery";

import DataContextContainer from "contexts/DataContextContainer";
import AnnounceContextContainer from "contexts/AnnounceContextContainer";
import ScrollContextContainer from "contexts/ScrollContextContainer";


const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children || null
})

function App() {
  return (
    <div className="App">
      <Scrollbars autoHide style={{ flex: 1 }}>
        <BasicStyle />
        <GlobalStyle />
        
        <Router>
          <ScrollToTop>
            <Switch>
              <DataContextContainer>
                <ScrollContextContainer>
                  <AnnounceContextContainer>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to="/gallery" />}
                    />
                    
                    <MyRoute exact path="/gallery" component={Gallery}/>
                    
                  </AnnounceContextContainer>
                </ScrollContextContainer>
              </DataContextContainer>
            </Switch>
          </ScrollToTop>
        </Router>
      </Scrollbars>
    </div>
  );
}

export default App;
