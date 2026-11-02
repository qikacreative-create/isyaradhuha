// Data untuk Game Perkalian Ceria
// Cocok untuk SD & MI (Madrasah Ibtidaiyah)

export interface MathMonster {
  id: string;
  name: string;
  title: string;
  level: number;
  maxHp: number;
  emoji: string;
  color: string;
  dialogueIntro: string;
  dialogueDefeated: string;
  storyQuestion: {
    question: string;
    factorA: number;
    factorB: number;
    options: number[];
    explanation: string;
    contextHint: string;
  };
}

export interface MultiplicationTrick {
  id: string;
  title: string;
  multiplier: number;
  badge: string;
  icon: string;
  summary: string;
  steps: string[];
  example: string;
  practiceProblems: { a: number; b: number; result: number }[];
}

export const MULTIPLICATION_TRICKS: MultiplicationTrick[] = [
  {
    id: 'trik_angka_9',
    title: 'Trik Ajaib Jari Tangan Angka 9',
    multiplier: 9,
    badge: 'Trik Jari',
    icon: '✋',
    summary: 'Gunakan 10 jarimu untuk menghitung perkalian 9 dalam sekejap tanpa menghafal rumit!',
    steps: [
      'Buka kedua telapak tanganmu menghadap ke arahmu (jari 1 sampai 10 dari kiri ke kanan).',
      'Untuk 9 × 4: Tekuk jari ke-4 dari kiri (jari manis tangan kiri).',
      'Hitung jari di sebelah kiri jari yang ditekuk: ada 3 jari (bernilai 30 puluhan).',
      'Hitung jari di sebelah kanan jari yang ditekuk: ada 6 jari (bernilai 6 satuan).',
      'Gabungkan angkanya: 3 dan 6 menjadi 36! Jadi 9 × 4 = 36.'
    ],
    example: '9 × 7 -> Tekuk jari ke-7. Di kiri ada 6 jari, di kanan ada 3 jari. Hasilnya 63!',
    practiceProblems: [
      { a: 9, b: 2, result: 18 },
      { a: 9, b: 3, result: 27 },
      { a: 9, b: 5, result: 45 },
      { a: 9, b: 6, result: 54 },
      { a: 9, b: 8, result: 72 }
    ]
  },
  {
    id: 'trik_angka_5',
    title: 'Trik Jam & Akhiran 0 / 5',
    multiplier: 5,
    badge: 'Pola Akhir',
    icon: '⏰',
    summary: 'Hasil perkalian 5 selalu berakhir dengan angka 0 (jika dikali genap) atau 5 (jika dikali ganjil).',
    steps: [
      'Jika dikali angka genap (2, 4, 6, 8): Bagi dua angka tersebut, lalu tambahkan angka 0 di belakangnya. Contoh: 5 × 6 -> Setengah dari 6 adalah 3, tambahkan 0 -> 30!',
      'Jika dikali angka ganjil (1, 3, 5, 7, 9): Kurangi satu, bagi dua, lalu beri angka 5 di belakangnya. Contoh: 5 × 7 -> 7 - 1 = 6 -> setengahnya 3 -> 35!',
      'Ingat juga jarum panjang jam dinding: tiap loncat 1 angka bernilai 5 menit.'
    ],
    example: '5 × 8 = 40 (setengah dari 8 adalah 4, tambah 0 = 40)',
    practiceProblems: [
      { a: 5, b: 4, result: 20 },
      { a: 5, b: 7, result: 35 },
      { a: 5, b: 6, result: 30 },
      { a: 5, b: 9, result: 45 },
      { a: 5, b: 8, result: 40 }
    ]
  },
  {
    id: 'trik_angka_2',
    title: 'Trik Lipat Dua (Penjumlahan Kembar)',
    multiplier: 2,
    badge: 'Lipat Ganda',
    icon: '👥',
    summary: 'Perkalian 2 hanyalah menjumlahkan bilangan itu dengan dirinya sendiri (kembar).',
    steps: [
      '2 × Bilangan sama artinya dengan Bilangan + Bilangan.',
      'Contoh: 2 × 7 = 7 + 7 = 14.',
      'Contoh: 2 × 8 = 8 + 8 = 16.',
      'Mudah dan cepat dihitung di luar kepala!'
    ],
    example: '2 × 9 = 9 + 9 = 18',
    practiceProblems: [
      { a: 2, b: 6, result: 12 },
      { a: 2, b: 8, result: 16 },
      { a: 2, b: 7, result: 14 },
      { a: 2, b: 9, result: 18 }
    ]
  },
  {
    id: 'trik_angka_4',
    title: 'Trik Lipat Ganda Dua Kali',
    multiplier: 4,
    badge: 'Dua Kali Lipat',
    icon: '⚡',
    summary: 'Perkalian 4 adalah perkalian 2 yang dilipatgandakan dua kali!',
    steps: [
      'Untuk menghitung 4 × Bilangan: Lipat gandakan bilangan itu sekali, lalu lipat gandakan lagi!',
      'Contoh 4 × 6: Lipat pertama 6 + 6 = 12. Lipat kedua 12 + 12 = 24. Jadi 4 × 6 = 24!',
      'Contoh 4 × 7: 7 + 7 = 14 -> 14 + 14 = 28. Jadi 4 × 7 = 28!'
    ],
    example: '4 × 8 -> 8 + 8 = 16 -> 16 + 16 = 32',
    practiceProblems: [
      { a: 4, b: 3, result: 12 },
      { a: 4, b: 5, result: 20 },
      { a: 4, b: 7, result: 28 },
      { a: 4, b: 9, result: 36 }
    ]
  },
  {
    id: 'trik_komutatif',
    title: 'Sifat Bolak-Balik (Komutatif: a × b = b × a)',
    multiplier: 0,
    badge: 'Kunci Rahasia',
    icon: '🔄',
    summary: 'Jika kamu bingung 8 × 3, balik saja jadi 3 × 8! Hasilnya pasti sama persis.',
    steps: [
      'Urutan bilangan pada perkalian tidak mengubah hasil.',
      'Contoh: 7 × 4 sama dengan 4 × 7 = 28.',
      'Contoh: 9 × 2 sama dengan 2 × 9 = 18.',
      'Dengan trik ini, kamu hanya perlu menghafal setengah dari seluruh tabel perkalian!'
    ],
    example: '8 × 5 = 5 × 8 = 40',
    practiceProblems: [
      { a: 6, b: 3, result: 18 },
      { a: 7, b: 2, result: 14 },
      { a: 8, b: 4, result: 32 }
    ]
  }
];

export const TOWER_MONSTERS: MathMonster[] = [
  {
    id: 'm1',
    name: 'Slime Bilangan Hijau',
    title: 'Penjaga Gerbang Menara',
    level: 1,
    maxHp: 3,
    emoji: '🟢',
    color: 'from-emerald-400 to-green-600',
    dialogueIntro: 'Kwek! Aku si Slime Bilangan. Bisakah kamu melewati gerbang perkalian pertamaku?',
    dialogueDefeated: 'Aduh! Bintang ilmumu bersinar terlalu terang! Kamu hebat!',
    storyQuestion: {
      question: 'Umar menyiapkan 3 baris sajadah di mushola madrasah. Setiap baris muat 5 santri. Berapa total santri yang muat sholat bersama?',
      factorA: 3,
      factorB: 5,
      options: [12, 15, 18, 20],
      explanation: '3 baris × 5 santri = 5 + 5 + 5 = 15 santri.',
      contextHint: '3 kelompok yang masing-masing berisi 5'
    }
  },
  {
    id: 'm2',
    name: 'Goblin Keranjang Apel',
    title: 'Pencuri Buah Kebun',
    level: 2,
    maxHp: 4,
    emoji: '👺',
    color: 'from-amber-500 to-orange-600',
    dialogueIntro: 'Hehehe! Aku mengumpulkan banyak keranjang apel manis. Tebak jumlahnya jika kamu bisa!',
    dialogueDefeated: 'Huhu, kamu jago sekali berhitung cepat!',
    storyQuestion: {
      question: 'Di kebun ada 4 keranjang apel ranum. Setiap keranjang berisi 6 buah apel segar. Berapa jumlah seluruh buah apel tersebut?',
      factorA: 4,
      factorB: 6,
      options: [20, 24, 28, 30],
      explanation: '4 keranjang × 6 apel = 6 + 6 + 6 + 6 = 24 apel.',
      contextHint: '4 kelompok yang masing-masing berisi 6'
    }
  },
  {
    id: 'm3',
    name: 'Kucing Penyihir Matriks',
    title: 'Penjaga Perpustakaan Angka',
    level: 3,
    maxHp: 4,
    emoji: '🧙‍♂️',
    color: 'from-indigo-500 to-purple-600',
    dialogueIntro: 'Meow! Di perpustakaanku ada banyak rak kitab suci. Jawab pertanyaanku untuk naik ke lantai 4!',
    dialogueDefeated: 'Meoow! Logika perkalianmu sangat tajam dan mengagumkan!',
    storyQuestion: {
      question: 'Fatimah merapikan rak buku madrasah. Terdapat 5 rak kitab, dan setiap rak memuat 7 mushaf Al-Qur\'an. Berapa jumlah mushaf semuanya?',
      factorA: 5,
      factorB: 7,
      options: [30, 32, 35, 40],
      explanation: '5 rak × 7 mushaf = 7 + 7 + 7 + 7 + 7 = 35 mushaf.',
      contextHint: '5 kelompok yang masing-masing berisi 7'
    }
  },
  {
    id: 'm4',
    name: 'Robot Hitung Cepat',
    title: 'Mesin Logika Perkalian',
    level: 4,
    maxHp: 5,
    emoji: '🤖',
    color: 'from-cyan-500 to-blue-600',
    dialogueIntro: 'BEEP BOOP! Sirkuit logikaku memproses perkalian dengan kecepatan tinggi! Coba kalahkan aku!',
    dialogueDefeated: 'BEEP... ERROR! Kecepatan otak anak sholeh lebih cepat dari prosesorku!',
    storyQuestion: {
      question: 'Pak Guru membagikan 6 paket pensil warna untuk lomba kaligrafi. Masing-masing paket berisi 8 batang pensil. Berapa total pensil warnanya?',
      factorA: 6,
      factorB: 8,
      options: [42, 46, 48, 54],
      explanation: '6 paket × 8 pensil = 8 + 8 + 8 + 8 + 8 + 8 = 48 pensil warna.',
      contextHint: '6 kelompok yang masing-masing berisi 8'
    }
  },
  {
    id: 'm5',
    name: 'Raja Naga Perkalian',
    title: 'Penguasa Puncak Menara',
    level: 5,
    maxHp: 6,
    emoji: '🐉',
    color: 'from-rose-500 to-red-700',
    dialogueIntro: 'ROAAR! Aku Raja Naga Perkalian! Hanya murid terhebat dan tertekun yang bisa menaklukkanku!',
    dialogueDefeated: 'Luar biasa! Kamu adalah Master Perkalian sejati! Terimalah mahkota bintangmu!',
    storyQuestion: {
      question: 'Untuk buka puasa bersama di madrasah, panitia menyiapkan 7 meja makan. Di setiap meja tersedia 9 porsi kurma ajwa. Berapa jumlah kurma semuanya?',
      factorA: 7,
      factorB: 9,
      options: [56, 61, 63, 72],
      explanation: '7 meja × 9 porsi = 9 + 9 + 9 + 9 + 9 + 9 + 9 = 63 porsi kurma!',
      contextHint: 'Gunakan trik jari 9 untuk 7 × 9 = 63!'
    }
  }
];

export const VISUAL_ITEMS = [
  { emoji: '🍎', name: 'Apel' },
  { emoji: '⭐', name: 'Bintang Emas' },
  { emoji: '🍪', name: 'Kue Kurma' },
  { emoji: '✏️', name: 'Pensil Kaligrafi' },
  { emoji: '🐟', name: 'Ikan Koi' },
  { emoji: '🧁', name: 'Kue Muffin' },
  { emoji: '🌸', name: 'Bunga Melati' },
  { emoji: '⚽', name: 'Bola Olahraga' }
];
