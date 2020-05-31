import React, { FC, ReactChild, Fragment, useState, memo } from "react";
import "./drawer.css";

interface DrawerProps {
  routes?: TRoutes[];
  button?: ReactChild;
}

interface TRoutes {
  name: string;
  path: string;
}

/**
 * Render the routes received as props
 *
 * @param {TRoutes[]} routes
 */
const renderRoutes = (routes: TRoutes[]) =>
  routes.map(({ name, path }) => <a href={path}>{name}</a>);

/**
 * Drawer component
 *
 * @param {*} { routes, button }
 * @returns
 */
const Drawer: FC<DrawerProps> = ({ routes = [], button }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Fragment>
      <div onClick={openDrawer}>{button}</div>
      <div className="drawer-container" data-component={drawerOpen}>
        <a className="close-btn" onClick={closeDrawer}>
          &times;
        </a>
        {renderRoutes(routes)}
      </div>
    </Fragment>
  );
};

export default memo(Drawer);
