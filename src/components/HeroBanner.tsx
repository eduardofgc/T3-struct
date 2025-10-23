import Image from "next/image";
import { Movie } from "@/types/movie";

export default function HeroBanner({ movie }: { movie: Movie | null }) {
  if (!movie) return null;

  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover brightness-50"
      />
      <div className="absolute bottom-20 left-10 max-w-xl text-white">
        <h1 className="text-5xl font-bold">{movie.title}</h1>
        <p className="mt-4 text-sm text-gray-300">{movie.overview}</p>
      </div>
    </section>
  );
}
