
import React, { useState } from "react";
import { Volume2, RotateCcw, Star, Camera, Heart } from "lucide-react";
import { ReactComponent as DressIcon } from "./assets/icons/dress.svg";
import { ReactComponent as ShoesIcon } from "./assets/icons/shoes.svg";
import { ReactComponent as VeilIcon } from "./assets/icons/veil.svg";
import { ReactComponent as BouquetIcon } from "./assets/icons/bouquet.svg";

/**
 * Mockup completo em estilo dress-up clássico:
 * - Paleta pastel (rosa, lilás, creme)
 * - Painéis laterais com botões grandes (categorias e itens)
 * - Área central com moldura decorativa e janela ao fundo
 * - TTS "Ouvir frase" e feedback visual suave
 * - Duas etapas: personagem -> cenário
 */

const DressUpStyleSentenceGame = () => {
  const [stage, setStage] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [chosenBackground, setChosenBackground] = useState(null);

  const characterExercises = [
    { sentence: "O MENINO BRINCA NO PARQUE", correctCharacter: "menino" },
    { sentence: "A MENINA NADA NA PISCINA", correctCharacter: "menina" },
    { sentence: "O BEBÊ DORME NO BERÇO", correctCharacter: "bebe" }
  ];

  const backgroundExercises = [
    { sentence: "O MENINO JOGA BOLA NA PRAIA", correctBackground: "praia" },
    { sentence: "A MENINA ESTUDA NA ESCOLA", correctBackground: "escola" },
    { sentence: "O GATO DORME NA CASA", correctBackground: "casa" }
  ];

  const characters = [
    { id: "menino", name: "MENINO", emoji: "👦" },
    { id: "menina", name: "MENINA", emoji: "👧" },
    { id: "bebe", name: "BEBÊ", emoji: "👶" },
    { id: "cachorro", name: "CACHORRO", emoji: "🐕" }
  ];

  const backgrounds = [
    { id: "praia", name: "PRAIA", icon: "🏖️" },
    { id: "escola", name: "ESCOLA", icon: "🏫" },
    { id: "casa", name: "CASA", icon: "🏠" },
    { id: "parquinho", name: "PARQUINHO", icon: "🎪" }
  ];

  const currentData = stage === 1 ? characterExercises[currentExercise] : backgroundExercises[currentExercise];

  // TTS
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(currentData.sentence);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Avança com feedback
  const advance = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (stage === 1) {
        if (currentExercise < characterExercises.length - 1) {
          setCurrentExercise((x) => x + 1);
          setChosenCharacter(null);
        } else {
          setStage(2);
          setCurrentExercise(0);
          setChosenCharacter(null);
        }
      } else {
        if (currentExercise < backgroundExercises.length - 1) {
          setCurrentExercise((x) => x + 1);
          setChosenBackground(null);
        }
      }
    }, 1200);
  };

  const reset = () => {
    setStage(1);
    setCurrentExercise(0);
    setShowSuccess(false);
    setChosenCharacter(null);
    setChosenBackground(null);
  };

  const totalSteps = characterExercises.length + backgroundExercises.length;
  const currentStepIndex = stage === 1 ? currentExercise + 1 : characterExercises.length + (currentExercise + 1);
  const progressPct = Math.round((currentStepIndex / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 p-4 md:p-8">
      {/* Header estilo dress-up */}
      <header className="max-w-6xl mx-auto mb-4">
        <div className="flex items-center justify-between px-4 py-3 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border-4 border-pink-200">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white border-4 border-pink-300 shadow-md grid place-items-center">
              <Star className="text-pink-500" />
            </div>
            <div className="w-14 h-14 rounded-full bg-white border-4 border-pink-300 shadow-md grid place-items-center">
              <Camera className="text-pink-500" />
            </div>
            <div className="w-14 h-14 rounded-full bg-white border-4 border-pink-300 shadow-md grid place-items-center">
              <Heart className="text-pink-500" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-pink-600 text-2xl md:text-3xl font-extrabold tracking-wide">
              ETAPA {stage} DE 2
            </h1>
            <p className="text-sm text-pink-500 font-semibold">
              ATIVIDADE {currentExercise + 1} de {stage === 1 ? characterExercises.length : backgroundExercises.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playAudio}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500/90 text-white font-bold border-4 border-white shadow-lg hover:bg-pink-600 transition"
            >
              <Volume2 size={20} />
              OUVIR FRASE
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-pink-600 font-bold border-4 border-pink-300 shadow-lg hover:shadow-pink-400 transition"
            >
              <RotateCcw size={20} />
              REINICIAR
            </button>
          </div>
        </div>
      </header>

      {/* Layout principal: painéis e canvas */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
        {/* Painel esquerdo — categorias (ícones SVG) */}
        <aside className="col-span-2 flex flex-col gap-3">
          {stage === 1 ? (
            <>
              <button className="w-full h-20 bg-white border-4 border-pink-300 rounded-2xl shadow-md grid place-items-center hover:shadow-pink-400">
                <DressIcon className="w-10 h-10 text-pink-500" />
              </button>
              <button className="w-full h-20 bg-white border-4 border-pink-300 rounded-2xl shadow-md grid place-items-center hover:shadow-pink-400">
                <ShoesIcon className="w-10 h-10 text-pink-500" />
              </button>
              <button className="w-full h-20 bg-white border-4 border-pink-300 rounded-2xl shadow-md grid place-items-center hover:shadow-pink-400">
                <VeilIcon className="w-10 h-10 text-pink-500" />
              </button>
              <button className="w-full h-20 bg-white border-4 border-pink-300 rounded-2xl shadow-md grid place-items-center hover:shadow-pink-400">
                <BouquetIcon className="w-10 h-10 text-pink-500" />
              </button>
            </>
          ) : (
            <>
              {["Praia", "Escola", "Casa", "Parquinho"].map((label) => (
                <button
                  key={label}
                  className="w-full h-20 bg-white border-4 border-pink-300 rounded-2xl shadow-md grid place-items-center hover:shadow-pink-400"
                >
                  <span className="text-pink-500 font-extrabold">{label}</span>
                </button>
              ))}
            </>
          )}
        </aside>

        {/* Canvas central — moldura, janela, personagem */}
        <main className="col-span-8">
          <div className="relative rounded-[2rem] border-[12px] border-pink-200 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl overflow-hidden">
            {/* “Janela” em background (quadrantes suaves) */}
            <div className="absolute inset-0 opacity-90 pointer-events-none">
              <div className="grid grid-cols-3 gap-2 p-6">
                {[...Array(9)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 rounded-xl shadow-inner"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(220,230,255,0.6))",
                      border: "3px solid rgba(255,182,193,0.5)"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Faixa com a frase */}
            <div className="relative z-10 px-6 pt-6">
              <div className="mx-auto max-w-xl bg-white/80 backdrop-blur-md rounded-full border-4 border-pink-300 shadow-lg px-6 py-3 text-center">
                <p className="text-pink-600 text-lg md:text-xl font-extrabold tracking-wide">
                  {currentData.sentence}
                </p>
              </div>
            </div>

            {/* Ilustração central (boneco/ícone) */}
            <div className="relative z-10 flex items-center justify-center py-10">
              <div className="text-8xl">{stage === 1 ? "🧍" : "🏞️"}</div>
            </div>

            {/* Progresso */}
            <div className="relative z-10 px-10 pb-8">
              <div className="h-4 bg-white/60 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #ff9ac6, #ffa8e6, #ffc8f0)"
                  }}
                />
              </div>
              <p className="mt-2 text-center text-pink-600 font-bold">PROGRESSO: {progressPct}%</p>
            </div>
          </div>
        </main>

        {/* Painel direito — opções clicáveis */}
        <aside className="col-span-2 flex flex-col gap-3">
          {stage === 1 ? (
            characters.map((c) => {
              const selected = chosenCharacter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setChosenCharacter(c.id);
                    if (c.id === characterExercises[currentExercise].correctCharacter) advance();
                  }}
                  className={`w-full h-16 bg-white border-4 rounded-2xl shadow-md grid grid-cols-[56px_1fr] items-center px-2 transition ${
                    selected ? "border-pink-500 shadow-pink-400" : "border-pink-300 hover:shadow-pink-400"
                  }`}
                >
                  <span className="text-4xl text-pink-500 justify-self-center">{c.emoji}</span>
                  <span className="text-pink-600 font-extrabold">{c.name}</span>
                </button>
              );
            })
          ) : (
            backgrounds.map((b) => {
              const selected = chosenBackground === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setChosenBackground(b.id);
                    if (b.id === backgroundExercises[currentExercise].correctBackground) advance();
                  }}
                  className={`w-full h-16 bg-white border-4 rounded-2xl shadow-md grid grid-cols-[56px_1fr] items-center px-2 transition ${
                    selected ? "border-pink-500 shadow-pink-400" : "border-pink-300 hover:shadow-pink-400"
                  }`}
                >
                  <span className="text-4xl text-pink-500 justify-self-center">{b.icon}</span>
                  <span className="text-pink-600 font-extrabold">{b.name}</span>
                </button>
              );
            })
          )}
        </aside>
      </div>

      {/* Modal de sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 bg-pink-200/40 backdrop-blur-sm grid place-items-center z-50">
          <div className="bg-white rounded-3xl border-8 border-pink-300 shadow-2xl px-10 py-8 text-center">
            <div className="text-6xl mb-2">✨</div>
            <p className="text-pink-600 text-2xl font-extrabold">PARABÉNS!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DressUpStyleSentenceGame;
