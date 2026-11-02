import React, { useState } from 'react';
import { ENGLISH_CATEGORIES, ENGLISH_VOCAB_LIST, SENTENCE_CHALLENGES } from '../data/englishData';
import { EnglishVocabItem, SentenceBuilderChallenge } from '../types';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

interface EnglishModuleProps {
  onEarnStar: (stars: number) => void;
}

export const EnglishModule: React.FC<EnglishModuleProps> = ({ onEarnStar }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('classroom');
  const [activeTab, setActiveTab] = useState<'flashcards' | 'sentence-builder' | 'spelling-bee'>('flashcards');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Sentence Builder State
  const [challengeIdx, setChallengeIdx] = useState(0);
  const currentChallenge: SentenceBuilderChallenge = SENTENCE_CHALLENGES[challengeIdx] || SENTENCE_CHALLENGES[0];
  const [chosenWords, setChosenWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(currentChallenge.words);
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [isSentenceCorrect, setIsSentenceCorrect] = useState(false);

  // Spelling Bee State
  const categoryVocabs = ENGLISH_VOCAB_LIST.filter(v => v.category === selectedCategory);
  const [spellIdx, setSpellIdx] = useState(0);
  const currentSpellItem: EnglishVocabItem = categoryVocabs[spellIdx] || categoryVocabs[0];
  const [userSpelling, setUserSpelling] = useState('');
  const [spellChecked, setSpellChecked] = useState(false);
  const [isSpellCorrect, setIsSpellCorrect] = useState(false);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    soundAudio.playTing();
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundAudio.speakEnglish(text);
  };

  // Sentence builder logic
  const handlePickWord = (word: string, index: number) => {
    if (sentenceChecked) return;
    setChosenWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    soundAudio.playTing();
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (sentenceChecked) return;
    setChosenWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
    soundAudio.playTing();
  };

  const handleCheckSentence = () => {
    const isCorrect = chosenWords.join(' ') === currentChallenge.correctOrder.join(' ');
    setSentenceChecked(true);
    setIsSentenceCorrect(isCorrect);

    if (isCorrect) {
      soundAudio.playSuccessChime();
      soundAudio.speakEnglish(currentChallenge.correctOrder.join(' '));
      onEarnStar(2);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      soundAudio.playErrorBuzz();
    }
  };

  const handleNextChallenge = () => {
    if (challengeIdx + 1 < SENTENCE_CHALLENGES.length) {
      const nextIdx = challengeIdx + 1;
      setChallengeIdx(nextIdx);
      setChosenWords([]);
      setAvailableWords(SENTENCE_CHALLENGES[nextIdx].words);
      setSentenceChecked(false);
      setIsSentenceCorrect(false);
    } else {
      soundAudio.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  // Spelling bee logic
  const handleCheckSpelling = () => {
    const cleanUser = userSpelling.trim().toLowerCase();
    const cleanTarget = currentSpellItem.english.trim().toLowerCase();
    const correct = cleanUser === cleanTarget;

    setSpellChecked(true);
    setIsSpellCorrect(correct);

    if (correct) {
      soundAudio.playSuccessChime();
      soundAudio.speakEnglish(currentSpellItem.english);
      onEarnStar(1);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      soundAudio.playErrorBuzz();
    }
  };

  const handleNextSpell = () => {
    if (spellIdx + 1 < categoryVocabs.length) {
      setSpellIdx(prev => prev + 1);
      setUserSpelling('');
      setSpellChecked(false);
      setIsSpellCorrect(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none text-9xl font-black">
          ENGLISH
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>English for Elementary School</span>
            <span>·</span>
            <span>Bahasa Inggris Dasar SD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Belajar Bahasa Inggris Ceria & Berkarakter
          </h1>
          <p className="text-sky-100 text-sm leading-relaxed mb-4">
            Perkaya kosakata sehari-hari (Vocabulary), latih pelafalan (Pronunciation), dan susun kalimat sederhana bahasa Inggris dengan audio penutur asli.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-amber-400 text-blue-950 shadow-md'
                  : 'bg-blue-800/60 text-white hover:bg-blue-800'
              }`}
            >
              Kartu Kosakata (Flashcards)
            </button>
            <button
              onClick={() => setActiveTab('sentence-builder')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'sentence-builder'
                  ? 'bg-amber-400 text-blue-950 shadow-md'
                  : 'bg-blue-800/60 text-white hover:bg-blue-800'
              }`}
            >
              Susun Kalimat (Sentence Builder)
            </button>
            <button
              onClick={() => setActiveTab('spelling-bee')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'spelling-bee'
                  ? 'bg-amber-400 text-blue-950 shadow-md'
                  : 'bg-blue-800/60 text-white hover:bg-blue-800'
              }`}
            >
              Latihan Eja Kata (Spelling Bee)
            </button>
          </div>
        </div>
      </div>

      {/* Categories Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {ENGLISH_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSpellIdx(0);
                setUserSpelling('');
                setSpellChecked(false);
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-white border-blue-600 ring-2 ring-blue-500/30 shadow-xs'
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-bold text-xs text-blue-950 mb-0.5">{cat.name}</div>
              <div className="text-[11px] text-slate-500">{cat.indonesian}</div>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {categoryVocabs.length} Kosakata Bahasa Inggris (Klik kartu untuk membalik arti)
            </span>
            <button
              onClick={() => {
                onEarnStar(1);
                soundAudio.playSuccessChime();
              }}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selesaikan Bab (+1 Bintang)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryVocabs.map((item: EnglishVocabItem) => {
              const isFlipped = !!flippedCards[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 cursor-pointer shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[220px] group relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.emoji}</span>
                    <button
                      onClick={e => handleSpeak(item.english, e)}
                      title="Dengarkan pengucapan asli"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center py-3 my-auto">
                    {!isFlipped ? (
                      <>
                        <div className="text-2xl font-black text-slate-900 mb-1 group-hover:scale-105 transition-transform tracking-tight">
                          {item.english}
                        </div>
                        <div className="text-xs font-semibold text-blue-700">
                          {item.pronunciationHint}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xl font-bold text-slate-900 mb-1">
                          {item.indonesian}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.english}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Example Sentence */}
                  <div className="pt-2 border-t border-slate-100 text-xs">
                    <div className="font-semibold text-blue-950 truncate flex items-center justify-between">
                      <span>"{item.exampleSentence}"</span>
                      <button
                        onClick={e => handleSpeak(item.exampleSentence, e)}
                        className="text-slate-400 hover:text-blue-600 ml-1"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5 italic">
                      {item.exampleTranslation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Sentence Builder */}
      {activeTab === 'sentence-builder' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Permainan Susun Kalimat (Sentence Builder)
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Tantangan {challengeIdx + 1} dari {SENTENCE_CHALLENGES.length}
            </span>
          </div>

          <div className="text-center p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl space-y-1">
            <span className="text-xs font-semibold text-sky-800">Susunlah kata ke dalam bahasa Inggris yang berarti:</span>
            <h3 className="text-lg font-bold text-slate-900">
              "{currentChallenge.indonesianMeaning}"
            </h3>
          </div>

          {/* Constructed Sentence Box */}
          <div className="min-h-16 p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-wrap items-center gap-2">
            {chosenWords.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Klik kata-kata di bawah untuk menyusun kalimat di sini...
              </span>
            ) : (
              chosenWords.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(w, idx)}
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors shadow-2xs group flex items-center gap-1.5"
                  title="Klik untuk menghapus"
                >
                  <span>{w}</span>
                  <span className="text-[10px] opacity-70 group-hover:opacity-100">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Available Word Tiles */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Pilihan Kata:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {availableWords.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePickWord(w, idx)}
                  className="px-4 py-2 bg-white hover:bg-sky-50 border border-slate-200 hover:border-blue-300 text-slate-800 font-bold text-xs rounded-lg transition-all shadow-2xs hover:scale-105 active:scale-95"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Check and feedback */}
          <div className="pt-2">
            {!sentenceChecked ? (
              <button
                disabled={chosenWords.length === 0}
                onClick={handleCheckSentence}
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Periksa Kalimat
              </button>
            ) : (
              <div className="p-4 rounded-xl border space-y-3 bg-slate-50">
                <div className="flex items-center gap-2">
                  {isSentenceCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-emerald-800 text-sm">
                        Great job! Kalimatmu Benar Sekali (+2 Bintang)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-rose-700 text-sm">
                        Urutan masih belum tepat, susunan yang benar:
                      </span>
                    </>
                  )}
                </div>

                <div className="text-sm font-bold text-blue-900 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>{currentChallenge.correctOrder.join(' ')}</span>
                  <button
                    onClick={() => soundAudio.speakEnglish(currentChallenge.correctOrder.join(' '))}
                    className="text-slate-400 hover:text-blue-700"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleNextChallenge}
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Tantangan Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Spelling Bee */}
      {activeTab === 'spelling-bee' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Spelling Bee (Dengar & Tulis Ejaan)
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Kata {spellIdx + 1} dari {categoryVocabs.length}
            </span>
          </div>

          <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="text-4xl">{currentSpellItem.emoji}</div>
            <div className="text-xs font-semibold text-slate-500">
              Arti kata: <span className="font-bold text-slate-800">{currentSpellItem.indonesian}</span>
            </div>
            <button
              onClick={() => soundAudio.speakEnglish(currentSpellItem.english)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Dengarkan Pelafalan Bahasa Inggris</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Ketik ejaan bahasa Inggris dari kata di atas:
            </label>
            <input
              type="text"
              value={userSpelling}
              onChange={e => setUserSpelling(e.target.value)}
              placeholder="Contoh: book, pencil, cat..."
              disabled={spellChecked && isSpellCorrect}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-blue-600 font-semibold"
            />
          </div>

          {!spellChecked ? (
            <button
              onClick={handleCheckSpelling}
              disabled={!userSpelling.trim()}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Periksa Ejaan
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-xl border bg-slate-50 flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold block ${isSpellCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {isSpellCorrect ? 'Excellent! Ejaan kamu tepat (+1 Bintang)' : 'Hampir tepat! Ejaan yang benar adalah:'}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{currentSpellItem.english}</span>
                </div>
                <button
                  onClick={() => soundAudio.speakEnglish(currentSpellItem.english)}
                  className="p-1.5 text-slate-400 hover:text-blue-700"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                {!isSpellCorrect && (
                  <button
                    onClick={() => {
                      setSpellChecked(false);
                      setUserSpelling('');
                    }}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Coba Lagi</span>
                  </button>
                )}
                <button
                  onClick={handleNextSpell}
                  className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
                >
                  Kata Berikutnya →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
