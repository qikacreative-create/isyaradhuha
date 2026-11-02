import { EnglishVocabItem } from '../types';

export interface EnglishCategory {
  id: string;
  name: string;
  indonesian: string;
  icon: string;
  description: string;
}

export const ENGLISH_CATEGORIES: EnglishCategory[] = [
  { id: 'classroom', name: 'Classroom & School', indonesian: 'Di Sekolah & Kelas', icon: 'BookOpen', description: 'Peralatan belajar dan benda-benda di madrasah/sekolah' },
  { id: 'animals', name: 'Animals & Pets', indonesian: 'Hewan & Binatang', icon: 'Dog', description: 'Nama-nama hewan darat, air, dan udara' },
  { id: 'actions', name: 'Daily Activities', indonesian: 'Kegiatan Sehari-hari', icon: 'Activity', description: 'Kata kerja dasar dan aktivitas anak sholeh' },
  { id: 'fruits', name: 'Fruits & Food', indonesian: 'Buah & Makanan Sehat', icon: 'Apple', description: 'Buah-buahan segar dan makanan halal bergizi' },
  { id: 'family_days', name: 'Family & Days', indonesian: 'Keluarga & Hari', icon: 'Users', description: 'Anggota keluarga dan 7 nama hari dalam seminggu' },
  { id: 'conversation', name: 'Greetings & Ta’aruf', indonesian: 'Sapaan & Perkenalan', icon: 'MessageCircle', description: 'Percakapan sapaan dan berkenalan dalam bahasa Inggris' }
];

export const ENGLISH_VOCAB_LIST: EnglishVocabItem[] = [
  // CLASSROOM
  {
    id: 'en-c1',
    category: 'classroom',
    english: 'Book',
    pronunciationHint: '/bʊk/ (Buk)',
    indonesian: 'Buku',
    exampleSentence: 'I open my English book.',
    exampleTranslation: 'Saya membuka buku bahasa Inggris saya.',
    emoji: '📖'
  },
  {
    id: 'en-c2',
    category: 'classroom',
    english: 'Pencil',
    pronunciationHint: '/ˈpɛn.səl/ (Pen-sel)',
    indonesian: 'Pensil',
    exampleSentence: 'She draws a flower with a pencil.',
    exampleTranslation: 'Dia menggambar bunga dengan sebuah pensil.',
    emoji: '✏️'
  },
  {
    id: 'en-c3',
    category: 'classroom',
    english: 'Backpack',
    pronunciationHint: '/ˈbæk.pæk/ (Bek-pek)',
    indonesian: 'Tas Sekolah / Ransel',
    exampleSentence: 'My backpack is clean and blue.',
    exampleTranslation: 'Tas sekolahku bersih dan berwarna biru.',
    emoji: '🎒'
  },
  {
    id: 'en-c4',
    category: 'classroom',
    english: 'Eraser',
    pronunciationHint: '/ɪˈreɪ.sər/ (I-re-ser)',
    indonesian: 'Penghapus',
    exampleSentence: 'May I borrow your eraser?',
    exampleTranslation: 'Bolehkah saya meminjam penghapusmu?',
    emoji: '🧼'
  },
  {
    id: 'en-c5',
    category: 'classroom',
    english: 'Whiteboard',
    pronunciationHint: '/ˈwaɪt.bɔːrd/ (Wait-bord)',
    indonesian: 'Papan Tulis Putih',
    exampleSentence: 'The teacher writes on the whiteboard.',
    exampleTranslation: 'Guru menulis di papan tulis putih.',
    emoji: '📋'
  },
  {
    id: 'en-c6',
    category: 'classroom',
    english: 'Ruler',
    pronunciationHint: '/ˈruː.lər/ (Ru-ler)',
    indonesian: 'Penggaris',
    exampleSentence: 'Use a ruler to draw a straight line.',
    exampleTranslation: 'Gunakan penggaris untuk menggambar garis lurus.',
    emoji: '📏'
  },

  // ANIMALS
  {
    id: 'en-a1',
    category: 'animals',
    english: 'Cat',
    pronunciationHint: '/kæt/ (Ket)',
    indonesian: 'Kucing',
    exampleSentence: 'The cat is sleeping under the table.',
    exampleTranslation: 'Kucing itu sedang tidur di bawah meja.',
    emoji: '🐱'
  },
  {
    id: 'en-a2',
    category: 'animals',
    english: 'Elephant',
    pronunciationHint: '/ˈɛl.ə.fənt/ (E-le-fen)',
    indonesian: 'Gajah',
    exampleSentence: 'The elephant has a long trunk and big ears.',
    exampleTranslation: 'Gajah mempunyai belalai panjang dan telinga besar.',
    emoji: '🐘'
  },
  {
    id: 'en-a3',
    category: 'animals',
    english: 'Butterfly',
    pronunciationHint: '/ˈbʌt.ər.flaɪ/ (Ba-ter-flai)',
    indonesian: 'Kupu-kupu',
    exampleSentence: 'A colorful butterfly flies over the flowers.',
    exampleTranslation: 'Kupu-kupu berwarna-warni terbang di atas bunga.',
    emoji: '🦋'
  },
  {
    id: 'en-a4',
    category: 'animals',
    english: 'Bird',
    pronunciationHint: '/bɜːrd/ (Berd)',
    indonesian: 'Burung',
    exampleSentence: 'The bird sings in the morning.',
    exampleTranslation: 'Burung itu berkicau di pagi hari.',
    emoji: '🐦'
  },
  {
    id: 'en-a5',
    category: 'animals',
    english: 'Fish',
    pronunciationHint: '/fɪʃ/ (Fisy)',
    indonesian: 'Ikan',
    exampleSentence: 'Fish swim gracefully in the river.',
    exampleTranslation: 'Ikan-ikan berenang dengan lincah di sungai.',
    emoji: '🐟'
  },

  // DAILY ACTIVITIES
  {
    id: 'en-d1',
    category: 'actions',
    english: 'Read',
    pronunciationHint: '/riːd/ (Riid)',
    indonesian: 'Membaca',
    exampleSentence: 'I read the Holy Quran every day.',
    exampleTranslation: 'Saya membaca Al-Qur’an setiap hari.',
    emoji: '📖'
  },
  {
    id: 'en-d2',
    category: 'actions',
    english: 'Write',
    pronunciationHint: '/raɪt/ (Rait)',
    indonesian: 'Menulis',
    exampleSentence: 'Students write Arabic letters neatly.',
    exampleTranslation: 'Murid-murid menulis huruf Arab dengan rapi.',
    emoji: '✍️'
  },
  {
    id: 'en-d3',
    category: 'actions',
    english: 'Pray',
    pronunciationHint: '/preɪ/ (Preei)',
    indonesian: 'Sholat / Berdoa',
    exampleSentence: 'We pray together at the mosque.',
    exampleTranslation: 'Kami sholat berjamaah di masjid.',
    emoji: '🤲'
  },
  {
    id: 'en-d4',
    category: 'actions',
    english: 'Drink',
    pronunciationHint: '/drɪŋk/ (Dringk)',
    indonesian: 'Minum',
    exampleSentence: 'Drink water while sitting down.',
    exampleTranslation: 'Minumlah air sambil duduk.',
    emoji: '🥛'
  },
  {
    id: 'en-d5',
    category: 'actions',
    english: 'Study',
    pronunciationHint: '/ˈstʌd.i/ (Sta-di)',
    indonesian: 'Belajar',
    exampleSentence: 'We study Science and Arabic diligently.',
    exampleTranslation: 'Kami belajar IPA dan Bahasa Arab dengan rajin.',
    emoji: '📚'
  },

  // FRUITS & FOOD
  {
    id: 'en-f1',
    category: 'fruits',
    english: 'Apple',
    pronunciationHint: '/ˈæp.əl/ (E-pel)',
    indonesian: 'Apel',
    exampleSentence: 'An apple is sweet and crunchy.',
    exampleTranslation: 'Buah apel rasanya manis dan renyah.',
    emoji: '🍎'
  },
  {
    id: 'en-f2',
    category: 'fruits',
    english: 'Banana',
    pronunciationHint: '/bəˈnæn.ə/ (Be-ne-ne)',
    indonesian: 'Pisang',
    exampleSentence: 'The yellow banana is rich in vitamins.',
    exampleTranslation: 'Pisang kuning kaya akan vitamin.',
    emoji: '🍌'
  },
  {
    id: 'en-f3',
    category: 'fruits',
    english: 'Watermelon',
    pronunciationHint: '/ˈwɔː.tərˌmɛl.ən/ (Wo-ter-me-len)',
    indonesian: 'Semangka',
    exampleSentence: 'Watermelon is very refreshing on a hot day.',
    exampleTranslation: 'Semangka sangat menyegarkan saat hari panas.',
    emoji: '🍉'
  },
  {
    id: 'en-f4',
    category: 'fruits',
    english: 'Milk',
    pronunciationHint: '/mɪlk/ (Milk)',
    indonesian: 'Susu',
    exampleSentence: 'I drink warm milk for breakfast.',
    exampleTranslation: 'Saya minum susu hangat untuk sarapan.',
    emoji: '🥛'
  },
  {
    id: 'en-f5',
    category: 'fruits',
    english: 'Dates',
    pronunciationHint: '/deɪts/ (Deits)',
    indonesian: 'Kurma',
    exampleSentence: 'Dates are a healthy sunnah fruit.',
    exampleTranslation: 'Kurma adalah buah sunnah yang menyehatkan.',
    emoji: '🌴'
  },

  // FAMILY & DAYS
  {
    id: 'en-fam1',
    category: 'family_days',
    english: 'Father',
    pronunciationHint: '/ˈfɑː.ðər/ (Faa-dzer)',
    indonesian: 'Ayah',
    exampleSentence: 'My father is hardworking and kind.',
    exampleTranslation: 'Ayah saya pekerja keras dan penyayang.',
    emoji: '👨'
  },
  {
    id: 'en-fam2',
    category: 'family_days',
    english: 'Mother',
    pronunciationHint: '/ˈmʌð.ər/ (Ma-dzer)',
    indonesian: 'Ibu',
    exampleSentence: 'I love my mother with all my heart.',
    exampleTranslation: 'Saya mencintai ibu dengan sepenuh hati.',
    emoji: '👩'
  },
  {
    id: 'en-fam3',
    category: 'family_days',
    english: 'Monday',
    pronunciationHint: '/ˈmʌn.deɪ/ (Man-dei)',
    indonesian: 'Senin',
    exampleSentence: 'We have a flag ceremony every Monday.',
    exampleTranslation: 'Kami melaksanakan upacara bendera setiap hari Senin.',
    emoji: '📅'
  },
  {
    id: 'en-fam4',
    category: 'family_days',
    english: 'Friday',
    pronunciationHint: '/ˈfraɪ.deɪ/ (Frai-dei)',
    indonesian: 'Jum’at',
    exampleSentence: 'Friday is a blessed day for Muslims.',
    exampleTranslation: 'Hari Jum’at adalah hari yang penuh berkah bagi umat Islam.',
    emoji: '🕌'
  },

  // CONVERSATION
  {
    id: 'en-cv1',
    category: 'conversation',
    english: 'Good morning',
    pronunciationHint: '/ɡʊd ˈmɔːr.nɪŋ/ (Gud mor-ning)',
    indonesian: 'Selamat pagi',
    exampleSentence: 'Good morning, teacher! How are you?',
    exampleTranslation: 'Selamat pagi, bu/pak guru! Bagaimana kabar Anda?',
    emoji: '🌅'
  },
  {
    id: 'en-cv2',
    category: 'conversation',
    english: 'Thank you very much',
    pronunciationHint: '/θæŋk juː ˈvɛr.i mʌtʃ/ (Theng-kyu ve-ri mac)',
    indonesian: 'Terima kasih banyak',
    exampleSentence: 'Thank you very much for helping me.',
    exampleTranslation: 'Terima kasih banyak sudah membantu saya.',
    emoji: '🙏'
  },
  {
    id: 'en-cv3',
    category: 'conversation',
    english: 'What is your name?',
    pronunciationHint: '/wɒt ɪz jɔːr neɪm/ (Wot iz yor neim)',
    indonesian: 'Siapa namamu?',
    exampleSentence: 'Hello, what is your name? - My name is Aisyah. I study at Madrasah.',
    exampleTranslation: 'Halo, siapa namamu? - Nama saya Aisyah. Saya belajar di Madrasah.',
    emoji: '🤝'
  },
  {
    id: 'en-cv4',
    category: 'conversation',
    english: 'You are welcome',
    pronunciationHint: '/jʊər ˈwɛl.kəm/ (Yur wel-kam)',
    indonesian: 'Sama-sama / Terima kasih kembali',
    exampleSentence: 'You are welcome, my dear friend!',
    exampleTranslation: 'Sama-sama, sahabatku!',
    emoji: '✨'
  }
];

export interface SentenceBuilderChallenge {
  id: string;
  indonesianMeaning: string;
  words: string[]; // shuffled
  correctOrder: string[];
}

export const SENTENCE_CHALLENGES: SentenceBuilderChallenge[] = [
  {
    id: 'sb-1',
    indonesianMeaning: 'Saya membaca buku di kelas.',
    words: ['a book', 'in class', 'I', 'read'],
    correctOrder: ['I', 'read', 'a book', 'in class']
  },
  {
    id: 'sb-2',
    indonesianMeaning: 'Kucing itu minum susu putih.',
    words: ['The cat', 'drinks', 'milk', 'white'],
    correctOrder: ['The cat', 'drinks', 'white', 'milk']
  },
  {
    id: 'sb-3',
    indonesianMeaning: 'Kami belajar bahasa Inggris bersama.',
    words: ['together', 'English', 'study', 'We'],
    correctOrder: ['We', 'study', 'English', 'together']
  },
  {
    id: 'sb-4',
    indonesianMeaning: 'Ini adalah tas sekolah baru saya.',
    words: ['is', 'This', 'school bag', 'my new'],
    correctOrder: ['This', 'is', 'my new', 'school bag']
  }
];
