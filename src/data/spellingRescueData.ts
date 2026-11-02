// Data Kosakata untuk Game Mengeja Interaktif & Misi Penyelamatan Karakter
// Mendukung Bahasa Indonesia & Bahasa Inggris untuk SD & MI

export interface SpellingWordItem {
  id: string;
  word: string; // Huruf kapital, e.g. "KUCING" atau "RABBIT"
  syllables?: string[]; // e.g. ["KU", "CING"]
  meaning: string;
  category: string;
  emoji: string;
  exampleSentence: string;
  phoneticHint?: string;
  difficulty: 'mudah' | 'sedang' | 'sulit'; // mudah: 3-4 huruf, sedang: 5-6 huruf, sulit: 7+ huruf
}

export const INDONESIAN_SPELLING_WORDS: SpellingWordItem[] = [
  // MUDAH (3 - 4 Huruf)
  {
    id: 'id-buku',
    word: 'BUKU',
    syllables: ['BU', 'KU'],
    meaning: 'Lembaran kertas berjilid tempat membaca dan menulis ilmu.',
    category: 'Sekolah',
    emoji: '📚',
    exampleSentence: 'Aisyah gemar membaca buku cerita di perpustakaan.',
    difficulty: 'mudah'
  },
  {
    id: 'id-kuda',
    word: 'KUDA',
    syllables: ['KU', 'DA'],
    meaning: 'Hewan berkaki empat yang pandai berlari kencang.',
    category: 'Hewan',
    emoji: '🐎',
    exampleSentence: 'Pak Tani menaiki kuda gagah melintasi padang rumput.',
    difficulty: 'mudah'
  },
  {
    id: 'id-susu',
    word: 'SUSU',
    syllables: ['SU', 'SU'],
    meaning: 'Minuman bergizi berwarna putih yang menyehatkan tulang.',
    category: 'Makanan',
    emoji: '🥛',
    exampleSentence: 'Setiap pagi sebelum sekolah, adik minum segelas susu hangat.',
    difficulty: 'mudah'
  },
  {
    id: 'id-meja',
    word: 'MEJA',
    syllables: ['ME', 'JA'],
    meaning: 'Perabot berkaki empat tempat meletakkan buku dan belajar.',
    category: 'Sekolah',
    emoji: '🪑',
    exampleSentence: 'Rapikan buku dan alat tulis di atas meja belajarmu.',
    difficulty: 'mudah'
  },
  {
    id: 'id-apel',
    word: 'APEL',
    syllables: ['A', 'PEL'],
    meaning: 'Buah manis segar berkulit merah atau hijau.',
    category: 'Buah',
    emoji: '🍎',
    exampleSentence: 'Ibu memotong buah apel manis untuk bekal ke sekolah.',
    difficulty: 'mudah'
  },
  {
    id: 'id-bola',
    word: 'BOLA',
    syllables: ['BO', 'LA'],
    meaning: 'Benda bulat yang dipakai bermain sepak bola atau basket.',
    category: 'Benda',
    emoji: '⚽',
    exampleSentence: 'Anak-anak bermain bola di lapangan saat jam istirahat.',
    difficulty: 'mudah'
  },
  {
    id: 'id-ikan',
    word: 'IKAN',
    syllables: ['I', 'KAN'],
    meaning: 'Hewan bersisik yang berenang di dalam air menggunakan sirip.',
    category: 'Hewan',
    emoji: '🐟',
    exampleSentence: 'Ikan mas berenang lincah di kolam air yang jernih.',
    difficulty: 'mudah'
  },
  {
    id: 'id-topi',
    word: 'TOPI',
    syllables: ['TO', 'PI'],
    meaning: 'Penutup kepala pelindung dari panas matahari saat upacara.',
    category: 'Sekolah',
    emoji: '🧢',
    exampleSentence: 'Jangan lupa memakai topi saat upacara bendera hari Senin.',
    difficulty: 'mudah'
  },
  {
    id: 'id-mata',
    word: 'MATA',
    syllables: ['MA', 'TA'],
    meaning: 'Indra penglihatan karunia Allah untuk melihat indahnya alam.',
    category: 'Tubuh',
    emoji: '👀',
    exampleSentence: 'Gunakan mata untuk membaca ayat suci Al-Qur’an dengan tartil.',
    difficulty: 'mudah'
  },

  // SEDANG (5 - 6 Huruf)
  {
    id: 'id-kucing',
    word: 'KUCING',
    syllables: ['KU', 'CING'],
    meaning: 'Hewan peliharaan berbulu lembut kesayangan Rasulullah.',
    category: 'Hewan',
    emoji: '🐱',
    exampleSentence: 'Kucing belang itu mengeong meminta sepotong ikan.',
    difficulty: 'sedang'
  },
  {
    id: 'id-pensil',
    word: 'PENSIL',
    syllables: ['PEN', 'SIL'],
    meaning: 'Alat tulis berinti karbon grafit untuk menulis dan menggambar.',
    category: 'Sekolah',
    emoji: '✏️',
    exampleSentence: 'Runcingkan pensilmu agar tulisan hurufnya rapi dan indah.',
    difficulty: 'sedang'
  },
  {
    id: 'id-sepatu',
    word: 'SEPATU',
    syllables: ['SE', 'PA', 'TU'],
    meaning: 'Alas kaki bertali pelindung kaki saat berangkat ke sekolah.',
    category: 'Sekolah',
    emoji: '👟',
    exampleSentence: 'Letakkan sepatu hitammu di rak sepatu dengan tertib.',
    difficulty: 'sedang'
  },
  {
    id: 'id-pisang',
    word: 'PISANG',
    syllables: ['PI', 'SANG'],
    meaning: 'Buah berkulit kuning kaya kalium dan manis rasanya.',
    category: 'Buah',
    emoji: '🍌',
    exampleSentence: 'Monyet melompat riang membawa sesisir pisang matang.',
    difficulty: 'sedang'
  },
  {
    id: 'id-burung',
    word: 'BURUNG',
    syllables: ['BU', 'RUNG'],
    meaning: 'Hewan bersayap yang terbang bebas di angkasa dan berkicau.',
    category: 'Hewan',
    emoji: '🐦',
    exampleSentence: 'Burung pipit berkicau merdu menyambut hangatnya fajar pagi.',
    difficulty: 'sedang'
  },
  {
    id: 'id-sepeda',
    word: 'SEPEDA',
    syllables: ['SE', 'PE', 'DA'],
    meaning: 'Kendaraan beroda dua yang dikayuh dengan pedal.',
    category: 'Benda',
    emoji: '🚲',
    exampleSentence: 'Ahmad mengayuh sepeda ke madrasah bersama teman-temannya.',
    difficulty: 'sedang'
  },
  {
    id: 'id-santun',
    word: 'SANTUN',
    syllables: ['SAN', 'TUN'],
    meaning: 'Sikap halus budi pekerti, sopan berbicara dan menghormati sesama.',
    category: 'Karakter',
    emoji: '🤝',
    exampleSentence: 'Bicaralah dengan tutur kata yang santun kepada guru dan orang tua.',
    difficulty: 'sedang'
  },
  {
    id: 'id-kelinci',
    word: 'KELINCI',
    syllables: ['KE', 'LIN', 'CI'],
    meaning: 'Hewan bertelinga panjang yang suka melompat dan makan wortel.',
    category: 'Hewan',
    emoji: '🐰',
    exampleSentence: 'Kelinci putih itu melompat riang di kebun rumput segar.',
    difficulty: 'sedang'
  },
  {
    id: 'id-masjid',
    word: 'MASJID',
    syllables: ['MAS', 'JID'],
    meaning: 'Tempat suci umat Islam untuk menunaikan salat berjamaah.',
    category: 'Madrasah',
    emoji: '🕌',
    exampleSentence: 'Saat azan berkumandang, para santri melangkah menuju masjid.',
    difficulty: 'sedang'
  },

  // SULIT (7+ Huruf)
  {
    id: 'id-bintang',
    word: 'BINTANG',
    syllables: ['BIN', 'TANG'],
    meaning: 'Benda langit ciptaan Allah yang berkilau indah di malam hari.',
    category: 'Alam',
    emoji: '⭐',
    exampleSentence: 'Ribuan bintang bertaburan menghiasi langit malam yang cerah.',
    difficulty: 'sulit'
  },
  {
    id: 'id-pelangi',
    word: 'PELANGI',
    syllables: ['PE', 'LAN', 'GI'],
    meaning: 'Lengkungan warna-warni indah di langit sehabis hujan turun.',
    category: 'Alam',
    emoji: '🌈',
    exampleSentence: 'Pelangi merah kuning hijau membentang elok setelah hujan reda.',
    difficulty: 'sulit'
  },
  {
    id: 'id-matahari',
    word: 'MATAHARI',
    syllables: ['MA', 'TA', 'HA', 'RI'],
    meaning: 'Bintang raksasa sumber cahaya dan kehangatan seluruh bumi.',
    category: 'Alam',
    emoji: '☀️',
    exampleSentence: 'Matahari terbit dari timur menerangi pagi yang penuh berkah.',
    difficulty: 'sulit'
  },
  {
    id: 'id-semangka',
    word: 'SEMANGKA',
    syllables: ['SE', 'MANG', 'KA'],
    meaning: 'Buah berair manis dengan daging buah merah dan berbiji hitam.',
    category: 'Buah',
    emoji: '🍉',
    exampleSentence: 'Semangka dingin sangat menyegarkan dinikmati di siang terik.',
    difficulty: 'sulit'
  },
  {
    id: 'id-kejujuran',
    word: 'KEJUJURAN',
    syllables: ['KE', 'JU', 'JU', 'RAN'],
    meaning: 'Sifat mulia selalu berkata benar dan tidak berbohong.',
    category: 'Karakter',
    emoji: '💎',
    exampleSentence: 'Kejujuran adalah perhiasan hati yang dicintai Allah dan sesama.',
    difficulty: 'sulit'
  },
  {
    id: 'id-kupu-kupu',
    word: 'KUPUKUPU',
    syllables: ['KU', 'PU', 'KU', 'PU'],
    meaning: 'Serangga bersayap elok hasil metamorfosis dari kepompong.',
    category: 'Hewan',
    emoji: '🦋',
    exampleSentence: 'Kupu-kupu beterbangan menghisap madu di taman bunga.',
    difficulty: 'sulit'
  }
];

export const ENGLISH_SPELLING_WORDS: SpellingWordItem[] = [
  // MUDAH (3 - 4 Letters)
  {
    id: 'en-cat',
    word: 'CAT',
    syllables: ['CAT'],
    meaning: 'Seekor kucing lucu berkaki empat.',
    category: 'Animals',
    emoji: '🐱',
    exampleSentence: 'The little cat is sleeping comfortably on the mat.',
    phoneticHint: '/kæt/',
    difficulty: 'mudah'
  },
  {
    id: 'en-book',
    word: 'BOOK',
    syllables: ['BOOK'],
    meaning: 'Buku bacaan untuk belajar ilmu pengetahuan.',
    category: 'School',
    emoji: '📖',
    exampleSentence: 'Open your English book on page twenty-five.',
    phoneticHint: '/bʊk/',
    difficulty: 'mudah'
  },
  {
    id: 'en-sun',
    word: 'SUN',
    syllables: ['SUN'],
    meaning: 'Matahari yang menyinari bumi di siang hari.',
    category: 'Nature',
    emoji: '☀️',
    exampleSentence: 'The bright sun shines warmly in the morning sky.',
    phoneticHint: '/sʌn/',
    difficulty: 'mudah'
  },
  {
    id: 'en-star',
    word: 'STAR',
    syllables: ['STAR'],
    meaning: 'Bintang berkilau di langit malam.',
    category: 'Nature',
    emoji: '⭐',
    exampleSentence: 'Twinkle twinkle little star in the deep blue sky.',
    phoneticHint: '/stɑːr/',
    difficulty: 'mudah'
  },
  {
    id: 'en-fish',
    word: 'FISH',
    syllables: ['FISH'],
    meaning: 'Ikan yang berenang di dalam air.',
    category: 'Animals',
    emoji: '🐟',
    exampleSentence: 'A colorful little fish swims happily in the lake.',
    phoneticHint: '/fɪʃ/',
    difficulty: 'mudah'
  },
  {
    id: 'en-tree',
    word: 'TREE',
    syllables: ['TREE'],
    meaning: 'Pohon rindang yang menghasilkan oksigen segar.',
    category: 'Nature',
    emoji: '🌳',
    exampleSentence: 'Birds build their warm nests high up in the tree.',
    phoneticHint: '/triː/',
    difficulty: 'mudah'
  },
  {
    id: 'en-milk',
    word: 'MILK',
    syllables: ['MILK'],
    meaning: 'Susu segar yang menyehatkan tubuh.',
    category: 'Food',
    emoji: '🥛',
    exampleSentence: 'Drink a glass of warm milk before going to bed.',
    phoneticHint: '/mɪlk/',
    difficulty: 'mudah'
  },
  {
    id: 'en-bird',
    word: 'BIRD',
    syllables: ['BIRD'],
    meaning: 'Burung yang bisa terbang di udara.',
    category: 'Animals',
    emoji: '🐦',
    exampleSentence: 'The blue bird is singing a sweet melody on the branch.',
    phoneticHint: '/bɜːrd/',
    difficulty: 'mudah'
  },

  // SEDANG (5 - 6 Letters)
  {
    id: 'en-apple',
    word: 'APPLE',
    syllables: ['AP', 'PLE'],
    meaning: 'Buah apel renyah berwarna merah atau hijau.',
    category: 'Food',
    emoji: '🍎',
    exampleSentence: 'An apple a day keeps the doctor away.',
    phoneticHint: '/ˈæp.əl/',
    difficulty: 'sedang'
  },
  {
    id: 'en-pencil',
    word: 'PENCIL',
    syllables: ['PEN', 'CIL'],
    meaning: 'Pensil kayu untuk menulis dan membuat sketsa.',
    category: 'School',
    emoji: '✏️',
    exampleSentence: 'Sharpen your pencil before starting your drawing.',
    phoneticHint: '/ˈpen.səl/',
    difficulty: 'sedang'
  },
  {
    id: 'en-rabbit',
    word: 'RABBIT',
    syllables: ['RAB', 'BIT'],
    meaning: 'Kelinci bertelinga panjang yang lincah melompat.',
    category: 'Animals',
    emoji: '🐰',
    exampleSentence: 'The white rabbit hopped across the green garden.',
    phoneticHint: '/ˈræb.ɪt/',
    difficulty: 'sedang'
  },
  {
    id: 'en-flower',
    word: 'FLOWER',
    syllables: ['FLOW', 'ER'],
    meaning: 'Bunga mekar yang wangi semerbak di kebun.',
    category: 'Nature',
    emoji: '🌸',
    exampleSentence: 'Bees are buzzing around the fragrant pink flower.',
    phoneticHint: '/ˈflaʊ.ər/',
    difficulty: 'sedang'
  },
  {
    id: 'en-orange',
    word: 'ORANGE',
    syllables: ['OR', 'ANGE'],
    meaning: 'Buah jeruk kaya vitamin C atau warna jingga.',
    category: 'Food',
    emoji: '🍊',
    exampleSentence: 'Sweet orange juice is full of healthy vitamin C.',
    phoneticHint: '/ˈɒr.ɪndʒ/',
    difficulty: 'sedang'
  },
  {
    id: 'en-school',
    word: 'SCHOOL',
    syllables: ['SCHOOL'],
    meaning: 'Sekolah tempat kita menuntut ilmu bersama sahabat.',
    category: 'School',
    emoji: '🏫',
    exampleSentence: 'We walk to school together every morning with joy.',
    phoneticHint: '/skuːl/',
    difficulty: 'sedang'
  },
  {
    id: 'en-friend',
    word: 'FRIEND',
    syllables: ['FRIEND'],
    meaning: 'Teman atau sahabat sejati yang saling menolong.',
    category: 'Values',
    emoji: '👫',
    exampleSentence: 'A true friend is always kind, honest, and helpful.',
    phoneticHint: '/frend/',
    difficulty: 'sedang'
  },
  {
    id: 'en-banana',
    word: 'BANANA',
    syllables: ['BA', 'NA', 'NA'],
    meaning: 'Buah pisang kuning kesukaan anak-anak.',
    category: 'Food',
    emoji: '🍌',
    exampleSentence: 'Monkeys love peeling ripe yellow bananas.',
    phoneticHint: '/bəˈnɑː.nə/',
    difficulty: 'sedang'
  },

  // SULIT (7+ Letters)
  {
    id: 'en-rainbow',
    word: 'RAINBOW',
    syllables: ['RAIN', 'BOW'],
    meaning: 'Pelangi warna-warni yang muncul sehabis hujan.',
    category: 'Nature',
    emoji: '🌈',
    exampleSentence: 'Look at the beautiful rainbow stretching across the sky!',
    phoneticHint: '/ˈreɪn.bəʊ/',
    difficulty: 'sulit'
  },
  {
    id: 'en-elephant',
    word: 'ELEPHANT',
    syllables: ['EL', 'E', 'PHANT'],
    meaning: 'Gajah besar yang memiliki belalai panjang.',
    category: 'Animals',
    emoji: '🐘',
    exampleSentence: 'The giant elephant sprayed water with its long trunk.',
    phoneticHint: '/ˈel.ɪ.fənt/',
    difficulty: 'sulit'
  },
  {
    id: 'en-butterfly',
    word: 'BUTTERFLY',
    syllables: ['BUT', 'TER', 'FLY'],
    meaning: 'Kupu-kupu dengan sayap corak mempesona.',
    category: 'Animals',
    emoji: '🦋',
    exampleSentence: 'A colorful butterfly danced gently above the flowers.',
    phoneticHint: '/ˈbʌt.ə.flaɪ/',
    difficulty: 'sulit'
  },
  {
    id: 'en-classroom',
    word: 'CLASSROOM',
    syllables: ['CLASS', 'ROOM'],
    meaning: 'Ruang kelas tempat para siswa belajar dengan tertib.',
    category: 'School',
    emoji: '🎒',
    exampleSentence: 'Keep our classroom neat, clean, and peaceful.',
    phoneticHint: '/ˈklɑːs.ruːm/',
    difficulty: 'sulit'
  },
  {
    id: 'en-sunflower',
    word: 'SUNFLOWER',
    syllables: ['SUN', 'FLOW', 'ER'],
    meaning: 'Bunga matahari kuning yang selalu menghadap cahaya.',
    category: 'Nature',
    emoji: '🌻',
    exampleSentence: 'Sunflowers stand tall and follow the golden sunlight.',
    phoneticHint: '/ˈsʌnˌflaʊ.ər/',
    difficulty: 'sulit'
  }
];

// Deskripsi tahapan bahaya / jeratan tali (0 sampai 5 kesalahan)
export interface RescueStageInfo {
  mistakes: number;
  label: string;
  badgeColor: string;
  ropesCount: number;
  dialogueId: string;
  dialogueEn: string;
  auraClass: string;
  dangerPercentage: number;
}

export const RESCUE_STAGES: Record<number, RescueStageInfo> = {
  0: {
    mistakes: 0,
    label: 'Bebas & Ceria',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ropesCount: 0,
    dialogueId: '“Alhamdulillah, aku bebas! Ayo eja katanya dengan teliti ya sahabatku!”',
    dialogueEn: '"Hooray, I am free! Please spell the word carefully, my dear friend!"',
    auraClass: 'ring-4 ring-emerald-400/40 bg-emerald-50/50',
    dangerPercentage: 0
  },
  1: {
    mistakes: 1,
    label: 'Peringatan Pertama',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    ropesCount: 1,
    dialogueId: '“Awas! Tali jerat pertama muncul di dekat kakiku. Hati-hati ya!”',
    dialogueEn: '"Watch out! The first snare rope appeared near my feet. Be careful!"',
    auraClass: 'ring-4 ring-amber-400/50 bg-amber-50/60',
    dangerPercentage: 20
  },
  2: {
    mistakes: 2,
    label: 'Kaki Terikat',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    ropesCount: 2,
    dialogueId: '“Aduh! Kakiku mulai terikat tali! Aku tidak bisa melompat lagi...”',
    dialogueEn: '"Oh no! My feet are tangled in ropes! I cannot jump anymore..."',
    auraClass: 'ring-4 ring-orange-500/50 bg-orange-50/60',
    dangerPercentage: 40
  },
  3: {
    mistakes: 3,
    label: 'Badan Terikat',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    ropesCount: 3,
    dialogueId: '“Tolong! Talinya menjerat sampai pinggangku! Jangan salah lagi ya!”',
    dialogueEn: '"Help! The rope is wrapping around my waist! Don\'t make another mistake!"',
    auraClass: 'ring-4 ring-rose-500/60 bg-rose-50/70 animate-pulse',
    dangerPercentage: 60
  },
  4: {
    mistakes: 4,
    label: 'Bahaya Kritis!',
    badgeColor: 'bg-red-200 text-red-900 border-red-400 font-black',
    ropesCount: 4,
    dialogueId: '“Gawat sekali! Tinggal 1 kesempatan lagi sebelum aku terikat sepenuhnya!”',
    dialogueEn: '"Critical danger! Only 1 chance left before I get completely trapped!"',
    auraClass: 'ring-4 ring-red-600 bg-red-100/80 animate-ping',
    dangerPercentage: 80
  },
  5: {
    mistakes: 5,
    label: 'Karakter Terikat Sepenuhnya!',
    badgeColor: 'bg-stone-900 text-red-400 border-red-600 font-black',
    ropesCount: 5,
    dialogueId: '“Aduuuh! Aku sudah terikat tali rapat-rapat dan masuk kurungan! Ayo selamatkan aku!”',
    dialogueEn: '"Oh nooo! I am completely tied up in ropes inside a cage! Please rescue me!"',
    auraClass: 'ring-4 ring-stone-800 bg-stone-200',
    dangerPercentage: 100
  }
};
