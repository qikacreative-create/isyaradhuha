import React, { useState } from 'react';
import { CharacterConfig, TabType, CurriculumMode } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundAudio } from '../utils/audio';
import { Volume2, Sparkles, Wand2, ChevronDown, ChevronUp } from 'lucide-react';

interface CompanionWidgetProps {
  config: CharacterConfig;
  currentTab: TabType;
  curriculumMode?: CurriculumMode;
  onOpenCreator: () => void;
}

export const CompanionWidget: React.FC<CompanionWidgetProps> = ({
  config,
  currentTab,
  curriculumMode = 'sd',
  onOpenCreator
}) => {
  const [isTalking, setIsTalking] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isSD = curriculumMode === 'sd' || ['matematika', 'bahasa-indonesia', 'ipa', 'bahasa-inggris', 'game-perkalian', 'game-mengeja'].includes(currentTab);

  // Contextual messages strictly separated between SD (general, non-religious) and Diniyah
  const getContextMessage = () => {
    if (isSD) {
      switch (currentTab) {
        case 'matematika':
          return {
            title: 'Matematika SD:',
            badge: 'Logika & Angka 📐',
            text: '“Ayo hitung dari nilai satuan dulu ya! Ingat, perkalian adalah penjumlahan berulang yang menyenangkan!”',
            voiceText: 'Ayo semangat berhitung matematika! Hitung dengan teliti dari angka satuan dulu ya sahabatku.'
          };
        case 'bahasa-indonesia':
          return {
            title: 'Bahasa Indonesia SD:',
            badge: 'Tutur Santun & Ejaan 🇮🇩',
            text: '“Selalu ingat 4 kata ajaib: Tolong, Terima Kasih, Maaf, dan Permisi. Serta gunakan huruf kapital di awal kalimat ya!”',
            voiceText: 'Ayo biasakan bertutur kata santun dan gunakan tanda baca dengan tepat!'
          };
        case 'ipa':
          return {
            title: 'Laboratorium Sains SD:',
            badge: 'Eksplorasi Alam 🔬',
            text: '“Perhatikan bagaimana ulat bermetamorfosis menjadi kupu-kupu yang indah. Eksplorasi sains selalu seru!”',
            voiceText: 'Perhatikan tahapan sains dan metamorfosisnya ya! Alam semesta menyimpan banyak hal seru untuk kita pelajari.'
          };
        case 'bahasa-inggris':
          return {
            title: 'English Fun Time:',
            badge: 'Daily English 🇬🇧',
            text: '“Don’t worry about making mistakes! Let’s practice English pronunciation and vocabulary together every day.”',
            voiceText: 'You are doing great! Let us practice English together!'
          };
        case 'game-perkalian':
          return {
            title: 'Tantangan Perkalian SD:',
            badge: 'Berhitung Cepat ✖️',
            text: '“Kuasai tabel perkalian bilangan agar kamu bisa mengalahkan menara bilangan dengan cepat!”',
            voiceText: 'Ayo asah kecepatan berhitung perkalianmu!'
          };
        case 'game-mengeja':
          return {
            title: 'Misi Mengeja SD:',
            badge: 'Kosa Kata Tepat 🔤',
            text: '“Eja setiap huruf dengan teliti agar sahabatmu terbebas dari tali jeratan!”',
            voiceText: 'Ayo eja huruf demi huruf dengan cermat untuk menyelamatkan sahabatmu!'
          };
        default:
          return {
            title: 'Sahabat Belajar SD:',
            badge: 'Semangat Belajar ⭐',
            text: `“Halo! Aku ${config.name}, siap menemanimu belajar Matematika, Bahasa Indonesia, Sains, dan Bahasa Inggris!”`,
            voiceText: `Halo! Aku ${config.name}, siap menemanimu belajar dengan penuh semangat!`
          };
      }
    }

    // Diniyah & Madrasah context messages
    switch (currentTab) {
      case 'imla':
        return {
          title: 'Tips Imla’ Santriwati:',
          arabic: 'اكْتُبِي بِخَطٍّ جَمِيلٍ',
          text: `“Perhatikan huruf yang tidak bisa digandeng ke kiri ya! Goreskan pena dari kanan ke kiri dengan tenang.”`,
          voiceText: 'Ayo perhatikan huruf yang tidak bisa menyambung ya ukhti! Tulis dengan rapi dan indah.'
        };
      case 'tajwid':
        return {
          title: 'Adab Tartil Al-Qur’an:',
          arabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
          text: `“Tahan dengung 2 harakat pada huruf Ghunnah dan Ikhfa’, serta pantulkan huruf Qalqalah dengan pas ya!”`,
          voiceText: 'Tahan dengung 2 harakat pada bacaan Ghunnah ya ukhti, dan bacalah Al-Qur’an dengan tartil.'
        };
      case 'bahasa-arab':
        return {
          title: 'Kalam Arab Ceria:',
          arabic: 'تَعَلَّمِي الْعَرَبِيَّةَ بِفَرَحٍ',
          text: `“Ayo kita lafalkan kosakata ini bersama. Ucapkan dengan lantang agar lidah kita terbiasa dan fasih!”`,
          voiceText: 'Ayo kita hafalkan kosakata bahasa Arab ini bersama-sama ya!'
        };
      case 'kanvas':
        return {
          title: 'Latihan Khat & Kaligrafi:',
          arabic: 'الْخَطُّ الْحَسَنُ زِينَةٌ',
          text: `“Ikuti garis panduan buku halus-kasar ya. Puncak huruf dan ekornya perhatikan batas garisnya!”`,
          voiceText: 'Ikuti garis panduan buku halus kasar ya, tulis dari kanan ke kiri!'
        };
      case 'kuis':
        return {
          title: 'Semangat Kuis Evaluasi:',
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          text: `“Bismillah, baca setiap pertanyaan dengan teliti ya. Aku yakin kamu pasti bisa meraih nilai Mumtaz!”`,
          voiceText: 'Bismillah! Baca soalnya dengan teliti ya ukhti. Kamu pasti bisa!'
        };
      default:
        return {
          title: 'Sahabat Santriwati:',
          arabic: 'أَهْلًا وَسَهْلًا بِكِ',
          text: `“Assalamu’alaikum! Aku ${config.name}, siap menemanimu belajar materi Diniyah dan Madrasah!”`,
          voiceText: `Assalamu'alaikum! Aku ${config.name}, siap menemanimu belajar materi diniyah dengan semangat!`
        };
    }
  };

  const message = getContextMessage();

  const handleSpeak = () => {
    setIsTalking(true);
    soundAudio.playTing();
    if (isSD) {
      if (currentTab === 'bahasa-inggris') {
        soundAudio.speakEnglish(message.voiceText);
      } else {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(message.voiceText);
          utterance.lang = 'id-ID';
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      }
    } else {
      if (currentTab === 'bahasa-inggris') {
        soundAudio.speakEnglish(message.voiceText);
      } else {
        if ('arabic' in message && message.arabic) {
          soundAudio.speakArabic(message.arabic);
          setTimeout(() => {
            soundAudio.speakArabic(message.voiceText);
          }, 1000);
        } else {
          soundAudio.speakArabic(message.voiceText);
        }
      }
    }
    setTimeout(() => setIsTalking(false), 3000);
  };

  if (isCollapsed) {
    return (
      <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl px-3 py-2 shadow-2xs flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-white border border-amber-300 flex items-center justify-center shrink-0">
            <CharacterAvatar config={config} size="sm" className="scale-75" />
          </div>
          <p className="text-stone-700 font-medium truncate">
            <strong>{config.name}:</strong> “{message.text.replace(/[“”"]/g, '')}”
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSpeak}
            className="p-1 text-emerald-800 hover:bg-emerald-100 rounded-md transition-colors"
            title="Dengarkan Suara"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-stone-900 px-2 py-0.5 rounded-md hover:bg-white/80 transition-colors"
          >
            <span>Buka Saran</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-rose-50/40 to-emerald-50/50 border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-2xs flex flex-row items-center gap-3 sm:gap-4 transition-all relative">
      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(true)}
        title="Ciutkan pesan agar tampilan lebih luas"
        className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700 hover:bg-white/60 rounded-lg transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Character Display */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-12 h-14 sm:w-16 sm:h-20 flex items-center justify-center">
          <CharacterAvatar
            config={config}
            size="sm"
            isSpeaking={isTalking}
            showBadge={false}
          />
        </div>
        <button
          onClick={onOpenCreator}
          title="Ubah busana & tampilan karakter"
          className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-white/90 hover:bg-white border border-emerald-300 px-1.5 py-0.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
        >
          <Wand2 className="w-2.5 h-2.5 text-emerald-600" />
          <span>Ganti Baju</span>
        </button>
      </div>

      {/* Speech Bubble / Encouragement */}
      <div className="flex-1 min-w-0 text-left space-y-1 pr-6">
        <div className="flex items-center flex-wrap gap-1 sm:gap-2">
          <span className="font-extrabold text-xs text-slate-900 truncate">
            {config.name} {isSD ? '(Sahabat Belajar SD)' : `(${config.companionTitle})`}
          </span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate ${
            isSD ? 'text-indigo-800 bg-indigo-100/70' : 'text-emerald-800 bg-emerald-100/70'
          }`}>
            {message.title}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
          {message.text}
        </p>

        <div className="pt-0.5 flex items-center flex-wrap gap-1.5 sm:gap-2">
          {isSD ? (
            <span className="font-bold text-xs text-indigo-900 bg-white/80 px-2 py-0.5 rounded-lg border border-indigo-200/50 truncate max-w-[200px] sm:max-w-none">
              {('badge' in message && message.badge) || 'Semangat Belajar SD ⭐'}
            </span>
          ) : (
            <span className="font-arabic font-bold text-xs text-emerald-900 bg-white/70 px-2 py-0.5 rounded-lg border border-amber-200/50 truncate max-w-[200px] sm:max-w-none">
              {'arabic' in message && message.arabic}
            </span>
          )}
          <button
            onClick={handleSpeak}
            className={`p-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-all ${
              isSD 
                ? 'text-indigo-800 bg-white hover:bg-indigo-50 border border-indigo-200'
                : 'text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200'
            }`}
            title="Dengarkan suara motivasi"
          >
            <Volume2 className={`w-3 h-3 animate-pulse ${isSD ? 'text-indigo-600' : 'text-emerald-600'}`} />
            <span>Suara</span>
          </button>
        </div>
      </div>

      {/* Quick Customize Action button on large screen */}
      <div className="shrink-0 hidden lg:block">
        <button
          onClick={onOpenCreator}
          className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Kustom</span>
        </button>
      </div>
    </div>
  );
};
