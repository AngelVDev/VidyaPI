import React from "react";
import "./Styles/Pagination.css";

const Pagination = ({ games, gamesPerPage, pagination }) => {
  let pageNum = [];
  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNum.push(i);
  }
  if (games <= 15) {
    return (pageNum = null);
  }
  return (
    <nav id="Pagination">
      <ul key={"thisUl"}>
        {pageNum &&
          pageNum.map((number) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={number} className="Page" onClick={() => pagination(number)}>
              {number}
            </a>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
