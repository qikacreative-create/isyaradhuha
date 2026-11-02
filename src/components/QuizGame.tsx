import React, { useState } from 'react';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Volume2, Star, ChevronRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  category: 'imla' | 'tajwid' | 'bahasa-arab' | 'bahasa-inggris' | 'ipa' | 'matematika' | 'bahasa-indonesia';
  question: string;
  arabicContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ShuffledQuizQuestion extends QuizQuestion {
  shuffledOptions: string[];
  newCorrectIndex: number;
}

// Helper to shuffle array elements randomly
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate shuffled options and update correctIndex so answers are never always in the same box
function prepareQuizQuestions(): ShuffledQuizQuestion[] {
  return INTEGRATED_QUESTIONS.map(q => {
    const correctText = q.options[q.correctIndex];
    const shuffled = shuffleArray(q.options);
    const newCorrectIdx = shuffled.indexOf(correctText);
    return {
      ...q,
      shuffledOptions: shuffled,
      newCorrectIndex: newCorrectIdx
    };
  });
}

const INTEGRATED_QUESTIONS: QuizQuestion[] = [
  // Imla
  {
    id: 'q1',
    category: 'imla',
    question: 'Di antara 6 huruf berikut, manakah huruf yang TIDAK BISA menyambung ke huruf sesudahnya (ke sebelah kiri)?',
    arabicContext: 'أ د ذ ر ز و',
    options: ['Huruf Ra (ر)', 'Huruf Ba (ب)', 'Huruf Lam (ل)', 'Huruf Sin (س)'],
    correctIndex: 0,
    explanation: 'Huruf Ra (ر) adalah salah satu dari 6 huruf pemutus (al-huruf al-munfashilah) yang tidak boleh menyambung ke sebelah kiri.'
  },
  {
    id: 'q2',
    category: 'imla',
    question: 'Kapan kita harus menulis kata menggunakan Ta Marbuthah (ة / ـة) dan bukan Ta Maftuhah (ت)?',
    options: [
      'Ketika dimatikan/diwaqafkan bunyinya berubah menjadi suara "Ha" (H)',
      'Ketika kata tersebut diawali huruf Alif',
      'Ketika kata tersebut merupakan fi\'il (kata kerja)',
      'Kapan saja bebas sesuka hati'
    ],
    correctIndex: 0,
    explanation: 'Kaidah Imla\': Jika diwaqafkan bersuara "Ha" (seperti مَدْرَسَة), wajib ditulis Ta Marbuthah (ة).'
  },
  {
    id: 'q3',
    category: 'imla',
    question: 'Bagaimana penulisan kata "Sebuah buku" (Kitābun) yang tepat dalam kaidah Imla\'?',
    arabicContext: 'كِتَابٌ',
    options: ['كِتَابٌ', 'كِتَابُنْ', 'كِتَابَن', 'كِتَابُو'],
    correctIndex: 0,
    explanation: 'Tanwin (Dhammatain) berbunyi "un" tetapi haram ditulis dengan huruf Nun sukun (نْ).'
  },

  // Tajwid
  {
    id: 'q4',
    category: 'tajwid',
    question: 'Apa hukum tajwid jika Nun Sukun (نْ) bertemu huruf Ba (ب) seperti pada lafadz "مِنۢ بَعْدِ"?',
    arabicContext: 'مِنۢ بَعْدِ',
    options: ['Iqlab (ditukar jadi Mim)', 'Idzhar Halqi', 'Idgham Bilaghunnah', 'Qalqalah'],
    correctIndex: 0,
    explanation: 'Nun sukun bertemu huruf Ba adalah Iqlab, suaranya diubah menjadi bunyi Mim di bibir disertai dengung 2 harakat.'
  },
  {
    id: 'q5',
    category: 'tajwid',
    question: 'Manakah di bawah ini yang merupakan 5 huruf Qalqalah (huruf yang memantul saat sukun)?',
    options: [
      'ق - ط - ب - ج - د (Baju Ditoko)',
      'ء - هـ - ع - ح - غ - خ',
      'ي - ن - م - و (Yanmu)',
      'ل - ر'
    ],
    correctIndex: 0,
    explanation: 'Huruf Qalqalah ada 5: Qaf, Tha, Ba, Jim, Dal (disingkat: Baju Ditoko / Quthbu Jadin).'
  },
  {
    id: 'q6',
    category: 'tajwid',
    question: 'Hukum Alif Lam pada lafadz "الْحَمْدُ" adalah...',
    arabicContext: 'الْحَمْدُ لِلَّهِ',
    options: ['Al-Qamariyah (terbaca jelas bersukun)', 'Al-Syamsiyah', 'Mad Wajib', 'Ikhfa\''],
    correctIndex: 0,
    explanation: 'Alif Lam bertemu huruf Ha (ح) adalah Al-Qamariyah, huruf Lam diberi tanda sukun dan dibaca jelas.'
  },

  // Bahasa Arab
  {
    id: 'q7',
    category: 'bahasa-arab',
    question: 'Apakah arti dari kata bahasa Arab "قَلَمٌ" (Qalamun)?',
    arabicContext: 'قَلَمٌ',
    options: ['Pena / Pulpen', 'Buku tulis', 'Penghapus', 'Penggaris'],
    correctIndex: 0,
    explanation: 'Qalamun (قَلَمٌ) artinya adalah pena / pulpen.'
  },
  {
    id: 'q8',
    category: 'bahasa-arab',
    question: 'Bagaimana ucapan jawaban ketika seseorang menyapa "صَبَاحَ الْخَيْرِ" (Selamat Pagi)?',
    arabicContext: 'صَبَاحَ الْخَيْرِ',
    options: ['صَبَاحَ النُّورِ', 'مَسَاءَ الْخَيْرِ', 'عَفْوًا', 'إِلَى اللِّقَاءِ'],
    correctIndex: 0,
    explanation: 'Jawaban dari "Shabahal khair" (Selamat pagi) adalah "Shabahan nur" (Selamat pagi juga).'
  },

  // Bahasa Inggris Dasar
  {
    id: 'q9',
    category: 'bahasa-inggris',
    question: 'What is the English word for "Kupu-kupu"?',
    options: ['Butterfly', 'Elephant', 'Backpack', 'Whiteboard'],
    correctIndex: 0,
    explanation: 'Kupu-kupu dalam bahasa Inggris adalah "Butterfly".'
  },
  {
    id: 'q10',
    category: 'bahasa-inggris',
    question: 'How do you say "Terima kasih banyak" in English?',
    options: ['Thank you very much', 'Good morning', 'You are welcome', 'Good night'],
    correctIndex: 0,
    explanation: '"Terima kasih banyak" dalam bahasa Inggris adalah "Thank you very much".'
  },

  // IPA Dasar SD/MI
  {
    id: 'q11',
    category: 'ipa',
    question: 'Pada metamorfosis sempurna kupu-kupu, urutan daur hidup yang benar adalah...',
    options: [
      'Telur ➔ Ulat (Larva) ➔ Kepompong (Pupa) ➔ Kupu-kupu Dewasa',
      'Telur ➔ Nimfa ➔ Kepompong ➔ Kupu-kupu',
      'Kepompong ➔ Telur ➔ Ulat ➔ Kupu-kupu',
      'Ulat ➔ Telur ➔ Kepompong ➔ Kupu-kupu'
    ],
    correctIndex: 0,
    explanation: 'Metamorfosis kupu-kupu bermula dari telur menetas jadi ulat (larva), berubah jadi kepompong (pupa), lalu menjadi kupu-kupu dewasa.'
  },
  {
    id: 'q12',
    category: 'ipa',
    question: 'Peristiwa perubahan wujud benda dari padat menjadi gas (seperti kapur barus yang menyusut) disebut...',
    options: ['Menyublim', 'Membeku', 'Mencair', 'Mengembun'],
    correctIndex: 0,
    explanation: 'Menyublim adalah proses perubahan wujud zat dari padat langsung menjadi gas.'
  },

  // Matematika Kelas 2 SD/MI
  {
    id: 'q13',
    category: 'matematika',
    question: 'Pada bilangan 485, angka 8 memiliki nilai tempat...',
    options: ['Puluhan (bernilai 80)', 'Satuan (bernilai 8)', 'Ratusan (bernilai 800)', 'Ribuan (bernilai 8.000)'],
    correctIndex: 0,
    explanation: 'Pada bilangan 485: angka 4 ratusan (400), 8 puluhan (80), dan 5 satuan (5).'
  },
  {
    id: 'q14',
    category: 'matematika',
    question: 'Bentuk penjumlahan berulang dari perkalian 3 × 5 adalah...',
    options: ['5 + 5 + 5 = 15', '3 + 3 + 3 + 3 + 3 = 15', '3 + 5 = 8', '5 + 3 = 8'],
    correctIndex: 0,
    explanation: '3 × 5 berarti ada 3 kelompok yang masing-masing berisi 5, yaitu 5 + 5 + 5 = 15.'
  },
  {
    id: 'q15',
    category: 'matematika',
    question: 'Bangun datar yang memiliki 3 sisi dan 3 titik sudut adalah...',
    options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
    correctIndex: 0,
    explanation: 'Segitiga memiliki 3 sisi dan 3 titik sudut.'
  },

  // Bahasa Indonesia Kelas 2 SD/MI
  {
    id: 'q16',
    category: 'bahasa-indonesia',
    question: 'Penulisan huruf kapital yang tepat menurut kaidah bahasa Indonesia adalah...',
    options: [
      'Pada hari Senin, Aisyah pergi ke madrasah.',
      'pada hari senin, aisyah pergi ke madrasah.',
      'Pada hari senin, Aisyah pergi ke Madrasah.',
      'PADA HARI SENIN, aisyah pergi ke madrasah.'
    ],
    correctIndex: 0,
    explanation: 'Huruf kapital dipakai di awal kalimat (Pada), nama hari (Senin), dan nama orang (Aisyah).'
  },
  {
    id: 'q17',
    category: 'bahasa-indonesia',
    question: 'Kata ajaib yang santun diucapkan ketika kita membutuhkan bantuan teman adalah...',
    options: ['Tolong', 'Maaf', 'Terima Kasih', 'Permisi'],
    correctIndex: 0,
    explanation: 'Kata "Tolong" diucapkan dengan santun saat kita memohon atau membutuhkan bantuan orang lain.'
  },
  {
    id: 'q18',
    category: 'bahasa-indonesia',
    question: 'Lawan kata (antonim) dari kata "Rajin" adalah...',
    options: ['Malas', 'Pintar', 'Cepat', 'Senang'],
    correctIndex: 0,
    explanation: 'Lawan kata dari rajin adalah malas.'
  }
];

interface QuizGameProps {
  onEarnStar: (stars: number) => void;
  onRecordScore: (score: number, total: number) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onEarnStar, onRecordScore }) => {
  const [questions, setQuestions] = useState<ShuffledQuizQuestion[]>(() => prepareQuizQuestions());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(idx);
    setHasAnswered(true);

    if (idx === currentQ.newCorrectIndex) {
      soundAudio.playSuccessChime();
      setScore(prev => prev + 1);
      onEarnStar(2);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      soundAudio.playErrorBuzz();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
      const finalScore = score + (selectedAnswer === currentQ.newCorrectIndex ? 0 : 0);
      onRecordScore(finalScore, questions.length);
      soundAudio.playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    setQuestions(prepareQuizQuestions());
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  // TV Remote & Keyboard Shortcuts (1-4 for options, Enter for Next)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRestart();
        }
        return;
      }

      if (!hasAnswered) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (optIdx >= 0 && optIdx < currentQ.shuffledOptions.length) {
            handleSelectOption(optIdx);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, isCompleted, currentQ, currentIdx]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 sm:p-6 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <span>Ujian Evaluasi Terpadu MI</span>
            <span>·</span>
            <span>Semua Pelajaran</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Kuis Tantangan Bintang Santri
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Uji pemahaman gabungan Imla', Tajwid, Bahasa Arab, MTK 2, B. Indo 2, English, dan IPA!
          </p>
        </div>
        <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 items-center justify-center font-bold text-xl shadow-md shrink-0">
          <Trophy className="w-8 h-8" />
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-xs space-y-4 sm:space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {currentQ.category === 'imla' 
                ? '✍️ Kaidah Imla’' 
                : currentQ.category === 'tajwid' 
                ? '🕋 Hukum Tajwid' 
                : currentQ.category === 'bahasa-arab'
                ? '📖 Bahasa Arab'
                : currentQ.category === 'bahasa-inggris'
                ? '🇬🇧 Bahasa Inggris'
                : currentQ.category === 'matematika'
                ? '🔢 Matematika Kls 2'
                : currentQ.category === 'bahasa-indonesia'
                ? '🇮🇩 B. Indonesia Kls 2'
                : '🔬 IPA Dasar'}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Soal {currentIdx + 1} dari {INTEGRATED_QUESTIONS.length}
            </span>
          </div>

          {/* Question and context */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            {currentQ.arabicContext && (
              <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center gap-3">
                <span className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-900">
                  {currentQ.arabicContext}
                </span>
                <button
                  onClick={() => soundAudio.speakArabic(currentQ.arabicContext || '')}
                  className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg"
                  title="Dengarkan pelafalan"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Options (Randomized order so answer is never always in the same box) */}
          <div className="space-y-2.5">
            {currentQ.shuffledOptions.map((opt, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrect = i === currentQ.newCorrectIndex;
              const optionLetter = ['A [1]', 'B [2]', 'C [3]', 'D [4]'][i] || `${i + 1}`;

              let style = 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20';
              let letterStyle = 'bg-stone-100 text-stone-700 border-stone-200';

              if (hasAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                  letterStyle = 'bg-emerald-600 text-white border-emerald-600';
                } else if (isSelected) {
                  style = 'border-rose-400 bg-rose-50 text-rose-950';
                  letterStyle = 'bg-rose-500 text-white border-rose-500';
                } else {
                  style = 'opacity-40 border-slate-200';
                  letterStyle = 'bg-stone-100 text-stone-400 border-stone-200';
                }
              }

              return (
                <button
                  key={i}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`min-w-10 h-7 px-1.5 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border transition-colors ${letterStyle}`}
                    >
                      {optionLetter}
                    </span>
                    <span className="font-medium text-stone-800 leading-snug">{opt}</span>
                  </div>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {hasAnswered && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Ulasan Jawaban:</span> {currentQ.explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{currentIdx + 1 < INTEGRATED_QUESTIONS.length ? 'Lanjut ke Soal Berikutnya [Enter ↵]' : 'Lihat Hasil Evaluasi [Enter ↵]'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-inner">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
              {score >= 7 ? 'Maa Syaa Allah! Mumtaz Jiddan' : score >= 5 ? 'Alhamdulillah, Jayyid!' : 'Tetap Semangat Terus Belajar!'}
            </h2>
            <p className="text-slate-600 text-sm">
              Kamu berhasil menjawab benar <span className="font-bold text-emerald-700 text-lg">{score}</span> dari {INTEGRATED_QUESTIONS.length} pertanyaan.
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold text-sm">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Predikat Nilai: {score >= 7 ? 'A (Istimewa)' : score >= 5 ? 'B (Baik)' : 'C (Perlu Latihan)'}</span>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Kuis Sekali Lagi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
