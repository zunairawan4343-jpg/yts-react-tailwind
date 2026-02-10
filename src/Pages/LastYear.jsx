import React, { useEffect, useState } from "react";
import { getMovieList } from "../api/movieService";
import MovieCard from "../Components/MovieCard";
import Paginition from "../Components/Paginition";

const LastYear = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  // Dynamically get last year
  const lastYear = new Date().getFullYear() - 1;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await getMovieList({
          minimum_year: lastYear,
          maximum_year: lastYear,
          sort_by: "rating",
          order_by: "desc",
          limit,
          page,
        });

        setMovies(data.movies || []);
        setTotalPages(Math.ceil((data.movieCount || 0) / limit));
      } catch (err) {
        console.error("Error fetching last year movies:", err);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, lastYear]);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-2 text-white text-center">
        Last Year Movies 2024-2025
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Discover the most highly rated movies from 2024-2025.
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

export default LastYear;
