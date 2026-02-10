import React, { useState } from "react";
import { useMovies } from "../Hooks/hook";
import Hbody from "../Components/Hbody";

import { Button } from "@heroui/react";
import Paginition from "../Components/Paginition";

import Footer from "../Components/Footer";



function Home() {

  const [page, setPage] = useState(1);
  const { totalPages, loading, error } = useMovies({ type: "TOP_DATA", page });


  if (loading) return <div className="text-center py-20 text-white bg-gray-900 min-h-screen">  <Button isLoading color="light">
    Loading
  </Button></div>;
  if (error) return <div className="text-center py-20 text-red-500 bg-gray-900 min-h-screen">Error: {error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Welcome to FILMORA
        </h2>
        <p className="text-gray-300">
          Discover and browse your favorite movies.
        </p>
        
      </div>

      
      <Hbody />
      


      <div className="flex row justify-center items-center">
        <Paginition
        current={page}
        total={totalPages}
        onPageChange={(p) => setPage(p)}

      /> 
      </div>
   

      <Footer />
    </div>
  );
}

export default Home;