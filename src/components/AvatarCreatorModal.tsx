import React, { useState, useEffect } from 'react';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  X,
  Check,
  Volume2,
  Heart,
  Palette,
  Shirt,
  Smile,
  HandMetal,
  User,
  Sparkle,
  Compass,
  Trophy,
  Glasses,
  Crown,
  Bookmark,
  CheckCircle2,
  Sun
} from 'lucide-react';

interface AvatarCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: CharacterConfig; // Companion config
  studentConfig?: CharacterConfig; // Student's personal character
  studentName?: string;
  initialRole?: 'self' | 'companion';
  onSaveConfig: (config: CharacterConfig, role: 'self' | 'companion') => void;
  onEarnStar: (stars: number) => void;
}

export const AvatarCreatorModal: React.FC<AvatarCreatorModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  studentConfig,
  studentName = 'Siswa Hebat',
  initialRole = 'self',
  onSaveConfig,
  onEarnStar
}) => {
  // Mode switcher: 'self' = Karakter Siswa Sendiri, 'companion' = Teman Bermain / Sahabat Belajar
  const [activeRole, setActiveRole] = useState<'self' | 'companion'>(initialRole);

  // Default fallback for student character if not provided
  const defaultStudentChar: CharacterConfig = studentConfig || {
    name: studentName,
    avatarRole: 'self',
    gender: 'perempuan',
    headwearType: 'hijab',
    hijabColor: '#ffffff',
    hijabStyle: 'bergo_sekolah',
    peciStyle: 'songkok_hitam',
    hatStyle: 'topi_sd',
    hairStyle: 'pendek_rapi',
    hairColor: '#1e293b',
    eyeExpression: 'star_eyes',
    mouthExpression: 'sweet_smile',
    blushStyle: 'rosy',
    faceMark: 'none',
    skinTone: 'warm_peach',
    handPose: 'peace',
    outfit: 'sd_merah',
    accessory: 'medal',
    auraEffect: 'stars',
    companionTitle: 'Siswa Berprestasi'
  };

  const defaultCompanionChar: CharacterConfig = currentConfig || {
    name: 'Fatimah',
    avatarRole: 'companion',
    gender: 'perempuan',
    headwearType: 'hijab',
    hijabColor: '#059669',
    hijabStyle: 'bergo_sekolah',
    peciStyle: 'songkok_hitam',
    hatStyle: 'topi_sd',
    hairStyle: 'pendek_rapi',
    hairColor: '#1e293b',
    eyeExpression: 'sparkle',
    mouthExpression: 'laugh_happy',
    blushStyle: 'sparkles',
    faceMark: 'none',
    skinTone: 'warm_peach',
    handPose: 'waving',
    outfit: 'mi_hijau',
    accessory: 'star_pin',
    auraEffect: 'sparkles',
    companionTitle: 'Sahabat Belajar'
  };

  const [selfCharacter, setSelfCharacter] = useState<CharacterConfig>(defaultStudentChar);
  const [companionCharacter, setCompanionCharacter] = useState<CharacterConfig>(defaultCompanionChar);

  // Active character currently being edited
  const character = activeRole === 'self' ? selfCharacter : companionCharacter;
  const setCharacter = (updater: (prev: CharacterConfig) => CharacterConfig) => {
    if (activeRole === 'self') {
      setSelfCharacter(updater);
    } else {
      setCompanionCharacter(updater);
    }
  };

  const [activeTab, setActiveTab] = useState<
    'role_identity' | 'headwear' | 'colors' | 'outfit' | 'face' | 'hands' | 'accessories' | 'aura'
  >('role_identity');
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    if (studentConfig) {
      setSelfCharacter(studentConfig);
    }
    if (currentConfig) {
      setCompanionCharacter(currentConfig);
    }
  }, [studentConfig, currentConfig]);

  if (!isOpen) return null;

  const COLOR_PALETTES = [
    { label: 'Putih Bersih SD/MI', hex: '#ffffff', border: '#cbd5e1' },
    { label: 'Hijau Madrasah', hex: '#059669', border: '#047857' },
    { label: 'Biru Navy SD', hex: '#1d4ed8', border: '#1e40af' },
    { label: 'Merah SD Berani', hex: '#dc2626', border: '#b91c1c' },
    { label: 'Pink Pastel Ceria', hex: '#f472b6', border: '#db2777' },
    { label: 'Ungu Anggun', hex: '#8b5cf6', border: '#7c3aed' },
    { label: 'Cokelat Pramuka', hex: '#78350f', border: '#92400e' },
    { label: 'Hitam Songkok', hex: '#0f172a', border: '#334155' },
    { label: 'Kuning Bintang', hex: '#fbbf24', border: '#d97706' }
  ];

  const HAIR_COLORS = [
    { label: 'Hitam Alami', hex: '#1e293b' },
    { label: 'Cokelat Gelap', hex: '#451a03' },
    { label: 'Cokelat Madu', hex: '#78350f' },
    { label: 'Abu Lembut', hex: '#64748b' }
  ];

  const SELF_NAME_SUGGESTIONS = [
    studentName || 'Aisyah Putri',
    'Ahmad Fauzi',
    'Zahra Humaira',
    'Rizky Pratama',
    'Salma Salsabila',
    'Bilal Al-Fatih',
    'Khadijah'
  ];

  const COMPANION_NAME_SUGGESTIONS = [
    'Fatimah',
    'Hasan',
    'Maryam',
    'Zaid',
    'Aisyah',
    'Ali',
    'Nuha'
  ];

  const handleTestVoice = () => {
    setIsTalking(true);
    soundAudio.playSuccessChime();
    if (activeRole === 'self') {
      soundAudio.speakIndonesian(
        `Halo! Namaku ${character.name}. Ini adalah avatar karakternya sendiri untuk belajar!`
      );
    } else {
      soundAudio.speakArabic(`السَّلَامُ عَلَيْكُمْ، أَنَا ${character.name}`);
      setTimeout(() => {
        soundAudio.speakEnglish(`Hello! I am ${character.name}, your study friend. Let's learn together!`);
      }, 1200);
    }
    setTimeout(() => setIsTalking(false), 3200);
  };

  const handleSave = () => {
    // Save active character
    onSaveConfig(character, activeRole);
    soundAudio.playFanfare();
    onEarnStar(3);
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 max-h-[94vh] flex flex-col space-y-4">
        {/* Header with Close */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-pink-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-2">
                <span>Studio Desain Karakter Ceria</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full uppercase">
                  Multi-Karakter
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Kustomisasi karakter sendiri (avatar siswa) & sahabat bermain dengan elemen lengkap
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundAudio.playPop();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOP ROLE SELECTOR: KARAKTER SAYA VS TEMAN BELAJAR */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              soundAudio.playTing();
              setActiveRole('self');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeRole === 'self'
                ? 'bg-white text-indigo-900 shadow-md ring-2 ring-indigo-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <User className={`w-4 h-4 ${activeRole === 'self' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Karakter Saya (Avatar Siswa)</span>
            <span className="hidden sm:inline text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-full font-bold">
              Profil & Rapor
            </span>
          </button>

          <button
            onClick={() => {
              soundAudio.playTing();
              setActiveRole('companion');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeRole === 'companion'
                ? 'bg-white text-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeRole === 'companion' ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
            <span>Teman Belajar (Sahabat Bermain)</span>
            <span className="hidden sm:inline text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">
              Maskot Materi
            </span>
          </button>
        </div>

        {/* Content Layout: Left Preview, Right Tabs and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 flex-1 overflow-y-auto pr-1">
          {/* Left Preview Box */}
          <div className="md:col-span-4 bg-gradient-to-b from-indigo-50/70 via-rose-50/50 to-amber-50/60 p-4 sm:p-5 rounded-3xl border border-indigo-100 flex flex-col items-center text-center space-y-3 shadow-inner">
            <div className="relative">
              <CharacterAvatar
                config={character}
                size="xl"
                isSpeaking={isTalking}
              />
              <span className={`absolute -top-1 -right-1 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider ${
                activeRole === 'self' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {activeRole === 'self' ? 'Karakter Saya' : 'Teman Belajar'}
              </span>
            </div>

            {/* Name & Title */}
            <div>
              <div className="font-black text-lg text-slate-900">{character.name || 'Tanpa Nama'}</div>
              <div className={`text-xs font-bold px-3 py-0.5 rounded-full inline-block mt-0.5 ${
                activeRole === 'self'
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {character.companionTitle || (activeRole === 'self' ? 'Siswa Berprestasi' : 'Sahabat Cerdas')}
              </div>
            </div>

            {/* Sapa / Test Voice Button */}
            <button
              onClick={handleTestVoice}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Sapa & Uji Suara</span>
            </button>

            {/* Hint Notice */}
            <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200 w-full text-center">
              {activeRole === 'self'
                ? '⭐ Karakter ini akan tampil di Rapor Prestasi & Kartu Identitas Belajarmu.'
                : '🧕 Teman Belajar akan menyapamu di setiap modul & arena latihan soal.'}
            </div>
          </div>

          {/* Right Customization Panel */}
          <div className="md:col-span-8 flex flex-col space-y-3 min-h-[360px]">
            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {[
                { id: 'role_identity', label: 'Identitas', icon: <User className="w-3.5 h-3.5" /> },
                { id: 'headwear', label: 'Tutup Kepala / Rambut', icon: <Crown className="w-3.5 h-3.5" /> },
                { id: 'colors', label: 'Warna & Kulit', icon: <Palette className="w-3.5 h-3.5" /> },
                { id: 'outfit', label: 'Seragam', icon: <Shirt className="w-3.5 h-3.5" /> },
                { id: 'face', label: 'Wajah & Emosi', icon: <Smile className="w-3.5 h-3.5" /> },
                { id: 'hands', label: 'Pose Tangan', icon: <HandMetal className="w-3.5 h-3.5" /> },
                { id: 'accessories', label: 'Aksesori', icon: <Glasses className="w-3.5 h-3.5" /> },
                { id: 'aura', label: 'Efek Aura', icon: <Sparkles className="w-3.5 h-3.5" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundAudio.playTing();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: IDENTITAS */}
            {activeTab === 'role_identity' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {activeRole === 'self' ? 'Nama Siswa (Karakter Sendiri):' : 'Nama Teman Belajar (Sahabat):'}
                  </label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={e => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Masukkan nama karakter..."
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-indigo-600 font-bold text-slate-800"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold self-center">Saran Cepat:</span>
                    {(activeRole === 'self' ? SELF_NAME_SUGGESTIONS : COMPANION_NAME_SUGGESTIONS).map(name => (
                      <button
                        key={name}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, name }));
                        }}
                        className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                          character.name === name
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Gelar / Julukan Karakter:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Siswa Berprestasi',
                      'Santri Cerdas',
                      'Bintang Kelas SD',
                      'Juara Cilik',
                      'Ilmuwan Cilik',
                      'Sahabat Ceria'
                    ].map(title => (
                      <button
                        key={title}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, companionTitle: title }));
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-left ${
                          character.companionTitle === title
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TUTUP KEPALA & RAMBUT */}
            {activeTab === 'headwear' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Tipe Penutup Kepala atau Rambut:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'hijab', label: '🧕 Hijab / Jilbab', desc: '4 Model Syari & Modis' },
                      { id: 'peci', label: '🕌 Peci / Kopiah', desc: 'Santri & Pelajar Muslim' },
                      { id: 'topi', label: '🧢 Topi Sekolah', desc: 'Topi SD & Baret Pramuka' },
                      { id: 'rambut', label: '✂️ Gaya Rambut', desc: 'Pendek, Kuncir & Ikal' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, headwearType: type.id as any }));
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          (character.headwearType || 'hijab') === type.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-extrabold text-xs">{type.label}</div>
                        <div className={`text-[10px] mt-0.5 ${
                          (character.headwearType || 'hijab') === type.id ? 'text-indigo-100' : 'text-slate-400'
                        }`}>
                          {type.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-options based on headwearType */}
                {(character.headwearType || 'hijab') === 'hijab' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Pilihan Model Hijab:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'bergo_sekolah', label: 'Bergo Sekolah', desc: 'Rapi & Praktis' },
                        { id: 'pashmina_santri', label: 'Pashmina Santri', desc: 'Anggun & Lipat Cantik' },
                        { id: 'kerudung_rabbani', label: 'Rabbani Serut', desc: 'Sporty & Kancing' },
                        { id: 'hijab_syari', label: 'Hijab Syar’i', desc: 'Menutup Dada Luas' }
                      ].map(style => (
                        <button
                          key={style.id}
                          onClick={() => {
                            soundAudio.playTing();
                            setCharacter(prev => ({ ...prev, hijabStyle: style.id as any }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                            character.hijabStyle === style.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>{style.label}</div>
                          <div className={`text-[10px] font-normal ${character.hijabStyle === style.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {style.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {character.headwearType === 'peci' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Pilihan Model Peci Santri:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'songkok_hitam', label: 'Songkok Hitam', desc: 'Beludru & Aksen Emas' },
                        { id: 'kopiah_putih', label: 'Kopiah Putih', desc: 'Bordir Santri Bersih' },
                        { id: 'peci_hijau', label: 'Peci Hijau', desc: 'Motif Khas Madrasah' }
                      ].map(peci => (
                        <button
                          key={peci.id}
                          onClick={() => {
                            soundAudio.playTing();
                            setCharacter(prev => ({ ...prev, peciStyle: peci.id as any }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                            (character.peciStyle || 'songkok_hitam') === peci.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>{peci.label}</div>
                          <div className={`text-[10px] font-normal ${(character.peciStyle || 'songkok_hitam') === peci.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {peci.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {character.headwearType === 'topi' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Pilihan Topi Sekolah:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'topi_sd', label: 'Topi SD Merah-Putih', desc: 'Lengkap Logo Tut Wuri Handayani' },
                        { id: 'baret_pramuka', label: 'Baret Pramuka Cokelat', desc: 'Lengkap Lencana Tunaf Kelapa Emas' }
                      ].map(hat => (
                        <button
                          key={hat.id}
                          onClick={() => {
                            soundAudio.playTing();
                            setCharacter(prev => ({ ...prev, hatStyle: hat.id as any }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                            (character.hatStyle || 'topi_sd') === hat.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>{hat.label}</div>
                          <div className={`text-[10px] font-normal ${(character.hatStyle || 'topi_sd') === hat.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {hat.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {character.headwearType === 'rambut' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Pilihan Gaya Rambut:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'pendek_rapi', label: 'Pendek Rapi', desc: 'Siswa Rajin' },
                        { id: 'belah_samping', label: 'Belah Samping', desc: 'Keren & Rapi' },
                        { id: 'kuncir_kuda', label: 'Kuncir Kuda', desc: 'Pita & Aktif' },
                        { id: 'ikal_lucu', label: 'Ikal Lucu', desc: 'Mengembang Imut' }
                      ].map(hair => (
                        <button
                          key={hair.id}
                          onClick={() => {
                            soundAudio.playTing();
                            setCharacter(prev => ({ ...prev, hairStyle: hair.id as any }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                            (character.hairStyle || 'pendek_rapi') === hair.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>{hair.label}</div>
                          <div className={`text-[10px] font-normal ${(character.hairStyle || 'pendek_rapi') === hair.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {hair.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WARNA & KULIT */}
            {activeTab === 'colors' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Warna Hijab / Penutup Kepala:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {COLOR_PALETTES.map(color => (
                      <button
                        key={color.hex}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, hijabColor: color.hex, peciColor: color.hex }));
                        }}
                        className={`p-2 rounded-xl border flex items-center gap-2 transition-all text-left ${
                          character.hijabColor === color.hex
                            ? 'ring-2 ring-indigo-600 bg-white shadow-xs'
                            : 'bg-white/80 hover:bg-white border-slate-200'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 shadow-inner border"
                          style={{ backgroundColor: color.hex, borderColor: color.border }}
                        />
                        <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Pilihan Warna Kulit Karakter:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'warm_peach', label: 'Warm Peach', color: '#ffedd5', border: '#fed7aa' },
                      { id: 'fair_pink', label: 'Fair Pink', color: '#fee2e2', border: '#fecdd3' },
                      { id: 'honey_tan', label: 'Honey Tan', color: '#fed7aa', border: '#fba85f' },
                      { id: 'golden_warm', label: 'Golden Warm', color: '#fef08a', border: '#facc15' }
                    ].map(tone => (
                      <button
                        key={tone.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, skinTone: tone.id as any }));
                        }}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                          (character.skinTone || 'warm_peach') === tone.id
                            ? 'ring-2 ring-indigo-600 bg-white shadow-xs'
                            : 'bg-white/80 hover:bg-white border-slate-200'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border"
                          style={{ backgroundColor: tone.color, borderColor: tone.border }}
                        />
                        <span className="text-xs font-bold text-slate-800">{tone.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {character.headwearType === 'rambut' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">
                      Pilihan Warna Rambut:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {HAIR_COLORS.map(hair => (
                        <button
                          key={hair.hex}
                          onClick={() => {
                            soundAudio.playTing();
                            setCharacter(prev => ({ ...prev, hairColor: hair.hex }));
                          }}
                          className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                            (character.hairColor || '#1e293b') === hair.hex
                              ? 'ring-2 ring-indigo-600 bg-white shadow-xs'
                              : 'bg-white/80 hover:bg-white border-slate-200'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: hair.hex }}
                          />
                          <span className="text-xs font-bold text-slate-800">{hair.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SERAGAM & OUTFIT */}
            {activeTab === 'outfit' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Model Seragam Sekolah / Busana:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'sd_merah', label: '🎒 SD Merah-Putih', desc: 'Seragam Nasional Lengkap Dasi Merah' },
                    { id: 'mi_hijau', label: '🕌 MI Hijau Kemenag', desc: 'Khas Madrasah Ibtidaiyah Rapi' },
                    { id: 'pramuka', label: '⛺ Pramuka Siaga/Penggalang', desc: 'Coklat Lengkap Setangan Leher' },
                    { id: 'batik', label: '🌸 Batik Nusantara', desc: 'Corak Tradisional Ceria' },
                    { id: 'jas_lab', label: '🔬 Jas Lab Peneliti', desc: 'Keren untuk Praktikum Sains SD' },
                    { id: 'baju_koko', label: '✨ Baju Koko Santri', desc: 'Koko Putih Bersih & Bordir Emas' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundAudio.playTing();
                        setCharacter(prev => ({ ...prev, outfit: item.id as any }));
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        character.outfit === item.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-extrabold text-xs">{item.label}</div>
                      <div className={`text-[11px] mt-1 ${
                        character.outfit === item.id ? 'text-indigo-100' : 'text-slate-500'
                      }`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: WAJAH & EKSPRESI */}
            {activeTab === 'face' && (
              <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 overflow-y-auto">
                {/* Eyes */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Bentuk Mata Anime:</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { id: 'star_eyes', label: 'Bintang 🤩' },
                      { id: 'smile', label: 'Ceria (^ ^)' },
                      { id: 'happy', label: 'Kedip (;))' },
                      { id: 'sparkle', label: 'Kilau ✨' },
                      { id: 'gentle_round', label: 'Bulat 🥺' },
                      { id: 'determined', label: 'Semangat 🔥' }
                    ].map(eye => (
                      <button
                        key={eye.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, eyeExpression: eye.id as any }));
                        }}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                          character.eyeExpression === eye.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {eye.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mouth */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Bentuk Senyuman Mulut:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'sweet_smile', label: 'Senyum Manis 😊' },
                      { id: 'laugh_happy', label: 'Tertawa Ceria 😃' },
                      { id: 'cat_mouth', label: 'Kucing Lucu :3' },
                      { id: 'shy_smile', label: 'Senyum Santun ☺️' },
                      { id: 'cool_smirk', label: 'Percaya Diri 😏' }
                    ].map(mouth => (
                      <button
                        key={mouth.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, mouthExpression: mouth.id as any }));
                        }}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                          (character.mouthExpression || 'sweet_smile') === mouth.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mouth.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blush */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Rona Pipi (Blush):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'rosy', label: 'Rosy Lembut 🌸' },
                      { id: 'sparkles', label: 'Bintang Kilau ✨' },
                      { id: 'hearts', label: 'Hati Merona 💖' },
                      { id: 'none', label: 'Alami / Natural' }
                    ].map(blush => (
                      <button
                        key={blush.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, blushStyle: blush.id as any }));
                        }}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                          (character.blushStyle || 'rosy') === blush.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {blush.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Face Marks */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tanda Wajah Khusus:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'none', label: 'Polos' },
                      { id: 'freckles', label: 'Freckles Alami' },
                      { id: 'beauty_mark', label: 'Tahi Lalat Manis' },
                      { id: 'forehead_star', label: 'Bintang Kening ⭐' },
                      { id: 'cheek_patch', label: 'Plester Pipi 🩹' }
                    ].map(mark => (
                      <button
                        key={mark.id}
                        onClick={() => {
                          soundAudio.playTing();
                          setCharacter(prev => ({ ...prev, faceMark: mark.id as any }));
                        }}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                          (character.faceMark || 'none') === mark.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mark.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: POSE TANGAN */}
            {activeTab === 'hands' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <label className="text-xs font-bold text-slate-700 block">Pilih Pose Tangan Karakter:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'peace', label: '✌️ Tanda Peace', desc: 'Gaya Ceria & Ramah' },
                    { id: 'waving', label: '👋 Melambaikan Tangan', desc: 'Menyapa Sahabat' },
                    { id: 'holding_book', label: '📖 Memegang Buku Pelajaran', desc: 'Rajin Membaca' },
                    { id: 'polite_fold', label: '🙏 Tangan Santun', desc: 'Sikap Santun Berdoa' },
                    { id: 'thumbs_up', label: '👍 Jempol Mantap', desc: 'Hebat & Penuh Percaya Diri' },
                    { id: 'holding_trophy', label: '🏆 Mengangkat Piala Juara', desc: 'Kebanggaan Berprestasi' },
                    { id: 'holding_pencil', label: '✏️ Memegang Pensil & Kertas', desc: 'Siap Menulis & Berhitung' }
                  ].map(pose => (
                    <button
                      key={pose.id}
                      onClick={() => {
                        soundAudio.playTing();
                        setCharacter(prev => ({ ...prev, handPose: pose.id as any }));
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        (character.handPose || 'peace') === pose.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-extrabold text-xs">{pose.label}</div>
                      <div className={`text-[11px] mt-1 ${
                        (character.handPose || 'peace') === pose.id ? 'text-indigo-100' : 'text-slate-500'
                      }`}>
                        {pose.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: AKSESORI & ELEMEN */}
            {activeTab === 'accessories' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Aksesori & Elemen Tambahan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'none', label: 'Tanpa Aksesori', desc: 'Tampilan Bersih' },
                    { id: 'glasses', label: '👓 Kacamata Bulat Merah', desc: 'Imut & Cerdas' },
                    { id: 'glasses_smart', label: '👓 Kacamata Kotak Pintar', desc: 'Gaya Pelajar Cerdas' },
                    { id: 'sunglasses', label: '🕶️ Kacamata Hitam Keren', desc: 'Gaya Keren Berpetualang' },
                    { id: 'medal', label: '🥇 Medali Juara Emas', desc: 'Tergantung di Dada dengan Pita' },
                    { id: 'bow', label: '🎀 Pita Merah Muda', desc: 'Manis di Kepala' },
                    { id: 'star_pin', label: '⭐ Bros Bintang Emas', desc: 'Bros Kehormatan' },
                    { id: 'pencil', label: '✏️ Pensil Belajar', desc: 'Pensil Belajar Ajaib' },
                    { id: 'backpack', label: '🎒 Tas Ransel Sekolah', desc: 'Tali Tas di Bahu' },
                    { id: 'badge_prestasi', label: '🎖️ Lencana Pelajar Teladan', desc: 'Pita Penghargaan Biru-Emas' }
                  ].map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        soundAudio.playTing();
                        setCharacter(prev => ({ ...prev, accessory: acc.id as any }));
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        (character.accessory || 'none') === acc.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-extrabold text-xs">{acc.label}</div>
                      <div className={`text-[10px] mt-0.5 ${
                        (character.accessory || 'none') === acc.id ? 'text-indigo-100' : 'text-slate-500'
                      }`}>
                        {acc.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: EFEK AURA SPESIAL */}
            {activeTab === 'aura' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Efek Aura Cahaya Sekitar Karakter:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'none', label: 'Tanpa Aura', desc: 'Tampilan Standar' },
                    { id: 'stars', label: '⭐ Bintang-Bintang Emas', desc: 'Bintang Mengitari Tubuh' },
                    { id: 'sparkles', label: '✨ Kilau Percikan Cahaya', desc: 'Kelap-kelip Penuh Energi' },
                    { id: 'rainbow', label: '🌈 Lengkungan Pelangi', desc: 'Pelangi Ceria di Atas Kepala' },
                    { id: 'bubbles', label: '🫧 Gelembung Ceria', desc: 'Gelembung Lucu Melayang' },
                    { id: 'music', label: '🎵 Melodi Nada Riang', desc: 'Not-not Musik Belajar Gembira' }
                  ].map(aura => (
                    <button
                      key={aura.id}
                      onClick={() => {
                        soundAudio.playTing();
                        setCharacter(prev => ({ ...prev, auraEffect: aura.id as any }));
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        (character.auraEffect || 'none') === aura.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-extrabold text-xs">{aura.label}</div>
                      <div className={`text-[11px] mt-1 ${
                        (character.auraEffect || 'none') === aura.id ? 'text-indigo-100' : 'text-slate-500'
                      }`}>
                        {aura.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Menyimpan: <strong>{activeRole === 'self' ? 'Karakter Saya' : 'Teman Belajar'}</strong> ({character.name})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundAudio.playPop();
                onClose();
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan & Terapkan Karakter ⭐</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
