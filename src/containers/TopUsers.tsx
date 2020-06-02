import React, { useState, useEffect, memo } from "react";
import "./User/user.css";
import Tile from "../components/Tile/Tile";
import { getUsers } from "../api/userApis";
import {
    processUserData,
} from "../utils/helpers";
import { TUser } from "../utils/types";
import { searchUserHeadings } from "../utils/constants";
import { renderHeadings } from './User/userHelpers';

const TopUsersPage = () => {
    const [users, setUsers] = useState<TUser[]>([]);


    useEffect(() => {
        getUsers()
            .then((res) => res.json())
            .then((data) => setUsers(processUserData(data).filter((user) => user.isTopUser)))
            .catch((err) => console.log(err));
    }, []);

    const renderFilteredUserList = () => {
        if (users.length)
            return users.map((user) => (
                <Tile
                    showDetails
                    key={user.id}
                    userData={user}
                />
            ));
        return <h2>No Top Users Exist!</h2>
    };

    const renderTopUsers = () => (
        <div className={"search-result-wrapper"}>
            <h2>Top Users:</h2>
            {renderHeadings(searchUserHeadings)}
            {renderFilteredUserList()}
        </div>
    );

    return (
        <div className="user-container">
            <div className={"user-wrapper"}>
                <div className={"tile-layout"}>
                    {renderTopUsers()}
                </div>
            </div>
        </div>
    );
};

export default memo(TopUsersPage);
