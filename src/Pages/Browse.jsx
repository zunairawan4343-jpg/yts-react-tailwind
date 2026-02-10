import React, { useState } from "react";
import { useMovies } from "../Hooks/hook";
import { Button } from "@heroui/react";
import Footer from "../Components/Footer";
import Paginition from "../Components/Paginition";
import MovieCard from "../Components/MovieCard";

function Browse() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error } = useMovies({ type: "BROWSE_DATA", page });

  if (loading)
    return (
      <div className="text-center py-20 text-white bg-gray-900 min-h-screen">
        <Button isLoading color="light">Loading</Button>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 bg-gray-900 min-h-screen">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Browse Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies?.length ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white col-span-full text-center">No movies found.</p>
        )}
      </div>
      <div className="flex justify-center my-6">
        <Paginition current={page} total={totalPages} onPageChange={(p) => setPage(p)} />
      </div>
      <Footer />
    </div>
  );
}

export default Browse;
