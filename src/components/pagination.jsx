import React from "react";
import { styled } from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  //페이지네이션의 숫자를 몇개까지 표시할건지 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <PaginationContainer>
        <PaginationList>
          {pageNumbers.map((number) => (
            <li key={number}>
              <PaginationItem onClick={() => paginate(number)}>{number}</PaginationItem>
            </li>
          ))}
        </PaginationList>
      </PaginationContainer>
    </>
  );
};

export default Pagination;

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
`;

const PaginationItem = styled.div`
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;
