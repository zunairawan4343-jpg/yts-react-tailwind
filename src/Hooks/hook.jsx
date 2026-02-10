import { useState, useEffect } from "react";
import { getMovieList } from "../api/movieService";

export const useMovies = ({ type = "BROWSE_DATA", page = 1 }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovieList({ page });
        setMovies(data.movies || []);
        setTotalPages(Math.ceil((data.movieCount || 0) / (data.limit || 20)));
        setError(null);
      } catch (err) {
        console.error("useMovies error:", err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, totalPages, loading, error };
};

export const useTopMovies = (page = 1) => {     
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovieList({ page, sort_by: "rating", order_by: "desc", limit: 100 });
        setMovies(data.movies || []);
        setTotalPages(Math.ceil((data.movieCount || 0) / (data.limit || 20)));
        setError(null);
      }
        catch (err) {
        console.error("useTopMovies error:", err);
        setError(err.message);
        setMovies([]);
      }
        finally { 
        setLoading(false);
      }
    } ;

    fetchMovies();
  }, [page]);

  return { movies, totalPages, loading, error };
};  

export const useLatestMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovieList({ page, year: 2025, sort_by: "rating", order_by: "desc", limit: 50 });
        setMovies(data.movies || []);
        setTotalPages(Math.ceil((data.movieCount || 0) / (data.limit || 20)));
        setError(null);
      } catch (err) {
        console.error("useLatestMovies error:", err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }   
    };

    fetchMovies();
  }, [page]);

  return { movies, totalPages, loading, error };
};

export const useLastYearMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovieList({ page, year: 2024, sort_by: "rating", order_by: "desc", limit: 50 });
        setMovies(data.movies || []);
        setTotalPages(Math.ceil((data.movieCount || 0) / (data.limit || 20)));
        setError(null);
      } catch (err) {
        console.error("useLastYearMovies error:", err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, totalPages, loading, error };
}


