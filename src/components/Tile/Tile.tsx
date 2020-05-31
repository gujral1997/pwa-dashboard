import React, { FC, Fragment, useState } from "react";
import Switch from "../Switch/Switch";
import "./tile.css";
import { TUser } from "../../utils/types";
import startCase from "lodash.startcase";

interface TileProps {
  userData: TUser;
  showDetails?: boolean;
  onBlockChange?: () => void;
  onTopUserChange?: () => void;
}

const renderUserDetails = (user: TUser) => {
  return Object.keys(user).map((userProperty) => {
    if (typeof user[userProperty as keyof TUser] === "string")
      return (
        <div className="detail-tile">
          <b>{startCase(userProperty)}</b>: {user[userProperty as keyof TUser]}
        </div>
      );
    else return renderUserDetails(user[userProperty]);
  });
};

const Tile: FC<TileProps> = ({
  userData,
  onBlockChange,
  onTopUserChange,
  showDetails,
}) => {
  const { name, email, isTopUser, isBlocked } = userData;

  const [expand, setExpand] = useState(false);

  const onCLickExpand = () => setExpand(!expand);

  return (
    <div className="tile-wrapper">
      <div className="default-view">
        <div className="flex__center">{name}</div>
        <div className="flex__center">{email}</div>
        {showDetails ? (
          <div
            className="flex__center"
            onClick={onCLickExpand}
            style={{
              cursor: "pointer"
            }}
          >
            <b>{expand ? "-" : "+"}</b>
          </div>
        ) : (
            <Fragment>
              <div className="flex__center">
                <input
                  type="checkbox"
                  checked={isTopUser}
                  onChange={onTopUserChange}
                  className="flex__center"
                />
              </div>
              <div className="flex__center">
                <Switch checked={!isBlocked} onchange={onBlockChange} />
              </div>
            </Fragment>
          )}
      </div>
      {expand && (
        <div className='flex-wrap'>
          {renderUserDetails(userData)}
        </div>
      )}
    </div>
  );
};

export default Tile;
