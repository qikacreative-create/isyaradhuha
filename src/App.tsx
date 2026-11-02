/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { TabType, UserProgress, CharacterConfig, CurriculumMode } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ImlaModule } from './components/ImlaModule';
import { ImlaCanvas } from './components/ImlaCanvas';
import { TajwidModule } from './components/TajwidModule';
import { ArabicBasicModule } from './components/ArabicBasicModule';
import { EnglishModule } from './components/EnglishModule';
import { ScienceModule } from './components/ScienceModule';
import { MathGrade2Module } from './components/MathGrade2Module';
import { IndonesianGrade2Module } from './components/IndonesianGrade2Module';
import { QuizGame } from './components/QuizGame';
import { SnakesAndLaddersGame } from './components/SnakesAndLaddersGame';
import { MemoryCardGame } from './components/MemoryCardGame';
import { SpinWheelGame } from './components/SpinWheelGame';
import { HijaiyahConnectGame } from './components/HijaiyahConnectGame';
import { MultiplicationGame } from './components/MultiplicationGame';
import { SpellingRescueGame } from './components/SpellingRescueGame';
import { StudentReportModal } from './components/StudentReportModal';
import { DictionaryModal } from './components/DictionaryModal';
import { AvatarCreatorModal } from './components/AvatarCreatorModal';
import { LoginModal } from './components/LoginModal';
import { LearningHistoryModal } from './components/LearningHistoryModal';
import { CompanionWidget } from './components/CompanionWidget';
import { TvRemoteBar } from './components/TvRemoteBar';
import { TVSpatialNavigator, isSmartTVBrowser } from './utils/tvNavigation';
import { soundAudio } from './utils/audio';
import { useAuth } from './context/AuthContext';

const DEFAULT_CHARACTER: CharacterConfig = {
  name: 'Fatimah',
  avatarRole: 'companion',
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
  blushStyle: 'sparkles',
  faceMark: 'none',
  skinTone: 'warm_peach',
  handPose: 'peace',
  outfit: 'sd_merah',
  accessory: 'star_pin',
  auraEffect: 'sparkles',
  companionTitle: 'Sahabat Belajar'
};

const DEFAULT_STUDENT_CHARACTER: CharacterConfig = {
  name: 'Aisyah Putri',
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

const DEFAULT_PROGRESS: UserProgress = {
  stars: 8,
  completedImlaLessons: [],
  completedTajwidLessons: [],
  vocabMastered: [],
  quizScores: [],
  studentName: 'Aisyah Putri',
  madrasahName: 'Sekolah Dasar Negeri',
  character: DEFAULT_CHARACTER,
  studentCharacter: DEFAULT_STUDENT_CHARACTER
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [curriculumMode, setCurriculumMode] = useState<CurriculumMode>(() => {
    try {
      const saved = localStorage.getItem('curriculum_mode_v2');
      if (saved === 'diniyah' || saved === 'sd') return saved;
    } catch {
      // ignore
    }
    return 'sd';
  });
  const [isTvMode, setIsTvMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bintang_tv_mode_v1');
      if (saved !== null) return saved === 'true';
      return isSmartTVBrowser();
    } catch {
      return false;
    }
  });
  const [targetCanvasLetter, setTargetCanvasLetter] = useState<string>('ب');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false);
  const [avatarModalRole, setAvatarModalRole] = useState<'self' | 'companion'>('self');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { user, saveHistoryRecord, cloudProfile, syncProfileToCloud } = useAuth();

  const tvNavigatorRef = useRef<TVSpatialNavigator | null>(null);

  // Apply TV Mode class and persist
  useEffect(() => {
    try {
      localStorage.setItem('bintang_tv_mode_v1', String(isTvMode));
      document.body.classList.toggle('tv-mode', isTvMode);
    } catch {
      // ignore
    }
  }, [isTvMode]);

  // Synchronize cloud profile if user is logged in
  useEffect(() => {
    if (cloudProfile) {
      setProgress(prev => ({
        ...prev,
        studentName: cloudProfile.studentName || prev.studentName,
        madrasahName: cloudProfile.madrasahName || prev.madrasahName,
        stars: typeof cloudProfile.stars === 'number' ? Math.max(prev.stars, cloudProfile.stars) : prev.stars
      }));
    }
  }, [cloudProfile]);

  // Initialize and update TV Spatial Navigation for Remote Controls
  useEffect(() => {
    const nav = new TVSpatialNavigator({
      onBack: () => {
        if (isLoginOpen) { setIsLoginOpen(false); return; }
        if (isHistoryOpen) { setIsHistoryOpen(false); return; }
        if (isReportOpen) { setIsReportOpen(false); return; }
        if (isDictionaryOpen) { setIsDictionaryOpen(false); return; }
        if (isAvatarCreatorOpen) { setIsAvatarCreatorOpen(false); return; }
        if (activeTab !== 'beranda') {
          soundAudio.playTing();
          setActiveTab('beranda');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      onSelectSD: () => {
        soundAudio.playTing();
        setCurriculumMode('sd');
        const diniyahTabs: TabType[] = ['bahasa-arab', 'imla', 'tajwid', 'kanvas', 'sambung-hijaiyah', 'ular-tangga', 'kartu-memori', 'roda-putar', 'kuis'];
        if (diniyahTabs.includes(activeTab)) {
          setActiveTab('beranda');
        }
      },
      onSelectDiniyah: () => {
        soundAudio.playTing();
        setCurriculumMode('diniyah');
        const sdTabs: TabType[] = ['matematika', 'bahasa-indonesia', 'ipa', 'bahasa-inggris', 'game-perkalian', 'game-mengeja'];
        if (sdTabs.includes(activeTab)) {
          setActiveTab('beranda');
        }
      },
      onToggleFullscreen: () => {
        soundAudio.playTing();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      },
      onGoHome: () => {
        soundAudio.playTing();
        setActiveTab('beranda');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    tvNavigatorRef.current = nav;
    nav.start();

    return () => {
      nav.stop();
    };
  }, [activeTab, isReportOpen, isDictionaryOpen, isAvatarCreatorOpen, isLoginOpen, isHistoryOpen]);

  // Persist curriculum mode
  useEffect(() => {
    try {
      localStorage.setItem('curriculum_mode_v2', curriculumMode);
    } catch {
      // ignore
    }
  }, [curriculumMode]);

  // Synchronize curriculumMode if activeTab changes to a specific curriculum section
  useEffect(() => {
    const sdTabs: TabType[] = ['matematika', 'bahasa-indonesia', 'ipa', 'bahasa-inggris', 'game-perkalian', 'game-mengeja'];
    const diniyahTabs: TabType[] = ['bahasa-arab', 'imla', 'tajwid', 'kanvas', 'sambung-hijaiyah', 'ular-tangga', 'kartu-memori', 'roda-putar', 'kuis'];

    if (sdTabs.includes(activeTab) && curriculumMode !== 'sd') {
      setCurriculumMode('sd');
    } else if (diniyahTabs.includes(activeTab) && curriculumMode !== 'diniyah') {
      setCurriculumMode('diniyah');
    }
  }, [activeTab]);

  // Load progress from localStorage with character fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('bintang_belajar_sd_progress_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.character) {
          parsed.character = DEFAULT_CHARACTER;
        } else {
          parsed.character = { ...DEFAULT_CHARACTER, ...parsed.character };
        }
        if (!parsed.studentCharacter) {
          parsed.studentCharacter = {
            ...DEFAULT_STUDENT_CHARACTER,
            name: parsed.studentName || DEFAULT_STUDENT_CHARACTER.name
          };
        } else {
          parsed.studentCharacter = { ...DEFAULT_STUDENT_CHARACTER, ...parsed.studentCharacter };
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bintang_belajar_sd_progress_v2', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const handleEarnStar = (count: number) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + count
    }));
  };

  const handleRecordScore = (score: number, total: number) => {
    const starsEarned = score * 2;
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + starsEarned,
      quizScores: [
        ...prev.quizScores,
        {
          topic: curriculumMode === 'sd' ? 'Kuis Evaluasi SD (Umum)' : 'Kuis Evaluasi Diniyah Madrasah',
          score,
          total,
          date: new Date().toLocaleDateString('id-ID')
        }
      ]
    }));

    // Persist to Firebase / Local History
    saveHistoryRecord({
      curriculumMode,
      activityType: 'kuis',
      activityTitle: curriculumMode === 'sd' ? 'Kuis Evaluasi Terpadu SD' : 'Kuis Evaluasi Diniyah Madrasah',
      score,
      totalQuestions: total,
      starsEarned,
      accuracyPercent: total > 0 ? Math.round((score / total) * 100) : 100,
      details: `Menjawab benar ${score} dari ${total} soal evaluasi.`
    });
  };

  const handleRecordGameHistory = (record: {
    activityTitle: string;
    score: number;
    totalQuestions: number;
    starsEarned: number;
    accuracyPercent: number;
    details: string;
  }) => {
    saveHistoryRecord({
      curriculumMode: 'sd',
      activityType: record.activityTitle.includes('Mengeja') ? 'game-mengeja' : 'game-perkalian',
      activityTitle: record.activityTitle,
      score: record.score,
      totalQuestions: record.totalQuestions,
      starsEarned: record.starsEarned,
      accuracyPercent: record.accuracyPercent,
      details: record.details
    });
  };

  const handleOpenAvatarCreator = (role: 'self' | 'companion' = 'self') => {
    setAvatarModalRole(role);
    setIsAvatarCreatorOpen(true);
  };

  const handleUpdateStudentDetails = (name: string, madrasah: string) => {
    setProgress(prev => {
      const updated: UserProgress = {
        ...prev,
        studentName: name,
        madrasahName: madrasah,
        studentCharacter: prev.studentCharacter
          ? { ...prev.studentCharacter, name }
          : { ...DEFAULT_STUDENT_CHARACTER, name }
      };
      if (user) {
        syncProfileToCloud(updated);
      }
      return updated;
    });
  };

  const handleUpdateCharacter = (newCharacter: CharacterConfig, role: 'self' | 'companion' = 'self') => {
    setProgress(prev => {
      let updated: UserProgress;
      if (role === 'self') {
        updated = {
          ...prev,
          studentName: newCharacter.name || prev.studentName,
          studentCharacter: newCharacter
        };
      } else {
        updated = {
          ...prev,
          character: newCharacter
        };
      }
      if (user) {
        syncProfileToCloud(updated);
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  const handleNavigateToCanvas = (letter?: string) => {
    if (letter) {
      setTargetCanvasLetter(letter);
    }
    setCurriculumMode('diniyah');
    setActiveTab('kanvas');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        curriculumMode={curriculumMode}
        setCurriculumMode={setCurriculumMode}
        progress={progress}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenAvatarCreator={(role = 'self') => handleOpenAvatarCreator(role)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isTvMode={isTvMode}
        onToggleTvMode={() => setIsTvMode(prev => !prev)}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* Companion Interactive Widget - shown on lessons only so game arenas remain clean and uncluttered */}
        {activeTab !== 'beranda' &&
          !['game-perkalian', 'game-mengeja', 'sambung-hijaiyah', 'ular-tangga', 'kartu-memori', 'roda-putar', 'kuis'].includes(activeTab) && (
          <CompanionWidget
            config={progress.character || DEFAULT_CHARACTER}
            currentTab={activeTab}
            curriculumMode={curriculumMode}
            onOpenCreator={() => handleOpenAvatarCreator('companion')}
          />
        )}

        {activeTab === 'beranda' && (
          <HomeHero
            setActiveTab={setActiveTab}
            curriculumMode={curriculumMode}
            setCurriculumMode={setCurriculumMode}
            progress={progress}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenAvatarCreator={handleOpenAvatarCreator}
          />
        )}

        {activeTab === 'bahasa-arab' && (
          <ArabicBasicModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'imla' && (
          <ImlaModule
            onEarnStar={handleEarnStar}
            onNavigateToCanvas={handleNavigateToCanvas}
            onNavigateToGame={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'tajwid' && (
          <TajwidModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'bahasa-inggris' && (
          <EnglishModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'ipa' && (
          <ScienceModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'matematika' && (
          <MathGrade2Module
            onEarnStar={handleEarnStar}
            onNavigateToGame={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'bahasa-indonesia' && (
          <IndonesianGrade2Module onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'kanvas' && (
          <ImlaCanvas
            initialLetter={targetCanvasLetter}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'ular-tangga' && (
          <SnakesAndLaddersGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab as TabType)}
          />
        )}

        {activeTab === 'sambung-hijaiyah' && (
          <HijaiyahConnectGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab as TabType)}
          />
        )}

        {activeTab === 'game-perkalian' && (
          <MultiplicationGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab as TabType)}
            onRecordHistory={handleRecordGameHistory}
          />
        )}

        {activeTab === 'game-mengeja' && (
          <SpellingRescueGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab as TabType)}
            onRecordHistory={handleRecordGameHistory}
          />
        )}

        {activeTab === 'kartu-memori' && (
          <MemoryCardGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab as TabType)}
          />
        )}

        {activeTab === 'roda-putar' && (
          <SpinWheelGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
            onSwitchToGame={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'kuis' && (
          <QuizGame
            onEarnStar={handleEarnStar}
            onRecordScore={handleRecordScore}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200/60 bg-white/80 py-6 mb-16 sm:mb-0 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-arabic text-lg font-bold text-emerald-800">ب</span>
            <span className="font-bold text-slate-700">Bintang Belajar SD & MI</span>
            <span>·</span>
            <span>Teman Belajar Santriwati: {progress.character?.name || 'Fatimah'}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-slate-400 flex-wrap justify-center">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="text-indigo-700 hover:underline font-bold"
            >
              Riwayat Belajar 📜
            </button>
            <span>·</span>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-emerald-700 hover:underline font-bold"
            >
              {user ? 'Akun Siswa ☁️' : 'Masuk / Login 🔑'}
            </button>
            <span>·</span>
            <button
              onClick={() => handleOpenAvatarCreator('self')}
              className="text-pink-700 hover:underline font-bold"
            >
              Kustom Karakter 🎨
            </button>
            <span>·</span>
            <button
              onClick={() => setIsDictionaryOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Buku Saku
            </button>
            <span>·</span>
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Rapor Siswa
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Avatar Creator / Customizer Modal (Self Student + Companion) */}
      <AvatarCreatorModal
        isOpen={isAvatarCreatorOpen}
        onClose={() => setIsAvatarCreatorOpen(false)}
        currentConfig={progress.character || DEFAULT_CHARACTER}
        studentConfig={progress.studentCharacter || DEFAULT_STUDENT_CHARACTER}
        studentName={progress.studentName || 'Aisyah Putri'}
        initialRole={avatarModalRole}
        onSaveConfig={handleUpdateCharacter}
        onEarnStar={handleEarnStar}
      />

      {/* Student Progress Report Modal */}
      <StudentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        progress={progress}
        onUpdateName={handleUpdateStudentDetails}
        onResetProgress={handleResetProgress}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAvatarCreator={handleOpenAvatarCreator}
      />

      {/* Quick Dictionary and Glossary Modal */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      {/* Login & Cloud Account Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        progress={progress}
        onUpdateName={handleUpdateStudentDetails}
        isTvMode={isTvMode}
      />

      {/* Learning History & Achievements Modal */}
      <LearningHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        isTvMode={isTvMode}
      />

      {/* Smart TV Remote HUD & Controller */}
      <TvRemoteBar
        isTvMode={isTvMode}
        onToggleTvMode={() => setIsTvMode(prev => !prev)}
        curriculumMode={curriculumMode}
        onSwitchCurriculum={(mode) => {
          soundAudio.playTing();
          setCurriculumMode(mode);
          setActiveTab('beranda');
        }}
        onGoHome={() => {
          soundAudio.playTing();
          setActiveTab('beranda');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoBack={() => {
          if (isLoginOpen) { setIsLoginOpen(false); return; }
          if (isHistoryOpen) { setIsHistoryOpen(false); return; }
          if (isReportOpen) { setIsReportOpen(false); return; }
          if (isDictionaryOpen) { setIsDictionaryOpen(false); return; }
          if (isAvatarCreatorOpen) { setIsAvatarCreatorOpen(false); return; }
          if (activeTab !== 'beranda') {
            soundAudio.playTing();
            setActiveTab('beranda');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        navigatorInstance={tvNavigatorRef.current || undefined}
      />
    </div>
  );
}
