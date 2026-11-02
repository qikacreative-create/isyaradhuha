import React, { useState, useMemo } from 'react';
import {
  MATH_GRADE2_UNITS,
  PLACE_VALUE_SAMPLES,
  MULTIPLICATION_EXAMPLES,
  DIVISION_EXAMPLES,
  GEOMETRY_SHAPES,
  MATH_CHALLENGES
} from '../data/mathGrade2Data';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  Clock,
  Layers,
  ChevronRight,
  Lightbulb,
  Award,
  Grid
} from 'lucide-react';

interface MathGrade2ModuleProps {
  onEarnStar: (count: number) => void;
  onNavigateToGame?: (gameTab: 'game-perkalian' | 'ular-tangga') => void;
}

export const MathGrade2Module: React.FC<MathGrade2ModuleProps> = ({ onEarnStar, onNavigateToGame }) => {
  const [activeUnitId, setActiveUnitId] = useState<string>('bilangan_cacah');

  // Interactive Place Value State
  const [hundredsCount, setHundredsCount] = useState<number>(3);
  const [tensCount, setTensCount] = useState<number>(4);
  const [onesCount, setOnesCount] = useState<number>(5);

  // Interactive Multiplication Visualizer State
  const [multiGroups, setMultiGroups] = useState<number>(3);
  const [multiItemsPerGroup, setMultiItemsPerGroup] = useState<number>(4);

  // Interactive Clock Time
  const [clockHour, setClockHour] = useState<number>(3);
  const [clockMinute, setClockMinute] = useState<number>(0);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const totalNumber = hundredsCount * 100 + tensCount * 10 + onesCount;

  const handleSelectUnit = (id: string) => {
    setActiveUnitId(id);
    soundAudio.playTing();
  };

  // Prepare current challenge with shuffled options so the answer is not predictable in the same box
  const currentQ = useMemo(() => {
    const rawQ = MATH_CHALLENGES[currentQuizIndex] || MATH_CHALLENGES[0];
    const correctText = rawQ.options[rawQ.correctIndex];
    const shuffled = [...rawQ.options].sort(() => Math.random() - 0.5);
    return {
      ...rawQ,
      options: shuffled,
      correctIndex: shuffled.indexOf(correctText)
    };
  }, [currentQuizIndex]);

  const handleQuizAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setShowExplanation(true);

    if (index === currentQ.correctIndex) {
      soundAudio.playSuccessChime();
      setQuizScore(prev => prev + 1);
      onEarnStar(1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundAudio.playWrongBuzzer();
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    if (currentQuizIndex < MATH_CHALLENGES.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setCurrentQuizIndex(0);
    }
  };

  const activeUnit = MATH_GRADE2_UNITS.find(u => u.id === activeUnitId) || MATH_GRADE2_UNITS[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-15 text-8xl font-black select-none pointer-events-none">
          123
        </div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Matematika Kelas 2 SD</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Petualangan Berhitung Ceria & Mandiri 📐
          </h2>
          <p className="text-amber-50 text-xs sm:text-sm leading-relaxed font-medium">
            Mengenal bilangan cacah sampai 1.000, operasi penjumlahan & pengurangan bersusun, konsep perkalian bergambar, pembagian adil, bangun geometri, dan membaca jam analog!
          </p>
          {onNavigateToGame && (
            <div className="pt-2">
              <button
                onClick={() => onNavigateToGame('game-perkalian')}
                className="px-4 py-2 bg-white text-orange-900 hover:bg-orange-50 font-black text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <Calculator className="w-4 h-4 text-orange-600" />
                <span>Buka Game Perkalian Ceria ✖️</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Unit Navigation Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {MATH_GRADE2_UNITS.map(unit => {
          const isSelected = activeUnitId === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => handleSelectUnit(unit.id)}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/20 translate-y-[-2px]'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-lg sm:text-xl">{unit.icon}</span>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
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

      {/* UNIT 1: BILANGAN CACAH SAMPAI 1.000 & NILAI TEMPAT */}
      {activeUnitId === 'bilangan_cacah' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔢</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Laboratorium Nilai Tempat: Ratusan, Puluhan, & Satuan
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah jumlah ratusan, puluhan, dan satuan untuk melihat bilangan yang terbentuk!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Place Value Manipulative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ratusan (Hundreds) */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center space-y-3">
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2.5 py-1 rounded-md">
                Ratusan
              </span>
              <div className="text-4xl font-black text-amber-900">{hundredsCount}</div>
              <div className="text-xs text-amber-700 font-bold">
                Nilai: {hundredsCount * 100}
              </div>
              {/* Mini visual block representations */}
              <div className="flex justify-center gap-1 flex-wrap min-h-[30px] p-1 bg-white/70 rounded-xl">
                {Array.from({ length: hundredsCount }).map((_, i) => (
                  <div
                    key={i}
                    title="1 Ratusan = 100"
                    className="w-6 h-6 bg-amber-400 border border-amber-600 rounded-sm shadow-2xs flex items-center justify-center text-[9px] font-black text-amber-950"
                  >
                    100
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setHundredsCount(Math.max(1, hundredsCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-amber-300 font-black text-amber-800 hover:bg-amber-100"
                >
                  -
                </button>
                <button
                  onClick={() => setHundredsCount(Math.min(9, hundredsCount + 1))}
                  className="w-8 h-8 rounded-lg bg-amber-500 font-black text-white hover:bg-amber-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Puluhan (Tens) */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-center space-y-3">
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider bg-blue-200/80 px-2.5 py-1 rounded-md">
                Puluhan
              </span>
              <div className="text-4xl font-black text-blue-900">{tensCount}</div>
              <div className="text-xs text-blue-700 font-bold">
                Nilai: {tensCount * 10}
              </div>
              {/* Mini visual sticks */}
              <div className="flex justify-center gap-1 flex-wrap min-h-[30px] p-1 bg-white/70 rounded-xl">
                {Array.from({ length: tensCount }).map((_, i) => (
                  <div
                    key={i}
                    title="1 Puluhan = 10"
                    className="w-3.5 h-6 bg-blue-400 border border-blue-600 rounded-xs shadow-2xs flex items-center justify-center text-[8px] font-black text-white"
                  >
                    10
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setTensCount(Math.max(0, tensCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-blue-300 font-black text-blue-800 hover:bg-blue-100"
                >
                  -
                </button>
                <button
                  onClick={() => setTensCount(Math.min(9, tensCount + 1))}
                  className="w-8 h-8 rounded-lg bg-blue-500 font-black text-white hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Satuan (Ones) */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center space-y-3">
              <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider bg-emerald-200/80 px-2.5 py-1 rounded-md">
                Satuan
              </span>
              <div className="text-4xl font-black text-emerald-900">{onesCount}</div>
              <div className="text-xs text-emerald-700 font-bold">
                Nilai: {onesCount}
              </div>
              {/* Mini visual cubes */}
              <div className="flex justify-center gap-1 flex-wrap min-h-[30px] p-1 bg-white/70 rounded-xl">
                {Array.from({ length: onesCount }).map((_, i) => (
                  <div
                    key={i}
                    title="1 Satuan = 1"
                    className="w-3 h-3 bg-emerald-400 border border-emerald-600 rounded-xs shadow-2xs"
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setOnesCount(Math.max(0, onesCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-emerald-300 font-black text-emerald-800 hover:bg-emerald-100"
                >
                  -
                </button>
                <button
                  onClick={() => setOnesCount(Math.min(9, onesCount + 1))}
                  className="w-8 h-8 rounded-lg bg-emerald-500 font-black text-white hover:bg-emerald-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Result Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Bilangan Yang Terbentuk:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {hundredsCount * 100} + {tensCount * 10} + {onesCount} ={' '}
                <span className="text-amber-400">{totalNumber}</span>
              </div>
            </div>
            <button
              onClick={() => {
                soundAudio.playTing();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Hebat! Nilai Tempat Benar</span>
            </button>
          </div>

          {/* Place Value Samples Table */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-700">Contoh Bilangan & Nama Bilangan:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PLACE_VALUE_SAMPLES.map(sample => (
                <div
                  key={sample.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900">{sample.number}</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {sample.hundreds} R + {sample.tens} P + {sample.ones} S
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 italic">“{sample.wordName}”</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UNIT 2: PENJUMLAHAN & PENGURANGAN BERSUSUN */}
      {activeUnitId === 'penjumlahan_pengurangan' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">➕</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Hitung Bersusun: Teknik Menyimpan & Meminjam
                </h3>
                <p className="text-xs text-slate-500">
                  Pelajari cara menjumlah dan mengurang langkah demi langkah dari angka satuan ke ratusan.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Penjumlahan dengan Teknik Menyimpan */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                  Penjumlahan Bersusun (Menyimpan 1)
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  148 + 237
                </span>
              </div>

              {/* Vertical Math Board */}
              <div className="bg-white rounded-xl p-4 border border-emerald-200 font-mono text-center max-w-[220px] mx-auto shadow-xs">
                <div className="text-emerald-700 font-bold text-xs tracking-widest text-right pr-6">
                  (1)
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-widest">
                  &nbsp;1 4 8
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-widest border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                  <span>+</span>
                  <span>2 3 7</span>
                </div>
                <div className="text-2xl font-black text-emerald-700 tracking-widest pt-1">
                  &nbsp;3 8 5
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1.5 bg-white/70 p-3 rounded-xl border border-emerald-100">
                <div>
                  <strong>Langkah 1 (Satuan):</strong> 8 + 7 = 15. Tulis angka <strong>5</strong> di bawah, simpan <strong>1</strong> di atas puluhan.
                </div>
                <div>
                  <strong>Langkah 2 (Puluhan):</strong> 1 (simpanan) + 4 + 3 = <strong>8</strong>.
                </div>
                <div>
                  <strong>Langkah 3 (Ratusan):</strong> 1 + 2 = <strong>3</strong>. Hasil akhir: <strong>385</strong>!
                </div>
              </div>
            </div>

            {/* Pengurangan dengan Teknik Meminjam */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-900 uppercase tracking-wider">
                  Pengurangan Bersusun (Meminjam 1)
                </span>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                  352 - 128
                </span>
              </div>

              {/* Vertical Math Board */}
              <div className="bg-white rounded-xl p-4 border border-rose-200 font-mono text-center max-w-[220px] mx-auto shadow-xs">
                <div className="text-rose-700 font-bold text-xs tracking-widest text-right pr-3">
                  (4)(12)
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-widest">
                  &nbsp;3 5 2
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-widest border-b-2 border-slate-900 pb-1 flex justify-between items-center">
                  <span>-</span>
                  <span>1 2 8</span>
                </div>
                <div className="text-2xl font-black text-rose-700 tracking-widest pt-1">
                  &nbsp;2 2 4
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1.5 bg-white/70 p-3 rounded-xl border border-rose-100">
                <div>
                  <strong>Langkah 1 (Satuan):</strong> 2 tidak cukup dikurangi 8. Pinjam 1 dari angka 5 (tersisa 4), sehingga 2 menjadi <strong>12</strong>. 12 - 8 = <strong>4</strong>.
                </div>
                <div>
                  <strong>Langkah 2 (Puluhan):</strong> Sisa 4 dikurangi 2 = <strong>2</strong>.
                </div>
                <div>
                  <strong>Langkah 3 (Ratusan):</strong> 3 dikurangi 1 = <strong>2</strong>. Hasil akhir: <strong>224</strong>!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UNIT 3: KONSEP PERKALIAN DASAR (PENJUMLAHAN BERULANG) */}
      {activeUnitId === 'perkalian_dasar' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✖️</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Mesin Perkalian Bergambar: Penjumlahan Berulang
                </h3>
                <p className="text-xs text-slate-500">
                  Perkalian adalah penjumlahan bilangan yang sama secara berulang!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Multiplication Visualizer */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Jumlah Kelompok / Piring:</span>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setMultiGroups(n)}
                      className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
                        multiGroups === n
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Isi Tiap Piring:</span>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setMultiItemsPerGroup(n)}
                      className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
                        multiItemsPerGroup === n
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Display of Plates & Apples */}
            <div className="flex flex-wrap justify-center gap-4 py-3">
              {Array.from({ length: multiGroups }).map((_, gIndex) => (
                <div
                  key={gIndex}
                  className="bg-white border-2 border-dashed border-blue-300 rounded-2xl p-3 min-w-[110px] text-center shadow-xs space-y-1.5"
                >
                  <div className="text-[10px] font-bold text-blue-700 uppercase">
                    Piring #{gIndex + 1}
                  </div>
                  <div className="flex justify-center gap-1 text-xl flex-wrap">
                    {Array.from({ length: multiItemsPerGroup }).map((_, iIndex) => (
                      <span key={iIndex} className="animate-pulse">🍎</span>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600">
                    {multiItemsPerGroup} apel
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Card */}
            <div className="bg-white rounded-2xl p-4 border border-blue-200 text-center space-y-2">
              <div className="text-xs font-bold text-slate-500">Bentuk Penjumlahan Berulang:</div>
              <div className="text-lg sm:text-xl font-black text-blue-900">
                {Array.from({ length: multiGroups })
                  .map(() => multiItemsPerGroup)
                  .join(' + ')}{' '}
                = <span className="text-emerald-600">{multiGroups * multiItemsPerGroup}</span>
              </div>
              <div className="text-sm font-black text-slate-900 pt-1">
                Bentuk Perkalian: <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl">{multiGroups} × {multiItemsPerGroup} = {multiGroups * multiItemsPerGroup}</span>
              </div>
            </div>

            {/* Direct jump to Game Perkalian */}
            {onNavigateToGame && (
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black uppercase text-amber-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Arena Permainan Interaktif</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black">
                    Tantangan Master Perkalian ✖️
                  </h4>
                  <p className="text-xs text-amber-100 max-w-xl">
                    Uji kecepatan di Tantangan Kilat 45 detik, bertarung di Menara Monster Bilangan, dan jelajahi Matriks Pythagoras 10×10.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToGame('game-perkalian')}
                  className="px-5 py-2.5 bg-white text-orange-900 hover:bg-orange-50 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-orange-600" />
                  <span>Main Game Perkalian 🚀</span>
                </button>
              </div>
            )}
          </div>

          {/* Multiplication Reference Examples */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700">Contoh Perkalian Kontekstual Sehari-hari:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MULTIPLICATION_EXAMPLES.map((ex, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900">
                      {ex.factorA} × {ex.factorB} = {ex.result}
                    </span>
                    <span className="text-lg">{ex.itemEmoji}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700">
                    {ex.repeatedAddition} = {ex.result}
                  </div>
                  <div className="text-[10px] text-slate-500">{ex.groupLabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UNIT 4: PEMBAGIAN DASAR (PENGURANGAN BERULANG) */}
      {activeUnitId === 'pembagian_dasar' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">➗</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Konsep Pembagian: Pengurangan Berulang Sampai Habis (Nol)
                </h3>
                <p className="text-xs text-slate-500">
                  Pembagian adalah membagikan benda dalam jumlah yang sama rata kepada beberapa orang atau wadah.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIVISION_EXAMPLES.map((div, idx) => (
              <div
                key={idx}
                className="bg-purple-50/60 border border-purple-200 rounded-2xl p-4 space-y-2 hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-purple-900">
                    {div.total} : {div.divisor} = <span className="text-emerald-700">{div.quotient}</span>
                  </span>
                  <span className="text-2xl">{div.emoji}</span>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-white p-2 rounded-xl border border-purple-100">
                  {div.subtractionProcess}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                  “{div.note}”
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UNIT 5: BANGUN DATAR & BANGUN RUANG */}
      {activeUnitId === 'bangun_datar_ruang' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📐</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Galeri Geometri: Bangun Datar & Bangun Ruang Sederhana
                </h3>
                <p className="text-xs text-slate-500">
                  Kenali ciri-ciri sisi, sudut, titik sudut, rusuk, dan contoh bendanya di sekitar kita.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GEOMETRY_SHAPES.map(shape => (
              <div
                key={shape.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 hover:border-emerald-400 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{shape.emoji}</span>
                    <div>
                      <div className="font-black text-sm text-slate-900">{shape.name}</div>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {shape.type === 'datar' ? 'Bangun Datar' : 'Bangun Ruang'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed">
                  {shape.description}
                </div>

                <div className="text-[11px] font-bold text-slate-600 bg-white p-2 rounded-xl border border-slate-200 space-y-0.5">
                  {shape.type === 'datar' ? (
                    <div>
                      Jumlah Sisi: <strong>{shape.sides}</strong> | Sudut: <strong>{shape.corners}</strong>
                    </div>
                  ) : (
                    <div>
                      Sisi/Muka: <strong>{shape.faces}</strong> | Rusuk: <strong>{shape.edges}</strong> | Titik Sudut: <strong>{shape.corners}</strong>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-500 pt-0.5">
                    Contoh nyata: {shape.realExamples}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UNIT 6: PENGUKURAN: JAM, PANJANG, & BERAT */}
      {activeUnitId === 'pengukuran_waktu_berat' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Pengukuran: Membaca Jam Analog, Satuan Panjang & Berat
                </h3>
                <p className="text-xs text-slate-500">
                  Belajar membaca waktu pada jam dinding serta mengenal satuan meter (m), centimeter (cm), kilogram (kg), dan gram.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive Clock Simulator */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-4 text-center">
              <div className="text-xs font-black text-teal-900 uppercase tracking-wider">
                Simulasi Jam Dinding Analog
              </div>

              {/* Visual Clock SVG */}
              <div className="w-40 h-40 mx-auto relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Outer Frame */}
                  <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#0d9488" strokeWidth="4" />
                  {/* Hour tick dots */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const x = 50 + 38 * Math.sin(angle);
                    const y = 50 - 38 * Math.cos(angle);
                    return <circle key={i} cx={x} cy={y} r="1.5" fill="#334155" />;
                  })}
                  {/* Center pin */}
                  <circle cx="50" cy="50" r="3" fill="#0f172a" />
                  {/* Hour Hand (Short) */}
                  {(() => {
                    const angle = ((clockHour % 12) * 30 + clockMinute * 0.5) * (Math.PI / 180);
                    const hx = 50 + 24 * Math.sin(angle);
                    const hy = 50 - 24 * Math.cos(angle);
                    return (
                      <line
                        x1="50"
                        y1="50"
                        x2={hx}
                        y2={hy}
                        stroke="#0f172a"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    );
                  })()}
                  {/* Minute Hand (Long) */}
                  {(() => {
                    const angle = clockMinute * 6 * (Math.PI / 180);
                    const mx = 50 + 34 * Math.sin(angle);
                    const my = 50 - 34 * Math.cos(angle);
                    return (
                      <line
                        x1="50"
                        y1="50"
                        x2={mx}
                        y2={my}
                        stroke="#0d9488"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    );
                  })()}
                </svg>
              </div>

              {/* Time Controls */}
              <div className="space-y-2">
                <div className="text-xl font-black text-slate-900 bg-white py-1.5 px-4 rounded-xl border border-teal-200 inline-block shadow-2xs">
                  Pukul {clockHour < 10 ? `0${clockHour}` : clockHour}.
                  {clockMinute === 0 ? '00' : '30'} {clockMinute === 0 ? 'Tepat' : 'Lewat Tiga Puluh Menit'}
                </div>
                <div className="flex justify-center gap-2 pt-1">
                  {[1, 3, 6, 9, 12].map(h => (
                    <button
                      key={h}
                      onClick={() => setClockHour(h)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                        clockHour === h ? 'bg-teal-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      Jam {h}
                    </button>
                  ))}
                  <button
                    onClick={() => setClockMinute(clockMinute === 0 ? 30 : 0)}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500 text-white"
                  >
                    {clockMinute === 0 ? 'Ubah ke :30' : 'Ubah ke :00'}
                  </button>
                </div>
              </div>
            </div>

            {/* Measurement Units Knowledge Card */}
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>📏</span>
                  <span>Satuan Baku Panjang:</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li><strong>1 meter (m) = 100 centimeter (cm)</strong></li>
                  <li>Mistar / Penggaris digunakan untuk mengukur benda pendek (buku, pensil).</li>
                  <li>Meteran pita digunakan untuk mengukur kain atau tinggi badan.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>⚖️</span>
                  <span>Satuan Baku Berat:</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li><strong>1 kilogram (kg) = 1.000 gram (g)</strong></li>
                  <li><strong>1 kilogram (kg) = 10 ons</strong></li>
                  <li>Timbangan duduk digunakan menimbang telur, terigu, dan buah.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MINI QUIZ EVALUATION CHALLENGE */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-slate-900">
              Tantangan Kuis Cerdas Matematika Kelas 2 (Soal {currentQuizIndex + 1} dari {MATH_CHALLENGES.length})
            </h3>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Skor: {quizScore} Bintang ⭐
          </span>
        </div>

        {/* Question Card */}
        {(() => {
          const q = currentQ;
          return (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                  {q.title}
                </span>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 pt-1">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, oIdx) => {
                  let optStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
                  if (isAnswered) {
                    if (oIdx === q.correctIndex) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black ring-2 ring-emerald-500/20';
                    } else if (selectedOption === oIdx) {
                      optStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                    } else {
                      optStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleQuizAnswer(oIdx)}
                      className={`p-3.5 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && oIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isAnswered && selectedOption === oIdx && oIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {showExplanation && (
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="text-xs text-emerald-950 font-medium">
                    💡 <strong>Pembahasan:</strong> {q.explanation}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuiz}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span>Lanjut Soal Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
