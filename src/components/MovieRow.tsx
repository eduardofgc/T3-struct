import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <div className="px-10">
      <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll pb-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
