import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  INDONESIAN_SPELLING_WORDS,
  ENGLISH_SPELLING_WORDS,
  RESCUE_STAGES,
  SpellingWordItem
} from '../data/spellingRescueData';
import {
  Volume2,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Shield,
  Heart,
  ChevronRight,
  Flame,
  Undo2,
  KeyRound,
  Lock,
  Unlock,
  Dice5,
  Link as LinkIcon,
  Calculator,
  Brain
} from 'lucide-react';

interface SpellingRescueGameProps {
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

type LanguageMode = 'id' | 'en';
type DifficultyFilter = 'semua' | 'mudah' | 'sedang' | 'sulit';

const FALLBACK_CHARACTER: CharacterConfig = {
  name: 'Fatimah',
  hijabColor: '#10b981',
  hijabStyle: 'bergo_sekolah',
  eyeExpression: 'star_eyes',
  mouthExpression: 'sweet_smile',
  blushStyle: 'sparkles',
  faceMark: 'none',
  skinTone: 'warm_peach',
  handPose: 'peace',
  outfit: 'mi_hijau',
  accessory: 'star_pin',
  companionTitle: 'Santri Cerdas'
};

export const SpellingRescueGame: React.FC<SpellingRescueGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame,
  onRecordHistory
}) => {
  const [language, setLanguage] = useState<LanguageMode>('id');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('semua');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0); // 0 to 5
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; isUsed: boolean }[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [redemptionQuizActive, setRedemptionQuizActive] = useState<boolean>(false);
  const [redemptionOptions, setRedemptionOptions] = useState<string[]>([]);

  // Filter word list based on language and difficulty
  const rawList = language === 'id' ? INDONESIAN_SPELLING_WORDS : ENGLISH_SPELLING_WORDS;
  const filteredWords = rawList.filter(item => {
    if (difficulty === 'semua') return true;
    return item.difficulty === difficulty;
  });

  const currentWord: SpellingWordItem =
    filteredWords[currentWordIndex % filteredWords.length] || filteredWords[0];

  // Prepare round when currentWord changes
  const initRound = useCallback((wordObj: SpellingWordItem) => {
    const targetLetters = wordObj.word.split('');
    setUserLetters([]);
    setIsSuccess(false);
    setIsFailed(false);
    setShowHint(false);
    setRedemptionQuizActive(false);

    // Create scrambled tiles pool with extra letters (distractors)
    const extraAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const distractorsCount = Math.min(3, 10 - targetLetters.length);
    const extraLetters: string[] = [];
    while (extraLetters.length < Math.max(2, distractorsCount)) {
      const randChar = extraAlphabet[Math.floor(Math.random() * extraAlphabet.length)];
      if (!targetLetters.includes(randChar) && !extraLetters.includes(randChar)) {
        extraLetters.push(randChar);
      }
    }

    const allLetters = [...targetLetters, ...extraLetters].sort(() => Math.random() - 0.5);
    const tiles = allLetters.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      letter: char,
      isUsed: false
    }));

    setAvailableTiles(tiles);
  }, []);

  useEffect(() => {
    if (currentWord) {
      initRound(currentWord);
    }
  }, [currentWordIndex, language, difficulty, initRound]);

  // Pronounce word
  const speakCurrentWord = (rate: number = 0.9) => {
    soundAudio.playTing();
    if (language === 'id') {
      soundAudio.speakIndonesian(currentWord.word.toLowerCase(), rate);
    } else {
      soundAudio.speakEnglish(currentWord.word.toLowerCase(), rate);
    }
  };

  // Spell word letter by letter
  const spellLettersSlowly = () => {
    soundAudio.playTing();
    const spelled = currentWord.word.split('').join(' . ');
    if (language === 'id') {
      soundAudio.speakIndonesian(spelled, 0.75);
    } else {
      soundAudio.speakEnglish(spelled, 0.75);
    }
  };

  // Add letter from available tile
  const handleSelectTile = (tileId: string) => {
    if (isSuccess || isFailed || userLetters.length >= currentWord.word.length) return;

    const tile = availableTiles.find(t => t.id === tileId);
    if (!tile || tile.isUsed) return;

    soundAudio.playTing();
    const newUsedTiles = availableTiles.map(t =>
      t.id === tileId ? { ...t, isUsed: true } : t
    );
    setAvailableTiles(newUsedTiles);

    const nextUserLetters = [...userLetters, tile.letter];
    setUserLetters(nextUserLetters);

    // If word is filled completely, check correctness
    if (nextUserLetters.length === currentWord.word.length) {
      checkSpelling(nextUserLetters.join(''));
    }
  };

  // Remove last letter (Undo)
  const handleRemoveLastLetter = () => {
    if (userLetters.length === 0 || isSuccess || isFailed) return;

    soundAudio.playTing();
    const lastLetter = userLetters[userLetters.length - 1];
    const nextUserLetters = userLetters.slice(0, -1);
    setUserLetters(nextUserLetters);

    // Free the tile that matches this letter and is currently used
    const tileIndexToFree = availableTiles.findIndex(
      t => t.letter === lastLetter && t.isUsed
    );
    if (tileIndexToFree !== -1) {
      setAvailableTiles(prev =>
        prev.map((t, i) => (i === tileIndexToFree ? { ...t, isUsed: false } : t))
      );
    }
  };

  // Clear all entered letters
  const handleClearLetters = () => {
    if (isSuccess || isFailed) return;
    soundAudio.playTing();
    setUserLetters([]);
    setAvailableTiles(prev => prev.map(t => ({ ...t, isUsed: false })));
  };

  // Check spelling accuracy
  const checkSpelling = (spelledWord: string) => {
    if (spelledWord === currentWord.word) {
      // RESCUE SUCCESS!
      setIsSuccess(true);
      setStreakCount(prev => prev + 1);
      setSavedCount(prev => prev + 1);
      soundAudio.playBonusChime();
      onEarnStar(3);

      if (onRecordHistory) {
        onRecordHistory({
          activityTitle: `Misi Mengeja (${language === 'id' ? 'Bahasa Indonesia' : 'English'})`,
          score: 1,
          totalQuestions: 1,
          starsEarned: 3,
          accuracyPercent: Math.max(20, Math.round(((5 - mistakes) / 5) * 100)),
          details: `Kata "${currentWord.word}" berhasil diselamatkan dengan ${mistakes} kesalahan tali.`
        });
      }

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      // Voice praise
      if (language === 'id') {
        soundAudio.speakIndonesian(
          `Hebat sekali! Kata ${currentWord.word} berhasil dieja dengan benar. Karakter berhasil diselamatkan!`
        );
      } else {
        soundAudio.speakEnglish(
          `Awesome! You spelled ${currentWord.word} correctly. Character is saved!`
        );
      }
    } else {
      // MISTAKE OCCURRED
      soundAudio.playSnakeSlide();
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= 5) {
        // CHARACTER CAPTURED & BOUND!
        setIsFailed(true);
        setStreakCount(0);
        if (language === 'id') {
          soundAudio.speakIndonesian(
            'Aduh! Sudah lima kali salah. Karakter terikat tali rapat-rapat!'
          );
        } else {
          soundAudio.speakEnglish(
            'Oh no! Five mistakes. Character is completely tied up!'
          );
        }
      } else {
        // Warning voice
        if (language === 'id') {
          soundAudio.speakIndonesian(
            `Belum tepat. Tali bertambah! Sisa kesempatan: ${5 - newMistakes}`
          );
        } else {
          soundAudio.speakEnglish(
            `Not quite. Another rope added! Remaining chances: ${5 - newMistakes}`
          );
        }
      }
    }
  };

  // Next word
  const handleNextWord = () => {
    soundAudio.playTing();
    setMistakes(0); // Reset rope strikes for the new word
    setCurrentWordIndex(prev => prev + 1);
  };

  // Retry current word (cut 2 ropes to give another chance)
  const handleRetryCurrentWord = () => {
    soundAudio.playTing();
    setMistakes(2); // gives 3 chances back
    initRound(currentWord);
  };

  // Start redemption quiz (1 quick question to cut all ropes!)
  const handleStartRedemptionQuiz = () => {
    soundAudio.playTing();
    const correctLetter = currentWord.word[0];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fakeLetters: string[] = [];
    while (fakeLetters.length < 3) {
      const f = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (f !== correctLetter && !fakeLetters.includes(f)) {
        fakeLetters.push(f);
      }
    }
    const options = [correctLetter, ...fakeLetters].sort(() => Math.random() - 0.5);
    setRedemptionOptions(options);
    setRedemptionQuizActive(true);
  };

  const handleAnswerRedemption = (selected: string) => {
    if (selected === currentWord.word[0]) {
      // Redemption Success! Cut all ropes!
      soundAudio.playBonusChime();
      setMistakes(0);
      setIsFailed(false);
      setRedemptionQuizActive(false);
      initRound(currentWord);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      if (language === 'id') {
        soundAudio.speakIndonesian(
          'Alhamdulillah! Tali berhasil dipotong! Karaktermu bebas kembali.'
        );
      } else {
        soundAudio.speakEnglish(
          'Hooray! Ropes are cut! Your character is free again.'
        );
      }
    } else {
      soundAudio.playSnakeSlide();
      if (language === 'id') {
        soundAudio.speakIndonesian('Jawaban tebusan belum tepat. Ayo coba lagi!');
      } else {
        soundAudio.speakEnglish('Not correct. Try again!');
      }
    }
  };

  // Handle physical keyboard & TV remote navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();

      if (redemptionQuizActive) {
        const num = parseInt(key, 10);
        if (num >= 1 && num <= 4 && redemptionOptions[num - 1]) {
          handleAnswerRedemption(redemptionOptions[num - 1]);
        } else if (key === 'ESCAPE') {
          setRedemptionQuizActive(false);
        }
        return;
      }

      if (isSuccess) {
        if (key === 'ENTER' || key === ' ' || key === 'N') {
          handleNextWord();
        }
        return;
      }

      if (isFailed) {
        if (key === 'ENTER' || key === '1' || key === 'T') {
          handleStartRedemptionQuiz();
        } else if (key === '2' || key === 'R') {
          handleRetryCurrentWord();
        } else if (key === '3' || key === 'N') {
          handleNextWord();
        }
        return;
      }

      if (key === 'BACKSPACE') {
        handleRemoveLastLetter();
      } else if (key === '0' || key === 'ESCAPE') {
        handleClearLetters();
      } else if (/^[A-Z]$/.test(key)) {
        // Find first unused tile with this letter
        const matchTile = availableTiles.find(t => t.letter === key && !t.isUsed);
        if (matchTile) {
          handleSelectTile(matchTile.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableTiles, isSuccess, isFailed, redemptionQuizActive, redemptionOptions]);

  const activeStage = RESCUE_STAGES[Math.min(5, mistakes)];
  const character = characterConfig || FALLBACK_CHARACTER;

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Sleek Top Game Header (Unified & Compact - No Clutter!) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-lg shadow-xs shrink-0">
            🔤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
                Misi Penyelamatan: Game Mengeja
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                SD / MI
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Eja kata dengan benar untuk melepaskan jeratan tali & membebaskan karaktermu!
            </p>
          </div>
        </div>

        {/* Controls: Language Pills & Difficulty Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Switch */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => {
                soundAudio.playTing();
                setLanguage('id');
                setMistakes(0);
                setCurrentWordIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                language === 'id'
                  ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500/20'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇮🇩</span>
              <span>B. Indonesia</span>
            </button>
            <button
              onClick={() => {
                soundAudio.playTing();
                setLanguage('en');
                setMistakes(0);
                setCurrentWordIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Difficulty Dropdown / Pills */}
          <div className="flex items-center gap-1 text-xs">
            {(['semua', 'mudah', 'sedang', 'sulit'] as DifficultyFilter[]).map(d => (
              <button
                key={d}
                onClick={() => {
                  soundAudio.playTing();
                  setDifficulty(d);
                  setCurrentWordIndex(0);
                  setMistakes(0);
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs capitalize transition-colors ${
                  difficulty === d
                    ? 'bg-stone-800 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {d === 'semua' ? 'Semua' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Arena: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* ======================================================= */}
        {/* LEFT COLUMN: THE RESCUE SCENE & CHARACTER STAGE (5 Cols) */}
        {/* ======================================================= */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4">
          {/* Header Stats: Strikes/Ropes & Danger Gauge */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-stone-700">Status Penyelamatan:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${activeStage.badgeColor}`}>
                {activeStage.label}
              </span>
            </div>
          </div>

          {/* 5 Ropes / Strikes Visual Indicators */}
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-stone-600">
                Jeratan Tali ({mistakes}/5 Salah)
              </span>
              <span className="text-[11px] font-extrabold text-stone-700">
                {5 - mistakes} Kesempatan Tersisa
              </span>
            </div>

            {/* 5 Indicator Nodes */}
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map(step => {
                const isTied = step <= mistakes;
                return (
                  <div
                    key={step}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isTied
                        ? step === 5
                          ? 'bg-red-600 ring-2 ring-red-400'
                          : 'bg-amber-500'
                        : 'bg-stone-200'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Character Rescue Visual Centerpiece */}
          <div
            className={`relative py-6 px-4 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${activeStage.auraClass}`}
          >
            {/* Background Cage / Grid illustration when mistakes >= 4 */}
            {mistakes >= 4 && (
              <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-around">
                <div className="w-1.5 bg-stone-900 h-full" />
                <div className="w-1.5 bg-stone-900 h-full" />
                <div className="w-1.5 bg-stone-900 h-full" />
                <div className="w-1.5 bg-stone-900 h-full" />
                <div className="w-1.5 bg-stone-900 h-full" />
              </div>
            )}

            {/* Character Avatar */}
            <div className="relative z-10">
              <div
                className={`transition-transform duration-300 ${
                  mistakes >= 4 ? 'animate-shake' : mistakes >= 2 ? 'rotate-[-2deg]' : ''
                }`}
              >
                <CharacterAvatar
                  config={{
                    ...character,
                    eyeExpression:
                      mistakes >= 4
                        ? 'gentle_round'
                        : isSuccess
                        ? 'star_eyes'
                        : character.eyeExpression,
                    mouthExpression:
                      mistakes >= 4
                        ? 'shy_smile'
                        : isSuccess
                        ? 'laugh_happy'
                        : character.mouthExpression
                  }}
                  size="lg"
                  className="shadow-md"
                />
              </div>

              {/* DYNAMIC ROPE SVG OVERLAYS BASED ON MISTAKES (1 TO 5) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* 1 Mistake: Rope wrapping around feet/ground */}
                {mistakes >= 1 && (
                  <svg className="absolute bottom-0 w-32 h-14" viewBox="0 0 120 50">
                    <path
                      d="M10 40 Q 60 48 110 40 M15 35 Q 60 42 105 35"
                      stroke="#92400e"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="4 2"
                      className="drop-shadow-sm"
                    />
                    <circle cx="20" cy="38" r="3" fill="#b45309" />
                    <circle cx="100" cy="38" r="3" fill="#b45309" />
                  </svg>
                )}

                {/* 2 Mistakes: Ropes coiled tightly around ankles */}
                {mistakes >= 2 && (
                  <svg className="absolute bottom-3 w-28 h-16" viewBox="0 0 100 60">
                    <path
                      d="M20 30 C 50 15 50 45 80 30 M25 40 C 50 25 50 55 75 40"
                      stroke="#b45309"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="3 1"
                    />
                  </svg>
                )}

                {/* 3 Mistakes: Ropes wrapped around body & waist */}
                {mistakes >= 3 && (
                  <svg className="absolute top-12 w-28 h-24" viewBox="0 0 100 80">
                    <path
                      d="M15 30 Q 50 45 85 30 M15 50 Q 50 65 85 50"
                      stroke="#78350f"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="4 2"
                    />
                  </svg>
                )}

                {/* 4 Mistakes: Critical ropes criss-crossing torso with padlock clicking */}
                {mistakes >= 4 && (
                  <div className="absolute top-10 flex flex-col items-center">
                    <svg className="w-32 h-28" viewBox="0 0 120 100">
                      <path
                        d="M20 20 L 100 80 M100 20 L 20 80"
                        stroke="#7f1d1d"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="3 2"
                      />
                    </svg>
                    <div className="bg-red-600 text-white p-1 rounded-full shadow-md animate-bounce mt-[-20px]">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* 5 Mistakes: Full cage and heavy tied padlock! */}
                {mistakes >= 5 && (
                  <div className="absolute inset-0 bg-stone-900/40 rounded-3xl backdrop-blur-2xs flex flex-col items-center justify-center p-2 text-white">
                    <div className="bg-red-600 p-2.5 rounded-2xl shadow-xl animate-pulse flex items-center gap-1.5 mb-1">
                      <Lock className="w-6 h-6 text-white" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        Terikat Rapat!
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-red-200 bg-black/60 px-2 py-0.5 rounded-md">
                      Tekan Tebusan untuk Memotong Tali
                    </span>
                  </div>
                )}

                {/* SUCCESS: Ropes cut with sparkles! */}
                {isSuccess && (
                  <div className="absolute -top-3 right-0 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg animate-bounce flex items-center gap-1">
                    <Unlock className="w-5 h-5" />
                    <span className="text-xs font-black">Bebas!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Character Dialogue Bubble */}
            <div className="mt-4 text-center max-w-xs z-10">
              <p className="text-xs font-medium text-stone-700 italic bg-white/90 px-3 py-2 rounded-2xl border border-stone-200 shadow-2xs">
                {language === 'id' ? activeStage.dialogueId : activeStage.dialogueEn}
              </p>
            </div>
          </div>

          {/* Rescue Stats Bar */}
          <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>
                Karakter Selamat: <strong>{savedCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>
                Streak Beruntun: <strong>{streakCount}x</strong>
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* RIGHT COLUMN: INTERACTIVE SPELLING CONSOLE (7 Cols)   */}
        {/* ======================================================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-5">
          {/* Word Category & Audio Listen Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">{currentWord.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    {currentWord.category}
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {currentWord.word.length} Huruf
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentWord.meaning}
                </p>
              </div>
            </div>

            {/* Audio Voice Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakCurrentWord(0.9)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all"
                title="Dengarkan Pengucapan Kata"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengar Kata</span>
              </button>

              <button
                onClick={spellLettersSlowly}
                className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                title="Eja Huruf Perlahan"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Clue / Example Sentence */}
          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">
                Contoh Kalimat: <em>"{currentWord.exampleSentence}"</em>
              </p>
              {currentWord.phoneticHint && (
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Bunyi Fonetik: <strong>{currentWord.phoneticHint}</strong>
                </p>
              )}
            </div>
          </div>

          {/* TARGET WORD SLOTS (The Letter Boxes) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
              <span>Kotak Jawaban Ejaan:</span>
              <span>
                {userLetters.length} / {currentWord.word.length} Terisi
              </span>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-2 py-3 bg-stone-50 rounded-2xl border border-stone-200 min-h-[72px]">
              {Array.from({ length: currentWord.word.length }).map((_, index) => {
                const filledChar = userLetters[index];
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (index === userLetters.length - 1) {
                        handleRemoveLastLetter();
                      }
                    }}
                    className={`w-11 h-13 sm:w-13 sm:h-15 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                      filledChar
                        ? isSuccess
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                          : 'bg-white border-amber-400 text-stone-900 shadow-sm cursor-pointer hover:border-red-400'
                        : 'bg-white/80 border-dashed border-stone-300 text-transparent'
                    }`}
                  >
                    {filledChar || ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AVAILABLE LETTER TILES POOL */}
          {!isSuccess && !isFailed && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-600 px-1">
                <span>Pilih Huruf untuk Menyusun:</span>
                <span className="text-[11px] text-stone-400">
                  (Dapat juga mengetik keyboard fisik)
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-stone-100/70 rounded-2xl border border-stone-200">
                {availableTiles.map(tile => (
                  <button
                    key={tile.id}
                    disabled={tile.isUsed}
                    onClick={() => handleSelectTile(tile.id)}
                    className={`w-10 h-11 sm:w-12 sm:h-13 rounded-xl font-extrabold text-base sm:text-lg transition-all ${
                      tile.isUsed
                        ? 'opacity-25 bg-stone-200 text-stone-400 cursor-not-allowed scale-95'
                        : 'bg-white hover:bg-amber-50 text-stone-800 shadow-xs border border-stone-300 hover:border-amber-400 active:scale-95'
                    }`}
                  >
                    {tile.letter}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Undo, Clear, Hint */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRemoveLastLetter}
                    disabled={userLetters.length === 0}
                    className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Hapus 1</span>
                  </button>

                  <button
                    onClick={handleClearLetters}
                    disabled={userLetters.length === 0}
                    className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 rounded-xl transition-colors"
                  >
                    Hapus Semua
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundAudio.playTing();
                    setShowHint(!showHint);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl flex items-center gap-1 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Tutup Petunjuk' : 'Bantuan Suku Kata'}</span>
                </button>
              </div>

              {/* Syllables Hint Display */}
              {showHint && currentWord.syllables && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-xs animate-fadeIn">
                  <span className="font-bold text-teal-900">
                    Suku Kata: {currentWord.syllables.join(' - ')}
                  </span>
                  <span className="text-[11px] text-teal-700">
                    Huruf awal: <strong>{currentWord.word[0]}</strong>, akhir: <strong>{currentWord.word[currentWord.word.length - 1]}</strong>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* SUCCESS BANNER */}
          {isSuccess && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-emerald-950">
                Masya Allah! Ejaan Benar & Karakter Bebas! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                Kata <strong>{currentWord.word}</strong> berhasil dieja sempurna. Tali jerat terputus dan kamu mendapatkan <strong>+3 Bintang</strong>!
              </p>
              <button
                onClick={handleNextWord}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md inline-flex items-center gap-2 active:scale-95 transition-all tv-card"
              >
                <span className="text-xs bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded font-mono">[OK / ⏎]</span>
                <span>Kata Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* FAILED BANNER (CHARACTER TIED UP - 5 STRIKES) */}
          {isFailed && !redemptionQuizActive && (
            <div className="p-5 bg-stone-900 text-white border-2 border-red-500 rounded-3xl space-y-3 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-red-400">
                Karakter Terikat Sepenuhnya! 😱
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Kesempatan 5 kali telah habis untuk kata <strong>{currentWord.word}</strong>. Ayo selamatkan karaktermu dengan menjawab kuis tebusan pemotong tali!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  onClick={handleStartRedemptionQuiz}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-1.5 active:scale-95 transition-all tv-card"
                >
                  <span className="text-xs bg-red-950/70 text-red-200 px-1.5 py-0.5 rounded font-mono">[1]</span>
                  <Unlock className="w-4 h-4" />
                  <span>Kuis Tebusan (Potong Tali)</span>
                </button>
                <button
                  onClick={handleRetryCurrentWord}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 transition-colors tv-card inline-flex items-center gap-1.5"
                >
                  <span className="text-xs bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded font-mono">[2]</span>
                  <span>Coba Ulang Kata Ini</span>
                </button>
                <button
                  onClick={handleNextWord}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 transition-colors tv-card inline-flex items-center gap-1.5"
                >
                  <span className="text-xs bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded font-mono">[3]</span>
                  <span>Ganti Kata Baru</span>
                </button>
              </div>
            </div>
          )}

          {/* REDEMPTION QUIZ MODAL / INLINE VIEW */}
          {redemptionQuizActive && (
            <div className="p-5 bg-red-50 border-2 border-red-300 rounded-3xl space-y-4 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-900 uppercase">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Kuis Tebusan: Potong Tali Sekarang!</span>
              </div>
              <p className="text-sm font-extrabold text-stone-800">
                Manakah <strong>huruf pertama</strong> dari kata "{currentWord.meaning}" ({currentWord.emoji})?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-sm mx-auto">
                {redemptionOptions.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswerRedemption(opt)}
                    className="py-3 bg-white hover:bg-red-100 text-stone-900 border-2 border-red-200 hover:border-red-400 font-black text-xl rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 tv-card"
                  >
                    <span className="text-xs font-bold text-red-800 bg-red-100 px-1.5 py-0.5 rounded">[{idx + 1}]</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek Bottom Game Switcher Bar (Tidy, Compact, No Clutter!) */}
      {onSwitchToGame && (
        <div className="bg-stone-100 rounded-2xl p-2.5 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-600 px-1">
            <span>Pilihan Arena Game:</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => onSwitchToGame('game-perkalian')}
              className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>Perkalian</span>
            </button>
            <button
              onClick={() => onSwitchToGame('sambung-hijaiyah')}
              className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white transition-colors flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Sambung Huruf</span>
            </button>
            <button
              onClick={() => onSwitchToGame('ular-tangga')}
              className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white transition-colors flex items-center gap-1"
            >
              <Dice5 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ular Tangga</span>
            </button>
            <button
              onClick={() => onSwitchToGame('kartu-memori')}
              className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white transition-colors flex items-center gap-1"
            >
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>Memori</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
