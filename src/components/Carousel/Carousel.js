import React, { useState, useEffect } from "react";
import "./Carousel.css"; // CSS 파일을 import

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null); // 마우스 오버된 이미지 인덱스

  useEffect(() => {
    // API 호출: 영화 데이터를 받아와 이미지 리스트로 변환
    fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year")
      .then((response) => response.json())
      .then((data) => {
        const moviesData = data.data.movies;
        setMovies(moviesData); // 영화 데이터를 상태에 저장
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= movies.length - 3 ? 0 : prevIndex + 1
    );
  };

  // 마우스가 이미지에 닿을 때 인덱스 저장
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // 이미지 클릭 시 해당 영화의 URL로 이동
  const handleImageClick = (movieUrl) => {
    window.location.href = movieUrl; // 클릭 시 영화의 URL로 이동
  };

  return (
    <div className="carousel-container">
      {movies.length > 0 ? (
        <div className="carousel">
          <div
            className="carousel-images"
            style={{
              display: "flex",
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {movies.map((movie, index) => (
              <img
                key={index}
                src={movie.large_cover_image}
                alt={movie.title}
                className={`carousel-image ${
                  index === hoveredIndex ? "active" : ""
                }`}
                style={{
                  width: "33.33%",
                  transform:
                    index === hoveredIndex
                      ? "scale(1.2)" // 마우스가 닿은 이미지 확대
                      : hoveredIndex !== null
                      ? "scale(0.9)" // 나머지 이미지는 축소
                      : "scale(1)", // 마우스가 없을 때는 원래 크기
                  transition: "transform 0.3s ease", // 부드러운 변환
                  cursor: "pointer", // 커서가 포인터로 변하게 설정
                }}
                onMouseEnter={() => handleMouseEnter(index)} // 마우스 오버 시 인덱스 저장
                onMouseLeave={handleMouseLeave} // 마우스가 벗어나면 복구
                onClick={() => handleImageClick(movie.url)} // 클릭 시 영화 URL로 이동
              />
            ))}
          </div>

          <button className="prev-button" onClick={handlePrev}>
            {"<"}
          </button>
          <button className="next-button" onClick={handleNext}>
            {">"}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Carousel;
