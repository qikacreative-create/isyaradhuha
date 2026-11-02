import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserProgress } from '../types';
import {
  LogIn,
  LogOut,
  X,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Cloud,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Tv
} from 'lucide-react';
import { soundAudio } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateName: (name: string, madrasah: string) => void;
  isTvMode?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateName,
  isTvMode = false
}) => {
  const { user, loginWithGoogle, logout, isLoggingIn, authError, syncProfileToCloud } = useAuth();
  const [localStudentName, setLocalStudentName] = useState(progress.studentName);
  const [localSchoolName, setLocalSchoolName] = useState(progress.madrasahName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    soundAudio.playTing();
    await loginWithGoogle();
  };

  const handleLogout = async () => {
    soundAudio.playPop();
    await logout();
  };

  const handleSaveProfile = async () => {
    soundAudio.playTing();
    onUpdateName(localStudentName, localSchoolName);
    if (user) {
      await syncProfileToCloud({
        ...progress,
        studentName: localStudentName,
        madrasahName: localSchoolName
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className={`bg-white rounded-3xl max-w-md w-full p-5 sm:p-8 shadow-2xl border border-slate-100 max-h-[94vh] overflow-y-auto space-y-5 ${isTvMode ? 'tv-card' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              {user ? <UserCheck className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">
                {user ? 'Akun Siswa / Pembelajar' : 'Masuk / Login Belajar'}
              </h3>
              <p className="text-xs text-slate-500">
                {user ? 'Data tersinkron otomatis ke Cloud' : 'Simpan riwayat & bintang secara permanen'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundAudio.playPop();
              onClose();
            }}
            tabIndex={0}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-emerald-500"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Card */}
        {user ? (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Pengguna'}
                  className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'S'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 truncate text-sm">
                    {user.displayName || 'Pengguna Google'}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                    <Cloud className="w-2.5 h-2.5" /> Online
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  ⭐ {progress.stars} Bintang Tersimpan di Akun
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
              <span className="text-[11px] text-slate-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Riwayat belajar tersimpan aman
              </span>
              <button
                onClick={handleLogout}
                tabIndex={0}
                className="text-xs text-rose-600 font-bold hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 focus:ring-2 focus:ring-rose-400"
              >
                <LogOut className="w-3.5 h-3.5" /> Keluar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600" /> Mengapa Perlu Login?
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800/90 pl-1">
                <li>Riwayat skor kuis & permainan tersimpan di cloud Firebase</li>
                <li>Bisa dibuka di HP, Tablet, Laptop, maupun Smart TV rumah</li>
                <li>Prestasi dan koleksi bintang tidak akan hilang meski ganti perangkat</li>
              </ul>
            </div>

            {authError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{authError}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              tabIndex={0}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl font-bold text-slate-800 text-sm shadow-sm transition-all focus:outline-hidden focus:ring-4 focus:ring-emerald-300 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoggingIn ? 'Menghubungkan Akun...' : 'Masuk dengan Akun Google'}</span>
            </button>
          </div>
        )}

        {/* Profile Customization Section (Works for both guest and logged in) */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Identitas Siswa di Rapor
            </h4>
            <span className="text-[11px] text-slate-400">
              {user ? 'Tersimpan di Cloud' : 'Mode Perangkat / Tamu'}
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Nama Siswa / Santri:
              </label>
              <input
                type="text"
                value={localStudentName}
                onChange={(e) => setLocalStudentName(e.target.value)}
                placeholder="Contoh: Aisyah Putri"
                tabIndex={0}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Nama Sekolah / Madrasah:
              </label>
              <input
                type="text"
                value={localSchoolName}
                onChange={(e) => setLocalSchoolName(e.target.value)}
                placeholder="Contoh: SDN 01 Harapan / MI Nurul Falah"
                tabIndex={0}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              tabIndex={0}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-emerald-400"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Simpan Identitas Siswa</span>
            </button>

            {savedSuccess && (
              <p className="text-center text-xs text-emerald-600 font-bold animate-fade-in flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Identitas berhasil diperbarui!
              </p>
            )}
          </div>
        </div>

        {/* Footer tip */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            {isTvMode
              ? 'Pada Smart TV, gunakan tombol panah remote dan tombol OK untuk memilih opsi.'
              : 'Anda tetap bisa belajar & bermain tanpa login (mode tamu menyimpan riwayat di peramban ini).'}
          </span>
        </div>
      </div>
    </div>
  );
};
