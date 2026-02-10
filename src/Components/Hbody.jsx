import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { qualities, genres, ratings, years, orderOptions } from "./MovieFilters";
import MovieCard from "../Components/MovieCard"; 

function Hbody() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    quality: "All",
    genre: "All",
    rating: "all",
    year: "all",
    language: "All",
    orderBy: "Latest",
  });

  const fetchMovies = async (searchParams = {}) => {
    try {
      const params = new URLSearchParams({
        limit: "20",
        ...searchParams,
      });

      const res = await fetch(
        `https://yts.bz/api/v2/list_movies.json?${params}`
      );
      const data = await res.json();

      if (data.status === "ok") {
        setMovies(data.data.movies || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = () => {
    const params = {};
    if (query.trim()) params.query_term = query;
    if (filters.quality !== "All") params.quality = filters.quality;
    if (filters.genre !== "All") params.genre = filters.genre;
    if (filters.rating !== "0") params.minimum_rating = filters.rating;
    if (filters.year !== "0") params.year = filters.year;
    if (filters.language !== "All") params.language = filters.language;
    params.sort_by = filters.orderBy;
    fetchMovies(params);
  };

  const updateFilter = (key, value) =>
    setFilters({ ...filters, [key]: value });

  const mapToLabelValue = (arr, format) =>
    arr.map((item) => ({
      label: format ? format(item) : item,
      value: item,
    }));

  function formatYear(year) {
    return year === "0" ? "All" : year;
  }

  function formatRating(rating) {
    return rating === "0" ? "All" : rating;
  }

  function otherRating(rating) {
    return `${rating}+`;
  }

  const filterConfig = [
    { key: "quality", label: "Quality", options: mapToLabelValue(qualities) },
    { key: "genre", label: "Genre", options: mapToLabelValue(genres) },
    {
      key: "rating",
      label: "Rating",
      options: mapToLabelValue(ratings, formatRating),
    },
    {
      key: "year",
      label: "Year",
      options: mapToLabelValue(years, formatYear),
    },
    {
      key: "language",
      label: "Language",
      options: mapToLabelValue(["all", "en", "foreign"], otherRating),
    },
    {
      key: "orderBy",
      label: "Order By",
      options: mapToLabelValue(orderOptions),
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto p-8 space-y-5 text-white">
        <h4 className="font-bold">Search Terms</h4>

        <div className="flex gap-5">
          <Input
            placeholder="Search movies..."
            variant="bordered"
            value={query}
            onValueChange={setQuery}
          />
          <Button color="success" onPress={handleSearch}>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filterConfig.map((filter) => (
            <HeroSelect
              key={filter.key}
              label={filter.label}
              value={filters[filter.key]}
              options={filter.options}
              onChange={(v) => updateFilter(filter.key, v)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {movies.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">No movies found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} /> 
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeroSelect({ label, options, value, onChange }) {
  return (
    <Select
      label={label}
      selectedKeys={[value]}
      variant="bordered"
      onSelectionChange={(keys) => onChange([...keys][0])}
    >
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default Hbody;
