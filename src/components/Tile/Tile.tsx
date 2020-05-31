import React, { FC } from "react";
import Switch from "../Switch/Switch";
import "./tile.css";
import { TUser } from "../../utils/types";

interface TileProps {
  userData: TUser;
  showDetails?: boolean;
  onBlockChange?: () => void;
  onTopUserChange?: () => void;
}

const Tile: FC<TileProps> = ({
  userData,
  onBlockChange,
  onTopUserChange,
}) => {
  const { name, email, isTopUser, isBlocked } = userData;
  return (
    <div className="tile-wrapper">
      <div className="default-view">
        <div className="flex__center">{name}</div>
        <div className="flex__center">{email}</div>
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
      </div>
    </div>
  );
};

export default Tile;
