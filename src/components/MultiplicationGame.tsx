import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  TOWER_MONSTERS,
  MULTIPLICATION_TRICKS,
  VISUAL_ITEMS,
  MathMonster
} from '../data/multiplicationGameData';
import {
  Calculator,
  Zap,
  Swords,
  Grid,
  Lightbulb,
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  HelpCircle,
  Eye,
  Dice5,
  Link as LinkIcon,
  Brain,
  ChevronRight,
  Shield,
  Heart,
  SpellCheck
} from 'lucide-react';

interface MultiplicationGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar: (count: number) => void;
  onSwitchToGame?: (gameTab: string) => void;
  onRecordHistory?: (record: {
    activityTitle: string;
    score: number;
    totalQuestions: number;
    starsEarned: number;
    accuracyPercent: number;
    details: string;
  }) => void;
}

type GameMode = 'tabel' | 'kilat' | 'menara' | 'matriks' | 'trik';

const FALLBACK_CHARACTER: CharacterConfig = {
  name: 'Ahmad',
  hijabColor: '#ffffff',
  hijabStyle: 'bergo_sekolah',
  eyeExpression: 'star_eyes',
  mouthExpression: 'sweet_smile',
  blushStyle: 'sparkles',
  faceMark: 'none',
  skinTone: 'warm_peach',
  handPose: 'peace',
  outfit: 'mi_hijau',
  accessory: 'star_pin',
  companionTitle: 'Santri Juara'
};

export const MultiplicationGame: React.FC<MultiplicationGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame,
  onRecordHistory
}) => {
  const [activeMode, setActiveMode] = useState<GameMode>('tabel');

  // ==========================================
  // MODE 1: PETUALANGAN TABEL PERKALIAN (1 - 10 & Campuran)
  // ==========================================
  const [selectedTable, setSelectedTable] = useState<number | 'campuran'>(2);
  const [tableQuestionIndex, setTableQuestionIndex] = useState<number>(0);
  const [tableFactorA, setTableFactorA] = useState<number>(2);
  const [tableFactorB, setTableFactorB] = useState<number>(3);
  const [tableInput, setTableInput] = useState<string>('');
  const [tableAnswered, setTableAnswered] = useState<boolean>(false);
  const [tableIsCorrect, setTableIsCorrect] = useState<boolean | null>(null);
  const [showVisualGroups, setShowVisualGroups] = useState<boolean>(false);
  const [tableScore, setTableScore] = useState<number>(0);
  const [tableVisualEmoji, setTableVisualEmoji] = useState<string>('🍎');
  const [tableOptions, setTableOptions] = useState<number[]>([]);
  const [tableInputMode, setTableInputMode] = useState<'pilihan' | 'keypad'>('pilihan');

  // Generate question for Table Mode
  const generateTableQuestion = (table: number | 'campuran', qIndex: number) => {
    let a: number;
    let b: number;
    if (table === 'campuran') {
      a = Math.floor(Math.random() * 9) + 2; // 2..10
      b = Math.floor(Math.random() * 9) + 2; // 2..10
    } else {
      a = table;
      // progressively challenge or random
      b = (qIndex % 10) + 1;
    }
    setTableFactorA(a);
    setTableFactorB(b);
    setTableInput('');
    setTableAnswered(false);
    setTableIsCorrect(null);

    const correctAns = a * b;
    // Generate 4 options
    const distractors = new Set<number>();
    distractors.add(correctAns);
    while (distractors.size < 4) {
      const delta = (Math.floor(Math.random() * 5) - 2) * (Math.random() > 0.5 ? a : b);
      const fake = correctAns + (delta === 0 ? (Math.random() > 0.5 ? a : -a) : delta);
      if (fake > 0 && fake !== correctAns) {
        distractors.add(fake);
      } else {
        distractors.add(Math.max(1, correctAns + Math.floor(Math.random() * 10) - 5));
      }
    }
    setTableOptions(Array.from(distractors).sort(() => Math.random() - 0.5));
    const randomEmoji = VISUAL_ITEMS[Math.floor(Math.random() * VISUAL_ITEMS.length)].emoji;
    setTableVisualEmoji(randomEmoji);
  };

  useEffect(() => {
    if (activeMode === 'tabel') {
      generateTableQuestion(selectedTable, tableQuestionIndex);
    }
  }, [selectedTable, activeMode]);

  const handleTableKeypad = (digit: string) => {
    if (tableAnswered) return;
    soundAudio.playTing();
    if (tableInput.length < 3) {
      setTableInput(prev => prev + digit);
    }
  };

  const handleTableBackspace = () => {
    if (tableAnswered) return;
    soundAudio.playTing();
    setTableInput(prev => prev.slice(0, -1));
  };

  const handleCheckTableAnswer = (overrideAnswer?: number) => {
    if (tableAnswered) return;
    const answerNumber = overrideAnswer !== undefined ? overrideAnswer : parseInt(tableInput, 10);
    if (isNaN(answerNumber)) return;

    const correct = tableFactorA * tableFactorB;
    const isRight = answerNumber === correct;

    setTableAnswered(true);
    setTableIsCorrect(isRight);

    if (isRight) {
      soundAudio.playSuccessChime();
      setTableScore(prev => prev + 1);
      onEarnStar(1);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
      // Speak Indonesian result
      soundAudio.speakIndonesian(
        `${tableFactorA} dikali ${tableFactorB} sama dengan ${correct}`
      );
    } else {
      soundAudio.playWrongBuzzer();
      soundAudio.speakIndonesian(
        `Jawaban yang benar adalah ${correct}`
      );
    }
  };

  const handleNextTableQuestion = () => {
    if (tableQuestionIndex >= 9) {
      // Completed set of 10
      soundAudio.playFanfare();
      confetti({ particleCount: 70, spread: 80 });
      onEarnStar(3);

      if (onRecordHistory) {
        onRecordHistory({
          activityTitle: `Latihan Perkalian (Tabel ${selectedTable === 'campuran' ? 'Campuran' : selectedTable})`,
          score: tableScore,
          totalQuestions: 10,
          starsEarned: 3 + tableScore,
          accuracyPercent: Math.round((tableScore / 10) * 100),
          details: `Menjawab benar ${tableScore} dari 10 soal perkalian.`
        });
      }

      setTableQuestionIndex(0);
      generateTableQuestion(selectedTable, 0);
    } else {
      const nextIdx = tableQuestionIndex + 1;
      setTableQuestionIndex(nextIdx);
      generateTableQuestion(selectedTable, nextIdx);
    }
  };

  // ==========================================
  // MODE 2: TANTANGAN KILAT (TIME ATTACK)
  // ==========================================
  const [timeRemaining, setTimeRemaining] = useState<number>(45);
  const [isTimeAttackActive, setIsTimeAttackActive] = useState<boolean>(false);
  const [timeScore, setTimeScore] = useState<number>(0);
  const [streakCombo, setStreakCombo] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [timeHighScore, setTimeHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('math_perkalian_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [timeFactorA, setTimeFactorA] = useState<number>(3);
  const [timeFactorB, setTimeFactorB] = useState<number>(4);
  const [timeOptions, setTimeOptions] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateTimeAttackQuestion = () => {
    const a = Math.floor(Math.random() * 8) + 2; // 2..9
    const b = Math.floor(Math.random() * 8) + 2; // 2..9
    setTimeFactorA(a);
    setTimeFactorB(b);

    const correct = a * b;
    const opts = new Set<number>();
    opts.add(correct);
    while (opts.size < 4) {
      const offset = (Math.floor(Math.random() * 5) - 2) * (Math.random() > 0.5 ? a : b);
      const val = correct + (offset === 0 ? (Math.random() > 0.5 ? 2 : -2) : offset);
      if (val > 0 && val !== correct) {
        opts.add(val);
      } else {
        opts.add(Math.max(2, correct + Math.floor(Math.random() * 6) - 3));
      }
    }
    setTimeOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const startTimeAttack = () => {
    soundAudio.playTing();
    setTimeRemaining(45);
    setTimeScore(0);
    setStreakCombo(0);
    setIsTimeAttackActive(true);
    generateTimeAttackQuestion();
  };

  useEffect(() => {
    if (isTimeAttackActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimeAttackActive(false);
            soundAudio.playFanfare();
            confetti({ particleCount: 60, spread: 70 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimeAttackActive]);

  const handleTimeOptionClick = (chosen: number) => {
    if (!isTimeAttackActive) return;
    const correct = timeFactorA * timeFactorB;
    if (chosen === correct) {
      soundAudio.playStepHop(streakCombo + 1);
      const newStreak = streakCombo + 1;
      setStreakCombo(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      const points = 10 * multiplier;
      const newScore = timeScore + points;
      setTimeScore(newScore);

      if (newScore > timeHighScore) {
        setTimeHighScore(newScore);
        localStorage.setItem('math_perkalian_highscore', newScore.toString());
      }

      if (newStreak % 5 === 0) {
        onEarnStar(1);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
      generateTimeAttackQuestion();
    } else {
      soundAudio.playWrongBuzzer();
      setStreakCombo(0);
      generateTimeAttackQuestion();
    }
  };

  // ==========================================
  // MODE 3: MENARA MONSTER MATEMATIKA (RPG BATTLE)
  // ==========================================
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(TOWER_MONSTERS[0].maxHp);
  const [playerHp, setPlayerHp] = useState<number>(3);
  const [monsterBattlePhase, setMonsterBattlePhase] = useState<'dialogue' | 'story' | 'quick_fight' | 'victory'>('dialogue');
  const [towerQuickFactorA, setTowerQuickFactorA] = useState<number>(2);
  const [towerQuickFactorB, setTowerQuickFactorB] = useState<number>(3);
  const [towerQuickOptions, setTowerQuickOptions] = useState<number[]>([]);
  const [battleFeedback, setBattleFeedback] = useState<string>('');
  const [monsterStoryOptions, setMonsterStoryOptions] = useState<number[]>([]);

  const currentMonster: MathMonster = TOWER_MONSTERS[currentMonsterIndex] || TOWER_MONSTERS[0];

  const generateTowerQuickQuestion = () => {
    const a = Math.floor(Math.random() * 6) + 2; // 2..7
    const b = Math.floor(Math.random() * 7) + 2; // 2..8
    setTowerQuickFactorA(a);
    setTowerQuickFactorB(b);

    const correct = a * b;
    const opts = new Set<number>();
    opts.add(correct);
    while (opts.size < 4) {
      const fake = correct + (Math.floor(Math.random() * 7) - 3) * 2;
      if (fake > 0 && fake !== correct) {
        opts.add(fake);
      } else {
        opts.add(correct + Math.floor(Math.random() * 8) - 4);
      }
    }
    setTowerQuickOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const handleStartMonsterFight = () => {
    soundAudio.playTing();
    // Shuffle story question options so the answer is never in the same box
    setMonsterStoryOptions([...currentMonster.storyQuestion.options].sort(() => Math.random() - 0.5));
    setMonsterBattlePhase('story');
  };

  const handleAnswerMonsterStory = (chosen: number) => {
    const correct = currentMonster.storyQuestion.factorA * currentMonster.storyQuestion.factorB;
    if (chosen === correct) {
      soundAudio.playSuccessChime();
      soundAudio.playConnectSnap();
      setBattleFeedback(`Jawaban Hebat! Serangan Kilat Bintang berhasil mengenai ${currentMonster.name}!`);
      setMonsterHp(prev => Math.max(0, prev - 2));
      onEarnStar(1);
      confetti({ particleCount: 35, spread: 60 });
      setTimeout(() => {
        setMonsterBattlePhase('quick_fight');
        generateTowerQuickQuestion();
      }, 1400);
    } else {
      soundAudio.playWrongBuzzer();
      setPlayerHp(prev => Math.max(1, prev - 1));
      setBattleFeedback(`${currentMonster.name} menangkis! Coba hitung lagi penjumlahan berulangnya.`);
    }
  };

  const handleAnswerTowerQuick = (chosen: number) => {
    const correct = towerQuickFactorA * towerQuickFactorB;
    if (chosen === correct) {
      soundAudio.playSuccessChime();
      const newHp = monsterHp - 1;
      setMonsterHp(newHp);

      if (newHp <= 0) {
        soundAudio.playFanfare();
        confetti({ particleCount: 80, spread: 90 });
        onEarnStar(3);
        setMonsterBattlePhase('victory');
        soundAudio.speakIndonesian(`Selamat! Kamu berhasil menaklukkan ${currentMonster.name}!`);
      } else {
        soundAudio.playStepHop(2);
        setBattleFeedback(`Serangan Kena! Sisa HP ${currentMonster.name}: ${newHp}`);
        generateTowerQuickQuestion();
      }
    } else {
      soundAudio.playWrongBuzzer();
      setPlayerHp(prev => {
        const nextHp = prev - 1;
        if (nextHp <= 0) {
          // Healed by compassion
          soundAudio.playTing();
          return 3;
        }
        return nextHp;
      });
      setBattleFeedback(`Aduh meleset! Jawabannya adalah ${correct}. Tetap semangat!`);
      generateTowerQuickQuestion();
    }
  };

  const handleNextMonsterLevel = () => {
    soundAudio.playTing();
    if (currentMonsterIndex < TOWER_MONSTERS.length - 1) {
      const nextIdx = currentMonsterIndex + 1;
      setCurrentMonsterIndex(nextIdx);
      setMonsterHp(TOWER_MONSTERS[nextIdx].maxHp);
      setPlayerHp(3);
      setMonsterBattlePhase('dialogue');
      setBattleFeedback('');
    } else {
      // Finished all monsters!
      setCurrentMonsterIndex(0);
      setMonsterHp(TOWER_MONSTERS[0].maxHp);
      setPlayerHp(3);
      setMonsterBattlePhase('dialogue');
      setBattleFeedback('');
    }
  };

  // ==========================================
  // MODE 4: MATRIKS PYTHAGORAS INTERAKTIF (10x10)
  // ==========================================
  const [selectedGridRow, setSelectedGridRow] = useState<number>(3);
  const [selectedGridCol, setSelectedGridCol] = useState<number>(4);
  const [gridMysteryMode, setGridMysteryMode] = useState<boolean>(false);
  const [mysteryRevealed, setMysteryRevealed] = useState<{ [key: string]: boolean }>({});

  const handleGridCellClick = (r: number, c: number) => {
    soundAudio.playTing();
    setSelectedGridRow(r);
    setSelectedGridCol(c);

    if (gridMysteryMode) {
      const key = `${r}-${c}`;
      setMysteryRevealed(prev => ({ ...prev, [key]: true }));
      soundAudio.playSuccessChime();
    } else {
      soundAudio.speakIndonesian(`${r} dikali ${c} sama dengan ${r * c}`);
    }
  };

  // ==========================================
  // MODE 5: FLASHCARD TRIK HAFALAN CEPAT
  // ==========================================
  const [selectedTrickId, setSelectedTrickId] = useState<string>('trik_angka_9');
  const [flippedPracticeCard, setFlippedPracticeCard] = useState<number | null>(null);

  const activeTrick = MULTIPLICATION_TRICKS.find(t => t.id === selectedTrickId) || MULTIPLICATION_TRICKS[0];

  // TV Remote Navigation & Numeric Answering (1, 2, 3, 4, Enter)
  useEffect(() => {
    const handleRemoteKeys = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4) {
        const idx = num - 1;
        if (activeMode === 'tabel' && tableInputMode === 'pilihan' && !tableAnswered) {
          if (tableOptions[idx] !== undefined) {
            setTableInput(tableOptions[idx].toString());
            handleCheckTableAnswer(tableOptions[idx]);
          }
        } else if (activeMode === 'kilat' && isTimeAttackActive) {
          if (timeOptions[idx] !== undefined) {
            handleTimeOptionClick(timeOptions[idx]);
          }
        } else if (activeMode === 'menara') {
          if (monsterBattlePhase === 'story') {
            const opts = monsterStoryOptions.length > 0 ? monsterStoryOptions : currentMonster.storyQuestion.options;
            if (opts[idx] !== undefined) {
              handleAnswerMonsterStory(opts[idx]);
            }
          } else if (monsterBattlePhase === 'quick_fight') {
            if (towerQuickOptions[idx] !== undefined) {
              handleAnswerTowerQuick(towerQuickOptions[idx]);
            }
          }
        }
      } else if (e.key === 'Enter') {
        if (activeMode === 'tabel' && tableAnswered) {
          handleNextTableQuestion();
        } else if (activeMode === 'kilat' && !isTimeAttackActive) {
          startTimeAttack();
        } else if (activeMode === 'menara') {
          if (monsterBattlePhase === 'dialogue') {
            handleStartMonsterFight();
          } else if (monsterBattlePhase === 'victory') {
            handleNextMonsterLevel();
          }
        }
      }
    };

    window.addEventListener('keydown', handleRemoteKeys);
    return () => window.removeEventListener('keydown', handleRemoteKeys);
  }, [
    activeMode,
    tableInputMode,
    tableAnswered,
    tableOptions,
    isTimeAttackActive,
    timeOptions,
    monsterBattlePhase,
    monsterStoryOptions,
    currentMonster,
    towerQuickOptions
  ]);

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Sleek Compact Header & Mode Navigation (Clean, Not Piled Up!) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-lg shadow-xs shrink-0">
              ✖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
                  Tantangan Master Perkalian
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                  SD / MI
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Visual kelompok benda nyata, mode kilat berpacu waktu, menara monster & matriks 10×10.
              </p>
            </div>
          </div>

          {/* Quick Arena Links */}
          {onSwitchToGame && (
            <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold py-0.5">
              <button
                onClick={() => onSwitchToGame('game-mengeja')}
                className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 shrink-0"
              >
                <SpellCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mengeja</span>
              </button>
              <button
                onClick={() => onSwitchToGame('sambung-hijaiyah')}
                className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 shrink-0"
              >
                <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
                <span>Sambung Huruf</span>
              </button>
              <button
                onClick={() => onSwitchToGame('ular-tangga')}
                className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 shrink-0"
              >
                <Dice5 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ular Tangga</span>
              </button>
            </div>
          )}
        </div>

        {/* Mode Navigation Pills (Single Clean Row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => {
              setActiveMode('tabel');
              soundAudio.playTing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeMode === 'tabel'
                ? 'bg-white text-orange-800 shadow-xs ring-1 ring-orange-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-orange-500" />
            <span>Tabel Perkalian</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('kilat');
              soundAudio.playTing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeMode === 'kilat'
                ? 'bg-white text-amber-800 shadow-xs ring-1 ring-amber-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tantangan Kilat</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('menara');
              soundAudio.playTing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeMode === 'menara'
                ? 'bg-white text-rose-800 shadow-xs ring-1 ring-rose-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-500" />
            <span>Menara Monster</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('matriks');
              soundAudio.playTing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeMode === 'matriks'
                ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-600" />
            <span>Papan Matriks</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('trik');
              soundAudio.playTing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeMode === 'trik'
                ? 'bg-white text-purple-800 shadow-xs ring-1 ring-purple-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
            <span>Trik Rahasia</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: TABEL PERKALIAN & VISUAL KELOMPOK BENDA */}
      {/* ======================================================== */}
      {activeMode === 'tabel' && (
        <div className="space-y-4">
          {/* Main Question Card With Integrated Table Selector (No Nested Stacking!) */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-5">
            {/* Table Selector Strip */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
                  Pilih:
                </span>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => {
                      soundAudio.playTing();
                      setSelectedTable(tbl);
                      setTableQuestionIndex(0);
                      setTableScore(0);
                    }}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-all shrink-0 ${
                      selectedTable === tbl
                        ? 'bg-orange-600 text-white shadow-xs font-black'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    ×{tbl}
                  </button>
                ))}
                <button
                  onClick={() => {
                    soundAudio.playTing();
                    setSelectedTable('campuran');
                    setTableQuestionIndex(0);
                    setTableScore(0);
                  }}
                  className={`px-2.5 h-8 rounded-lg font-bold text-xs transition-all shrink-0 ${
                    selectedTable === 'campuran'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Campuran
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">
                  Soal {tableQuestionIndex + 1}/10
                </span>
                <span className="text-stone-300">•</span>
                <span className="font-extrabold text-orange-600">
                  Skor: {tableScore}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500">
                  Tantangan Babak {tableQuestionIndex + 1}/10
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-bold text-orange-600">
                  {selectedTable === 'campuran' ? 'Mode Campuran' : `Tabel ×${selectedTable}`}
                </span>
              </div>
              <button
                onClick={() => {
                  soundAudio.playTing();
                  setShowVisualGroups(prev => !prev);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showVisualGroups ? 'Sembunyikan Visual' : 'Bantuan Visual Nyata'}</span>
              </button>
            </div>

            {/* Multiplication Formula Display */}
            <div className="text-center py-4 bg-orange-50/60 rounded-2xl border border-orange-100 relative">
              <div className="flex items-center justify-center gap-3 text-4xl sm:text-6xl font-black text-stone-800 tracking-wider">
                <span className="text-orange-600">{tableFactorA}</span>
                <span className="text-stone-400">×</span>
                <span className="text-amber-600">{tableFactorB}</span>
                <span className="text-stone-400">=</span>
                <span className="inline-flex items-center justify-center min-w-[70px] px-3 py-1 bg-white border-2 border-dashed border-orange-300 rounded-2xl text-orange-700 shadow-inner">
                  {tableAnswered ? tableFactorA * tableFactorB : tableInput || '?'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-500 mt-2 font-medium">
                Artinya:{' '}
                <strong className="text-stone-700">{tableFactorA} kelompok</strong>, masing-masing berisi{' '}
                <strong className="text-stone-700">{tableFactorB} benda</strong>
              </p>

              <button
                onClick={() =>
                  soundAudio.speakIndonesian(
                    `${tableFactorA} dikali ${tableFactorB} sama dengan berapa?`
                  )
                }
                className="absolute top-3 right-3 p-2 text-stone-400 hover:text-stone-700 hover:bg-white rounded-full transition-colors"
                title="Dengarkan Suara"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Concrete Representation */}
            {showVisualGroups && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 transition-all animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>Visual Konsep Penjumlahan Berulang:</span>
                  <span>
                    {Array.from({ length: tableFactorA }).map(() => tableFactorB).join(' + ')} ={' '}
                    {tableFactorA * tableFactorB}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {Array.from({ length: tableFactorA }).map((_, groupIdx) => (
                    <div
                      key={groupIdx}
                      className="bg-white p-3 rounded-xl border border-amber-200 text-center shadow-xs"
                    >
                      <p className="text-[11px] font-bold text-stone-500 mb-1">
                        Kelompok {groupIdx + 1}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-1 min-h-[32px]">
                        {Array.from({ length: tableFactorB }).map((__, itemIdx) => (
                          <span key={itemIdx} className="text-lg animate-bounce" style={{ animationDelay: `${itemIdx * 60}ms` }}>
                            {tableVisualEmoji}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-amber-700 font-bold mt-1">
                        {tableFactorB} {tableVisualEmoji}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Controls: Toggle between Quick Multiple Choice OR Keypad */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="text-xs font-bold text-stone-500">
                  {tableInputMode === 'pilihan' ? 'Pilih Jawaban Cepat:' : 'Ketik Angka Jawaban:'}
                </span>
                <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg border border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setTableInputMode('pilihan')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      tableInputMode === 'pilihan'
                        ? 'bg-white text-orange-800 shadow-2xs font-bold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    ⚡ Pilihan Ganda
                  </button>
                  <button
                    onClick={() => setTableInputMode('keypad')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      tableInputMode === 'keypad'
                        ? 'bg-white text-orange-800 shadow-2xs font-bold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    🔢 Keypad
                  </button>
                </div>
              </div>

              {tableInputMode === 'pilihan' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {tableOptions.map((opt, idx) => {
                    const isCorrectOpt = opt === tableFactorA * tableFactorB;
                    let btnStyle = 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-orange-50 hover:border-orange-300';
                    if (tableAnswered) {
                      if (isCorrectOpt) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102';
                      } else if (opt === parseInt(tableInput, 10)) {
                        btnStyle = 'bg-rose-500 text-white border-rose-600';
                      } else {
                        btnStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={tableAnswered}
                        onClick={() => {
                          setTableInput(opt.toString());
                          handleCheckTableAnswer(opt);
                        }}
                        className={`py-3 px-3 rounded-xl font-bold text-xl sm:text-2xl border-2 transition-all shadow-2xs ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="max-w-xs mx-auto pt-1">
                  <div className="flex items-center justify-between mb-1.5 text-xs text-stone-500 font-medium">
                    <span>Ketik angka:</span>
                    {tableInput && (
                      <span className="font-bold text-orange-600">Terpilih: {tableInput}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <button
                        key={num}
                        disabled={tableAnswered}
                        onClick={() => handleTableKeypad(num.toString())}
                        className="py-2.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-800 font-bold text-base rounded-xl border border-stone-200 transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      disabled={tableAnswered}
                      onClick={handleTableBackspace}
                      className="py-2.5 bg-rose-50 hover:bg-rose-100 disabled:opacity-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                    >
                      Hapus
                    </button>
                    <button
                      disabled={tableAnswered}
                      onClick={() => handleTableKeypad('0')}
                      className="py-2.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-800 font-bold text-base rounded-xl border border-stone-200 transition-colors"
                    >
                      0
                    </button>
                    <button
                      disabled={tableAnswered || !tableInput}
                      onClick={() => handleCheckTableAnswer()}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Cek ✓
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Answer Result Banner */}
            {tableAnswered && (
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 animate-fadeIn ${
                  tableIsCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tableIsCorrect ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-sm sm:text-base">
                      {tableIsCorrect ? 'Masya Allah, Benar Sekali!' : 'Belum Tepat, Jangan Putus Asa!'}
                    </p>
                    <p className="text-xs sm:text-sm mt-0.5 opacity-90">
                      {tableFactorA} × {tableFactorB} = {tableFactorA * tableFactorB}. (
                      {Array.from({ length: tableFactorA }).map(() => tableFactorB).join(' + ')} ={' '}
                      {tableFactorA * tableFactorB})
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextTableQuestion}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>{tableQuestionIndex >= 9 ? 'Selesai & Hadiah' : 'Soal Berikutnya'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: TANTANGAN KILAT (TIME ATTACK - 45 DETIK) */}
      {/* ======================================================== */}
      {activeMode === 'kilat' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 font-semibold">Sisa Waktu</p>
                <p className="text-2xl font-black text-stone-800">{timeRemaining} detik</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-stone-500 font-semibold">Combo Streak</p>
                <div className="flex items-center gap-1 justify-center text-orange-600 font-black text-xl">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  <span>{streakCombo}x</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-stone-500 font-semibold">Skor Sekarang</p>
                <p className="text-2xl font-black text-emerald-600">{timeScore}</p>
              </div>

              <div className="text-center pl-3 border-l border-amber-200">
                <p className="text-xs text-stone-500 font-semibold">Rekor Tertinggi</p>
                <p className="text-2xl font-black text-purple-600">{timeHighScore}</p>
              </div>
            </div>
          </div>

          {!isTimeAttackActive ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
                ⚡
              </div>
              <h3 className="text-2xl font-black text-stone-800">
                Siap untuk Tantangan Kilat?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Jawab soal perkalian secepat mungkin dalam waktu 45 detik. Raih combo streak berturut-turut untuk mendapatkan pengganda skor hingga 3x lipat!
              </p>
              <button
                onClick={startTimeAttack}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-105"
              >
                Mulai Tantangan Sekarang 🚀
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question Banner */}
              <div className="text-center py-6 bg-gradient-to-b from-stone-50 to-orange-50/40 rounded-2xl border border-stone-200">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                  Hitung Cepat:
                </p>
                <div className="text-5xl sm:text-7xl font-black text-stone-800 tracking-wider">
                  <span className="text-amber-600">{timeFactorA}</span>
                  <span className="text-stone-300 mx-2">×</span>
                  <span className="text-orange-600">{timeFactorB}</span>
                  <span className="text-stone-300 mx-2">=</span>
                  <span className="text-stone-400">?</span>
                </div>
              </div>

              {/* 4 Big Options */}
              <div className="grid grid-cols-2 gap-4">
                {timeOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimeOptionClick(opt)}
                    className="py-5 bg-white hover:bg-orange-50 active:scale-95 text-stone-800 hover:text-orange-700 border-2 border-stone-200 hover:border-orange-400 rounded-2xl font-black text-3xl sm:text-4xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 tv-card"
                  >
                    <span className="text-sm font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">[{idx + 1}]</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: MENARA MONSTER MATEMATIKA (RPG ADVENTURE) */}
      {/* ======================================================== */}
      {activeMode === 'menara' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Floor & Battle Stage Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-800 font-black text-xs rounded-lg">
                Lantai {currentMonster.level} dari 5
              </span>
              <span className="text-sm font-bold text-stone-700">
                {currentMonster.title}
              </span>
            </div>

            {/* HP Bars */}
            <div className="flex items-center gap-6 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="text-stone-600">Pemain:</span>
                <div className="flex gap-1 text-rose-500">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${i < playerHp ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-600">{currentMonster.name}:</span>
                <div className="w-24 bg-stone-200 h-3 rounded-full overflow-hidden border border-stone-300">
                  <div
                    className="bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${(monsterHp / currentMonster.maxHp) * 100}%` }}
                  />
                </div>
                <span className="text-rose-600 font-extrabold">{monsterHp}/{currentMonster.maxHp} HP</span>
              </div>
            </div>
          </div>

          {/* Arena Display */}
          <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${currentMonster.color} text-white shadow-lg relative overflow-hidden`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              {/* Player Avatar */}
              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <CharacterAvatar config={characterConfig || FALLBACK_CHARACTER} size="lg" className="border-2 border-white" />
                <div>
                  <p className="text-xs text-white/80 font-semibold">Pahlawan Hitung</p>
                  <p className="text-base font-black text-white">{characterConfig?.name || 'Ahmad'}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-300 mt-0.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Jurus Bintang Perkalian</span>
                  </div>
                </div>
              </div>

              <div className="text-center font-black text-3xl sm:text-4xl text-amber-300">
                VS
              </div>

              {/* Monster */}
              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-5xl animate-bounce">
                  {currentMonster.emoji}
                </div>
                <div>
                  <p className="text-xs text-white/80 font-semibold">{currentMonster.title}</p>
                  <p className="text-base font-black text-white">{currentMonster.name}</p>
                  <p className="text-xs text-amber-200 mt-0.5 font-medium">Lantai {currentMonster.level}</p>
                </div>
              </div>
            </div>

            {battleFeedback && (
              <div className="mt-4 p-3 bg-white/20 backdrop-blur-md rounded-xl text-center text-xs sm:text-sm font-bold text-white border border-white/30 animate-fadeIn">
                {battleFeedback}
              </div>
            )}
          </div>

          {/* Phase 1: Dialogue Intro */}
          {monsterBattlePhase === 'dialogue' && (
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-4">
              <p className="text-base sm:text-lg font-medium text-stone-700 italic">
                "{currentMonster.dialogueIntro}"
              </p>
              <button
                onClick={handleStartMonsterFight}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
              >
                Terima Tantangan & Mulai Bertarung ⚔️
              </button>
            </div>
          )}

          {/* Phase 2: Story Problem */}
          {monsterBattlePhase === 'story' && (
            <div className="space-y-4 bg-amber-50/70 p-6 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Soal Cerita Tantangan {currentMonster.name}:</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-stone-800 leading-relaxed">
                {currentMonster.storyQuestion.question}
              </p>
              <p className="text-xs text-stone-500 italic">
                Petunjuk: {currentMonster.storyQuestion.contextHint}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {(monsterStoryOptions.length > 0 ? monsterStoryOptions : currentMonster.storyQuestion.options).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerMonsterStory(opt)}
                    className="py-3.5 bg-white hover:bg-orange-100 text-stone-800 font-extrabold text-xl rounded-xl border border-amber-300 shadow-xs hover:border-amber-500 transition-all flex items-center justify-center gap-2 tv-card"
                  >
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">[{idx + 1}]</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 3: Quick Fight (Finish off HP) */}
          {monsterBattlePhase === 'quick_fight' && (
            <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Serangan Beruntun! Jawab Cepat untuk Menghabisi Sisa HP Monster:
                </p>
                <div className="text-4xl sm:text-5xl font-black text-stone-800">
                  {towerQuickFactorA} × {towerQuickFactorB} = ?
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {towerQuickOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerTowerQuick(opt)}
                    className="py-3.5 bg-white hover:bg-rose-50 text-stone-800 font-extrabold text-2xl rounded-xl border border-stone-300 hover:border-rose-400 shadow-xs transition-all flex items-center justify-center gap-2 tv-card"
                  >
                    <span className="text-xs font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">[{idx + 1}]</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 4: Victory */}
          {monsterBattlePhase === 'victory' && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-4 animate-fadeIn">
              <div className="text-4xl">👑</div>
              <h4 className="text-xl font-black text-emerald-900">
                {currentMonster.name} Berhasil Ditaklukkan!
              </h4>
              <p className="text-sm text-emerald-800 italic max-w-md mx-auto">
                "{currentMonster.dialogueDefeated}"
              </p>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Kamu mendapatkan 3 Bintang Pembelajar!</span>
              </div>
              <button
                onClick={handleNextMonsterLevel}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
              >
                {currentMonsterIndex < TOWER_MONSTERS.length - 1
                  ? 'Naik ke Lantai Berikutnya 🏰'
                  : 'Selesaikan Seluruh Menara & Ulangi 🌟'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 4: PAPAN MATRIKS PYTHAGORAS INTERAKTIF (10x10) */}
      {/* ======================================================== */}
      {activeMode === 'matriks' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-stone-800 flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-600" />
                <span>Papan Matriks Perkalian 10 × 10</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Klik kotak mana saja untuk melihat hubungan baris, kolom, dan luas perkaliannya.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundAudio.playTing();
                  setGridMysteryMode(prev => !prev);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  gridMysteryMode
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                }`}
              >
                {gridMysteryMode ? 'Mode Tebak Aktif ❓' : 'Coba Mode Tebak Kotak'}
              </button>
            </div>
          </div>

          {/* Interactive Calculation Highlight */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-xs">
                {selectedGridRow * selectedGridCol}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500">Koordinat Perkalian Terpilih:</p>
                <p className="text-lg font-black text-emerald-900">
                  {selectedGridRow} × {selectedGridCol} = {selectedGridRow * selectedGridCol}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                soundAudio.speakIndonesian(
                  `${selectedGridRow} dikali ${selectedGridCol} sama dengan ${selectedGridRow * selectedGridCol}`
                )
              }
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white px-3 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Dengarkan Suara</span>
            </button>
          </div>

          {/* 10x10 Matrix Table */}
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[500px] border-collapse text-center text-xs font-bold">
              <thead>
                <tr>
                  <th className="p-2 bg-stone-200 text-stone-700 rounded-tl-xl">×</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => (
                    <th
                      key={c}
                      className={`p-2 transition-colors ${
                        selectedGridCol === c
                          ? 'bg-emerald-500 text-white'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                  <tr key={r}>
                    <th
                      className={`p-2 transition-colors ${
                        selectedGridRow === r
                          ? 'bg-emerald-500 text-white'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {r}
                    </th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => {
                      const isSelected = selectedGridRow === r && selectedGridCol === c;
                      const isInRow = selectedGridRow === r;
                      const isInCol = selectedGridCol === c;
                      const isDiagonal = r === c;
                      const key = `${r}-${c}`;
                      const isRevealed = mysteryRevealed[key];

                      let cellBg = 'bg-white hover:bg-orange-50 text-stone-800';
                      if (isSelected) {
                        cellBg = 'bg-emerald-600 text-white shadow-inner font-black scale-105 z-10';
                      } else if (isInRow || isInCol) {
                        cellBg = 'bg-emerald-50 text-emerald-950';
                      } else if (isDiagonal) {
                        cellBg = 'bg-amber-50/60 text-amber-900';
                      }

                      // In mystery mode, hide some cells
                      const shouldHide = gridMysteryMode && (r * c) % 3 === 0 && !isRevealed;

                      return (
                        <td
                          key={c}
                          onClick={() => handleGridCellClick(r, c)}
                          className={`p-2 border border-stone-200 cursor-pointer transition-all ${cellBg}`}
                        >
                          {shouldHide ? '?' : r * c}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-600 rounded-sm inline-block" />
              <span>Sel Terpilih</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-50 border border-emerald-200 rounded-sm inline-block" />
              <span>Garis Baris & Kolom</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-amber-50 border border-amber-200 rounded-sm inline-block" />
              <span>Bilangan Kuadrat (Diagonal)</span>
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 5: FLASHCARD TRIK RAHASIA & HAFALAN CEPAT */}
      {/* ======================================================== */}
      {activeMode === 'trik' && (
        <div className="space-y-6">
          {/* Trick Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {MULTIPLICATION_TRICKS.map(trick => (
              <button
                key={trick.id}
                onClick={() => {
                  soundAudio.playTing();
                  setSelectedTrickId(trick.id);
                  setFlippedPracticeCard(null);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedTrickId === trick.id
                    ? 'bg-purple-50/80 border-purple-400 shadow-md ring-2 ring-purple-200'
                    : 'bg-white border-stone-200 hover:border-purple-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{trick.icon}</span>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    {trick.badge}
                  </span>
                </div>
                <h4 className="font-extrabold text-stone-800 text-sm">{trick.title}</h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{trick.summary}</p>
              </button>
            ))}
          </div>

          {/* Active Trick Detail Card */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <span className="text-4xl">{activeTrick.icon}</span>
              <div>
                <h3 className="text-xl font-extrabold text-stone-900">{activeTrick.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{activeTrick.summary}</p>
              </div>
            </div>

            {/* Step by step guide */}
            <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Langkah-Langkah Trik:
              </p>
              <div className="space-y-2.5">
                {activeTrick.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900">
                💡 <strong>Contoh Praktis:</strong> {activeTrick.example}
              </div>
            </div>

            {/* Flashcard Practice */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Uji Trik Ini dengan Kartu Latihan (Klik untuk Membalik Jawaban):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeTrick.practiceProblems.map((prob, idx) => {
                  const isFlipped = flippedPracticeCard === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundAudio.playTing();
                        setFlippedPracticeCard(isFlipped ? null : idx);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all text-center min-h-[90px] flex flex-col items-center justify-center shadow-xs ${
                        isFlipped
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 scale-102'
                          : 'bg-white border-stone-200 hover:border-purple-300 text-stone-800'
                      }`}
                    >
                      {isFlipped ? (
                        <>
                          <span className="text-xs font-bold text-emerald-600">Hasil:</span>
                          <span className="text-2xl font-black text-emerald-800">{prob.result}</span>
                          <span className="text-[10px] text-stone-400 mt-0.5">({prob.a} × {prob.b})</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl font-black text-stone-800">{prob.a} × {prob.b} = ?</span>
                          <span className="text-[10px] text-purple-600 font-bold mt-1">Klik Balik 🔄</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
