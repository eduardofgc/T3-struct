import React, { useState } from "react";
import "./index.css";
import wallE from "./wall-e.jpg";
import up from "./up.jpg";
import coco from "./coco.jpg";
import nemo from "./nemo.jpg";

const movies = [
  {
    title: "WALL-E",
    image: wallE,
    description:
      "Após entulhar a Terra de lixo e poluir a atmosfera, a humanidade deixou o planeta. WALL-E é o último robô, compactando lixo até que Eva aparece, e sua vida muda para sempre.",
  },
  {
    title: "Up",
    image: up,
    description:
      "Carl Fredricksen, um viúvo idoso, decide realizar o sonho de sua esposa de viajar para a América do Sul, levando sua casa voadora cheia de balões.",
  },
  {
    title: "Coco",
    image: coco,
    description:
      "Miguel, um jovem aspirante a músico, entra no mundo dos mortos para descobrir a história de sua família e seguir seu amor pela música.",
  },
  {
    title: "Finding Nemo",
    image: nemo,
    description:
      "Marlin atravessa o oceano em busca de seu filho perdido, Nemo, encontrando aventuras e amizades pelo caminho.",
  },
];

export default function ResumeFlix() {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white font-sans relative">
      <div className="p-8">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">
          Resume<span className="text-white">Flix</span>
        </h1>
        <p className="text-gray-400 italic mb-8">
          Seu catálogo de resumos cinematográficos
        </p>

        {/* Horizontal scrollable row */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-64 cursor-pointer transition-transform transform hover:scale-110"
              onMouseEnter={() => setHoveredMovie(idx)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {/* Overlay on hover */}
              {hoveredMovie === idx && (
                <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col justify-center items-center p-4 text-center transition-opacity duration-300">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-gray-300 text-sm">{movie.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-32 left-0 right-0 h-96 bg-red-600/10 blur-3xl"></div>
    </div>
  );
}
