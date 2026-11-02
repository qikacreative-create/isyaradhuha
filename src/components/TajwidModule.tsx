import React, { useState } from 'react';
import { TajwidRule, QuranSurahStudy } from '../types';
import { TAJWID_RULES, QURAN_SURAHS } from '../data/tajwidData';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, BookOpen, BookmarkCheck, CheckCircle2 } from 'lucide-react';

interface TajwidModuleProps {
  onEarnStar: (stars: number) => void;
}

export const TajwidModule: React.FC<TajwidModuleProps> = ({ onEarnStar }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRule, setSelectedRule] = useState<TajwidRule>(TAJWID_RULES[0]);
  const [activeTab, setActiveTab] = useState<'hukum' | 'lab-ayat'>('hukum');

  // Lab Ayat State
  const [selectedSurah, setSelectedSurah] = useState<QuranSurahStudy>(QURAN_SURAHS[0]);
  const [activeTajwidSpot, setActiveTajwidSpot] = useState<{
    targetText: string;
    ruleName: string;
    explanation: string;
    color: string;
  } | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Hukum' },
    { id: 'nun_sukun', label: 'Nun Sukun & Tanwin' },
    { id: 'mim_sukun', label: 'Mim Sukun' },
    { id: 'alif_lam', label: 'Alif Lam (ال)' },
    { id: 'qalqalah', label: 'Qalqalah' },
    { id: 'mad', label: 'Hukum Mad' }
  ];

  const filteredRules = activeCategory === 'all'
    ? TAJWID_RULES
    : TAJWID_RULES.filter(r => r.category === activeCategory);

  const handlePlayVoice = (text: string) => {
    soundAudio.speakArabic(text);
  };

  const handleSpotClick = (spot: {
    targetText: string;
    ruleName: string;
    explanation: string;
    color: string;
  }) => {
    setActiveTajwidSpot(spot);
    soundAudio.speakArabic(spot.targetText);
    soundAudio.playTing();
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-cyan-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none font-quran text-9xl">
          تَجْوِيد
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Ilmu Tajwid Dasar Madrasah Ibtidaiyah</span>
            <span>·</span>
            <span>Tata Cara Membaca Al-Qur’an</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Belajar Ilmu Tajwid & Laboratorium Ayat
          </h1>
          <p className="text-teal-100 text-sm leading-relaxed mb-4">
            Tajwid mengajarkan kita mengeluarkan setiap huruf dari tempat keluarnya (makhraj) dengan memberikan sifat aslinya secara benar dan indah.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('hukum')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'hukum'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Daftar Kaidah Hukum Tajwid</span>
            </button>
            <button
              onClick={() => setActiveTab('lab-ayat')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'lab-ayat'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Laboratorium Ayat Berwarna (Color-Coded)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Daftar Kaidah Tajwid */}
      {activeTab === 'hukum' && (
        <div className="space-y-6">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List of Rules */}
            <div className="lg:col-span-5 space-y-2.5">
              {filteredRules.map(rule => {
                const isSelected = selectedRule.id === rule.id;
                return (
                  <button
                    key={rule.id}
                    onClick={() => setSelectedRule(rule)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/30 shadow-xs'
                        : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: rule.color }}
                        />
                        <span className="font-bold text-sm text-slate-900">{rule.name}</span>
                      </div>
                      <span className="font-arabic text-lg font-bold text-emerald-800">
                        {rule.arabicName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 line-clamp-1">{rule.badgeText}</span>
                      <span className="font-arabic text-xs font-semibold text-slate-600 mr-1">
                        {rule.lettersArabic}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Rule Detail Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedRule.color }}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Hukum Tajwid
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-emerald-700">
                      {selectedRule.badgeText}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedRule.name}</h2>
                </div>
                <div className="text-right">
                  <span className="font-arabic text-3xl font-bold text-emerald-800 block">
                    {selectedRule.arabicName}
                  </span>
                  {selectedRule.harakatCount && (
                    <span className="text-xs font-medium text-slate-500">
                      Ukuran: {selectedRule.harakatCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Huruf & Kaidah */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Huruf-Huruf Tajwid:
                </span>
                <div className="font-arabic text-2xl font-bold text-emerald-900 bg-white p-3 rounded-lg border border-slate-100 text-center tracking-wider">
                  {selectedRule.lettersArabic}
                </div>
                <p className="text-xs text-slate-600 mt-1">{selectedRule.definition}</p>
              </div>

              {/* Cara Membaca */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cara Membaca Santri:</span>
                </div>
                <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                  {selectedRule.howToRead}
                </p>
              </div>

              {/* Contoh Al-Qur'an */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">
                  Contoh Potongan Ayat Al-Qur’an:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRule.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {ex.surahRef}
                        </span>
                        <button
                          onClick={() => handlePlayVoice(ex.phrase)}
                          className="p-1 text-slate-400 hover:text-emerald-700 rounded-md"
                          title="Dengar pelafalan"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-center py-2 bg-white rounded-lg border border-slate-100">
                        <span className="font-quran text-2xl font-bold text-slate-900">
                          {ex.phrase}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-emerald-800">Analisis:</span>{' '}
                        {ex.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio feedback actions */}
              <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
                {selectedRule.category === 'qalqalah' && (
                  <button
                    onClick={() => soundAudio.playQalqalahBounce()}
                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <span>Simulasi Pantulan Qalqalah</span>
                  </button>
                )}
                {(selectedRule.id.includes('bighunnah') || selectedRule.id.includes('ikhfa')) && (
                  <button
                    onClick={() => soundAudio.playGhunnahHum()}
                    className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <span>Simulasi Dengung Ghunnah (2 Harakat)</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    onEarnStar(1);
                    soundAudio.playSuccessChime();
                    confetti({ particleCount: 30, spread: 50 });
                  }}
                  className="ml-auto px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tandai Paham (+1 Bintang)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Laboratorium Ayat Color-Coded Reader */}
      {activeTab === 'lab-ayat' && (
        <div className="space-y-6">
          {/* Surah Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pilih Surah untuk Dianalisis:
              </span>
              <span className="text-xs text-emerald-700 font-semibold">
                Klik kata yang diwarnai untuk membuka penjelasan kaidah tajwid
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {QURAN_SURAHS.map(surah => {
                const isSelected = selectedSurah.id === surah.id;
                return (
                  <button
                    key={surah.id}
                    onClick={() => {
                      setSelectedSurah(surah);
                      setActiveTajwidSpot(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{surah.name}</span>
                    <span className="font-arabic font-normal ml-1.5 text-sm">({surah.arabicName})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color legend */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="text-amber-900 font-bold">Panduan Warna:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span className="text-slate-700">Ikhfa’ / Ghunnah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
              <span className="text-slate-700">Idgham / Al-Syamsiyah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
              <span className="text-slate-700">Idzhar / Al-Qamariyah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span className="text-slate-700">Qalqalah (Pantulan)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span className="text-slate-700">Mad (Panjang)</span>
            </div>
          </div>

          {/* Ayat-Ayat Display */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="text-center border-b border-slate-100 pb-4">
              <h3 className="font-arabic text-3xl font-bold text-emerald-950 mb-1">
                سُورَةُ {selectedSurah.arabicName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Surah {selectedSurah.name} · {selectedSurah.meaning}
              </p>
            </div>

            <div className="space-y-6">
              {selectedSurah.ayahs.map(ayah => (
                <div
                  key={ayah.number}
                  className="p-5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {ayah.number}
                    </span>
                    <button
                      onClick={() => handlePlayVoice(ayah.arabicText)}
                      className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg flex items-center gap-1 text-xs"
                      title="Dengarkan ayat"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Dengar Ayat</span>
                    </button>
                  </div>

                  {/* Arabic Text with Highlighted Tajwid spots */}
                  <div className="text-right py-2 leading-loose">
                    <span className="font-quran text-2xl sm:text-3xl text-slate-900 leading-[2.4]">
                      {ayah.arabicText}
                    </span>
                  </div>

                  {/* Spot buttons */}
                  {ayah.tajwidSpots.length > 0 && (
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400">
                        Titik Tajwid di ayat ini:
                      </span>
                      {ayah.tajwidSpots.map((spot, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSpotClick(spot)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
                          style={{
                            backgroundColor: `${spot.color}15`,
                            color: spot.color,
                            border: `1px solid ${spot.color}50`
                          }}
                        >
                          <span className="font-arabic mr-1">{spot.targetText}</span>
                          <span>({spot.ruleName})</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 italic">
                    "{ayah.translation}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Spot Modal / Inspection Sheet */}
          {activeTajwidSpot && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: activeTajwidSpot.color }}
                    />
                    <h4 className="font-bold text-slate-900 text-sm">
                      {activeTajwidSpot.ruleName}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTajwidSpot(null)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="font-quran text-3xl font-bold text-slate-950 block mb-1">
                    {activeTajwidSpot.targetText}
                  </span>
                  <button
                    onClick={() => soundAudio.speakArabic(activeTajwidSpot.targetText)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 rounded-md text-xs font-semibold text-emerald-800 border border-slate-200 shadow-2xs mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Lafadz Ini</span>
                  </button>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <span className="font-bold block mb-1">Kaidah Tajwid:</span>
                  {activeTajwidSpot.explanation}
                </div>

                <button
                  onClick={() => {
                    setActiveTajwidSpot(null);
                    onEarnStar(1);
                    soundAudio.playSuccessChime();
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Paham! Tutup & Ambil Bintang (+1)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
