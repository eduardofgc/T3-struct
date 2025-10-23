import React, { useState } from "react";
import "./index.css"; // Tailwind import (make sure Tailwind is configured)

export default function ResumeFlix() {
  const [showText, setShowText] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-6xl font-bold mb-4">ResumeFlix</h1>
      <label className="block text-sm font-medium text-gray-400 mb-8">
        Site de leitura de resumo de filmes
      </label>

      <div
        className={`text-lg text-center max-w-xl transition-all duration-500 ${
          showText ? "animate-fadeSlideDown" : "hidden"
        }`}
      >
        <p>
          Após entulhar a Terra de lixo e poluir a atmosfera com gases tóxicos,
          a humanidade deixou o planeta e passou a viver em uma gigantesca nave.
          O plano era que o retiro durasse alguns poucos anos, com robôs sendo
          deixados para limpar o planeta. WALL-E é o último destes robôs, e sua
          vida consiste em compactar o lixo existente no planeta. Até que um dia
          surge repentinamente uma nave, que traz um novo e moderno robô: Eva. A
          princípio curioso, WALL-E se apaixona e resolve segui-la por toda a
          galáxia.
        </p>
      </div>

      <button
        onClick={() => setShowText(!showText)}
        className="fixed bottom-6 left-6"
      >
        <img
          src="wall-e.jpg"
          alt="Wall-E"
          className="w-24 cursor-pointer hover:scale-105 transition-transform"
        />
      </button>
    </div>
  );
}
