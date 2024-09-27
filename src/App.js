import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/details";
import Home from "./routes/home";
import Carousel from "./components/Carousel/Carousel";
import MovieForm from "./components/CreateMovie/MovieForm";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";

function App() {
  // 모달 기본값 (닫기)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 영화 리스트 관리
  const [recommendMovie, setRecommendMovie] = useState([]);

  const handelCreateMovie = (newMovie) => {
    setRecommendMovie((prevMoives) => [newMovie, ...prevMoives]);
  };

  const { isBlackAndWhite, toggleTheme } = useTheme();

  return (
    <Mode $isBlackAndWhite={isBlackAndWhite}>
      <Router>
        <div>
          <ModeButton $isBlackAndWhite={isBlackAndWhite} onClick={toggleTheme}>
            {isBlackAndWhite ? "Normal Mode" : "Black & White Mode"}
          </ModeButton>
          <button className="submit-button" onClick={handleOpenModal}>
            create
          </button>
          {isModalOpen && (
            <MovieForm
              show={isModalOpen} // 모달이 열렸는지를 props로 전달
              onClose={handleCloseModal} //모달 끄면 모달 닫혀유
              onCreate={handelCreateMovie}
            />
          )}
        </div>

        <Routes>
          {/* "/about-us" 경로로 가면 "Hello" 메시지를 렌더링 */}
          <Route path="/about-us" element={<h1>Hello</h1>} />

          {/* "/movie/:id" 경로로 가면 Detail 컴포넌트를 렌더링 */}
          <Route path="/movie/:id" element={<Detail />} />

          {/* "/" 경로로 가면 Home과 Carousel을 렌더링 */}
          <Route
            path="/"
            element={
              <div $isBlackAndWhite={isBlackAndWhite}>
                <Carousel />
                <Home recommendMovie={recommendMovie} />
              </div>
            }
          />
        </Routes>
      </Router>
    </Mode>
  );
}

export default App;

const Mode = styled.div`
  background-color: ${(props) => (props.$isBlackAndWhite ? "#000" : "#fff")};
  /* color: ${(props) => (props.$isBlackAndWhite ? "#fff" : "#000")}; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div,
  a,
  button {
    background-color: ${(props) => (props.$isBlackAndWhite ? "#000" : "#fff")};
    color: ${(props) => (props.$isBlackAndWhite ? "#fff" : "#000")};
  }
`;

const ModeButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isBlackAndWhite ? "#000" : "#fff")};
  color: ${(props) => (props.isBlackAndWhite ? "#fff" : "#000")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.isBlackAndWhite ? "#fff" : "#000")};
    color: ${(props) => (props.isBlackAndWhite ? "#000" : "#fff")};
  }
`;
