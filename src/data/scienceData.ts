export interface LifeCycleStep {
  step: number;
  name: string;
  desc: string;
  emoji: string;
}

export interface ScienceModel {
  id: string;
  title: string;
  category: 'biologi' | 'fisika' | 'bumi_antariksa' | 'tubuh';
  gradeLevel: string;
  summary: string;
  explanation: string;
  keyTerms: { term: string; meaning: string }[];
  interactiveType: 'metamorfosis' | 'rantai_makanan' | 'wujud_benda' | 'siklus_air' | 'tata_surya' | 'panca_indera';
}

export const SCIENCE_TOPICS: ScienceModel[] = [
  {
    id: 'metamorfosis',
    title: 'Daur Hidup & Metamorfosis Hewan',
    category: 'biologi',
    gradeLevel: 'Kelas 4 SD',
    summary: 'Proses perkembangan biologi hewan yang melibatkan perubahan bentuk fisik secara bertahap.',
    explanation: 'Metamorfosis terbagi menjadi dua: Metamorfosis Sempurna (mengalami fase kepompong/pupa, bentuk anak berbeda drastis dengan dewasa) dan Metamorfosis Tidak Sempurna (tanpa pupa, anak mirip dewasa dalam bentuk nimfa).',
    keyTerms: [
      { term: 'Larva / Ulat', meaning: 'Fase aktif makan dan tumbuh pesat' },
      { term: 'Pupa / Kepompong', meaning: 'Fase istirahat dan transformasi pembentukan organ baru' },
      { term: 'Nimfa', meaning: 'Bentuk hewan muda yang mirip dewasa namun belum bersayap sempurna' },
      { term: 'Imago', meaning: 'Bentuk hewan yang sudah dewasa dan siap berkembang biak' }
    ],
    interactiveType: 'metamorfosis'
  },
  {
    id: 'rantai_makanan',
    title: 'Rantai Makanan & Ekosistem Sawah',
    category: 'biologi',
    gradeLevel: 'Kelas 5 SD',
    summary: 'Perjalanan makan dan dimakan dengan urutan tertentu antarmakhluk hidup di lingkungan alam.',
    explanation: 'Matahari adalah sumber energi utama. Padi (produsen) membuat makanan sendiri lewat fotosintesis, dimakan oleh belalang (konsumen 1), katak (konsumen 2), ular (konsumen 3), dan elang (konsumen puncak), lalu diuraikan oleh jamur/bakteri.',
    keyTerms: [
      { term: 'Produsen', meaning: 'Makhluk hidup autotrof yang menghasilkan makanan sendiri (tumbuhan hijau)' },
      { term: 'Konsumen I', meaning: 'Hewan pemakan tumbuhan (Herbivora)' },
      { term: 'Konsumen Puncak', meaning: 'Hewan predator di ujung rantai makanan tanpa pemangsa alami' },
      { term: 'Dekomposer / Pengurai', meaning: 'Organisme yang menguraikan bangkai menjadi zat hara tanah' }
    ],
    interactiveType: 'rantai_makanan'
  },
  {
    id: 'wujud_benda',
    title: 'Wujud Benda & Perubahannya',
    category: 'fisika',
    gradeLevel: 'Kelas 3-4 SD',
    summary: 'Zat di alam memiliki 3 wujud: Padat, Cair, dan Gas serta mengalami 6 jenis perubahan fisika.',
    explanation: 'Perubahan wujud terjadi karena pengaruh penyerapan atau pelepasan kalor (energi panas). Sifat partikel padat sangat rapat, partikel cair renggang mengalir mengikuti wadah, dan partikel gas bergerak bebas ke segala arah.',
    keyTerms: [
      { term: 'Mencair', meaning: 'Perubahan dari padat menjadi cair (butuh panas)' },
      { term: 'Membeku', meaning: 'Perubahan dari cair menjadi padat (lepas panas)' },
      { term: 'Menguap', meaning: 'Perubahan dari cair menjadi gas' },
      { term: 'Mengembun', meaning: 'Perubahan dari gas menjadi cair' },
      { term: 'Menyublim', meaning: 'Perubahan dari padat langsung menjadi gas' },
      { term: 'Mengkristal', meaning: 'Perubahan dari gas langsung menjadi padat' }
    ],
    interactiveType: 'wujud_benda'
  },
  {
    id: 'siklus_air',
    title: 'Siklus Air & Kelestarian Lingkungan',
    category: 'bumi_antariksa',
    gradeLevel: 'Kelas 5 SD',
    summary: 'Sirkulasi perputaran air yang tidak pernah berhenti dari atmosfer bumi kembali ke bumi dan sebaliknya.',
    explanation: 'Panas matahari menguapkan air laut (evaporasi) dan tumbuhan (transpirasi). Uap air membubung ke atas membentuk awan (kondensasi). Ketika titik-titik air di awan sudah jenuh dan berat, turunlah hujan (presipitasi). Air menyerap ke dalam tanah (infiltrasi) dan mengalir kembali ke laut.',
    keyTerms: [
      { term: 'Evaporasi', meaning: 'Penguapan air laut, sungai, dan danau akibat panas matahari' },
      { term: 'Kondensasi', meaning: 'Pengembunan uap air menjadi awan tebal karena suhu dingin' },
      { term: 'Presipitasi', meaning: 'Turunnya air dari awan ke permukaan bumi berupa hujan atau salju' },
      { term: 'Infiltrasi', meaning: 'Peresapan air hujan ke dalam pori-pori tanah' }
    ],
    interactiveType: 'siklus_air'
  },
  {
    id: 'tata_surya',
    title: 'Sistem Tata Surya & 8 Planet',
    category: 'bumi_antariksa',
    gradeLevel: 'Kelas 6 SD',
    summary: 'Kumpulan benda langit yang terdiri atas Matahari sebagai pusatnya dan 8 planet yang mengelilinginya.',
    explanation: 'Matahari adalah bintang raksasa penghasil cahaya sendiri. 8 Planet mengelilingi matahari pada orbit elips masing-masing: Merkurius, Venus, Bumi (tempat tinggal kita), Mars (planet merah), Jupiter (planet terbesar), Saturnus (planet cincin), Uranus, dan Neptunus.',
    keyTerms: [
      { term: 'Revolusi Bumi', meaning: 'Peredaran bumi mengelilingi matahari (365¼ hari / 1 tahun)' },
      { term: 'Rotasi Bumi', meaning: 'Perputaran bumi pada porosnya (24 jam) menyebabkan siang & malam' },
      { term: 'Gravitasi', meaning: 'Gaya tarik yang menjaga planet-planet tetap pada orbitnya' }
    ],
    interactiveType: 'tata_surya'
  },
  {
    id: 'panca_indera',
    title: 'Panca Indera Manusia & Fungsinya',
    category: 'tubuh',
    gradeLevel: 'Kelas 1-3 SD',
    summary: 'Lima organ tubuh yang berfungsi sebagai pintu penerima rangsangan dari luar.',
    explanation: 'Tubuh kita memiliki 5 indera istimewa: Mata untuk penglihatan, Telinga untuk pendengaran, Hidung untuk penciuman aroma, Lidah untuk pengecap rasa (manis, asin, asam, pahit, gurih/umami), dan Kulit untuk peraba sentuhan suhu serta tekstur.',
    keyTerms: [
      { term: 'Retina Mata', meaning: 'Lapisan peka cahaya untuk menangkap bayangan benda' },
      { term: 'Gendang Telinga', meaning: 'Selaput tipis yang bergetar saat menerima gelombang suara' },
      { term: 'Papila Lidah', meaning: 'Bintil-bintil di lidah yang berisi ujung saraf perasa' }
    ],
    interactiveType: 'panca_indera'
  }
];

export const BUTTERFLY_METAMORPHOSIS: LifeCycleStep[] = [
  { step: 1, name: 'Telur', desc: 'Diletakkan oleh induk kupu-kupu di permukaan daun hijau segar.', emoji: '🥚' },
  { step: 2, name: 'Ulat (Larva)', desc: 'Menetas dan rajin makan daun hingga tumbuh besar dan berganti kulit.', emoji: '🐛' },
  { step: 3, name: 'Kepompong (Pupa)', desc: 'Berlindung dalam cangkang sutra, mengalami perubahan bentuk tubuh.', emoji: '🍂' },
  { step: 4, name: 'Kupu-kupu Dewasa (Imago)', desc: 'Keluar dengan sayap indah berwarna-warni dan mengisap nektar bunga.', emoji: '🦋' }
];

export const FROG_METAMORPHOSIS: LifeCycleStep[] = [
  { step: 1, name: 'Telur Katak', desc: 'Diletakkan berkelompok di air tawar yang tenang dan berlendir.', emoji: '⚪' },
  { step: 2, name: 'Kecebong / Berudu', desc: 'Hidup di air bernapas dengan insang dan bergerak dengan ekor.', emoji: '🐟' },
  { step: 3, name: 'Katak Berekor / Muda', desc: 'Mulai tumbuh kaki belakang dan kaki depan, ekor menyusut.', emoji: '🦎' },
  { step: 4, name: 'Katak Dewasa', desc: 'Ekor habis, bernapas dengan paru-paru dan kulit, bisa hidup di dua alam.', emoji: '🐸' }
];

export const SOLAR_PLANETS = [
  { name: 'Merkurius', emoji: '🌑', dist: 'Terdekat ke matahari', fact: 'Suhu siang sangat panas, malam sangat beku karena tanpa atmosfer.' },
  { name: 'Venus', emoji: '🌕', dist: 'Planet kedua', fact: 'Planet terpanas di tata surya dijuluki Bintang Fajar/Kejora.' },
  { name: 'Bumi', emoji: '🌍', dist: 'Planet ketiga', fact: 'Satu-satunya planet berpenghuni dengan air cair dan oksigen melimpah.' },
  { name: 'Mars', emoji: '🔴', dist: 'Planet keempat', fact: 'Dijuluki Planet Merah karena banyak debu besi oksida (karat).' },
  { name: 'Jupiter', emoji: '🪐', dist: 'Planet kelima', fact: 'Planet gas raksasa terbesar, gravitasinya sangat kuat.' },
  { name: 'Saturnus', emoji: '🪐', dist: 'Planet keenam', fact: 'Memiliki sistem cincin es dan bebatuan paling indah dan megah.' },
  { name: 'Uranus', emoji: '🔵', dist: 'Planet ketujuh', fact: 'Planet es berwarna biru kehijauan yang berputar miring.' },
  { name: 'Neptunus', emoji: '🌀', dist: 'Planet terjauh', fact: 'Planet paling dingin dengan badai angin kencang berkecepatan tinggi.' }
];
