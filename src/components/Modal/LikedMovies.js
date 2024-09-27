import React from "react";
import styled from "styled-components";

const LikedMovies = ({ setIsShowLiked, likedMovies }) => {
  const handleCloseModal = () => {
    setIsShowLiked(false);
    document.body.style.overflow = "";
  };
  const handleModalEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={handleCloseModal}>
      <ModalBox onClick={handleModalEvent}>
        <CloseBtn onClick={handleCloseModal}>X</CloseBtn>
        <ModalTitle>My Favorite Movies</ModalTitle>
        <Items>
          {likedMovies.length > 0 ? (
            likedMovies.map((movie) => (
              <Item key={movie.id}>
                <Img src={movie.coverImg} />
                <TextBox>
                  <Title>{movie.title}</Title>
                  <Genre>{movie.genres.join(", ")}</Genre>
                </TextBox>
              </Item>
            ))
          ) : (
            <Empyt>Add your favorite movie!</Empyt>
          )}
        </Items>
      </ModalBox>
    </Wrapper>
  );
};

export default LikedMovies;

// style
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 98;
`;
const ModalBox = styled.div`
  width: 60vw;
  height: 70vh;
  padding: 1rem 2rem;
  background-color: #fff !important;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 99;
  overflow-y: scroll;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  float: right;
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
  }
  color: black !important;
  background-color: white !important;
`;
const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: black !important;
`;
const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: white !important;
`;
const Item = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white !important;
`;
const Img = styled.img`
  margin-right: 1rem;
`;
const TextBox = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white !important;
  color: black !important;
`;
const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 16px;
`;
const Genre = styled.p`
  font-size: 14px;
`;

const Empyt = styled.p`
  width: 100%;
  padding-top: 50px;
  text-align: center;
`;
