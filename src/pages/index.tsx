import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import { fetchMovies } from "@/lib/tmdb";
import { categories } from "@/data/categories";
import { Movie } from "@/types/movie";

export default function Home() {
  const [movies, setMovies] = useState<Record<string, Movie[]>>({});
  const [hero, setHero] = useState<Movie | null>(null);

  useEffect(() => {
    async function loadData() {
      const loaded: Record<string, Movie[]> = {};
      for (const cat of categories) {
        const res = await fetchMovies(cat.key);
        loaded[cat.key] = res.results;
      }
      setMovies(loaded);
      setHero(loaded["popular"]?.[0]);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroBanner movie={hero} />
      <div className="mt-10 space-y-12">
        {categories.map((cat) => (
          <MovieRow
            key={cat.key}
            title={cat.title}
            movies={movies[cat.key] || []}
          />
        ))}
      </div>
    </main>
  );
}
