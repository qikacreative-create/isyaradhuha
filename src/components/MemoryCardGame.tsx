import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  Trophy,
  Brain,
  Star,
  Users,
  User,
  Bot,
  Eye,
  CheckCircle2,
  Clock,
  Footprints,
  Flame,
  Award,
  Zap,
  Dice5,
  Link as LinkIcon,
  Calculator,
  SpellCheck
} from 'lucide-react';

export type MemoryTheme = 'hijaiyah' | 'matematika' | 'english' | 'arab' | 'adab';

const FALLBACK_CHARACTER: CharacterConfig = {
  name: 'Fatimah',
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
  companionTitle: 'Santriwati Teladan'
};

interface MemoryItemDef {
  id: string;
  itemA: {
    label: string;
    sublabel?: string;
    icon: string;
    color: string;
    pronounceText?: string;
  };
  itemB: {
    label: string;
    sublabel?: string;
    icon: string;
    color: string;
    pronounceText?: string;
  };
}

interface MemoryCard {
  instanceId: string;
  pairId: string;
  type: 'A' | 'B';
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
  pronounceText?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const THEME_DATA: Record<MemoryTheme, { title: string; desc: string; icon: string; items: MemoryItemDef[] }> = {
  hijaiyah: {
    title: 'Huruf Hijaiyah Ceria',
    desc: 'Cocokkan huruf Arab Hijaiyah dengan sebutan Latinnya',
    icon: '🕌',
    items: [
      {
        id: 'alif',
        itemA: { label: 'ا', sublabel: 'Alif', icon: '✨', color: 'emerald', pronounceText: 'Alif' },
        itemB: { label: 'Alif', sublabel: 'Huruf Pertama', icon: '⭐', color: 'teal', pronounceText: 'Alif' }
      },
      {
        id: 'ba',
        itemA: { label: 'ب', sublabel: 'Baa', icon: '💧', color: 'blue', pronounceText: 'Baa' },
        itemB: { label: 'Baa', sublabel: 'Titik di Bawah', icon: '🔵', color: 'cyan', pronounceText: 'Baa' }
      },
      {
        id: 'ta',
        itemA: { label: 'ت', sublabel: 'Taa', icon: '🍎', color: 'rose', pronounceText: 'Taa' },
        itemB: { label: 'Taa', sublabel: 'Dua Titik Atas', icon: '🔴', color: 'pink', pronounceText: 'Taa' }
      },
      {
        id: 'tsa',
        itemA: { label: 'ث', sublabel: 'Tsaa', icon: '🌟', color: 'amber', pronounceText: 'Tsaa' },
        itemB: { label: 'Tsaa', sublabel: 'Tiga Titik Atas', icon: '💛', color: 'orange', pronounceText: 'Tsaa' }
      },
      {
        id: 'jim',
        itemA: { label: 'ج', sublabel: 'Jiim', icon: '🌿', color: 'lime', pronounceText: 'Jiim' },
        itemB: { label: 'Jiim', sublabel: 'Titik di Tengah', icon: '🟢', color: 'emerald', pronounceText: 'Jiim' }
      },
      {
        id: 'ha',
        itemA: { label: 'ح', sublabel: 'Haa Halus', icon: '🌸', color: 'violet', pronounceText: 'Haa' },
        itemB: { label: 'Haa', sublabel: 'Haa Bersih', icon: '🟣', color: 'purple', pronounceText: 'Haa' }
      },
      {
        id: 'kho',
        itemA: { label: 'خ', sublabel: 'Khoo', icon: '🍃', color: 'sky', pronounceText: 'Khoo' },
        itemB: { label: 'Khoo', sublabel: 'Titik di Atas', icon: '🔷', color: 'indigo', pronounceText: 'Khoo' }
      },
      {
        id: 'dal',
        itemA: { label: 'د', sublabel: 'Daal', icon: '🌙', color: 'indigo', pronounceText: 'Daal' },
        itemB: { label: 'Daal', sublabel: 'Daal Ringan', icon: '🌌', color: 'blue', pronounceText: 'Daal' }
      }
    ]
  },
  matematika: {
    title: 'Matematika Pintar Kelas 2',
    desc: 'Cocokkan soal penjumlahan / pengurangan dengan hasil jawabannya',
    icon: '🔢',
    items: [
      {
        id: 'm1',
        itemA: { label: '7 + 8', sublabel: 'Penjumlahan', icon: '➕', color: 'emerald', pronounceText: 'Tujuh tambah delapan sama dengan lima belas' },
        itemB: { label: '15', sublabel: 'Jawaban Benar', icon: '🎯', color: 'teal', pronounceText: 'Lima belas' }
      },
      {
        id: 'm2',
        itemA: { label: '20 - 6', sublabel: 'Pengurangan', icon: '➖', color: 'blue', pronounceText: 'Dua puluh kurang enam sama dengan empat belas' },
        itemB: { label: '14', sublabel: 'Jawaban Benar', icon: '🎯', color: 'indigo', pronounceText: 'Empat belas' }
      },
      {
        id: 'm3',
        itemA: { label: '9 + 9', sublabel: 'Angka Kembar', icon: '➕', color: 'amber', pronounceText: 'Sembilan tambah sembilan sama dengan delapan belas' },
        itemB: { label: '18', sublabel: 'Jawaban Benar', icon: '🎯', color: 'orange', pronounceText: 'Delapan belas' }
      },
      {
        id: 'm4',
        itemA: { label: '25 - 5', sublabel: 'Puluhan Genap', icon: '➖', color: 'violet', pronounceText: 'Dua puluh lima kurang lima sama dengan dua puluh' },
        itemB: { label: '20', sublabel: 'Jawaban Benar', icon: '🎯', color: 'purple', pronounceText: 'Dua puluh' }
      },
      {
        id: 'm5',
        itemA: { label: '6 + 7', sublabel: 'Penjumlahan', icon: '➕', color: 'rose', pronounceText: 'Enam tambah tujuh sama dengan tiga belas' },
        itemB: { label: '13', sublabel: 'Jawaban Benar', icon: '🎯', color: 'pink', pronounceText: 'Tiga belas' }
      },
      {
        id: 'm6',
        itemA: { label: '30 - 10', sublabel: 'Kurang Sepuluh', icon: '➖', color: 'teal', pronounceText: 'Tiga puluh kurang sepuluh sama dengan dua puluh' },
        itemB: { label: '20', sublabel: 'Puluhan', icon: '🎯', color: 'emerald', pronounceText: 'Dua puluh' }
      },
      {
        id: 'm7',
        itemA: { label: '4 × 3', sublabel: 'Perkalian Tiga', icon: '✖️', color: 'sky', pronounceText: 'Empat kali tiga sama dengan dua belas' },
        itemB: { label: '12', sublabel: 'Jawaban Benar', icon: '🎯', color: 'blue', pronounceText: 'Dua belas' }
      },
      {
        id: 'm8',
        itemA: { label: '5 + 15', sublabel: 'Jumlah Bersahabat', icon: '➕', color: 'lime', pronounceText: 'Lima tambah lima belas sama dengan dua puluh' },
        itemB: { label: '20', sublabel: 'Hasil Akhir', icon: '🎯', color: 'emerald', pronounceText: 'Dua puluh' }
      }
    ]
  },
  english: {
    title: 'Dunia Hewan (Indo ↔ English)',
    desc: 'Pasangkan nama hewan Bahasa Indonesia dengan kosakata Bahasa Inggris',
    icon: '🦁',
    items: [
      {
        id: 'cat',
        itemA: { label: 'Kucing', sublabel: 'Mengeong', icon: '🐱', color: 'amber', pronounceText: 'Kucing' },
        itemB: { label: 'Cat', sublabel: 'Meow', icon: '🐾', color: 'orange', pronounceText: 'Cat' }
      },
      {
        id: 'elephant',
        itemA: { label: 'Gajah', sublabel: 'Belalai Panjang', icon: '🐘', color: 'blue', pronounceText: 'Gajah' },
        itemB: { label: 'Elephant', sublabel: 'Big Animal', icon: '🌿', color: 'sky', pronounceText: 'Elephant' }
      },
      {
        id: 'lion',
        itemA: { label: 'Singa', sublabel: 'Raja Hutan', icon: '🦁', color: 'rose', pronounceText: 'Singa' },
        itemB: { label: 'Lion', sublabel: 'King of Jungle', icon: '👑', color: 'amber', pronounceText: 'Lion' }
      },
      {
        id: 'rabbit',
        itemA: { label: 'Kelinci', sublabel: 'Suka Wortel', icon: '🐰', color: 'emerald', pronounceText: 'Kelinci' },
        itemB: { label: 'Rabbit', sublabel: 'Hop hop', icon: '🥕', color: 'teal', pronounceText: 'Rabbit' }
      },
      {
        id: 'bird',
        itemA: { label: 'Burung', sublabel: 'Bisa Terbang', icon: '🐦', color: 'cyan', pronounceText: 'Burung' },
        itemB: { label: 'Bird', sublabel: 'Fly high', icon: '🪶', color: 'blue', pronounceText: 'Bird' }
      },
      {
        id: 'fish',
        itemA: { label: 'Ikan', sublabel: 'Berenang di Air', icon: '🐟', color: 'teal', pronounceText: 'Ikan' },
        itemB: { label: 'Fish', sublabel: 'Swimming', icon: '🌊', color: 'emerald', pronounceText: 'Fish' }
      },
      {
        id: 'butterfly',
        itemA: { label: 'Kupu-kupu', sublabel: 'Sayap Indah', icon: '🦋', color: 'violet', pronounceText: 'Kupu-kupu' },
        itemB: { label: 'Butterfly', sublabel: 'Beautiful Wings', icon: '🌸', color: 'purple', pronounceText: 'Butterfly' }
      },
      {
        id: 'bee',
        itemA: { label: 'Lebah', sublabel: 'Penghasil Madu', icon: '🐝', color: 'amber', pronounceText: 'Lebah' },
        itemB: { label: 'Bee', sublabel: 'Makes Honey', icon: '🍯', color: 'yellow', pronounceText: 'Bee' }
      }
    ]
  },
  arab: {
    title: 'Kosakata Arab (Mufrodat Ceria)',
    desc: 'Pasangkan gambar kosakata benda dengan tulisan bahasa Arabnya',
    icon: '🍎',
    items: [
      {
        id: 'apel',
        itemA: { label: 'Apel 🍎', sublabel: 'Buah Manis', icon: '🍎', color: 'rose', pronounceText: 'Tuffahah artinya Apel' },
        itemB: { label: 'تُفَّاحَةٌ', sublabel: 'Tuffaahatun', icon: '🌳', color: 'pink', pronounceText: 'Tuffaahatun' }
      },
      {
        id: 'buku',
        itemA: { label: 'Buku 📖', sublabel: 'Sumber Ilmu', icon: '📖', color: 'blue', pronounceText: 'Kitaabun artinya Buku' },
        itemB: { label: 'كِتَابٌ', sublabel: 'Kitaabun', icon: '📚', color: 'indigo', pronounceText: 'Kitaabun' }
      },
      {
        id: 'pena',
        itemA: { label: 'Pena ✏️', sublabel: 'Alat Tulis', icon: '✏️', color: 'amber', pronounceText: 'Qolamun artinya Pena' },
        itemB: { label: 'قَلَمٌ', sublabel: 'Qolamun', icon: '📝', color: 'yellow', pronounceText: 'Qolamun' }
      },
      {
        id: 'masjid',
        itemA: { label: 'Masjid 🕌', sublabel: 'Tempat Sholat', icon: '🕌', color: 'emerald', pronounceText: 'Masjidun artinya Masjid' },
        itemB: { label: 'مَسْجِدٌ', sublabel: 'Masjidun', icon: '🌙', color: 'teal', pronounceText: 'Masjidun' }
      },
      {
        id: 'rumah',
        itemA: { label: 'Rumah 🏠', sublabel: 'Tempat Tinggal', icon: '🏠', color: 'violet', pronounceText: 'Baitun artinya Rumah' },
        itemB: { label: 'بَيْتٌ', sublabel: 'Baitun', icon: '🏡', color: 'purple', pronounceText: 'Baitun' }
      },
      {
        id: 'bintang',
        itemA: { label: 'Bintang ⭐', sublabel: 'Di Langit', icon: '⭐', color: 'amber', pronounceText: 'Najmun artinya Bintang' },
        itemB: { label: 'نَجْمٌ', sublabel: 'Najmun', icon: '🌌', color: 'orange', pronounceText: 'Najmun' }
      },
      {
        id: 'bunga',
        itemA: { label: 'Bunga 🌸', sublabel: 'Harum & Cantik', icon: '🌸', color: 'pink', pronounceText: 'Zahrotun artinya Bunga' },
        itemB: { label: 'زَهْرَةٌ', sublabel: 'Zahrotun', icon: '🌿', color: 'rose', pronounceText: 'Zahrotun' }
      },
      {
        id: 'pintu',
        itemA: { label: 'Pintu 🚪', sublabel: 'Jalan Masuk', icon: '🚪', color: 'teal', pronounceText: 'Baabun artinya Pintu' },
        itemB: { label: 'بَابٌ', sublabel: 'Baabun', icon: '🔑', color: 'emerald', pronounceText: 'Baabun' }
      }
    ]
  },
  adab: {
    title: 'Adab Santri & Kebaikan',
    desc: 'Pasangkan amalan sholihah santri dengan hikmah kebaikannya',
    icon: '🧕',
    items: [
      {
        id: 'senyum',
        itemA: { label: 'Senyum Ramah', sublabel: 'Wajah Ceria', icon: '😊', color: 'amber', pronounceText: 'Tersenyum adalah sedekah termudah' },
        itemB: { label: 'Sedekah Hati', sublabel: 'Dapat Pahala', icon: '💛', color: 'orange', pronounceText: 'Pahala sedekah tersenyum' }
      },
      {
        id: 'bismillah',
        itemA: { label: 'Ucap Bismillah', sublabel: 'Sebelum Berbuat', icon: '🤲', color: 'emerald', pronounceText: 'Bismillah awal setiap keberkahan' },
        itemB: { label: 'Awal Berkah', sublabel: 'Dijaga Allah', icon: '✨', color: 'teal', pronounceText: 'Awal keberkahan hidup' }
      },
      {
        id: 'hormat_guru',
        itemA: { label: 'Hormati Guru', sublabel: 'Mendengarkan Baik', icon: '👩‍🏫', color: 'blue', pronounceText: 'Menghormati guru adalah kunci pemahaman ilmu' },
        itemB: { label: 'Kunci Ilmu', sublabel: 'Ilmu Barokah', icon: '🔑', color: 'indigo', pronounceText: 'Kunci ilmu yang barokah' }
      },
      {
        id: 'bersih',
        itemA: { label: 'Jaga Kebersihan', sublabel: 'Rapi & Wangi', icon: '🧼', color: 'cyan', pronounceText: 'Kebersihan adalah sebagian dari iman' },
        itemB: { label: 'Sebagian Iman', sublabel: 'Disukai Allah', icon: '💧', color: 'teal', pronounceText: 'Kebersihan sebagian dari iman' }
      },
      {
        id: 'bantu_ibu',
        itemA: { label: 'Bantu Ibu & Ayah', sublabel: 'Anak Berbakti', icon: '💖', color: 'rose', pronounceText: 'Berbakti kepada orang tua adalah jalan ke surga' },
        itemB: { label: 'Pintu Surga', sublabel: 'Ridho Ilahi', icon: '🏡', color: 'pink', pronounceText: 'Pintu surga terindah' }
      },
      {
        id: 'jujur',
        itemA: { label: 'Berkata Jujur', sublabel: 'Tidak Bohong', icon: '🌟', color: 'violet', pronounceText: 'Jujur membawa ketenangan hati' },
        itemB: { label: 'Hati Tenang', sublabel: 'Dicintai Teman', icon: '🕊️', color: 'purple', pronounceText: 'Hati tenang dan dipercaya' }
      },
      {
        id: 'salam',
        itemA: { label: 'Ucapkan Salam', sublabel: 'Assalamu alaikum', icon: '🤝', color: 'emerald', pronounceText: 'Menyebarkan salam menebarkan kasih sayang' },
        itemB: { label: 'Menebar Damai', sublabel: 'Saling Mendoakan', icon: '🌿', color: 'lime', pronounceText: 'Menebarkan perdamaian sesama muslim' }
      },
      {
        id: 'sabar',
        itemA: { label: 'Sabar & Ramah', sublabel: 'Tidak Marah-marah', icon: '🌸', color: 'sky', pronounceText: 'Sabar itu indah dan pahalanya tanpa batas' },
        itemB: { label: 'Pahala Indah', sublabel: 'Jiwa Tangguh', icon: '💎', color: 'blue', pronounceText: 'Pahala indah dan mulia' }
      }
    ]
  }
};

interface MemoryCardGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar?: (amount: number, reason: string) => void;
  onSwitchToGame?: (gameTab: string) => void;
}

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame
}) => {
  const [selectedTheme, setSelectedTheme] = useState<MemoryTheme>('hijaiyah');
  const [difficultyPairs, setDifficultyPairs] = useState<number>(6); // 4, 6, 8
  const [gameMode, setGameMode] = useState<'solo' | 'ai' | 'pass'>('solo');

  // Cards state
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessingMatch, setIsProcessingMatch] = useState<boolean>(false);

  // Turn & stats
  const [turn, setTurn] = useState<'p1' | 'p2' | 'ai'>('p1');
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [turnsCount, setTurnsCount] = useState<number>(0);
  const [matchStreak, setMatchStreak] = useState<number>(0);
  const [hasUsedHint, setHasUsedHint] = useState<boolean>(false);
  const [isHintActive, setIsHintActive] = useState<boolean>(false);

  // Game over & timing
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [speechBubble, setSpeechBubble] = useState<string>('Assalamu’alaikum! Yuk temukan pasangan kartu yang cocok! ✨');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const aiMemoryRef = useRef<Map<string, number>>(new Map()); // pairId -> card index seen

  // Initialize cards
  const initializeGame = () => {
    const themeDef = THEME_DATA[selectedTheme];
    // pick items according to difficultyPairs
    const pickedItems = themeDef.items.slice(0, difficultyPairs);

    const generatedCards: MemoryCard[] = [];
    pickedItems.forEach((item) => {
      generatedCards.push({
        instanceId: `${item.id}-A`,
        pairId: item.id,
        type: 'A',
        label: item.itemA.label,
        sublabel: item.itemA.sublabel,
        icon: item.itemA.icon,
        color: item.itemA.color,
        pronounceText: item.itemA.pronounceText,
        isFlipped: false,
        isMatched: false
      });
      generatedCards.push({
        instanceId: `${item.id}-B`,
        pairId: item.id,
        type: 'B',
        label: item.itemB.label,
        sublabel: item.itemB.sublabel,
        icon: item.itemB.icon,
        color: item.itemB.color,
        pronounceText: item.itemB.pronounceText,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards with Fisher-Yates
    for (let i = generatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
    }

    setCards(generatedCards);
    setFlippedIndices([]);
    setIsProcessingMatch(false);
    setP1Score(0);
    setP2Score(0);
    setTurnsCount(0);
    setMatchStreak(0);
    setHasUsedHint(false);
    setIsHintActive(false);
    setGameCompleted(false);
    setElapsedSeconds(0);
    setTurn('p1');
    setIsTimerRunning(true);
    aiMemoryRef.current.clear();

    const charName = characterConfig?.name || 'Fatimah';
    if (gameMode === 'ai') {
      setSpeechBubble(`Bismillah! Giliranmu dulu ya, mari kita bermain memori pintar bareng ${charName}! 🧕`);
    } else if (gameMode === 'pass') {
      setSpeechBubble('Giliran Pemain 1! Sentuh 2 kartu untuk membuka pasangan.');
    } else {
      setSpeechBubble('Sentuh kartu untuk membuka dan temukan pasangannya! Bismillah! ✨');
    }
  };

  // Run on mount or theme/difficulty changes
  useEffect(() => {
    initializeGame();
  }, [selectedTheme, difficultyPairs, gameMode]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && !gameCompleted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, gameCompleted]);

  // Handle card click by human
  const handleCardClick = (index: number) => {
    if (isProcessingMatch || isHintActive || gameCompleted) return;
    if (cards[index].isMatched || cards[index].isFlipped) return;
    if (flippedIndices.length >= 2) return;
    if (gameMode === 'ai' && turn === 'ai') return; // AI's turn

    soundAudio.playCardFlip();

    // Remember in AI memory that human revealed this card
    const card = cards[index];
    aiMemoryRef.current.set(card.instanceId, index);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Update card isFlipped
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      checkMatch(newFlipped);
    }
  };

  // Check matching logic
  const checkMatch = (indices: number[]) => {
    setIsProcessingMatch(true);
    setTurnsCount((prev) => prev + 1);

    const [firstIdx, secondIdx] = indices;
    const card1 = cards[firstIdx];
    const card2 = cards[secondIdx];

    const isMatch = card1.pairId === card2.pairId && card1.instanceId !== card2.instanceId;

    if (isMatch) {
      // MATCHED!
      soundAudio.playCardMatch();
      setMatchStreak((prev) => prev + 1);

      // Pronounce with Indonesian TTS
      const textToSpeak = card1.pronounceText || card2.pronounceText || card1.label;
      if (textToSpeak) {
        soundAudio.speakIndonesian(textToSpeak, 0.95);
      }

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, idx) =>
            idx === firstIdx || idx === secondIdx
              ? { ...c, isMatched: true, isFlipped: true }
              : c
          )
        );

        // Update score
        if (turn === 'p1') {
          setP1Score((s) => s + 1);
          setSpeechBubble(`Hebat! Kartu cocok: "${card1.label}" & "${card2.label}"! 🎉`);
        } else if (turn === 'p2') {
          setP2Score((s) => s + 1);
          setSpeechBubble(`Pemain 2 keren! Pasangan ditemukan! 🎉`);
        } else if (turn === 'ai') {
          setP2Score((s) => s + 1);
          setSpeechBubble(`Wah, ${characterConfig?.name || 'Fatimah'} berhasil mencocokkan kartu! 👏`);
        }

        setFlippedIndices([]);
        setIsProcessingMatch(false);

        // Check if all matched
        const matchedCount = cards.filter((c) => c.isMatched).length + 2;
        if (matchedCount >= cards.length) {
          handleVictory();
        } else {
          // If in AI or Pass mode: player gets an EXTRA turn when they match!
          if (gameMode === 'ai' && turn === 'ai') {
            setTimeout(() => triggerAiTurn(), 1200);
          }
        }
      }, 600);
    } else {
      // NOT MATCHED
      soundAudio.playCardMismatch();
      setMatchStreak(0);

      setTimeout(() => {
        // Flip back
        setCards((prev) =>
          prev.map((c, idx) =>
            idx === firstIdx || idx === secondIdx ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedIndices([]);
        setIsProcessingMatch(false);

        // Switch turn if multiplayer or AI
        if (gameMode === 'pass') {
          setTurn((t) => (t === 'p1' ? 'p2' : 'p1'));
          setSpeechBubble(turn === 'p1' ? 'Giliran Pemain 2!' : 'Giliran Pemain 1!');
        } else if (gameMode === 'ai') {
          if (turn === 'p1') {
            setTurn('ai');
            setSpeechBubble(`Giliran ${characterConfig?.name || 'Fatimah'} si santriwati cerdas berpikir... 🤔`);
            setTimeout(() => triggerAiTurn(), 1000);
          } else {
            setTurn('p1');
            setSpeechBubble('Giliranmu lagi! Ayo fokus! 💪');
          }
        }
      }, 1200);
    }
  };

  // AI Turn simulation
  const triggerAiTurn = () => {
    if (gameCompleted) return;

    // AI searches its memory or picks random cards
    const unMatchedIndices = cards
      .map((c, i) => (c.isMatched ? -1 : i))
      .filter((i) => i !== -1);

    if (unMatchedIndices.length < 2) return;

    // Check if AI knows a matching pair in memory
    let chosenFirst = -1;
    let chosenSecond = -1;

    // Group remembered cards by pairId
    const memoryGroups = new Map<string, number[]>();
    aiMemoryRef.current.forEach((idx, instanceId) => {
      const card = cards[idx];
      if (card && !card.isMatched) {
        const list = memoryGroups.get(card.pairId) || [];
        if (!list.includes(idx)) list.push(idx);
        memoryGroups.set(card.pairId, list);
      }
    });

    // Check if any pair has 2 known cards
    for (const [, list] of memoryGroups.entries()) {
      if (list.length >= 2) {
        chosenFirst = list[0];
        chosenSecond = list[1];
        break;
      }
    }

    // If not known, pick one randomly, then check if match is remembered
    if (chosenFirst === -1) {
      const randIdx1 = Math.floor(Math.random() * unMatchedIndices.length);
      chosenFirst = unMatchedIndices[randIdx1];

      const card1 = cards[chosenFirst];
      aiMemoryRef.current.set(card1.instanceId, chosenFirst);

      // Check if pair of card1 is in memory
      let foundPairInMem = -1;
      aiMemoryRef.current.forEach((idx) => {
        if (idx !== chosenFirst && cards[idx].pairId === card1.pairId && !cards[idx].isMatched) {
          foundPairInMem = idx;
        }
      });

      // AI intelligence rate: 70% chance to remember if it was seen before
      if (foundPairInMem !== -1 && Math.random() < 0.75) {
        chosenSecond = foundPairInMem;
      } else {
        const remaining = unMatchedIndices.filter((i) => i !== chosenFirst);
        const randIdx2 = Math.floor(Math.random() * remaining.length);
        chosenSecond = remaining[randIdx2];
      }
    }

    // Step 1: AI opens first card
    soundAudio.playCardFlip();
    setCards((prev) =>
      prev.map((c, i) => (i === chosenFirst ? { ...c, isFlipped: true } : c))
    );
    setFlippedIndices([chosenFirst]);

    // Step 2: AI opens second card after 700ms
    setTimeout(() => {
      soundAudio.playCardFlip();
      const card2 = cards[chosenSecond];
      aiMemoryRef.current.set(card2.instanceId, chosenSecond);

      setCards((prev) =>
        prev.map((c, i) => (i === chosenSecond ? { ...c, isFlipped: true } : c))
      );
      setFlippedIndices([chosenFirst, chosenSecond]);

      checkMatch([chosenFirst, chosenSecond]);
    }, 850);
  };

  // Peek Hint (Show all unmatched cards for 2.5 seconds)
  const handlePeekHint = () => {
    if (hasUsedHint || isHintActive || isProcessingMatch || gameCompleted) return;

    setHasUsedHint(true);
    setIsHintActive(true);
    soundAudio.playTing();
    setSpeechBubble('Mata Elang Ajaib aktif! Ingat posisi kartu selama 2.5 detik! 👁️✨');

    // Temporarily flip unmatched cards
    setCards((prev) =>
      prev.map((c) => (!c.isMatched ? { ...c, isFlipped: true } : c))
    );

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          !c.isMatched && !flippedIndices.includes(prev.indexOf(c))
            ? { ...c, isFlipped: false }
            : c
        )
      );
      setIsHintActive(false);
      setSpeechBubble('Waktu intip selesai! Ayo cocokkan kartunya! 🚀');
    }, 2500);
  };

  // Victory celebration
  const handleVictory = () => {
    setGameCompleted(true);
    setIsTimerRunning(false);
    soundAudio.playFanfare();

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Stars calculation
    let earnedStars = 3;
    if (turnsCount > difficultyPairs * 2.2) earnedStars = 2;
    if (turnsCount > difficultyPairs * 3) earnedStars = 1;

    if (onEarnStar) {
      onEarnStar(
        earnedStars,
        `Menyelesaikan Kartu Memori ${THEME_DATA[selectedTheme].title} (${difficultyPairs} pasang)`
      );
    }

    if (gameMode === 'solo') {
      setSpeechBubble(
        `Alhamdulillah! Kamu berhasil menyelesaikan semua kartu dalam ${turnsCount} langkah & ${elapsedSeconds} detik! Mendapat ${earnedStars} Bintang Emas! ⭐`
      );
    } else if (gameMode === 'ai') {
      const charName = characterConfig?.name || 'Fatimah';
      if (p1Score > p2Score) {
        setSpeechBubble(`Maa Syaa Allah! Kamu menang melawan ${charName} dengan skor ${p1Score} vs ${p2Score}! 🎉`);
      } else if (p1Score === p2Score) {
        setSpeechBubble(`Permainan seri yang luar biasa! Kalian berdua sama-sama pintar (${p1Score} - ${p2Score})! 🤝`);
      } else {
        setSpeechBubble(`${charName} menang (${p2Score} vs ${p1Score}). Tetap semangat, yuk coba tanding lagi! 💕`);
      }
    } else {
      setSpeechBubble(
        p1Score > p2Score
          ? `Selamat Pemain 1 Juara (${p1Score} vs ${p2Score})! 🏆`
          : p2Score > p1Score
          ? `Selamat Pemain 2 Juara (${p2Score} vs ${p1Score})! 🏆`
          : `Hasil Seri! (${p1Score} vs ${p2Score}) Permainan hebat! 🤝`
      );
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Color mappings for card styling
  const getColorStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-500 text-white',
          glow: 'shadow-emerald-200'
        };
      case 'teal':
        return {
          bg: 'bg-teal-50 border-teal-300 text-teal-900',
          badge: 'bg-teal-500 text-white',
          glow: 'shadow-teal-200'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50 border-blue-300 text-blue-900',
          badge: 'bg-blue-500 text-white',
          glow: 'shadow-blue-200'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50 border-sky-300 text-sky-900',
          badge: 'bg-sky-500 text-white',
          glow: 'shadow-sky-200'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50 border-indigo-300 text-indigo-900',
          badge: 'bg-indigo-500 text-white',
          glow: 'shadow-indigo-200'
        };
      case 'violet':
      case 'purple':
        return {
          bg: 'bg-purple-50 border-purple-300 text-purple-900',
          badge: 'bg-purple-500 text-white',
          glow: 'shadow-purple-200'
        };
      case 'rose':
      case 'pink':
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-900',
          badge: 'bg-rose-500 text-white',
          glow: 'shadow-rose-200'
        };
      case 'amber':
      case 'orange':
      case 'yellow':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-500 text-white',
          glow: 'shadow-amber-200'
        };
      case 'lime':
        return {
          bg: 'bg-lime-50 border-lime-300 text-lime-900',
          badge: 'bg-lime-500 text-white',
          glow: 'shadow-lime-200'
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-300 text-slate-900',
          badge: 'bg-slate-500 text-white',
          glow: 'shadow-slate-200'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-12 select-none">
      {/* Game Selector Tab Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-700 rounded-2xl p-3 text-white shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
            🎮
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black tracking-wide">Arena Game Edukasi Santri</h2>
            <p className="text-[11px] text-emerald-100">Bermain sambil melatih daya ingat & asah logika</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl backdrop-blur-xs">
          <button
            onClick={() => onSwitchToGame?.('ular-tangga')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>Ular Tangga</span>
          </button>
          <button
            onClick={() => onSwitchToGame?.('sambung-hijaiyah')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <LinkIcon className="w-3.5 h-3.5 text-teal-300" />
            <span>Sambung Hijaiyah</span>
          </button>
          <button
            onClick={() => onSwitchToGame?.('game-mengeja')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <SpellCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Mengeja</span>
          </button>
          <button
            onClick={() => onSwitchToGame?.('game-perkalian')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-orange-300" />
            <span>Game Perkalian</span>
          </button>
          <button
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-white text-emerald-900 shadow-xs"
          >
            <Brain className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kartu Memori</span>
          </button>
          <button
            onClick={() => onSwitchToGame?.('roda-putar')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Roda Putar</span>
          </button>
          <button
            onClick={() => onSwitchToGame?.('kuis')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kuis Cerdas</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Game Control, Themes, & Scoreboard (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Mascot Speech Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 sm:p-4 shadow-sm flex items-start gap-3">
            <div className="shrink-0 relative">
              <CharacterAvatar config={characterConfig || FALLBACK_CHARACTER} size="md" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                🧕
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-amber-900">
                  {characterConfig?.name || 'Fatimah'} si Santriwati
                </span>
                <button
                  onClick={() => soundAudio.speakIndonesian(speechBubble)}
                  className="p-1 rounded-full text-amber-700 hover:bg-amber-100"
                  title="Dengarkan Suara"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed bg-white/80 p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                "{speechBubble}"
              </p>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Pilih Tema Pembelajaran</span>
              </h3>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                5 Pilihan
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {(Object.keys(THEME_DATA) as MemoryTheme[]).map((themeKey) => {
                const item = THEME_DATA[themeKey];
                const isSelected = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      if (selectedTheme !== themeKey) {
                        setSelectedTheme(themeKey);
                        soundAudio.playTing();
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 shadow-2xs ring-1 ring-emerald-500/20'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Modes & Difficulty */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Mode Pemain</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    setGameMode('solo');
                    soundAudio.playTing();
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    gameMode === 'solo'
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Solo</span>
                </button>
                <button
                  onClick={() => {
                    setGameMode('ai');
                    soundAudio.playTing();
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    gameMode === 'ai'
                      ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>Vs Fatimah</span>
                </button>
                <button
                  onClick={() => {
                    setGameMode('pass');
                    soundAudio.playTing();
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    gameMode === 'pass'
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>2 Pemain</span>
                </button>
              </div>
            </div>

            {/* Difficulty (Number of Pairs) */}
            <div>
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Jumlah Kartu</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { pairs: 4, label: 'Santai', cards: '8 Kartu' },
                  { pairs: 6, label: 'Seru', cards: '12 Kartu' },
                  { pairs: 8, label: 'Juara', cards: '16 Kartu' }
                ].map((d) => (
                  <button
                    key={d.pairs}
                    onClick={() => {
                      setDifficultyPairs(d.pairs);
                      soundAudio.playTing();
                    }}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      difficultyPairs === d.pairs
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className="text-[10px] opacity-90">{d.cards}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hint & Reset Buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={handlePeekHint}
                disabled={hasUsedHint || isHintActive || gameCompleted}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  hasUsedHint
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-2xs'
                }`}
                title="Buka sekilas semua kartu selama 2.5 detik"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{hasUsedHint ? 'Intip Terpakai' : 'Intip Kartu (1x)'}</span>
              </button>

              <button
                onClick={() => {
                  soundAudio.playTing();
                  initializeGame();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all"
                title="Mulai Ulang Permainan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Acak Ulang</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Game Board & Cards Grid (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-3 order-1 lg:order-2">
          {/* Header Stats Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{THEME_DATA[selectedTheme].icon}</span>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {THEME_DATA[selectedTheme].title}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {cards.filter((c) => c.isMatched).length / 2} dari {difficultyPairs} pasang cocok
                </p>
              </div>
            </div>

            {/* Counters */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              {/* Turns count */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold">
                <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                <span>{turnsCount} Percobaan</span>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>

              {/* Score pill depending on mode */}
              {gameMode === 'solo' ? (
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200 text-amber-800 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{p1Score} Pasang</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
                  <span className={`${turn === 'p1' ? 'text-emerald-700 underline' : 'text-slate-600'}`}>
                    P1: {p1Score}
                  </span>
                  <span>vs</span>
                  <span className={`${turn !== 'p1' ? 'text-indigo-700 underline' : 'text-slate-600'}`}>
                    {gameMode === 'ai' ? characterConfig?.name || 'Fatimah' : 'P2'}: {p2Score}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Turn Indicator for Multiplayer / AI */}
          {gameMode !== 'solo' && (
            <div
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border transition-all ${
                turn === 'p1'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-indigo-50 text-indigo-900 border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                <span>
                  Giliran Saat Ini:{' '}
                  {turn === 'p1'
                    ? 'Pemain 1'
                    : gameMode === 'ai'
                    ? `${characterConfig?.name || 'Fatimah'} (Santriwati AI)`
                    : 'Pemain 2'}
                </span>
              </div>
              <span className="text-[11px] opacity-80">
                Jika cocok, dapat giliran ekstra! 🎯
              </span>
            </div>
          )}

          {/* Cards Grid */}
          <div
            className={`grid gap-2 sm:gap-3 p-2 sm:p-4 bg-gradient-to-br from-slate-100/90 to-amber-50/50 rounded-2xl border border-slate-200 shadow-inner ${
              difficultyPairs === 4
                ? 'grid-cols-2 sm:grid-cols-4'
                : difficultyPairs === 6
                ? 'grid-cols-3 sm:grid-cols-4'
                : 'grid-cols-3 sm:grid-cols-4'
            }`}
          >
            {cards.map((card, idx) => {
              const styles = getColorStyles(card.color);
              const isCardShown = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.instanceId}
                  onClick={() => handleCardClick(idx)}
                  className={`relative aspect-[3/4] sm:aspect-square rounded-2xl cursor-pointer transition-all duration-300 transform select-none ${
                    card.isMatched
                      ? 'opacity-85 scale-95 ring-2 ring-emerald-500 shadow-xs'
                      : 'hover:scale-[1.02] active:scale-95 shadow-sm'
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  {/* Card Inner with 3D Flip */}
                  <div
                    className={`w-full h-full duration-500 rounded-2xl transition-transform ${
                      isCardShown ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isCardShown ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* BACK OF CARD (Cover) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 border-2 border-white/60 shadow-md flex flex-col items-center justify-center p-2 text-white"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg sm:text-xl shadow-inner mb-1">
                        ⭐
                      </div>
                      <span className="font-arabic text-sm sm:text-base font-bold text-amber-200">
                        اقرأ
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold opacity-90 tracking-wider">
                        BINTANG
                      </span>
                    </div>

                    {/* FRONT OF CARD (Revealed Content) */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-2xl border-2 shadow-md flex flex-col items-center justify-between p-2 sm:p-3 rotate-y-180 ${
                        styles.bg
                      } ${card.isMatched ? 'ring-2 ring-emerald-500 bg-emerald-50/90' : ''}`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Top Header Badge */}
                      <div className="w-full flex items-center justify-between text-[10px] font-bold">
                        <span className="text-base sm:text-lg">{card.icon}</span>
                        {card.isMatched && (
                          <span className="bg-emerald-600 text-white rounded-full p-0.5 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Center Label */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center my-1">
                        <span
                          className={`font-black tracking-tight leading-tight ${
                            card.label.length > 8
                              ? 'text-xs sm:text-sm'
                              : 'text-sm sm:text-lg'
                          } ${selectedTheme === 'hijaiyah' || selectedTheme === 'arab' ? 'font-arabic text-xl sm:text-2xl' : ''}`}
                        >
                          {card.label}
                        </span>

                        {card.sublabel && (
                          <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                            {card.sublabel}
                          </span>
                        )}
                      </div>

                      {/* Bottom Footer Indicator */}
                      <div className="w-full flex items-center justify-center">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}
                        >
                          {card.type === 'A' ? 'Kartu A' : 'Kartu B'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Victory Modal or Card Banner */}
          {gameCompleted && (
            <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg space-y-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  🏆
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    Alhamdulillah! Babak Ini Selesai!
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Kamu telah mencocokkan seluruh pasangan kartu {THEME_DATA[selectedTheme].title}!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white/10 p-3 rounded-xl text-center text-xs">
                <div>
                  <div className="text-[10px] text-emerald-200">Langkah</div>
                  <div className="text-base font-black">{turnsCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200">Waktu</div>
                  <div className="text-base font-black">{formatTime(elapsedSeconds)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200">Bintang Didapat</div>
                  <div className="text-base font-black text-amber-300 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>+3</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    soundAudio.playTing();
                    initializeGame();
                  }}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Babak Baru</span>
                </button>

                <button
                  onClick={() => onSwitchToGame?.('ular-tangga')}
                  className="py-2.5 px-4 bg-emerald-500/40 hover:bg-emerald-500/60 text-white rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Dice5 className="w-4 h-4" />
                  <span>Main Ular Tangga</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
