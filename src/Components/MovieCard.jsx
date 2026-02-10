import { useEffect, useState } from "react";
import { Image, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function Card({ movie, onFavoriteChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.some((m) => m.id === movie.id)) {
      favs = favs.filter((m) => m.id !== movie.id);
      setIsFav(false);
    } else {
      favs.push(movie);
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    if (onFavoriteChange) onFavoriteChange(favs);
  };

  return (
    <div
      className={`
        relative w-[150px] h-[220px] sm:w-[180px] sm:h-[260px] md:w-[210px] md:h-[300px] lg:w-[230px] lg:h-[330px]
        rounded-lg overflow-hidden cursor-pointer
        transition-transform duration-300 ease-in-out
        ${isHovered ? "z-50 scale-110" : "z-10 scale-100"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        alt={movie.title}
        src={movie.medium_cover_image}
        className={`object-cover w-full h-full transition-all duration-300 ${
          isHovered ? "brightness-75" : "brightness-100"
        }`}
      />

      {isHovered && (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-30 text-2xl transition-transform hover:scale-125"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      )}

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col justify-end gap-2 z-20 transition-all duration-300">
          <div className="flex justify-between items-center text-white text-xs sm:text-sm font-semibold mb-1">
            <span>⭐ {movie.rating ?? "N/A"}</span>
            <span className="line-clamp-1">{movie.genres?.join(", ") ?? "Genre: N/A"}</span>
          </div>
          <Link to={`/detail/${movie.id}`}>
            <Button
              size="sm"
              radius="lg"
              color="primary"
              className="w-full bg-red-600 hover:bg-red-700 transition-colors"
            >
              View Details
            </Button>
          </Link>
        </div>
      )}

      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-1 px-2 text-center text-xs sm:text-sm font-semibold line-clamp-1">
          {movie.title}
        </div>
      )}
    </div>
  );
}
