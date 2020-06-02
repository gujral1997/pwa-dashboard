import React from "react";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getCurrentPath } from "./utils/helpers";
import EmptyRoute from "./components/EmptyRoute/EmptyRoute";
import { drawerRoutes, headerRoutes, emptyRoutes } from "./utils/constants";
import loadable from "@loadable/component"

const Loading = () => <div>Loading...</div>

const UserPage = loadable(
  () =>
    import(
      /* webpackChunkName: "users"*/ "./containers/User/User"
    ),
  {
    fallback: <Loading />,
  }
)

const TopUsers = loadable(
  () =>
    import(
      /* webpackChunkName: "topUsers"*/ "./containers/TopUsers"
    ),
  {
    fallback: <Loading />,
  }
)


const headerButton = (
  <Drawer
    button={<div className="header-button">&#9776;</div>}
    routes={drawerRoutes}
  />
);

/**
 * Rendering routes other than users
 *
 */
const renderEmptyRoutes = () =>
  emptyRoutes.map((route) => (
    <Route key={route} path={route}>
      <EmptyRoute heading={getCurrentPath()} />
    </Route>
  ));

const heading = getCurrentPath();

/**
 * Root Component
 *
 * @returns
 */
const App = () => {
  return (
    <div>
      <Header button={headerButton} heading={heading} routes={headerRoutes} />
      <Router>
        <Switch>
          <Route path="/users">
            <UserPage />
          </Route>
          <Route path="/top-users">
            <TopUsers />
          </Route>
          {renderEmptyRoutes()}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
