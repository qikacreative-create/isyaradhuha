import React, { useState, useEffect } from 'react';
import {
  Tv,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Undo2,
  Volume2,
  Sliders,
  Gamepad2,
  Home,
  X
} from 'lucide-react';
import { soundAudio } from '../utils/audio';
import { TVSpatialNavigator } from '../utils/tvNavigation';

interface TvRemoteBarProps {
  isTvMode: boolean;
  onToggleTvMode: () => void;
  curriculumMode: 'sd' | 'diniyah';
  onSwitchCurriculum: (mode: 'sd' | 'diniyah') => void;
  onGoHome: () => void;
  onGoBack: () => void;
  navigatorInstance?: TVSpatialNavigator;
}

export const TvRemoteBar: React.FC<TvRemoteBarProps> = ({
  isTvMode,
  onToggleTvMode,
  curriculumMode,
  onSwitchCurriculum,
  onGoHome,
  onGoBack,
  navigatorInstance
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showVirtualRemote, setShowVirtualRemote] = useState(false);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    soundAudio.playTing();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleDPadClick = (direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') => {
    if (navigatorInstance) {
      navigatorInstance.moveFocus(direction);
    } else {
      const event = new KeyboardEvent('keydown', { key: direction, bubbles: true });
      window.dispatchEvent(event);
    }
  };

  const handleOkClick = () => {
    soundAudio.playTing();
    const active = document.activeElement as HTMLElement | null;
    if (active && typeof active.click === 'function') {
      active.click();
    }
  };

  if (!isTvMode) {
    // Floating Quick TV Mode Launcher Pill at bottom-right
    return (
      <aside aria-label="Akses Cepat TV" className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40">
        <button
          onClick={onToggleTvMode}
          className="bg-stone-900/90 hover:bg-black text-amber-300 hover:text-amber-200 border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
          title="Beralih ke Tampilan TV / Smart TV (Navigasi Remote)"
        >
          <Tv className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Mode Smart TV</span>
          <span className="text-[10px] bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-md font-black">
            TV
          </span>
        </button>
      </aside>
    );
  }

  return (
    <>
      {/* Smart TV Remote HUD Footer */}
      <aside aria-label="Bilah Kontrol Smart TV" className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 text-stone-200 backdrop-blur-lg border-t-2 border-amber-500/60 shadow-2xl transition-all">
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center -mt-3.5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md transition-colors"
          >
            <span>{isCollapsed ? '▲ Buka Panduan Remote' : '▼ Sembunyikan'}</span>
          </button>
        </div>

        {!isCollapsed && (
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left: TV Mode Status & Shortcuts */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-xl font-black text-xs">
                <Tv className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>MODE SMART TV</span>
              </div>

              {/* D-Pad Keys Helper */}
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-300 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                <span className="font-mono bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded font-bold">▲ ▼ ◀ ▶</span>
                <span>Geser Fokus</span>
              </div>

              {/* OK Key Helper */}
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-300 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                <span className="font-mono bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded font-bold">OK / Enter</span>
                <span>Pilih</span>
              </div>

              {/* Back Key Helper */}
              <div className="hidden md:flex items-center gap-1 text-[11px] text-stone-300 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                <span className="font-mono bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded font-bold">Back / Esc</span>
                <span>Kembali</span>
              </div>

              {/* Number Keys Helper */}
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-stone-400">
                <span>Tombol Angka:</span>
                <span className="font-mono bg-stone-800 text-blue-300 px-1 py-0.2 rounded font-bold">[1] SD</span>
                <span className="font-mono bg-stone-800 text-emerald-300 px-1 py-0.2 rounded font-bold">[2] Diniyah</span>
              </div>
            </div>

            {/* Right: Actions (Virtual Remote, Fullscreen, Mode Exit) */}
            <div className="flex items-center gap-2">
              {/* Virtual Remote Button */}
              <button
                onClick={() => {
                  soundAudio.playTing();
                  setShowVirtualRemote(!showVirtualRemote);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showVirtualRemote
                    ? 'bg-amber-400 text-stone-950 border-amber-300'
                    : 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-stone-700'
                }`}
                title="Buka Remote TV Virtual di Layar"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Remote Layar</span>
              </button>

              {/* Fullscreen TV Button */}
              <button
                onClick={handleToggleFullscreen}
                className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Mode Layar Penuh TV (Tombol F)"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Layar Normal</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Layar Penuh [F]</span>
                  </>
                )}
              </button>

              {/* Exit TV Mode */}
              <button
                onClick={onToggleTvMode}
                className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                title="Matikan Mode Smart TV"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar Mode TV</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* On-Screen Virtual Remote Controller (Interactive D-Pad for Testing or Mouse/Touch) */}
      {showVirtualRemote && (
        <div className="fixed bottom-14 right-4 z-50 bg-stone-900/95 border-2 border-amber-500 rounded-3xl p-4 shadow-2xl text-white backdrop-blur-xl w-64 animate-in slide-in-from-bottom duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 mb-3">
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs text-amber-300">Remote TV Pintar</span>
            </div>
            <button
              onClick={() => setShowVirtualRemote(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* D-Pad Circle */}
          <div className="relative w-40 h-40 mx-auto bg-stone-950 rounded-full border-2 border-stone-700 flex items-center justify-center p-2 shadow-inner">
            {/* UP */}
            <button
              onClick={() => handleDPadClick('ArrowUp')}
              className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-10 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-t-full flex items-center justify-center transition-colors active:scale-95"
              title="Atas (Arrow Up)"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* DOWN */}
            <button
              onClick={() => handleDPadClick('ArrowDown')}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-10 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-b-full flex items-center justify-center transition-colors active:scale-95"
              title="Bawah (Arrow Down)"
            >
              <ArrowDown className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* LEFT */}
            <button
              onClick={() => handleDPadClick('ArrowLeft')}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-l-full flex items-center justify-center transition-colors active:scale-95"
              title="Kiri (Arrow Left)"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* RIGHT */}
            <button
              onClick={() => handleDPadClick('ArrowRight')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-r-full flex items-center justify-center transition-colors active:scale-95"
              title="Kanan (Arrow Right)"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* CENTER OK BUTTON */}
            <button
              onClick={handleOkClick}
              className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-xs rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all border-2 border-amber-300"
              title="Pilih / Enter"
            >
              <span>OK</span>
            </button>
          </div>

          {/* Quick TV Control Buttons Below D-Pad */}
          <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-stone-800 text-[10px] font-bold">
            <button
              onClick={onGoBack}
              className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <Undo2 className="w-4 h-4 text-amber-400" />
              <span>Kembali</span>
            </button>

            <button
              onClick={onGoHome}
              className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Beranda</span>
            </button>

            <button
              onClick={handleToggleFullscreen}
              className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <Maximize2 className="w-4 h-4 text-blue-400" />
              <span>Layar TV</span>
            </button>
          </div>

          {/* Mode Switcher Shortcut */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <button
              onClick={() => onSwitchCurriculum('sd')}
              className={`p-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                curriculumMode === 'sd'
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              🎒 [1] SD
            </button>
            <button
              onClick={() => onSwitchCurriculum('diniyah')}
              className={`p-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                curriculumMode === 'diniyah'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              🕌 [2] Diniyah
            </button>
          </div>
        </div>
      )}
    </>
  );
};
