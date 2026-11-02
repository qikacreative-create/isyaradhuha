import { VocabularyItem } from '../types';

export interface ArabicCategory {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  icon: string;
}

export const ARABIC_CATEGORIES: ArabicCategory[] = [
  { id: 'kelas', title: 'Di Dalam Kelas', arabicTitle: 'فِي الْفَصْلِ', description: 'Benda-benda dan peralatan belajar di madrasah', icon: 'BookOpen' },
  { id: 'tubuh', title: 'Anggota Tubuh', arabicTitle: 'أَعْضَاءُ الْجِسْمِ', description: 'Mengenal nama-nama bagian tubuh manusia', icon: 'Smile' },
  { id: 'angka', title: 'Angka 1 - 20', arabicTitle: 'الْأَرْقَامُ', description: 'Belajar berhitung bilangan dan angka Arab', icon: 'Binary' },
  { id: 'warna', title: 'Warna-Warna', arabicTitle: 'الْأَلْوَانُ', description: 'Nama-nama warna dalam bahasa Arab', icon: 'Palette' },
  { id: 'keluarga', title: 'Keluarga Tercinta', arabicTitle: 'الْأُسْرَةُ', description: 'Anggota keluarga: ayah, ibu, kakek, nenek, saudara', icon: 'Heart' },
  { id: 'sapaan', title: 'Sapaan & Ta’aruf', arabicTitle: 'التَّعَارُفُ', description: 'Ungkapan salam dan perkenalan sehari-hari santri', icon: 'MessageCircle' }
];

export const VOCABULARY_LIST: VocabularyItem[] = [
  // DI DALAM KELAS
  {
    id: 'k1',
    category: 'kelas',
    arabic: 'كِتَابٌ',
    transliteration: 'Kitābun',
    meaning: 'Buku',
    exampleSentence: { arabic: 'هَٰذَا كِتَابِي', translation: 'Ini adalah bukuku.' }
  },
  {
    id: 'k2',
    category: 'kelas',
    arabic: 'قَلَمٌ',
    transliteration: 'Qalamun',
    meaning: 'Pena / Pulpen',
    exampleSentence: { arabic: 'أَكْتُبُ بِالْقَلَمِ', translation: 'Aku menulis dengan pena.' }
  },
  {
    id: 'k3',
    category: 'kelas',
    arabic: 'مَكْتَبٌ',
    transliteration: 'Maktabun',
    meaning: 'Meja Tulis',
    exampleSentence: { arabic: 'الْكِتَابُ عَلَى الْمَكْتَبِ', translation: 'Buku ada di atas meja.' }
  },
  {
    id: 'k4',
    category: 'kelas',
    arabic: 'كُرْسِيٌّ',
    transliteration: 'Kursiyyun',
    meaning: 'Kursi',
    exampleSentence: { arabic: 'أَجْلِسُ عَلَى الْكُرْسِيِّ', translation: 'Aku duduk di atas kursi.' }
  },
  {
    id: 'k5',
    category: 'kelas',
    arabic: 'سَبُّورَةٌ',
    transliteration: 'Sabbūratun',
    meaning: 'Papan Tulis',
    exampleSentence: { arabic: 'الْمُعَلِّمُ يَكْتُبُ عَلَى السَّبُّورَةِ', translation: 'Pak guru menulis di papan tulis.' }
  },
  {
    id: 'k6',
    category: 'kelas',
    arabic: 'حَقِيبَةٌ',
    transliteration: 'Haqībatun',
    meaning: 'Tas Sekolah',
    exampleSentence: { arabic: 'هَٰذِهِ حَقِيبَةٌ جَدِيدَةٌ', translation: 'Ini tas sekolah yang baru.' }
  },
  {
    id: 'k7',
    category: 'kelas',
    arabic: 'مِمْسَحَةٌ',
    transliteration: 'Mimsahatun',
    meaning: 'Penghapus',
    exampleSentence: { arabic: 'أَمْسَحُ السَّبُّورَةَ بِالْمِمْسَحَةِ', translation: 'Aku menghapus papan tulis dengan penghapus.' }
  },
  {
    id: 'k8',
    category: 'kelas',
    arabic: 'مِسْطَرَةٌ',
    transliteration: 'Mistharatun',
    meaning: 'Penggaris',
    exampleSentence: { arabic: 'أَرْسُمُ بِالْمِسْطَرَةِ', translation: 'Aku menggambar dengan penggaris.' }
  },

  // ANGGOTA TUBUH
  {
    id: 't1',
    category: 'tubuh',
    arabic: 'رَأْسٌ',
    transliteration: 'Ra’sun',
    meaning: 'Kepala',
    exampleSentence: { arabic: 'هَٰذَا رَأْسِي', translation: 'Ini kepalaku.' }
  },
  {
    id: 't2',
    category: 'tubuh',
    arabic: 'عَيْنٌ',
    transliteration: '‘Ainun',
    meaning: 'Mata',
    exampleSentence: { arabic: 'أَنْظُرُ بِالْعَيْنِ', translation: 'Aku melihat dengan mata.' }
  },
  {
    id: 't3',
    category: 'tubuh',
    arabic: 'أُذُنٌ',
    transliteration: 'Udzunun',
    meaning: 'Telinga',
    exampleSentence: { arabic: 'أَسْمَعُ بِالْأُذُنِ', translation: 'Aku mendengar dengan telinga.' }
  },
  {
    id: 't4',
    category: 'tubuh',
    arabic: 'أَنْفٌ',
    transliteration: 'Anfun',
    meaning: 'Hidung',
    exampleSentence: { arabic: 'أَشُمُّ بِالْأَنْفِ', translation: 'Aku mencium bau dengan hidung.' }
  },
  {
    id: 't5',
    category: 'tubuh',
    arabic: 'فَمٌ',
    transliteration: 'Famun',
    meaning: 'Mulut',
    exampleSentence: { arabic: 'أَتَكَلَّمُ بِالْفَمِ', translation: 'Aku berbicara dengan mulut.' }
  },
  {
    id: 't6',
    category: 'tubuh',
    arabic: 'يَدٌ',
    transliteration: 'Yadun',
    meaning: 'Tangan',
    exampleSentence: { arabic: 'أَغْسِلُ يَدَيَّ', translation: 'Aku membasuh kedua tanganku.' }
  },
  {
    id: 't7',
    category: 'tubuh',
    arabic: 'رِجْلٌ',
    transliteration: 'Rijlung',
    meaning: 'Kaki',
    exampleSentence: { arabic: 'أَمْشِي بِالرِّجْلِ', translation: 'Aku berjalan dengan kaki.' }
  },
  {
    id: 't8',
    category: 'tubuh',
    arabic: 'قَلْبٌ',
    transliteration: 'Qalbun',
    meaning: 'Hati / Jantung',
    exampleSentence: { arabic: 'قَلْبِي سَلِيمٌ', translation: 'Hatiku bersih dan selamat.' }
  },

  // ANGKA
  {
    id: 'a1',
    category: 'angka',
    arabic: 'وَاحِدٌ (١)',
    transliteration: 'Wāhidun',
    meaning: 'Satu (1)',
    exampleSentence: { arabic: 'قَلَمٌ وَاحِدٌ', translation: 'Satu buah pena.' }
  },
  {
    id: 'a2',
    category: 'angka',
    arabic: 'اِثْنَانِ (٢)',
    transliteration: 'Itsnāni',
    meaning: 'Dua (2)',
    exampleSentence: { arabic: 'كِتَابَانِ اثْنَانِ', translation: 'Dua buah buku.' }
  },
  {
    id: 'a3',
    category: 'angka',
    arabic: 'ثَلَاثَةٌ (٣)',
    transliteration: 'Tsalātsatun',
    meaning: 'Tiga (3)',
    exampleSentence: { arabic: 'ثَلَاثَةُ أَيَّامٍ', translation: 'Tiga hari.' }
  },
  {
    id: 'a4',
    category: 'angka',
    arabic: 'أَرْبَعَةٌ (٤)',
    transliteration: 'Arba‘atun',
    meaning: 'Empat (4)',
    exampleSentence: { arabic: 'أَرْبَعَةُ فُصُولٍ', translation: 'Empat musim/kelas.' }
  },
  {
    id: 'a5',
    category: 'angka',
    arabic: 'خَمْسَةٌ (٥)',
    transliteration: 'Khamsatun',
    meaning: 'Lima (5)',
    exampleSentence: { arabic: 'خَمْسُ صَلَوَاتٍ', translation: 'Lima waktu salat.' }
  },
  {
    id: 'a6',
    category: 'angka',
    arabic: 'سِتَّةٌ (٦)',
    transliteration: 'Sittatun',
    meaning: 'Enam (6)',
    exampleSentence: { arabic: 'أَرْكَانُ الْإِيمَانِ سِتَّةٌ', translation: 'Rukun iman ada enam.' }
  },
  {
    id: 'a7',
    category: 'angka',
    arabic: 'سَبْعَةٌ (٧)',
    transliteration: 'Sab‘atun',
    meaning: 'Tujuh (7)',
    exampleSentence: { arabic: 'سَبْعُ سَمَاوَاتٍ', translation: 'Tujuh lapis langit.' }
  },
  {
    id: 'a8',
    category: 'angka',
    arabic: 'ثَمَانِيَةٌ (٨)',
    transliteration: 'Tsamāniyatun',
    meaning: 'Delapan (8)',
    exampleSentence: { arabic: 'ثَمَانِيَةُ كُتُبٍ', translation: 'Delapan buku.' }
  },
  {
    id: 'a9',
    category: 'angka',
    arabic: 'تِسْعَةٌ (٩)',
    transliteration: 'Tis‘atun',
    meaning: 'Sembilan (9)',
    exampleSentence: { arabic: 'تِسْعَةُ طُلَّابٍ', translation: 'Sembilan orang murid.' }
  },
  {
    id: 'a10',
    category: 'angka',
    arabic: 'عَشَرَةٌ (١٠)',
    transliteration: '‘Asyaratun',
    meaning: 'Sepuluh (10)',
    exampleSentence: { arabic: 'عَشَرَةُ أَصَابِعَ', translation: 'Sepuluh jari tangan.' }
  },

  // WARNA-WARNA
  {
    id: 'w1',
    category: 'warna',
    arabic: 'أَحْمَرُ',
    transliteration: 'Ahmaru',
    meaning: 'Merah',
    exampleSentence: { arabic: 'الْقَلَمُ أَحْمَرُ', translation: 'Pulpen itu berwarna merah.' }
  },
  {
    id: 'w2',
    category: 'warna',
    arabic: 'أَخْضَرُ',
    transliteration: 'Akhdharu',
    meaning: 'Hijau',
    exampleSentence: { arabic: 'الشَّجَرُ أَخْضَرُ', translation: 'Pohon itu berwarna hijau.' }
  },
  {
    id: 'w3',
    category: 'warna',
    arabic: 'أَزْرَقُ',
    transliteration: 'Azraqu',
    meaning: 'Biru',
    exampleSentence: { arabic: 'السَّمَاءُ زَرْقَاءُ', translation: 'Langit itu berwarna biru.' }
  },
  {
    id: 'w4',
    category: 'warna',
    arabic: 'أَصْفَرُ',
    transliteration: 'Ashfaru',
    meaning: 'Kuning',
    exampleSentence: { arabic: 'الْمَوْزُ أَصْفَرُ', translation: 'Pisang itu berwarna kuning.' }
  },
  {
    id: 'w5',
    category: 'warna',
    arabic: 'أَبْيَضُ',
    transliteration: 'Abyadhu',
    meaning: 'Putih',
    exampleSentence: { arabic: 'الثَّوْبُ أَبْيَضُ', translation: 'Pakaian itu berwarna putih.' }
  },
  {
    id: 'w6',
    category: 'warna',
    arabic: 'أَسْوَدُ',
    transliteration: 'Aswadu',
    meaning: 'Hitam',
    exampleSentence: { arabic: 'الْحَبْرُ أَسْوَدُ', translation: 'Tinta itu berwarna hitam.' }
  },

  // KELUARGA
  {
    id: 'kl1',
    category: 'keluarga',
    arabic: 'أَبٌ / وَالِدٌ',
    transliteration: 'Abun / Wālidun',
    meaning: 'Ayah',
    exampleSentence: { arabic: 'أَبِي رَجُلٌ طَيِّبٌ', translation: 'Ayahku orang yang baik hati.' }
  },
  {
    id: 'kl2',
    category: 'keluarga',
    arabic: 'أُمٌّ / وَالِدَةٌ',
    transliteration: 'Ummun / Wālidatun',
    meaning: 'Ibu',
    exampleSentence: { arabic: 'أُمِّي فِي الْبَيْتِ', translation: 'Ibuku ada di rumah.' }
  },
  {
    id: 'kl3',
    category: 'keluarga',
    arabic: 'أَخٌ',
    transliteration: 'Akhun',
    meaning: 'Saudara Laki-laki',
    exampleSentence: { arabic: 'أَخِي كَبِيرٌ', translation: 'Kakak laki-lakiku sudah besar.' }
  },
  {
    id: 'kl4',
    category: 'keluarga',
    arabic: 'أُخْتٌ',
    transliteration: 'Ukhtun',
    meaning: 'Saudari Perempuan',
    exampleSentence: { arabic: 'أُخْتِي صَغِيرَةٌ', translation: 'Adik perempuanku masih kecil.' }
  },
  {
    id: 'kl5',
    category: 'keluarga',
    arabic: 'جَدٌّ',
    transliteration: 'Jaddun',
    meaning: 'Kakek',
    exampleSentence: { arabic: 'جَدِّي يَقْرَأُ الْقُرْآنَ', translation: 'Kakekku membaca Al-Qur\'an.' }
  },
  {
    id: 'kl6',
    category: 'keluarga',
    arabic: 'جَدَّةٌ',
    transliteration: 'Jaddatun',
    meaning: 'Nenek',
    exampleSentence: { arabic: 'جَدَّتِي تُحِبُّنِي', translation: 'Nenekku menyayangiku.' }
  },

  // SAPAAN & PERKENALAN SANTRIWATI
  {
    id: 's1',
    category: 'sapaan',
    arabic: 'السَّلَامُ عَلَيْكُمْ',
    transliteration: 'Assalāmu ‘alaikum',
    meaning: 'Semoga keselamatan tercurah kepadamu',
    exampleSentence: { arabic: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ يَا أُخْتِي', translation: 'Dan kepadamu juga keselamatan dan rahmat Allah, wahai saudariku.' }
  },
  {
    id: 's2',
    category: 'sapaan',
    arabic: 'صَبَاحَ الْخَيْرِ',
    transliteration: 'Shabāhal khair',
    meaning: 'Selamat pagi',
    exampleSentence: { arabic: 'صَبَاحَ النُّورِ يَا صَدِيقَتِي', translation: 'Selamat pagi juga, wahai sahabatku.' }
  },
  {
    id: 's3',
    category: 'sapaan',
    arabic: 'مَسَاءَ الْخَيْرِ',
    transliteration: 'Masā’al khair',
    meaning: 'Selamat sore / petang',
    exampleSentence: { arabic: 'مَسَاءَ النُّورِ وَالسُّرُورِ', translation: 'Selamat sore juga penuh kegembiraan.' }
  },
  {
    id: 's4',
    category: 'sapaan',
    arabic: 'مَا اسْمُكِ؟',
    transliteration: 'Masmuki? (Untuk Perempuan)',
    meaning: 'Siapa namamu, ukhti?',
    exampleSentence: { arabic: 'اِسْمِي عَائِشَةُ، وَأَنَا تِلْمِيذَةٌ', translation: 'Namaku Aisyah, dan aku seorang siswi madrasah.' }
  },
  {
    id: 's5',
    category: 'sapaan',
    arabic: 'كَيْفَ حَالُكِ؟',
    transliteration: 'Kaifa hāluki? (Untuk Perempuan)',
    meaning: 'Bagaimana kabarmu, ukhti?',
    exampleSentence: { arabic: 'أَنَا بِخَيْرٍ وَعَافِيَةٍ، وَالْحَمْدُ لِلَّهِ', translation: 'Saya baik-baik saja dan sehat wal afiat, alhamdulillah.' }
  },
  {
    id: 's6',
    category: 'sapaan',
    arabic: 'أَنَا تِلْمِيذَةٌ نَشِيطَةٌ',
    transliteration: 'Anā tilmīdzatun nasyīthah',
    meaning: 'Saya murid perempuan yang rajin',
    exampleSentence: { arabic: 'أَنَا تِلْمِيذَةٌ فِي الْمَدْرَسَةِ الابْتِدَائِيَّةِ', translation: 'Saya seorang siswi di Madrasah Ibtidaiyah.' }
  },
  {
    id: 's7',
    category: 'sapaan',
    arabic: 'شُكْرًا جَزِيلًا',
    transliteration: 'Syukran jazīlan',
    meaning: 'Terima kasih banyak',
    exampleSentence: { arabic: 'عَفْوًا يَا أُخْتِي الْعَزِيزَةَ', translation: 'Sama-sama, wahai saudariku tersayang.' }
  }
];
