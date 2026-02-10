import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Image,
} from "@heroui/react";
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const SearchIcon = ({ size = 18 }) => {
  return (
    <svg fill="none" height={size} width={size} viewBox="0 0 24 24">
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default function AppNavbar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-all duration-200 ${
      isActive
        ? "text-blue-400 border-b-2 border-blue-400"
        : "text-white hover:text-blue-400"
    }`;

  const searchMovies = async (value, limit = 5) => {
    if (!value.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://yts.bz/api/v2/list_movies.json?query_term=${value}&limit=${limit}`
      );
      const data = await res.json();

      if (data.status === "ok" && data.data.movies) {
        setSuggestions(data.data.movies);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch {
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      searchMovies(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowResults(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://yts.bz/api/v2/list_movies.json?query_term=${search}&limit=20`
        );
        const data = await res.json();

        if (data.status === "ok" && data.data.movies) {
          setSearchResults(data.data.movies);
        } else {
          setSearchResults([]);
        }

        setShowResults(true);
        setShowSuggestions(false);
      } catch {
        setSearchResults([]);
        setShowResults(true);
        setShowSuggestions(false);
      }
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/movie/${id}`);
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    setShowResults(false);
  };

  return (
    <>
      <Navbar isBordered className="justify-between bg-gray-900">
        <NavbarContent>
          <NavbarBrand className="text-white">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit text-white">
              FILMORA
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" className="items-center relative">
          <div className="relative w-full">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[50rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal w-full sm:w-[40rem] bg-gray-700 hover:bg-gray-600 ms-0 sm:ms-25 text-white",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-50 w-full sm:w-[40rem]">
                {suggestions.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleSuggestionClick(movie.id)}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition"
                  >
                    <img
                      src={movie.small_cover_image}
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div>
                      <span className="text-white text-sm font-medium">
                        {movie.title}
                      </span>
                      <span className="block text-gray-400 text-xs">
                        {movie.year} • ⭐ {movie.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg p-4 z-50 w-full sm:w-[40rem]">
                <p className="text-white text-center">Searching movies...</p>
              </div>
            )}
          </div>
        </NavbarContent>

        <div className="flex items-center sm:hidden ms-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded hover:bg-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        <NavbarContent className="hidden sm:flex gap-3 items-center ">
          <NavbarItem>
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/" className={navLinkClass}>
              Browse Movies
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/top100" className={navLinkClass}>
             Top 100
            </NavLink>
           </NavbarItem>
         
              <NavbarItem>
            <NavLink to="/LastYear" className={navLinkClass}>
              2024-2025
            </NavLink>
            
          </NavbarItem>
        
              <NavbarItem>
            <NavLink to="/Heart" className={navLinkClass}>
              ❤
            </NavLink>
            
          </NavbarItem>

          <NavbarItem className="flex gap-4 ms-9">
            <Button as={RouterLink} to="/login" color="primary" variant="shadow">
              Login
            </Button>
            <Button as={RouterLink} to="/signup" color="primary" variant="shadow">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {showResults && (
        <div className="bg-gray-950 min-h-screen pt-6 pb-12">
          <div className="px-4 md:px-8">
            <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {searchResults.length} movies found
                </h2>
                <p className="text-gray-400">
                  Search results for "{search}"
                </p>
              </div>
              <Button
                isIconOnly
                className="bg-gray-700 hover:bg-gray-600 text-white"
                onClick={() => {
                  setSearch("");
                  setSearchResults([]);
                  setShowResults(false);
                }}
              >
                ✕
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie.id)}
                      className="cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800">
                        <Image
                          alt={movie.title}
                          className="w-full object-cover h-44 sm:h-56 md:h-64 lg:h-72"
                          src={movie.medium_cover_image}
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                          {movie.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 max-w-7xl mx-auto">
                <p className="text-gray-400 text-lg">
                  No movies found for "{search}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
