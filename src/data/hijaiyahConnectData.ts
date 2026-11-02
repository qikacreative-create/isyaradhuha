export interface LetterForm {
  arabic: string;
  name: string;
  latin: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  canConnectLeft: boolean;
  notes?: string;
}

export interface WordAssemblyItem {
  id: string;
  word: string; // e.g. "كَتَبَ"
  meaning: string; // "Menulis"
  emoji: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  letters: {
    char: string; // base letter, e.g. 'ك'
    withHarakat: string; // 'كَ'
    name: string; // 'Kaf'
    position: 'awal' | 'tengah' | 'akhir' | 'terpisah';
    connectedForm: string; // 'كَـ' or 'ـتَـ' or 'ـبَ'
    canConnectLeft: boolean;
  }[];
  ruleNote: string;
}

export interface ConnectRuleChallenge {
  id: string;
  letterA: { char: string; name: string };
  letterB: { char: string; name: string };
  canConnect: boolean;
  resultConnected: string;
  resultSeparated: string;
  explanation: string;
}

export interface PositionMatcherQuestion {
  id: string;
  letter: string;
  letterName: string;
  targetPosition: 'awal' | 'tengah' | 'akhir';
  targetPositionLabel: string;
  correctForm: string;
  options: string[];
  explanation: string;
}

// 6 Huruf yang tidak bisa menyambung ke kiri (Huruf Pemutus / Sombong)
export const NON_CONNECTORS = ['ا', 'د', 'ذ', 'ر', 'ز', 'و'];

export const HIJAIYAH_CONNECT_FORMS: LetterForm[] = [
  { arabic: 'ا', name: 'Alif', latin: 'a', isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا', canConnectLeft: false, notes: 'Hanya menyambung dari kanan' },
  { arabic: 'ب', name: 'Ba', latin: 'b', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', canConnectLeft: true },
  { arabic: 'ت', name: 'Ta', latin: 't', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', canConnectLeft: true },
  { arabic: 'ث', name: 'Tsa', latin: 'ts', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', canConnectLeft: true },
  { arabic: 'ج', name: 'Jim', latin: 'j', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', canConnectLeft: true },
  { arabic: 'ح', name: 'Ha', latin: 'h', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', canConnectLeft: true },
  { arabic: 'خ', name: 'Kha', latin: 'kh', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', canConnectLeft: true },
  { arabic: 'د', name: 'Dal', latin: 'd', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', canConnectLeft: false, notes: 'Huruf pemutus (tidak menyambung ke kiri)' },
  { arabic: 'ذ', name: 'Dzal', latin: 'dz', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', canConnectLeft: false, notes: 'Huruf pemutus (tidak menyambung ke kiri)' },
  { arabic: 'ر', name: 'Ra', latin: 'r', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', canConnectLeft: false, notes: 'Huruf pemutus (tidak menyambung ke kiri)' },
  { arabic: 'ز', name: 'Zai', latin: 'z', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز', canConnectLeft: false, notes: 'Huruf pemutus (tidak menyambung ke kiri)' },
  { arabic: 'س', name: 'Sin', latin: 's', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', canConnectLeft: true },
  { arabic: 'ش', name: 'Syin', latin: 'sy', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', canConnectLeft: true },
  { arabic: 'ص', name: 'Shad', latin: 'sh', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', canConnectLeft: true },
  { arabic: 'ض', name: 'Dhad', latin: 'dh', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', canConnectLeft: true },
  { arabic: 'ط', name: 'Tha', latin: 'th', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', canConnectLeft: true },
  { arabic: 'ظ', name: 'Zha', latin: 'zh', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', canConnectLeft: true },
  { arabic: 'ع', name: '‘Ain', latin: '‘a', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', canConnectLeft: true, notes: 'Bentuk tengah & akhir tertutup dan berubah drastis' },
  { arabic: 'غ', name: 'Ghain', latin: 'gh', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', canConnectLeft: true },
  { arabic: 'ف', name: 'Fa', latin: 'f', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', canConnectLeft: true },
  { arabic: 'ق', name: 'Qaf', latin: 'q', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', canConnectLeft: true },
  { arabic: 'ك', name: 'Kaf', latin: 'k', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', canConnectLeft: true, notes: 'Bentuk awal & tengah berubah menjadi pipih miring' },
  { arabic: 'ل', name: 'Lam', latin: 'l', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', canConnectLeft: true },
  { arabic: 'م', name: 'Mim', latin: 'm', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', canConnectLeft: true },
  { arabic: 'ن', name: 'Nun', latin: 'n', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', canConnectLeft: true },
  { arabic: 'و', name: 'Wawu', latin: 'w', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو', canConnectLeft: false, notes: 'Huruf pemutus (tidak menyambung ke kiri)' },
  { arabic: 'هـ', name: 'Ha', latin: 'h', isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه', canConnectLeft: true, notes: 'Bentuk tengah mirip angka delapan / kupu-kupu' },
  { arabic: 'ي', name: 'Ya', latin: 'y', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', canConnectLeft: true }
];

export const WORD_ASSEMBLY_CHALLENGES: WordAssemblyItem[] = [
  // LEVEL 1: Mudah (Semua Huruf Menyambung Mulus)
  {
    id: 'w-1',
    word: 'كَتَبَ',
    meaning: 'Dia Menulis',
    emoji: '✍️',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'ك', withHarakat: 'كَ', name: 'Kaf', position: 'awal', connectedForm: 'كَـ', canConnectLeft: true },
      { char: 'ت', withHarakat: 'تَ', name: 'Ta', position: 'tengah', connectedForm: 'ـتَـ', canConnectLeft: true },
      { char: 'ب', withHarakat: 'بَ', name: 'Ba', position: 'akhir', connectedForm: 'ـبَ', canConnectLeft: true }
    ],
    ruleNote: 'Semua huruf ini bisa saling menyambung! Kaf di awal (كَـ), Ta di tengah (ـتَـ), dan Ba di akhir (ـبَ).'
  },
  {
    id: 'w-2',
    word: 'سَمَكٌ',
    meaning: 'Ikan',
    emoji: '🐟',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'س', withHarakat: 'سَ', name: 'Sin', position: 'awal', connectedForm: 'سَـ', canConnectLeft: true },
      { char: 'م', withHarakat: 'مَ', name: 'Mim', position: 'tengah', connectedForm: 'ـمَـ', canConnectLeft: true },
      { char: 'ك', withHarakat: 'كٌ', name: 'Kaf', position: 'akhir', connectedForm: 'ـكٌ', canConnectLeft: true }
    ],
    ruleNote: 'Sin di awal dipotong ekornya (سَـ), Mim di tengah menyambung dua sisi (ـمَـ), Kaf di akhir kembali utuh (ـكٌ).'
  },
  {
    id: 'w-3',
    word: 'قَلَمٌ',
    meaning: 'Pena',
    emoji: '✏️',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'ق', withHarakat: 'قَ', name: 'Qaf', position: 'awal', connectedForm: 'قَـ', canConnectLeft: true },
      { char: 'ل', withHarakat: 'لَ', name: 'Lam', position: 'tengah', connectedForm: 'ـلَـ', canConnectLeft: true },
      { char: 'م', withHarakat: 'مٌ', name: 'Mim', position: 'akhir', connectedForm: 'ـمٌ', canConnectLeft: true }
    ],
    ruleNote: 'Qaf (قَـ) gandeng Lam (ـلَـ) lalu gandeng Mim (ـمٌ) dengan ekor turun ke bawah.'
  },
  {
    id: 'w-4',
    word: 'لَبَنٌ',
    meaning: 'Susu Segar',
    emoji: '🥛',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'ل', withHarakat: 'لَ', name: 'Lam', position: 'awal', connectedForm: 'لَـ', canConnectLeft: true },
      { char: 'ب', withHarakat: 'بَ', name: 'Ba', position: 'tengah', connectedForm: 'ـبَـ', canConnectLeft: true },
      { char: 'ن', withHarakat: 'نٌ', name: 'Nun', position: 'akhir', connectedForm: 'ـنٌ', canConnectLeft: true }
    ],
    ruleNote: 'Lam di awal lurus tegak (لَـ), Ba di tengah ada 1 titik di bawah (ـبَـ), Nun di akhir mangkuk bertitik 1 di atas (ـنٌ).'
  },
  {
    id: 'w-5',
    word: 'عَيْنٌ',
    meaning: 'Mata',
    emoji: '👁️',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'ع', withHarakat: 'عَ', name: '‘Ain', position: 'awal', connectedForm: 'عَـ', canConnectLeft: true },
      { char: 'ي', withHarakat: 'يْ', name: 'Ya', position: 'tengah', connectedForm: 'ـيْـ', canConnectLeft: true },
      { char: 'ن', withHarakat: 'نٌ', name: 'Nun', position: 'akhir', connectedForm: 'ـنٌ', canConnectLeft: true }
    ],
    ruleNote: '‘Ain di awal terbuka ke kanan (عَـ), Ya di tengah bertitik dua di bawah (ـيْـ), Nun di akhir (ـنٌ).'
  },
  {
    id: 'w-6',
    word: 'جَمَلٌ',
    meaning: 'Unta Gurun',
    emoji: '🐪',
    level: 1,
    levelLabel: 'Level 1: Dasar Menyambung',
    letters: [
      { char: 'ج', withHarakat: 'جَ', name: 'Jim', position: 'awal', connectedForm: 'جَـ', canConnectLeft: true },
      { char: 'م', withHarakat: 'مَ', name: 'Mim', position: 'tengah', connectedForm: 'ـمَـ', canConnectLeft: true },
      { char: 'ل', withHarakat: 'لٌ', name: 'Lam', position: 'akhir', connectedForm: 'ـلٌ', canConnectLeft: true }
    ],
    ruleNote: 'Jim di awal dipotong perutnya (جَـ), bersambung dengan Mim (ـمَـ), dan Lam di akhir melengkung ke bawah (ـلٌ).'
  },

  // LEVEL 2: Sedang (Ada 1 Huruf Pemutus di Depan / Tengah: ا, د, ذ, ر, ز, و)
  {
    id: 'w-7',
    word: 'وَلَدٌ',
    meaning: 'Anak Laki-laki',
    emoji: '👦',
    level: 2,
    levelLabel: 'Level 2: Ada Huruf Pemutus',
    letters: [
      { char: 'و', withHarakat: 'وَ', name: 'Wawu', position: 'awal', connectedForm: 'وَ', canConnectLeft: false },
      { char: 'ل', withHarakat: 'لَ', name: 'Lam', position: 'awal', connectedForm: 'لَـ', canConnectLeft: true },
      { char: 'د', withHarakat: 'دٌ', name: 'Dal', position: 'akhir', connectedForm: 'ـدٌ', canConnectLeft: false }
    ],
    ruleNote: 'Perhatikan! Huruf Wawu (وَ) adalah huruf pemutus, ia tidak mau digandeng ke kiri! Maka Lam (لَـ) mulai dari awal lagi dan menyambung ke Dal (ـدٌ).'
  },
  {
    id: 'w-8',
    word: 'بَابٌ',
    meaning: 'Pintu',
    emoji: '🚪',
    level: 2,
    levelLabel: 'Level 2: Ada Huruf Pemutus',
    letters: [
      { char: 'ب', withHarakat: 'بَا', name: 'Ba', position: 'awal', connectedForm: 'بَـ', canConnectLeft: true },
      { char: 'ا', withHarakat: 'ا', name: 'Alif', position: 'akhir', connectedForm: 'ـا', canConnectLeft: false },
      { char: 'ب', withHarakat: 'بٌ', name: 'Ba', position: 'terpisah', connectedForm: 'بٌ', canConnectLeft: true }
    ],
    ruleNote: 'Ba menyambung Alif (بَـ + ـا = بَا). Karena Alif tidak bisa menyambung ke kiri, Ba terakhir berdiri mandiri / terpisah (بٌ)!'
  },
  {
    id: 'w-9',
    word: 'دَفْتَرٌ',
    meaning: 'Buku Tulis',
    emoji: '📓',
    level: 2,
    levelLabel: 'Level 2: Ada Huruf Pemutus',
    letters: [
      { char: 'د', withHarakat: 'دَ', name: 'Dal', position: 'awal', connectedForm: 'دَ', canConnectLeft: false },
      { char: 'ف', withHarakat: 'فْ', name: 'Fa', position: 'awal', connectedForm: 'فْـ', canConnectLeft: true },
      { char: 'ت', withHarakat: 'تَ', name: 'Ta', position: 'tengah', connectedForm: 'ـتَـ', canConnectLeft: true },
      { char: 'ر', withHarakat: 'رٌ', name: 'Ra', position: 'akhir', connectedForm: 'ـرٌ', canConnectLeft: false }
    ],
    ruleNote: 'Dal (دَ) pemutus di depan. Lalu Fa (فْـ) menyambung Ta (ـتَـ) dan menyambung Ra (ـرٌ)!'
  },
  {
    id: 'w-10',
    word: 'نَجْمٌ',
    meaning: 'Bintang Bersinar',
    emoji: '⭐',
    level: 2,
    levelLabel: 'Level 2: Ada Huruf Pemutus',
    letters: [
      { char: 'ن', withHarakat: 'نَ', name: 'Nun', position: 'awal', connectedForm: 'نَـ', canConnectLeft: true },
      { char: 'ج', withHarakat: 'جْ', name: 'Jim', position: 'tengah', connectedForm: 'ـجْـ', canConnectLeft: true },
      { char: 'م', withHarakat: 'مٌ', name: 'Mim', position: 'akhir', connectedForm: 'ـمٌ', canConnectLeft: true }
    ],
    ruleNote: 'Nun di awal (نَـ), Jim di tengah dipotong ekornya (ـجْـ), Mim di akhir (ـمٌ).'
  },
  {
    id: 'w-11',
    word: 'زَهْرَةٌ',
    meaning: 'Bunga Cantik',
    emoji: '🌸',
    level: 2,
    levelLabel: 'Level 2: Ada Huruf Pemutus',
    letters: [
      { char: 'ز', withHarakat: 'زَ', name: 'Zai', position: 'awal', connectedForm: 'زَ', canConnectLeft: false },
      { char: 'هـ', withHarakat: 'هْ', name: 'Ha', position: 'awal', connectedForm: 'هْـ', canConnectLeft: true },
      { char: 'ر', withHarakat: 'رَ', name: 'Ra', position: 'akhir', connectedForm: 'ـرَ', canConnectLeft: false },
      { char: 'ة', withHarakat: 'ةٌ', name: 'Ta Marbuthah', position: 'terpisah', connectedForm: 'ةٌ', canConnectLeft: false }
    ],
    ruleNote: 'Zai (زَ) tidak gandeng ke kiri. Ha menyambung Ra (هْـرَ). Lalu Ra tidak gandeng ke kiri sehingga Ta Marbuthah terpisah (ةٌ)!'
  },

  // LEVEL 3: Menantang (Kata Campuran & 4 Huruf Berbobot)
  {
    id: 'w-12',
    word: 'مَسْجِدٌ',
    meaning: 'Masjid Suci',
    emoji: '🕌',
    level: 3,
    levelLabel: 'Level 3: Kata 4 Huruf Master',
    letters: [
      { char: 'م', withHarakat: 'مَ', name: 'Mim', position: 'awal', connectedForm: 'مَـ', canConnectLeft: true },
      { char: 'س', withHarakat: 'سْ', name: 'Sin', position: 'tengah', connectedForm: 'ـسْـ', canConnectLeft: true },
      { char: 'ج', withHarakat: 'جِ', name: 'Jim', position: 'tengah', connectedForm: 'ـجِـ', canConnectLeft: true },
      { char: 'د', withHarakat: 'دٌ', name: 'Dal', position: 'akhir', connectedForm: 'ـدٌ', canConnectLeft: false }
    ],
    ruleNote: 'Mim (مَـ) ➔ Sin (ـسْـ) ➔ Jim (ـجِـ) ➔ Dal (ـدٌ). Keempat huruf saling menyambung indah sampai Dal di akhir!'
  },
  {
    id: 'w-13',
    word: 'كِتَابٌ',
    meaning: 'Buku Pelajaran',
    emoji: '📚',
    level: 3,
    levelLabel: 'Level 3: Kata 4 Huruf Master',
    letters: [
      { char: 'ك', withHarakat: 'كِ', name: 'Kaf', position: 'awal', connectedForm: 'كِـ', canConnectLeft: true },
      { char: 'ت', withHarakat: 'تَ', name: 'Ta', position: 'tengah', connectedForm: 'ـتَـ', canConnectLeft: true },
      { char: 'ا', withHarakat: 'ا', name: 'Alif', position: 'akhir', connectedForm: 'ـا', canConnectLeft: false },
      { char: 'ب', withHarakat: 'بٌ', name: 'Ba', position: 'terpisah', connectedForm: 'بٌ', canConnectLeft: true }
    ],
    ruleNote: 'Kaf (كِـ) menyambung Ta (ـتَـ) menyambung Alif (ـا). Alif pemutus, maka Ba berdiri sendiri (بٌ)!'
  },
  {
    id: 'w-14',
    word: 'شَمْسٌ',
    meaning: 'Matahari Terang',
    emoji: '☀️',
    level: 3,
    levelLabel: 'Level 3: Kata 4 Huruf Master',
    letters: [
      { char: 'ش', withHarakat: 'شَ', name: 'Syin', position: 'awal', connectedForm: 'شَـ', canConnectLeft: true },
      { char: 'م', withHarakat: 'مْ', name: 'Mim', position: 'tengah', connectedForm: 'ـمْـ', canConnectLeft: true },
      { char: 'س', withHarakat: 'سٌ', name: 'Sin', position: 'akhir', connectedForm: 'ـسٌ', canConnectLeft: true }
    ],
    ruleNote: 'Syin dengan 3 titik di atas (شَـ), menyambung Mim bulat (ـمْـ), dan Sin utuh di akhir (ـسٌ).'
  },
  {
    id: 'w-15',
    word: 'تُفَّاحٌ',
    meaning: 'Buah Apel Manis',
    emoji: '🍎',
    level: 3,
    levelLabel: 'Level 3: Kata 4 Huruf Master',
    letters: [
      { char: 'ت', withHarakat: 'تُ', name: 'Ta', position: 'awal', connectedForm: 'تُـ', canConnectLeft: true },
      { char: 'ف', withHarakat: 'فَّ', name: 'Fa', position: 'tengah', connectedForm: 'ـفَّـ', canConnectLeft: true },
      { char: 'ا', withHarakat: 'ا', name: 'Alif', position: 'akhir', connectedForm: 'ـا', canConnectLeft: false },
      { char: 'ح', withHarakat: 'حٌ', name: 'Ha', position: 'terpisah', connectedForm: 'حٌ', canConnectLeft: true }
    ],
    ruleNote: 'Ta (تُـ) menyambung Fa (ـفَّـ) menyambung Alif (ـا). Alif pemutus, maka Ha bersih tanpa titik berdiri sendiri (حٌ)!'
  }
];

export const CONNECT_RULE_CHALLENGES: ConnectRuleChallenge[] = [
  {
    id: 'rule-1',
    letterA: { char: 'ب', name: 'Ba' },
    letterB: { char: 'ت', name: 'Ta' },
    canConnect: true,
    resultConnected: 'بـتـ',
    resultSeparated: 'ب ت',
    explanation: 'Huruf Ba bisa menyambung ke kiri dan Ta menerima sambungan dari kanan!'
  },
  {
    id: 'rule-2',
    letterA: { char: 'د', name: 'Dal' },
    letterB: { char: 'ر', name: 'Ra' },
    canConnect: false,
    resultConnected: 'دـر',
    resultSeparated: 'د ر',
    explanation: 'Huruf Dal adalah 1 dari 6 huruf pemutus (sombong), tidak boleh menyambung ke kiri!'
  },
  {
    id: 'rule-3',
    letterA: { char: 'ر', name: 'Ra' },
    letterB: { char: 'ك', name: 'Kaf' },
    canConnect: false,
    resultConnected: 'رـك',
    resultSeparated: 'ر ك',
    explanation: 'Huruf Ra adalah huruf pemutus, sehingga Kaf setelahnya harus terpisah!'
  },
  {
    id: 'rule-4',
    letterA: { char: 'م', name: 'Mim' },
    letterB: { char: 'ن', name: 'Nun' },
    canConnect: true,
    resultConnected: 'مـنـ',
    resultSeparated: 'م ن',
    explanation: 'Huruf Mim dan Nun sama-sama huruf yang senang bersambung dari dua arah!'
  },
  {
    id: 'rule-5',
    letterA: { char: 'و', name: 'Wawu' },
    letterB: { char: 'ل', name: 'Lam' },
    canConnect: false,
    resultConnected: 'وـل',
    resultSeparated: 'و ل',
    explanation: 'Huruf Wawu termasuk 6 huruf pemutus (أ د ذ ر ز و), tidak bisa digandeng ke kiri!'
  },
  {
    id: 'rule-6',
    letterA: { char: 'ع', name: '‘Ain' },
    letterB: { char: 'ل', name: 'Lam' },
    canConnect: true,
    resultConnected: 'عـلـ',
    resultSeparated: 'ع ل',
    explanation: '‘Ain di awal memotong ekornya lalu menggandeng tiang huruf Lam!'
  },
  {
    id: 'rule-7',
    letterA: { char: 'ز', name: 'Zai' },
    letterB: { char: 'ي', name: 'Ya' },
    canConnect: false,
    resultConnected: 'زـي',
    resultSeparated: 'ز ي',
    explanation: 'Huruf Zai bertitik satu di atas adalah huruf pemutus, tidak mau menyambung ke kiri!'
  },
  {
    id: 'rule-8',
    letterA: { char: 'ف', name: 'Fa' },
    letterB: { char: 'س', name: 'Sin' },
    canConnect: true,
    resultConnected: 'فـسـ',
    resultSeparated: 'ف س',
    explanation: 'Fa membuka tangan kanannya dan Sin membuka gigi-giginya untuk menyambung!'
  },
  {
    id: 'rule-9',
    letterA: { char: 'أ', name: 'Alif' },
    letterB: { char: 'م', name: 'Mim' },
    canConnect: false,
    resultConnected: 'أـم',
    resultSeparated: 'أ م',
    explanation: 'Huruf Alif adalah huruf pemutus pertama! Mim harus berdiri di awal baru tanpa disambung.'
  },
  {
    id: 'rule-10',
    letterA: { char: 'س', name: 'Sin' },
    letterB: { char: 'ج', name: 'Jim' },
    canConnect: true,
    resultConnected: 'سـجـ',
    resultSeparated: 'س ج',
    explanation: 'Sin dan Jim bisa saling menyambung dengan indah (seperti pada lafadz Masjid)!'
  },
  {
    id: 'rule-11',
    letterA: { char: 'ذ', name: 'Dzal' },
    letterB: { char: 'هـ', name: 'Ha' },
    canConnect: false,
    resultConnected: 'ذـهـ',
    resultSeparated: 'ذ هـ',
    explanation: 'Huruf Dzal adalah huruf pemutus, tidak boleh disambung ke kiri dengan Ha!'
  },
  {
    id: 'rule-12',
    letterA: { char: 'ل', name: 'Lam' },
    letterB: { char: 'ا', name: 'Alif' },
    canConnect: true,
    resultConnected: 'لا',
    resultSeparated: 'ل ا',
    explanation: 'Lam bisa menyambung ke Alif, dan menjadi bentuk istimewa: Lam-Alif (لا)!'
  }
];

export const POSITION_MATCHER_QUESTIONS: PositionMatcherQuestion[] = [
  {
    id: 'pm-1',
    letter: 'ج',
    letterName: 'Jim',
    targetPosition: 'tengah',
    targetPositionLabel: 'Di TENGAH Kata',
    correctForm: 'ـجـ',
    options: ['ـجـ', 'جـ', 'ـج', 'ج'],
    explanation: 'Di tengah kata, Jim memiliki sambungan tangan di kanan dan kiri (ـجـ) dan perutnya dipotong.'
  },
  {
    id: 'pm-2',
    letter: 'ع',
    letterName: '‘Ain',
    targetPosition: 'tengah',
    targetPositionLabel: 'Di TENGAH Kata',
    correctForm: 'ـعـ',
    options: ['ـعـ', 'عـ', 'ـع', 'ع'],
    explanation: 'Perhatikan! Huruf ‘Ain di tengah (ـعـ) kepalanya tertutup/arsir dan disambung kanan-kiri!'
  },
  {
    id: 'pm-3',
    letter: 'ك',
    letterName: 'Kaf',
    targetPosition: 'awal',
    targetPositionLabel: 'Di AWAL Kata',
    correctForm: 'كـ',
    options: ['كـ', 'ـكـ', 'ـك', 'ك'],
    explanation: 'Di awal kata, huruf Kaf berubah bentuk menjadi miring pipih (كـ) bukan lagi kotak berkait!'
  },
  {
    id: 'pm-4',
    letter: 'هـ',
    letterName: 'Ha',
    targetPosition: 'tengah',
    targetPositionLabel: 'Di TENGAH Kata',
    correctForm: 'ـهـ',
    options: ['ـهـ', 'هـ', 'ـه', 'ه'],
    explanation: 'Bentuk huruf Ha di tengah kata (ـهـ) sangat unik, seperti angka 8 atau sayap kupu-kupu!'
  },
  {
    id: 'pm-5',
    letter: 'ي',
    letterName: 'Ya',
    targetPosition: 'awal',
    targetPositionLabel: 'Di AWAL Kata',
    correctForm: 'يـ',
    options: ['يـ', 'ـيـ', 'ـي', 'ي'],
    explanation: 'Di awal kata, huruf Ya kehilangan lekuk bebeknya dan menjadi garis berpijak dengan 2 titik di bawah (يـ).'
  },
  {
    id: 'pm-6',
    letter: 'م',
    letterName: 'Mim',
    targetPosition: 'akhir',
    targetPositionLabel: 'Di AKHIR Kata (Menyambung)',
    correctForm: 'ـم',
    options: ['ـم', 'مـ', 'ـمـ', 'م'],
    explanation: 'Di akhir kata, Mim menerima sambungan dari kanan dan ekornya menjulur lurus ke bawah (ـم).'
  },
  {
    id: 'pm-7',
    letter: 'س',
    letterName: 'Sin',
    targetPosition: 'awal',
    targetPositionLabel: 'Di AWAL Kata',
    correctForm: 'سـ',
    options: ['سـ', 'ـسـ', 'ـس', 'س'],
    explanation: 'Di awal kata, Sin mempertahankan 3 giginya dan memotong mangkuk lengkungnya (سـ).'
  },
  {
    id: 'pm-8',
    letter: 'د',
    letterName: 'Dal',
    targetPosition: 'akhir',
    targetPositionLabel: 'Di AKHIR Kata (Setelah Huruf Normal)',
    correctForm: 'ـد',
    options: ['ـد', 'دـ', 'ـدـ', 'د'],
    explanation: 'Huruf Dal bisa menerima sambungan dari kanan (ـد), namun TIDAK bisa menyambung ke kiri!'
  }
];
