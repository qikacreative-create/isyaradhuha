import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Users,
  User,
  Calculator,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Info,
  CheckCircle2,
  Dice5,
  Bot,
  Shield,
  Award,
  Link as LinkIcon,
  SpellCheck,
  Brain,
  Maximize2
} from 'lucide-react';

interface SnakesAndLaddersGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar: (count: number) => void;
  onSwitchToGame?: (gameTab: string) => void;
}

interface Ladder {
  start: number;
  end: number;
  title: string;
  moral: string;
}

interface Snake {
  start: number;
  end: number;
  title: string;
  moral: string;
}

interface SpecialTile {
  tile: number;
  type: 'bonus_star' | 'boost' | 'shield';
  title: string;
  desc: string;
  icon: string;
}

// Tangga (Naik ke atas - Perbuatan Terpuji)
const LADDERS: Ladder[] = [
  { start: 4, end: 14, title: 'Rajin Shalat & Mengaji', moral: 'Shalat tepat waktu membawa berkah, ketenangan, dan kemudahan dalam belajar!' },
  { start: 9, end: 31, title: 'Berbakti Kepada Orang Tua', moral: 'Ridho Allah terletak pada ridho kedua orang tua. Doa orang tua membuka jalan sukses!' },
  { start: 20, end: 38, title: 'Gemar Membaca Buku', moral: 'Buku adalah jendela dunia. Santri yang banyak membaca memiliki wawasan yang luas.' },
  { start: 28, end: 84, title: 'Prestasi Juara Madrasah & SD', moral: 'Kerja keras, doa sungguh-sungguh, dan istiqomah mengantarkanmu melompat tinggi!' },
  { start: 40, end: 59, title: 'Suka Membantu Sahabat', moral: 'Sebaik-baik manusia adalah yang paling bermanfaat dan gemar menolong temannya.' },
  { start: 51, end: 67, title: 'Menjaga Kebersihan', moral: 'Kebersihan adalah sebagian dari iman. Lingkungan bersih membuat belajar jadi ceria.' },
  { start: 63, end: 81, title: 'Jujur & Amanah', moral: 'Sikap jujur menuntun pada kebaikan dan kemuliaan di hadapan Allah dan sesama.' },
  { start: 71, end: 91, title: 'Disiplin Waktu Belajar', moral: 'Waktu adalah modal berharga. Siswa yang disiplin meraih impian dengan gemilang.' },
  { start: 80, end: 99, title: 'Istiqomah Beribadah', moral: 'Subhanallah! Konsisten dalam kebaikan membawa langkahmu hampir di puncak kemenangan!' }
];

// Ular (Turun ke bawah - Perbuatan yang Perlu Dihindari)
const SNAKES: Snake[] = [
  { start: 17, end: 7, title: 'Malas Mengerjakan PR', moral: 'Jangan menunda-nunda tugas sekolah. Kerjakan lebih awal agar pikiran tenang!' },
  { start: 54, end: 34, title: 'Main Game Berlebihan', moral: 'Bermain secukupnya saja ya! Jangan sampai lupa waktu belajar dan beristirahat.' },
  { start: 62, end: 19, title: 'Lupa Berdoa Sebelum Belajar', moral: 'Awali setiap aktivitas dengan Basmalah agar ilmu yang dipelajari berkah dan lekat.' },
  { start: 64, end: 60, title: 'Terlambat Bangun Subuh', moral: 'Tidurlah lebih awal pada malam hari agar badan bugar saat bangun di waktu subuh.' },
  { start: 87, end: 36, title: 'Suka Mengeluh & Bertengkar', moral: 'Saling memaafkan dan menyayangi sesama saudara jauh lebih mulia daripada bertengkar.' },
  { start: 93, end: 73, title: 'Tidak Menyimak Guru', moral: 'Dengarkan penjelasan bapak/ibu guru dengan saksama di kelas agar materi mudah dipahami.' },
  { start: 95, end: 75, title: 'Terburu-buru Saat Ujian', moral: 'Periksa kembali lembar jawabanmu dengan cermat sebelum diserahkan kepada guru.' },
  { start: 98, end: 79, title: 'Bohong & Menyontek', moral: 'Kejujuran walau bernilai sedikit jauh lebih terhormat dan berkah daripada berbohong.' }
];

// Kotak Spesial Kejutan
const SPECIAL_TILES: SpecialTile[] = [
  { tile: 25, type: 'bonus_star', title: 'Berkah Bintang', desc: '+2 Bintang Prestasi Rapor!', icon: '🎁' },
  { tile: 45, type: 'shield', title: 'Perisai Kebaikan', desc: 'Kebal dari 1 gigitan ular berikutnya!', icon: '🛡️' },
  { tile: 68, type: 'boost', title: 'Lompatan Kilat', desc: 'Maju ekstra +3 langkah gratis!', icon: '⚡' },
  { tile: 88, type: 'bonus_star', title: 'Bintang Kejutan', desc: '+3 Bintang Prestasi Tambahan!', icon: '⭐' }
];

// Helper formula to get center coordinates of tile (1 to 100) in percentage (0 to 100)
function getTileCoords(tileNum: number): { x: number; y: number } {
  const rowFromBottom = Math.floor((tileNum - 1) / 10); // 0 to 9
  const rowFromTop = 9 - rowFromBottom; // 0 to 9
  let col = (tileNum - 1) % 10;
  if (rowFromBottom % 2 === 1) {
    col = 9 - col;
  }
  return {
    x: (col + 0.5) * 10,
    y: (rowFromTop + 0.5) * 10
  };
}

// Suggest alternative unused combinations for a target number
function getUnusedFormulaSuggestions(target: number, usedList: string[]): string[] {
  const suggestions: string[] = [];

  // Two-term pairs (1 to floor(target/2))
  for (let a = 1; a <= Math.floor(target / 2); a++) {
    const b = target - a;
    const key = [a, b].sort((x, y) => x - y).join('+');
    if (!usedList.includes(key)) {
      suggestions.push(`${a}+${b}`);
    }
  }

  // Two-term with 0
  const zeroKey = [0, target].sort((x, y) => x - y).join('+');
  if (!usedList.includes(zeroKey) && suggestions.length < 3) {
    suggestions.push(`0+${target}`);
  }

  // Three-term pairs if target >= 3
  if (suggestions.length < 2 && target >= 3) {
    for (let a = 1; a < target; a++) {
      for (let b = 1; b <= target - a; b++) {
        const c = target - a - b;
        if (c >= 1) {
          const key3 = [a, b, c].sort((x, y) => x - y).join('+');
          if (!usedList.includes(key3)) {
            suggestions.push(`${a}+${b}+${c}`);
            if (suggestions.length >= 3) break;
          }
        }
      }
      if (suggestions.length >= 3) break;
    }
  }

  return suggestions.slice(0, 3);
}

interface ParsedFormula {
  valid: boolean;
  steps: number;
  terms: number[];
  normalizedKey: string;
  rawFormatted: string;
  isRepeated: boolean;
  error?: string;
  suggestions?: string[];
}

// Parses string like "2+3" or "1+4", verifies format & ensures no repetition in this game
function parseAdditionFormula(input: string, usedList: string[]): ParsedFormula {
  const trimmed = input.trim().replace(/\s+/g, '');
  if (!trimmed) {
    return {
      valid: false,
      steps: 0,
      terms: [],
      normalizedKey: '',
      rawFormatted: '',
      isRepeated: false,
      error: 'Tuliskan bentuk penjumlahan, contoh: 2+3 untuk maju 5 langkah.'
    };
  }

  // Reject raw single number without '+'
  if (!trimmed.includes('+')) {
    const singleNum = parseInt(trimmed, 10);
    if (!isNaN(singleNum) && singleNum > 0) {
      const half = Math.floor(singleNum / 2);
      const rest = singleNum - half;
      return {
        valid: false,
        steps: singleNum,
        terms: [singleNum],
        normalizedKey: '',
        rawFormatted: trimmed,
        isRepeated: false,
        error: `Jangan hanya ketik angka ${singleNum}! Tuliskan rumus penjumlahannya, contoh: ${half}+${rest} untuk maju ${singleNum} langkah.`
      };
    }
    return {
      valid: false,
      steps: 0,
      terms: [],
      normalizedKey: '',
      rawFormatted: trimmed,
      isRepeated: false,
      error: 'Gunakan tanda tambah (+), contoh: 2+3'
    };
  }

  const parts = trimmed.split('+');
  if (parts.length < 2 || parts.some(p => p === '')) {
    return {
      valid: false,
      steps: 0,
      terms: [],
      normalizedKey: '',
      rawFormatted: trimmed,
      isRepeated: false,
      error: 'Rumus belum lengkap! Tambahkan angka setelah tanda + (contoh: 2+3).'
    };
  }

  const terms: number[] = [];
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (isNaN(n) || n < 0) {
      return {
        valid: false,
        steps: 0,
        terms: [],
        normalizedKey: '',
        rawFormatted: trimmed,
        isRepeated: false,
        error: `Angka "${p}" tidak valid!`
      };
    }
    terms.push(n);
  }

  const steps = terms.reduce((a, b) => a + b, 0);
  if (steps < 1) {
    return {
      valid: false,
      steps: 0,
      terms,
      normalizedKey: '',
      rawFormatted: trimmed,
      isRepeated: false,
      error: 'Jumlah langkah minimal 1!'
    };
  }

  if (steps > 20) {
    return {
      valid: false,
      steps,
      terms,
      normalizedKey: '',
      rawFormatted: trimmed,
      isRepeated: false,
      error: 'Maksimal 20 langkah dalam sekali jalan agar permainan tetap seimbang!'
    };
  }

  // Normalized key: sorted numbers joined with '+' (so 2+3 and 3+2 are recognized as the same combination!)
  const normalizedKey = [...terms].sort((a, b) => a - b).join('+');
  const isRepeated = usedList.includes(normalizedKey);
  const suggestions = isRepeated ? getUnusedFormulaSuggestions(steps, usedList) : [];

  if (isRepeated) {
    return {
      valid: false,
      steps,
      terms,
      normalizedKey,
      rawFormatted: terms.join('+'),
      isRepeated: true,
      suggestions,
      error: `Kombinasi ${terms.join('+')} sudah pernah kamu gunakan di permainan ini! Dilarang mengulang rumus yang sama.`
    };
  }

  return {
    valid: true,
    steps,
    terms,
    normalizedKey,
    rawFormatted: terms.join('+'),
    isRepeated: false
  };
}

export const SnakesAndLaddersGame: React.FC<SnakesAndLaddersGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame
}) => {
  // Game mode: 'solo' | 'ai' (vs Robot Maskot) | 'pvp' (2 pemain)
  const [gameMode, setGameMode] = useState<'solo' | 'ai' | 'pvp'>('ai');
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  // Positions (1 to 100)
  const [pos1, setPos1] = useState<number>(1);
  const [pos2, setPos2] = useState<number>(1);

  // Shield power-up state
  const [hasShield1, setHasShield1] = useState<boolean>(false);
  const [hasShield2, setHasShield2] = useState<boolean>(false);

  // Arithmetic Formula input state: default "2+3"
  const [formulaInput, setFormulaInput] = useState<string>('2+3');

  // Track all used formula combinations in this game session (normalized "2+3")
  const [usedFormulas, setUsedFormulas] = useState<string[]>([]);

  // Animation & game status
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  // Balloon message
  const [speechBubble, setSpeechBubble] = useState<string>(
    'Bismillah! Tulis rumus penjumlahan (misal: jika ingin 5, tulis 2+3). Rumus tidak boleh diulang!'
  );

  const [gameMessage, setGameMessage] = useState<{
    text: string;
    subtext?: string;
    type: 'normal' | 'ladder' | 'snake' | 'bonus' | 'win';
  }>({
    text: 'Selamat datang di Ular Tangga Penjumlahan Ceria!',
    subtext: 'Tulis bentuk penjumlahan untuk melangkah. Setiap kombinasi hanya boleh dipakai sekali!',
    type: 'normal'
  });

  // Move history
  const [historyLogs, setHistoryLogs] = useState<string[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);

  // Helper checks
  const getLadder = (tile: number) => LADDERS.find(l => l.start === tile);
  const getSnake = (tile: number) => SNAKES.find(s => s.start === tile);
  const getSpecialTile = (tile: number) => SPECIAL_TILES.find(t => t.tile === tile);

  // Find nearest upcoming ladder for helpful strategic tip
  const getNearestLadderTip = (currentTile: number) => {
    const nextLadder = LADDERS.filter(l => l.start > currentTile).sort((a, b) => a.start - b.start)[0];
    if (nextLadder) {
      const distance = nextLadder.start - currentTile;
      return { ladder: nextLadder, distance };
    }
    return null;
  };

  // Speak helper
  const speakAdvice = (text: string) => {
    if (speechEnabled) {
      soundAudio.speakIndonesian(text);
    }
  };

  // Execute pawn move with formula validation
  const handleExecuteMove = async (
    customFormula?: { steps: number; raw: string; normalizedKey: string },
    forPlayer?: 1 | 2
  ) => {
    if (isMoving || isWon) return;

    const actingPlayer = forPlayer || currentPlayer;
    let steps: number;
    let formulaDisplay: string;
    let normalizedKey: string;

    if (customFormula) {
      steps = customFormula.steps;
      formulaDisplay = customFormula.raw;
      normalizedKey = customFormula.normalizedKey;
    } else {
      // Evaluate current formula input
      const parsed = parseAdditionFormula(formulaInput, usedFormulas);
      if (!parsed.valid) {
        if (soundEnabled) soundAudio.playPop();
        setSpeechBubble(parsed.error || 'Tuliskan rumus penjumlahan yang benar ya!');
        speakAdvice(parsed.error || 'Tuliskan rumus penjumlahan yang benar ya!');
        setGameMessage({
          text: 'Rumus Belum Sah atau Sudah Pernah Dipakai!',
          subtext: parsed.error,
          type: 'snake'
        });
        return;
      }
      steps = parsed.steps;
      formulaDisplay = parsed.rawFormatted;
      normalizedKey = parsed.normalizedKey;
    }

    // Record this combination as used in this session!
    setUsedFormulas(prev => [...prev, normalizedKey]);

    setIsMoving(true);
    if (soundEnabled) soundAudio.playTing();

    const currentPos = actingPlayer === 1 ? pos1 : pos2;
    const playerName =
      actingPlayer === 1
        ? (characterConfig?.name || 'Santri')
        : gameMode === 'ai'
        ? 'Fatimah AI (Maskot)'
        : 'Pemain 2 (Sahabat)';

    setSpeechBubble(`Hop! Rumus ${formulaDisplay} = ${steps} langkah maju...`);
    setGameMessage({
      text: `${playerName} menggunakan rumus ${formulaDisplay} = ${steps} langkah!`,
      subtext: `Kotak ${currentPos} + ${steps} = ${Math.min(100, currentPos + steps)}`,
      type: 'normal'
    });

    let current = currentPos;
    let target = currentPos + steps;

    // Bounce back if exceeding 100
    if (target > 100) {
      const excess = target - 100;
      target = 100 - excess;
    }

    const stepCount = Math.abs(target - current);
    const direction = target > current ? 1 : -1;

    // Step-by-step hopping animation
    for (let i = 1; i <= stepCount; i++) {
      await new Promise(r => setTimeout(r, 130));
      current += direction;
      if (actingPlayer === 1) {
        setPos1(current);
      } else {
        setPos2(current);
      }
      if (soundEnabled) soundAudio.playStepHop(i);
    }

    // Landed pause
    await new Promise(r => setTimeout(r, 200));

    // Check ladder
    const ladder = getLadder(current);
    // Check snake
    const snake = getSnake(current);
    // Check special tile
    const special = getSpecialTile(current);

    if (ladder) {
      if (soundEnabled) soundAudio.playLadderAscend();
      setSpeechBubble(`Alhamdulillah! Naik tangga ke Kotak ${ladder.end}! 🪜`);
      setGameMessage({
        text: `🪜 HORE NAIK TANGGA! Dari Kotak ${ladder.start} melesat ke Kotak ${ladder.end}!`,
        subtext: `"${ladder.title}" — ${ladder.moral}`,
        type: 'ladder'
      });
      speakAdvice(`Alhamdulillah! Naik tangga dari kotak ${ladder.start} ke kotak ${ladder.end}. ${ladder.moral}`);

      await new Promise(r => setTimeout(r, 450));
      if (actingPlayer === 1) {
        setPos1(ladder.end);
      } else {
        setPos2(ladder.end);
      }
      current = ladder.end;

      setHistoryLogs(prev => [
        `[${actingPlayer === 1 ? 'P1' : 'P2'}] ${formulaDisplay}=${steps} ➔ Kotak ${ladder.start} 🪜 NAIK TANGGA ke ${ladder.end}! (${ladder.title})`,
        ...prev.slice(0, 15)
      ]);
    } else if (snake) {
      // Check if shield protects player
      const hasShield = actingPlayer === 1 ? hasShield1 : hasShield2;
      if (hasShield) {
        if (actingPlayer === 1) setHasShield1(false);
        else setHasShield2(false);

        if (soundEnabled) soundAudio.playBonusChime();
        setSpeechBubble(`🛡️ Perisai Kebaikan aktif! Selamat dari gigitan ular di Kotak ${snake.start}!`);
        setGameMessage({
          text: `🛡️ PERISAI KEBAIKAN AKTIF! ${playerName} selamat dari ular di Kotak ${snake.start}!`,
          subtext: 'Perisaimu terpakai, tetapi posisimu tetap aman tidak meluncur turun!',
          type: 'bonus'
        });
        speakAdvice('Alhamdulillah! Perisai kebaikan melindungimu dari rintangan ular!');

        setHistoryLogs(prev => [
          `[${actingPlayer === 1 ? 'P1' : 'P2'}] 🛡️ Perisai menangkis ular di Kotak ${snake.start}!`,
          ...prev.slice(0, 15)
        ]);
      } else {
        if (soundEnabled) soundAudio.playSnakeSlide();
        setSpeechBubble(`Aduuh terpeleset ular di Kotak ${snake.start}... Tetap semangat! 🐍`);
        setGameMessage({
          text: `🐍 ADUH TERPELESET ULAR! Dari Kotak ${snake.start} meluncur turun ke Kotak ${snake.end}!`,
          subtext: `"${snake.title}" — ${snake.moral}`,
          type: 'snake'
        });
        speakAdvice(`Awas terpeleset ular dari kotak ${snake.start} ke kotak ${snake.end}. ${snake.moral}`);

        await new Promise(r => setTimeout(r, 450));
        if (actingPlayer === 1) {
          setPos1(snake.end);
        } else {
          setPos2(snake.end);
        }
        current = snake.end;

        setHistoryLogs(prev => [
          `[${actingPlayer === 1 ? 'P1' : 'P2'}] ${formulaDisplay}=${steps} ➔ Kotak ${snake.start} 🐍 TURUN ULAR ke ${snake.end}! (${snake.title})`,
          ...prev.slice(0, 15)
        ]);
      }
    } else if (special) {
      if (soundEnabled) soundAudio.playBonusChime();
      if (special.type === 'bonus_star') {
        onEarnStar(special.tile === 88 ? 3 : 2);
        setSpeechBubble(`Hore! Mendarat di Kotak Berkah ${special.tile}! Dapat ${special.desc} ⭐`);
        setGameMessage({
          text: `🎁 KOTAK BERKAH SPESIAL! Kotak ${special.tile}: ${special.title}!`,
          subtext: `${special.desc} Bintang telah otomatis ditambahkan!`,
          type: 'bonus'
        });
      } else if (special.type === 'shield') {
        if (actingPlayer === 1) setHasShield1(true);
        else setHasShield2(true);

        setSpeechBubble(`🛡️ Kamu mendapatkan Perisai Kebaikan! Kebal dari 1 ular berikutnya!`);
        setGameMessage({
          text: `🛡️ PERISAI KEBAIKAN DIDAPATKAN!`,
          subtext: 'Kamu terlindungi dari gigitan 1 ular di langkah selanjutnya!',
          type: 'bonus'
        });
      } else if (special.type === 'boost') {
        setSpeechBubble(`⚡ Lompatan Kilat! Maju bonus +3 kotak lagi!`);
        setGameMessage({
          text: `⚡ LOMPATAN KILAT! Bonus maju +3 kotak gratis!`,
          subtext: 'Melesat dengan tenaga penuh menuju garis akhir!',
          type: 'bonus'
        });
        await new Promise(r => setTimeout(r, 350));
        const boosted = Math.min(100, current + 3);
        if (actingPlayer === 1) setPos1(boosted);
        else setPos2(boosted);
        current = boosted;
      }

      setHistoryLogs(prev => [
        `[${actingPlayer === 1 ? 'P1' : 'P2'}] ${formulaDisplay}=${steps} ➔ Kotak Spesial ${special.tile} (${special.title})`,
        ...prev.slice(0, 15)
      ]);
    } else {
      setSpeechBubble(`Mantap! Rumus ${formulaDisplay} membawa ke Kotak ${current}!`);
      setGameMessage({
        text: `${playerName} mendarat dengan aman di Kotak ${current}!`,
        subtext: `Perhitungan: ${currentPos} + ${steps} = ${current}`,
        type: 'normal'
      });

      setHistoryLogs(prev => [
        `[${actingPlayer === 1 ? 'P1' : 'P2'}] ${formulaDisplay}=${steps} ➔ Mendarat di Kotak ${current}`,
        ...prev.slice(0, 15)
      ]);
    }

    // Auto suggest next unused formula for human player convenience
    const nextSug = getUnusedFormulaSuggestions(Math.floor(Math.random() * 4) + 3, [...usedFormulas, normalizedKey]);
    if (nextSug.length > 0) {
      setFormulaInput(nextSug[0]);
    }

    // Check Win Condition
    if (current === 100) {
      setIsWon(true);
      setWinner(actingPlayer);
      if (soundEnabled) soundAudio.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onEarnStar(20);
      setSpeechBubble(`ALHAMDULILLAH! ${playerName} berhasil menjuarai Ular Tangga 100 Kotak! 🏆`);
      setGameMessage({
        text: `🏆 ALHAMDULILLAH! ${playerName} JUARA!`,
        subtext: 'Selamat telah mencapai Kotak 100! Mendapatkan bonus +20 Bintang Prestasi Rapor!',
        type: 'win'
      });
      speakAdvice(`Alhamdulillah! Selamat kepada ${playerName} yang berhasil mencapai Kotak 100 dan menjadi juara!`);
      setIsMoving(false);
      return;
    }

    // Next turn handling
    if (gameMode === 'pvp') {
      setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
      setIsMoving(false);
    } else if (gameMode === 'ai' && actingPlayer === 1) {
      // AI mascot turn
      setIsMoving(true);
      setCurrentPlayer(2);
      setSpeechBubble('Sekarang giliran Fatimah AI melangkah...');
      await new Promise(r => setTimeout(r, 700));

      // AI calculates target step
      const aiCurrent = pos2;
      const nextLadder = LADDERS.find(l => l.start > aiCurrent && l.start - aiCurrent <= 8);
      let aiStep = Math.floor(Math.random() * 4) + 2; // 2 to 5
      if (nextLadder && Math.random() > 0.35) {
        aiStep = nextLadder.start - aiCurrent; // AI aims for nearby ladder
      }
      if (aiCurrent + aiStep > 100) {
        aiStep = Math.max(1, 100 - aiCurrent);
      }

      // AI also calculates an unused formula!
      const currentUsed = [...usedFormulas, normalizedKey];
      const aiSuggestions = getUnusedFormulaSuggestions(aiStep, currentUsed);
      const aiFormula = aiSuggestions[0] || `${Math.floor(aiStep / 2)}+${aiStep - Math.floor(aiStep / 2)}`;
      const aiParts = aiFormula.split('+').map(n => parseInt(n, 10));
      const aiKey = [...aiParts].sort((a, b) => a - b).join('+');

      await handleExecuteMove({ steps: aiStep, raw: aiFormula, normalizedKey: aiKey }, 2);
      setCurrentPlayer(1);
      setIsMoving(false);
    } else {
      setIsMoving(false);
    }
  };

  const handleResetGame = () => {
    if (soundEnabled) soundAudio.playTing();
    setPos1(1);
    setPos2(1);
    setHasShield1(false);
    setHasShield2(false);
    setCurrentPlayer(1);
    setIsWon(false);
    setWinner(null);
    setHistoryLogs([]);
    setUsedFormulas([]); // Reset used formula list for a fresh new game session!
    setFormulaInput('2+3');
    setSpeechBubble('Bismillah! Permainan dimulai kembali dari Kotak 1. Ayo racik rumus penjumlahanmu!');
    setGameMessage({
      text: 'Permainan telah diulang dari Kotak 1.',
      subtext: 'Daftar rumus terpakai telah dibersihkan. Tulis rumus baru untuk melangkah!',
      type: 'normal'
    });
  };

  // Generate 100 tiles board rows from 10 down to 1
  const boardRows: number[][] = [];
  for (let r = 9; r >= 0; r--) {
    const rowNumbers: number[] = [];
    if (r % 2 === 1) {
      for (let c = 10; c >= 1; c--) {
        rowNumbers.push(r * 10 + c);
      }
    } else {
      for (let c = 1; c <= 10; c++) {
        rowNumbers.push(r * 10 + c);
      }
    }
    boardRows.push(rowNumbers);
  }

  const strategicTip = getNearestLadderTip(currentPlayer === 1 ? pos1 : pos2);
  const parsedCurrent = parseAdditionFormula(formulaInput, usedFormulas);

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* 1. ULTRA-COMPACT SLIM HEADER (KEEPS EVERYTHING IN VIEWPORT) */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-white shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 flex items-center justify-center text-base sm:text-lg shrink-0">
            🎲
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <h2 className="font-black text-xs sm:text-sm">Ular Tangga Penjumlahan SD</h2>
              <span className="text-[9px] bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-full font-black">
                Rumus Wajib Unik
              </span>
            </div>
            <p className="text-[10px] text-emerald-200 hidden md:block leading-none mt-0.5">
              Ingin maju 5? Wajib tulis 2+3 atau 1+4. Dilarang mengulang rumus yang sama di ronde ini!
            </p>
          </div>
        </div>

        {/* Turn, Position & Control Toolbar in one neat row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Player 1 Chip */}
          <div
            className={`px-2 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition-all ${
              currentPlayer === 1
                ? 'bg-emerald-500/35 border-emerald-300 text-white ring-1 ring-amber-300 shadow-2xs'
                : 'bg-white/10 border-white/20 text-white/70'
            }`}
          >
            <span>{characterConfig?.name || 'P1'}:</span>
            <strong className="text-white">Kotak {pos1}</strong>
            {hasShield1 && <span title="Perisai Aktif">🛡️</span>}
          </div>

          {/* Player 2 Chip (AI / PVP) */}
          {gameMode !== 'solo' && (
            <div
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition-all ${
                currentPlayer === 2
                  ? 'bg-amber-500/35 border-amber-300 text-white ring-1 ring-amber-300 shadow-2xs'
                  : 'bg-white/10 border-white/20 text-white/70'
              }`}
            >
              <span>{gameMode === 'ai' ? 'Fatimah AI' : 'P2'}:</span>
              <strong className="text-white">Kotak {pos2}</strong>
              {hasShield2 && <span title="Perisai Aktif">🛡️</span>}
            </div>
          )}

          {/* Mode Switcher */}
          <div className="flex items-center bg-black/25 rounded-lg p-0.5 text-[10px] font-bold">
            <button
              onClick={() => { setGameMode('solo'); soundAudio.playTing(); }}
              className={`px-1.5 py-0.5 rounded ${gameMode === 'solo' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:text-white'}`}
            >
              Solo
            </button>
            <button
              onClick={() => { setGameMode('ai'); soundAudio.playTing(); }}
              className={`px-1.5 py-0.5 rounded ${gameMode === 'ai' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:text-white'}`}
            >
              Vs AI
            </button>
            <button
              onClick={() => { setGameMode('pvp'); soundAudio.playTing(); }}
              className={`px-1.5 py-0.5 rounded ${gameMode === 'pvp' ? 'bg-white text-emerald-900' : 'text-emerald-100 hover:text-white'}`}
            >
              2P
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              soundAudio.playTing();
            }}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="p-1 sm:p-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs transition-all active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-200" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetGame}
            title="Ulang Game dari Kotak 1"
            className="p-1 px-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Ulang</span>
          </button>
        </div>
      </div>

      {/* 2. DUAL-COLUMN SCREEN-FITTING MAIN ARENA ("MASUK LAYAR SEMUA") */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-start">
        {/* LEFT COLUMN: Formula Builder, Virtual Keypad, Used Combinations & Radar */}
        <div className="lg:col-span-5 space-y-2.5 order-2 lg:order-1">
          {/* Main Formula Input Card */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Calculator className="w-3 h-3 text-emerald-700" />
                <span>Ketik Bentuk Penjumlahan</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Posisi: <strong className="text-emerald-700 font-black">Kotak {currentPlayer === 1 ? pos1 : pos2}</strong>
              </span>
            </div>

            {/* Formula Input Field with Big Digits */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="text"
                  value={formulaInput}
                  onChange={e => setFormulaInput(e.target.value)}
                  disabled={isMoving || isWon}
                  placeholder="Contoh: 2+3 atau 1+4"
                  className={`w-full text-center text-2xl sm:text-3xl font-black rounded-xl py-2 px-3 border-2 outline-hidden tracking-wider transition-all shadow-inner font-mono ${
                    !parsedCurrent.valid
                      ? parsedCurrent.isRepeated
                        ? 'bg-rose-50 border-rose-400 text-rose-950 focus:border-rose-600 ring-2 ring-rose-200'
                        : 'bg-amber-50/70 border-amber-300 text-amber-950 focus:border-amber-500 ring-2 ring-amber-200'
                      : 'bg-emerald-50/70 border-emerald-400 text-emerald-950 focus:border-emerald-600 ring-2 ring-emerald-200'
                  }`}
                />
                {parsedCurrent.valid && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-2xs pointer-events-none">
                    = {parsedCurrent.steps} Langkah 🎯
                  </span>
                )}
              </div>

              {/* Realtime Live Validation & Error Alert */}
              {parsedCurrent.valid ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Rumus <strong>{parsedCurrent.rawFormatted}</strong> sah & baru! Pion siap maju {parsedCurrent.steps} langkah ke <strong>Kotak {Math.min(100, (currentPlayer === 1 ? pos1 : pos2) + parsedCurrent.steps)}</strong>.
                  </span>
                </div>
              ) : (
                <div
                  className={`flex items-start gap-1.5 p-2 rounded-xl border text-xs font-semibold ${
                    parsedCurrent.isRepeated
                      ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-2xs'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      parsedCurrent.isRepeated ? 'text-rose-600 animate-bounce' : 'text-amber-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="leading-tight">{parsedCurrent.error}</p>
                    {parsedCurrent.suggestions && parsedCurrent.suggestions.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1">
                        <span className="text-[10px] text-rose-700 font-bold">Gunakan rumus lain:</span>
                        {parsedCurrent.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormulaInput(sug);
                              if (soundEnabled) soundAudio.playTing();
                            }}
                            className="px-2 py-0.5 bg-white border border-rose-300 hover:bg-rose-100 text-rose-900 rounded font-black text-[10px] shadow-2xs transition-all active:scale-95"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Virtual Keypad (Touch, Kids & Smart TV Friendly) */}
            <div className="pt-1.5 border-t border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Papan Tombol Cepat:
                </span>
                <span className="text-[10px] text-slate-400">Tekan angka dan tanda +</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {['1', '2', '3', '4', '5', '+', '6', '7', '8', '9', '0', '⌫'].map(btn => (
                  <button
                    key={btn}
                    type="button"
                    disabled={isMoving || isWon}
                    onClick={() => {
                      if (btn === '⌫') {
                        setFormulaInput(prev => prev.slice(0, -1));
                      } else {
                        setFormulaInput(prev => prev + btn);
                      }
                      if (soundEnabled) soundAudio.playTing();
                    }}
                    className={`py-1.5 text-xs font-black rounded-lg border transition-all active:scale-95 ${
                      btn === '+'
                        ? 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs hover:bg-emerald-500'
                        : btn === '⌫'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Target Chips: Click target -> Auto-sets an unused formula */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Pilih Target Langkah (Otomatis Rumus Baru):
              </span>
              <div className="grid grid-cols-6 gap-1">
                {[2, 3, 4, 5, 6, 7].map(target => {
                  const unusedSugs = getUnusedFormulaSuggestions(target, usedFormulas);
                  const hasUnused = unusedSugs.length > 0;
                  return (
                    <button
                      key={target}
                      type="button"
                      disabled={isMoving || isWon || !hasUnused}
                      onClick={() => {
                        if (unusedSugs[0]) {
                          setFormulaInput(unusedSugs[0]);
                          if (soundEnabled) soundAudio.playTing();
                        }
                      }}
                      title={hasUnused ? `Set rumus ${unusedSugs[0]} (= ${target} langkah)` : `Semua kombinasi ${target} sudah terpakai!`}
                      className={`py-1 px-1 rounded-lg text-[10px] font-black border transition-all ${
                        hasUnused
                          ? 'bg-emerald-50/70 hover:bg-emerald-100 border-emerald-200 text-emerald-900 active:scale-95'
                          : 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 line-through cursor-not-allowed'
                      }`}
                    >
                      +{target} ({hasUnused ? unusedSugs[0] : 'Habis'})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Big Action Button: Maju Sekarang */}
            <button
              type="button"
              onClick={() => handleExecuteMove()}
              disabled={isMoving || isWon || !parsedCurrent.valid}
              className={`w-full py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isMoving || isWon || !parsedCurrent.valid
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:to-indigo-600 hover:shadow-lg'
              }`}
            >
              {isMoving ? (
                <>
                  <span className="animate-spin inline-block">⏳</span>
                  <span>Sedang Melangkah Hop...</span>
                </>
              ) : isWon ? (
                <>
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Juara Kotak 100!</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>
                    Maju {parsedCurrent.valid ? `${parsedCurrent.rawFormatted} = ${parsedCurrent.steps}` : '0'} Langkah! 🚀
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Used Formulas Box ("Dilarang Diulang di Permainan Ini") */}
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-black text-slate-800 flex items-center gap-1.5">
                <span>🚫 Rumus Terpakai Ronde Ini:</span>
                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-bold">
                  {usedFormulas.length} rumus
                </span>
              </span>
              {usedFormulas.length > 0 && (
                <span className="text-[10px] text-rose-600 font-bold">Dilarang diulang!</span>
              )}
            </div>

            {usedFormulas.length === 0 ? (
              <p className="text-[10px] text-slate-400 italic">
                Belum ada rumus yang terpakai. Coba racik rumus pertamamu!
              </p>
            ) : (
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
                {usedFormulas.map((formKey, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 px-1.5 py-0.5 rounded-md flex items-center gap-1"
                  >
                    <span>{formKey}</span>
                    <span className="text-[8px] text-rose-500 font-black">🚫</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Strategic Ladder Radar Tip */}
          {strategicTip && (
            <div
              onClick={() => {
                const sugs = getUnusedFormulaSuggestions(strategicTip.distance, usedFormulas);
                if (sugs.length > 0) {
                  setFormulaInput(sugs[0]);
                  if (soundEnabled) soundAudio.playTing();
                }
              }}
              className="cursor-pointer group p-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 rounded-xl transition-all shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-base group-hover:scale-110 transition-transform">🪜</span>
                <div>
                  <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
                    <span>Radar Tangga Terdekat!</span>
                    <span className="text-[9px] text-emerald-700 bg-emerald-200/80 px-1.5 py-0.2 rounded-md">
                      +{strategicTip.distance} Langkah
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-800">
                    Kotak {strategicTip.ladder.start} (naik ke {strategicTip.ladder.end}). Klik untuk pasang rumus!
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Mini Speech Strip from Mascot */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-2 flex items-center gap-2 text-xs">
            <span className="text-base shrink-0">🧕</span>
            <p className="text-[11px] text-slate-700 font-medium line-clamp-2 leading-tight flex-1">
              "{speechBubble}"
            </p>
            {speechEnabled && (
              <button
                onClick={() => speakAdvice(speechBubble)}
                className="p-1 rounded-lg bg-white border border-amber-200 text-xs shrink-0 hover:bg-amber-100 transition-colors"
                title="Dengarkan Suara"
              >
                🔊
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 100-TILE BOARD VIEW (SCALED TO FIT VIEWPORT HEIGHT) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 border border-slate-200 shadow-md w-full max-w-[min(calc(100vh-140px),580px)] aspect-square relative mx-auto">
            {/* Header info inside board card */}
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100 px-1 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Papan 100 Kotak SD & MI</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Layar Penuh · 100 Kotak
              </div>
            </div>

            {/* BOARD CONTAINER WITH SVG GRAPHIC LADDERS & SNAKES OVERLAY */}
            <div className="relative aspect-square w-full h-[calc(100%-24px)] select-none bg-amber-50/40 p-0.5 sm:p-1 rounded-xl border border-emerald-800/20 shadow-inner overflow-hidden">
              {/* SVG OVERLAY: Visual Ladders & Snakes */}
              <svg
                viewBox="0 0 1000 1000"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              >
                <defs>
                  {/* Linear gradient for wooden ladder */}
                  <linearGradient id="ladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>

                  {/* Gradient for snakes */}
                  <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>

                  {/* Filter glow */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Draw SVG Ladders */}
                {LADDERS.map(ladder => {
                  const startCoord = getTileCoords(ladder.start);
                  const endCoord = getTileCoords(ladder.end);
                  const x1 = startCoord.x * 10;
                  const y1 = startCoord.y * 10;
                  const x2 = endCoord.x * 10;
                  const y2 = endCoord.y * 10;

                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const nx = (-dy / len) * 7;
                  const ny = (dx / len) * 7;

                  const rungsCount = Math.max(3, Math.floor(len / 35));
                  const rungs: { rx1: number; ry1: number; rx2: number; ry2: number }[] = [];
                  for (let i = 1; i < rungsCount; i++) {
                    const t = i / rungsCount;
                    const mx = x1 + dx * t;
                    const my = y1 + dy * t;
                    rungs.push({
                      rx1: mx - nx,
                      ry1: my - ny,
                      rx2: mx + nx,
                      ry2: my + ny
                    });
                  }

                  const isHovered = hoveredTile === ladder.start || hoveredTile === ladder.end;

                  return (
                    <g key={`ladder-${ladder.start}`} filter="url(#glow)" opacity={isHovered ? 1 : 0.85}>
                      {/* Left Rail */}
                      <line
                        x1={x1 - nx}
                        y1={y1 - ny}
                        x2={x2 - nx}
                        y2={y2 - ny}
                        stroke={isHovered ? '#fbbf24' : '#047857'}
                        strokeWidth={isHovered ? 4.5 : 3}
                        strokeLinecap="round"
                      />
                      {/* Right Rail */}
                      <line
                        x1={x1 + nx}
                        y1={y1 + ny}
                        x2={x2 + nx}
                        y2={y2 + ny}
                        stroke={isHovered ? '#fbbf24' : '#047857'}
                        strokeWidth={isHovered ? 4.5 : 3}
                        strokeLinecap="round"
                      />
                      {/* Rungs */}
                      {rungs.map((rung, rIdx) => (
                        <line
                          key={rIdx}
                          x1={rung.rx1}
                          y1={rung.ry1}
                          x2={rung.rx2}
                          y2={rung.ry2}
                          stroke={isHovered ? '#f59e0b' : '#10b981'}
                          strokeWidth={2.5}
                          strokeLinecap="round"
                        />
                      ))}
                    </g>
                  );
                })}

                {/* Draw SVG Snakes */}
                {SNAKES.map(snake => {
                  const startCoord = getTileCoords(snake.start);
                  const endCoord = getTileCoords(snake.end);
                  const x1 = startCoord.x * 10;
                  const y1 = startCoord.y * 10;
                  const x2 = endCoord.x * 10;
                  const y2 = endCoord.y * 10;

                  const mx = (x1 + x2) / 2 + (snake.start % 2 === 0 ? 30 : -30);
                  const my = (y1 + y2) / 2 + (snake.end % 2 === 0 ? -25 : 25);

                  const isHovered = hoveredTile === snake.start || hoveredTile === snake.end;

                  return (
                    <g key={`snake-${snake.start}`} filter="url(#glow)" opacity={isHovered ? 1 : 0.8}>
                      {/* Snake Body Path */}
                      <path
                        d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                        fill="none"
                        stroke="url(#snakeGrad)"
                        strokeWidth={isHovered ? 7 : 5}
                        strokeLinecap="round"
                      />

                      {/* Snake Head at Start Tile */}
                      <circle cx={x1} cy={y1} r={isHovered ? 7 : 5.5} fill="#be123c" />
                      <circle cx={x1 - 1.5} cy={y1 - 1} r={1.2} fill="#ffffff" />
                      <circle cx={x1 + 1.5} cy={y1 - 1} r={1.2} fill="#ffffff" />

                      {/* Snake Tail at End Tile */}
                      <circle cx={x2} cy={y2} r={3} fill="#fb7185" />
                    </g>
                  );
                })}
              </svg>

              {/* 10x10 Grid Tiles */}
              <div className="grid grid-cols-10 gap-0.5 sm:gap-1 w-full h-full">
                {boardRows.map((row) =>
                  row.map(tileNum => {
                    const ladder = getLadder(tileNum);
                    const isLadderTop = LADDERS.some(l => l.end === tileNum);
                    const snake = getSnake(tileNum);
                    const special = getSpecialTile(tileNum);

                    const isP1 = pos1 === tileNum;
                    const isP2 = (gameMode !== 'solo') && pos2 === tileNum;

                    const isFinish = tileNum === 100;
                    const isStart = tileNum === 1;

                    // Tile color palette
                    let bgStyle = 'bg-white/95 border-slate-200/80';
                    if (isFinish) {
                      bgStyle = 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-amber-400 font-black shadow-xs';
                    } else if (isStart) {
                      bgStyle = 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300';
                    } else if (ladder) {
                      bgStyle = 'bg-emerald-50/90 border-emerald-300/80';
                    } else if (snake) {
                      bgStyle = 'bg-rose-50/90 border-rose-300/80';
                    } else if (special) {
                      bgStyle = 'bg-amber-50/90 border-amber-300/80';
                    } else if (tileNum % 2 === 0) {
                      bgStyle = 'bg-emerald-50/30 border-slate-200/60';
                    } else {
                      bgStyle = 'bg-sky-50/30 border-slate-200/60';
                    }

                    const isHighlight =
                      hoveredTile === tileNum ||
                      (hoveredTile && ladder && ladder.end === hoveredTile) ||
                      (hoveredTile && snake && snake.end === hoveredTile);

                    return (
                      <div
                        key={tileNum}
                        onMouseEnter={() => setHoveredTile(tileNum)}
                        onMouseLeave={() => setHoveredTile(null)}
                        onClick={() => {
                          if (ladder) {
                            setSpeechBubble(`Tangga Kotak ${ladder.start} ke ${ladder.end}: "${ladder.title}"`);
                            speakAdvice(`Tangga di kotak ${ladder.start} membawa naik ke kotak ${ladder.end}. ${ladder.moral}`);
                          } else if (snake) {
                            setSpeechBubble(`Ular Kotak ${snake.start} turun ke ${snake.end}: "${snake.title}"`);
                            speakAdvice(`Ular di kotak ${snake.start} meluncur turun ke kotak ${snake.end}. ${snake.moral}`);
                          } else if (special) {
                            setSpeechBubble(`Kotak Spesial ${special.tile}: ${special.title} (${special.desc})`);
                          }
                        }}
                        className={`relative rounded-xs sm:rounded-sm border flex flex-col justify-between p-0.5 sm:p-1 transition-all ${bgStyle} ${
                          isHighlight ? 'ring-2 ring-amber-400 z-20 scale-102' : ''
                        } ${
                          isP1 || isP2
                            ? 'ring-2 ring-emerald-500 z-30 shadow-md scale-105 bg-white'
                            : ''
                        }`}
                      >
                        {/* Top Tile Row: Number */}
                        <div className="w-full flex items-center justify-between leading-none">
                          <span
                            className={`text-[8px] sm:text-[10px] font-black ${
                              isFinish
                                ? 'text-amber-950 text-[10px] sm:text-xs font-black'
                                : ladder
                                ? 'text-emerald-800'
                                : snake
                                ? 'text-rose-800'
                                : special
                                ? 'text-amber-800'
                                : 'text-slate-600'
                            }`}
                          >
                            {tileNum}
                          </span>

                          {isFinish && <span className="text-[9px] sm:text-[11px]">🏆</span>}
                          {isStart && (
                            <span className="text-[6px] sm:text-[7px] font-black uppercase text-emerald-700">Mulai</span>
                          )}
                        </div>

                        {/* Middle Badge / Mini Icon */}
                        <div className="my-auto flex flex-col items-center justify-center text-center">
                          {ladder && (
                            <div className="flex items-center gap-0.5 leading-none">
                              <span className="text-[9px] sm:text-[11px]">🪜</span>
                              <span className="text-[6px] sm:text-[7px] font-black text-emerald-800 bg-emerald-100/90 px-0.5 rounded-xs">
                                ↗{ladder.end}
                              </span>
                            </div>
                          )}

                          {snake && (
                            <div className="flex items-center gap-0.5 leading-none">
                              <span className="text-[9px] sm:text-[11px]">🐍</span>
                              <span className="text-[6px] sm:text-[7px] font-black text-rose-800 bg-rose-100/90 px-0.5 rounded-xs">
                                ↘{snake.end}
                              </span>
                            </div>
                          )}

                          {special && !ladder && !snake && (
                            <span className="text-[8px] sm:text-[10px] leading-none" title={special.title}>
                              {special.icon}
                            </span>
                          )}

                          {isLadderTop && !ladder && (
                            <span className="text-[6px] sm:text-[7px] font-black text-emerald-600 bg-emerald-50 px-0.5 rounded-xs">
                              ⭐
                            </span>
                          )}
                        </div>

                        {/* Bottom: Pawns on this tile */}
                        <div className="w-full flex items-center justify-center gap-0.5 min-h-[12px] sm:min-h-[16px]">
                          {isP1 && (
                            <div
                              title={`Pemain 1: ${characterConfig?.name || 'Santri'}`}
                              className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[7px] sm:text-[10px] font-black shadow-md animate-bounce border border-white shrink-0 z-40"
                            >
                              {characterConfig ? '🧕' : '1'}
                            </div>
                          )}

                          {isP2 && (
                            <div
                              title={gameMode === 'ai' ? 'Fatimah AI' : 'Pemain 2'}
                              className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[7px] sm:text-[10px] font-black shadow-md animate-bounce border border-white shrink-0 z-40"
                            >
                              {gameMode === 'ai' ? '🤖' : '2'}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WINNER CELEBRATION MODAL */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl border-2 border-amber-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 text-emerald-950 flex items-center justify-center text-3xl sm:text-4xl shadow-lg animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Alhamdulillah! Juara Kotak 100!
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {winner === 1
                  ? characterConfig?.name || 'Pemain 1'
                  : gameMode === 'ai'
                  ? 'Fatimah AI'
                  : 'Pemain 2'}{' '}
                Menang!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hebat sekali! Kamu berhasil menaklukkan 100 kotak dengan berbagai kombinasi rumus penjumlahan matematika yang kreatif dan tak terulang!
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 flex items-center justify-center gap-3">
              <span className="text-3xl">⭐</span>
              <div className="text-left">
                <div className="font-black text-amber-950 text-sm sm:text-base">+20 Bintang Prestasi</div>
                <div className="text-[11px] text-amber-800">Telah ditambahkan ke Rapor Siswa!</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleResetGame}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Sekali Lagi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
