import React from "react"

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

export { renderHeadings }