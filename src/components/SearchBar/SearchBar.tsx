import React, { memo, FC } from "react";
import "./searchBar.css";

interface SearchBarProps {
  value: string;
  onChangeInput: (value: string) => void;
}

/**
 * Search Bar to filter normal and top users
 *
 * @param {*} { value, onChangeInput }
 * @returns
 */
const SearchBar: FC<SearchBarProps> = ({ value, onChangeInput }) => {
  return (
    <div className="search-wrap">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search users..."
          value={value}
          onChange={(e) => onChangeInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          &#128269;
        </button>
      </div>
    </div>
  );
};

export default memo(SearchBar);
