import React, { useState, useEffect } from "react";
import "./MovieForm.css";

const MovieForm = ({ show, onClose, onCreate }) => {
  const [img, setImg] = useState(null); // 영화 이미지
  const [title, setTitle] = useState(""); // 영화 제목
  const [genre, setGenre] = useState([]); // 영화 장르 (여러개 선택할 수 있도록 배열로 수정)
  const [description, setDescription] = useState(""); // 영화 설명
  const [year, setYear] = useState(""); // 영화 연도

  const genres = [
    "Action",
    "Drama",
    "Documentary",
    "Comedy",
    "Horror",
    "Family",
    "Thriller",
    "Romance",
  ];

  // 장르를 여러개 선택할 수 있도록 수정
  const handleGenreClick = (selectedGenre) => {
    if (genre.includes(selectedGenre)) {
      setGenre(genre.filter((g) => g !== selectedGenre));
    } else {
      setGenre([...genre, selectedGenre]);
    }
  };

  // 이미지 파일 업로드
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // 단일 파일을 다루는 로직의 경우, event.target.files라고만 입력하게 되면 file을 가져오는 것이 아니라 filelist를 가져오는 것이 되기 때문에 URL.createObjectURL(file)은 객체로 필요로 하므로 충돌을 일으켜 오류가 발생한다.
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 파일을 미리보기 URL로 변환
      setImg(imageUrl); // 이미지 상태 업데이트
    }
  };

  // 제출
  const handleSubmit = () => {
    if (!genre) {
      alert("장르를 한 가지 이상 선택해주세요!");
      return;
    }
    if (!year) {
      alert("연도를 입력해주세요");
      return;
    }
    // onCreate 함수 호출하여 영화 데이터 전달
    onCreate({ img, title, genre, description, year });
    onClose();
  };

  // 모달이 열려있으면 웹페이지 스크롤 비활성화
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!show) return null;

  return (
    <div className={`modal-backdrop ${show ? "show" : ""}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">나의 추천 영화</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input"
          />
          {img && (
            <img
              src={img}
              alt="이미지 파일 미리보기"
              style={{ width: "150px", height: "200px", marginTop: "10px" }}
            />
          )}

          <input
            type="text"
            placeholder="영화 제목을 입력해주세요"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input"
          />

          <input
            type="number"
            placeholder="연도를 입력해주세요"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="input"
          />

          <div className="genre-container">
            <h3>장르</h3>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => handleGenreClick(g)} // 버튼 클릭 시 장르 선택
                className={`genre-button ${
                  genre.includes(g) ? "selected" : ""
                }`} // 선택된 장르는 "selected" 클래스 추가
              >
                {g}
              </button>
            ))}
          </div>

          <textarea
            placeholder="영화 설명을 적어주세요"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="textarea"
          />

          <button className="modal-submit-button" onClick={handleSubmit}>
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
