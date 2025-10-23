const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(category: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`,
  );

  if (!res.ok) {
    console.error("Erro TMDB:", res.status, res.statusText);
    throw new Error("Erro ao buscar filmes");
  }

  return res.json();
}
