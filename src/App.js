import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/details";
import Home from "./routes/home";
import Carousel from "./components/Carousel/Carousel";
import MovieForm from "./components/CreateMovie/MovieForm";
import { useState } from "react";

function App() {
  // 모달 기본값 (닫기)
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  //모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Router>
      <button onClick={handleOpenModal}>create</button>

      {isModalOpen && (
        <MovieForm
          show={isModalOpen} // 모달이 열렸는지를 props로 전달
          onClose={handleCloseModal} //모달 끄면 모달 닫혀유
          onCreate={(newMovie) => {
            console.log(newMovie);
            handleCloseModal();
          }} // 입력 끝나면 모달 닫혀유
        />
      )}
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
              <Home />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
