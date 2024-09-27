import styles from "./movies.module.css";
import Modal from "./Modal/modal";
import { useState } from "react";
import ThumbUpIcon from "../icons/thumbUp.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, year, summary = "", genres, handleLikeMovies }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [onHeart, setOnHeart] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCountUp = () => {
    setCount((prev) => prev + 1);
  };
  const handleOnHeart = () => {
    setOnHeart(!onHeart);
    handleLikeMovies({ id, coverImg, title, genres });
  };
  return (
    <div className={styles.movies}>
      <div className={styles.movie__img_box}>
        <img src={coverImg} alt={title} className={styles.movies__img} onClick={openModal} />
        <div className={styles.movie__button}>
          <button className={styles.count_btn} onClick={handleCountUp}>
            <img src={ThumbUpIcon} alt={"좋아요"} />
            <p>{count}</p>
          </button>
          <button className={styles.toggle_btn} onClick={handleOnHeart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={onHeart ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* <img
        src={coverImg}
        alt={title}
        className={styles.movies__img}
        onClick={openModal}
      /> */}
      {/* <div>
        <h2 className={styles.movies__title} />
        <Link to={`/movies/${id}`}>{title || '제목 없음'}</Link> */}

      <div className={styles.movies__des}>
        <h2 className={styles.movies__title}>
          <Link to={`/movies/${id}`}>{title || "제목 없음"}</Link>
        </h2>
        <h3 className={styles.movies__year}>{year || "연도 정보 없음"}</h3>
        <p>
          <br />
          <br />
          <br />
        </p>

        {/* genres가 배열인지 확인한 후 map을 실행 */}
        {genres && genres.length > 0 ? (
          <ul className={styles.movies__genres}>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        ) : (
          <p>장르 정보 없음</p>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          coverImg={coverImg}
          title={title}
          year={year}
          summary={summary}
          genres={genres}
        />
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string), // Required를 제거하고 선택 사항으로 변경
};
export default Movie;
