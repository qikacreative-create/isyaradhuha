import { TajwidRule, QuranSurahStudy } from '../types';

export const TAJWID_RULES: TajwidRule[] = [
  // 1. NUN SUKUN & TANWIN
  {
    id: 'idzhar-halqi',
    category: 'nun_sukun',
    name: 'Idzhar Halqi',
    arabicName: 'إِظْهَارْ حَلْقِي',
    color: '#0284c7', // Sky Blue
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    badgeText: 'Jelas Tanpa Dengung',
    letters: ['ء', 'هـ', 'ع', 'ح', 'غ', 'خ'],
    lettersArabic: 'ء - هـ - ع - ح - غ - خ',
    harakatCount: '1 Harakat (Biasa)',
    definition: 'Idzhar artinya jelas atau terang. Halqi artinya tenggorokan. Terjadi apabila Nun Sukun (نْ) atau Tanwin (ـً ـٍ ـٌ) bertemu salah satu dari 6 huruf tenggorokan.',
    howToRead: 'Dibaca jelas, tegas, dan terang tanpa mendengung (ghunnah), dan tidak boleh ditahan lama.',
    examples: [
      { phrase: 'مَنْ ءَامَنَ', surahRef: 'Al-Baqarah: 62', highlightWord: 'مَنْ ءَامَنَ', explanation: 'Nun mati bertemu huruf Hamzah (ء)' },
      { phrase: 'مِنْ حَكِيمٍ', surahRef: 'Fushshilat: 42', highlightWord: 'مِنْ حَ', explanation: 'Nun mati bertemu huruf Ha (ح)' },
      { phrase: 'عَذَابٌ أَلِيمٌ', surahRef: 'Al-Baqarah: 10', highlightWord: 'عَذَابٌ أَلِيمٌ', explanation: 'Dhammatain bertemu Hamzah (ء)' },
      { phrase: 'أَنْعَمْتَ', surahRef: 'Al-Fatihah: 7', highlightWord: 'أَنْعَمْتَ', explanation: 'Nun mati bertemu huruf ‘Ain (ع) di satu kata' }
    ]
  },
  {
    id: 'idgham-bighunnah',
    category: 'nun_sukun',
    name: 'Idgham Bighunnah',
    arabicName: 'إِدْغَامْ بِغُنَّة',
    color: '#d97706', // Amber / Gold
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeText: 'Lebur + Berdengung',
    letters: ['ي', 'ن', 'م', 'و'],
    lettersArabic: 'ي - ن - م - و (يَنْمُو)',
    harakatCount: '2 Harakat (Dengung)',
    definition: 'Idgham artinya memasukkan atau meleburkan. Bighunnah artinya disertai dengung. Terjadi apabila Nun Sukun atau Tanwin bertemu 4 huruf yang terkumpul dalam kata "YANMU" (يَنْمُو) dalam dua kata terpisah.',
    howToRead: 'Suara Nun Sukun atau Tanwin dileburkan masuk ke huruf sesudahnya seraya ditahan mendengung melalui rongga hidung selama 2 harakat.',
    examples: [
      { phrase: 'مَن يَقُولُ', surahRef: 'Al-Baqarah: 8', highlightWord: 'مَن يَقُولُ', explanation: 'Nun mati melebur ke huruf Ya (ي) berdengung' },
      { phrase: 'مِن مَّالٍ', surahRef: 'Al-Mu’minun: 55', highlightWord: 'مِن مَّالٍ', explanation: 'Nun mati bertemu Mim (م) berdengung' },
      { phrase: 'مِّن وَالٍ', surahRef: 'Ar-Ra’d: 11', highlightWord: 'مِّن وَالٍ', explanation: 'Nun mati bertemu Wawu (و) berdengung' },
      { phrase: 'وَرِزْقٌ كَرِيمٌ', surahRef: 'Al-Anfal: 4', highlightWord: 'وَرِزْقٌ كَرِيمٌ', explanation: 'Tanwin bertemu Kaf (Ikhfa) vs Tanwin bertemu huruf Wawu (Idgham)' }
    ]
  },
  {
    id: 'idgham-bilaghunnah',
    category: 'nun_sukun',
    name: 'Idgham Bilaghunnah',
    arabicName: 'إِدْغَامْ بِلَا غُنَّة',
    color: '#ea580c', // Orange
    badgeBg: 'bg-orange-50 border-orange-200 text-orange-800',
    badgeText: 'Lebur Tanpa Dengung',
    letters: ['ل', 'ر'],
    lettersArabic: 'ل - ر',
    harakatCount: 'Langsung lebur (0 dengung)',
    definition: 'Idgham Bilaghunnah adalah memasukkan suara Nun Sukun atau Tanwin sepenuhnya ke huruf Lam (ل) atau Ra (ر) tanpa disertai dengung sama sekali.',
    howToRead: 'Bunyi Nun atau Tanwin lenyap seketika dan langsung dibaca Lam atau Ra yang bertasydid secara tegas tanpa ditahan di hidung.',
    examples: [
      { phrase: 'مِّن لَّدُنْهُ', surahRef: 'Al-Kahf: 2', highlightWord: 'مِّن لَّدُنْهُ', explanation: 'Nun mati lebur sempurna ke huruf Lam tanpa dengung (dibaca mil-ladunhu)' },
      { phrase: 'مِّن رَّبِّهِمْ', surahRef: 'Al-Baqarah: 5', highlightWord: 'مِّن رَّبِّهِمْ', explanation: 'Nun mati lebur ke huruf Ra (dibaca mir-rabbihim)' },
      { phrase: 'غَفُورٌ رَّحِيمٌ', surahRef: 'Al-Baqarah: 173', highlightWord: 'غَفُورٌ رَّحِيمٌ', explanation: 'Tanwin lebur ke huruf Ra (dibaca Ghafurur-rahim)' }
    ]
  },
  {
    id: 'iqlab',
    category: 'nun_sukun',
    name: 'Iqlab',
    arabicName: 'إِقْلَاب',
    color: '#9333ea', // Purple
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-800',
    badgeText: 'Tukar Jadi Mim',
    letters: ['ب'],
    lettersArabic: 'ب (Satu Huruf Ba)',
    harakatCount: '2 Harakat (Dengung)',
    definition: 'Iqlab artinya mengubah atau menukar. Terjadi apabila Nun Sukun atau Tanwin bertemu dengan satu-satunya huruf Iqlab yaitu Ba (ب). Dalam mushaf biasanya ditandai dengan huruf mim kecil (مـ) di atasnya.',
    howToRead: 'Suara Nun Sukun atau Tanwin diubah menjadi suara huruf Mim (م) di bibir, disertai dengung (ghunnah) selama 2 harakat sebelum melafalkan huruf Ba.',
    examples: [
      { phrase: 'مِنۢ بَعْدِ', surahRef: 'Al-Baqarah: 27', highlightWord: 'مِنۢ بَعْدِ', explanation: 'Nun mati bertemu huruf Ba, ditukar jadi bunyi Mim mendengung (mim-ba\'di)' },
      { phrase: 'كَلَّا لَيُنۢبَذَنَّ', surahRef: 'Al-Humazah: 4', highlightWord: 'لَيُنۢبَذَنَّ', explanation: 'Nun mati di tengah kata bertemu Ba (layumbadzanna)' },
      { phrase: 'سَمِيعٌۢ بَصِيرٌ', surahRef: 'Al-Hajj: 61', highlightWord: 'سَمِيعٌۢ بَصِيرٌ', explanation: 'Dhammatain bertemu huruf Ba (Sami\'um-bashir)' }
    ]
  },
  {
    id: 'ikhfa-haqiqi',
    category: 'nun_sukun',
    name: 'Ikhfa\' Haqiqi',
    arabicName: 'إِخْفَاءْ حَقِيقِي',
    color: '#059669', // Emerald Green
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badgeText: 'Samar-samar Berdengung',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    lettersArabic: '15 Huruf (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك)',
    harakatCount: '2 Harakat (Samar & Dengung)',
    definition: 'Ikhfa\' artinya menyamarkan atau menyembunyikan. Terjadi apabila Nun Sukun atau Tanwin bertemu salah satu dari 15 huruf Ikhfa\'.',
    howToRead: 'Membaca suara Nun Sukun atau Tanwin di antara jelas dan lebur (samar-samar), makhraj lidah sudah bersiap membentuk huruf berikutnya disertai dengung 2 harakat.',
    examples: [
      { phrase: 'مِن قَبْلُ', surahRef: 'Al-Baqarah: 25', highlightWord: 'مِن قَبْلُ', explanation: 'Nun mati bertemu huruf Qaf (tebal dan dengung)' },
      { phrase: 'أَنزَلْنَاهُ', surahRef: 'Al-Qadr: 1', highlightWord: 'أَنزَلْنَاهُ', explanation: 'Nun mati bertemu huruf Zai' },
      { phrase: 'كُنتُمْ', surahRef: 'Al-Baqarah: 23', highlightWord: 'كُنتُمْ', explanation: 'Nun mati bertemu huruf Ta' },
      { phrase: 'شَيْءٍ قَدِيرٌ', surahRef: 'Al-Baqarah: 20', highlightWord: 'شَيْءٍ قَدِيرٌ', explanation: 'Kasratain bertemu huruf Qaf' }
    ]
  },

  // 2. MIM SUKUN
  {
    id: 'ikhfa-syafawi',
    category: 'mim_sukun',
    name: 'Ikhfa\' Syafawi',
    arabicName: 'إِخْفَاءْ شَفَوِي',
    color: '#10b981',
    badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
    badgeText: 'Mim Samar di Bibir',
    letters: ['ب'],
    lettersArabic: 'ب (Satu Huruf Ba)',
    harakatCount: '2 Harakat (Dengung)',
    definition: 'Syafawi artinya bibir. Terjadi apabila Mim Sukun (مْ) bertemu huruf Ba (ب).',
    howToRead: 'Bibir dirapatkan secara lembut untuk melafalkan suara Mim yang disamarkan, disertai dengung 2 harakat sebelum mengucap Ba.',
    examples: [
      { phrase: 'تَرْمِيهِم بِحِجَارَةٍ', surahRef: 'Al-Fil: 4', highlightWord: 'تَرْمِيهِم بِحِجَارَةٍ', explanation: 'Mim sukun bertemu huruf Ba' },
      { phrase: 'وَهُم بِالْآخِرَةِ', surahRef: 'Hud: 19', highlightWord: 'وَهُم بِالْآخِرَةِ', explanation: 'Mim sukun bertemu huruf Ba berdengung' }
    ]
  },
  {
    id: 'idgham-mimi',
    category: 'mim_sukun',
    name: 'Idgham Mimi (Mutamatsilain)',
    arabicName: 'إِدْغَامْ مِثْلَيْنِ صَغِيرْ',
    color: '#f59e0b',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeText: 'Mim Lebur Bertasydid',
    letters: ['م'],
    lettersArabic: 'م (Satu Huruf Mim)',
    harakatCount: '2 Harakat (Dengung)',
    definition: 'Terjadi apabila Mim Sukun (مْ) bertemu dengan sesama huruf Mim (م) yang berharakat.',
    howToRead: 'Mim sukun dimasukkan sepenuhnya ke huruf Mim kedua sehingga menjadi satu Mim yang bertasydid dan didengungkan selama 2 harakat.',
    examples: [
      { phrase: 'لَهُم مَّا يَشَاءُونَ', surahRef: 'Qaf: 35', highlightWord: 'لَهُم مَّا', explanation: 'Mim sukun bertemu Mim bertasydid' },
      { phrase: 'فِي قُلُوبِهِم مَّرَضٌ', surahRef: 'Al-Baqarah: 10', highlightWord: 'قُلُوبِهِم مَّرَضٌ', explanation: 'Mim sukun melebur ke Mim' }
    ]
  },
  {
    id: 'idzhar-syafawi',
    category: 'mim_sukun',
    name: 'Idzhar Syafawi',
    arabicName: 'إِظْهَارْ شَفَوِي',
    color: '#0284c7',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    badgeText: 'Mim Terang & Jelas',
    letters: ['26 Huruf Selain Ba dan Mim'],
    lettersArabic: '٢٦ Huruf Selain (ب) dan (م)',
    harakatCount: '1 Harakat (Tanpa dengung)',
    definition: 'Terjadi apabila Mim Sukun (مْ) bertemu salah satu dari 26 huruf hijaiyah selain huruf Ba (ب) dan Mim (م).',
    howToRead: 'Bibir dirapatkan untuk mengucapkan huruf Mim sukun dengan sangat jelas dan tegas tanpa menahan suara dengung.',
    examples: [
      { phrase: 'أَلَمْ تَرَ', surahRef: 'Al-Fil: 1', highlightWord: 'أَلَمْ تَرَ', explanation: 'Mim sukun bertemu huruf Ta' },
      { phrase: 'عَلَيْهِمْ وَلَا', surahRef: 'Al-Fatihah: 7', highlightWord: 'عَلَيْهِمْ وَلَا', explanation: 'Mim sukun bertemu Wawu (harus sangat jelas agar tidak tersamar)' }
    ]
  },

  // 3. ALIF LAM
  {
    id: 'alif-lam-qamariyah',
    category: 'alif_lam',
    name: 'Al-Qamariyah (Idzhar Qamariyah)',
    arabicName: 'أَلْ قَمَرِيَّة',
    color: '#0284c7',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    badgeText: 'Lam Terang Bersukun',
    letters: ['ء', 'ب', 'غ', 'ح', 'ج', 'ك', 'و', 'خ', 'ف', 'ع', 'ق', 'ي', 'م', 'هـ'],
    lettersArabic: 'اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ (١٤ Huruf)',
    harakatCount: '1 Harakat (Tegas)',
    definition: 'Qamar artinya bulan. Terjadi apabila huruf Alif Lam (ال) bertemu salah satu dari 14 huruf Qamariyah.',
    howToRead: 'Huruf Lam diberi tanda sukun (الْـ) dan dibaca terang serta jelas makhraj lidahnya.',
    examples: [
      { phrase: 'الْحَمْدُ لِلَّهِ', surahRef: 'Al-Fatihah: 2', highlightWord: 'الْحَمْدُ', explanation: 'Alif Lam bertemu huruf Ha (ح)' },
      { phrase: 'الْقَارِعَةُ', surahRef: 'Al-Qari’ah: 1', highlightWord: 'الْقَارِعَةُ', explanation: 'Alif Lam bertemu huruf Qaf (ق)' }
    ]
  },
  {
    id: 'alif-lam-syamsiyah',
    category: 'alif_lam',
    name: 'Al-Syamsiyah (Idgham Syamsiyah)',
    arabicName: 'أَلْ شَمْسِيَّة',
    color: '#ea580c',
    badgeBg: 'bg-orange-50 border-orange-200 text-orange-800',
    badgeText: 'Lam Lebur Bertasydid',
    letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
    lettersArabic: '١٤ Huruf Syamsiyah',
    harakatCount: 'Langsung melebur',
    definition: 'Syams artinya matahari. Terjadi apabila huruf Alif Lam (ال) bertemu salah satu dari 14 huruf Syamsiyah.',
    howToRead: 'Huruf Lam tidak berbunyi (di-idgham-kan), langsung melebur ke huruf berikutnya yang diberi tanda tasydid/syaddah.',
    examples: [
      { phrase: 'الرَّحْمَٰنِ الرَّحِيمِ', surahRef: 'Al-Fatihah: 3', highlightWord: 'الرَّحْمَٰنِ', explanation: 'Alif Lam bertemu Ra bertasydid' },
      { phrase: 'وَالشَّمْسِ', surahRef: 'Asy-Syams: 1', highlightWord: 'وَالشَّمْسِ', explanation: 'Alif Lam bertemu Syin bertasydid' }
    ]
  },

  // 4. QALQALAH
  {
    id: 'qalqalah-sughra',
    category: 'qalqalah',
    name: 'Qalqalah Sughra',
    arabicName: 'قَلْقَلَة صُغْرَى',
    color: '#2563eb',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeText: 'Pantulan Kecil di Tengah',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    lettersArabic: 'ق - ط - ب - ج - د (بَجَدْ قَطْ)',
    harakatCount: 'Pantulan ringan',
    definition: 'Qalqalah artinya memantul atau bergetar. Sughra artinya kecil. Terjadi apabila salah satu dari 5 huruf Qalqalah (Baju Ditoko) berharakat sukun ASLI di tengah kata.',
    howToRead: 'Makhraj huruf dipantulkan secara ringan dan mengalir lembut tanpa hentakan berlebihan.',
    examples: [
      { phrase: 'يَجْعَلُونَ', surahRef: 'Al-Baqarah: 19', highlightWord: 'يَجْعَلُونَ', explanation: 'Huruf Jim sukun di tengah kata' },
      { phrase: 'يَقْطَعُونَ', surahRef: 'Al-Baqarah: 27', highlightWord: 'يَقْطَعُونَ', explanation: 'Huruf Qaf sukun di tengah kata' },
      { phrase: 'حَبْلُ', surahRef: 'Al-Lahab: 5', highlightWord: 'حَبْلُ', explanation: 'Huruf Ba sukun di tengah kata' }
    ]
  },
  {
    id: 'qalqalah-kubra',
    category: 'qalqalah',
    name: 'Qalqalah Kubra',
    arabicName: 'قَلْقَلَة كُبْرَى',
    color: '#1d4ed8',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    badgeText: 'Pantulan Kuat di Waqaf',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    lettersArabic: 'ق - ط - ب - ج - د',
    harakatCount: 'Pantulan kuat berbobot',
    definition: 'Kubra artinya besar atau kuat. Terjadi apabila huruf Qalqalah berada di akhir kata dan dibaca sukun karena berhenti (waqaf).',
    howToRead: 'Pantulan suara terdengar lebih kuat, tegas, dan tebal saat berhenti pada akhir bacaan.',
    examples: [
      { phrase: 'قُلْ هُوَ اللَّهُ أَحَدٌ', surahRef: 'Al-Ikhlas: 1', highlightWord: 'أَحَدٌ', explanation: 'Huruf Dal diwaqafkan di akhir ayat' },
      { phrase: 'مِن شَرِّ مَا خَلَقَ', surahRef: 'Al-Falaq: 2', highlightWord: 'خَلَقَ', explanation: 'Huruf Qaf diwaqafkan di akhir ayat' },
      { phrase: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', surahRef: 'Al-Lahab: 1', highlightWord: 'وَتَبَّ', explanation: 'Huruf Ba bertasydid diwaqafkan (Qalqalah Akbar/sangat kuat)' }
    ]
  },

  // 5. HUKUM MAD DASAR
  {
    id: 'mad-thabii',
    category: 'mad',
    name: 'Mad Thabi’i (Mad Asli)',
    arabicName: 'مَدّ طَبِيعِي (أَصْلِي)',
    color: '#e11d48', // Rose Red
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
    badgeText: 'Panjang 2 Harakat (1 Alif)',
    letters: ['Alif setelah Fathah', 'Wawu sukun setelah Dhammah', 'Ya sukun setelah Kasrah'],
    lettersArabic: 'ا - و - ي',
    harakatCount: '2 Harakat (1 Ayunan)',
    definition: 'Mad artinya panjang. Thabi’i artinya alami/asal. Terjadi jika ada huruf mad (Alif, Wawu, Ya) dan tidak bertemu Hamzah atau Sukun.',
    howToRead: 'Dipanjangkan suaranya secara wajar dan alami sepanjang 2 harakat (kira-kira dua ketukan atau satu ayunan tangan).',
    examples: [
      { phrase: 'قَالَ', surahRef: 'Al-Baqarah: 30', highlightWord: 'قَالَ', explanation: 'Alif setelah fathah' },
      { phrase: 'يَقُولُ', surahRef: 'Al-Baqarah: 8', highlightWord: 'يَقُولُ', explanation: 'Wawu sukun setelah dhammah' },
      { phrase: 'قِيلَ', surahRef: 'Al-Baqarah: 11', highlightWord: 'قِيلَ', explanation: 'Ya sukun setelah kasrah' }
    ]
  },
  {
    id: 'mad-wajib-muttashil',
    category: 'mad',
    name: 'Mad Wajib Muttashil',
    arabicName: 'مَدّ وَاجِب مُتَّصِل',
    color: '#be123c',
    badgeBg: 'bg-red-50 border-red-200 text-red-800',
    badgeText: 'Panjang 4-5 Harakat 1 Kata',
    letters: ['Mad Thabi’i bertemu Hamzah dalam 1 kata'],
    lettersArabic: 'مَدّ + ء (فِي كَلِمَةٍ وَاحِدَةٍ)',
    harakatCount: '4 atau 5 Harakat',
    definition: 'Muttashil artinya bersambung. Terjadi jika huruf Mad Thabi’i bertemu huruf Hamzah dalam satu kata utuh.',
    howToRead: 'Wajib dipanjangkan 4 sampai 5 harakat (2,5 alif) dengan suara sambung yang teratur.',
    examples: [
      { phrase: 'إِذَا جَاءَ نَصْرُ اللَّهِ', surahRef: 'An-Nashr: 1', highlightWord: 'جَاءَ', explanation: 'Mad thabi’i bertemu Hamzah di satu kata "Jaaa-a"' },
      { phrase: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ', surahRef: 'Al-Buruj: 1', highlightWord: 'وَالسَّمَاءِ', explanation: 'Mad bertemu Hamzah dalam kata "As-Samaaa-i"' }
    ]
  },
  {
    id: 'mad-arid-lissukun',
    category: 'mad',
    name: 'Mad ‘Aridh Lissukun',
    arabicName: 'مَدّ عَارِض لِلسُّكُون',
    color: '#c026d3',
    badgeBg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800',
    badgeText: 'Panjang 2, 4, atau 6 Harakat saat Waqaf',
    letters: ['Mad Thabi’i di akhir kata karena berhenti'],
    lettersArabic: 'مَدّ + حَرْف مَوْقُوف عَلَيْهِ',
    harakatCount: '2, 4, atau 6 Harakat',
    definition: 'Terjadi bila ada huruf Mad Thabi’i yang diikuti satu huruf hidup yang dibaca sukun karena waqaf (berhenti di ujung ayat).',
    howToRead: 'Boleh dibaca pendek 2 harakat (Qashr), sedang 4 harakat (Tawasuth), atau panjang 6 harakat (Thul). Paling utama adalah 4 atau 6 harakat.',
    examples: [
      { phrase: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', surahRef: 'Al-Fatihah: 2', highlightWord: 'الْعَالَمِينَ', explanation: 'Mad Ya sukun sebelum Nun yang diwaqafkan' },
      { phrase: 'الرَّحْمَٰنِ الرَّحِيمِ', surahRef: 'Al-Fatihah: 3', highlightWord: 'الرَّحِيمِ', explanation: 'Mad Ya sukun sebelum Mim yang diwaqafkan' }
    ]
  }
];

export const QURAN_SURAHS: QuranSurahStudy[] = [
  {
    id: 'al-fatihah',
    name: 'Al-Fatihah',
    arabicName: 'الفَاتِحَة',
    meaning: 'Pembukaan (7 Ayat)',
    ayahs: [
      {
        number: 1,
        arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
        tajwidSpots: [
          { startIndex: 7, endIndex: 16, targetText: 'الرَّحْمَٰنِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Alif Lam melebur ke huruf Ra bertasydid', color: '#ea580c' },
          { startIndex: 17, endIndex: 25, targetText: 'الرَّحِيمِ', ruleId: 'mad-arid-lissukun', ruleName: 'Mad ‘Aridh Lissukun', explanation: 'Mad thabi\'i diwaqafkan di akhir ayat, panjang 2, 4, atau 6 harakat', color: '#c026d3' }
        ]
      },
      {
        number: 2,
        arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: 'Segala puji bagi Allah, Tuhan seluruh alam.',
        tajwidSpots: [
          { startIndex: 0, endIndex: 7, targetText: 'الْحَمْدُ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam bertemu huruf Ha (ح), dibaca jelas bersukun', color: '#0284c7' },
          { startIndex: 19, endIndex: 29, targetText: 'الْعَالَمِينَ', ruleId: 'mad-arid-lissukun', ruleName: 'Mad ‘Aridh Lissukun', explanation: 'Diwaqafkan di akhir ayat, dibaca panjang 2, 4, atau 6 harakat', color: '#c026d3' }
        ]
      },
      {
        number: 3,
        arabicText: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'Yang Maha Pengasih, Maha Penyayang.',
        tajwidSpots: [
          { startIndex: 0, endIndex: 10, targetText: 'الرَّحْمَٰنِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Alif Lam bertemu huruf Ra bertasydid', color: '#ea580c' },
          { startIndex: 11, endIndex: 19, targetText: 'الرَّحِيمِ', ruleId: 'mad-arid-lissukun', ruleName: 'Mad ‘Aridh Lissukun', explanation: 'Mad bertemu huruf hidup yang disukun karena waqaf', color: '#c026d3' }
        ]
      },
      {
        number: 4,
        arabicText: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Pemilik hari pembalasan.',
        tajwidSpots: [
          { startIndex: 0, endIndex: 5, targetText: 'مَالِكِ', ruleId: 'mad-thabii', ruleName: 'Mad Thabi’i', explanation: 'Alif berdiri setelah huruf Mim dibaca 2 harakat', color: '#e11d48' },
          { startIndex: 11, endIndex: 18, targetText: 'الدِّينِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Alif Lam melebur ke huruf Dal bertasydid', color: '#ea580c' }
        ]
      },
      {
        number: 5,
        arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
        tajwidSpots: [
          { startIndex: 24, endIndex: 33, targetText: 'نَسْتَعِينُ', ruleId: 'mad-arid-lissukun', ruleName: 'Mad ‘Aridh Lissukun', explanation: 'Mad Ya sukun diwaqafkan di ujung ayat', color: '#c026d3' }
        ]
      },
      {
        number: 6,
        arabicText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Tunjukilah kami jalan yang lurus,',
        tajwidSpots: [
          { startIndex: 8, endIndex: 16, targetText: 'الصِّرَاطَ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Alif Lam melebur ke Shad bertasydid', color: '#ea580c' },
          { startIndex: 17, endIndex: 27, targetText: 'الْمُسْتَقِيمَ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam terbaca jelas bersukun sebelum huruf Mim', color: '#0284c7' }
        ]
      },
      {
        number: 7,
        arabicText: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
        tajwidSpots: [
          { startIndex: 14, endIndex: 21, targetText: 'أَنْعَمْتَ', ruleId: 'idzhar-halqi', ruleName: 'Idzhar Halqi', explanation: 'Nun sukun bertemu huruf ‘Ain (ع) dibaca terang tanpa dengung', color: '#0284c7' },
          { startIndex: 32, endIndex: 37, targetText: 'هِمْ غَ', ruleId: 'idzhar-syafawi', ruleName: 'Idzhar Syafawi', explanation: 'Mim sukun bertemu huruf Ghain dibaca jelas di bibir', color: '#0284c7' },
          { startIndex: 52, endIndex: 58, targetText: 'هِمْ وَ', ruleId: 'idzhar-syafawi', ruleName: 'Idzhar Syafawi', explanation: 'Mim sukun bertemu Wawu, harus sangat jelas agar tidak tersamar', color: '#0284c7' }
        ]
      }
    ]
  },
  {
    id: 'al-ikhlas',
    name: 'Al-Ikhlas',
    arabicName: 'الإِخْلَاص',
    meaning: 'Keesaan Allah (4 Ayat)',
    ayahs: [
      {
        number: 1,
        arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        translation: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
        tajwidSpots: [
          { startIndex: 14, endIndex: 19, targetText: 'أَحَدٌ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Dal diwaqafkan di akhir ayat, dipantulkan dengan tebal dan tegas', color: '#1d4ed8' }
        ]
      },
      {
        number: 2,
        arabicText: 'اللَّهُ الصَّمَدُ',
        translation: 'Allah tempat meminta segala sesuatu.',
        tajwidSpots: [
          { startIndex: 6, endIndex: 13, targetText: 'الصَّمَدُ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Alif Lam melebur ke Shad bertasydid', color: '#ea580c' },
          { startIndex: 10, endIndex: 13, targetText: 'مَدُ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Dal di akhir ayat dipantulkan kuat saat waqaf', color: '#1d4ed8' }
        ]
      },
      {
        number: 3,
        arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translation: '(Allah) tidak beranak dan tidak pula diperanakkan,',
        tajwidSpots: [
          { startIndex: 0, endIndex: 3, targetText: 'لَمْ', ruleId: 'idzhar-syafawi', ruleName: 'Idzhar Syafawi', explanation: 'Mim sukun bertemu huruf Ya dibaca jelas', color: '#0284c7' },
          { startIndex: 5, endIndex: 8, targetText: 'لِدْ', ruleId: 'qalqalah-sughra', ruleName: 'Qalqalah Sughra', explanation: 'Huruf Dal sukun asli di tengah bacaan, dipantulkan ringan', color: '#2563eb' },
          { startIndex: 16, endIndex: 20, targetText: 'يُولَدْ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Dal diwaqafkan di akhir ayat', color: '#1d4ed8' }
        ]
      },
      {
        number: 4,
        arabicText: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translation: 'Dan tidak ada sesuatu yang setara dengan Dia.',
        tajwidSpots: [
          { startIndex: 9, endIndex: 16, targetText: 'يَكُن لَّهُ', ruleId: 'idgham-bilaghunnah', ruleName: 'Idgham Bilaghunnah', explanation: 'Nun sukun bertemu huruf Lam lebur seketika tanpa dengung (yakul-lahu)', color: '#ea580c' },
          { startIndex: 17, endIndex: 26, targetText: 'كُفُوًا أَحَدٌ', ruleId: 'idzhar-halqi', ruleName: 'Idzhar Halqi', explanation: 'Fathatain bertemu huruf Hamzah (ء) dibaca jelas tanpa dengung', color: '#0284c7' },
          { startIndex: 23, endIndex: 28, targetText: 'أَحَدٌ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Dal waqaf dipantulkan kuat', color: '#1d4ed8' }
        ]
      }
    ]
  },
  {
    id: 'al-falaq',
    name: 'Al-Falaq',
    arabicName: 'الفَلَق',
    meaning: 'Waktu Subuh (5 Ayat)',
    ayahs: [
      {
        number: 1,
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        translation: 'Katakanlah, "Aku berlindung kepada Tuhan yang menguasai subuh (fajar),',
        tajwidSpots: [
          { startIndex: 17, endIndex: 24, targetText: 'الْفَلَقِ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam dibaca jelas bersukun', color: '#0284c7' },
          { startIndex: 21, endIndex: 25, targetText: 'لَقِ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Qaf diwaqafkan di akhir ayat dipantulkan kuat', color: '#1d4ed8' }
        ]
      },
      {
        number: 2,
        arabicText: 'مِن شَرِّ مَا خَلَقَ',
        translation: 'dari kejahatan (makhluk yang) Dia ciptakan,',
        tajwidSpots: [
          { startIndex: 0, endIndex: 6, targetText: 'مِن شَرِّ', ruleId: 'ikhfa-haqiqi', ruleName: 'Ikhfa\' Haqiqi', explanation: 'Nun sukun bertemu huruf Syin (ش) dibaca samar dan mendengung 2 harakat', color: '#059669' },
          { startIndex: 12, endIndex: 16, targetText: 'خَلَقَ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Qaf diwaqafkan dipantulkan tebal', color: '#1d4ed8' }
        ]
      },
      {
        number: 3,
        arabicText: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        translation: 'dan dari kejahatan malam apabila telah gelap gulita,',
        tajwidSpots: [
          { startIndex: 1, endIndex: 7, targetText: 'مِن شَرِّ', ruleId: 'ikhfa-haqiqi', ruleName: 'Ikhfa\' Haqiqi', explanation: 'Nun sukun bertemu Syin', color: '#059669' },
          { startIndex: 12, endIndex: 21, targetText: 'غَاسِقٍ إِذَا', ruleId: 'idzhar-halqi', ruleName: 'Idzhar Halqi', explanation: 'Kasratain bertemu huruf Hamzah dibaca terang tanpa dengung', color: '#0284c7' },
          { startIndex: 22, endIndex: 26, targetText: 'وَقَبَ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Ba diwaqafkan dipantulkan', color: '#1d4ed8' }
        ]
      },
      {
        number: 4,
        arabicText: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        translation: 'dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),',
        tajwidSpots: [
          { startIndex: 1, endIndex: 7, targetText: 'مِن شَرِّ', ruleId: 'ikhfa-haqiqi', ruleName: 'Ikhfa\' Haqiqi', explanation: 'Nun sukun bertemu Syin', color: '#059669' },
          { startIndex: 8, endIndex: 18, targetText: 'النَّفَّاثَاتِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah & Ghunnah', explanation: 'Alif lam lebur ke Nun bertasydid dengan dengung ghunnah musyaddadah', color: '#ea580c' },
          { startIndex: 28, endIndex: 33, targetText: 'الْعُقَدِ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Dal diwaqafkan dipantulkan', color: '#1d4ed8' }
        ]
      },
      {
        number: 5,
        arabicText: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'dan dari kejahatan orang yang dengki apabila dia dengki."',
        tajwidSpots: [
          { startIndex: 1, endIndex: 7, targetText: 'مِن شَرِّ', ruleId: 'ikhfa-haqiqi', ruleName: 'Ikhfa\' Haqiqi', explanation: 'Nun sukun bertemu Syin', color: '#059669' },
          { startIndex: 12, endIndex: 21, targetText: 'حَاسِدٍ إِذَا', ruleId: 'idzhar-halqi', ruleName: 'Idzhar Halqi', explanation: 'Kasratain bertemu huruf Hamzah dibaca terang tanpa dengung', color: '#0284c7' },
          { startIndex: 22, endIndex: 26, targetText: 'حَسَدَ', ruleId: 'qalqalah-kubra', ruleName: 'Qalqalah Kubra', explanation: 'Huruf Dal diwaqafkan dipantulkan tegas', color: '#1d4ed8' }
        ]
      }
    ]
  },
  {
    id: 'an-nas',
    name: 'An-Nas',
    arabicName: 'النَّاس',
    meaning: 'Manusia (6 Ayat)',
    ayahs: [
      {
        number: 1,
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        translation: 'Katakanlah, "Aku berlindung kepada Tuhannya manusia,',
        tajwidSpots: [
          { startIndex: 16, endIndex: 24, targetText: 'النَّاسِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah & Ghunnah', explanation: 'Alif Lam lebur ke Nun bertasydid (Ghunnah 2 harakat)', color: '#ea580c' },
          { startIndex: 19, endIndex: 24, targetText: 'النَّاسِ', ruleId: 'mad-arid-lissukun', ruleName: 'Mad ‘Aridh Lissukun', explanation: 'Mad thabi\'i diwaqafkan di akhir ayat', color: '#c026d3' }
        ]
      },
      {
        number: 2,
        arabicText: 'مَلِكِ النَّاسِ',
        translation: 'Raja manusia,',
        tajwidSpots: [
          { startIndex: 6, endIndex: 13, targetText: 'النَّاسِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Lam lebur ke Nun bertasydid dengung', color: '#ea580c' }
        ]
      },
      {
        number: 3,
        arabicText: 'إِلَٰهِ النَّاسِ',
        translation: 'sembahan manusia,',
        tajwidSpots: [
          { startIndex: 7, endIndex: 14, targetText: 'النَّاسِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Lam lebur ke Nun bertasydid', color: '#ea580c' }
        ]
      },
      {
        number: 4,
        arabicText: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        translation: 'dari kejahatan (bisikan) setan yang bersembunyi,',
        tajwidSpots: [
          { startIndex: 0, endIndex: 6, targetText: 'مِن شَرِّ', ruleId: 'ikhfa-haqiqi', ruleName: 'Ikhfa\' Haqiqi', explanation: 'Nun sukun bertemu Syin disamarkan mendengung', color: '#059669' },
          { startIndex: 7, endIndex: 17, targetText: 'الْوَسْوَاسِ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam dibaca jelas bersukun sebelum huruf Wawu', color: '#0284c7' },
          { startIndex: 18, endIndex: 27, targetText: 'الْخَنَّاسِ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam dibaca jelas bersukun sebelum huruf Kha', color: '#0284c7' }
        ]
      },
      {
        number: 5,
        arabicText: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        translation: 'yang membisikkan (kejahatan) ke dalam dada manusia,',
        tajwidSpots: [
          { startIndex: 24, endIndex: 33, targetText: 'النَّاسِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Lam lebur ke Nun bertasydid', color: '#ea580c' }
        ]
      },
      {
        number: 6,
        arabicText: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        translation: 'dari (golongan) jin dan manusia."',
        tajwidSpots: [
          { startIndex: 4, endIndex: 13, targetText: 'الْجِنَّةِ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah & Ghunnah', explanation: 'Alif Lam Qamariyah jelas, dan Nun bertasydid berdengung', color: '#0284c7' },
          { startIndex: 15, endIndex: 22, targetText: 'النَّاسِ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Lam lebur ke Nun bertasydid', color: '#ea580c' }
        ]
      }
    ]
  },
  {
    id: 'an-nashr',
    name: 'An-Nashr',
    arabicName: 'النَّصْر',
    meaning: 'Pertolongan (3 Ayat)',
    ayahs: [
      {
        number: 1,
        arabicText: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        translation: 'Apabila telah datang pertolongan Allah dan kemenangan,',
        tajwidSpots: [
          { startIndex: 4, endIndex: 9, targetText: 'جَاءَ', ruleId: 'mad-wajib-muttashil', ruleName: 'Mad Wajib Muttashil', explanation: 'Mad thabi\'i bertemu Hamzah di satu kata, dibaca panjang 4-5 harakat', color: '#be123c' },
          { startIndex: 23, endIndex: 30, targetText: 'وَالْفَتْحُ', ruleId: 'alif-lam-qamariyah', ruleName: 'Al-Qamariyah', explanation: 'Alif Lam dibaca jelas sebelum Fa', color: '#0284c7' }
        ]
      },
      {
        number: 2,
        arabicText: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
        translation: 'dan engkau melihat manusia berbondong-bondong masuk agama Allah,',
        tajwidSpots: [
          { startIndex: 8, endIndex: 16, targetText: 'النَّاسَ', ruleId: 'alif-lam-syamsiyah', ruleName: 'Al-Syamsiyah', explanation: 'Lam lebur ke Nun bertasydid', color: '#ea580c' },
          { startIndex: 17, endIndex: 25, targetText: 'يَدْخُلُونَ', ruleId: 'qalqalah-sughra', ruleName: 'Qalqalah Sughra', explanation: 'Dal sukun asli di tengah kata dipantulkan ringan', color: '#2563eb' }
        ]
      },
      {
        number: 3,
        arabicText: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
        translation: 'maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat.',
        tajwidSpots: [
          { startIndex: 35, endIndex: 40, targetText: 'إِنَّهُ', ruleId: 'idgham-bighunnah', ruleName: 'Ghunnah Musyaddadah', explanation: 'Nun bertasydid wajib didengungkan 2 harakat', color: '#d97706' },
          { startIndex: 48, endIndex: 56, targetText: 'تَوَّابًا', ruleId: 'mad-thabii', ruleName: 'Mad ‘Iwadh saat Waqaf', explanation: 'Fathatain di akhir kata saat waqaf diganti menjadi bacaan mad 2 harakat (tawwaabaa)', color: '#e11d48' }
        ]
      }
    ]
  }
];
