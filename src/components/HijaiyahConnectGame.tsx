import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  WORD_ASSEMBLY_CHALLENGES,
  CONNECT_RULE_CHALLENGES,
  POSITION_MATCHER_QUESTIONS,
  HIJAIYAH_CONNECT_FORMS,
  NON_CONNECTORS,
  WordAssemblyItem,
  ConnectRuleChallenge,
  PositionMatcherQuestion
} from '../data/hijaiyahConnectData';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Link as LinkIcon,
  Scissors,
  Layers,
  HelpCircle,
  Trophy,
  Star,
  RefreshCw,
  Dice5,
  Brain,
  Award,
  BookOpen,
  Calculator,
  SpellCheck
} from 'lucide-react';

interface HijaiyahConnectGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar: (count: number) => void;
  onSwitchToGame?: (gameTab: string) => void;
}

type GameMode = 'rakit-kata' | 'sambung-pisah' | 'tebak-bentuk' | 'lab-bebas';

const FALLBACK_CHARACTER: CharacterConfig = {
  name: 'Fatimah',
  hijabColor: '#ffffff',
  hijabStyle: 'bergo_sekolah',
  eyeExpression: 'star_eyes',
  mouthExpression: 'sweet_smile',
  blushStyle: 'rosy',
  outfit: 'mi_hijau',
  handPose: 'peace',
  skinTone: 'warm_peach',
  faceMark: 'none',
  accessory: 'star_pin',
  companionTitle: 'Santriwati Teladan'
};

export const HijaiyahConnectGame: React.FC<HijaiyahConnectGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame
}) => {
  const [activeMode, setActiveMode] = useState<GameMode>('rakit-kata');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ==========================================
  // MODE 1: RAKIT KATA SAMBUNG STATE
  // ==========================================
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const filteredWords = WORD_ASSEMBLY_CHALLENGES.filter(w => w.level === selectedLevel);
  const currentWord: WordAssemblyItem = filteredWords[currentWordIdx] || filteredWords[0];

  // Bank of available letter chips to choose from (scrambled)
  interface LetterChip {
    chipId: string;
    char: string;
    withHarakat: string;
    name: string;
    correctTargetIndex: number;
    connectedForm: string;
  }

  const [letterBank, setLetterBank] = useState<LetterChip[]>([]);
  // Assembled slots array (null or LetterChip)
  const [assembledSlots, setAssembledSlots] = useState<(LetterChip | null)[]>([]);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [hasWrongAttempt, setHasWrongAttempt] = useState(false);
  const [showWordHint, setShowWordHint] = useState(false);

  // Initialize word challenge
  useEffect(() => {
    if (!currentWord) return;
    const chips: LetterChip[] = currentWord.letters.map((l, index) => ({
      chipId: `${currentWord.id}-${index}-${l.char}`,
      char: l.char,
      withHarakat: l.withHarakat,
      name: l.name,
      correctTargetIndex: index,
      connectedForm: l.connectedForm
    }));

    // Scramble chips so child has to place them
    const scrambled = [...chips].sort(() => Math.random() - 0.5);
    setLetterBank(scrambled);
    setAssembledSlots(new Array(currentWord.letters.length).fill(null));
    setIsWordComplete(false);
    setHasWrongAttempt(false);
    setShowWordHint(false);
  }, [currentWord, selectedLevel, currentWordIdx]);

  // Handle letter chip selection
  const handleSelectChip = (chip: LetterChip) => {
    if (isWordComplete) return;

    // Find first empty slot (Arabic is RTL: slot 0 is first letter, slot 1 second, etc.)
    const nextEmptyIndex = assembledSlots.findIndex(s => s === null);
    if (nextEmptyIndex === -1) return;

    if (soundEnabled) soundAudio.playConnectSnap();

    const newSlots = [...assembledSlots];
    newSlots[nextEmptyIndex] = chip;
    setAssembledSlots(newSlots);

    // Remove chip from bank
    setLetterBank(prev => prev.filter(c => c.chipId !== chip.chipId));

    // Check if all slots are now filled
    if (newSlots.every(s => s !== null)) {
      // Check correctness
      const isCorrect = newSlots.every((s, i) => s?.correctTargetIndex === i);
      if (isCorrect) {
        setIsWordComplete(true);
        setHasWrongAttempt(false);
        if (soundEnabled) {
          soundAudio.playSuccessChime();
          soundAudio.speakArabic(currentWord.word);
        }
        onEarnStar(2);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setHasWrongAttempt(true);
        if (soundEnabled) soundAudio.playErrorBuzz();
      }
    }
  };

  // Remove letter from slot back to bank
  const handleRemoveFromSlot = (index: number) => {
    if (isWordComplete) return;
    const chip = assembledSlots[index];
    if (!chip) return;

    if (soundEnabled) soundAudio.playCardFlip();
    const newSlots = [...assembledSlots];
    newSlots[index] = null;
    setAssembledSlots(newSlots);
    setLetterBank(prev => [...prev, chip]);
    setHasWrongAttempt(false);
  };

  const handleNextWord = () => {
    if (currentWordIdx + 1 < filteredWords.length) {
      setCurrentWordIdx(prev => prev + 1);
    } else {
      // Loop or advance level
      if (selectedLevel < 3) {
        setSelectedLevel((prev) => (prev + 1) as 1 | 2 | 3);
        setCurrentWordIdx(0);
      } else {
        setCurrentWordIdx(0);
      }
      if (soundEnabled) soundAudio.playFanfare();
    }
  };

  const handleResetCurrentWord = () => {
    if (!currentWord) return;
    const chips: LetterChip[] = currentWord.letters.map((l, index) => ({
      chipId: `${currentWord.id}-${index}-${l.char}`,
      char: l.char,
      withHarakat: l.withHarakat,
      name: l.name,
      correctTargetIndex: index,
      connectedForm: l.connectedForm
    }));
    const scrambled = [...chips].sort(() => Math.random() - 0.5);
    setLetterBank(scrambled);
    setAssembledSlots(new Array(currentWord.letters.length).fill(null));
    setIsWordComplete(false);
    setHasWrongAttempt(false);
  };

  // ==========================================
  // MODE 2: SAMBUNG ATAU PISAH STATE
  // ==========================================
  const [ruleChallengeIdx, setRuleChallengeIdx] = useState(0);
  const [ruleStreak, setRuleStreak] = useState(0);
  const [ruleAnswerState, setRuleAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [ruleUserChoice, setRuleUserChoice] = useState<boolean | null>(null);

  const currentRule: ConnectRuleChallenge = CONNECT_RULE_CHALLENGES[ruleChallengeIdx % CONNECT_RULE_CHALLENGES.length];

  const handleRuleAnswer = (userSaysCanConnect: boolean) => {
    if (ruleAnswerState !== 'idle') return;

    setRuleUserChoice(userSaysCanConnect);
    const isCorrect = userSaysCanConnect === currentRule.canConnect;

    if (isCorrect) {
      setRuleAnswerState('correct');
      const newStreak = ruleStreak + 1;
      setRuleStreak(newStreak);
      if (soundEnabled) soundAudio.playSuccessChime();
      if (newStreak % 3 === 0) {
        onEarnStar(1);
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      }
    } else {
      setRuleAnswerState('wrong');
      setRuleStreak(0);
      if (soundEnabled) soundAudio.playErrorBuzz();
    }
  };

  const handleNextRuleQuestion = () => {
    setRuleAnswerState('idle');
    setRuleUserChoice(null);
    setRuleChallengeIdx(prev => prev + 1);
  };

  // ==========================================
  // MODE 3: TEBAK BENTUK POSISI STATE
  // ==========================================
  const [positionIdx, setPositionIdx] = useState(0);
  const [positionSelectedAnswer, setPositionSelectedAnswer] = useState<string | null>(null);
  const [positionIsCorrect, setPositionIsCorrect] = useState<boolean | null>(null);
  const [positionScore, setPositionScore] = useState(0);

  const currentPosQ: PositionMatcherQuestion = POSITION_MATCHER_QUESTIONS[positionIdx % POSITION_MATCHER_QUESTIONS.length];

  const handlePositionSelect = (option: string) => {
    if (positionSelectedAnswer !== null) return;
    setPositionSelectedAnswer(option);

    const isMatch = option === currentPosQ.correctForm;
    setPositionIsCorrect(isMatch);

    if (isMatch) {
      setPositionScore(prev => prev + 1);
      if (soundEnabled) soundAudio.playSuccessChime();
      onEarnStar(1);
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
    } else {
      if (soundEnabled) soundAudio.playErrorBuzz();
    }
  };

  const handleNextPositionQ = () => {
    setPositionSelectedAnswer(null);
    setPositionIsCorrect(null);
    setPositionIdx(prev => prev + 1);
  };

  // ==========================================
  // MODE 4: LAB SAMBUNG BEBAS STATE
  // ==========================================
  const [sandboxLetters, setSandboxLetters] = useState<string[]>(['ك', 'ت', 'ب']);

  const handleAddSandboxLetter = (char: string) => {
    if (sandboxLetters.length >= 6) return;
    if (soundEnabled) soundAudio.playConnectSnap();
    setSandboxLetters(prev => [...prev, char]);
  };

  const handleRemoveLastSandboxLetter = () => {
    if (sandboxLetters.length === 0) return;
    if (soundEnabled) soundAudio.playCardFlip();
    setSandboxLetters(prev => prev.slice(0, prev.length - 1));
  };

  const handleClearSandbox = () => {
    setSandboxLetters([]);
  };

  // Build the joined word representation
  const sandboxJoinedWord = sandboxLetters.join('');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Game Selector Banner */}
      <div className="bg-stone-100 rounded-xl p-2 border border-stone-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-1 text-xs font-bold text-stone-700">
          <LinkIcon className="w-4 h-4 text-teal-600" />
          <span>Arena Game:</span>
        </div>
        {onSwitchToGame && (
          <div className="flex items-center gap-1 overflow-x-auto max-w-full text-xs font-semibold">
            <button
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-white text-teal-900 shadow-2xs border border-teal-200 shrink-0"
            >
              <LinkIcon className="w-3 h-3 text-teal-600" />
              <span>Sambung Hijaiyah</span>
            </button>
            <button
              onClick={() => onSwitchToGame('game-mengeja')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <SpellCheck className="w-3 h-3 text-emerald-600" />
              <span>Mengeja</span>
            </button>
            <button
              onClick={() => onSwitchToGame('game-perkalian')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <Calculator className="w-3 h-3 text-orange-600" />
              <span>Perkalian</span>
            </button>
            <button
              onClick={() => onSwitchToGame('ular-tangga')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <Dice5 className="w-3 h-3 text-emerald-600" />
              <span>Ular Tangga</span>
            </button>
            <button
              onClick={() => onSwitchToGame('kartu-memori')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <Brain className="w-3 h-3 text-purple-600" />
              <span>Memori</span>
            </button>
            <button
              onClick={() => onSwitchToGame('roda-putar')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Roda Putar</span>
            </button>
            <button
              onClick={() => onSwitchToGame('kuis')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all shrink-0"
            >
              <Award className="w-3 h-3 text-yellow-500" />
              <span>Kuis</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Game Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-indigo-50/50 border-2 border-emerald-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        {/* Background decorative Arabic calligraphy watermarks */}
        <div className="absolute right-4 top-2 text-7xl sm:text-9xl font-arabic font-bold text-emerald-200/30 pointer-events-none select-none">
          كَتَبَ
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 relative">
              <CharacterAvatar
                config={characterConfig || FALLBACK_CHARACTER}
                size="md"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full shadow-md">
                <LinkIcon className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Imla & Bahasa Arab Interaktif
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  6 Huruf Pemutus
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Petualangan Sambung Huruf Hijaiyah
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Kuasai perubahan bentuk huruf Arab di awal, tengah, dan akhir dengan puzzle interaktif yang seru!
              </p>
            </div>
          </div>

          {/* Quick Sound Control */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
              title="Atur Suara"
            >
              <Volume2 className="w-4 h-4" />
              <span>{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
            </button>
          </div>
        </div>

        {/* 4 Mode Tabs Navigation */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-emerald-200/60 pt-4">
          <button
            onClick={() => {
              setActiveMode('rakit-kata');
              if (soundEnabled) soundAudio.playTing();
            }}
            className={`p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all ${
              activeMode === 'rakit-kata'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 ring-offset-1'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-emerald-100'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-300" />
              <span>1. Rakit Kata</span>
            </div>
            <span className="text-[10px] font-normal opacity-80">Puzzle Bentuk Sambung</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('sambung-pisah');
              if (soundEnabled) soundAudio.playTing();
            }}
            className={`p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all ${
              activeMode === 'sambung-pisah'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 ring-offset-1'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-emerald-100'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-red-300" />
              <span>2. Sambung / Pisah?</span>
            </div>
            <span className="text-[10px] font-normal opacity-80">Tantangan Huruf Sombong</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('tebak-bentuk');
              if (soundEnabled) soundAudio.playTing();
            }}
            className={`p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all ${
              activeMode === 'tebak-bentuk'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 ring-offset-1'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-emerald-100'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-300" />
              <span>3. Tebak Bentuk</span>
            </div>
            <span className="text-[10px] font-normal opacity-80">Awal, Tengah, Akhir</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('lab-bebas');
              if (soundEnabled) soundAudio.playTing();
            }}
            className={`p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all ${
              activeMode === 'lab-bebas'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 ring-offset-1'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-emerald-100'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>4. Lab Bebas</span>
            </div>
            <span className="text-[10px] font-normal opacity-80">Rakit Sendiri Hurufmu</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: RAKIT KATA SAMBUNG (INTERACTIVE PUZZLE)           */}
      {/* ========================================================= */}
      {activeMode === 'rakit-kata' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Level Selector */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pilih Tingkat:
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setSelectedLevel(lvl as 1 | 2 | 3);
                      setCurrentWordIdx(0);
                      if (soundEnabled) soundAudio.playTing();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedLevel === lvl
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Level {lvl}
                    <span className="ml-1 text-[10px] font-normal opacity-90">
                      {lvl === 1 ? '(Dasar)' : lvl === 2 ? '(Pemutus)' : '(Master)'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Tantangan {currentWordIdx + 1} dari {filteredWords.length}</span>
            </div>
          </div>

          {/* Puzzle Card Main Stage */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-emerald-200/80 shadow-lg relative overflow-hidden">
            {/* Top Target Word Hint Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
                  {currentWord.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      {currentWord.levelLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {currentWord.letters.length} Huruf Hijaiyah
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                    Arti: "{currentWord.meaning}"
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sambungkan huruf-huruf lepas di bawah agar menjadi kata yang utuh!
                  </p>
                </div>
              </div>

              {/* Sound & Hint Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (soundEnabled) {
                      soundAudio.speakArabic(currentWord.word);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                  title="Dengarkan Lafadz Arab"
                >
                  <Volume2 className="w-4 h-4 text-teal-600" />
                  <span>Dengar Lafadz</span>
                </button>

                <button
                  onClick={() => setShowWordHint(!showWordHint)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>{showWordHint ? 'Tutup Target' : 'Lihat Target'}</span>
                </button>
              </div>
            </div>

            {/* Revealed Target Word Hint Banner */}
            {showWordHint && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-arabic font-bold text-amber-900 px-3 py-1 bg-white rounded-xl border border-amber-200 shadow-inner">
                    {currentWord.word}
                  </span>
                  <div className="text-xs text-amber-900">
                    <p className="font-bold">Target Kata Tersambung: <span className="font-arabic text-base">{currentWord.word}</span></p>
                    <p className="text-[11px] opacity-80">{currentWord.ruleNote}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Writing Direction Notice (Arabic is RTL: Right to Left!) */}
            <div className="my-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
                <span>👈 Arah Menulis Arab: <b>Kanan ke Kiri</b></span>
                <span className="text-[10px] text-slate-400 font-normal">| Huruf 1 di kanan, Huruf terakhir di kiri</span>
              </div>
            </div>

            {/* THE ASSEMBLY TRACK SLOTS (RTL Direction) */}
            <div
              dir="rtl"
              className="py-6 px-4 bg-gradient-to-r from-emerald-50/70 via-amber-50/50 to-teal-50/70 rounded-3xl border-2 border-dashed border-emerald-300/80 flex items-center justify-center gap-3 sm:gap-6 flex-wrap"
            >
              {currentWord.letters.map((targetLetter, index) => {
                const filledChip = assembledSlots[index];
                const positionLabel =
                  index === 0
                    ? '1. Awal'
                    : index === currentWord.letters.length - 1
                    ? `${index + 1}. Akhir`
                    : `${index + 1}. Tengah`;

                return (
                  <div key={index} className="flex items-center gap-2 sm:gap-4">
                    {/* The Slot Box */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-500 mb-1.5" dir="ltr">
                        {positionLabel} ({targetLetter.name})
                      </span>

                      <button
                        onClick={() => handleRemoveFromSlot(index)}
                        disabled={isWordComplete || filledChip === null}
                        className={`w-20 h-24 sm:w-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center transition-all relative ${
                          filledChip
                            ? isWordComplete
                              ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg ring-4 ring-emerald-300 scale-105'
                              : 'bg-white text-emerald-800 border-2 border-emerald-400 shadow-md hover:border-red-400'
                            : 'bg-white/80 border-2 border-dashed border-slate-300 text-slate-400 hover:border-emerald-400'
                        }`}
                        title={filledChip ? 'Klik untuk melepas kembali huruf ini' : 'Slot kosong'}
                      >
                        {filledChip ? (
                          <>
                            {/* Big Arabic Letter in its connected form! */}
                            <span className="font-arabic text-4xl sm:text-5xl font-bold select-none leading-none">
                              {filledChip.connectedForm}
                            </span>
                            <span className="text-[10px] font-bold mt-2 opacity-80" dir="ltr">
                              {filledChip.name} ({filledChip.withHarakat})
                            </span>
                            {!isWordComplete && (
                              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center justify-center border border-red-300 shadow-sm">
                                ✕
                              </span>
                            )}
                          </>
                        ) : (
                          <div className="text-center p-2">
                            <span className="text-xs font-bold text-slate-400">
                              Pasang di Sini
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-1">
                              ({targetLetter.position})
                            </span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* Glowing Connection Link Bridge between adjacent letters */}
                    {index < currentWord.letters.length - 1 && (
                      <div className="flex flex-col items-center justify-center pt-5">
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                            assembledSlots[index] && assembledSlots[index + 1]
                              ? 'bg-amber-400 text-amber-950 shadow-md scale-110'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                          title="Garis Gandeng Huruf"
                        >
                          <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Wrong attempt alert */}
            {hasWrongAttempt && !isWordComplete && (
              <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center justify-between gap-3 animate-shake">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>
                    Urutannya belum pas! Ingat, dalam bahasa Arab huruf pertama ada di sebelah <b>KANAN</b> ya!
                  </span>
                </div>
                <button
                  onClick={handleResetCurrentWord}
                  className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold"
                >
                  Ulangi
                </button>
              </div>
            )}

            {/* SUCCESS CELEBRATION BOX */}
            {isWordComplete && (
              <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                      🎉
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 uppercase tracking-wide">
                          MUMTAZ! BERHASIL MENYAMBUNG
                        </span>
                        <span className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-300" /> +2 Bintang
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black mt-1 font-arabic tracking-wide">
                        {currentWord.word} ({currentWord.meaning})
                      </h4>
                      <p className="text-xs text-emerald-100 mt-1 max-w-xl">
                        💡 <b>Kaidah Imla:</b> {currentWord.ruleNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (soundEnabled) soundAudio.speakArabic(currentWord.word);
                      }}
                      className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all shadow-sm"
                      title="Ulangi Suara"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextWord}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                    >
                      <span>Lanjut Kata Berikutnya</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LETTER BANK (AVAILABLE PIECES TO TAP) */}
            {!isWordComplete && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Pilih Huruf untuk Menyambung (Klik untuk Memasang):
                  </span>
                  <button
                    onClick={handleResetCurrentWord}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Acak Ulang</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {letterBank.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Semua huruf sudah terpasang di atas! Klik huruf pada slot jika ingin melepasnya.
                    </span>
                  ) : (
                    letterBank.map((chip) => (
                      <button
                        key={chip.chipId}
                        onClick={() => handleSelectChip(chip)}
                        className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-emerald-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center active:scale-95 group"
                      >
                        <span className="font-arabic text-3xl sm:text-4xl font-bold group-hover:scale-110 transition-transform">
                          {chip.withHarakat}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 mt-1">
                          {chip.name}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: SAMBUNG ATAU PISAH (6 HURUF PEMUTUS CHALLENGE)     */}
      {/* ========================================================= */}
      {activeMode === 'sambung-pisah' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Rule Overview Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-sm shrink-0">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-black text-amber-950 text-sm sm:text-base flex items-center gap-1.5">
                    <span>Hafal 6 Huruf Pemutus (Huruf Sombong):</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {NON_CONNECTORS.map((ch) => (
                      <span
                        key={ch}
                        className="w-7 h-7 rounded-lg bg-white border border-amber-300 text-amber-900 font-arabic text-lg font-bold flex items-center justify-center shadow-xs"
                      >
                        {ch}
                      </span>
                    ))}
                    <span className="text-xs text-amber-800 font-medium ml-1">
                      (Alif, Dal, Dzal, Ra, Zai, Wawu)
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Huruf-huruf ini <b>TIDAK BISA MENYAMBUNG KE KIRI</b>! Huruf setelahnya harus berdiri terpisah.
                  </p>
                </div>
              </div>

              <div className="px-3 py-2 rounded-2xl bg-white border border-amber-300 text-center shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Rangkaian Beruntun</span>
                <span className="text-xl font-black text-amber-600 flex items-center justify-center gap-1">
                  🔥 {ruleStreak}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Quiz Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-lg text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tantangan #{ruleChallengeIdx + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-1">
              Apakah kedua huruf ini BISA DISAMBUNG?
            </h2>

            {/* Two Letters Showcase */}
            <div
              dir="rtl"
              className="my-8 flex items-center justify-center gap-6 p-6 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-1">Huruf 1</span>
                <div className="w-24 h-28 rounded-2xl bg-white border-2 border-emerald-400 text-emerald-800 flex items-center justify-center font-arabic text-5xl font-bold shadow-md">
                  {currentRule.letterA.char}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2">
                  {currentRule.letterA.name}
                </span>
              </div>

              <div className="font-bold text-2xl text-slate-400 pt-4">
                ➕
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-1">Huruf 2</span>
                <div className="w-24 h-28 rounded-2xl bg-white border-2 border-teal-400 text-teal-800 flex items-center justify-center font-arabic text-5xl font-bold shadow-md">
                  {currentRule.letterB.char}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2">
                  {currentRule.letterB.name}
                </span>
              </div>
            </div>

            {/* Answer Result Banner */}
            {ruleAnswerState !== 'idle' && (
              <div
                className={`mb-6 p-4 rounded-2xl border text-sm font-semibold animate-fadeIn ${
                  ruleAnswerState === 'correct'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2 text-base font-black mb-1">
                  {ruleAnswerState === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Jawabanmu TEPAT SEKALI! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span>Belum Tepat! Jangan Putus Asa! 💪</span>
                    </>
                  )}
                </div>

                <div className="my-2 p-2 rounded-xl bg-white/80 inline-block font-arabic text-2xl font-bold text-slate-800">
                  Bentuk Sebenarnya: {currentRule.canConnect ? currentRule.resultConnected : currentRule.resultSeparated}
                </div>

                <p className="text-xs mt-1 max-w-md mx-auto">
                  💡 <b>Penjelasan:</b> {currentRule.explanation}
                </p>

                <button
                  onClick={handleNextRuleQuestion}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md"
                >
                  <span>Tantangan Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Choice Buttons */}
            {ruleAnswerState === 'idle' && (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => handleRuleAnswer(true)}
                  className="p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                  <LinkIcon className="w-6 h-6" />
                  <span>BISA DISAMBUNG 🔗</span>
                </button>

                <button
                  onClick={() => handleRuleAnswer(false)}
                  className="p-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm sm:text-base flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                  <Scissors className="w-6 h-6" />
                  <span>TIDAK BISA / PISAH ✂️</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: TEBAK BENTUK POSISI                                */}
      {/* ========================================================= */}
      {activeMode === 'tebak-bentuk' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-lg text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500 pb-4 border-b border-slate-100">
              <span>Tantangan #{positionIdx + 1}</span>
              <span className="text-emerald-700">Skor Benar: {positionScore}</span>
            </div>

            <div className="my-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Huruf Target:
              </span>
              <div className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 mx-auto mt-2 flex items-center justify-center font-arabic text-5xl font-bold shadow-sm">
                {currentPosQ.letter}
              </div>
              <h3 className="text-lg font-black text-slate-800 mt-3">
                Huruf {currentPosQ.letterName}
              </h3>
              <p className="text-sm font-semibold text-emerald-800 mt-1">
                Manakah bentuknya saat berada <b>{currentPosQ.targetPositionLabel}</b>?
              </p>
            </div>

            {/* 4 Choices Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
              {currentPosQ.options.map((opt, idx) => {
                const isSelected = positionSelectedAnswer === opt;
                const isCorrectOpt = opt === currentPosQ.correctForm;

                let btnStyle = 'bg-white hover:bg-emerald-50 border-2 border-slate-200 text-slate-800';
                if (positionSelectedAnswer !== null) {
                  if (isCorrectOpt) {
                    btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md scale-105';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500 border-2 border-red-600 text-white';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handlePositionSelect(opt)}
                    disabled={positionSelectedAnswer !== null}
                    className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center transition-all ${btnStyle}`}
                  >
                    <span className="font-arabic text-4xl sm:text-5xl font-bold">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {positionSelectedAnswer !== null && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs text-left animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {positionIsCorrect ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Mumtaz! Jawaban Benar!
                    </span>
                  ) : (
                    <span className="text-red-700 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Belum tepat, perhatikan bentuknya ya!
                    </span>
                  )}
                </div>
                <p>💡 {currentPosQ.explanation}</p>
                <div className="text-right mt-3">
                  <button
                    onClick={handleNextPositionQ}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Soal Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 4: LAB SAMBUNG BEBAS (INTERACTIVE ARABIC SANDBOX)    */}
      {/* ========================================================= */}
      {activeMode === 'lab-bebas' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-emerald-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Laboratorium Sambung Bebas</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik huruf apa saja di bawah, dan lihat bagaimana huruf-huruf tersebut otomatis bersambung secara ajaib!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (sandboxJoinedWord && soundEnabled) {
                      soundAudio.speakArabic(sandboxJoinedWord);
                    }
                  }}
                  disabled={sandboxLetters.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Volume2 className="w-4 h-4 text-teal-600" />
                  <span>Dengar Lafadz</span>
                </button>
                <button
                  onClick={handleRemoveLastSandboxLetter}
                  disabled={sandboxLetters.length === 0}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-50"
                >
                  Hapus 1
                </button>
                <button
                  onClick={handleClearSandbox}
                  disabled={sandboxLetters.length === 0}
                  className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold disabled:opacity-50"
                >
                  Bersihkan
                </button>
              </div>
            </div>

            {/* Display Stage */}
            <div className="my-6 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 border-2 border-dashed border-emerald-300 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Hasil Sambungan Otomatis
              </span>

              {sandboxLetters.length === 0 ? (
                <div className="py-8 text-slate-400 text-sm italic">
                  Belum ada huruf yang dipilih. Tekan tombol huruf di papan bawah untuk mulai merakit!
                </div>
              ) : (
                <div className="py-4">
                  {/* Big Calligraphy Result */}
                  <div className="font-arabic text-6xl sm:text-8xl font-bold text-emerald-950 tracking-wide select-none drop-shadow-sm">
                    {sandboxJoinedWord}
                  </div>

                  {/* Letter Breakdown Chips */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2" dir="rtl">
                    {sandboxLetters.map((char, i) => {
                      const letterDef = HIJAIYAH_CONNECT_FORMS.find(f => f.arabic === char);
                      const isNonConn = NON_CONNECTORS.includes(char);
                      return (
                        <div
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-900 shadow-xs flex items-center gap-2"
                        >
                          <span className="font-arabic text-lg font-bold">{char}</span>
                          <span className="text-[10px] font-bold text-slate-500" dir="ltr">
                            {letterDef?.name || ''}
                            {isNonConn && ' (Pemutus)'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Keyboard of 28 Hijaiyah Letters */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  Papan Ketik Hijaiyah (Klik Huruf):
                </span>
                <span className="text-[11px] text-slate-500">
                  {sandboxLetters.length} / 6 Huruf
                </span>
              </div>

              <div
                dir="rtl"
                className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-14 gap-1.5 sm:gap-2 p-3 bg-slate-100 rounded-2xl border border-slate-200"
              >
                {HIJAIYAH_CONNECT_FORMS.map((letter) => {
                  const isNonConn = NON_CONNECTORS.includes(letter.arabic);
                  return (
                    <button
                      key={letter.arabic}
                      onClick={() => handleAddSandboxLetter(letter.arabic)}
                      disabled={sandboxLetters.length >= 6}
                      className={`h-12 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                        isNonConn
                          ? 'bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900'
                          : 'bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800'
                      } shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95`}
                      title={`${letter.name} ${isNonConn ? '(Huruf Pemutus)' : ''}`}
                    >
                      <span className="font-arabic text-xl sm:text-2xl font-bold">
                        {letter.arabic}
                      </span>
                      <span className="text-[8px] font-semibold opacity-75" dir="ltr">
                        {letter.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Word Presets for Inspiration */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Coba Kata Ceria:</span>
              {[
                { word: 'كَتَبَ', letters: ['ك', 'ت', 'ب'], label: 'Menulis' },
                { word: 'سَمَك', letters: ['س', 'م', 'ك'], label: 'Ikan' },
                { word: 'قَلَم', letters: ['ق', 'ل', 'م'], label: 'Pena' },
                { word: 'وَلَد', letters: ['و', 'ل', 'د'], label: 'Anak (Ada Pemutus)' },
                { word: 'بَاب', letters: ['ب', 'ا', 'ب'], label: 'Pintu' },
                { word: 'مَسْجِد', letters: ['م', 'س', 'ج', 'د'], label: 'Masjid' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSandboxLetters(preset.letters);
                    if (soundEnabled) {
                      soundAudio.playConnectSnap();
                      soundAudio.speakArabic(preset.word);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span className="font-arabic font-bold">{preset.word}</span>
                  <span className="text-[10px] opacity-80">({preset.label})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
