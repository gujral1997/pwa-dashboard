import React, { FC, memo } from "react";
import "./emptyRoute.css";

interface EmptyRouteProps {
  heading: string;
}

/**
 * Fallback page for the routes other the /users 
 *
 * @param {*} { heading }
 */
const EmptyRoute: FC<EmptyRouteProps> = ({ heading }) => (
  <div>
    <div className="empty-container">
      <h1>{heading}</h1>
    </div>
  </div>
);

export default memo(EmptyRoute);
