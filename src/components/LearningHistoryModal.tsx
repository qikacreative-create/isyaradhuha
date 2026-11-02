import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LearningHistoryRecord, CurriculumMode } from '../types';
import {
  History,
  Award,
  Star,
  CheckCircle2,
  Calendar,
  Trash2,
  X,
  Filter,
  Sparkles,
  Cloud,
  HardDrive,
  Printer,
  ChevronRight,
  TrendingUp,
  Brain,
  SpellCheck,
  Calculator
} from 'lucide-react';
import { soundAudio } from '../utils/audio';

interface LearningHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTvMode?: boolean;
}

export const LearningHistoryModal: React.FC<LearningHistoryModalProps> = ({
  isOpen,
  onClose,
  isTvMode = false
}) => {
  const { history, user, deleteHistoryRecord, clearAllHistory, isHistoryLoading } = useAuth();
  const [filterMode, setFilterMode] = useState<'all' | 'sd' | 'diniyah'>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (filterMode === 'all') return true;
    return item.curriculumMode === filterMode;
  });

  // Calculate statistics
  const totalSessions = history.length;
  const totalStarsEarned = history.reduce((sum, item) => sum + (item.starsEarned || 0), 0);
  const avgAccuracy =
    totalSessions > 0
      ? Math.round(
          history.reduce((sum, item) => sum + (item.accuracyPercent || 0), 0) / totalSessions
        )
      : 0;

  const sdSessions = history.filter((item) => item.curriculumMode === 'sd').length;
  const diniyahSessions = history.filter((item) => item.curriculumMode === 'diniyah').length;

  const handleDeleteItem = async (id: string) => {
    soundAudio.playPop();
    await deleteHistoryRecord(id);
  };

  const handleClearAll = async () => {
    soundAudio.playPop();
    await clearAllHistory();
    setConfirmClear(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'game-mengeja':
        return <SpellCheck className="w-5 h-5 text-indigo-500" />;
      case 'game-perkalian':
        return <Calculator className="w-5 h-5 text-amber-500" />;
      case 'kuis':
        return <Brain className="w-5 h-5 text-emerald-500" />;
      default:
        return <Award className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col space-y-4 ${
          isTvMode ? 'tv-card' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-slate-800">Riwayat Belajar & Capaian</h3>
                {user ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    <Cloud className="w-3 h-3 text-emerald-600" /> Firebase Cloud
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                    <HardDrive className="w-3 h-3 text-amber-600" /> Lokal (Tamu)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Catatan riwayat latihan soal, kuis, dan permainan edukatif siswa
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundAudio.playPop();
              onClose();
            }}
            tabIndex={0}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-indigo-500"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-3 text-center">
            <span className="text-indigo-600 font-black text-xl block">{totalSessions}</span>
            <span className="text-[11px] font-bold text-slate-600">Total Sesi Latihan</span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-amber-700 font-black text-xl">+{totalStarsEarned}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-600">Bintang Diperoleh</span>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-black text-xl">{avgAccuracy}%</span>
            </div>
            <span className="text-[11px] font-bold text-slate-600">Rata-rata Akurasi</span>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-3 text-center">
            <span className="text-purple-700 font-black text-base block">
              {sdSessions} SD / {diniyahSessions} Din
            </span>
            <span className="text-[11px] font-bold text-slate-600">Porsi Pelajaran</span>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundAudio.playTing();
                setFilterMode('all');
              }}
              tabIndex={0}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-indigo-400 ${
                filterMode === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua ({history.length})
            </button>
            <button
              onClick={() => {
                soundAudio.playTing();
                setFilterMode('sd');
              }}
              tabIndex={0}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-indigo-400 ${
                filterMode === 'sd'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              🎒 SD Umum ({sdSessions})
            </button>
            <button
              onClick={() => {
                soundAudio.playTing();
                setFilterMode('diniyah');
              }}
              tabIndex={0}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-indigo-400 ${
                filterMode === 'diniyah'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              🕌 Diniyah ({diniyahSessions})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              tabIndex={0}
              className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-indigo-400"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak
            </button>
            {history.length > 0 && (
              <>
                {confirmClear ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleClearAll}
                      tabIndex={0}
                      className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg font-bold transition-colors"
                    >
                      Ya, Hapus Semua
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      tabIndex={0}
                      className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-bold"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    tabIndex={0}
                    className="text-xs text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors focus:ring-2 focus:ring-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Bersihkan
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* History Items Scroll List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-[220px]">
          {isHistoryLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Memuat riwayat belajar dari cloud...
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-700 text-sm">Belum Ada Riwayat Belajar</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Selesaikan kuis, tantangan mengeja, atau permainan perkalian untuk mencatat nilai dan
                bintang prestasimu di sini!
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isSd = item.curriculumMode === 'sd';
              const accuracy = item.accuracyPercent ?? 100;
              const isGreat = accuracy >= 80;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isSd ? 'bg-indigo-50 border border-indigo-100' : 'bg-emerald-50 border border-emerald-100'
                      }`}
                    >
                      {getActivityIcon(item.activityType)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                            isSd
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isSd ? '🎒 SD Umum' : '🕌 Diniyah'}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm">{item.activityTitle}</h4>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {item.dateFormatted}
                        </span>
                        {item.details && (
                          <span className="text-slate-400 hidden sm:inline">• {item.details}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                    {/* Score / Accuracy Pill */}
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-600">
                          {item.score}/{item.totalQuestions} Benar
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2 py-0.5 rounded-lg ${
                            accuracy === 100
                              ? 'bg-emerald-100 text-emerald-800'
                              : isGreat
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {accuracy}%
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-600 font-bold flex items-center justify-end gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> +{item.starsEarned} Bintang
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      tabIndex={0}
                      title="Hapus rekaman ini"
                      className="opacity-60 hover:opacity-100 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all focus:ring-2 focus:ring-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            {user
              ? `Tersinkronisasi dengan akun: ${user.email}`
              : 'Mode Tamu: Masuk dengan Google agar data tidak hilang.'}
          </span>
          <button
            onClick={() => {
              soundAudio.playPop();
              onClose();
            }}
            tabIndex={0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xs focus:ring-2 focus:ring-indigo-400"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
