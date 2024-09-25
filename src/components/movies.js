import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./movies.module.css";
import Modal from "./Modal/modal";
import { useState } from "react";

function Movie({ id, coverImg, title, year, summary = "", genres }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.movies}>
      <img
        src={coverImg}
        alt={title}
        className={styles.movies__img}
        onClick={openModal}
      />
      <div>
        <h2 className={styles.movies__title}>
          <Link to={`/movies/${id}`}>{title || "제목 없음"}</Link>
        </h2>
        <h3 className={styles.movies__year}>{year || "연도 정보 없음"}</h3>
        <p>
          {summary.length > 235
            ? `${summary.slice(0, 235)}...`
            : summary || "설명 없음"}
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
      </div>
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
