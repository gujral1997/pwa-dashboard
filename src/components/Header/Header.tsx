import React, { FC, ReactChild, memo } from "react";

import "./header.css";

interface TRoutes {
  name: string;
  path: string;
}

interface HeaderProps {
  heading?: string;
  children?: ReactChild;
  routes?: TRoutes[];
  button?: ReactChild;
}

/**
 * To render header routes
 *
 * @param {TRoutes[]} routes
 */
const renderRoutes = (routes: TRoutes[]) =>
  routes.map(({ name, path }) => (
    <a
      href={path}
      key={name}
      className="header-routes"
      data-component={window.location.pathname === path}
    >
      {name}
    </a>
  ));

/**
 * Header Component
 *
 * @param {*} { heading, routes }
 */
const Header: FC<HeaderProps> = ({ heading = "", routes = [], button }) => {
  return (
    <div className="header-container">
      {button}
      <div className="header-heading">{heading}</div>
      <div className="header-body">{renderRoutes(routes)}</div>
    </div>
  );
};

export default memo(Header);
