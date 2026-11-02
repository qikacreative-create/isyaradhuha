import React, { useState, useRef, useEffect } from 'react';
import { TabType, UserProgress, CurriculumMode } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  BookOpen,
  Edit3,
  Award,
  Star,
  Compass,
  HelpCircle,
  User,
  Globe,
  Atom,
  Calculator,
  BookMarked,
  Home,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  PenTool,
  Dice5,
  Brain,
  Link as LinkIcon,
  SpellCheck,
  CheckCircle2,
  Tv,
  History,
  LogIn,
  Cloud
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { soundAudio } from '../utils/audio';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  curriculumMode: CurriculumMode;
  setCurriculumMode: (mode: CurriculumMode) => void;
  progress: UserProgress;
  onOpenReport: () => void;
  onOpenDictionary: () => void;
  onOpenAvatarCreator: (role?: 'self' | 'companion') => void;
  onOpenHistory: () => void;
  onOpenLogin: () => void;
  isTvMode?: boolean;
  onToggleTvMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  curriculumMode,
  setCurriculumMode,
  progress,
  onOpenReport,
  onOpenDictionary,
  onOpenAvatarCreator,
  onOpenHistory,
  onOpenLogin,
  isTvMode = false,
  onToggleTvMode
}) => {
  const { user } = useAuth();
  const [isLessonsMenuOpen, setIsLessonsMenuOpen] = useState(false);
  const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileDrawerCategory, setMobileDrawerCategory] = useState<'lessons' | 'games'>('lessons');

  const lessonsRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);

  const isSD = curriculumMode === 'sd';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lessonsRef.current && !lessonsRef.current.contains(event.target as Node)) {
        setIsLessonsMenuOpen(false);
      }
      if (gamesRef.current && !gamesRef.current.contains(event.target as Node)) {
        setIsGamesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTab = (tab: TabType) => {
    soundAudio.playTing();
    setActiveTab(tab);
    setIsLessonsMenuOpen(false);
    setIsGamesMenuOpen(false);
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchMode = (mode: CurriculumMode) => {
    soundAudio.playTing();
    setCurriculumMode(mode);
    setIsLessonsMenuOpen(false);
    setIsGamesMenuOpen(false);

    // If currently on a tab that doesn't belong to the newly selected mode, go to beranda
    const sdTabs: TabType[] = ['matematika', 'bahasa-indonesia', 'ipa', 'bahasa-inggris', 'game-perkalian', 'game-mengeja'];
    const diniyahTabs: TabType[] = ['bahasa-arab', 'imla', 'tajwid', 'kanvas', 'sambung-hijaiyah', 'ular-tangga', 'kartu-memori', 'roda-putar', 'kuis'];

    if (mode === 'sd' && diniyahTabs.includes(activeTab)) {
      setActiveTab('beranda');
    } else if (mode === 'diniyah' && sdTabs.includes(activeTab)) {
      setActiveTab('beranda');
    }
  };

  // SD Lessons - Strictly general national elementary curriculum (zero religious or Arabic elements)
  const sdLessonItems = [
    {
      id: 'matematika' as TabType,
      label: 'Matematika Kelas 2',
      shortLabel: 'Matematika',
      desc: 'Nilai tempat ratusan, perkalian bergambar, jam analog & bangun datar',
      icon: <Calculator className="w-4 h-4 text-amber-600" />,
      tag: 'Kelas 2'
    },
    {
      id: 'bahasa-indonesia' as TabType,
      label: 'Bahasa Indonesia Kls 2',
      shortLabel: 'B. Indonesia',
      desc: 'Membaca cerita santun, 4 kata ajaib, huruf kapital & tanda baca',
      icon: <BookMarked className="w-4 h-4 text-indigo-600" />,
      tag: 'Kelas 2'
    },
    {
      id: 'ipa' as TabType,
      label: 'IPA & Sains Dasar',
      shortLabel: 'IPA Sains',
      desc: 'Metamorfosis hewan, wujud benda, siklus air & tata surya',
      icon: <Atom className="w-4 h-4 text-teal-600" />,
      tag: 'Sains'
    },
    {
      id: 'bahasa-inggris' as TabType,
      label: 'Bahasa Inggris SD',
      shortLabel: 'English',
      desc: 'Daily vocabulary, audio pengucapan native speaker & kalimat',
      icon: <Globe className="w-4 h-4 text-blue-600" />,
      tag: 'Bahasa'
    }
  ];

  // Diniyah Lessons - Madrasah & Islamic curriculum
  const diniyahLessonItems = [
    {
      id: 'bahasa-arab' as TabType,
      label: 'Bahasa Arab Dasar',
      shortLabel: 'B. Arab',
      desc: 'Kosakata mufrodat bergambar, audio pelafalan & kartu kata',
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      tag: 'Madrasah'
    },
    {
      id: 'imla' as TabType,
      label: 'Kaidah Imla’',
      shortLabel: 'Imla’',
      desc: 'Penyambungan huruf Hijaiyah, ta marbuthah & alif lam',
      icon: <Edit3 className="w-4 h-4 text-emerald-600" />,
      tag: 'Menulis'
    },
    {
      id: 'tajwid' as TabType,
      label: 'Ilmu Tajwid Tartil',
      shortLabel: 'Tajwid',
      desc: 'Hukum nun sukun, tanwin, mim sukun & qalqalah pantulan',
      icon: <Compass className="w-4 h-4 text-teal-600" />,
      tag: 'Tartil'
    },
    {
      id: 'kanvas' as TabType,
      label: 'Kanvas Khat Arab',
      shortLabel: 'Kanvas',
      desc: 'Papan tulis digital latihan kaligrafi garis halus-kasar',
      icon: <PenTool className="w-4 h-4 text-emerald-600" />,
      tag: 'Praktik'
    }
  ];

  // SD Games - Strictly general national elementary games (zero religious or Arabic elements)
  const sdGameItems = [
    {
      id: 'game-mengeja' as TabType,
      label: 'Misi Mengeja & Penyelamatan',
      shortLabel: 'Mengeja',
      desc: 'Eja kata B. Indonesia & Inggris untuk selamatkan sahabat dari jeratan tali',
      icon: <SpellCheck className="w-4 h-4 text-emerald-600" />,
      badge: 'Game Baru'
    },
    {
      id: 'game-perkalian' as TabType,
      label: 'Tantangan Perkalian Ceria',
      shortLabel: 'Perkalian',
      desc: 'Tantangan kilat, taklukkan monster perkalian & tabel 10×10',
      icon: <Calculator className="w-4 h-4 text-orange-600" />,
      badge: 'Game Baru'
    }
  ];

  // Diniyah Games - Madrasah / Islamic games
  const diniyahGameItems = [
    {
      id: 'sambung-hijaiyah' as TabType,
      label: 'Sambung Hijaiyah',
      shortLabel: 'Sambung Huruf',
      desc: 'Rakit kata bersambung & kuasai 6 huruf pemutus',
      icon: <LinkIcon className="w-4 h-4 text-teal-600" />,
      badge: 'Game Baru'
    },
    {
      id: 'ular-tangga' as TabType,
      label: 'Ular Tangga Santri',
      shortLabel: 'Ular Tangga',
      desc: '100 kotak kebaikan, tangga kebajikan & pesan santun',
      icon: <Dice5 className="w-4 h-4 text-emerald-600" />,
      badge: 'Populer'
    },
    {
      id: 'kartu-memori' as TabType,
      label: 'Kartu Memori Mufrodat',
      shortLabel: 'Kartu Memori',
      desc: 'Asah ingatan pasangan gambar & kata mufrodat',
      icon: <Brain className="w-4 h-4 text-purple-600" />,
      badge: 'Asah Otak'
    },
    {
      id: 'roda-putar' as TabType,
      label: 'Roda Putar Hadiah',
      shortLabel: 'Roda Putar',
      desc: 'Putar roda kuis ceria berhadiah bintang prestasi',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      badge: 'Hadiah'
    },
    {
      id: 'kuis' as TabType,
      label: 'Kuis Evaluasi Diniyah',
      shortLabel: 'Kuis Diniyah',
      desc: 'Evaluasi menyeluruh soal pilihan ganda materi diniyah',
      icon: <Award className="w-4 h-4 text-yellow-600" />,
      badge: 'Evaluasi'
    }
  ];

  const currentLessonItems = isSD ? sdLessonItems : diniyahLessonItems;
  const currentGameItems = isSD ? sdGameItems : diniyahGameItems;

  const isLessonActive = currentLessonItems.some(item => item.id === activeTab);
  const isGameActive = currentGameItems.some(item => item.id === activeTab);

  const activeLessonObj = currentLessonItems.find(i => i.id === activeTab);
  const activeGameObj = currentGameItems.find(i => i.id === activeTab);

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
            {/* Logo & Brand Identity */}
            <div
              onClick={() => handleSelectTab('beranda')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 ${
                  isSD
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-600'
                    : 'bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-800'
                }`}
              >
                {isSD ? (
                  <span className="font-black text-sm sm:text-base">SD</span>
                ) : (
                  <span className="font-arabic text-lg sm:text-xl font-bold">ب</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs sm:text-base text-stone-900 tracking-tight truncate">
                    Bintang Belajar
                  </span>
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-md shrink-0 ${
                      isSD
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isSD ? 'Pelajaran SD' : 'Diniyah'}
                  </span>
                </div>
              </div>
            </div>

            {/* Central Dual-Section Portal Switcher (Desktop & Tablet) */}
            <div className="hidden md:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
              <button
                onClick={() => handleSwitchMode('sd')}
                className={`px-3 py-1 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                  isSD
                    ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/30'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <span>🎒 Pelajaran SD</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${isSD ? 'bg-blue-100 text-blue-700' : 'bg-stone-200 text-stone-600'}`}>
                  Umum
                </span>
              </button>

              <button
                onClick={() => handleSwitchMode('diniyah')}
                className={`px-3 py-1 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                  !isSD
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/30'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <span>🕌 Pelajaran Diniyah</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${!isSD ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'}`}>
                  Madrasah
                </span>
              </button>
            </div>

            {/* Desktop Navigation for Current Portal */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200">
              {/* 1. Beranda */}
              <button
                onClick={() => handleSelectTab('beranda')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'beranda'
                    ? isSD
                      ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                      : 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <Home className={`w-3.5 h-3.5 ${isSD ? 'text-blue-600' : 'text-emerald-600'}`} />
                <span>Beranda</span>
              </button>

              {/* 2. Pelajaran Dropdown */}
              <div className="relative" ref={lessonsRef}>
                <button
                  onClick={() => {
                    setIsLessonsMenuOpen(!isLessonsMenuOpen);
                    setIsGamesMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    isLessonActive
                      ? isSD
                        ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                        : 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <BookOpen className={`w-3.5 h-3.5 ${isSD ? 'text-blue-600' : 'text-emerald-600'}`} />
                  <span>
                    {isLessonActive && activeLessonObj
                      ? activeLessonObj.shortLabel
                      : isSD
                      ? 'Pelajaran SD'
                      : 'Materi Diniyah'}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                      isLessonsMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu for Lessons */}
                {isLessonsMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-2 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1 flex items-center justify-between">
                      <span>{isSD ? 'Kurikulum SD Umum (4 Pelajaran)' : 'Materi Diniyah (4 Pelajaran)'}</span>
                      <span>{isSD ? 'SD Nasional' : 'Kemenag'}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto">
                      {currentLessonItems.map(item => {
                        const isCurrent = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectTab(item.id)}
                            className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                              isCurrent
                                ? isSD
                                  ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200'
                                  : 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                                : 'hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-stone-800">{item.label}</span>
                                <span className="text-[9px] font-semibold text-stone-400 bg-stone-100 px-1.5 py-0.2 rounded">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Game Dropdown */}
              <div className="relative" ref={gamesRef}>
                <button
                  onClick={() => {
                    setIsGamesMenuOpen(!isGamesMenuOpen);
                    setIsLessonsMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    isGameActive
                      ? 'bg-white text-orange-800 shadow-xs ring-1 ring-orange-500/20'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Dice5 className="w-3.5 h-3.5 text-orange-600" />
                  <span>
                    {isGameActive && activeGameObj ? activeGameObj.shortLabel : isSD ? 'Game SD' : 'Game Diniyah'}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                      isGamesMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu for Games */}
                {isGamesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-2 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1 flex items-center justify-between">
                      <span>{isSD ? 'Arena Game SD' : 'Arena Game Diniyah'}</span>
                      <span>{isSD ? '2 Permainan' : '5 Permainan'}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {currentGameItems.map(item => {
                        const isCurrent = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectTab(item.id)}
                            className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                              isCurrent
                                ? 'bg-orange-50 text-orange-950 font-bold border border-orange-200'
                                : 'hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-stone-800">{item.label}</span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions: TV Mode, Dictionary, Avatar, Stars, Report, Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Smart TV Mode Toggle Button */}
              {onToggleTvMode && (
                <button
                  onClick={onToggleTvMode}
                  title={isTvMode ? 'Matikan Mode TV' : 'Beralih ke Mode TV (Smart TV 10-Foot UI)'}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isTvMode
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                  }`}
                >
                  <Tv className={`w-3.5 h-3.5 ${isTvMode ? 'text-stone-950 animate-pulse' : 'text-amber-600'}`} />
                  <span className="hidden sm:inline">{isTvMode ? 'TV Aktif' : 'Mode TV'}</span>
                </button>
              )}

              {/* Quick Mode Toggle for Mobile Header (Compact icon/pill) */}
              <button
                onClick={() => handleSwitchMode(isSD ? 'diniyah' : 'sd')}
                className={`md:hidden px-2 py-1 rounded-lg text-[10px] font-black border transition-all flex items-center gap-1 ${
                  isSD
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}
                title="Pindah Bagian: Pelajaran SD / Diniyah"
              >
                <span>{isSD ? '🎒 SD' : '🕌 Diniyah'}</span>
              </button>

              {/* Quick Dictionary Button (Show for Diniyah or general reference) */}
              <button
                onClick={onOpenDictionary}
                title={isSD ? 'Kamus Istilah' : 'Kamus Kosakata Arab'}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors"
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Character Avatar Trigger (Karakter Siswa & Sahabat) */}
              <button
                onClick={() => onOpenAvatarCreator('self')}
                title={`Karakter Siswa: ${progress.studentCharacter?.name || progress.studentName} (Klik untuk edit Karakter Sendiri / Teman)`}
                className="flex items-center gap-1.5 px-2 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-all shadow-2xs group"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white border border-stone-300 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <CharacterAvatar
                    config={progress.studentCharacter || progress.character || {
                      name: progress.studentName,
                      headwearType: 'hijab',
                      hijabColor: '#ffffff',
                      hijabStyle: 'bergo_sekolah',
                      eyeExpression: 'star_eyes',
                      mouthExpression: 'sweet_smile',
                      blushStyle: 'rosy',
                      faceMark: 'none',
                      skinTone: 'warm_peach',
                      handPose: 'peace',
                      outfit: 'sd_merah',
                      accessory: 'medal',
                      companionTitle: 'Siswa'
                    }}
                    size="sm"
                    className="scale-75"
                  />
                </div>
                <div className="flex flex-col text-left hidden md:block">
                  <span className="text-xs font-bold text-stone-800 leading-none">
                    {progress.studentCharacter?.name || progress.studentName || 'Saya'}
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-700 leading-none mt-0.5">
                    Karakter Saya 🎨
                  </span>
                </div>
              </button>

              {/* Stars Count Badge */}
              <div
                onClick={onOpenReport}
                title="Lihat Rapor Prestasi Belajar"
                className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-300 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-amber-950 text-xs sm:text-sm">{progress.stars}</span>
              </div>

              {/* Student Report Trigger (Desktop) */}
              <button
                onClick={onOpenReport}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-white rounded-xl font-semibold text-xs transition-colors shadow-2xs ${
                  isSD ? 'bg-blue-700 hover:bg-blue-800' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{progress.studentName || 'Rapor'}</span>
              </button>

              {/* Mobile Drawer Toggle */}
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                title="Buka Menu Pembelajaran"
                className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl border border-stone-200 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* STICKY BOTTOM NAVIGATION BAR FOR SMARTPHONES (CLEAN 4-ITEM LAYOUT) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1 flex items-center justify-around safe-area-bottom">
        {/* 1. Beranda */}
        <button
          onClick={() => handleSelectTab('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[60px] ${
            activeTab === 'beranda'
              ? isSD ? 'text-blue-700 font-extrabold' : 'text-emerald-700 font-extrabold'
              : 'text-stone-500 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'beranda' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Beranda</span>
        </button>

        {/* 2. Pelajaran */}
        <button
          onClick={() => {
            setMobileDrawerCategory('lessons');
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[60px] ${
            isLessonActive
              ? isSD ? 'text-blue-700 font-extrabold' : 'text-emerald-700 font-extrabold'
              : 'text-stone-500 font-medium'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${isLessonActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">{isSD ? 'Pelajaran SD' : 'Diniyah'}</span>
        </button>

        {/* 3. Game */}
        <button
          onClick={() => {
            setMobileDrawerCategory('games');
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[60px] relative ${
            isGameActive ? 'text-orange-700 font-extrabold' : 'text-stone-500 font-medium'
          }`}
        >
          <Dice5 className={`w-5 h-5 ${isGameActive ? 'stroke-[2.5] text-orange-600' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Game</span>
        </button>

        {/* 4. Rapor */}
        <button
          onClick={onOpenReport}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[60px] text-stone-500 font-medium"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5">Rapor</span>
        </button>
      </nav>

      {/* MOBILE DRAWER / BOTTOM SHEET */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end lg:hidden">
          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setIsMobileDrawerOpen(false)} />

          {/* Drawer Card */}
          <div className="bg-white rounded-t-3xl border-t border-stone-200 shadow-2xl p-4 sm:p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs ${
                    isSD ? 'bg-blue-600' : 'bg-emerald-600'
                  }`}
                >
                  {isSD ? 'SD' : '🕌'}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900">
                    {isSD ? 'Portal Pelajaran SD (Umum)' : 'Portal Pelajaran Diniyah'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {isSD ? 'Pelajaran SD murni tanpa embel agama/Arab' : 'Materi Diniyah, Kaidah Imla’ & Tajwid'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Portal Switcher Inside Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                onClick={() => handleSwitchMode('sd')}
                className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isSD
                    ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🎒 Pelajaran SD</span>
              </button>
              <button
                onClick={() => handleSwitchMode('diniyah')}
                className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  !isSD
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🕌 Diniyah</span>
              </button>
            </div>

            {/* Smart TV Mode Drawer Button */}
            {onToggleTvMode && (
              <button
                onClick={() => {
                  onToggleTvMode();
                  setIsMobileDrawerOpen(false);
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 border ${
                  isTvMode
                    ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-sm'
                    : 'bg-stone-900 text-amber-300 border-amber-500/40 hover:bg-stone-800'
                }`}
              >
                <Tv className="w-4 h-4 text-amber-400" />
                <span>{isTvMode ? 'Mode TV Aktif (Klik untuk Matikan)' : 'Aktifkan Mode Smart TV & Remote'}</span>
              </button>
            )}

            {/* Segmented Category Filter inside Drawer (Lessons vs Games) */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                onClick={() => setMobileDrawerCategory('lessons')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileDrawerCategory === 'lessons'
                    ? isSD
                      ? 'bg-white text-blue-800 shadow-xs'
                      : 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${isSD ? 'text-blue-600' : 'text-emerald-600'}`} />
                <span>Pelajaran ({currentLessonItems.length})</span>
              </button>
              <button
                onClick={() => setMobileDrawerCategory('games')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileDrawerCategory === 'games'
                    ? 'bg-white text-orange-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Dice5 className="w-3.5 h-3.5 text-orange-600" />
                <span>Arena Game ({currentGameItems.length})</span>
              </button>
            </div>

            {/* Drawer Content based on selected Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mobileDrawerCategory === 'lessons' ? (
                currentLessonItems.map(item => {
                  const isCurrent = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`p-3 rounded-xl text-left border flex items-start gap-2.5 transition-all ${
                        isCurrent
                          ? isSD
                            ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold shadow-2xs'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">{item.label}</span>
                          <span className="text-[9px] font-semibold text-stone-400 bg-stone-100 px-1.5 py-0.2 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  );
                })
              ) : (
                currentGameItems.map(item => {
                  const isCurrent = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`p-3 rounded-xl text-left border flex items-start gap-2.5 transition-all ${
                        isCurrent
                          ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold shadow-2xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
