import React, { useRef, useState, useEffect } from 'react';
import { HIJAIYAH_LETTERS } from '../data/imlaData';
import { soundAudio } from '../utils/audio';
import { Eraser, RotateCcw, Volume2, Sparkles, Download, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ImlaCanvasProps {
  initialLetter?: string;
  onEarnStar: (stars: number) => void;
}

export const ImlaCanvas: React.FC<ImlaCanvasProps> = ({ initialLetter = 'ب', onEarnStar }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLetter, setSelectedLetter] = useState(initialLetter);
  const [brushColor, setBrushColor] = useState('#0f172a');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  // Stroke history for undo
  const [history, setHistory] = useState<ImageData[]>([]);

  const currentLetterData = HIJAIYAH_LETTERS.find(l => l.isolated === selectedLetter || l.arabic === selectedLetter) || HIJAIYAH_LETTERS[1];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    redrawBackground(ctx, rect.width, rect.height);
    saveState();
  }, [selectedLetter, showWatermark]);

  const redrawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Fill white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw Madrasah Notebook Lines (Buku Tulis Garis Tiga / Halus Kasar)
    const midY = height / 2;
    const topGuide = midY - 60;
    const bottomGuide = midY + 60;

    // Top guide line (dashed)
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, topGuide);
    ctx.lineTo(width, topGuide);
    ctx.stroke();

    // Baseline (Solid line where letters sit)
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // Bottom guide line (dashed for tails of Jim, Ra, Wawu)
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, bottomGuide);
    ctx.lineTo(width, bottomGuide);
    ctx.stroke();

    ctx.setLineDash([]);

    // Watermark tracing guide
    if (showWatermark) {
      ctx.save();
      ctx.font = 'bold 160px "Scheherazade New", "Amiri", serif';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.direction = 'rtl';
      ctx.fillText(selectedLetter, width / 2, midY - 5);
      ctx.restore();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-10), imgData]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#ffffff' : brushColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    redrawBackground(ctx, rect.width, rect.height);
    saveState();
    soundAudio.playTing();
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previous = newHistory[newHistory.length - 1];
    if (previous) {
      ctx.putImageData(previous, 0, 0);
      setHistory(newHistory);
      soundAudio.playTing();
    }
  };

  const handleCompletePractice = () => {
    soundAudio.playSuccessChime();
    onEarnStar(2);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tulisan-arab-${selectedLetter}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <span>Papan Tulis & Khat Arab MI</span>
            <span>·</span>
            <span>Buku Halus Kasar Garis Tiga</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Kanvas Latihan Menulis Huruf Hijaiyah & Imla’
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-xl">
            Latihlah goresan tanganmu mengikuti garis buku madrasah. Tulislah dari sebelah kanan ke kiri secara perlahan dan rapi.
          </p>
        </div>

        <button
          onClick={handleCompletePractice}
          className="self-start md:self-auto px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Selesai Menulis (+2 Bintang)</span>
        </button>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Letter Selector Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Pilih Huruf untuk Ditulis</h3>
            <button
              onClick={() => soundAudio.speakArabic(selectedLetter)}
              className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg flex items-center gap-1 text-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengar</span>
            </button>
          </div>

          {/* Letter grid */}
          <div className="grid grid-cols-6 gap-1.5 max-h-56 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
            {HIJAIYAH_LETTERS.map(item => {
              const isSelected = selectedLetter === item.isolated;
              return (
                <button
                  key={item.arabic}
                  onClick={() => {
                    setSelectedLetter(item.isolated);
                    soundAudio.speakArabic(item.arabic);
                  }}
                  className={`aspect-square flex items-center justify-center rounded-lg text-lg font-arabic font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs scale-105 ring-2 ring-emerald-500'
                      : 'bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200/80'
                  }`}
                >
                  {item.isolated}
                </button>
              );
            })}
          </div>

          {/* Selected Letter Hint & Connected forms */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-900">
                Panduan Huruf: {currentLetterData.name} ({currentLetterData.latin})
              </span>
              <span className="font-arabic text-xl font-bold text-emerald-800">
                {currentLetterData.isolated}
              </span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              <span className="font-semibold">Cara Menggores:</span> {currentLetterData.strokeHint}
            </p>
            <div className="text-[11px] text-emerald-800 flex items-center justify-between pt-1 border-t border-emerald-200/60">
              <span>Bentuk di awal: <b className="font-arabic text-base">{currentLetterData.initial}</b></span>
              <span>Di tengah: <b className="font-arabic text-base">{currentLetterData.medial}</b></span>
              <span>Di akhir: <b className="font-arabic text-base">{currentLetterData.final}</b></span>
            </div>
          </div>
        </div>

        {/* Digital Canvas Drawing Surface */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            {/* Color Palette */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1">Tinta:</span>
              {[
                { label: 'Hitam', hex: '#0f172a' },
                { label: 'Hijau', hex: '#047857' },
                { label: 'Biru', hex: '#1d4ed8' },
                { label: 'Merah', hex: '#b91c1c' }
              ].map(c => (
                <button
                  key={c.hex}
                  onClick={() => {
                    setBrushColor(c.hex);
                    setIsEraser(false);
                  }}
                  title={c.label}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    brushColor === c.hex && !isEraser ? 'scale-125 border-emerald-600 ring-2 ring-emerald-300' : 'border-white'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}

              {/* Eraser */}
              <button
                onClick={() => setIsEraser(!isEraser)}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  isEraser
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Penghapus"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Penghapus</span>
              </button>
            </div>

            {/* Brush Size Slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Tebal:</span>
              <input
                type="range"
                min="4"
                max="22"
                value={brushSize}
                onChange={e => setBrushSize(Number(e.target.value))}
                className="w-20 sm:w-24 accent-emerald-600"
              />
            </div>

            {/* Canvas Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowWatermark(!showWatermark)}
                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1"
                title={showWatermark ? 'Sembunyikan bayangan cetak' : 'Tampilkan bayangan cetak'}
              >
                {showWatermark ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden md:inline">{showWatermark ? 'Sembunyikan Pola' : 'Lihat Pola'}</span>
              </button>

              <button
                onClick={handleUndo}
                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg text-xs"
                title="Batalkan goresan (Undo)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleClear}
                className="px-2.5 py-1 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold"
                title="Bersihkan kanvas"
              >
                Bersihkan
              </button>

              <button
                onClick={handleDownload}
                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg text-xs"
                title="Unduh hasil tulisan"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actual Canvas */}
          <div className="relative border-2 border-slate-200 rounded-xl overflow-hidden touch-none bg-white shadow-inner cursor-crosshair">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-80 sm:h-96 block"
            />
          </div>

          {/* Footer Instruction */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              💡 Garis putus-putus atas/bawah adalah batas puncak huruf dan ekor huruf (seperti ر، ز، ج، و).
            </span>
            <span className="font-semibold text-emerald-800">Arah tulis: Kanan ➔ Kiri</span>
          </div>
        </div>
      </div>
    </div>
  );
};
