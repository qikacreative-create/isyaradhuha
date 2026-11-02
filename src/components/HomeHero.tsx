import React, { useState, useRef } from 'react';
import { TabType, UserProgress, CurriculumMode } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Edit3,
  Compass,
  BookOpen,
  PenTool,
  Award,
  ArrowRight,
  Sparkles,
  Globe,
  Atom,
  Heart,
  Calculator,
  BookMarked,
  Dice5,
  Brain,
  Link as LinkIcon,
  SpellCheck,
  Check,
  Palette
} from 'lucide-react';
import { soundAudio } from '../utils/audio';

interface HomeHeroProps {
  setActiveTab: (tab: TabType) => void;
  curriculumMode: CurriculumMode;
  setCurriculumMode: (mode: CurriculumMode) => void;
  progress: UserProgress;
  onOpenReport: () => void;
  onOpenAvatarCreator?: (role: 'self' | 'companion') => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  curriculumMode,
  setCurriculumMode,
  progress,
  onOpenReport,
  onOpenAvatarCreator
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'lessons' | 'games'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const isSD = curriculumMode === 'sd';

  const handleFilterClick = (filter: 'all' | 'lessons' | 'games') => {
    soundAudio.playTing();
    setActiveFilter(filter);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSwitchMode = (mode: CurriculumMode) => {
    soundAudio.playTing();
    setCurriculumMode(mode);
    setActiveFilter('all');
  };

  const handleNavigate = (tab: TabType) => {
    soundAudio.playTing();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard helper for TV remote D-Pad OK / Enter on card divs
  const handleCardKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. DUAL-PORTAL SELECTION CARDS (CLEAR VISUAL SEPARATION: SD UMUM VS DINIYAH) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Card A: Pelajaran SD Umum */}
        <div
          tabIndex={0}
          role="button"
          onKeyDown={(e) => handleCardKeyDown(e, () => handleSwitchMode('sd'))}
          onClick={() => handleSwitchMode('sd')}
          className={`tv-card cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
            isSD
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50/70 border-blue-600 shadow-md ring-2 ring-blue-500/20 translate-y-[-2px]'
              : 'bg-white border-stone-200 hover:border-blue-300 hover:bg-stone-50/60 shadow-xs'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎒</span>
                <span className="font-extrabold text-sm sm:text-base text-stone-900">
                  Portal Pelajaran SD (Umum)
                </span>
              </div>
              {isSD ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Aktif</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  Pilih (Tekan OK)
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Kurikulum Sekolah Dasar Nasional <strong>tanpa embel-embel agama atau bahasa Arab</strong>. Fokus pada Matematika, Bahasa Indonesia, Sains IPA Dasar, Bahasa Inggris, dan Game Logika.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-blue-200/50 text-xs font-bold">
            <span className="text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-md text-[11px]">
              4 Pelajaran + 2 Game Logika
            </span>
            <span className="text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]">
              <span>Buka SD Umum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card B: Pelajaran Diniyah (Madrasah) */}
        <div
          tabIndex={0}
          role="button"
          onKeyDown={(e) => handleCardKeyDown(e, () => handleSwitchMode('diniyah'))}
          onClick={() => handleSwitchMode('diniyah')}
          className={`tv-card cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
            !isSD
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50/70 border-emerald-600 shadow-md ring-2 ring-emerald-500/20 translate-y-[-2px]'
              : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/60 shadow-xs'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕌</span>
                <span className="font-extrabold text-sm sm:text-base text-stone-900">
                  Portal Pelajaran Diniyah (Madrasah)
                </span>
              </div>
              {!isSD ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Aktif</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  Pilih (Tekan OK)
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Pendidikan Agama Islam & Bahasa Arab Terpadu. Mempelajari Bahasa Arab Dasar, Kaidah Imla’, Hukum Tajwid Tartil, Kanvas Khat Kaligrafi, Sambung Hijaiyah, dan Adab Santri.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-emerald-200/50 text-xs font-bold">
            <span className="text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md text-[11px]">
              4 Materi Diniyah + 5 Permainan
            </span>
            <span className="text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]">
              <span>Buka Diniyah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC HERO WELCOME BANNER (STRICTLY ADAPTIVE TO ACTIVE MODE) */}
      {isSD ? (
        /* SD UMUM BANNER: Pure educational, scientific, math themes - zero Arabic text or religious motifs */
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-8 shadow-md border border-blue-800">
          {/* Subtle Academic Watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none font-black text-[120px] sm:text-[160px] leading-none">
            123
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-800/80 border border-blue-700 rounded-full text-xs font-semibold text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Portal Pembelajaran Kurikulum SD Umum</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                Ruang Belajar Ceria <span className="text-amber-300">Pelajaran SD</span>
              </h1>

              <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                Temani belajarmu dengan materi Matematika bernalar, Bahasa Indonesia bertutur santun, Sains IPA eksploratif, dan Bahasa Inggris praktis serta tantangan game edukasi seru!
              </p>

              {/* Action Buttons for SD */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => handleFilterClick('lessons')}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-stone-900" />
                  <span>4 Pelajaran SD</span>
                </button>

                <button
                  onClick={() => handleFilterClick('games')}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 backdrop-blur-xs transition-all active:scale-95"
                >
                  <Dice5 className="w-4 h-4 text-amber-300" />
                  <span>2 Arena Game SD</span>
                </button>
              </div>

              {/* Quick Jump Chips for SD */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-blue-300 text-[11px] font-bold">Pilihan Cepat:</span>
                <button
                  onClick={() => handleNavigate('matematika')}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 border border-blue-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3 text-amber-300" />
                  <span>Matematika</span>
                </button>
                <button
                  onClick={() => handleNavigate('bahasa-indonesia')}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 border border-blue-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <BookMarked className="w-3 h-3 text-indigo-300" />
                  <span>B. Indonesia</span>
                </button>
                <button
                  onClick={() => handleNavigate('ipa')}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 border border-blue-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <Atom className="w-3 h-3 text-teal-300" />
                  <span>IPA Sains</span>
                </button>
                <button
                  onClick={() => handleNavigate('game-mengeja')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <SpellCheck className="w-3 h-3 text-emerald-300" />
                  <span>Game Mengeja</span>
                  <span className="text-[9px] bg-emerald-500 text-white px-1 rounded">Baru</span>
                </button>
                <button
                  onClick={() => handleNavigate('game-perkalian')}
                  className="px-2.5 py-1 rounded-lg bg-orange-500/25 hover:bg-orange-500/35 text-amber-200 border border-orange-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3 text-orange-300" />
                  <span>Game Perkalian</span>
                </button>
              </div>
            </div>

            {/* Character & Companion Showcase */}
            <div className="shrink-0 w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl flex flex-col gap-2.5 shadow-sm">
              <div className="flex items-center justify-center gap-3">
                {/* Karakter Siswa Sendiri */}
                <div
                  onClick={() => onOpenAvatarCreator?.('self')}
                  className="cursor-pointer group flex flex-col items-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/15"
                  title="Klik untuk mengubah Karakter Saya"
                >
                  <div className="w-14 h-16 sm:w-16 sm:h-18 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CharacterAvatar
                      config={progress.studentCharacter || {
                        name: progress.studentName,
                        avatarRole: 'self',
                        headwearType: 'topi',
                        hatStyle: 'topi_sd',
                        skinTone: 'warm_peach',
                        outfit: 'sd_merah',
                        handPose: 'peace',
                        accessory: 'medal',
                        auraEffect: 'stars'
                      }}
                      size="md"
                    />
                  </div>
                  <span className="font-extrabold text-[11px] sm:text-xs text-white mt-1 max-w-[80px] truncate text-center">
                    {progress.studentCharacter?.name || progress.studentName || 'Saya'}
                  </span>
                  <span className="text-[9px] text-amber-300 font-bold bg-black/25 px-1.5 py-0.2 rounded-full">
                    Karakter Saya 🎒
                  </span>
                </div>

                {/* Sahabat Belajar Mascot */}
                {progress.character && (
                  <div
                    onClick={() => onOpenAvatarCreator?.('companion')}
                    className="cursor-pointer group flex flex-col items-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/15"
                    title="Klik untuk mengubah Sahabat Belajar"
                  >
                    <div className="w-14 h-16 sm:w-16 sm:h-18 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CharacterAvatar config={progress.character} size="md" />
                    </div>
                    <span className="font-extrabold text-[11px] sm:text-xs text-white mt-1 max-w-[80px] truncate text-center">
                      {progress.character.name}
                    </span>
                    <span className="text-[9px] text-pink-300 font-bold bg-black/25 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <span>Teman</span>
                      <Heart className="w-2.5 h-2.5 fill-pink-300 text-pink-300" />
                    </span>
                  </div>
                )}
              </div>

              {onOpenAvatarCreator && (
                <button
                  onClick={() => onOpenAvatarCreator('self')}
                  className="w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 border border-white/25 active:scale-95 shadow-2xs"
                >
                  <Palette className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kustom Karakter & Elemen 🎨</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* DINIYAH BANNER: Islamic calligraphy, santri greetings, Quranic/Arabic motifs */
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-indigo-950 text-white p-5 sm:p-8 shadow-md border border-emerald-800">
          {/* Calligraphic Watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none font-arabic text-[120px] sm:text-[160px] leading-none">
            العِلْم
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/80 border border-emerald-700/80 rounded-full text-xs font-semibold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Portal Belajar Diniyah & Madrasah</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                Selamat Datang di <span className="text-amber-300">Pendidikan Diniyah</span>
              </h1>

              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                Ditemani santriwati teladan <strong>{progress.character?.name || 'Fatimah'}</strong>, pelajari Bahasa Arab, Kaidah Imla’, Tartil Al-Qur’an Tajwid, Kanvas Khat, serta permainan asah ketangkasan islami!
              </p>

              {/* Action Buttons for Diniyah */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => handleFilterClick('lessons')}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-stone-900" />
                  <span>4 Materi Diniyah</span>
                </button>

                <button
                  onClick={() => handleFilterClick('games')}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 backdrop-blur-xs transition-all active:scale-95"
                >
                  <Dice5 className="w-4 h-4 text-amber-300" />
                  <span>5 Arena Game Diniyah</span>
                </button>
              </div>

              {/* Quick Jump Chips for Diniyah */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-emerald-300 text-[11px] font-bold">Pilihan Cepat:</span>
                <button
                  onClick={() => handleNavigate('bahasa-arab')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>B. Arab</span>
                </button>
                <button
                  onClick={() => handleNavigate('imla')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Kaidah Imla’</span>
                </button>
                <button
                  onClick={() => handleNavigate('tajwid')}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/25 hover:bg-teal-500/35 text-teal-200 border border-teal-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Ilmu Tajwid</span>
                </button>
                <button
                  onClick={() => handleNavigate('sambung-hijaiyah')}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/25 hover:bg-teal-500/35 text-teal-200 border border-teal-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Sambung Hijaiyah</span>
                  <span className="text-[9px] bg-teal-500 text-white px-1 rounded">Baru</span>
                </button>
                <button
                  onClick={() => handleNavigate('ular-tangga')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Ular Tangga Santri</span>
                </button>
              </div>
            </div>

            {/* Character & Companion Showcase (Diniyah) */}
            <div className="shrink-0 w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl flex flex-col gap-2.5 shadow-sm">
              <div className="flex items-center justify-center gap-3">
                {/* Karakter Santri / Siswa Sendiri */}
                <div
                  onClick={() => onOpenAvatarCreator?.('self')}
                  className="cursor-pointer group flex flex-col items-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/15"
                  title="Klik untuk mengubah Karakter Santri Saya"
                >
                  <div className="w-14 h-16 sm:w-16 sm:h-18 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CharacterAvatar
                      config={progress.studentCharacter || {
                        name: progress.studentName,
                        avatarRole: 'self',
                        headwearType: 'peci',
                        peciStyle: 'songkok_hitam',
                        skinTone: 'warm_peach',
                        outfit: 'baju_koko',
                        handPose: 'peace',
                        accessory: 'medal',
                        auraEffect: 'sparkles'
                      }}
                      size="md"
                    />
                  </div>
                  <span className="font-extrabold text-[11px] sm:text-xs text-white mt-1 max-w-[80px] truncate text-center">
                    {progress.studentCharacter?.name || progress.studentName || 'Saya'}
                  </span>
                  <span className="text-[9px] text-emerald-300 font-bold bg-black/25 px-1.5 py-0.2 rounded-full">
                    Karakter Saya 🕌
                  </span>
                </div>

                {/* Sahabat Belajar Mascot */}
                {progress.character && (
                  <div
                    onClick={() => onOpenAvatarCreator?.('companion')}
                    className="cursor-pointer group flex flex-col items-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/15"
                    title="Klik untuk mengubah Sahabat Belajar"
                  >
                    <div className="w-14 h-16 sm:w-16 sm:h-18 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CharacterAvatar config={progress.character} size="md" />
                    </div>
                    <span className="font-extrabold text-[11px] sm:text-xs text-white mt-1 max-w-[80px] truncate text-center">
                      {progress.character.name}
                    </span>
                    <span className="text-[9px] text-pink-300 font-bold bg-black/25 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <span>Teman</span>
                      <Heart className="w-2.5 h-2.5 fill-pink-300 text-pink-300" />
                    </span>
                  </div>
                )}
              </div>

              {onOpenAvatarCreator && (
                <button
                  onClick={() => onOpenAvatarCreator('self')}
                  className="w-full py-1.5 px-2 bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-100 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 border border-emerald-400/30 active:scale-95 shadow-2xs"
                >
                  <Palette className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kustom Karakter Santri 🎨</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CATEGORIZED FILTER & CARD SECTION */}
      <div ref={sectionRef} className="space-y-4 pt-2">
        {/* Section Header & Segmented Filter Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
              {isSD
                ? activeFilter === 'all'
                  ? 'Seluruh Modul & Game Pelajaran SD'
                  : activeFilter === 'lessons'
                  ? 'Mata Pelajaran Kurikulum SD Umum'
                  : 'Arena Game Logika SD'
                : activeFilter === 'all'
                ? 'Seluruh Materi & Permainan Diniyah'
                : activeFilter === 'lessons'
                ? 'Materi Pembelajaran Diniyah & Madrasah'
                : 'Arena Permainan Edukasi Diniyah'}
            </h2>
            <p className="text-xs text-stone-500">
              {isSD
                ? 'Kurikulum nasional murni tanpa embel-embel agama atau bahasa Arab'
                : 'Pembelajaran agama islam, bahasa Arab, dan akhlak santriwati'}
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start sm:self-auto">
            <button
              onClick={() => handleFilterClick('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua ({isSD ? 6 : 9})
            </button>
            <button
              onClick={() => handleFilterClick('lessons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'lessons'
                  ? isSD
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 ${isSD ? 'text-blue-600' : 'text-emerald-600'}`} />
              <span>Pelajaran (4)</span>
            </button>
            <button
              onClick={() => handleFilterClick('games')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'games'
                  ? 'bg-white text-orange-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Dice5 className="w-3.5 h-3.5 text-orange-600" />
              <span>Game ({isSD ? 2 : 5})</span>
            </button>
          </div>
        </div>

        {/* 4. CARD GRID (STRICTLY SPLIT: NO ARABIC/RELIGION IN SD, COMPLETE DINIYAH IN DINIYAH) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {isSD ? (
            /* ====================== SD UMUM CARDS ONLY ====================== */
            <>
              {/* SD LESSON 1: Matematika Kelas 2 */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('matematika'))}
                  onClick={() => handleNavigate('matematika')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-amber-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        SD Kelas 2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        Matematika Kelas 2 SD
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Nilai tempat bilangan cacah sampai 1.000, konsep perkalian bergambar, pembagian adil, jam dinding, dan bangun datar geometri.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Pelajaran Matematika</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SD LESSON 2: Bahasa Indonesia Kelas 2 */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('bahasa-indonesia'))}
                  onClick={() => handleNavigate('bahasa-indonesia')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-indigo-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookMarked className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                        SD Kelas 2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-indigo-800 transition-colors">
                        Bahasa Indonesia Kelas 2 SD
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Membaca cerita santun nusantara, penerapan 4 kata ajaib, aturan huruf kapital di awal kalimat, tanda baca, dan lawan kata.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Pelajaran B. Indonesia</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SD LESSON 3: IPA & Sains Dasar */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('ipa'))}
                  onClick={() => handleNavigate('ipa')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-teal-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Atom className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                        Sains SD
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                        IPA & Sains Dasar SD
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Eksplorasi metamorfosis kupu-kupu & katak, rantai makanan ekosistem, sifat wujud benda padat cair gas, dan tata surya planet.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Pelajaran IPA</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SD LESSON 4: Bahasa Inggris SD */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('bahasa-inggris'))}
                  onClick={() => handleNavigate('bahasa-inggris')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-blue-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                        Bahasa Asing SD
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-blue-800 transition-colors">
                        Bahasa Inggris SD (English for Kids)
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Kosakata harian anak, audio pengucapan native speaker, dan permainan merangkai kata bahasa Inggris menjadi kalimat lengkap.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Pelajaran English</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SD GAME 1: Game Mengeja & Penyelamatan */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('game-mengeja'))}
                  onClick={() => handleNavigate('game-mengeja')}
                  className="tv-card group cursor-pointer bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-300 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                        <SpellCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                        Game Baru 🔥
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                        Misi Mengeja & Penyelamatan
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mt-1">
                        Tantangan interaktif mengeja kata Bahasa Indonesia & Inggris. Selamatkan sahabat belajarmu dari jeratan 5 tali sebelum waktu habis!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
                    <span>Mulai Misi Penyelamatan</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SD GAME 2: Tantangan Perkalian Ceria */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('game-perkalian'))}
                  onClick={() => handleNavigate('game-perkalian')}
                  className="tv-card group cursor-pointer bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-transparent border border-orange-300 hover:border-orange-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md border border-orange-300">
                        Game Logika
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-900 transition-colors">
                        Tantangan Perkalian Ceria
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mt-1">
                        Kuis kilat hitung cepat, taklukkan menara monster bilangan dengan jawaban perkalian tepat, dan eksplorasi tabel matriks 10×10.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-orange-200/60 text-xs font-bold text-orange-800 group-hover:translate-x-1 transition-transform">
                    <span>Mulai Main Perkalian</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ====================== DINIYAH CARDS ONLY ====================== */
            <>
              {/* DINIYAH LESSON 1: Bahasa Arab Dasar */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('bahasa-arab'))}
                  onClick={() => handleNavigate('bahasa-arab')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        Bahasa Arab
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        Kosakata Bahasa Arab Dasar
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Mufrodat benda kelas, anggota tubuh, warna, keluarga dengan gambar menarik dan pelafalan audio jernih.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Bahasa Arab</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH LESSON 2: Kaidah Imla' Madrasah */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('imla'))}
                  onClick={() => handleNavigate('imla')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        Menulis Arab
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        Kaidah Imla’ Madrasah
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Pedoman menyambung huruf Hijaiyah di awal, tengah, dan akhir, 6 huruf pemutus ke kiri, serta ta marbuthah.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Kaidah Imla’</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH LESSON 3: Ilmu Tajwid Tartil */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('tajwid'))}
                  onClick={() => handleNavigate('tajwid')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-teal-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                        Tartil Al-Qur'an
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                        Hukum Ilmu Tajwid Tartil
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Kaidah Nun Sukun & Tanwin, Mim Sukun, Alif Lam Qomariyah/Syamsiyah, Qalqalah pantulan, dan contoh ayat Al-Qur'an.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Ilmu Tajwid</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH LESSON 4: Kanvas Khat Arab */}
              {(activeFilter === 'all' || activeFilter === 'lessons') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('kanvas'))}
                  onClick={() => handleNavigate('kanvas')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <PenTool className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        Praktik Khat
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        Kanvas Khat Kaligrafi Arab
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Papan tulis digital interaktif dengan garis panduan buku halus-kasar untuk melatih keluwesan goresan pena huruf Arab.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Buka Kanvas Khat</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH GAME 1: Sambung Hijaiyah */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('sambung-hijaiyah'))}
                  onClick={() => handleNavigate('sambung-hijaiyah')}
                  className="tv-card group cursor-pointer bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-transparent border border-teal-300 hover:border-teal-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md border border-teal-300">
                        Game Baru 🔥
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-900 transition-colors">
                        Sambung Hijaiyah
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mt-1">
                        Tantangan merangkai potongan huruf Hijaiyah menjadi kata bersambung yang tepat dan kuasai 6 huruf pemutus.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-teal-200/60 text-xs font-bold text-teal-800 group-hover:translate-x-1 transition-transform">
                    <span>Mulai Sambung Huruf</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH GAME 2: Ular Tangga Santri */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('ular-tangga'))}
                  onClick={() => handleNavigate('ular-tangga')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Dice5 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        Adab Santri
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        Ular Tangga Santri Ceria
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        100 kotak kebaikan, tangga kebajikan akhlak mulia, dan pesan santun menghormati guru dan orang tua.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Main Ular Tangga</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH GAME 3: Kartu Memori Mufrodat */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('kartu-memori'))}
                  onClick={() => handleNavigate('kartu-memori')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-purple-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Brain className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">
                        Asah Otak
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-purple-800 transition-colors">
                        Kartu Memori Mufrodat
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Buka pasangan kartu tertutup untuk mencocokkan kata bahasa Arab, terjemahan, dan ilustrasi gambar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
                    <span>Main Kartu Memori</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH GAME 4: Roda Putar Hadiah */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('roda-putar'))}
                  onClick={() => handleNavigate('roda-putar')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-amber-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        Hadiah Bintang
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        Roda Putar Hadiah Diniyah
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Putar roda kuis ceria berhadiah bintang prestasi dengan menjawab pertanyaan seputar mufrodat & tajwid.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                    <span>Putar Roda Hadiah</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* DINIYAH GAME 5: Kuis Evaluasi Diniyah */}
              {(activeFilter === 'all' || activeFilter === 'games') && (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleCardKeyDown(e, () => handleNavigate('kuis'))}
                  onClick={() => handleNavigate('kuis')}
                  className="tv-card group cursor-pointer bg-white border border-stone-200 hover:border-yellow-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-200/60">
                        Ujian Madrasah
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-yellow-800 transition-colors">
                        Kuis Evaluasi Diniyah Terpadu
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Evaluasi komprehensif 10 soal acak pilihan ganda materi bahasa Arab, kaidah imla’, dan hukum tajwid.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-yellow-700 group-hover:translate-x-1 transition-transform">
                    <span>Mulai Kuis Diniyah</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
