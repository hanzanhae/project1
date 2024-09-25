import React from "react";
import Search from "./Filter/Search";
import Genres from "./Filter/Genres";

const MainNav = ({
  handleSearch,
  setSelectedGenre,
  setSearchTerm,
  handleShowModal,
}) => {
  return (
    <>
      <Search handleSearch={handleSearch} handleShowModal={handleShowModal} />
      <Genres
        setSelectedGenre={setSelectedGenre}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default MainNav;
