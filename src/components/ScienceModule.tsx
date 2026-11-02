import React, { useState } from 'react';
import { SCIENCE_TOPICS, BUTTERFLY_METAMORPHOSIS, FROG_METAMORPHOSIS, SOLAR_PLANETS } from '../data/scienceData';
import { ScienceModel } from '../data/scienceData';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Sun, Droplets, Thermometer, Wind, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

interface ScienceModuleProps {
  onEarnStar: (stars: number) => void;
}

export const ScienceModule: React.FC<ScienceModuleProps> = ({ onEarnStar }) => {
  const [selectedTopic, setSelectedTopic] = useState<ScienceModel>(SCIENCE_TOPICS[0]);
  const [metamorphosisAnimal, setMetamorphosisAnimal] = useState<'butterfly' | 'frog'>('butterfly');
  const [activeStep, setActiveStep] = useState(0);

  // Wujud Benda Interactive state (Temperature Slider)
  const [tempState, setTempState] = useState<'dingin' | 'sedang' | 'panas'>('sedang');

  // Food Chain Active Stage
  const [activeChainStep, setActiveChainStep] = useState(0);

  // Solar system selected planet
  const [selectedPlanet, setSelectedPlanet] = useState(SOLAR_PLANETS[2]); // Earth default

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    soundAudio.playTing();
  };

  const handleCompleteTopic = () => {
    soundAudio.playSuccessChime();
    onEarnStar(2);
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-cyan-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none text-9xl font-black">
          SCIENCE
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Ilmu Pengetahuan Alam Dasar SD</span>
            <span>·</span>
            <span>Eksplorasi Sains & Fenomena Alam</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Laboratorium Mini IPA Dasar
          </h1>
          <p className="text-teal-100 text-sm leading-relaxed mb-4">
            Eksplorasi daur hidup hewan, rantai makanan, wujud benda fisika, siklus air, dan sistem tata surya dengan visual interaktif yang menyenangkan.
          </p>

          <button
            onClick={handleCompleteTopic}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-teal-950 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Klaim Bintang Peneliti Cilik (+2)</span>
          </button>
        </div>
      </div>

      {/* Topics Carousel / Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SCIENCE_TOPICS.map(topic => {
          const isSelected = selectedTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                setActiveStep(0);
                soundAudio.playTing();
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-white border-teal-600 ring-2 ring-teal-500/30 shadow-xs'
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-bold text-xs text-slate-900 mb-0.5 line-clamp-1">{topic.title}</div>
              <div className="text-[10px] text-teal-700 font-semibold">{topic.gradeLevel}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Experiment / Simulation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Visual Simulation */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Simulasi Interaktif IPA
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{selectedTopic.title}</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
              {selectedTopic.gradeLevel}
            </span>
          </div>

          {/* SIMULATION 1: Metamorfosis */}
          {selectedTopic.interactiveType === 'metamorfosis' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setMetamorphosisAnimal('butterfly')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    metamorphosisAnimal === 'butterfly' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Metamorfosis Kupu-Kupu (Sempurna)
                </button>
                <button
                  onClick={() => setMetamorphosisAnimal('frog')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    metamorphosisAnimal === 'frog' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Metamorfosis Katak (Sempurna)
                </button>
              </div>

              {/* Steps Progress */}
              {(() => {
                const steps = metamorphosisAnimal === 'butterfly' ? BUTTERFLY_METAMORPHOSIS : FROG_METAMORPHOSIS;
                const cur = steps[activeStep] || steps[0];
                return (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {steps.map((st, i) => (
                        <button
                          key={i}
                          onClick={() => handleStepClick(i)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                            activeStep === i
                              ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-2xl sm:text-3xl mb-1">{st.emoji}</div>
                          <div className="text-xs font-bold text-slate-800 truncate">{st.name}</div>
                          <div className="text-[10px] text-slate-400">Tahap {st.step}</div>
                        </button>
                      ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start gap-4">
                      <div className="text-5xl">{cur.emoji}</div>
                      <div>
                        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                          Tahap ke-{cur.step}: {cur.name}
                        </span>
                        <p className="text-sm text-teal-950 mt-1 leading-relaxed">{cur.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SIMULATION 2: Rantai Makanan Sawah */}
          {selectedTopic.interactiveType === 'rantai_makanan' && (
            <div className="space-y-6">
              <div className="text-center p-3 bg-amber-50 rounded-xl text-xs font-semibold text-amber-900 border border-amber-200">
                Aliran energi dari produsen hingga konsumen puncak pada ekosistem sawah:
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4">
                {[
                  { role: 'Produsen', name: 'Padi', emoji: '🌾' },
                  { role: 'Konsumen I', name: 'Belalang', emoji: '🦗' },
                  { role: 'Konsumen II', name: 'Katak', emoji: '🐸' },
                  { role: 'Konsumen III', name: 'Ular', emoji: '🐍' },
                  { role: 'Konsumen Puncak', name: 'Elang', emoji: '🦅' },
                  { role: 'Pengurai', name: 'Jamur', emoji: '🍄' }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => {
                        setActiveChainStep(idx);
                        soundAudio.playTing();
                      }}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        activeChainStep === idx
                          ? 'bg-emerald-600 text-white shadow-md scale-105'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="text-3xl mb-1">{item.emoji}</div>
                      <div className="font-bold text-xs">{item.name}</div>
                      <div className={`text-[10px] ${activeChainStep === idx ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {item.role}
                      </div>
                    </button>
                    {idx < 5 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-emerald-800 block mb-1">Keterangan Ekosistem:</span>
                Jika populasi katak menurun drastis karena diburu, maka populasi belalang akan melonjak merusak padi petani, dan ular sawah akan kekurangan makanan.
              </div>
            </div>
          )}

          {/* SIMULATION 3: Wujud Benda & Suhu */}
          {selectedTopic.interactiveType === 'wujud_benda' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setTempState('dingin')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    tempState === 'dingin' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Thermometer className="w-4 h-4 text-sky-200" />
                  <span>Suhu Dingin (0°C - Membeku)</span>
                </button>
                <button
                  onClick={() => setTempState('sedang')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    tempState === 'sedang' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Droplets className="w-4 h-4 text-teal-200" />
                  <span>Suhu Ruang (25°C - Cair)</span>
                </button>
                <button
                  onClick={() => setTempState('panas')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    tempState === 'panas' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Sun className="w-4 h-4 text-orange-200" />
                  <span>Suhu Panas (100°C - Menguap)</span>
                </button>
              </div>

              {/* Visual State Box */}
              <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-6xl animate-bounce">
                  {tempState === 'dingin' ? '🧊' : tempState === 'sedang' ? '💧' : '♨️'}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {tempState === 'dingin' ? 'Wujud Benda: PADAT (Es Batu)' : tempState === 'sedang' ? 'Wujud Benda: CAIR (Air Minum)' : 'Wujud Benda: GAS (Uap Air)'}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {tempState === 'dingin' && 'Partikel zat sangat rapat, susunan teratur, bentuk dan volume tetap.'}
                  {tempState === 'sedang' && 'Partikel zat renggang, bergerak bebas, bentuk berubah mengikuti wadahnya, volume tetap.'}
                  {tempState === 'panas' && 'Partikel zat sangat renggang, bergerak cepat ke segala arah, bentuk dan volume berubah menempati seluruh ruangan.'}
                </p>
              </div>
            </div>
          )}

          {/* SIMULATION 4: Siklus Air */}
          {selectedTopic.interactiveType === 'siklus_air' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: '1. Evaporasi', desc: 'Penguapan air laut oleh panas matahari.', icon: Sun, emoji: '🌊' },
                  { name: '2. Kondensasi', desc: 'Uap air mengembun membentuk awan tebal.', icon: Wind, emoji: '☁️' },
                  { name: '3. Presipitasi', desc: 'Hujan jatuh menyirami bumi.', icon: Droplets, emoji: '🌧️' },
                  { name: '4. Infiltrasi', desc: 'Air meresap ke tanah mengalir ke laut.', icon: Droplets, emoji: '🌱' }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="font-bold text-xs text-teal-900">{item.name}</div>
                    <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SIMULATION 5: Tata Surya */}
          {selectedTopic.interactiveType === 'tata_surya' && (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {SOLAR_PLANETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPlanet(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      selectedPlanet.name === p.name ? 'bg-indigo-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{p.emoji} {p.name}</span>
                  </button>
                ))}
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2 text-center">
                <div className="text-5xl">{selectedPlanet.emoji}</div>
                <h3 className="text-xl font-bold text-amber-300">Planet {selectedPlanet.name}</h3>
                <span className="text-xs text-slate-400 block">{selectedPlanet.dist}</span>
                <p className="text-sm text-slate-200 max-w-lg mx-auto">{selectedPlanet.fact}</p>
              </div>
            </div>
          )}

          {/* SIMULATION 6: Panca Indera */}
          {selectedTopic.interactiveType === 'panca_indera' && (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { name: 'Mata', role: 'Penglihatan', desc: 'Melihat warna, bentuk, dan ukuran benda', emoji: '👁️' },
                { name: 'Telinga', role: 'Pendengaran', desc: 'Mendengar bunyi merdu dan suara azan', emoji: '👂' },
                { name: 'Hidung', role: 'Penciuman', desc: 'Membau aroma harum bunga dan makanan', emoji: '👃' },
                { name: 'Lidah', role: 'Pengecap Rasa', desc: 'Merasakan manis, asin, asam, pahit', emoji: '👅' },
                { name: 'Kulit', role: 'Peraba Sentuhan', desc: 'Merasakan panas, dingin, kasar, halus', emoji: '✋' }
              ].map((ind, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-3xl mb-1">{ind.emoji}</div>
                  <div className="font-bold text-xs text-slate-900">{ind.name}</div>
                  <div className="text-[10px] font-semibold text-teal-700">{ind.role}</div>
                  <p className="text-[11px] text-slate-500">{ind.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Key Concepts & Scientific Facts */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Konsep Kunci Materi</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Ringkasan Sains:</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedTopic.explanation}</p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Istilah Penting IPA:
            </h4>
            {selectedTopic.keyTerms.map((kt, i) => (
              <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-bold text-teal-900 block">{kt.term}</span>
                <span className="text-slate-600">{kt.meaning}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleCompleteTopic}
            className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Tandai Paham Materi Ini (+2 Bintang)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
