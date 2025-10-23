import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="min-w-[150px] cursor-pointer transition-transform hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={150}
          height={220}
          className="rounded-lg"
        />
        <p className="mt-2 text-xs text-gray-300">{movie.title}</p>
      </div>
    </Link>
  );
}
