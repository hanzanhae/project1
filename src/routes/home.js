import { useEffect, useState } from "react";
import Movie from "../components/movies";
import styles from "./home.module.css";
import Pagination from "../components/pagination";
import MainNav from "../components/MainNav";
import LikedMovies from "../components/Modal/LikedMovies";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowLiked, setIsShowLiked] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);

  //페이지네이션 구현
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentMovies = (movies) => {
    let currentMovies = 0;
    currentMovies = movies.slice(indexOfFirst, indexOfLast);
    return currentMovies;
  };

  //비동기로 영화목록 가져오기
  const getMovies = async () => {
    const json = await (
      await fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year")
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  // 장르필터링
  const filteredGenre = selectedGenre
    ? movies.filter((movie) => movie.genres.includes(selectedGenre))
    : movies;

  // 검색필터링
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 최종필터링
  const filteredMovied = filteredGenre.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 좋아요 모달창
  const handleShowModal = () => {
    setIsShowLiked(true);
  };
  const handleLikeMovies = (movie) => {
    setLikedMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  return (
    <>
      <MainNav
        handleSearch={handleSearch}
        setSelectedGenre={setSelectedGenre}
        setSearchTerm={setSearchTerm}
        handleShowModal={handleShowModal}
      />
      {isShowLiked && (
        <LikedMovies
          setIsShowLiked={setIsShowLiked}
          likedMovies={likedMovies}
        />
      )}
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {filteredMovied.length === 0 ? (
              <div className={styles.empty_text}>No movie</div>
            ) : (
              filteredMovied.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  coverImg={movie.medium_cover_image}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres}
                  movies={currentMovies(movies)}
                  handleLikeMovies={handleLikeMovies}
                />
              ))
            )}
          </div>
        )}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={movies.length}
          paginate={setCurrentPage}
        ></Pagination>
      </div>
    </>
  );
}
export default Home;
