import React, { useState, useMemo } from 'react';
import { ARABIC_CATEGORIES, VOCABULARY_LIST } from '../data/arabicBasicData';
import { VocabularyItem } from '../types';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Check, HelpCircle, RotateCcw } from 'lucide-react';

interface ArabicBasicModuleProps {
  onEarnStar: (stars: number) => void;
}

export const ArabicBasicModule: React.FC<ArabicBasicModuleProps> = ({ onEarnStar }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('kelas');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'kartu' | 'kuis-mufradat'>('kartu');

  // Quiz Mode State
  const currentCategoryVocabs = VOCABULARY_LIST.filter(v => v.category === selectedCategory);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    soundAudio.playTing();
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundAudio.speakArabic(text);
  };

  // Prepare Quiz Question with stable shuffled options
  const activeQuizItem = currentCategoryVocabs[quizIdx] || currentCategoryVocabs[0];
  const quizOptions = useMemo(() => {
    if (!activeQuizItem) return [];
    const otherItems = currentCategoryVocabs.filter(v => v.id !== activeQuizItem.id);
    const shuffledWrong = [...otherItems].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [activeQuizItem, ...shuffledWrong].sort(() => 0.5 - Math.random());
  }, [activeQuizItem?.id, selectedCategory, quizIdx]);

  const handleSelectQuizAnswer = (meaning: string) => {
    if (quizAnswered) return;
    setSelectedQuizAnswer(meaning);
    setQuizAnswered(true);

    if (meaning === activeQuizItem.meaning) {
      soundAudio.playSuccessChime();
      setQuizScore(prev => prev + 1);
      onEarnStar(1);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else {
      soundAudio.playErrorBuzz();
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < currentCategoryVocabs.length) {
      setQuizIdx(prev => prev + 1);
      setSelectedQuizAnswer(null);
      setQuizAnswered(false);
    } else {
      // Completed category quiz
      soundAudio.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  const handleResetQuiz = () => {
    setQuizIdx(0);
    setSelectedQuizAnswer(null);
    setQuizAnswered(false);
    setQuizScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none font-arabic text-9xl">
          مُفْرَدَات
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Bahasa Arab Dasar MI</span>
            <span>·</span>
            <span>Kosakata & Ungkapan Tematik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Mufradat & Percakapan Santri MI
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed mb-4">
            Kuasai kosakata dasar seputar madrasah, keluarga, tubuh, angka, dan percakapan harian santri lengkap dengan audio suara pelafalan.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setViewMode('kartu')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                viewMode === 'kartu'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              Mode Kartu Hafalan (Flashcards)
            </button>
            <button
              onClick={() => {
                setViewMode('kuis-mufradat');
                handleResetQuiz();
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                viewMode === 'kuis-mufradat'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              Mode Uji Cepat Tebak Arti
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {ARABIC_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleResetQuiz();
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/30 shadow-xs'
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-arabic text-lg font-bold text-emerald-800 mb-0.5">
                {cat.arabicTitle}
              </div>
              <div className="font-bold text-xs text-slate-900">{cat.title}</div>
            </button>
          );
        })}
      </div>

      {/* Mode 1: Kartu Flashcards */}
      {viewMode === 'kartu' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {currentCategoryVocabs.length} Kosakata Tersedia (Klik kartu untuk membalik arti)
            </span>
            <button
              onClick={() => {
                onEarnStar(1);
                soundAudio.playSuccessChime();
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selesaikan Bab (+1 Bintang)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentCategoryVocabs.map((item: VocabularyItem) => {
              const isFlipped = !!flippedCards[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-5 cursor-pointer shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[200px] group relative"
                >
                  {/* Top Bar on Card */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {isFlipped ? 'Bahasa Indonesia' : 'Tulisan Arab'}
                    </span>
                    <button
                      onClick={e => handleSpeak(item.arabic, e)}
                      title="Dengar suara pelafalan"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Main Content */}
                  <div className="text-center py-3 my-auto">
                    {!isFlipped ? (
                      <>
                        <div className="font-arabic text-3xl sm:text-4xl font-bold text-slate-900 mb-2 group-hover:scale-105 transition-transform">
                          {item.arabic}
                        </div>
                        <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                          {item.transliteration}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xl font-bold text-slate-900 mb-1">
                          {item.meaning}
                        </div>
                        <div className="text-xs text-slate-500 font-arabic text-base">
                          {item.arabic}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Example sentence or tip */}
                  {item.exampleSentence && (
                    <div className="pt-2 border-t border-slate-100 text-xs">
                      <div className="font-arabic font-semibold text-emerald-950 text-right text-sm">
                        {item.exampleSentence.arabic}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.exampleSentence.translation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Kuis Uji Cepat Mufradat */}
      {viewMode === 'kuis-mufradat' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {quizIdx < currentCategoryVocabs.length ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Uji Hafalan Kosakata
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {quizIdx + 1} dari {currentCategoryVocabs.length}
                </span>
              </div>

              {/* Vocab Question Display */}
              <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="font-arabic text-4xl sm:text-5xl font-bold text-slate-900 block mb-1">
                  {activeQuizItem.arabic}
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  ({activeQuizItem.transliteration})
                </span>
                <div className="pt-2">
                  <button
                    onClick={() => soundAudio.speakArabic(activeQuizItem.arabic)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengarkan Suara</span>
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-800 text-center">
                Apakah arti dari kata bahasa Arab di atas?
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map((opt, i) => {
                  const isSelected = selectedQuizAnswer === opt.meaning;
                  const isCorrect = opt.meaning === activeQuizItem.meaning;

                  let style = 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20';
                  if (quizAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500';
                    } else if (isSelected) {
                      style = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      style = 'opacity-40 border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={quizAnswered}
                      onClick={() => handleSelectQuizAnswer(opt.meaning)}
                      className={`p-3.5 rounded-xl border text-center text-sm font-semibold transition-all ${style}`}
                    >
                      {opt.meaning}
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="pt-2">
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    {quizIdx + 1 < currentCategoryVocabs.length ? 'Lanjut Kata Berikutnya' : 'Selesai & Lihat Skor'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Mumtaz! Hafalan Tuntas
              </h2>
              <p className="text-sm text-slate-600">
                Skor kamu: <span className="font-bold text-emerald-700">{quizScore}</span> benar dari {currentCategoryVocabs.length} kata pada bab ini.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis Bab Ini</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
