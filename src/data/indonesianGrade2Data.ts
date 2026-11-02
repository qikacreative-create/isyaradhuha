// Data Kurikulum Bahasa Indonesia Kelas 2 SD / MI
// Sesuai Capaian Pembelajaran Kurikulum Merdeka & Standar Madrasah Ibtidaiyah

export interface StoryReading {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  emoji: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  vocabulary: { word: string; meaning: string }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface PunctuationExample {
  id: string;
  sentenceWrong: string;
  sentenceCorrect: string;
  ruleExplanation: string;
  ruleType: 'kapital_nama' | 'kapital_awal' | 'tanda_titik' | 'tanda_tanya' | 'tanda_seru' | 'kapital_hari_bulan';
}

export interface PoliteWordCase {
  id: string;
  magicWord: 'Tolong' | 'Terima Kasih' | 'Maaf' | 'Permisi';
  scenario: string;
  dialogueExample: string;
  context: string;
  emoji: string;
}

export interface AntonymSynonymItem {
  id: string;
  word: string;
  antonym: string; // lawan kata
  synonym: string; // persamaan kata
  sentenceExample: string;
  emoji: string;
}

export interface SentenceJumbleChallenge {
  id: string;
  jumbledWords: string[];
  correctWords: string[];
  hint: string;
}

export const INDONESIAN_UNITS = [
  {
    id: 'membaca_cerita',
    title: '1. Membaca Cerita & Menyimak',
    subtitle: 'Cerita bergambar berakhlak mulia & tanya jawab 5W1H',
    badge: 'Membaca',
    icon: '📖',
    color: 'emerald',
    summary: 'Membaca lancar dengan intonasi yang tepat, memahami isi cerita anak, mengenal kosakata baru, dan menjawab pertanyaan isi teks.'
  },
  {
    id: 'huruf_kapital_tanda_baca',
    title: '2. Huruf Kapital & Tanda Baca',
    subtitle: 'Awal kalimat, nama orang, hari/bulan, titik (.), tanya (?), seru (!)',
    badge: 'Ejaan PUEBI',
    icon: '✍️',
    color: 'blue',
    summary: 'Memahami kaidah penggunaan huruf besar/kapital serta meletakkan tanda titik, tanda tanya, dan tanda seru pada tempat yang benar.'
  },
  {
    id: 'kata_ajaib_santun',
    title: '3. Empat Kata Ajaib & Sopan Santun',
    subtitle: 'Maaf, Tolong, Terima Kasih, dan Permisi dalam pergaulan',
    badge: 'Adab Berbahasa',
    icon: '🌸',
    color: 'rose',
    summary: 'Membiasakan tutur kata santun santriwati dan siswa teladan saat meminta bantuan, berterima kasih, meminta maaf, atau lewat di depan orang.'
  },
  {
    id: 'lawan_kata_persamaan',
    title: '4. Lawan Kata & Persamaan Kata',
    subtitle: 'Antonim & Sinonim kata sifat dan benda kelas 2',
    badge: 'Kosakata',
    icon: '🔄',
    color: 'amber',
    summary: 'Memperkaya perbendaharaan kata dengan menemukan pasangan lawan kata (antonim) dan kata bermakna sama (sinonim).'
  },
  {
    id: 'susun_kalimat',
    title: '5. Menyusun Kalimat Teratur (S-P-O)',
    subtitle: 'Merangkai kata acak menjadi kalimat yang utuh dan padu',
    badge: 'Tata Kalimat',
    icon: '🧩',
    color: 'purple',
    summary: 'Latihan interaktif menyusun kata acak menjadi susunan Subjek, Predikat, dan Objek yang bermakna jelas.'
  },
  {
    id: 'puisi_pantun_anak',
    title: '6. Puisi & Pantun Nasihat Anak',
    subtitle: 'Membaca puisi dengan penghayatan & pantun berbalas',
    badge: 'Sastra Cilik',
    icon: '📜',
    color: 'teal',
    summary: 'Menikmati keindahan rima puisi anak tentang kasih ibu, guru, sahabat, serta pantun nasihat budi pekerti.'
  }
];

export const STORIES_DATA: StoryReading[] = [
  {
    id: 'cerita_1',
    title: 'Perpustakaan Mini Madrasah Kami',
    subtitle: 'Kisah Aisyah dan Fatimah merapikan buku bacaan',
    theme: 'Kerja Sama & Gemar Membaca',
    emoji: '📚',
    paragraph1: 'Pada hari Senin saat jam istirahat, Aisyah dan Fatimah pergi ke perpustakaan madrasah. Ruang perpustakaan itu sangat bersih, sejuk, dan wangi bunga melati. Ada banyak rak buku yang berjejer rapi.',
    paragraph2: 'Fatimah melihat beberapa buku cerita anak tergeletak miring di meja baca. “Aisyah, mari kita tolong Pak Harun merapikan buku-buku ini,” ajak Fatimah dengan ramah. Aisyah tersenyum setuju. Mereka menyusun buku berdasarkan kelompok warna sampulnya.',
    paragraph3: 'Pak Harun, penjaga perpustakaan, tersenyum hangat melihat kebaikan mereka. “Terima kasih banyak ya anak-anak sholihah. Kalian sungguh rajin dan gemar membaca,” ucap beliau sambil memberikan dua pembatas buku bergambar bintang.',
    vocabulary: [
      { word: 'Perpustakaan', meaning: 'Tempat koleksi buku untuk dibaca atau dipinjam.' },
      { word: 'Gemar', meaning: 'Suka sekali / hobi terhadap sesuatu hal baik.' },
      { word: 'Ramah', meaning: 'Manis tutur kata dan sikapnya; baik hati kepada siapa saja.' }
    ],
    quizQuestions: [
      {
        question: 'Kapan Aisyah dan Fatimah pergi ke perpustakaan madrasah?',
        options: ['Pada hari Minggu pagi', 'Pada hari Senin saat jam istirahat', 'Pada hari libur sekolah', 'Saat jam pelajaran matematika'],
        correctIndex: 1,
        explanation: 'Disebutkan pada paragraf pertama: "Pada hari Senin saat jam istirahat, Aisyah dan Fatimah pergi ke perpustakaan madrasah."'
      },
      {
        question: 'Apa yang dilakukan Aisyah dan Fatimah untuk membantu Pak Harun?',
        options: ['Menyapu halaman sekolah', 'Merapikan dan menyusun buku cerita di rak', 'Membeli buku baru di pasar', 'Membuat gambar di dinding'],
        correctIndex: 1,
        explanation: 'Mereka membantu merapikan buku cerita anak yang tergeletak di meja dan menyusunnya berdasarkan warna sampul.'
      },
      {
        question: 'Hadiah apa yang diberikan Pak Harun sebagai tanda terima kasih?',
        options: ['Permen cokelat', 'Pensil warna', 'Dua pembatas buku bergambar bintang', 'Kue donat manis'],
        correctIndex: 2,
        explanation: 'Pak Harun memberikan dua pembatas buku bergambar bintang sebagai ucapan terima kasih.'
      }
    ]
  },
  {
    id: 'cerita_2',
    title: 'Menanam Bunga Matahari di Kebun Sekolah',
    subtitle: 'Belajar merawat alam ciptaan Tuhan dengan penuh kasih sayang',
    theme: 'Cinta Lingkungan & Tanggung Jawab',
    emoji: '🌻',
    paragraph1: 'Siswa kelas 2 SD Bintang Belajar mendapat tugas menanam biji bunga matahari di kebun sekolah. Setiap siswa membawa pot kecil dan sekop tanah dari rumah.',
    paragraph2: 'Ibu Guru Rini mengajarkan cara memasukkan tanah gembur, menaruh tiga butir biji hitam, lalu menyiramnya dengan air secukupnya. “Tanaman membutuhkan sinar matahari dan air untuk tumbuh subur,” jelas Bu Rini.',
    paragraph3: 'Dua minggu kemudian, tunas hijau mulai muncul dari tanah! Anak-anak bersorak gembira. Mereka berjanji akan menyiram tanaman secara bergantian setiap pagi sebelum lonceng masuk kelas berbunyi.',
    vocabulary: [
      { word: 'Gembur', meaning: 'Tanah yang remah, subur, dan mudah ditanami.' },
      { word: 'Tunas', meaning: 'Tumbuhan muda yang baru saja tumbuh dari biji.' },
      { word: 'Subur', meaning: 'Tumbuh dengan baik, segar, dan sehat.' }
    ],
    quizQuestions: [
      {
        question: 'Biji bunga apa yang ditanam oleh siswa kelas 2?',
        options: ['Bunga Mawar', 'Bunga Matahari', 'Bunga Melati', 'Bunga Anggrek'],
        correctIndex: 1,
        explanation: 'Siswa menanam biji bunga matahari di kebun sekolah.'
      },
      {
        question: 'Dua hal apa yang dibutuhkan tanaman untuk tumbuh subur menurut Bu Guru?',
        options: ['Es batu dan garam', 'Sinar matahari dan air', 'Pupuk kimia dan minyak', 'Lampu dan kipas angin'],
        correctIndex: 1,
        explanation: 'Bu Guru Rini menjelaskan bahwa tanaman membutuhkan sinar matahari dan air secukupnya.'
      }
    ]
  }
];

export const PUNCTUATION_RULES: PunctuationExample[] = [
  {
    id: 'p1',
    ruleType: 'kapital_awal',
    sentenceWrong: 'anak yang rajin selalu bangun pagi.',
    sentenceCorrect: 'Anak yang rajin selalu bangun pagi.',
    ruleExplanation: 'Huruf pertama pada awal setiap kalimat WAJIB menggunakan huruf kapital (huruf besar “A”).'
  },
  {
    id: 'p2',
    ruleType: 'kapital_nama',
    sentenceWrong: 'kemarin salma dan aisyah belajar membaca Al-Qur’an.',
    sentenceCorrect: 'Kemarin Salma dan Aisyah belajar membaca Al-Qur’an.',
    ruleExplanation: 'Nama orang seperti “Salma” dan “Aisyah” selalu diawali dengan huruf kapital di mana pun posisinya dalam kalimat.'
  },
  {
    id: 'p3',
    ruleType: 'kapital_hari_bulan',
    sentenceWrong: 'Pada hari senin dan bulan ramadhan kami berpuasa.',
    sentenceCorrect: 'Pada hari Senin dan bulan Ramadhan kami berpuasa.',
    ruleExplanation: 'Nama hari (Senin, Selasa, ...) dan nama bulan (Januari, Ramadhan, ...) ditulis menggunakan huruf kapital.'
  },
  {
    id: 'p4',
    ruleType: 'tanda_titik',
    sentenceWrong: 'Ibu sedang memasak bubur ayam di dapur',
    sentenceCorrect: 'Ibu sedang memasak bubur ayam di dapur.',
    ruleExplanation: 'Tanda titik (.) digunakan untuk mengakhiri kalimat berita atau pernyataan yang selesai.'
  },
  {
    id: 'p5',
    ruleType: 'tanda_tanya',
    sentenceWrong: 'Berapa harga pensil ini.',
    sentenceCorrect: 'Berapa harga pensil ini?',
    ruleExplanation: 'Kalimat tanya yang menanyakan sesuatu (menggunakan kata apa, siapa, di mana, berapa) harus diakhiri tanda tanya (?).'
  },
  {
    id: 'p6',
    ruleType: 'tanda_seru',
    sentenceWrong: 'Tolong ambilkan buku itu?',
    sentenceCorrect: 'Tolong ambilkan buku itu!',
    ruleExplanation: 'Kalimat perintah atau ajakan yang bernada tegas atau memohon bantuan santun diakhiri dengan tanda seru (!).'
  }
];

export const POLITE_WORDS_CASES: PoliteWordCase[] = [
  {
    id: 'pw1',
    magicWord: 'Tolong',
    scenario: 'Kamu kesulitan mengambil buku bacaan di rak yang tinggi.',
    dialogueExample: '“Kak, tolong bantu aku mengambil buku cerita di rak atas ya.”',
    context: 'Diucapkan setiap kali kita memerlukan bantuan dari orang tua, guru, kakak, atau teman.',
    emoji: '🤝'
  },
  {
    id: 'pw2',
    magicWord: 'Terima Kasih',
    scenario: 'Teman sebangkumu meminjamkan penggaris saat kamu lupa membawanya.',
    dialogueExample: '“Terima kasih banyak ya Fatimah, kamu baik sekali sudah meminjamkan penggaris.”',
    context: 'Diucapkan segera setelah kita menerima bantuan, pemberian, hadiah, atau pujian dari orang lain.',
    emoji: '🎁'
  },
  {
    id: 'pw3',
    magicWord: 'Maaf',
    scenario: 'Tanpa sengaja kamu menabrak tangan teman hingga pensilnya terjatuh.',
    dialogueExample: '“Maafkan aku ya Salma, aku tidak sengaja menabrakmu. Mari kubantu mengambil pensilnya.”',
    context: 'Diucapkan dengan tulus saat kita melakukan kesalahan, keliru, atau membuat orang lain kurang nyaman.',
    emoji: '🙏'
  },
  {
    id: 'pw4',
    magicWord: 'Permisi',
    scenario: 'Kamu ingin lewat di depan Bu Guru dan orang tua yang sedang berbincang.',
    dialogueExample: '“Permisi Bu Guru, maaf saya mau lewat ke ruang kelas.” (sambil sedikit membungkukkan badan)',
    context: 'Diucapkan saat berjalan melintas di depan orang lain, memasuki ruangan, atau hendak bertanya.',
    emoji: '🚶‍♀️'
  }
];

export const ANTONYM_SYNONYM_LIST: AntonymSynonymItem[] = [
  { id: 'as1', word: 'Rajin', antonym: 'Malas', synonym: 'Giat / Tekun', sentenceExample: 'Aisyah sangat rajin menghafal Al-Qur’an setiap sore.', emoji: '⭐' },
  { id: 'as2', word: 'Bersih', antonym: 'Kotor', synonym: 'Higienis / Asri', sentenceExample: 'Kebersihan adalah sebagian dari iman.', emoji: '✨' },
  { id: 'as3', word: 'Gembira', antonym: 'Sedih', synonym: 'Senang / Bahagia', sentenceExample: 'Hati santriwati gembira mendapat nilai A mumtaz.', emoji: '😄' },
  { id: 'as4', word: 'Besar', antonym: 'Kecil', synonym: 'Akbar / Raya', sentenceExample: 'Madrasah kami memiliki halaman yang sangat besar.', emoji: '🏫' },
  { id: 'as5', word: 'Terang', antonym: 'Gelap', synonym: 'Benderang', sentenceExample: 'Bulan purnama bersinar terang di malam hari.', emoji: '🌕' },
  { id: 'as6', word: 'Cepat', antonym: 'Lambat', synonym: 'Lekas / Tangkas', sentenceExample: 'Kelinci berlari cepat melompati pagar rumput.', emoji: '🐇' },
  { id: 'as7', word: 'Tinggi', antonym: 'Rendah', synonym: 'Jangkung', sentenceExample: 'Pohon kelapa di samping madrasah tumbuh sangat tinggi.', emoji: '🌴' },
  { id: 'as8', word: 'Pintar', antonym: 'Bodoh', synonym: 'Cerdas / Pandai', sentenceExample: 'Anak yang rajin belajar akan tumbuh menjadi anak pintar.', emoji: '💡' }
];

export const SENTENCE_JUMBLES: SentenceJumbleChallenge[] = [
  {
    id: 'sj1',
    jumbledWords: ['membaca', 'Fatimah', 'buku', 'sedang', 'cerita'],
    correctWords: ['Fatimah', 'sedang', 'membaca', 'buku', 'cerita'],
    hint: 'Subjek (Nama orang) berada di awal kalimat.'
  },
  {
    id: 'sj2',
    jumbledWords: ['sekolah', 'ke', 'Aisyah', 'berjalan', 'kaki'],
    correctWords: ['Aisyah', 'berjalan', 'kaki', 'ke', 'sekolah'],
    hint: 'Mulai dengan pelaku Aisyah.'
  },
  {
    id: 'sj3',
    jumbledWords: ['halaman', 'santriwati', 'membersihkan', 'Para', 'madrasah'],
    correctWords: ['Para', 'santriwati', 'membersihkan', 'halaman', 'madrasah'],
    hint: 'Kegiatan gotong royong di lingkungan sekolah.'
  },
  {
    id: 'sj4',
    jumbledWords: ['ayah', 'membantu', 'Budi', 'sepeda', 'mencuci'],
    correctWords: ['Budi', 'membantu', 'ayah', 'mencuci', 'sepeda'],
    hint: 'Anak berbakti membantu orang tuanya.'
  }
];

export const POETRY_LIST = [
  {
    id: 'p1',
    title: 'Guruku Pelita Hatiku',
    author: 'Karya: Sahabat Cilik SD/MI',
    emoji: '🕯️',
    lines: [
      'Pagi hari engkau menyapa kami dengan senyuman,',
      'Membimbing jemari menulis huruf demi huruf,',
      'Mengajarkan ilmu dan budi pekerti luhur,',
      'Terima kasih guruku tercinta,',
      'Jasa dan doamu akan kami kenang sepanjang masa.'
    ]
  },
  {
    id: 'p2',
    title: 'Bintang di Langit Malam',
    author: 'Karya: Puisi Anak Indonesia',
    emoji: '🌌',
    lines: [
      'Bintang kecil di langit yang biru,',
      'Berkedip-kedip bagai permata bersinar,',
      'Menemani malam yang syahdu dan tenang,',
      'Aku ingin terbang ke sana,',
      'Meraih impian setinggi angkasa raya.'
    ]
  }
];
