import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/logo.svg";

const Search = ({ handleSearch, handleShowModal }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
    setInput("");
  };

  return (
    <Wrapper>
      <Title src={Logo} />
      <FilterMenu>
        <Form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Search for movie..."
          />
          <Btn type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#333"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Btn>
        </Form>
        <HeartBtn onClick={handleShowModal}>❤️</HeartBtn>
      </FilterMenu>
    </Wrapper>
  );
};

export default Search;

// style
const Wrapper = styled.div`
  width: 90vw;
  margin: auto;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.img`
  width: 100px;
`;
const FilterMenu = styled.div`
  display: flex;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 1px solid #333;
`;
const Btn = styled.button`
  display: inline-block;
  width: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg {
    margin-left: 0.5rem;
    width: 24px;
  }
`;
const HeartBtn = styled.button`
  margin-left: 2rem;
  padding-bottom: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;
