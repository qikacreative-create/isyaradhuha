import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../data/arabicBasicData';
import { TAJWID_RULES } from '../data/tajwidData';
import { IMLA_LESSONS } from '../data/imlaData';
import { ENGLISH_VOCAB_LIST } from '../data/englishData';
import { SCIENCE_TOPICS } from '../data/scienceData';
import { MATH_GRADE2_UNITS, GEOMETRY_SHAPES } from '../data/mathGrade2Data';
import { ANTONYM_SYNONYM_LIST, POLITE_WORDS_CASES } from '../data/indonesianGrade2Data';
import { soundAudio } from '../utils/audio';
import { Search, X, Volume2, BookOpen, Compass, Edit3, Globe, Sparkles, Calculator, BookMarked } from 'lucide-react';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionMode, setSectionMode] = useState<'all' | 'sd' | 'diniyah'>('all');
  const [filterType, setFilterType] = useState<'all' | 'mufradat' | 'tajwid' | 'imla' | 'english' | 'ipa' | 'matematika' | 'bahasa-indonesia'>('all');

  if (!isOpen) return null;

  const handleSwitchSection = (mode: 'all' | 'sd' | 'diniyah') => {
    setSectionMode(mode);
    setFilterType('all');
  };

  const filteredVocab = VOCABULARY_LIST.filter(v =>
    v.arabic.includes(searchTerm) ||
    v.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTajwid = TAJWID_RULES.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.lettersArabic.includes(searchTerm)
  );

  const filteredImla = IMLA_LESSONS.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.ruleFormula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnglish = ENGLISH_VOCAB_LIST.filter(e =>
    e.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.indonesian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScience = SCIENCE_TOPICS.flatMap(topic =>
    topic.keyTerms.map(k => ({ ...k, topicTitle: topic.title }))
  ).filter(s =>
    s.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMath = [
    ...MATH_GRADE2_UNITS.map(u => ({ term: u.title, meaning: u.summary, badge: u.badge, emoji: u.icon })),
    ...GEOMETRY_SHAPES.map(g => ({ term: g.name, meaning: `${g.description} Contoh: ${g.realExamples}`, badge: 'Geometri', emoji: g.emoji }))
  ].filter(m =>
    m.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIndonesian = [
    ...ANTONYM_SYNONYM_LIST.map(a => ({ term: a.word, meaning: `Lawan kata: ${a.antonym} | Sinonim: ${a.synonym}. Contoh: "${a.sentenceExample}"`, badge: 'Kosakata', emoji: a.emoji })),
    ...POLITE_WORDS_CASES.map(p => ({ term: `Kata Ajaib: ${p.magicWord}`, meaning: `${p.context} Contoh: ${p.dialogueExample}`, badge: 'Santun', emoji: p.emoji }))
  ].filter(ind =>
    ind.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ind.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] sm:max-h-[85vh] flex flex-col space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">Buku Saku & Glosarium Pintar</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Pilih kategori Pelajaran SD atau Pelajaran Diniyah
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Gateway Toggle (SD vs Diniyah vs Semua) */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => handleSwitchSection('sd')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              sectionMode === 'sd'
                ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🎒 Pelajaran SD
          </button>
          <button
            onClick={() => handleSwitchSection('diniyah')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              sectionMode === 'diniyah'
                ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🕌 Diniyah
          </button>
          <button
            onClick={() => handleSwitchSection('all')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              sectionMode === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Semua
          </button>
        </div>

        {/* Search Bar & Filter Buttons */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cari kata (Perkalian, Sopan, Book, Evaporasi, Idzhar)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-blue-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs overflow-x-auto scrollbar-none py-1 -mx-1 px-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                filterType === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Semua
            </button>

            {/* SD Topic Chips */}
            {(sectionMode === 'all' || sectionMode === 'sd') && (
              <>
                <button
                  onClick={() => setFilterType('matematika')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'matematika' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Matematika ({filteredMath.length})
                </button>
                <button
                  onClick={() => setFilterType('bahasa-indonesia')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'bahasa-indonesia' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  B. Indonesia ({filteredIndonesian.length})
                </button>
                <button
                  onClick={() => setFilterType('ipa')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'ipa' ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  IPA Sains ({filteredScience.length})
                </button>
                <button
                  onClick={() => setFilterType('english')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'english' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  English ({filteredEnglish.length})
                </button>
              </>
            )}

            {/* Diniyah Topic Chips */}
            {(sectionMode === 'all' || sectionMode === 'diniyah') && (
              <>
                <button
                  onClick={() => setFilterType('mufradat')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'mufradat' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  B. Arab ({filteredVocab.length})
                </button>
                <button
                  onClick={() => setFilterType('tajwid')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'tajwid' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Tajwid ({filteredTajwid.length})
                </button>
                <button
                  onClick={() => setFilterType('imla')}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
                    filterType === 'imla' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Imla’ ({filteredImla.length})
                </button>
              </>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Matematika Section (SD) */}
          {(sectionMode === 'all' || sectionMode === 'sd') && (filterType === 'all' || filterType === 'matematika') && filteredMath.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Matematika Kelas 2 SD</span>
              </span>
              <div className="space-y-2">
                {filteredMath.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-amber-400 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{m.emoji}</span>
                        <span>{m.term}</span>
                      </div>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-snug">{m.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bahasa Indonesia Section (SD) */}
          {(sectionMode === 'all' || sectionMode === 'sd') && (filterType === 'all' || filterType === 'bahasa-indonesia') && filteredIndonesian.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                <BookMarked className="w-3.5 h-3.5" />
                <span>Bahasa Indonesia Kelas 2 SD</span>
              </span>
              <div className="space-y-2">
                {filteredIndonesian.map((ind, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{ind.emoji}</span>
                        <span>{ind.term}</span>
                      </div>
                      <span className="text-[10px] text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full font-bold">
                        {ind.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-snug">{ind.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Science IPA Section (SD) */}
          {(sectionMode === 'all' || sectionMode === 'sd') && (filterType === 'all' || filterType === 'ipa') && filteredScience.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Istilah Sains & IPA Dasar SD</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredScience.map((sci, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-300 text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-950">{sci.term}</span>
                      <span className="text-[10px] text-slate-400">{sci.topicTitle}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-tight">{sci.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* English Section (SD) */}
          {(sectionMode === 'all' || sectionMode === 'sd') && (filterType === 'all' || filterType === 'english') && filteredEnglish.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Bahasa Inggris Dasar SD</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredEnglish.map(en => (
                  <div
                    key={en.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{en.emoji}</span>
                        <span className="font-bold text-slate-900">{en.english}</span>
                      </div>
                      <span className="text-slate-500 font-semibold">{en.indonesian} · {en.pronunciationHint}</span>
                    </div>
                    <button
                      onClick={() => soundAudio.speakEnglish(en.english)}
                      className="p-1 text-slate-400 hover:text-blue-700 rounded-md"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arab Vocab Section (Diniyah) */}
          {(sectionMode === 'all' || sectionMode === 'diniyah') && (filterType === 'all' || filterType === 'mufradat') && filteredVocab.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Kosakata Bahasa Arab Dasar (Diniyah)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredVocab.map(v => (
                  <div
                    key={v.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{v.meaning}</span>
                      <span className="text-slate-500 font-semibold">{v.transliteration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-arabic text-xl font-bold text-emerald-800">{v.arabic}</span>
                      <button
                        onClick={() => soundAudio.speakArabic(v.arabic)}
                        className="p-1 text-slate-400 hover:text-emerald-700 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tajwid Section (Diniyah) */}
          {(sectionMode === 'all' || sectionMode === 'diniyah') && (filterType === 'all' || filterType === 'tajwid') && filteredTajwid.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                Hukum Ilmu Tajwid (Diniyah)
              </span>
              <div className="space-y-2">
                {filteredTajwid.map(t => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.name}</span>
                      </div>
                      <span className="font-arabic font-bold text-base text-emerald-800">{t.arabicName}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{t.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Imla Section (Diniyah) */}
          {(sectionMode === 'all' || sectionMode === 'diniyah') && (filterType === 'all' || filterType === 'imla') && filteredImla.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Kaidah Imla’ Menulis Arab (Diniyah)
              </span>
              <div className="space-y-2">
                {filteredImla.map(im => (
                  <div
                    key={im.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{im.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{im.gradeLevel}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{im.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
