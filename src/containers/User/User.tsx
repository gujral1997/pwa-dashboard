import React, { useState, useEffect, useMemo, memo } from "react";
import "./user.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Tile from "../../components/Tile/Tile";
import { getUsers } from "../../api/userApis";
import {
  processUserData,
  setLocalData,
  isSubString,
} from "../../utils/helpers";
import { TUser } from "../../utils/types";
import { normalUserHeadings, searchUserHeadings } from "../../utils/constants";

/**
 * Render the headers for the user details
 *
 * @param {string[]} list
 */
const renderHeadings = (list: string[]) => (
  <div className="search-heading-wrapper">
    {list.map((value) => (
      <div className="flex__center">
        <b>{value}</b>
      </div>
    ))}
  </div>
);

/**
 * User screen
 *
 * @returns
 */
const UserPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const [query, setQuery] = useState<string>("");

  const updateUser = (
    user: TUser,
    index: number,
    name: "isTopUser" | "isBlocked"
  ) => {
    const localStorageKey = name === "isBlocked" ? "blockedUsers" : "topUsers";
    setLocalData(localStorageKey, user.id.toString(), !user[name]);
    setUsers([
      ...users.slice(0, index),
      {
        ...users[index],
        [name]: !user[name],
      },
      ...users.slice(index + 1),
    ]);
  };

  const userList = useMemo(
    () => (query ? searchUserHeadings : normalUserHeadings),
    [query]
  );

  const onChangeInput = (value: string) => setQuery(value);

  useEffect(() => {
    getUsers()
      .then((res) => res.json())
      .then((data) => setUsers(processUserData(data)))
      .catch((err) => console.log(err));
  }, []);

  const renderUserList = () =>
    users.map((user, index) => (
      <Tile
        key={user.id}
        userData={user}
        onBlockChange={() => updateUser(user, index, "isBlocked")}
        onTopUserChange={() => updateUser(user, index, "isTopUser")}
      />
    ));

  const renderFilteredUserList = (topUser: boolean) => {
    const userList = users.filter(
      ({ name, email, isTopUser }) =>
        (isSubString(name, query) || isSubString(email, query)) &&
        (topUser ? !isTopUser : isTopUser)
    );
    if (userList.length === 0) return <h4>No user found!</h4>;
    return userList.map((user, index) => (
      <Tile
        showDetails
        key={user.id}
        userData={user}
        onBlockChange={() => updateUser(user, index, "isBlocked")}
        onTopUserChange={() => updateUser(user, index, "isTopUser")}
      />
    ));
  };

  const renderSearchResults = () => (
    <div className={"search-result-wrapper"}>
      <h2>Top Users:</h2>
      {renderHeadings(userList)}
      {renderFilteredUserList(false)}
      <h2>Normal Users:</h2>
      {renderHeadings(userList)}
      {renderFilteredUserList(true)}
    </div>
  );

  return (
    <div className="user-container">
      <div className={"user-wrapper"}>
        <SearchBar onChangeInput={onChangeInput} value={query} />
        <div className={"tile-layout"}>
          {!query ? (
            <>
              {renderHeadings(userList)}
              {renderUserList()}
            </>
          ) : (
              renderSearchResults()
            )}
        </div>
      </div>
    </div>
  );
};

export default memo(UserPage);
