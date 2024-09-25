import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/details";
import Home from "./routes/home";
import Carousel from "./components/Carousel/Carousel";
import MovieForm from "./components/CreateMovie/MovieForm";
import { useState } from "react";

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

  return (
    <Router>
      <div>
        <button onClick={handleOpenModal}>create</button>
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
            <div>
              <Carousel />
              <Home recommendMovie={recommendMovie} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
