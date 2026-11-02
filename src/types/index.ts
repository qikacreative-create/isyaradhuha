export type CurriculumMode = 'sd' | 'diniyah';

export type TabType = 
  | 'beranda' 
  | 'bahasa-arab' 
  | 'imla' 
  | 'tajwid' 
  | 'kanvas' 
  | 'bahasa-inggris' 
  | 'ipa' 
  | 'matematika'
  | 'bahasa-indonesia'
  | 'ular-tangga'
  | 'sambung-hijaiyah'
  | 'game-perkalian'
  | 'game-mengeja'
  | 'kartu-memori'
  | 'roda-putar'
  | 'kuis';

export interface EnglishVocabItem {
  id: string;
  category: string;
  english: string;
  pronunciationHint: string;
  indonesian: string;
  exampleSentence: string;
  exampleTranslation: string;
  emoji: string;
}

export interface SentenceBuilderChallenge {
  id: string;
  indonesianMeaning: string;
  words: string[];
  correctOrder: string[];
}

export interface ScienceTopic {
  id: string;
  title: string;
  gradeLevel: string; // "Kelas 3-4 SD/MI", "Kelas 5-6 SD/MI"
  category: 'biologi' | 'fisika_alam' | 'bumi_antariksa' | 'tubuh';
  summary: string;
  icon: string;
  keyConcepts: string[];
  experimentOrVisual: string;
}

export interface VocabularyItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: string;
  iconName?: string;
  exampleSentence?: {
    arabic: string;
    translation: string;
  };
}

export interface ImlaLesson {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string; // e.g., "Kelas 1-2 MI", "Kelas 3-4 MI", "Kelas 5-6 MI"
  summary: string;
  ruleFormula: string;
  explanation: string[];
  tips: string;
  examples: {
    correct: string;
    incorrect?: string;
    meaning: string;
    note: string;
  }[];
  practiceQuestions: {
    question: string;
    audioText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface TajwidRule {
  id: string;
  category: 'nun_sukun' | 'mim_sukun' | 'alif_lam' | 'qalqalah' | 'mad';
  name: string;
  arabicName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  letters: string[];
  lettersArabic: string;
  harakatCount?: string;
  definition: string;
  howToRead: string;
  examples: {
    phrase: string;
    surahRef: string;
    highlightWord: string;
    explanation: string;
  }[];
}

export interface QuranSurahStudy {
  id: string;
  name: string;
  arabicName: string;
  meaning: string;
  ayahs: {
    number: number;
    arabicText: string;
    translation: string;
    tajwidSpots: {
      startIndex: number;
      endIndex: number;
      targetText: string;
      ruleId: string;
      ruleName: string;
      explanation: string;
      color: string;
    }[];
  }[];
}

export interface CharacterConfig {
  name: string;
  avatarRole?: 'self' | 'companion'; // 'self' (Karakter Siswa Sendiri) or 'companion' (Teman Belajar)
  gender?: 'perempuan' | 'laki_laki'; // Siswi / Siswa
  headwearType?: 'hijab' | 'peci' | 'topi' | 'rambut'; // Jenis penutup kepala / rambut
  hijabColor?: string; // e.g. '#ffffff', '#059669', '#1d4ed8', '#be123c', '#ec4899', '#7c3aed'
  hijabStyle?: 'bergo_sekolah' | 'pashmina_santri' | 'kerudung_rabbani' | 'hijab_syari';
  peciStyle?: 'songkok_hitam' | 'kopiah_putih' | 'peci_hijau';
  peciColor?: string;
  hatStyle?: 'topi_sd' | 'baret_pramuka';
  hairStyle?: 'pendek_rapi' | 'kuncir_kuda' | 'ikal_lucu' | 'belah_samping';
  hairColor?: string;
  eyeExpression?: 'sparkle' | 'smile' | 'happy' | 'star_eyes' | 'gentle_round' | 'determined';
  mouthExpression?: 'sweet_smile' | 'laugh_happy' | 'cat_mouth' | 'shy_smile' | 'cool_smirk';
  blushStyle?: 'rosy' | 'sparkles' | 'hearts' | 'none';
  faceMark?: 'none' | 'freckles' | 'beauty_mark' | 'forehead_star' | 'cheek_patch';
  skinTone?: 'warm_peach' | 'fair_pink' | 'honey_tan' | 'golden_warm';
  handPose?: 'holding_book' | 'peace' | 'waving' | 'polite_fold' | 'thumbs_up' | 'holding_trophy' | 'holding_pencil';
  outfit: 'mi_hijau' | 'sd_merah' | 'pramuka' | 'batik' | 'jas_lab' | 'baju_koko';
  accessory: 'none' | 'glasses' | 'glasses_smart' | 'sunglasses' | 'bow' | 'star_pin' | 'medal' | 'pencil' | 'backpack' | 'badge_prestasi';
  auraEffect?: 'none' | 'stars' | 'sparkles' | 'rainbow' | 'bubbles' | 'music';
  companionTitle?: string;
}

export interface UserProgress {
  stars: number;
  completedImlaLessons: string[];
  completedTajwidLessons: string[];
  vocabMastered: string[];
  quizScores: {
    topic: string;
    score: number;
    total: number;
    date: string;
  }[];
  studentName: string;
  madrasahName: string;
  character: CharacterConfig; // Companion / playmate
  studentCharacter?: CharacterConfig; // Student's own character
}

export interface LearningHistoryRecord {
  id: string;
  userId: string;
  curriculumMode: 'sd' | 'diniyah';
  activityType: 'kuis' | 'game-mengeja' | 'game-perkalian' | 'imla' | 'tajwid' | 'kanvas' | 'game-lain';
  activityTitle: string;
  score: number;
  totalQuestions: number;
  starsEarned: number;
  accuracyPercent: number;
  details: string;
  dateFormatted: string;
  createdAt: string;
}

