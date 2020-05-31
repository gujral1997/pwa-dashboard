import React, { useState, useEffect, memo, useMemo } from "react";
import "./user.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Tile from "../../components/Tile/Tile";
import { getUsers } from "../../api/userApis";
import {
  processUserData,
} from "../../utils/helpers";
import { TUser } from "../../utils/types";
import { normalUserHeadings } from '../../utils/constants';

const UserPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const [query, setQuery] = useState<string>("");

  const onChangeInput = (value: string) => setQuery(value);

  useEffect(() => {
    getUsers()
      .then((res) => res.json())
      .then((data) => setUsers(processUserData(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user-container">
      <div className="user-wrapper">
        <SearchBar onChangeInput={onChangeInput} value={query} />
        <div
          style={{
            width: "100%",
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {normalUserHeadings.map((value) => <div className="flex__center"><b>{value}</b></div>)}
        </div>
        {
          users.map(user => (
            <Tile
              key={user.id}
              userData={user}
            />
          ))
        }
      </div>
    </div>
  );
};

export default memo(UserPage);
