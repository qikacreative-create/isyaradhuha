// Data Kurikulum Matematika Kelas 2 SD / MI
// Sesuai Capaian Pembelajaran Kurikulum Merdeka & Kemenag Madrasah Ibtidaiyah

export interface PlaceValueProblem {
  id: string;
  number: number;
  hundreds: number;
  tens: number;
  ones: number;
  wordName: string;
}

export interface MultiplicationConcept {
  factorA: number; // groups
  factorB: number; // items per group
  repeatedAddition: string; // "4 + 4 + 4"
  result: number;
  itemEmoji: string;
  groupLabel: string;
}

export interface MathChallenge {
  id: string;
  category: 'bilangan' | 'penjumlahan' | 'pengurangan' | 'perkalian' | 'pembagian' | 'bangun' | 'jam_ukur';
  title: string;
  question: string;
  visualHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  storyContext?: string;
}

export const MATH_GRADE2_UNITS = [
  {
    id: 'bilangan_cacah',
    title: '1. Bilangan Cacah Sampai 1.000',
    subtitle: 'Nilai tempat ratusan, puluhan, satuan & membandingkan',
    badge: 'Bilangan',
    icon: '🔢',
    color: 'amber',
    summary: 'Mengenal lambang dan nama bilangan hingga 1.000, menentukan nilai tempat angka, serta membandingkan bilangan lebih besar (>) atau lebih kecil (<).'
  },
  {
    id: 'penjumlahan_pengurangan',
    title: '2. Penjumlahan & Pengurangan',
    subtitle: 'Teknik susun menyimpan, meminjam & soal cerita',
    badge: 'Operasi Hitung',
    icon: '➕',
    color: 'emerald',
    summary: 'Menghitung penjumlahan dengan teknik menyimpan 1 dan pengurangan dengan teknik meminjam puluhan, dilengkapi soal cerita sehari-hari.'
  },
  {
    id: 'perkalian_dasar',
    title: '3. Konsep Perkalian Dasar',
    subtitle: 'Perkalian sebagai penjumlahan berulang bergambar',
    badge: 'Perkalian',
    icon: '✖️',
    color: 'blue',
    summary: 'Memahami arti perkalian sebagai penjumlahan berulang dari bilangan yang sama menggunakan ilustrasi kelompok benda nyata.'
  },
  {
    id: 'pembagian_dasar',
    title: '4. Konsep Pembagian Dasar',
    subtitle: 'Pembagian sebagai pengurangan berulang sampai habis',
    badge: 'Pembagian',
    icon: '➗',
    color: 'purple',
    summary: 'Memahami pembagian sebagai membagi benda sama banyak ke beberapa wadah atau pengurangan berulang hingga menghasilkan nol.'
  },
  {
    id: 'bangun_datar_ruang',
    title: '5. Bangun Datar & Bangun Ruang',
    subtitle: 'Mengenal sisi, sudut, titik sudut & bentuk geometri',
    badge: 'Geometri',
    icon: '📐',
    color: 'rose',
    summary: 'Mengidentifikasi ciri-ciri persegi, persegi panjang, segitiga, lingkaran, serta bangun ruang kubus dan balok sederhana.'
  },
  {
    id: 'pengukuran_waktu_berat',
    title: '6. Pengukuran: Jam, Panjang & Berat',
    subtitle: 'Membaca jam dinding analog, satuan meter (m) & kilogram (kg)',
    badge: 'Pengukuran',
    icon: '⏰',
    color: 'teal',
    summary: 'Membaca waktu pada jam analog (tepat & lewat 30 menit), mengukur panjang benda dengan mistar (cm & m), serta mengukur berat (kg & gram).'
  }
];

export const PLACE_VALUE_SAMPLES: PlaceValueProblem[] = [
  { id: 'pv1', number: 245, hundreds: 2, tens: 4, ones: 5, wordName: 'Dua ratus empat puluh lima' },
  { id: 'pv2', number: 382, hundreds: 3, tens: 8, ones: 2, wordName: 'Tiga ratus delapan puluh dua' },
  { id: 'pv3', number: 507, hundreds: 5, tens: 0, ones: 7, wordName: 'Lima ratus tujuh' },
  { id: 'pv4', number: 630, hundreds: 6, tens: 3, ones: 0, wordName: 'Enam ratus tiga puluh' },
  { id: 'pv5', number: 719, hundreds: 7, tens: 1, ones: 9, wordName: 'Tujuh ratus sembilan belas' },
  { id: 'pv6', number: 456, hundreds: 4, tens: 5, ones: 6, wordName: 'Empat ratus lima puluh enam' }
];

export const MULTIPLICATION_EXAMPLES: MultiplicationConcept[] = [
  { factorA: 3, factorB: 4, repeatedAddition: '4 + 4 + 4', result: 12, itemEmoji: '🍎', groupLabel: '3 keranjang, tiap keranjang ada 4 apel' },
  { factorA: 4, factorB: 3, repeatedAddition: '3 + 3 + 3 + 3', result: 12, itemEmoji: '⭐', groupLabel: '4 baris, tiap baris ada 3 bintang' },
  { factorA: 2, factorB: 5, repeatedAddition: '5 + 5', result: 10, itemEmoji: '🐟', groupLabel: '2 akuarium, tiap akuarium ada 5 ikan' },
  { factorA: 5, factorB: 2, repeatedAddition: '2 + 2 + 2 + 2 + 2', result: 10, itemEmoji: '🧁', groupLabel: '5 piring, tiap piring ada 2 kue' },
  { factorA: 3, factorB: 6, repeatedAddition: '6 + 6 + 6', result: 18, itemEmoji: '✏️', groupLabel: '3 kotak, tiap kotak ada 6 pensil' },
  { factorA: 4, factorB: 5, repeatedAddition: '5 + 5 + 5 + 5', result: 20, itemEmoji: '🌸', groupLabel: '4 vas bunga, tiap vas ada 5 tangkai bunga' }
];

export const DIVISION_EXAMPLES = [
  { total: 12, divisor: 3, quotient: 4, subtractionProcess: '12 - 3 - 3 - 3 - 3 = 0 (pengurangan 3 sebanyak 4 kali)', emoji: '🍪', note: '12 kue dibagikan kepada 3 anak sama banyak, masing-masing mendapat 4 kue.' },
  { total: 15, divisor: 5, quotient: 3, subtractionProcess: '15 - 5 - 5 - 5 = 0 (pengurangan 5 sebanyak 3 kali)', emoji: '🍊', note: '15 jeruk dimasukkan ke 5 kantong sama rata, masing-masing ada 3 jeruk.' },
  { total: 18, divisor: 2, quotient: 9, subtractionProcess: '18 - 2 dikurangkan sampai 9 kali = 0', emoji: '📚', note: '18 buku dibagi rata untuk 2 santriwati, masing-masing mendapat 9 buku.' },
  { total: 20, divisor: 4, quotient: 5, subtractionProcess: '20 - 4 - 4 - 4 - 4 - 4 = 0 (pengurangan 4 sebanyak 5 kali)', emoji: '🍬', note: '20 permen dibagi untuk 4 kelompok, tiap kelompok dapat 5 permen.' }
];

export const GEOMETRY_SHAPES = [
  {
    id: 'persegi',
    name: 'Persegi',
    type: 'datar',
    sides: 4,
    corners: 4,
    description: 'Memiliki 4 sisi sama panjang dan 4 sudut siku-siku sama besar.',
    emoji: '🟦',
    realExamples: 'Ubin lantai, papan catur, origami lipat.'
  },
  {
    id: 'persegi_panjang',
    name: 'Persegi Panjang',
    type: 'datar',
    sides: 4,
    corners: 4,
    description: 'Memiliki 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku.',
    emoji: '🚪',
    realExamples: 'Papan tulis kelas, buku tulis, pintu madrasah.'
  },
  {
    id: 'segitiga',
    name: 'Segitiga',
    type: 'datar',
    sides: 3,
    corners: 3,
    description: 'Memiliki 3 sisi dan 3 titik sudut.',
    emoji: '🔺',
    realExamples: 'Potongan pizza, penggaris segitiga, atap rumah.'
  },
  {
    id: 'lingkaran',
    name: 'Lingkaran',
    type: 'datar',
    sides: 1, // 1 lengkung
    corners: 0,
    description: 'Memiliki 1 sisi lengkung melingkar tanpa titik sudut sama sekali.',
    emoji: '⭕',
    realExamples: 'Uang koin, jam dinding bulat, roda sepeda.'
  },
  {
    id: 'kubus',
    name: 'Kubus (Bangun Ruang)',
    type: 'ruang',
    faces: 6,
    edges: 12,
    corners: 8,
    description: 'Bangun ruang yang memiliki 6 sisi berbentuk persegi yang sama besar.',
    emoji: '🎲',
    realExamples: 'Dadu permainan, kotak kado persegi, rubik.'
  },
  {
    id: 'balok',
    name: 'Balok (Bangun Ruang)',
    type: 'ruang',
    faces: 6,
    edges: 12,
    corners: 8,
    description: 'Bangun ruang yang memiliki 6 sisi persegi panjang dengan ukuran pasang.',
    emoji: '📦',
    realExamples: 'Kotak pensil, kardus mie, lemari kelas.'
  }
];

export const MATH_CHALLENGES: MathChallenge[] = [
  {
    id: 'mc1',
    category: 'bilangan',
    title: 'Nilai Tempat Angka',
    question: 'Pada bilangan 375, berapakah nilai tempat angka 7?',
    options: ['Satuan (7)', 'Puluhan (70)', 'Ratusan (700)', 'Ribuan'],
    correctIndex: 1,
    explanation: 'Pada bilangan 375: angka 3 bernilai 300 (ratusan), angka 7 bernilai 70 (puluhan), dan angka 5 bernilai 5 (satuan).'
  },
  {
    id: 'mc2',
    category: 'bilangan',
    title: 'Membandingkan Bilangan',
    question: 'Tanda perbandingan yang tepat untuk 468 ... 486 adalah:',
    options: ['> (Lebih besar)', '< (Lebih kecil)', '= (Sama dengan)', '≥'],
    correctIndex: 1,
    explanation: 'Karena ratusannya sama-sama 4, kita bandingkan puluhannya. 6 puluhan lebih kecil daripada 8 puluhan. Jadi 468 < 486.'
  },
  {
    id: 'mc3',
    category: 'penjumlahan',
    title: 'Penjumlahan Bersusun Teknik Menyimpan',
    question: 'Berapakah hasil dari 148 + 237?',
    options: ['375', '385', '395', '415'],
    correctIndex: 1,
    explanation: 'Satuan: 8 + 7 = 15 (tulis 5 simpan 1). Puluhan: 1 (simpanan) + 4 + 3 = 8. Ratusan: 1 + 2 = 3. Hasilnya adalah 385.'
  },
  {
    id: 'mc4',
    category: 'pengurangan',
    title: 'Pengurangan Bersusun Teknik Meminjam',
    question: 'Hasil dari 352 - 128 adalah:',
    options: ['224', '234', '226', '214'],
    correctIndex: 0,
    explanation: 'Satuan 2 tidak bisa dikurangi 8, pinjam 1 puluhan dari 5 (sisa 4), jadi 12 - 8 = 4. Puluhan: 4 - 2 = 2. Ratusan: 3 - 1 = 2. Hasilnya 224.'
  },
  {
    id: 'mc5',
    category: 'perkalian',
    title: 'Perkalian Penjumlahan Berulang',
    question: 'Bentuk penjumlahan berulang dari 4 × 6 adalah:',
    options: ['4 + 4 + 4 + 4 + 4 + 4', '6 + 6 + 6 + 6', '4 + 6 + 4 + 6', '6 + 4'],
    correctIndex: 1,
    explanation: '4 × 6 artinya ada 4 kelompok yang masing-masing berisi 6. Jadi bentuk penjumlahannya adalah 6 + 6 + 6 + 6 = 24.'
  },
  {
    id: 'mc6',
    category: 'pembagian',
    title: 'Pembagian Bagi Rata',
    question: 'Ustadzah membagikan 16 buah buku kepada 4 santriwati sama rata. Berapa buku yang didapat setiap anak?',
    options: ['3 buku', '4 buku', '5 buku', '6 buku'],
    correctIndex: 1,
    explanation: '16 : 4 = 16 - 4 - 4 - 4 - 4 = 0 (pengurangan angka 4 sebanyak 4 kali). Jadi tiap anak mendapat 4 buku.'
  },
  {
    id: 'mc7',
    category: 'bangun',
    title: 'Titik Sudut Bangun Datar',
    question: 'Bangun datar yang memiliki 3 sisi dan 3 titik sudut adalah:',
    options: ['Persegi', 'Lingkaran', 'Segitiga', 'Trapesium'],
    correctIndex: 2,
    explanation: 'Segitiga memiliki tepat 3 sisi dan 3 titik sudut. Lingkaran tidak punya sudut, sedangkan persegi punya 4 sudut.'
  },
  {
    id: 'mc8',
    category: 'jam_ukur',
    title: 'Membaca Jam Analog',
    question: 'Jika jarum pendek menunjuk angka 3 dan jarum panjang menunjuk tepat angka 12, maka jam menunjukkan pukul:',
    options: ['Pukul 12.03', 'Pukul 03.12', 'Pukul 03.00 tepat', 'Pukul 03.30'],
    correctIndex: 2,
    explanation: 'Jarum pendek menunjukkan jam (3), dan jarum panjang di angka 12 menunjukkan menit 00 (tepat). Jadi pukul 03.00.'
  },
  {
    id: 'mc9',
    category: 'jam_ukur',
    title: 'Satuan Panjang Baku',
    question: '1 meter (m) sama dengan berapa centimeter (cm)?',
    options: ['10 cm', '100 cm', '1.000 cm', '50 cm'],
    correctIndex: 1,
    explanation: 'Satuan panjang baku: 1 meter = 100 centimeter (1 m = 100 cm).'
  },
  {
    id: 'mc10',
    category: 'bilangan',
    title: 'Bilangan Genap & Ganjil',
    question: 'Manakah dari bilangan berikut yang merupakan bilangan genap?',
    options: ['123', '245', '358', '471'],
    correctIndex: 2,
    explanation: 'Bilangan genap adalah bilangan yang angka satuannya 0, 2, 4, 6, atau 8. Bilangan 358 memiliki satuan 8 sehingga merupakan bilangan genap.'
  }
];
