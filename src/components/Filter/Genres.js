import React from "react";
import styled from "styled-components";

const genres = [
  "All",
  "Action",
  "Drama",
  "Documentary",
  "Comedy",
  "Horror",
  "Family",
  "Thriller",
  "Romance",
];

const Genres = ({ setSelectedGenre, setSearchTerm }) => {
  const handleSelectGenre = (gen) => {
    setSelectedGenre(gen === "All" ? null : gen);
    if (gen === "All") {
      setSearchTerm("");
    }
  };

  return (
    <Wrapper>
      <Ul>
        {genres.map((gen, idx) => (
          <Li key={idx} onClick={() => handleSelectGenre(gen)}>
            {gen}
          </Li>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default Genres;

// style
const Wrapper = styled.div`
  width: 90vw;
  margin: auto;
`;
const Ul = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Li = styled.li`
  list-style: none;
  cursor: pointer;
  font-weight: 600;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  // color: #fff;
`;
