import React, { useState, useMemo } from 'react';
import { ImlaLesson } from '../types';
import { IMLA_LESSONS, HIJAIYAH_LETTERS, HijaiyahLetter } from '../data/imlaData';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, XCircle, Sparkles, BookOpen, PenTool, Lightbulb, ArrowRight, RotateCcw, Link as LinkIcon } from 'lucide-react';

interface ImlaModuleProps {
  onEarnStar: (count: number) => void;
  onNavigateToCanvas: (letter?: string) => void;
  onNavigateToGame?: (gameTab: 'sambung-hijaiyah') => void;
}

export const ImlaModule: React.FC<ImlaModuleProps> = ({ onEarnStar, onNavigateToCanvas, onNavigateToGame }) => {
  const [selectedLesson, setSelectedLesson] = useState<ImlaLesson>(IMLA_LESSONS[0]);
  const [activeTab, setActiveTab] = useState<'materi' | 'latihan-dikte' | 'tabel-huruf'>('materi');

  // Interactive Dictation Practice State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Hijaiyah filter
  const [letterSearch, setLetterSearch] = useState('');
  const [filterNonConnectors, setFilterNonConnectors] = useState(false);

  const currentQuestions = selectedLesson.practiceQuestions;
  const rawQ = currentQuestions[currentQuestionIdx];

  // Randomize option order so correct answer is not always in the first box
  const currentQ = useMemo(() => {
    if (!rawQ) return rawQ;
    const correctText = rawQ.options[rawQ.correctIndex];
    const shuffled = [...rawQ.options].sort(() => Math.random() - 0.5);
    return {
      ...rawQ,
      options: shuffled,
      correctIndex: shuffled.indexOf(correctText)
    };
  }, [selectedLesson.id, currentQuestionIdx, rawQ]);

  const handlePlayVoice = (text: string) => {
    soundAudio.speakArabic(text);
  };

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);

    if (index === currentQ.correctIndex) {
      soundAudio.playSuccessChime();
      setScore(prev => prev + 1);
      onEarnStar(1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundAudio.playErrorBuzz();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < currentQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
      soundAudio.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const filteredLetters = HIJAIYAH_LETTERS.filter(item => {
    const matchesName = item.name.toLowerCase().includes(letterSearch.toLowerCase()) ||
                        item.arabic.includes(letterSearch) ||
                        item.latin.toLowerCase().includes(letterSearch.toLowerCase());
    if (filterNonConnectors) {
      return matchesName && !item.canConnectLeft;
    }
    return matchesName;
  });

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none font-arabic text-9xl">
          إِمْلَاء
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Kurikulum Imla’ MI</span>
            <span>·</span>
            <span>Kaidah Penulisan Arab Standar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Belajar Kaidah Imla’ (Khat & Penulisan Arab)
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed mb-4">
            Imla’ adalah ilmu tata cara menuliskan huruf dan kata bahasa Arab dengan benar, rapi, dan sesuai kaidah tajwid serta kaidah lisan Rasulullah ﷺ.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'materi'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Materi Kaidah Imla’</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('latihan-dikte');
                handleResetQuiz();
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'latihan-dikte'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Latihan Dikte Masmu’</span>
            </button>
            <button
              onClick={() => setActiveTab('tabel-huruf')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'tabel-huruf'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              <span className="font-arabic font-bold">ح</span>
              <span>Tabel Huruf Bersambung</span>
            </button>
            {onNavigateToGame && (
              <button
                onClick={() => onNavigateToGame('sambung-hijaiyah')}
                className="px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300/50"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>🎮 Main Game Sambung Huruf!</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Tab 1: Materi Kaidah Imla' */}
      {activeTab === 'materi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lessons List Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Daftar Bab Kaidah Imla’
            </h3>
            <div className="space-y-2">
              {IMLA_LESSONS.map((lesson, idx) => {
                const isSelected = selectedLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      handleResetQuiz();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                        : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-700">Bab {idx + 1}</span>
                      <span className="text-[11px] font-medium text-slate-400">{lesson.gradeLevel}</span>
                    </div>
                    <div className="font-bold text-sm text-slate-900 mb-1">{lesson.title}</div>
                    <p className="text-xs text-slate-500 line-clamp-1">{lesson.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Detail Content */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                <span>{selectedLesson.gradeLevel}</span>
                <span>·</span>
                <span>Pedoman Penulisan Madrasah</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                {selectedLesson.title}
              </h2>
              <p className="text-sm text-slate-500">{selectedLesson.subtitle}</p>
            </div>

            {/* Formula / Golden Rule */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Rumus Kunci Santri</span>
              </div>
              <div className="font-semibold text-emerald-950 text-base">
                {selectedLesson.ruleFormula}
              </div>
            </div>

            {/* Explanations */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-800">Penjelasan Kaidah:</h3>
              <ul className="space-y-2">
                {selectedLesson.explanation.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips Mudah */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-0.5">
                  Tips Praktis Guru MI
                </h4>
                <p className="text-sm text-amber-950 leading-relaxed">{selectedLesson.tips}</p>
              </div>
            </div>

            {/* Examples Comparison (Correct vs Incorrect) */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-800">Contoh Penerapan Kaidah:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedLesson.examples.map((ex, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Penulisan Benar</span>
                      </div>
                      <button
                        onClick={() => handlePlayVoice(ex.correct)}
                        title="Dengarkan pelafalan"
                        className="p-1 text-slate-400 hover:text-emerald-700 rounded-md transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-center py-2 bg-white rounded-lg border border-slate-100 shadow-2xs">
                      <div className="font-arabic text-3xl font-bold text-slate-900 mb-0.5">
                        {ex.correct}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Artinya: {ex.meaning}
                      </div>
                    </div>

                    {ex.incorrect && (
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Salah:</span>
                          <span className="font-arabic font-bold text-base text-rose-700 line-through mr-1">
                            {ex.incorrect}
                          </span>
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 leading-snug">
                      <span className="font-semibold text-slate-700">Catatan:</span> {ex.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action: Test on Dikte */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Siap menguji pemahaman kaidah ini?
              </span>
              <button
                onClick={() => {
                  setActiveTab('latihan-dikte');
                  handleResetQuiz();
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Mulai Dikte Masmu’</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Latihan Dikte Masmu' */}
      {activeTab === 'latihan-dikte' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Question progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Latihan Imla’ Masmu’ (Dengar & Tulis)
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Soal {currentQuestionIdx + 1} dari {currentQuestions.length}
                </span>
              </div>

              {/* Audio Listen Prompter */}
              <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-center space-y-3">
                <p className="text-xs font-semibold text-amber-900">
                  Dengarkan suara kata yang didiktekan di bawah ini:
                </p>
                <button
                  onClick={() => handlePlayVoice(currentQ.audioText)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
                >
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  <span>Putar Suara Dikte (Imla’)</span>
                </button>
                <p className="text-xs text-amber-800">
                  Klik tombol untuk mengulang suara sedekat mungkin dengan makhraj huruf
                </p>
              </div>

              {/* Question text */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  {currentQ.question}
                </h3>

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let btnStyle = 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30';
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectAnswer(idx)}
                        className={`p-4 rounded-xl border text-center transition-all ${btnStyle}`}
                      >
                        <span className="font-arabic text-2xl font-bold block mb-1">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Answer Explanation & Feedback */}
              {hasAnswered && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    {selectedAnswer === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-emerald-800 text-sm">
                          Mumtaz! Jawabanmu Benar (+1 Bintang)
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-500" />
                        <span className="font-bold text-rose-700 text-sm">
                          Kurang tepat, perhatikan kaidahnya ya!
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold">Penjelasan:</span> {currentQ.explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    {currentQuestionIdx + 1 < currentQuestions.length ? 'Lanjut ke Soal Berikutnya' : 'Selesai & Lihat Skor'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Alhamdulillah! Latihan Selesai
              </h2>
              <p className="text-sm text-slate-600">
                Kamu berhasil menjawab benar <span className="font-bold text-emerald-700">{score}</span> dari {currentQuestions.length} soal latihan Imla’.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Latihan</span>
                </button>
                <button
                  onClick={() => onNavigateToCanvas()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Praktik di Kanvas Tulis</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Tab 3: Tabel Huruf Bersambung & Panduan Goresan */}
      {activeTab === 'tabel-huruf' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Tabel Bentuk 28 Huruf Hijaiyah Bersambung
              </h3>
              <p className="text-xs text-slate-500">
                Perhatikan perubahan bentuk di awal, tengah, dan akhir kata saat menyambung.
              </p>
            </div>

            {/* Filter and search */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterNonConnectors(!filterNonConnectors)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  filterNonConnectors
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filterNonConnectors ? '✓ Hanya 6 Huruf Pemutus' : 'Filter: 6 Huruf Pemutus'}
              </button>
              <input
                type="text"
                placeholder="Cari huruf (mis: Ba, Jim)..."
                value={letterSearch}
                onChange={e => setLetterSearch(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Letter Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredLetters.map((l: HijaiyahLetter) => (
              <div
                key={l.arabic}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-arabic text-3xl font-bold text-emerald-800">
                      {l.isolated}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{l.name} ({l.latin})</div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        l.canConnectLeft
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {l.canConnectLeft ? 'Bisa gandeng kiri' : 'Huruf Pemutus (Tak gandeng kiri)'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayVoice(l.arabic)}
                    title="Dengar suara huruf"
                    className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 Connected Forms */}
                <div className="grid grid-cols-4 gap-1 text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Mandiri</span>
                    <span className="font-arabic text-xl font-bold text-slate-800">{l.isolated}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Awal</span>
                    <span className="font-arabic text-xl font-bold text-slate-800">{l.initial}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Tengah</span>
                    <span className="font-arabic text-xl font-bold text-slate-800">{l.medial}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Akhir</span>
                    <span className="font-arabic text-xl font-bold text-slate-800">{l.final}</span>
                  </div>
                </div>

                {/* Example Word */}
                <div className="flex items-center justify-between text-xs bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                  <span className="text-slate-600">
                    Contoh: <span className="font-medium">{l.exampleMeaning}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-arabic text-lg font-bold text-emerald-900">{l.exampleWord}</span>
                    <button
                      onClick={() => handlePlayVoice(l.exampleWord)}
                      className="text-slate-400 hover:text-emerald-700"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Action button to practice stroke */}
                <button
                  onClick={() => onNavigateToCanvas(l.isolated)}
                  className="w-full py-1.5 text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Latih Menulis di Kanvas →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
