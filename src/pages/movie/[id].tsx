// src/pages/movie/[id].tsx
import Image from "next/image";
import { GetServerSideProps } from "next";

export default function MoviePage({ movie }: { movie: any }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 py-10 text-white">
      <h1 className="mb-6 text-4xl font-bold">{movie.title}</h1>

      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="mb-6 rounded-lg"
        />
      )}

      <p className="max-w-2xl text-center text-gray-300">{movie.overview}</p>

      <div className="mt-6 text-sm text-gray-400">
        <p>🎬 Gênero: {movie.genres?.map((g: any) => g.name).join(", ")}</p>
        <p>⭐ Nota: {movie.vote_average.toFixed(1)}</p>
        <p>📅 Lançamento: {movie.release_date}</p>
        <p>🕒 Duração: {movie.runtime} min</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`,
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const movie = await res.json();
  return { props: { movie } };
};
