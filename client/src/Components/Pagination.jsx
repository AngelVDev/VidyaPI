import React from "react";
import "./Styles/Pagination.css";

const Pagination = ({ games, gamesPerPage, pagination }) => {
  let pageNum = [];
  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNum.push(i);
  }
  if (games <= 15) {
    return (pageNum = 0);
  }
  return (
    <nav id="Pagination">
      <ul>
        {pageNum &&
          pageNum.map((number) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a id="Page" onClick={() => pagination(number)}>
              {number}
            </a>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
