import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../icons/search.svg";

const Search = ({ handleSearch }) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
    setInput("");
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Search for movie..."
        />
        <Btn type="submit">
          <Img src={SearchIcon} />
        </Btn>
      </Form>
    </Wrapper>
  );
};

export default Search;

// style
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  justify-content: flex-end;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  padding: 0.25rem 0.5rem;
`;
const Btn = styled.button`
  display: inline-block;
  width: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Img = styled.img`
  width: 24px;
`;
