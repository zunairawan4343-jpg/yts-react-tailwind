import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../api/config.api";

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const movieFromState = location.state?.movieData;

  const [movie, setMovie] = useState(movieFromState || null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchMovie() {
      if (!movieFromState) {
        setLoading(true);
        try {
          const res = await fetch(
            `${BASE_URL}/api/v2/movie_details.json?movie_id=${id}&with_images=true`
          );
          const data = await res.json();
          if (isMounted) setMovie(data?.data?.movie || null);
        } catch (err) {
          console.error(err);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        setMovie(movieFromState);
      }

      try {
        const browseRes = await fetch(`${BASE_URL}/api/v2/list_movies.json`);
        const browseData = await browseRes.json();
        const allMovies = browseData?.data?.movies || [];
        const filtered = allMovies.filter((mv) => mv.id !== Number(id));
        if (isMounted) setSimilarMovies(filtered.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovie();
    return () => { isMounted = false; };
  }, [id, movieFromState]);

  return (
    <div className="min-h-screen text-gray-300 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start">
          <div className="border-4 border-white rounded shadow-2xl overflow-hidden mb-4 w-full md:w-auto">
            <img
              src={movie?.large_cover_image || "/placeholder.png"}
              alt={`${movie?.title || "Movie"} Poster`}
              className="w-full h-auto block"
            />
          </div>
          <button className="w-full md:full bg-black/85 hover:bg-black/100 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download
          </button>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-center md:text-left">
            {movie?.title || "Loading..."}
          </h1>

          <div className="mb-6 leading-relaxed flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center md:justify-start">
            <p className="font-bold text-white">{movie?.year || ""}</p>
            <p className="font-bold text-white">{movie?.genre || ""}</p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span className="italic text-sm">Available in:</span>
              {movie?.quality?.map((q, idx) => (
                <button
                  key={idx}
                  className={`${
                    q.highlight
                      ? "border-[#6ac045] ring-1 ring-[#6ac045]"
                      : "border-gray-600"
                  } bg-[#2f2f2f] border px-3 py-1 text-xs rounded hover:bg-gray-700`}
                >
                  {q.label} {q.tag && <span className="text-[#6ac045] ml-1">{q.tag}</span>}
                </button>
              ))}
            </div>
            <p className="text-xs text-white-500 italic text-center md:text-left">
              WEB: same quality as BluRay
            </p>
            <p className="text-xs text-white-500 italic text-center md:text-left">
              BluRay estimated release date:{" "}
              <span className="text-[#6ac045] font-semibold">{movie?.release_date || ""}</span>
            </p>
          </div>

          <button className="bg-[#2f2f2f] hover:bg-gray-700 border border-gray-600 px-4 py-1 rounded-sm text-sm flex items-center gap-2 mb-8 w-full md:w-auto justify-center md:justify-start">
            <span className="text-white">⤓</span> Download Subtitles
          </button>

          <div className="space-y-4 max-w-xs mx-auto md:mx-0">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-red-500 text-xl">❤</span>
              <span className="text-xl font-bold text-white-500">{movie?.like_count || 0}</span>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-red-500 text-xl">🍅</span>
              <div>
                <span className="text-xl font-bold text-white-500">{movie?.tomato_rating || 0}%</span>
                <span className="text-xs uppercase ml-1 text-white-500">
                  Tomatometer · {movie?.tomato_reviews || 0} reviews
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-white-500 text-xl font-bold">FILMORA</span>
              <div>
                <span className="text-xl font-bold text-gray-500">{movie?.audience_score || 0}%</span>
                <span className="text-xs uppercase ml-1 text-gray-500">
                  Audience · {movie?.audience_ratings || 0} ratings
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="bg-yellow-500 text-black px-1 font-bold text-xs rounded-sm">IMDb</span>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-black">{movie?.imdb_score || 0}</span>
                <span className="text-gray-500 text-sm">/10</span>
                <span className="text-white ml-2">★</span>
                <span className="text-xs text-gray-500">{movie?.imdb_votes || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-48 mt-6 md:mt-0">
          <h3 className="text-white font-bold mb-4 text-center md:text-left">Similar Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
            {similarMovies.length ? (
              similarMovies.map((sim) => (
                <Link key={sim.id} to={`/detail/${sim.id}`} state={{ movieData: sim }}>
                  <img
                    src={sim.medium_cover_image}
                    className="border-2 border-white rounded hover:scale-105 transition-transform hover:border-black/60 w-full"
                    alt={sim.title}
                  />
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center md:text-left">
                No similar movies found.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 flex flex-wrap gap-2 justify-center md:justify-start">
        {movie?.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="border border-gray-700 px-3 py-1 text-xs rounded hover:bg-gray-900 cursor-pointer transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
