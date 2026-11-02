import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  Trophy,
  Star,
  Zap,
  Dice5,
  Brain,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  ArrowRight,
  Gift,
  Link as LinkIcon
} from 'lucide-react';

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

interface WheelSector {
  id: string;
  label: string;
  icon: string;
  category: 'matematika' | 'arab' | 'english' | 'adab' | 'imla' | 'ipa' | 'gift' | 'boost';
  color: string; // hex
  textColor: string;
  stars: number;
}

const SECTORS: WheelSector[] = [
  { id: 'sec-1', label: 'Matematika', icon: '🔢', category: 'matematika', color: '#10b981', textColor: '#ffffff', stars: 3 },
  { id: 'sec-2', label: 'B. Arab', icon: '🕌', category: 'arab', color: '#06b6d4', textColor: '#ffffff', stars: 3 },
  { id: 'sec-3', label: 'Bintang Emas', icon: '🎁', category: 'gift', color: '#f59e0b', textColor: '#ffffff', stars: 5 },
  { id: 'sec-4', label: 'English', icon: '🇬🇧', category: 'english', color: '#3b82f6', textColor: '#ffffff', stars: 3 },
  { id: 'sec-5', label: 'Adab Santri', icon: '🧕', category: 'adab', color: '#ec4899', textColor: '#ffffff', stars: 3 },
  { id: 'sec-6', label: 'Tiket Bonus', icon: '⚡', category: 'boost', color: '#8b5cf6', textColor: '#ffffff', stars: 4 },
  { id: 'sec-7', label: 'Kaidah Imla', icon: '📖', category: 'imla', color: '#14b8a6', textColor: '#ffffff', stars: 3 },
  { id: 'sec-8', label: 'Sains & IPA', icon: '🔬', category: 'ipa', color: '#f97316', textColor: '#ffffff', stars: 3 }
];

interface WheelQuestion {
  id: string;
  category: string;
  question: string;
  arabicContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SECTOR_QUESTIONS: Record<string, WheelQuestion[]> = {
  matematika: [
    {
      id: 'm1',
      category: 'Matematika',
      question: 'Berapakah hasil dari 14 + 18?',
      options: ['32', '30', '34'],
      correctIndex: 0,
      explanation: '14 + 18 = 32. Hebat sekali hitunganmu!'
    },
    {
      id: 'm2',
      category: 'Matematika',
      question: 'Aisyah punya 25 kurma, dimakan 7 butir. Sisa kurma Aisyah ada berapa?',
      options: ['18 butir', '17 butir', '19 butir'],
      correctIndex: 0,
      explanation: '25 - 7 = 18 butir kurma.'
    },
    {
      id: 'm3',
      category: 'Matematika',
      question: 'Berapakah 5 dikalikan 4?',
      options: ['20', '25', '15'],
      correctIndex: 0,
      explanation: '5 × 4 = 20. Perkalian yang tepat!'
    }
  ],
  arab: [
    {
      id: 'a1',
      category: 'Bahasa Arab',
      question: 'Apakah arti kata "كِتَابٌ" (Kitaabun)?',
      arabicContext: 'كِتَابٌ',
      options: ['Buku', 'Pena', 'Pintu'],
      correctIndex: 0,
      explanation: 'كِتَابٌ (Kitaabun) artinya Buku.'
    },
    {
      id: 'a2',
      category: 'Bahasa Arab',
      question: 'Apa bahasa Arab untuk buah "Apel 🍎"?',
      options: ['تُفَّاحَةٌ (Tuffaahatun)', 'بُرْتُقَالٌ (Burtuqaalun)', 'مَوْزٌ (Mauzun)'],
      correctIndex: 0,
      explanation: 'Apel dalam bahasa Arab adalah تُفَّاحَةٌ (Tuffaahatun).'
    },
    {
      id: 'a3',
      category: 'Bahasa Arab',
      question: 'Manakah ucapan terima kasih dalam bahasa Arab?',
      options: ['Syukran (شُكْرًا)', 'Afwan (عَفْوًا)', 'Ahlan (أَهْلًا)'],
      correctIndex: 0,
      explanation: 'Syukran (شُكْرًا) artinya terima kasih.'
    }
  ],
  english: [
    {
      id: 'e1',
      category: 'English',
      question: 'What is the English word for "Gajah 🐘"?',
      options: ['Elephant', 'Lion', 'Giraffe'],
      correctIndex: 0,
      explanation: 'Elephant is Gajah!'
    },
    {
      id: 'e2',
      category: 'English',
      question: 'What color is the sun ("Matahari")?',
      options: ['Yellow', 'Blue', 'Purple'],
      correctIndex: 0,
      explanation: 'Yellow is kuning, the color of the bright sunshine.'
    },
    {
      id: 'e3',
      category: 'English',
      question: 'How do you say "Selamat Pagi" in English?',
      options: ['Good Morning', 'Good Night', 'Good Afternoon'],
      correctIndex: 0,
      explanation: 'Good morning is selamat pagi!'
    }
  ],
  adab: [
    {
      id: 'ad1',
      category: 'Adab Santri',
      question: 'Apa yang harus kita ucapkan sebelum makan dan minum?',
      options: ['Membaca Bismillah', 'Membaca Alhamdulillah', 'Langsung makan'],
      correctIndex: 0,
      explanation: 'Membaca Bismillah adalah adab sunnah makan agar berkah.'
    },
    {
      id: 'ad2',
      category: 'Adab Santri',
      question: 'Tersenyum ramah dan manis kepada teman bernilai pahala apa?',
      options: ['Pahala Sedekah', 'Pahala Haji', 'Pahala Puasa'],
      correctIndex: 0,
      explanation: 'Rasulullah SAW bersabda bahwa senyummu kepada saudaramu adalah sedekah.'
    },
    {
      id: 'ad3',
      category: 'Adab Santri',
      question: 'Masuk masjid sebaiknya mendahulukan kaki mana?',
      options: ['Kaki Kanan', 'Kaki Kiri', 'Kedua Kaki Bersama'],
      correctIndex: 0,
      explanation: 'Sunnah mendahulukan kaki kanan saat masuk masjid dan berdoa.'
    }
  ],
  imla: [
    {
      id: 'i1',
      category: 'Kaidah Imla',
      question: 'Huruf manakah di bawah ini yang TIDAK bisa menyambung ke huruf sesudahnya?',
      arabicContext: 'ر',
      options: ['Huruf Ra (ر)', 'Huruf Ba (ب)', 'Huruf Mim (م)'],
      correctIndex: 0,
      explanation: 'Huruf Ra (ر) adalah huruf pemutus yang tidak bisa menyambung ke kiri.'
    },
    {
      id: 'i2',
      category: 'Kaidah Imla',
      question: 'Tanda baca garis satu di atas huruf disebut harakat apa?',
      arabicContext: 'ـَ',
      options: ['Fathah (bersuara A)', 'Kasrah (bersuara I)', 'Dhammah (bersuara U)'],
      correctIndex: 0,
      explanation: 'Garis di atas huruf disebut Fathah dan menghasilkan bunyi vokal "A".'
    }
  ],
  ipa: [
    {
      id: 'ip1',
      category: 'IPA Dasar',
      question: 'Hewan ikan bernapas di dalam air menggunakan organ apa?',
      options: ['Insang', 'Paru-paru', 'Kulit'],
      correctIndex: 0,
      explanation: 'Ikan bernapas menyaring oksigen air menggunakan insang.'
    },
    {
      id: 'ip2',
      category: 'IPA Dasar',
      question: 'Benda manakah di bawah ini yang berwujud cair?',
      options: ['Air sirup', 'Batu kerikil', 'Meja kayu'],
      correctIndex: 0,
      explanation: 'Air sirup berwujud cair dan mengalir mengikuti bentuk wadahnya.'
    }
  ]
};

interface SpinWheelGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar?: (amount: number, reason: string) => void;
  onSwitchToGame?: (gameTab: 'ular-tangga' | 'kartu-memori' | 'kuis' | 'sambung-hijaiyah') => void;
}

export const SpinWheelGame: React.FC<SpinWheelGameProps> = ({
  characterConfig,
  onEarnStar,
  onSwitchToGame
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedSector, setSelectedSector] = useState<WheelSector | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<WheelQuestion | null>(null);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Stats
  const [spinsCount, setSpinsCount] = useState<number>(0);
  const [starsWonTotal, setStarsWonTotal] = useState<number>(0);
  const [spinHistory, setSpinHistory] = useState<Array<{ label: string; icon: string; time: string; won: boolean }>>([]);
  const [speechBubble, setSpeechBubble] = useState<string>(
    'Bismillah! Tekan tombol "PUTAR RODA" untuk mendapatkan tantangan & hadiah bintang emas! 🎡'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Draw wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 16;
    const numSectors = SECTORS.length;
    const arcSize = (2 * Math.PI) / numSectors;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);

    // Draw slices
    SECTORS.forEach((sec, idx) => {
      const startAngle = idx * arcSize;
      const endAngle = startAngle + arcSize;

      // Slice background
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sec.color;
      ctx.fill();

      // Border line between slices
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner shadow / stroke
      ctx.save();
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = sec.textColor;
      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';

      // Draw Icon & Text
      const textDist = radius - 28;
      ctx.fillText(`${sec.icon} ${sec.label}`, textDist, 5);

      ctx.restore();
    });

    // Outer rim border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#fef08a'; // gold rim
    ctx.stroke();

    // Secondary decorative outer ring
    ctx.beginPath();
    ctx.arc(0, 0, radius + 5, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ca8a04';
    ctx.stroke();

    ctx.restore();

    // Center hub pin
    ctx.save();
    ctx.translate(centerX, centerY);

    // Hub gradient circle
    const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#fef08a');
    grad.addColorStop(1, '#eab308');

    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ca8a04';
    ctx.stroke();

    // Center icon
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', 0, 0);

    ctx.restore();
  };

  useEffect(() => {
    drawWheel(rotationAngle);
  }, [rotationAngle]);

  // Handle Spin Click
  const handleSpinWheel = () => {
    if (isSpinning || activeQuestion) return;

    soundAudio.playTing();
    setIsSpinning(true);
    setSelectedSector(null);
    setActiveQuestion(null);
    setIsAnswerSubmitted(false);
    setSelectedAnswerIdx(null);
    setAnswerFeedback(null);
    setSpeechBubble('Roda berputar... Ya Allah semoga dapat bintang keberuntungan! 🎡✨');

    // Random rotations: between 5 to 9 full turns + random slice offset
    const numSectors = SECTORS.length;
    const degreesPerSector = 360 / numSectors;
    const randomExtraTurns = 5 + Math.floor(Math.random() * 4);
    const targetSectorIndex = Math.floor(Math.random() * numSectors);

    // In canvas rotation, top pointer is at 270 degrees (or -90 deg)
    // To land targetSectorIndex at the top (270 deg), calculate angle
    const targetSectorCenter = targetSectorIndex * degreesPerSector + degreesPerSector / 2;
    const targetOffset = 270 - targetSectorCenter;
    const finalAngle = rotationAngle + randomExtraTurns * 360 + ((targetOffset - (rotationAngle % 360) + 360) % 360);

    const startAngle = rotationAngle;
    const totalRotation = finalAngle - startAngle;
    const duration = 4000; // 4 seconds
    const startTime = performance.now();

    // Click ticker sound
    let lastTickAngle = startAngle;
    const tickIntervalDeg = degreesPerSector;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out cubic: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + totalRotation * easeOut;

      setRotationAngle(currentAngle);

      // Play tick sound whenever passing a sector line
      if (Math.abs(currentAngle - lastTickAngle) >= tickIntervalDeg / 2) {
        soundAudio.playWheelClick();
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // SPIN FINISHED!
        setIsSpinning(false);
        setSpinsCount((c) => c + 1);

        // Calculate landed sector
        const normalizedAngle = (currentAngle % 360 + 360) % 360;
        // Pointer is at 270 degrees
        const pointerAngleOnWheel = (270 - normalizedAngle + 360) % 360;
        const landedIdx = Math.floor(pointerAngleOnWheel / degreesPerSector) % numSectors;
        const landedSector = SECTORS[landedIdx];

        handleSectorResult(landedSector);
      }
    };

    requestAnimationFrame(animate);
  };

  // Handle Landed Result
  const handleSectorResult = (sector: WheelSector) => {
    setSelectedSector(sector);

    if (sector.category === 'gift') {
      // Direct Gold Star Gift!
      soundAudio.playFanfare();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      const stars = sector.stars;
      setStarsWonTotal((s) => s + stars);
      if (onEarnStar) {
        onEarnStar(stars, 'Mendapat Hadiah Bintang Emas dari Roda Putar Ceria! 🎁');
      }

      setSpinHistory((prev) => [
        { label: sector.label, icon: sector.icon, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), won: true },
        ...prev.slice(0, 9)
      ]);

      setSpeechBubble(`Alhamdulillah! Berkah Roda Putar: Kamu mendapatkan +${stars} Bintang Emas langsung! 🎁⭐⭐`);
    } else if (sector.category === 'boost') {
      // Bonus ticket + instant 2 stars
      soundAudio.playFanfare();
      setStarsWonTotal((s) => s + sector.stars);
      if (onEarnStar) {
        onEarnStar(sector.stars, 'Tiket Bonus Roda Putar Ceria! ⚡');
      }

      setSpinHistory((prev) => [
        { label: sector.label, icon: sector.icon, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), won: true },
        ...prev.slice(0, 9)
      ]);

      setSpeechBubble(`Luar biasa! Tiket Bonus aktif (+${sector.stars} Bintang)! Kamu boleh putar roda lagi! ⚡`);
    } else {
      // Quiz Challenge Question
      soundAudio.playSuccessChime();
      const questionList = SECTOR_QUESTIONS[sector.category] || SECTOR_QUESTIONS['matematika'];
      const randomQ = questionList[Math.floor(Math.random() * questionList.length)];

      // Randomize options order so the answer is never always in the same box
      const correctOptionText = randomQ.options[randomQ.correctIndex];
      const shuffled = [...randomQ.options].sort(() => Math.random() - 0.5);
      const newCorrectIndex = shuffled.indexOf(correctOptionText);

      setActiveQuestion({
        ...randomQ,
        options: shuffled,
        correctIndex: newCorrectIndex
      });

      setSpeechBubble(
        `Roda mendarat di ${sector.icon} ${sector.label}! Jawab pertanyaan tantangan ini untuk memenangkan +${sector.stars} Bintang Emas! 💪`
      );
    }
  };

  // Answer Submission
  const handleAnswerSubmit = (optionIdx: number) => {
    if (isAnswerSubmitted || !activeQuestion || !selectedSector) return;

    setSelectedAnswerIdx(optionIdx);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIdx === activeQuestion.correctIndex;

    if (isCorrect) {
      setAnswerFeedback('correct');
      soundAudio.playFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.55 }
        });
      } catch {
        // ignore
      }

      const stars = selectedSector.stars;
      setStarsWonTotal((s) => s + stars);
      if (onEarnStar) {
        onEarnStar(stars, `Menjawab Tantangan ${selectedSector.label} di Roda Putar Ceria`);
      }

      setSpinHistory((prev) => [
        { label: selectedSector.label, icon: selectedSector.icon, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), won: true },
        ...prev.slice(0, 9)
      ]);

      setSpeechBubble(`Maa Syaa Allah! Jawabanmu Tepat Sekali! Kamu berhak atas +${stars} Bintang Emas! 🎉`);
    } else {
      setAnswerFeedback('wrong');
      soundAudio.playWrongBuzzer();

      setSpinHistory((prev) => [
        { label: selectedSector.label, icon: selectedSector.icon, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), won: false },
        ...prev.slice(0, 9)
      ]);

      setSpeechBubble(`Hampir benar! Jangan berkecil hati ya, terus belajar dan putar lagi rodanya! 💕`);
    }
  };

  // Reset Challenge Modal
  const handleCloseChallenge = () => {
    soundAudio.playTing();
    setActiveQuestion(null);
    setSelectedSector(null);
    setIsAnswerSubmitted(false);
    setSelectedAnswerIdx(null);
    setAnswerFeedback(null);
    setSpeechBubble('Siap untuk putaran berikutnya? Bismillah! 🎡');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-12 select-none">
      {/* Game Arena Selector Banner */}
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
            onClick={() => onSwitchToGame?.('kartu-memori')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-all"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Kartu Memori</span>
          </button>
          <button
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-white text-emerald-900 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Roda Putar Ceria</span>
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

      {/* Main Wheel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Mascot & Wheel Stats (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Mascot Speech Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 sm:p-4 shadow-sm flex items-start gap-3">
            <div className="shrink-0 relative">
              <CharacterAvatar config={characterConfig || FALLBACK_CHARACTER} size="md" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shadow-xs">
                🎡
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

          {/* Stats & Rewards Panel */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Prestasi Putaran Roda</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-[10px] font-bold text-amber-700 uppercase">Total Putaran</div>
                <div className="text-xl font-black text-amber-950 mt-0.5">{spinsCount}x</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-700 uppercase">Bintang Diraih</div>
                <div className="text-xl font-black text-emerald-950 mt-0.5 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>+{starsWonTotal}</span>
                </div>
              </div>
            </div>

            {/* Slices legend */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Hadiah Sektor Roda (8 Kategori):
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {SECTORS.map((sec) => (
                  <div
                    key={sec.id}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 truncate"
                  >
                    <span className="shrink-0">{sec.icon}</span>
                    <span className="font-semibold truncate">{sec.label}</span>
                    <span className="ml-auto text-[10px] font-bold text-amber-600">
                      +{sec.stars}⭐
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spin History */}
          {spinHistory.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Riwayat Hadiah Terakhir</span>
                <span className="text-[10px] font-medium text-slate-400">Terbaru</span>
              </h4>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {spinHistory.map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-1.5 rounded-lg text-xs border ${
                      h.won
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50/80 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{h.icon}</span>
                      <span className="font-bold">{h.label}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <span>{h.time}</span>
                      {h.won ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Wheel & Challenge Area (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4 order-1 lg:order-2 flex flex-col items-center justify-center">
          {/* Wheel Stage Box */}
          <div className="w-full bg-gradient-to-b from-indigo-900 via-teal-900 to-emerald-950 rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center border-4 border-amber-300/40">
            {/* Header info */}
            <div className="text-center space-y-1 mb-4 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold backdrop-blur-xs border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Roda Putar Ceria Berhadiah Bintang</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Putar Roda & Jawab Tantangan Seru!
              </h2>
            </div>

            {/* Wheel Canvas Container */}
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center select-none my-2">
              {/* TOP POINTER ARROW */}
              <div className="absolute -top-3 z-30 drop-shadow-lg flex flex-col items-center">
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 -mt-2 shadow-sm border-2 border-white" />
              </div>

              {/* HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="w-full h-full max-w-[350px] max-h-[350px] rounded-full drop-shadow-2xl transition-transform"
              />
            </div>

            {/* Spin Action Button */}
            <div className="mt-4 z-10 w-full max-w-xs flex flex-col items-center gap-2">
              <button
                onClick={handleSpinWheel}
                disabled={isSpinning || !!activeQuestion}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${
                  isSpinning || !!activeQuestion
                    ? 'bg-slate-500/50 text-slate-300 border border-white/10 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-emerald-950 border-2 border-yellow-200 shadow-yellow-500/30 animate-pulse hover:animate-none'
                }`}
              >
                <Sparkles className="w-5 h-5 text-emerald-900" />
                <span>{isSpinning ? 'Sedang Berputar...' : 'PUTAR RODA! 🎡'}</span>
              </button>

              <span className="text-[11px] text-emerald-200 font-medium text-center">
                Gratis putaran tak terbatas untuk asah pengetahuan santri!
              </span>
            </div>
          </div>

          {/* Question / Challenge Modal Card */}
          {activeQuestion && selectedSector && (
            <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedSector.icon}</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">
                      Tantangan {selectedSector.label}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Jawab dengan tepat untuk memperoleh +{selectedSector.stars} Bintang Emas!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-800 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>+{selectedSector.stars} Bintang</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                {activeQuestion.arabicContext && (
                  <div className="font-arabic text-3xl font-bold text-emerald-800 py-1">
                    {activeQuestion.arabicContext}
                  </div>
                )}
                <p className="text-sm sm:text-base font-bold text-slate-800">
                  {activeQuestion.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswerIdx === optIdx;
                  const isCorrect = optIdx === activeQuestion.correctIndex;

                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                    } else {
                      btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerSubmit(optIdx)}
                      disabled={isAnswerSubmitted}
                      className={`p-3.5 rounded-2xl font-bold text-xs sm:text-sm border-2 text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and next button */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                    answerFeedback === 'correct'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-sm">
                    {answerFeedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Jawaban Kamu Benar! (+{selectedSector.stars} Bintang Emas)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Jawaban Belum Tepat</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-700">{activeQuestion.explanation}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleCloseChallenge}
                      className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>Lanjut Putar Lagi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
