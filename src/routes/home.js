import { useEffect, useState } from "react";
import Movie from "../components/movies";
import styles from "./home.module.css";
import Pagination from "../components/pagination";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

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
    const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year")).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
              movies={currentMovies(movies)}
            />
          ))}
        </div>
      )}
      <Pagination postsPerPage={postsPerPage} totalPosts={movies.length} paginate={setCurrentPage}></Pagination>
    </div>
  );
}
export default Home;
