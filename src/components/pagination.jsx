import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  //페이지네이션의 숫자를 몇개까지 표시할건지 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div>
        {pageNumbers.map((number) => {
          <li key={number}>
            <div onClick={() => paginate(number)}>{number}</div>
          </li>;
        })}
      </div>
    </>
  );
};

export default Pagination;
