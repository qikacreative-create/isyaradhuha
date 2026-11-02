import React, { useState } from 'react';
import {
  INDONESIAN_UNITS,
  STORIES_DATA,
  PUNCTUATION_RULES,
  POLITE_WORDS_CASES,
  ANTONYM_SYNONYM_LIST,
  SENTENCE_JUMBLES,
  POETRY_LIST
} from '../data/indonesianGrade2Data';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Heart,
  MessageCircle,
  HelpCircle,
  Award
} from 'lucide-react';

interface IndonesianGrade2ModuleProps {
  onEarnStar: (count: number) => void;
}

export const IndonesianGrade2Module: React.FC<IndonesianGrade2ModuleProps> = ({ onEarnStar }) => {
  const [activeUnitId, setActiveUnitId] = useState<string>('membaca_cerita');

  // Story reading state
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
  const [storyQuizAnswers, setStoryQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [storyQuizSubmitted, setStoryQuizSubmitted] = useState<boolean>(false);

  // Sentence Jumble Game State
  const [jumbleIndex, setJumbleIndex] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [jumbleResult, setJumbleResult] = useState<'correct' | 'wrong' | null>(null);

  // Antonym Matching Game State
  const [selectedAntonymId, setSelectedAntonymId] = useState<string | null>(null);
  const [revealedAntonyms, setRevealedAntonyms] = useState<{ [id: string]: boolean }>({});

  const handleSelectUnit = (id: string) => {
    setActiveUnitId(id);
    soundAudio.playTing();
  };

  const currentStory = STORIES_DATA[selectedStoryIndex];
  const currentJumble = SENTENCE_JUMBLES[jumbleIndex];

  // Speech helper for Indonesian story
  const handleReadStoryAloud = () => {
    soundAudio.playTing();
    // Use Web Speech for Indonesian
    if ('speechSynthesis' in window) {
      const textToRead = `${currentStory.title}. ${currentStory.paragraph1} ${currentStory.paragraph2} ${currentStory.paragraph3}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectStoryQuizOption = (qIdx: number, oIdx: number) => {
    setStoryQuizAnswers(prev => ({
      ...prev,
      [qIdx]: oIdx
    }));
  };

  const handleCheckStoryQuiz = () => {
    setStoryQuizSubmitted(true);
    let correctCount = 0;
    currentStory.quizQuestions.forEach((q, i) => {
      if (storyQuizAnswers[i] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === currentStory.quizQuestions.length) {
      soundAudio.playSuccessChime();
      onEarnStar(3);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundAudio.playTing();
      onEarnStar(1);
    }
  };

  // Sentence Jumble Game Handlers
  const handleAddWordToSentence = (word: string) => {
    if (selectedWords.includes(word)) return;
    const newWords = [...selectedWords, word];
    setSelectedWords(newWords);
    soundAudio.playTing();

    if (newWords.length === currentJumble.correctWords.length) {
      // Check if order matches
      const isCorrect = newWords.every((w, idx) => w === currentJumble.correctWords[idx]);
      if (isCorrect) {
        setJumbleResult('correct');
        soundAudio.playSuccessChime();
        onEarnStar(1);
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        setJumbleResult('wrong');
        soundAudio.playWrongBuzzer();
      }
    }
  };

  const handleResetJumble = () => {
    setSelectedWords([]);
    setJumbleResult(null);
  };

  const handleNextJumble = () => {
    setSelectedWords([]);
    setJumbleResult(null);
    if (jumbleIndex < SENTENCE_JUMBLES.length - 1) {
      setJumbleIndex(prev => prev + 1);
    } else {
      setJumbleIndex(0);
    }
  };

  const toggleAntonymReveal = (id: string) => {
    soundAudio.playTing();
    setRevealedAntonyms(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-15 text-8xl font-black select-none pointer-events-none">
          ABC
        </div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-extrabold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bahasa Indonesia Kelas 2 SD</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Cakap Berbahasa & Berakhlak Santun 🇮🇩
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium">
            Membaca cerita bergambar dan pemahaman 5W1H, kaidah huruf kapital & tanda baca, 4 kata ajaib sopan santun, lawan kata, menyusun kalimat padu, dan puisi anak nusantara!
          </p>
        </div>
      </div>

      {/* Navigation Unit Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {INDONESIAN_UNITS.map(unit => {
          const isSelected = activeUnitId === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => handleSelectUnit(unit.id)}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400/20 translate-y-[-2px]'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-lg sm:text-xl">{unit.icon}</span>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-blue-200 text-blue-900' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {unit.badge}
                </span>
              </div>
              <div className="font-extrabold text-xs text-slate-800 line-clamp-2 leading-tight">
                {unit.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* UNIT 1: MEMBACA CERITA & MENYIMAK PEMAHAMAN 5W1H */}
      {activeUnitId === 'membaca_cerita' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{currentStory.emoji}</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">{currentStory.title}</h3>
                <p className="text-xs text-emerald-700 font-bold">
                  Tema: {currentStory.theme}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReadStoryAloud}
                className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>Bacakan Cerita</span>
              </button>
              <div className="flex gap-1">
                {STORIES_DATA.map((st, i) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStoryIndex(i);
                      setStoryQuizAnswers({});
                      setStoryQuizSubmitted(false);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                      selectedStoryIndex === i
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    Cerita {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Story Paragraphs Card */}
          <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-3.5 leading-relaxed text-sm text-slate-800">
            <p className="indent-6">{currentStory.paragraph1}</p>
            <p className="indent-6">{currentStory.paragraph2}</p>
            <p className="indent-6">{currentStory.paragraph3}</p>
          </div>

          {/* Vocabulary Box */}
          <div className="space-y-2">
            <div className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <span>💡</span>
              <span>Kosakata Baru dalam Cerita:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentStory.vocabulary.map((vocab, vIdx) => (
                <div key={vIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-0.5">
                  <div className="font-black text-xs text-blue-900">{vocab.word}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{vocab.meaning}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehension Quiz */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900">
                Uji Pemahaman Isi Cerita (Pertanyaan Siapa, Di mana, Mengapa):
              </h4>
            </div>

            <div className="space-y-4">
              {currentStory.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <div className="text-xs font-extrabold text-slate-900">
                    {qIdx + 1}. {q.question}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = storyQuizAnswers[qIdx] === oIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (storyQuizSubmitted) {
                        if (oIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-blue-100 border-blue-500 text-blue-900 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={storyQuizSubmitted}
                          onClick={() => handleSelectStoryQuizOption(qIdx, oIdx)}
                          className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCheckStoryQuiz}
                disabled={Object.keys(storyQuizAnswers).length === 0 || storyQuizSubmitted}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Jawaban Cerita</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIT 2: HURUF KAPITAL & TANDA BACA (PUEBI SD) */}
      {activeUnitId === 'huruf_kapital_tanda_baca' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Pedoman Huruf Kapital & Tanda Baca (Titik, Tanya, Seru)
                </h3>
                <p className="text-xs text-slate-500">
                  Perhatikan perbedaan penulisan yang salah dan benar menurut kaidah bahasa Indonesia.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PUNCTUATION_RULES.map(rule => (
              <div
                key={rule.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                    Kaidah Ejaan
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-900">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Salah: <s>“{rule.sentenceWrong}”</s></span>
                  </div>

                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-950 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Benar: “{rule.sentenceCorrect}”</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 leading-snug bg-white p-2.5 rounded-xl border border-slate-100">
                  💡 <strong>Penjelasan:</strong> {rule.ruleExplanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UNIT 3: 4 KATA AJAIB & SOPAN SANTUN */}
      {activeUnitId === 'kata_ajaib_santun' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Empat Kata Ajaib Anak Sholihah & Siswa Teladan
                </h3>
                <p className="text-xs text-slate-500">
                  Selalu gunakan kata “Tolong”, “Terima Kasih”, “Maaf”, dan “Permisi” dalam kehidupan sehari-hari.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POLITE_WORDS_CASES.map(pw => (
              <div
                key={pw.id}
                className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-3 hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{pw.emoji}</span>
                    <span className="text-sm font-black text-rose-900 bg-rose-200/80 px-3 py-0.5 rounded-full">
                      Kata Ajaib: {pw.magicWord}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-700">
                  Skenario: {pw.scenario}
                </div>

                <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs font-semibold text-rose-950 italic">
                  {pw.dialogueExample}
                </div>

                <div className="text-[11px] text-slate-500 leading-snug">
                  📌 <strong>Kapan digunakan:</strong> {pw.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UNIT 4: LAWAN KATA (ANTONIM) & PERSAMAAN KATA (SINONIM) */}
      {activeUnitId === 'lawan_kata_persamaan' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Lawan Kata (Antonim) & Persamaan Kata (Sinonim)
                </h3>
                <p className="text-xs text-slate-500">
                  Klik tombol kartu untuk melihat lawan kata dan persamaan katanya!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ANTONYM_SYNONYM_LIST.map(item => {
              const isRevealed = !!revealedAntonyms[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleAntonymReveal(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer select-none transition-all space-y-2 text-center ${
                    isRevealed
                      ? 'bg-amber-50 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="font-black text-sm text-slate-900">{item.word}</div>

                  {isRevealed ? (
                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="text-rose-700 font-bold bg-rose-100/70 py-1 px-2 rounded-lg">
                        Lawan: <strong>{item.antonym}</strong>
                      </div>
                      <div className="text-emerald-700 font-bold bg-emerald-100/70 py-1 px-2 rounded-lg">
                        Sama: <strong>{item.synonym}</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-amber-700 bg-amber-100/70 py-1 rounded-lg">
                      Klik Buka Pasangan
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* UNIT 5: MENYUSUN KALIMAT PADU (SPOK SEDERHANA) */}
      {activeUnitId === 'susun_kalimat' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧩</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Tantangan Susun Kata Menjadi Kalimat Padu (Tantangan {jumbleIndex + 1} dari {SENTENCE_JUMBLES.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Klik kata-kata acak berikut sesuai urutan yang tepat agar menjadi kalimat yang benar!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-5 space-y-4">
            {/* Clue / Hint */}
            <div className="text-xs text-purple-900 font-bold bg-purple-100/80 px-3 py-1 rounded-lg inline-block">
              💡 Petunjuk: {currentJumble.hint}
            </div>

            {/* Answer Display Box */}
            <div className="min-h-[56px] bg-white border-2 border-dashed border-purple-300 rounded-xl p-3 flex flex-wrap items-center gap-2">
              {selectedWords.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Klik kata-kata di bawah untuk merangkai kalimat di sini...
                </span>
              ) : (
                selectedWords.map((w, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-purple-600 text-white font-extrabold text-xs rounded-lg shadow-2xs"
                  >
                    {w}
                  </span>
                ))
              )}
            </div>

            {/* Jumbled Word Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentJumble.jumbledWords.map((word, wIdx) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={wIdx}
                    disabled={isSelected}
                    onClick={() => handleAddWordToSentence(word)}
                    className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                      isSelected
                        ? 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                        : 'bg-white text-slate-800 border-purple-300 hover:bg-purple-100 active:scale-95 shadow-xs'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            {/* Game Result Notice */}
            {jumbleResult === 'correct' && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Maa syaa Allah, kalimatmu tersusun sempurna dan tepat! ⭐</span>
                </div>
                <button
                  onClick={handleNextJumble}
                  className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Soal Berikutnya
                </button>
              </div>
            )}

            {jumbleResult === 'wrong' && (
              <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl flex items-center justify-between text-xs text-rose-950 font-bold">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Susunan kata belum tepat. Ayo coba ulangi lagi ya!</span>
                </div>
                <button
                  onClick={handleResetJumble}
                  className="px-3 py-1 bg-rose-700 text-white rounded-lg text-xs font-bold"
                >
                  Ulangi
                </button>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={handleResetJumble}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Reset Kata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIT 6: PUISI & PANTUN ANAK NUSANTARA */}
      {activeUnitId === 'puisi_pantun_anak' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Puisi Anak & Pantun Nasihat Budi Pekerti
                </h3>
                <p className="text-xs text-slate-500">
                  Baca puisi dengan intonasi yang lembut serta hayati nasihat pantun budi pekerti nusantara.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POETRY_LIST.map(p => (
              <div
                key={p.id}
                className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <div className="font-black text-sm text-slate-900">{p.title}</div>
                      <div className="text-[10px] text-amber-800 font-medium">{p.author}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-100 space-y-1.5 text-xs text-slate-700 italic leading-relaxed">
                  {p.lines.map((line, lIdx) => (
                    <div key={lIdx}>“{line}”</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pantun Nasihat Card */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-3">
            <div className="font-black text-sm text-teal-950 flex items-center gap-2">
              <span>🪕</span>
              <span>Pantun Nasihat Rajin Belajar:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-teal-100 space-y-1 leading-relaxed">
                <p><em>Pohon kelapa tumbuh di taman,</em></p>
                <p><em>Buahnya lebat airnya segar.</em></p>
                <p><strong>Kalau engkau ingin banyak teman,</strong></p>
                <p><strong>Tutur katalah dengan ramah dan sopan.</strong></p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-teal-100 space-y-1 leading-relaxed">
                <p><em>Pergi ke pasar membeli mangga,</em></p>
                <p><em>Mangganya manis berwarna jingga.</em></p>
                <p><strong>Mari rajin belajar dan berdoa,</strong></p>
                <p><strong>Bakti mulia pada orang tua.</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
