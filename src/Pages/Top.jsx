import React, { useEffect, useState } from "react";
import { getMovieList } from "../api/movieService";
import MovieCard from "../Components/MovieCard";
import Paginition from "../Components/Paginition";

const Top = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; 

  useEffect(() => {
    const fetchTopMovies = async () => {
      setLoading(true);
      const data = await getMovieList({
        sort_by: "rating",
        order_by: "desc",
        limit,
        page,
      });
      setMovies(data.movies || []);
      setTotalPages(Math.ceil((data.movieCount || 0) / limit));
      setLoading(false);
    };

    fetchTopMovies();
  }, [page]);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-2 text-white text-center">Top Movies</h2>
      <p className="text-gray-300 mb-6 text-center">
        Discover the most highly rated movies.
      </p>

      <div className="grid grid-cols-12 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Paginition
          current={page}
          total={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Top;
