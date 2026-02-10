import React from "react";
import { Card, CardHeader, Image } from "@heroui/react";

function Mc({ movies = [], showTitle = true }) {
  return (
    <div className="bg-gray-900 p-6">
      {showTitle && (
        <h1 className="text-3xl font-bold text-white mb-6">Browse Movies</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {movies?.length ? (
          movies.map((movie) => (
            <Card key={movie.id} className="h-[300px] bg-black/50 rounded">
              <CardHeader className="absolute z-10 top-1 flex-col items-start bg-black/50 p-2 rounded">
                <p className="text-tiny text-white/70 uppercase font-bold">
                  {movie.year}
                </p>
                <h4 className="text-white font-medium text-sm line-clamp-2">
                  {movie.title}
                </h4>
                <p className="text-yellow-400 text-xs mt-1">
                  Rating: {movie.rating}/10
                </p>
              </CardHeader>

              <Image
                removeWrapper
                alt={movie.title}
                className="z-0 w-full h-full object-cover rounded" 
                src={movie.medium_cover_image}
              />
            </Card>
          ))
        ) : (
          <p className="text-white">No movies found</p>
        )}
      </div>
    </div>
  );
}

export default Mc;
