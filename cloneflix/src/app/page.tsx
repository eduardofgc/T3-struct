"use client";
import { useState, useEffect, FormEvent } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-1 h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function HomePage() {
  const API_KEY = "e5919b7f1e1089a4e65381cfa72b2969";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const popularMoviesURL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
  const searchMovieURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=`;
  const placeholderImage = (text: string) =>
    `https://placehold.co/500x750/111827/374151?text=${encodeURIComponent(text)}`;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sectionTitle, setSectionTitle] = useState("Filmes Populares");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Falha ao buscar filmes:", err);
      setError(
        "Não foi possível carregar os filmes. Tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(popularMoviesURL);
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      fetchMovies(searchMovieURL + trimmedSearch);
      setSectionTitle(`Resultados para: "${trimmedSearch}"`);
    } else {
      fetchMovies(popularMoviesURL);
      setSectionTitle("Filmes Populares");
    }
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white">

      <header className="sticky top-0 z-40 bg-gray-900/80 shadow-lg backdrop-blur-md">
        <nav className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-wider text-red-600">
            CLONEFLIX
          </h1>
          <form onSubmit={handleSearchSubmit} className="w-full max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar um filme..."
              className="w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </form>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold">{sectionTitle}</h2>

        {isLoading ? (
          <div className="col-span-full text-center text-lg">Carregando...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : movies.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
            Nenhum filme encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="transform cursor-pointer overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-red-600/30"
                onClick={() => setSelectedMovie(movie)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_BASE_URL}${movie.poster_path}`
                      : placeholderImage("Sem Imagem")
                  }
                  alt={`Poster de ${movie.title}`}
                  className="aspect-[2/3] h-auto w-full object-cover" // Garante a proporção
                  onError={(e) =>
                    (e.currentTarget.src = placeholderImage("Erro"))
                  }
                />
                <div className="p-3">
                  <h3
                    className="truncate text-sm font-semibold"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300 ${
          selectedMovie ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeModal} 
      >
        {selectedMovie && (
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-gray-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar no conteúdo
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 text-gray-400 transition-colors hover:text-white"
              aria-label="Fechar modal"
            >
              <CloseIcon />
            </button>

            <div className="flex flex-col md:flex-row">
              <img
                src={
                  selectedMovie.poster_path
                    ? `${IMG_BASE_URL}${selectedMovie.poster_path}`
                    : placeholderImage("Sem Imagem")
                }
                alt={`Poster de ${selectedMovie.title}`}
                className="h-auto w-full rounded-l-lg object-cover md:w-1/3"
                onError={(e) =>
                  (e.currentTarget.src = placeholderImage("Erro"))
                }
              />
              <div className="flex-1 p-6 md:p-8">
                <h2 className="mb-4 text-3xl font-bold">
                  {selectedMovie.title}
                </h2>
                <h3 className="mb-2 text-lg font-semibold text-red-500">
                  Resumo
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  {selectedMovie.overview || "Nenhum resumo disponível."}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-yellow-400">
                    <StarIcon />
                    <span className="text-lg font-bold">
                      {selectedMovie.vote_average?.toFixed(1) || "N/A"}
                    </span>
                  </span>
                  <span className="text-sm text-gray-400">
                    {selectedMovie.release_date
                      ? new Date(selectedMovie.release_date).toLocaleDateString(
                          "pt-BR",
                          { timeZone: "UTC" },
                        )
                      : "Data desconhecida"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
