import React from "react";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getCurrentPath } from "./utils/helpers";
import EmptyRoute from "./components/EmptyRoute/EmptyRoute";
import { drawerRoutes, headerRoutes, emptyRoutes } from "./utils/constants";
import UserPage from "./containers/User/User";

const headerButton = (
  <Drawer
    button={<div className="header-button">&#9776;</div>}
    routes={drawerRoutes}
  />
);

const renderEmptyRoutes = () =>
  emptyRoutes.map((route) => (
    <Route key={route} path={route}>
      <EmptyRoute heading={getCurrentPath()} />
    </Route>
  ));

const heading = getCurrentPath();

const App = () => {
  return (
    <div>
      <Header button={headerButton} heading={heading} routes={headerRoutes} />
      <Router>
        <Switch>
          <Route path="/users">
            <UserPage />
          </Route>
          {renderEmptyRoutes()}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
