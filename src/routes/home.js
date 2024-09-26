import { useEffect, useState } from "react";
import Movie from "../components/movies";
import styles from "./home.module.css";
import Pagination from "../components/pagination";
import MainNav from "../components/MainNav";
import LikedMovies from "../components/Modal/LikedMovies";

function Home({ recommendMovie }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowLiked, setIsShowLiked] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);

  //페이지네이션 구현
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  //비동기로 영화목록 가져오기
  const getMovies = async () => {
    try {
      const json = await (
        await fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year")
      ).json();
      setMovies(json.data.movies);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  // 장르필터링

  const filteredGenre = selectedGenre
    ? movies.filter((movie) => movie.genres?.includes(selectedGenre))
    : [...recommendMovie, ...movies]; //MovieForm으로 작성한 영화도 추가될 수 있도록 설정

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
  const currentMovies = filteredMovied.slice(indexOfFirst, indexOfLast);

  // 좋아요 모달창
  const handleShowModal = () => {
    setIsShowLiked(true);
    document.body.style.overflow = "hidden";
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
            {currentMovies.length === 0 ? (
              <div className={styles.empty_text}>No movie</div>
            ) : (
              currentMovies.map((movie) => (
                <Movie
                  key={movie.id || movie.title} // 추가된 영화는 id값이 없으므로 title 사용
                  id={movie.id || movie.title}
                  year={movie.year}
                  coverImg={movie.medium_cover_image || movie.img || ""}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres || [movie.genre] || []}
                  // movies={currentMovies(movies)}
                  handleLikeMovies={handleLikeMovies}
                />
              ))
            )}
          </div>
        )}
        <div className={styles.paginationContainer}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={movies.length}
            paginate={setCurrentPage}
          ></Pagination>
        </div>
      </div>
    </>
  );
}
export default Home;
