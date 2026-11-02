import { ImlaLesson } from '../types';

export interface HijaiyahLetter {
  arabic: string;
  name: string;
  latin: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  canConnectLeft: boolean;
  exampleWord: string;
  exampleMeaning: string;
  strokeHint: string;
}

export const HIJAIYAH_LETTERS: HijaiyahLetter[] = [
  { arabic: 'ا', name: 'Alif', latin: 'a', isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا', canConnectLeft: false, exampleWord: 'أَسَدٌ', exampleMeaning: 'Singa', strokeHint: 'Tarik garis lurus dari atas ke bawah tegak' },
  { arabic: 'ب', name: 'Ba', latin: 'b', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', canConnectLeft: true, exampleWord: 'بَابٌ', exampleMeaning: 'Pintu', strokeHint: 'Mulai dari kanan, bentuk mangkuk melengkung ke kiri, beri 1 titik di bawah' },
  { arabic: 'ت', name: 'Ta', latin: 't', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', canConnectLeft: true, exampleWord: 'تُفَّاحٌ', exampleMeaning: 'Apel', strokeHint: 'Bentuk mangkuk mendatar, beri 2 titik berdampingan di atas' },
  { arabic: 'ث', name: 'Tsa', latin: 'ts', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', canConnectLeft: true, exampleWord: 'ثَوْبٌ', exampleMeaning: 'Baju', strokeHint: 'Bentuk mangkuk mendatar, beri 3 titik segitiga di atas' },
  { arabic: 'ج', name: 'Jim', latin: 'j', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', canConnectLeft: true, exampleWord: 'جَمَلٌ', exampleMeaning: 'Unta', strokeHint: 'Goreskan alis kepala di atas, lalu perut melengkung besar dengan 1 titik di dalam' },
  { arabic: 'ح', name: 'Ha', latin: 'h', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', canConnectLeft: true, exampleWord: 'حِصَانٌ', exampleMeaning: 'Kuda', strokeHint: 'Goreskan alis kepala di atas, perut melengkung besar bersih tanpa titik' },
  { arabic: 'خ', name: 'Kha', latin: 'kh', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', canConnectLeft: true, exampleWord: 'خُبْزٌ', exampleMeaning: 'Roti', strokeHint: 'Goreskan alis kepala, perut melengkung, beri 1 titik di atas kepala' },
  { arabic: 'د', name: 'Dal', latin: 'd', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', canConnectLeft: false, exampleWord: 'دَفْتَرٌ', exampleMeaning: 'Buku Tulis', strokeHint: 'Goreskan sudut lancip melengkung dari atas condong ke kiri garis dasar' },
  { arabic: 'ذ', name: 'Dzal', latin: 'dz', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', canConnectLeft: false, exampleWord: 'ذُرَةٌ', exampleMeaning: 'Jagung', strokeHint: 'Mirip huruf Dal, tambahkan 1 titik di atasnya' },
  { arabic: 'ر', name: 'Ra', latin: 'r', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', canConnectLeft: false, exampleWord: 'رَأْسٌ', exampleMeaning: 'Kepala', strokeHint: 'Goreskan sedikit di atas garis lalu meluncur melengkung ke bawah garis' },
  { arabic: 'ز', name: 'Zai', latin: 'z', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز', canConnectLeft: false, exampleWord: 'زَهْرَةٌ', exampleMeaning: 'Bunga', strokeHint: 'Mirip huruf Ra, luncur melengkung ke bawah garis, beri 1 titik di atas' },
  { arabic: 'س', name: 'Sin', latin: 's', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', canConnectLeft: true, exampleWord: 'سَمَكٌ', exampleMeaning: 'Ikan', strokeHint: 'Buat 3 gigi kecil di atas garis, lalu mangkuk besar di bawah garis' },
  { arabic: 'ش', name: 'Syin', latin: 'sy', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', canConnectLeft: true, exampleWord: 'شَمْسٌ', exampleMeaning: 'Matahari', strokeHint: 'Buat 3 gigi kecil, mangkuk melingkar, beri 3 titik segitiga di atas' },
  { arabic: 'ص', name: 'Shad', latin: 'sh', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', canConnectLeft: true, exampleWord: 'صَابُونٌ', exampleMeaning: 'Sabun', strokeHint: 'Tarik lingkaran lonjong pipih di garis, gigi kecil, lalu mangkuk bawah' },
  { arabic: 'ض', name: 'Dhad', latin: 'dh', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', canConnectLeft: true, exampleWord: 'ضَوْءٌ', exampleMeaning: 'Cahaya', strokeHint: 'Bentuk lonjong seperti Shad dengan 1 titik di atasnya' },
  { arabic: 'ط', name: 'Tha', latin: 'th', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', canConnectLeft: true, exampleWord: 'طَبِيبٌ', exampleMeaning: 'Dokter', strokeHint: 'Bentuk lonjong di garis, lalu pasang tiang tegak lurus di bagian belakangnya' },
  { arabic: 'ظ', name: 'Zha', latin: 'zh', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', canConnectLeft: true, exampleWord: 'ظَرْفٌ', exampleMeaning: 'Amplop', strokeHint: 'Bentuk lonjong bertiang seperti Tha, beri 1 titik di atasnya' },
  { arabic: 'ع', name: '‘Ain', latin: '‘a', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', canConnectLeft: true, exampleWord: 'عَيْنٌ', exampleMeaning: 'Mata', strokeHint: 'Kepala melengkung kecil terbuka ke kanan di atas garis, ekor melengkung besar' },
  { arabic: 'غ', name: 'Ghain', latin: 'gh', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', canConnectLeft: true, exampleWord: 'غَابَةٌ', exampleMeaning: 'Hutan', strokeHint: 'Bentuk seperti ‘Ain dengan 1 titik di atas kepalanya' },
  { arabic: 'ف', name: 'Fa', latin: 'f', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', canConnectLeft: true, exampleWord: 'فَمٌ', exampleMeaning: 'Mulut', strokeHint: 'Bentuk kepala bulat berleher pendek di atas garis, mangkuk mendatar bertitik 1' },
  { arabic: 'ق', name: 'Qaf', latin: 'q', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', canConnectLeft: true, exampleWord: 'قَلَمٌ', exampleMeaning: 'Pena', strokeHint: 'Bentuk kepala bulat di atas garis, mangkuk melengkung turun ke bawah garis bertitik 2' },
  { arabic: 'ك', name: 'Kaf', latin: 'k', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', canConnectLeft: true, exampleWord: 'كِتَابٌ', exampleMeaning: 'Buku', strokeHint: 'Garis tegak berbelok mendatar di garis, di dalamnya ada lambang mini hamzah/kaf kecil' },
  { arabic: 'ل', name: 'Lam', latin: 'l', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', canConnectLeft: true, exampleWord: 'لَبَنٌ', exampleMeaning: 'Susu', strokeHint: 'Tiang tegak panjang lalu melengkung ke bawah garis seperti kail pancing' },
  { arabic: 'م', name: 'Mim', latin: 'm', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', canConnectLeft: true, exampleWord: 'مَسْجِدٌ', exampleMeaning: 'Masjid', strokeHint: 'Bulat kecil melingkar lalu ekor turun tegak ke bawah garis' },
  { arabic: 'ن', name: 'Nun', latin: 'n', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', canConnectLeft: true, exampleWord: 'نَجْمٌ', exampleMeaning: 'Bintang', strokeHint: 'Mangkuk bulat melengkung turun ke bawah garis dengan 1 titik di tengah atas' },
  { arabic: 'و', name: 'Wawu', latin: 'w', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو', canConnectLeft: false, exampleWord: 'وَلَدٌ', exampleMeaning: 'Anak Laki-laki', strokeHint: 'Kepala bulat di atas garis, lalu luncurkan ekor melengkung ke bawah garis' },
  { arabic: 'هـ', name: 'Ha', latin: 'h', isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه', canConnectLeft: true, exampleWord: 'هَدِيَّةٌ', exampleMeaning: 'Hadiah', strokeHint: 'Bentuk lingkaran luar berputar spiral kecil di dalamnya' },
  { arabic: 'ي', name: 'Ya', latin: 'y', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', canConnectLeft: true, exampleWord: 'يَدٌ', exampleMeaning: 'Tangan', strokeHint: 'Bentuk kepala mirip leher bebek berlekuk, ekor melingkar ke bawah garis dengan 2 titik di bawah' }
];

export const IMLA_LESSONS: ImlaLesson[] = [
  {
    id: 'imla-1',
    title: 'Bentuk Huruf Bersambung',
    subtitle: 'Posisi Huruf di Awal, Tengah, dan Akhir Kata',
    gradeLevel: 'Kelas 1-2 MI',
    summary: 'Huruf Arab berubah bentuk tergantung letaknya di awal kata, di tengah kata, atau di akhir kata.',
    ruleFormula: 'Awal (ـ...) + Tengah (...ـ...) + Akhir (...ـ) = Kata Bersambung',
    explanation: [
      'Sebagian besar huruf Arab dipotong bagian perutnya ketika berada di awal atau di tengah kata agar bisa digandeng dengan huruf berikutnya.',
      'Ketika berada di akhir kata atau berdiri sendiri, bentuk huruf kembali utuh seperti aslinya.',
      'Perhatikan bentuk huruf Jim (جـ / ـجـ / ـج) dan Sin (سـ / ـسـ / ـس) saat menyambung.'
    ],
    tips: 'Ingat! Kepala huruf tetap dipertahankan, yang dipotong untuk menyambung hanyalah bagian perut atau ekor melengkungnya.',
    examples: [
      { correct: 'كَتَبَ', incorrect: 'ك ت ب', meaning: 'Dia telah menulis', note: 'Kaf di awal (كـ) menyambung Ta di tengah (ـتـ) menyambung Ba di akhir (ـب)' },
      { correct: 'مَسْجِدٌ', incorrect: 'م س ج د', meaning: 'Masjid', note: 'Mim (مـ) bersambung Sin (ـسـ) bersambung Jim (ـجـ) dan Dal (ـد)' },
      { correct: 'قَلَمٌ', incorrect: 'ق ل م', meaning: 'Pena', note: 'Qaf (قـ) menyambung Lam (ـلـ) menyambung Mim (ـم)' }
    ],
    practiceQuestions: [
      {
        question: 'Bagaimana penulisan yang benar saat huruf ب - ت - ن disambung menjadi satu kata?',
        audioText: 'بَتَنَ',
        options: ['بَتَنَ', 'ب ت ن', 'بـ ت ن', 'بَتـ ن'],
        correctIndex: 0,
        explanation: 'Ketiga huruf tersebut saling menyambung dengan harmonis dari awal hingga akhir kata.'
      },
      {
        question: 'Huruf manakah di bawah ini yang bentuknya berubah menjadi ekor utuh di akhir kata pada lafadz "سَمَكٌ"?',
        audioText: 'سَمَكٌ',
        options: ['Huruf Kaf (ك)', 'Huruf Sin (س)', 'Huruf Mim (م)', 'Huruf Nun (ن)'],
        correctIndex: 0,
        explanation: 'Huruf Kaf (ك) berada di posisi akhir kata, sehingga bentuknya kembali utuh lengkap dengan tanda mini kaf.'
      }
    ]
  },
  {
    id: 'imla-2',
    title: '6 Huruf Pemutus (Huruf Sombong)',
    subtitle: 'Huruf yang Bisa Disambung dari Kanan tapi Tidak Bisa Menyambung ke Kiri',
    gradeLevel: 'Kelas 2-3 MI',
    summary: 'Ada 6 huruf dalam bahasa Arab yang tidak boleh digandeng dengan huruf setelahnya.',
    ruleFormula: 'أ - د - ذ - ر - ز - و (Hanya menerima gandengan dari kanan)',
    explanation: [
      'Keenam huruf ini dijuluki huruf pemutus (al-huruf al-munfashilah): Alif (أ), Dal (د), Dzal (ذ), Ra (ر), Zai (ز), dan Wawu (و).',
      'Huruf-huruf ini senang disambung oleh huruf sebelumnya (dari sebelah kanan).',
      'Namun, mereka TIDAK BOLEH disambung dengan huruf yang datang sesudahnya (ke sebelah kiri). Huruf sesudahnya harus ditulis dalam bentuk awal/mandiri.'
    ],
    tips: 'Rumus cepat santri MI: "A-Da-Dza-Ro-Za-Wa". Setelah melewati 6 huruf ini, lepaskan pena sejenak!',
    examples: [
      { correct: 'وَلَدٌ', incorrect: 'وـلـد', meaning: 'Anak laki-laki', note: 'Wawu (و) tidak menyambung ke Lam (ل)' },
      { correct: 'بَابٌ', incorrect: 'بـاـب', meaning: 'Pintu', note: 'Alif (ا) disambung oleh Ba, tetapi Alif tidak menyambung ke Ba berikutnya' },
      { correct: 'دَرْسٌ', incorrect: 'دـرـس', meaning: 'Pelajaran', note: 'Dal dan Ra sama-sama huruf pemutus' }
    ],
    practiceQuestions: [
      {
        question: 'Manakah tulisan kata "Kuda" (Hishan) yang benar menurut kaidah Imla\'?',
        audioText: 'حِصَانٌ',
        options: ['حِصَانٌ', 'حِصَانـٌ', 'حِ صَ ا ن', 'حـِصَـاـن'],
        correctIndex: 0,
        explanation: 'Setelah huruf Alif (ا), huruf Nun (ن) tidak boleh disambung karena Alif adalah huruf pemutus.'
      },
      {
        question: 'Di antara huruf berikut, manakah yang TIDAK BISA menyambung ke huruf sesudahnya?',
        audioText: 'ر',
        options: ['Ra (ر)', 'Ba (ب)', 'Jim (ج)', 'Kaf (ك)'],
        correctIndex: 0,
        explanation: 'Ra (ر) adalah salah satu dari 6 huruf pemutus (أ د ذ ر ز و).'
      }
    ]
  },
  {
    id: 'imla-3',
    title: 'Ta Marbuthah (ة) vs Ta Maftuhah (ت)',
    subtitle: 'Kaidah Membedakan Penulisan Huruf Ta Terikat dan Ta Terbuka',
    gradeLevel: 'Kelas 3-4 MI',
    summary: 'Membedakan kapan menulis Ta bulat bertitik dua (ة) dan kapan menulis Ta perahu terbuka (ت).',
    ruleFormula: 'Jika diwaqaf berbunyi "H" -> Tulis ة (Marbuthah). Jika diwaqaf tetap "T" -> Tulis ت (Maftuhah).',
    explanation: [
      'Ta Marbuthah (ة / ـة): Biasanya terdapat di akhir kata benda/sifat muannats (perempuan). Cara mengetesnya: bila dimatikan/diwaqafkan, bunyinya berubah menjadi suara Ha (H). Contoh: مَدْرَسَة (Madrasah).',
      'Ta Maftuhah / Mabsuthah (ت): Terdapat pada kata kerja, jamak muannats salim, atau kata dasar asli. Bila dimatikan/diwaqafkan, bunyinya TETAP bersuara "T". Contoh: بَيْت (Bait), كَتَبْتُ (Katabtu).'
    ],
    tips: 'Tes dengan sukun: Ucapkan kata tersebut tanpa harakat akhir. Jika terdengar "AH/EH", pastikan tulis Ta Marbuthah (ة)!',
    examples: [
      { correct: 'مَدْرَسَةٌ', incorrect: 'مَدْرَسَتٌ', meaning: 'Sekolah', note: 'Saat diwaqaf dibaca "Madrasah" (bunyi H) -> pakai ة' },
      { correct: 'بَيْتٌ', incorrect: 'بَيْةٌ', meaning: 'Rumah', note: 'Saat diwaqaf dibaca "Bait" (bunyi T) -> pakai ت' },
      { correct: 'سَاعَةٌ', incorrect: 'سَاعَتٌ', meaning: 'Jam dinding', note: 'Saat diwaqaf dibaca "Saa\'ah" -> pakai ة' },
      { correct: 'مُعَلِّمَاتٌ', incorrect: 'مُعَلِّمَاةٌ', meaning: 'Guru-guru perempuan', note: 'Jamak Muannats Salim selalu diakhiri Ta Maftuhah (ت)' }
    ],
    practiceQuestions: [
      {
        question: 'Bagaimana penulisan kata "Mobil" (Sayyarah) yang tepat?',
        audioText: 'سَيَّارَةٌ',
        options: ['سَيَّارَةٌ', 'سَيَّارَتٌ', 'سَيَّارَه', 'سَيَّارَات'],
        correctIndex: 0,
        explanation: 'Karena ketika diwaqaf berbunyi "Sayyarah" (suara H), maka wajib ditulis dengan Ta Marbuthah berharakat tanwin (ةٌ).'
      },
      {
        question: 'Kata "بِنْتٌ" (anak perempuan) ditulis menggunakan Ta Maftuhah (ت) karena...',
        audioText: 'بِنْتٌ',
        options: [
          'Saat disukun/diwaqafkan tetap berbunyi suara "T" (Bint)',
          'Hurufnya ada tiga',
          'Karena bermakna muannats',
          'Bebas boleh apa saja'
        ],
        correctIndex: 0,
        explanation: 'Huruf Ta pada bint adalah huruf asli kata yang tetap berbunyi T saat dimatikan/diwaqafkan.'
      }
    ]
  },
  {
    id: 'imla-4',
    title: 'Penulisan Tanwin vs Huruf Nun',
    subtitle: 'Jangan Menulis Huruf Nun Mati untuk Suara Tanwin!',
    gradeLevel: 'Kelas 3-4 MI',
    summary: 'Kesalahan paling sering murid MI adalah menulis tanwin (ـً ـٍ ـٌ) dengan huruf nun sukun (نْ).',
    ruleFormula: 'Tanwin = Baris Ganda (ـً ـٍ ـٌ), BUKAN huruf Nun (نْ)',
    explanation: [
      'Tanwin adalah bunyi "an", "in", atau "un" yang terdengar di telinga seperti huruf nun, tetapi BUKAN huruf nun asli.',
      'Dalam kaidah Imla\', tanwin hanya ditulis dengan lambang harakat dua (Fathatain, Kasratain, Dhammatain).',
      'Pada Fathatain (ـً), umumnya ditambahkan huruf Alif penopang di akhirnya (misal: كِتَابًا), KECUALI jika diakhiri Ta Marbuthah (مَدْرَسَةً) atau hamzah tertentu.'
    ],
    tips: 'Cara menguji: Buang bunyi "N"-nya. Jika kata tersebut masih memiliki arti utuh (misal: "Kitab-un" -> "Kitab"), maka itu pasti TANWIN, bukan huruf Nun!',
    examples: [
      { correct: 'كِتَابٌ', incorrect: 'كِتَابُنْ', meaning: 'Sebuah buku', note: 'Dhammatain, jangan tulis huruf Nun!' },
      { correct: 'مَسْجِدًا', incorrect: 'مَسْجِدَنْ', meaning: 'Sebuah masjid (Nashab)', note: 'Fathatain dengan alif penopang' },
      { correct: 'حَدِيقَةً', incorrect: 'حَدِيقَتَنْ', meaning: 'Sebuah kebun', note: 'Ta marbuthah tidak perlu alif tambahan saat fathatain' }
    ],
    practiceQuestions: [
      {
        question: 'Manakah penulisan kata "Qolamun" (sebuah pena) yang benar menurut kaidah Imla\'?',
        audioText: 'قَلَمٌ',
        options: ['قَلَمٌ', 'قَلَمُنْ', 'قَلَمْنَ', 'قَلَمُ ن'],
        correctIndex: 0,
        explanation: 'Bunyi "un" adalah tanwin (Dhammatain), haram ditulis menggunakan huruf nun sukun pada kata isim tunggal bertanwin.'
      },
      {
        question: 'Kata "مَاءً" (air bertanwin fathah) ditulis tanpa alif penopang tambahan karena...',
        audioText: 'مَاءً',
        options: [
          'Hamzah berada setelah alif madd (tidak boleh diapit 2 alif)',
          'Kata tersebut kata asing',
          'Karena berharakat kasrah',
          'Bebas boleh ditambahi alif'
        ],
        correctIndex: 0,
        explanation: 'Hamzah mutatharrifah yang didahului alif tidak boleh diberi alif lagi setelahnya.'
      }
    ]
  },
  {
    id: 'imla-5',
    title: 'Alif Lam Syamsiyah & Qamariyah dalam Imla\'',
    subtitle: 'Kaidah Menuliskan Kata yang Dimasuki "Al-" (ال)',
    gradeLevel: 'Kelas 4-5 MI',
    summary: 'Meskipun huruf Lam pada Al-Syamsiyah tidak dibaca, huruf Lam TETAP WAJIB DITULIS dalam Imla\'.',
    ruleFormula: 'Alif Lam SELALU DITULIS (ال), beri Tasydid pada huruf Syamsiyah sesudahnya',
    explanation: [
      'Al-Qamariyah: Huruf Lam diberi sukun dan dibaca jelas. Contoh: الْقَمَرُ (Al-Qamaru). Ditulis dan dibaca.',
      'Al-Syamsiyah: Huruf Lam melebur (di-idgham-kan) ke huruf sesudahnya, sehingga huruf sesudahnya diberi tasydid/syaddah. Contoh: الشَّمْسُ (Asy-Syamsu).',
      'Ingat kaidah emas Imla\': Walaupun huruf Lam tidak terdengar bunyinya pada Al-Syamsiyah (terdengar langsung "Asy-syamsu", "Ar-rajulu"), huruf Lam (ل) TETAP WAJIB DITULIS!'
    ],
    tips: 'Jangan menulis "اَشَّمْسُ" tanpa huruf Lam! Ejaan yang benar adalah "الشَّمْسُ".',
    examples: [
      { correct: 'الشَّمْسُ', incorrect: 'اَشَّمْسُ', meaning: 'Matahari', note: 'Lam Syamsiyah tetap ditulis meski bunyinya lebur' },
      { correct: 'الرَّجُلُ', incorrect: 'اَرَّجُلُ', meaning: 'Laki-laki itu', note: 'Huruf Lam tetap wajib hadir dalam ejaan Imla\'' },
      { correct: 'الْقَمَرُ', incorrect: 'قَمَرُ', meaning: 'Bulan', note: 'Al-Qamariyah bertanda sukun di atas Lam' }
    ],
    practiceQuestions: [
      {
        question: 'Bagaimana penulisan kata "At-Tilmidzu" (Murid itu) dalam Imla\' yang benar?',
        audioText: 'التِّلْمِيذُ',
        options: ['التِّلْمِيذُ', 'اَتِّلْمِيذُ', 'تِّلْمِيذُ', 'الْ تِلْمِيذُ'],
        correctIndex: 0,
        explanation: 'Huruf Ta adalah huruf Syamsiyah. Huruf Lam tetap ditulis utuh bersambung lalu huruf Ta diberi tasydid.'
      }
    ]
  },
  {
    id: 'imla-6',
    title: 'Alif Layyinah & Maqshurah (ى vs ا)',
    subtitle: 'Menuliskan Huruf Alif Lembut di Ujung Kata',
    gradeLevel: 'Kelas 5-6 MI',
    summary: 'Membedakan kapan alif di akhir kata ditulis tegak lurus (ا) dan kapan ditulis berbentuk ya tanpa titik (ى).',
    ruleFormula: 'Alif Mamdudah (ا) vs Alif Maqshurah (ى)',
    explanation: [
      'Alif Layyinah adalah alif mati di akhir kata yang didahului huruf berharakat fathah.',
      'Bentuk Tegak (ا): Pada huruf-huruf tertentu (seperti: لَا, مَا, إِذَا) dan isim/fi\'il yang asalnya berhuruf Wawu (misal: عَصَا dari \'ashawa, دَعَا dari da\'awa).',
      'Bentuk Ya Tanpa Titik / Maqshurah (ى): Pada 4 huruf jar utama: عَلَى, إِلَى, حَتَّى, بَلَى, serta isim/fi\'il yang asalnya huruf Ya (misal: هُدَى, مُوسَى, رَمَى).'
    ],
    tips: 'Hafalkan 4 kata populer huruf jar yang berujung (ى): عَلَى (di atas), إِلَى (ke/kepada), حَتَّى (hingga), بَلَى (tentu saja)!',
    examples: [
      { correct: 'عَلَى', incorrect: 'عَلَا', meaning: 'Di atas (huruf jar)', note: 'Bentuk Alif Maqshurah (ى)' },
      { correct: 'إِلَى', incorrect: 'إِلَا', meaning: 'Ke / kepada (huruf jar)', note: 'Bentuk Alif Maqshurah (ى)' },
      { correct: 'دَعَا', incorrect: 'دَعَى', meaning: 'Dia berdoa', note: 'Asal katanya berhuruf Wawu (yad\'uu), maka ditulis alif tegak' }
    ],
    practiceQuestions: [
      {
        question: 'Manakah tulisan kata sambung "Ke / Kepada" yang tepat dalam kaidah Imla\'?',
        audioText: 'إِلَى',
        options: ['إِلَى', 'إِلَا', 'إِلِي', 'اِلَى'],
        correctIndex: 0,
        explanation: 'Kata إِلَى diakhiri dengan Alif Maqshurah (huruf Ya tanpa titik) yang berbunyi vokal panjang "aa".'
      }
    ]
  }
];
