import { useParams, useEffect } from "react";

function Detail() {
  // 컴포넌트 이름을 대문자로 수정
  const { id } = useParams();

  useEffect(() => {
    // Fetch movie details or other side effects
  }, [id]);

  return <div>Movie Detail for {id}</div>;
}

export default Detail;
