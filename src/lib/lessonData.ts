// Uzbek Financial Literacy Lessons - Based on Official Curriculum
// O'zbekiston Respublikasi Markaziy banki - Moliyaviy savodxonlik to'garagi
// Extended with 5-7 quiz questions per lesson for comprehensive learning

export interface LessonData {
  id: string;
  moduleId: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  estimatedTime: number;
  title: string;
  description: string;
  content: string[];
  keyPoints: string[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const LESSON_MODULES = {
  basics: {
    id: "basics",
    title: "Pul asoslari",
    icon: "💵",
    color: "emerald",
    description: "Pulning tarixi va mohiyati"
  },
  payments: {
    id: "payments",
    title: "To'lov usullari",
    icon: "💳",
    color: "blue",
    description: "Zamonaviy to'lov tizimlari"
  },
  budgeting: {
    id: "budgeting",
    title: "Byudjet tuzish",
    icon: "📊",
    color: "amber",
    description: "Shaxsiy moliyani boshqarish"
  },
  banking: {
    id: "banking",
    title: "Bank xizmatlari",
    icon: "🏦",
    color: "purple",
    description: "Bank tizimlari va xizmatlari"
  },
  advanced: {
    id: "advanced",
    title: "Ilg'or mavzular",
    icon: "🎓",
    color: "rose",
    description: "Investitsiya va xavfsizlik"
  }
};

export const LESSONS: LessonData[] = [
  // ========== MODULE 1: PUL ASOSLARI (2 lessons) ==========
  {
    id: "lesson_pul",
    moduleId: "basics",
    icon: "💵",
    difficulty: "beginner",
    xpReward: 50,
    estimatedTime: 5,
    title: "Pul nima?",
    description: "Pulning tarixi va rivojlanish bosqichlari",
    content: [
      "Pul barcha tovar va xizmatlarni ayirboshlash mumkin bo'lgan maxsus tovardir.",
      "Pul faqatgina to'lov qilish, sarflash uchun emas, balki jamg'arish uchun ham ishlatiladi.",
      "Soxta pullarni haqiqiysidan ajratish uchun maxsus belgilar bor.",
      "Pullarni soxtalashtirish va soxta pullardan foydalanish noqonuniy hisoblanadi.",
      "O'zbekiston Respublikasi Markaziy banki tomonidan pul muomalaga chiqariladi.",
      "Pulning uch asosiy vazifasi bor: ayirboshlash vositasi, qiymatni o'lchash, va qiymatni saqlash.",
      "Pul tarixda toshlardan boshlab, tangalarga, so'ng qog'oz pullarga rivojlandi."
    ],
    keyPoints: [
      "Ayirboshlash vositasi",
      "Qiymatni saqlash",
      "Markaziy bank chiqaradi"
    ],
    quiz: [
      {
        id: "q1",
        question: "Pulning asosiy vazifasi nima?",
        options: [
          "Chiroyli ko'rinish",
          "Ayirboshlash vositasi",
          "Yig'ish uchun",
          "Bezak"
        ],
        correctIndex: 1,
        explanation: "Pul barcha tovar va xizmatlarni ayirboshlash mumkin bo'lgan maxsus tovardir."
      },
      {
        id: "q2",
        question: "O'zbekistonda pulni kim muomalaga chiqaradi?",
        options: [
          "Moliya vazirligi",
          "Markaziy bank",
          "Tijorat banklari",
          "Hukumat"
        ],
        correctIndex: 1,
        explanation: "O'zbekiston Respublikasi Markaziy banki tomonidan pul muomalaga chiqariladi."
      },
      {
        id: "q3",
        question: "Soxta pullardan foydalanish qanday hisoblanadi?",
        options: [
          "Oddiy xato",
          "Ruxsat etilgan",
          "Noqonuniy",
          "Kerak bo'lganda mumkin"
        ],
        correctIndex: 2,
        explanation: "Pullarni soxtalashtirish va soxta pullardan foydalanish noqonuniy hisoblanadi."
      },
      {
        id: "q4",
        question: "Pulning nechta asosiy vazifasi bor?",
        options: [
          "1 ta",
          "2 ta",
          "3 ta",
          "5 ta"
        ],
        correctIndex: 2,
        explanation: "Pulning uchta asosiy vazifasi bor: ayirboshlash vositasi, qiymatni o'lchash va qiymatni saqlash."
      },
      {
        id: "q5",
        question: "Qadimda pul o'rnida nima ishlatilgan?",
        options: [
          "Faqat oltin",
          "Turli tovarlar va toshlar",
          "Qog'oz",
          "Plastik kartalar"
        ],
        correctIndex: 1,
        explanation: "Pul tarixda toshlardan boshlab, turli tovarlarga, keyin tangalarga rivojlandi."
      },
      {
        id: "q6",
        question: "Pulning qiymatni saqlash vazifasi nimani anglatadi?",
        options: [
          "Pulni yig'ib qo'yish",
          "Kelajakda ishlatish uchun boylikni saqlash",
          "Pulni bezash",
          "Pulni do'stlarga berish"
        ],
        correctIndex: 1,
        explanation: "Qiymatni saqlash - bu pulni kelajakda ishlatish uchun boylik sifatida saqlash imkoniyatidir."
      }
    ]
  },
  {
    id: "lesson_pul_turlari",
    moduleId: "basics",
    icon: "💴",
    difficulty: "beginner",
    xpReward: 50,
    estimatedTime: 6,
    title: "Naqd va elektron pullar",
    description: "Pul turlarini farqlash va ulardan to'g'ri foydalanish",
    content: [
      "Naqd pullar - tangalar va qog'oz pullar, qo'lda ushlab turiladigan pullar.",
      "Naqdsiz pullar - bank hisoblarida va kartalarida mavjud bo'lgan pullar.",
      "Elektron pullar - elektron hamyonlar va raqamli to'lovlar.",
      "Naqd, naqdsiz va elektron pullarning barchasi ehtiyotkorlik bilan ishlatilishini talab etadi.",
      "Naqdsiz va elektron pullarni ishlatganda xavfsizlik qoidalariga e'tiborli bo'lish kerak!",
      "Kriptovalyutalar ham elektron pulning bir turi hisoblanadi.",
      "Har bir to'lov usulining o'z afzalliklari va kamchiliklari bor."
    ],
    keyPoints: [
      "Naqd - tangalar va banknotlar",
      "Naqdsiz - bank kartasida",
      "Elektron - mobil ilovada"
    ],
    quiz: [
      {
        id: "q1",
        question: "Naqd pul to'lashning afzalligi nima?",
        options: [
          "Internet talab qiladi",
          "Texnik qurilma kerak emas",
          "Doimo kuzatiladi",
          "Yo'qolmaydi"
        ],
        correctIndex: 1,
        explanation: "Naqd pulda to'lash hech qanday texnik qurilmalar, mobil yoki internet aloqasini talab qilmaydi."
      },
      {
        id: "q2",
        question: "Elektron pulga misol qaysi?",
        options: [
          "Oltin tangalar",
          "Qog'oz banknotlar",
          "Elektron hamyon balansi",
          "Cheklar"
        ],
        correctIndex: 2,
        explanation: "Elektron pullar elektron hamyonlarda va raqamli to'lovlarda mavjud."
      },
      {
        id: "q3",
        question: "Bank kartasidagi pullar qaysi turga kiradi?",
        options: [
          "Naqd pul",
          "Naqdsiz pul",
          "Tovar pul",
          "Oltin"
        ],
        correctIndex: 1,
        explanation: "Bank kartasidagi pullar naqdsiz pul hisoblanadi."
      },
      {
        id: "q4",
        question: "Naqdsiz pulning afzalligi nima?",
        options: [
          "Osonlik bilan o'g'irlanishi mumkin",
          "Katta summalarni qulay tashish",
          "Internet kerak emas",
          "Hech qanday xavfi yo'q"
        ],
        correctIndex: 1,
        explanation: "Naqdsiz pul bilan katta summalarni jismonan tashimasdan qulay almashish mumkin."
      },
      {
        id: "q5",
        question: "Elektron pulni qayerda saqlash mumkin?",
        options: [
          "Sandiqda",
          "Cho'ntakda",
          "Mobil ilova yoki elektron hamyonda",
          "Kitobda"
        ],
        correctIndex: 2,
        explanation: "Elektron pullar mobil ilovalar va elektron hamyonlarda saqlanadi."
      },
      {
        id: "q6",
        question: "Qaysi to'lov usuli eng xavfsiz?",
        options: [
          "Faqat naqd pul",
          "Faqat karta",
          "Ehtiyotkorlik bilan barcha usullar",
          "Hech biri"
        ],
        correctIndex: 2,
        explanation: "Har qanday to'lov usuli xavfsiz bo'lishi uchun ehtiyotkorlik talab etiladi."
      },
      {
        id: "q7",
        question: "Kriptovalyuta qanday pul turiga kiradi?",
        options: [
          "Naqd pul",
          "Elektron pul",
          "Qog'oz pul",
          "Oltin"
        ],
        correctIndex: 1,
        explanation: "Kriptovalyutalar elektron yoki raqamli pul turiga kiradi."
      }
    ]
  },

  // ========== MODULE 2: TO'LOV USULLARI (3 lessons) ==========
  {
    id: "lesson_bank_kartalari",
    moduleId: "payments",
    icon: "💳",
    difficulty: "beginner",
    xpReward: 60,
    estimatedTime: 8,
    title: "Bank kartalari",
    description: "Debet, kredit va virtual kartalar haqida",
    content: [
      "Debet karta - mijozga tegishli pullar saqlanib, onlayn va oflayn to'lovlarni amalga oshirish mumkin.",
      "Kredit karta - bank krediti mablag'lari hisobidan sarflanadigan pullar saqlanadi.",
      "Virtual karta - faqatgina elektron qurilmalarda ochiladigan karta, faqat onlayn to'lovlar uchun.",
      "Xalqaro kartalar - xorijda va internetda to'lovlarni amalga oshirish mumkin.",
      "Bolalar bank kartasi 10 yoshdan katta bolalar uchun ochiladi.",
      "Karta ma'lumotlarini (raqam, muddat, CVV) hech kimga bermang!",
      "O'zbekistonda eng mashhur karta tizimlari: UZCARD, HUMO, Visa, MasterCard."
    ],
    keyPoints: [
      "Debet = o'z pulingiz",
      "Kredit = bank puli",
      "PIN kod - maxfiy"
    ],
    quiz: [
      {
        id: "q1",
        question: "Debet karta qanday pul ishlatadi?",
        options: [
          "Bank krediti",
          "O'z pulingiz",
          "Qarz puli",
          "Hukumat puli"
        ],
        correctIndex: 1,
        explanation: "Debet kartada mijozga tegishli bo'lgan pullar saqlanadi."
      },
      {
        id: "q2",
        question: "Bolalar bank kartasi necha yoshdan ochiladi?",
        options: [
          "5 yosh",
          "10 yosh",
          "16 yosh",
          "18 yosh"
        ],
        correctIndex: 1,
        explanation: "Aksariyat banklarda bolalar bank kartasi 10 yoshdan katta bolalar uchun ochiladi."
      },
      {
        id: "q3",
        question: "Virtual karta qayerda ishlatiladi?",
        options: [
          "Do'konda",
          "Bankomatda",
          "Faqat onlayn",
          "Bozorda"
        ],
        correctIndex: 2,
        explanation: "Virtual karta faqatgina onlayn to'lovlarni amalga oshirish uchun ishlatiladi."
      },
      {
        id: "q4",
        question: "Kredit karta nima?",
        options: [
          "O'z pulingiz bilan to'lov",
          "Bank qarzidan foydalanish",
          "Sovg'a kartasi",
          "Chegirma kartasi"
        ],
        correctIndex: 1,
        explanation: "Kredit kartada bank bergan qarz mablag'lari bilan to'lov qilinadi."
      },
      {
        id: "q5",
        question: "CVV kod nima?",
        options: [
          "Kartaning raqami",
          "Kartaning orqa tarafidagi 3 raqamli xavfsizlik kodi",
          "PIN kod",
          "Telefon raqami"
        ],
        correctIndex: 1,
        explanation: "CVV - kartaning orqa tarafidagi 3 raqamli xavfsizlik kodi."
      },
      {
        id: "q6",
        question: "O'zbekistonda qaysi mahalliy karta tizimlari bor?",
        options: [
          "Faqat Visa",
          "UZCARD va HUMO",
          "Faqat MasterCard",
          "Hech qanday"
        ],
        correctIndex: 1,
        explanation: "O'zbekistonda UZCARD va HUMO mahalliy karta tizimlari faoliyat ko'rsatadi."
      },
      {
        id: "q7",
        question: "Karta ma'lumotlarini kimga berish mumkin?",
        options: [
          "Do'stlarga",
          "Oila a'zolariga",
          "Hech kimga",
          "Bank xodimlariga telefonda"
        ],
        correctIndex: 2,
        explanation: "Karta ma'lumotlari (raqam, muddat, CVV) shaxsiy bo'lib, hech kimga berilmasligi kerak."
      }
    ]
  },
  {
    id: "lesson_bankomat",
    moduleId: "payments",
    icon: "🏧",
    difficulty: "beginner",
    xpReward: 50,
    estimatedTime: 5,
    title: "Bankomat va POS-terminal",
    description: "Bankomat, infokiosk va terminallardan xavfsiz foydalanish",
    content: [
      "Bankomat - naqd pul olish va qo'yish imkonini beradi.",
      "Infokiosk - to'lovlar va ma'lumot olish uchun.",
      "POS-terminal - do'konlarda karta to'lovlarini qabul qiladi.",
      "PIN kodni kiritayotganda qo'l bilan yashirib kiriting.",
      "Shubhali qurilmalar ulangan bankomatlardan foydalanmang.",
      "Har doim chekni oling va saqlang.",
      "NFC - kontaktsiz to'lov texnologiyasi."
    ],
    keyPoints: [
      "PIN ni yashiring",
      "Shubhali bankomatdan foydalanmang",
      "Chekni saqlang"
    ],
    quiz: [
      {
        id: "q1",
        question: "Bankomatda PIN kodni kiritayotganda nima qilish kerak?",
        options: [
          "Baland ovozda aytish",
          "Qo'l bilan yashirish",
          "Do'stga ko'rsatish",
          "Yozib qo'yish"
        ],
        correctIndex: 1,
        explanation: "Bankomatga PIN-kodni kiritishda qo'l bilan yashirib kiritish lozim."
      },
      {
        id: "q2",
        question: "Infokiosk qanday xizmat ko'rsatadi?",
        options: [
          "Faqat pul olish",
          "To'lovlar va ma'lumot olish",
          "Faqat pul almashish",
          "Ovqat sotish"
        ],
        correctIndex: 1,
        explanation: "Infokiosk to'lovlar amalga oshirish va ma'lumot olish uchun ishlatiladi."
      },
      {
        id: "q3",
        question: "POS-terminal qayerda ishlatiladi?",
        options: [
          "Bankda",
          "Do'konlarda",
          "Uyda",
          "Ko'chada"
        ],
        correctIndex: 1,
        explanation: "POS-terminal do'konlarda karta to'lovlarini qabul qilish uchun ishlatiladi."
      },
      {
        id: "q4",
        question: "Shubhali bankomatni qanday aniqlash mumkin?",
        options: [
          "Chiroyli bo'lsa",
          "Qo'shimcha qurilmalar ulangan bo'lsa",
          "Ko'p odam bo'lsa",
          "Bank oldida tursa"
        ],
        correctIndex: 1,
        explanation: "Shubhali qurilmalar (skimmerlar) ulangan bankomatlardan foydalanish xavfli."
      },
      {
        id: "q5",
        question: "NFC texnologiyasi nima?",
        options: [
          "Internet xizmati",
          "Kontaktsiz to'lov",
          "Telefon markasi",
          "Bank nomi"
        ],
        correctIndex: 1,
        explanation: "NFC - Near Field Communication, kontaktsiz to'lov texnologiyasi."
      },
      {
        id: "q6",
        question: "Nima uchun chekni saqlash kerak?",
        options: [
          "Bezak uchun",
          "Tranzaktsiyani tasdiqlash uchun",
          "Do'stlarga ko'rsatish uchun",
          "Kerak emas"
        ],
        correctIndex: 1,
        explanation: "Chek - to'lov amalga oshirilganligining dalili, masala bo'lganda kerak bo'ladi."
      }
    ]
  },
  {
    id: "lesson_mobil_tolov",
    moduleId: "payments",
    icon: "📱",
    difficulty: "intermediate",
    xpReward: 65,
    estimatedTime: 7,
    title: "Mobil to'lovlar",
    description: "Mobil ilova va elektron hamyonlar orqali to'lov",
    content: [
      "Mobil bank ilovalari orqali pul o'tkazish qulay va tez.",
      "Elektron hamyonlar: Click, Payme, Uzum Bank va boshqalar.",
      "QR-kod orqali to'lov - tez va xavfsiz usul.",
      "Mobil ilovalarni faqat rasmiy manbalardan yuklab oling.",
      "Ikki bosqichli autentifikatsiya xavfsizlikni oshiradi.",
      "Shubhali havolalarga kirmaslik va SMS kodlarni hech kimga bermang.",
      "Mobil to'lovlar 24/7 ishlaydi."
    ],
    keyPoints: [
      "Rasmiy ilovalar",
      "QR-kod qulay",
      "SMS kodlar maxfiy"
    ],
    quiz: [
      {
        id: "q1",
        question: "Mobil bank ilovasini qayerdan yuklash kerak?",
        options: [
          "Har qanday saytdan",
          "Do'stdan olish",
          "Rasmiy manbalardan (App Store, Play Market)",
          "SMS orqali"
        ],
        correctIndex: 2,
        explanation: "Xavfsizlik uchun ilovalarni faqat rasmiy do'konlardan yuklash kerak."
      },
      {
        id: "q2",
        question: "O'zbekistonda qaysi elektron hamyonlar mashhur?",
        options: [
          "PayPal va Apple Pay",
          "Click, Payme, Uzum",
          "WeChat va Alipay",
          "Venmo va Cash App"
        ],
        correctIndex: 1,
        explanation: "O'zbekistonda Click, Payme, Uzum Bank va boshqa mahalliy ilovalar mashhur."
      },
      {
        id: "q3",
        question: "QR-kod bilan to'lov qanday amalga oshiriladi?",
        options: [
          "Kodni qo'lda kiritish",
          "Telefonning kamerasi bilan skanerlash",
          "Bankka borish",
          "SMS yuborish"
        ],
        correctIndex: 1,
        explanation: "QR-kod telefon kamerasi bilan skaner qilib, to'lovni amalga oshirish mumkin."
      },
      {
        id: "q4",
        question: "Ikki bosqichli autentifikatsiya nima?",
        options: [
          "Ikki marta to'lash",
          "Parol + SMS kod bilan kirish",
          "Ikki karta ishlatish",
          "Ikki bank hisobi"
        ],
        correctIndex: 1,
        explanation: "Ikki bosqichli autentifikatsiya - parol va SMS kod yordamida xavfsiz kirish."
      },
      {
        id: "q5",
        question: "SMS kod kelganda nima qilish kerak?",
        options: [
          "Do'stlarga yuborish",
          "Faqat o'zingiz ishlatish",
          "Internetda e'lon qilish",
          "Yozib qo'yish"
        ],
        correctIndex: 1,
        explanation: "SMS kodlar shaxsiy bo'lib, hech kimga berilmasligi kerak."
      },
      {
        id: "q6",
        question: "Mobil to'lovlarning afzalligi nima?",
        options: [
          "Qimmat",
          "24/7 ishlaydi",
          "Faqat kunduzi ishlaydi",
          "Bankka borish kerak"
        ],
        correctIndex: 1,
        explanation: "Mobil to'lovlar kechayu kunduz, istagan vaqtda ishlaydi."
      },
      {
        id: "q7",
        question: "Shubhali havola kelganda nima qilish kerak?",
        options: [
          "Darhol bosish",
          "Do'stlarga yuborish",
          "Bosmaslik va o'chirish",
          "Ma'lumotlarni kiritish"
        ],
        correctIndex: 2,
        explanation: "Shubhali havolalarga kirmaslik va ularni o'chirish kerak."
      }
    ]
  },

  // ========== MODULE 3: BYUDJET TUZISH (3 lessons) ==========
  {
    id: "lesson_byudjet_asoslari",
    moduleId: "budgeting",
    icon: "📊",
    difficulty: "beginner",
    xpReward: 55,
    estimatedTime: 6,
    title: "Byudjet asoslari",
    description: "Shaxsiy byudjet tuzishni o'rganish",
    content: [
      "Byudjet - daromad va xarajatlarni hisobga olish va rejalashtirish.",
      "50/30/20 qoidasi: 50% zaruriy, 30% xohish, 20% tejash.",
      "Har bir xarajatni yozib boring.",
      "Oylik daromad va xarajatlarni taqqoslang.",
      "Kutilmagan xarajatlar uchun zaxira fond tuzing.",
      "Byudjet sizga pul ustidan nazorat beradi.",
      "Muntazam byudjet kuzatish moliyaviy muvaffaqiyat kalitidir."
    ],
    keyPoints: [
      "Daromad - xarajat = tejash",
      "50/30/20 qoidasi",
      "Har kuni yozib boring"
    ],
    quiz: [
      {
        id: "q1",
        question: "Byudjet nima?",
        options: [
          "Bank hisob raqami",
          "Daromad va xarajatlarni rejalashtirish",
          "Kredit olish",
          "Pul yig'ish"
        ],
        correctIndex: 1,
        explanation: "Byudjet - daromad va xarajatlarni hisobga olish va rejalashtirishdir."
      },
      {
        id: "q2",
        question: "50/30/20 qoidasida 20% nimaga sarflanadi?",
        options: [
          "Ovqatga",
          "Ko'ngil ochishga",
          "Tejash va investitsiyaga",
          "Transportga"
        ],
        correctIndex: 2,
        explanation: "50/30/20 qoidasida 20% tejash va investitsiyaga ajratiladi."
      },
      {
        id: "q3",
        question: "Xarajatlarni yozib borish nima uchun kerak?",
        options: [
          "Vaqt o'tkazish uchun",
          "Pul oqimini nazorat qilish",
          "Do'stlarga ko'rsatish",
          "Kerak emas"
        ],
        correctIndex: 1,
        explanation: "Xarajatlarni yozib borish pulingizni qayerga sarflayotganingizni ko'rsatadi."
      },
      {
        id: "q4",
        question: "Zaxira fond nima uchun kerak?",
        options: [
          "Sayohat uchun",
          "Kutilmagan xarajatlar uchun",
          "Sovg'alar uchun",
          "Kiyim uchun"
        ],
        correctIndex: 1,
        explanation: "Zaxira fond kutilmagan xarajatlar (kasallik, ta'mir) uchun tayyor bo'lishga yordam beradi."
      },
      {
        id: "q5",
        question: "Byudjet tuzishning asosiy maqsadi nima?",
        options: [
          "Pulni tezroq sarflash",
          "Pul ustidan nazorat qilish",
          "Qarz olish",
          "Boshqalardan yaxshiroq yashash"
        ],
        correctIndex: 1,
        explanation: "Byudjet sizga pul ustidan to'liq nazorat beradi."
      },
      {
        id: "q6",
        question: "50/30/20 qoidasida 50% nimaga sarflanadi?",
        options: [
          "Ko'ngil ochishga",
          "Zaruriy ehtiyojlarga (uy, ovqat, transport)",
          "Tejashga",
          "Qarz to'lashga"
        ],
        correctIndex: 1,
        explanation: "50% zaruriy ehtiyojlarga - uy-joy, oziq-ovqat, transport sarflanadi."
      }
    ]
  },
  {
    id: "lesson_daromad_xarajat",
    moduleId: "budgeting",
    icon: "💹",
    difficulty: "intermediate",
    xpReward: 65,
    estimatedTime: 8,
    title: "Daromad va xarajatlar",
    description: "Pul oqimini to'g'ri boshqarish",
    content: [
      "Daromad - maosh, bonus, passiv daromad va boshqa kiruvchi pullar.",
      "Xarajatlar - doimiy (ijara, kommunal) va o'zgaruvchan (ovqat, ko'ngil ochar).",
      "Keraksiz xarajatlarni aniqlang va kamaytiring.",
      "Daromad xarajatdan ko'p bo'lishi kerak.",
      "Passiv daromad manbalarini qidiring.",
      "Xarajatlarni kategoriyalarga ajrating.",
      "Impulsiv xaridlardan saqlaning."
    ],
    keyPoints: [
      "Daromad > Xarajat",
      "Keraksiz xarajatlarni kamaytiring",
      "Kategoriyalarga ajrating"
    ],
    quiz: [
      {
        id: "q1",
        question: "Doimiy xarajatlarga misol qaysi?",
        options: [
          "Kino",
          "Ijara haqi",
          "Sovg'a",
          "Restoran"
        ],
        correctIndex: 1,
        explanation: "Ijara haqi har oy to'lanadigan doimiy xarajatdir."
      },
      {
        id: "q2",
        question: "Passiv daromad nima?",
        options: [
          "Maosh",
          "Ishlmasdan keladigan daromad (ijara, foiz)",
          "Bonus",
          "Qarz"
        ],
        correctIndex: 1,
        explanation: "Passiv daromad - faol ishlashni talab qilmaydigan daromad (mulk ijarasi, investitsiya foizi)."
      },
      {
        id: "q3",
        question: "Impulsiv xarid nima?",
        options: [
          "Rejalashtirilgan xarid",
          "O'ylamasdan qilingan xarid",
          "Chegirmali xarid",
          "Onlayn xarid"
        ],
        correctIndex: 1,
        explanation: "Impulsiv xarid - o'ylab ko'rmasdan, bir lahzada qilingan xarid."
      },
      {
        id: "q4",
        question: "Moliyaviy salomatlik uchun nima kerak?",
        options: [
          "Daromad xarajatdan kam bo'lsin",
          "Daromad xarajatdan ko'p bo'lsin",
          "Hamma pulni sarflash",
          "Faqat qarz olish"
        ],
        correctIndex: 1,
        explanation: "Moliyaviy salomatlik uchun daromad xarajatdan ko'p bo'lishi kerak."
      },
      {
        id: "q5",
        question: "Xarajatlarni kategoriyalarga ajratish nima uchun foydali?",
        options: [
          "Ko'proq sarflash uchun",
          "Qayerga ko'p ketayotganini ko'rish uchun",
          "Boshqalarni hayratda qoldirish uchun",
          "Kerak emas"
        ],
        correctIndex: 1,
        explanation: "Kategoriyalarga ajratish pulingiz qayerga ko'proq ketayotganini ko'rsatadi."
      },
      {
        id: "q6",
        question: "O'zgaruvchan xarajatlarga misol?",
        options: [
          "Kredit to'lovi",
          "Kino va restoran",
          "Ijara",
          "Sug'urta"
        ],
        correctIndex: 1,
        explanation: "Kino va restoran xarajatlari har oy o'zgarib turadi."
      },
      {
        id: "q7",
        question: "Keraksiz xarajatlarni qanday aniqlash mumkin?",
        options: [
          "Hamma xarajat kerakli",
          "Bir oy xarajatlarni tahlil qilish",
          "Do'stlardan so'rash",
          "Aniqlab bo'lmaydi"
        ],
        correctIndex: 1,
        explanation: "Bir oy davomida xarajatlarni yozib, tahlil qilish orqali keraksizlarini aniqlash mumkin."
      }
    ]
  },
  {
    id: "lesson_tejash",
    moduleId: "budgeting",
    icon: "🐷",
    difficulty: "intermediate",
    xpReward: 70,
    estimatedTime: 8,
    title: "Tejash san'ati",
    description: "Pul tejash usullari va texnikalari",
    content: [
      "Daromad kelishi bilanoq bir qismini tejashga ajrating.",
      "Avtomatik o'tkazmalarni sozlang - tejash osonlashadi.",
      "Kichik miqdorlar ham vaqt o'tib katta bo'ladi.",
      "30 kunlik qoida - katta xariddan oldin 30 kun kuting.",
      "Chegirmalar va aksiyalardan foydalaning.",
      "Keraksiz obunalarni bekor qiling.",
      "Tejash maqsadini aniq belgilang."
    ],
    keyPoints: [
      "Avval tejang, keyin sarflang",
      "Avtomatik tejash",
      "30 kunlik qoida"
    ],
    quiz: [
      {
        id: "q1",
        question: "Tejashning eng yaxshi usuli qaysi?",
        options: [
          "Pulni sarflab, qolganini tejash",
          "Avval tejash, keyin sarflash",
          "Hamma pulni sarflash",
          "Qarz olish"
        ],
        correctIndex: 1,
        explanation: "\"Avval o'zingizga to'lang\" - daromad kelishi bilanoq bir qismini tejashga ajrating."
      },
      {
        id: "q2",
        question: "30 kunlik qoida nima?",
        options: [
          "30 kun davomida tejash",
          "Katta xariddan oldin 30 kun kutish",
          "Oyda 30 marta pul olish",
          "30% tejash"
        ],
        correctIndex: 1,
        explanation: "30 kunlik qoida - katta xarid qilishdan oldin 30 kun kutib, haqiqatan kerakligini o'ylash."
      },
      {
        id: "q3",
        question: "Avtomatik tejash nima?",
        options: [
          "Bank avtomatik qarz beradi",
          "Daromaddan avtomatik tejash hisobiga o'tkazish",
          "Xarajatlarni avtomatik to'lash",
          "Kredit kartadan avtomatik to'lov"
        ],
        correctIndex: 1,
        explanation: "Avtomatik tejash - maosh kelganda avtomatik tejash hisobiga pul o'tkaziladi."
      },
      {
        id: "q4",
        question: "Nima uchun kichik miqdorda tejash ham muhim?",
        options: [
          "Muhim emas",
          "Vaqt o'tib katta summa bo'ladi",
          "Faqat katta summa muhim",
          "Bank talab qiladi"
        ],
        correctIndex: 1,
        explanation: "Kichik miqdorlar muntazam tejalsa, vaqt o'tib katta summaga aylanadi."
      },
      {
        id: "q5",
        question: "Keraksiz obunalarni bekor qilish nima uchun kerak?",
        options: [
          "Kerak emas",
          "Oylik xarajatlarni kamaytirish",
          "Yangi obunalar uchun joy ochish",
          "Do'stlarga maqtanish"
        ],
        correctIndex: 1,
        explanation: "Ishlatilmaydigan obunalar (servislar, ilovalar) ortiqcha xarajat keltiradi."
      },
      {
        id: "q6",
        question: "Chegirmalardan foydalanish qachon foydali?",
        options: [
          "Har doim xarid qilish kerak",
          "Faqat kerakli narsalarga chegirma bo'lganda",
          "Chegirma bo'lsa, keraksiz narsani ham olish",
          "Chegirmalar foydali emas"
        ],
        correctIndex: 1,
        explanation: "Chegirmalardan faqat haqiqatan kerakli narsalarni olayotganda foydalanish kerak."
      }
    ]
  },

  // ========== MODULE 4: BANK XIZMATLARI (2 lessons) ==========
  {
    id: "lesson_bank_turlari",
    moduleId: "banking",
    icon: "🏦",
    difficulty: "intermediate",
    xpReward: 70,
    estimatedTime: 8,
    title: "Bank turlari",
    description: "Markaziy bank va tijorat banklari farqi",
    content: [
      "Markaziy bank - mamlakat pul siyosatini boshqaradi, pul chiqaradi.",
      "Tijorat banklari - omonat oladi, kredit beradi, karta chiqaradi.",
      "Markaziy bank aholi va tadbirkorlarga to'g'ridan-to'g'ri xizmat ko'rsatmaydi.",
      "Tijorat banklarida hisob raqam ochish va xizmatlardan foydalanish mumkin.",
      "O'zbekistonda 30 dan ortiq tijorat banklari faoliyat ko'rsatadi.",
      "Mikrokredit tashkilotlari kichik kreditlar beradi.",
      "Bank tanlashda foiz stavkalari va xizmat sifatini solishtiring."
    ],
    keyPoints: [
      "Markaziy bank = pul siyosati",
      "Tijorat bank = kundalik xizmatlar",
      "Har bir bank uchun foizlarni solishtiring"
    ],
    quiz: [
      {
        id: "q1",
        question: "Markaziy bank kimga xizmat ko'rsatadi?",
        options: [
          "Aholiga",
          "Tadbirkorlarga",
          "Hech kimga to'g'ridan-to'g'ri",
          "Bolalarga"
        ],
        correctIndex: 2,
        explanation: "Markaziy bank aholi va tadbirkorlarga to'g'ridan-to'g'ri xizmat ko'rsatmaydi."
      },
      {
        id: "q2",
        question: "Tijorat banklari qanday xizmatlar ko'rsatadi?",
        options: [
          "Faqat pul chiqarish",
          "Omonat, kredit, karta",
          "Faqat valyuta almashish",
          "Hech qanday"
        ],
        correctIndex: 1,
        explanation: "Tijorat banklari omonat oladi, kredit beradi, karta chiqaradi."
      },
      {
        id: "q3",
        question: "O'zbekistonda pul kim tomonidan muomalaga chiqariladi?",
        options: [
          "Tijorat banklari",
          "Markaziy bank",
          "Moliya vazirligi",
          "Hokimiyat"
        ],
        correctIndex: 1,
        explanation: "O'zbekiston Respublikasi Markaziy banki pul muomalaga chiqaradi."
      },
      {
        id: "q4",
        question: "Bank tanlashda nimaga e'tibor berish kerak?",
        options: [
          "Faqat binoning ko'rinishiga",
          "Foiz stavkalari va xizmat sifatiga",
          "Faqat nomiga",
          "Do'stlar qayerda bo'lsa"
        ],
        correctIndex: 1,
        explanation: "Bank tanlashda foiz stavkalari, xizmat sifati va shartlarni solishtirish kerak."
      },
      {
        id: "q5",
        question: "Mikrokredit tashkilotlari qanday xizmat ko'rsatadi?",
        options: [
          "Faqat katta kreditlar",
          "Kichik miqdordagi kreditlar",
          "Faqat omonatlar",
          "Pul o'tkazish"
        ],
        correctIndex: 1,
        explanation: "Mikrokredit tashkilotlari kichik miqdordagi kreditlarni beradi."
      },
      {
        id: "q6",
        question: "O'zbekistonda nechta tijorat banki bor?",
        options: [
          "5 dan kam",
          "10 ta",
          "30 dan ortiq",
          "100 dan ortiq"
        ],
        correctIndex: 2,
        explanation: "O'zbekistonda 30 dan ortiq tijorat banklari faoliyat ko'rsatadi."
      }
    ]
  },
  {
    id: "lesson_omonat_kredit",
    moduleId: "banking",
    icon: "💰",
    difficulty: "intermediate",
    xpReward: 70,
    estimatedTime: 8,
    title: "Omonat va kredit",
    description: "Bank omonatlari va kreditlarni tushunish",
    content: [
      "Omonat - bankda saqlanadigan pullar, ular ustiga foiz qo'shiladi.",
      "Kredit - bankdan olingan qarz pul, qaytarishda foiz to'lanadi.",
      "Omonat qo'yish - pulni ko'paytirish usuli.",
      "Kredit olish - mas'uliyat talab qiladi.",
      "Kichik miqdordagi kreditlarni mikromoliya tashkilotlaridan ham olish mumkin.",
      "Omonat muddatli va muddatsiz bo'lishi mumkin.",
      "Kredit olishdan oldin to'lov jadvalini hisoblang."
    ],
    keyPoints: [
      "Omonat = pul o'sadi",
      "Kredit = qarz",
      "Foiz to'lanadi"
    ],
    quiz: [
      {
        id: "q1",
        question: "Omonat nima?",
        options: [
          "Bankdan olingan qarz",
          "Bankda saqlangan pul",
          "Karta balansi",
          "Maosh"
        ],
        correctIndex: 1,
        explanation: "Omonat - bankda saqlanadigan pullar."
      },
      {
        id: "q2",
        question: "Kredit olganda nima to'lanadi?",
        options: [
          "Hech narsa",
          "Foiz",
          "Soliq",
          "Jarima"
        ],
        correctIndex: 1,
        explanation: "Kredit qaytarishda foiz to'lanadi."
      },
      {
        id: "q3",
        question: "Omonat qo'yish nima uchun foydali?",
        options: [
          "Pul yo'qoladi",
          "Pul o'sadi",
          "Pul kamayadi",
          "Hech qanday foyda yo'q"
        ],
        correctIndex: 1,
        explanation: "Omonat qo'yish - pulni ko'paytirish usuli."
      },
      {
        id: "q4",
        question: "Muddatli omonat nima?",
        options: [
          "Istalgan vaqtda olib ketish",
          "Belgilangan muddatga qo'yilgan omonat",
          "Bir kunlik omonat",
          "Kreditga o'xshash"
        ],
        correctIndex: 1,
        explanation: "Muddatli omonat - ma'lum muddat (6 oy, 1 yil) ga qo'yilgan omonat, foizi yuqoriroq."
      },
      {
        id: "q5",
        question: "Kredit olishdan oldin nima qilish kerak?",
        options: [
          "Darhol olish",
          "To'lov jadvalini hisoblash",
          "Do'stlardan so'rash",
          "Hech narsa"
        ],
        correctIndex: 1,
        explanation: "Kredit olishdan oldin oylik to'lovlar va umumiy qaytarish summasini hisoblash kerak."
      },
      {
        id: "q6",
        question: "Kreditni o'z vaqtida to'lamaslik nimaga olib keladi?",
        options: [
          "Hech narsaga",
          "Jarima va kredit tarixining yomonlashishi",
          "Bank sovg'a beradi",
          "Kredit yo'qoladi"
        ],
        correctIndex: 1,
        explanation: "Kreditni kechiktirish jarima va kredit tarixining yomonlashishiga olib keladi."
      },
      {
        id: "q7",
        question: "Yaxshi kredit tarixi nima beradi?",
        options: [
          "Hech narsa",
          "Kelajakda kredit olish osonlashadi",
          "Pul mukofoti",
          "Bank kartasi"
        ],
        correctIndex: 1,
        explanation: "Yaxshi kredit tarixi kelajakda yaxshi shartlarda kredit olish imkonini beradi."
      }
    ]
  },

  // ========== MODULE 5: ILG'OR MAVZULAR (3 lessons) ==========
  {
    id: "lesson_valyuta",
    moduleId: "advanced",
    icon: "💱",
    difficulty: "advanced",
    xpReward: 80,
    estimatedTime: 10,
    title: "Valyuta kursi",
    description: "Valyuta birliklari va kurslarini tushunish",
    content: [
      "Valyuta - har bir davlatning milliy pul birligi.",
      "Valyuta kursi - bir valyutaning boshqasiga nisbati.",
      "Tijorat banklari valyutani ayirboshlash kursini mustaqil belgilaydi.",
      "Xalqaro kartalar xorijda to'lov qilish imkonini beradi.",
      "Valyuta kursi har kuni o'zgarishi mumkin.",
      "Valyuta almashtirishda bank komissiyasini hisobga oling.",
      "O'zbekiston so'mi (UZS) - milliy valyuta."
    ],
    keyPoints: [
      "Kurs o'zgaradi",
      "Banklar kurs belgilaydi",
      "Xalqaro kartalar qulay"
    ],
    quiz: [
      {
        id: "q1",
        question: "Valyuta kursi nima?",
        options: [
          "Pul miqdori",
          "Bir valyutaning boshqasiga nisbati",
          "Bank foizi",
          "Kredit summasi"
        ],
        correctIndex: 1,
        explanation: "Valyuta kursi - bir valyutaning boshqasiga nisbati."
      },
      {
        id: "q2",
        question: "Valyuta kursini kim belgilaydi?",
        options: [
          "Faqat Markaziy bank",
          "Tijorat banklari mustaqil",
          "Faqat hukumat",
          "Xalqaro tashkilotlar"
        ],
        correctIndex: 1,
        explanation: "Tijorat banklari mijozlar uchun valyutani ayirboshlash kursini mustaqil belgilaydi."
      },
      {
        id: "q3",
        question: "Xorijda to'lov qilish uchun qanday karta kerak?",
        options: [
          "Mahalliy karta",
          "Xalqaro karta",
          "Virtual karta",
          "Bolalar kartasi"
        ],
        correctIndex: 1,
        explanation: "Xalqaro kartalar xorijda to'lov qilish imkonini beradi."
      },
      {
        id: "q4",
        question: "Valyuta almashtirishda nimaga e'tibor berish kerak?",
        options: [
          "Faqat kursga",
          "Kurs va bank komissiyasiga",
          "Faqat bank nomiga",
          "Hech narsaga"
        ],
        correctIndex: 1,
        explanation: "Valyuta almashtirishda ham kurs, ham bank komissiyasini hisobga olish kerak."
      },
      {
        id: "q5",
        question: "O'zbekistonning milliy valyutasi qaysi?",
        options: [
          "Dollar (USD)",
          "So'm (UZS)",
          "Yevro (EUR)",
          "Rubl (RUB)"
        ],
        correctIndex: 1,
        explanation: "O'zbekiston so'mi (UZS) - O'zbekistonning milliy valyutasi."
      },
      {
        id: "q6",
        question: "Valyuta kursi nima uchun o'zgaradi?",
        options: [
          "O'zgarmaydi",
          "Talab va taklif, iqtisodiy omillar",
          "Faqat bayramlarda",
          "Faqat kechqurun"
        ],
        correctIndex: 1,
        explanation: "Valyuta kursi bozordagi talab va taklif, iqtisodiy omillarga bog'liq ravishda o'zgaradi."
      }
    ]
  },
  {
    id: "lesson_moliyaviy_maqsad",
    moduleId: "advanced",
    icon: "🎯",
    difficulty: "intermediate",
    xpReward: 70,
    estimatedTime: 8,
    title: "Moliyaviy maqsadlar",
    description: "Maqsad qo'yish va tejamkorlik",
    content: [
      "Moliyaviy maqsad - nimaga pul yig'moqchi ekanligingiz.",
      "Maqsad aniq va o'lchanadigan bo'lishi kerak.",
      "SMART maqsadlar: Specific, Measurable, Achievable, Relevant, Time-bound.",
      "Oylik va yillik byudjetni rejalashtirib, maqsadga ering.",
      "Har daromadingizdan bir qismini maqsad uchun ajrating.",
      "Impulsiv xaridlardan saqlaning.",
      "Katta maqsadlarni kichik bosqichlarga bo'ling."
    ],
    keyPoints: [
      "Aniq maqsad qo'ying",
      "Muntazam tejang",
      "Impulsiv xarid yo'q"
    ],
    quiz: [
      {
        id: "q1",
        question: "Yaxshi moliyaviy maqsad qanday bo'lishi kerak?",
        options: [
          "Noaniq",
          "Aniq va o'lchanadigan",
          "Erishish mumkin emas",
          "Muddatsiz"
        ],
        correctIndex: 1,
        explanation: "Maqsad aniq va o'lchanadigan bo'lishi kerak."
      },
      {
        id: "q2",
        question: "Impulsiv xarid nima?",
        options: [
          "Rejalashtirilgan xarid",
          "O'ylamasdan qilingan xarid",
          "Arzon xarid",
          "Zaruriy xarid"
        ],
        correctIndex: 1,
        explanation: "Impulsiv xarid - o'ylab ko'rmasdan, bir lahzada qilingan xarid."
      },
      {
        id: "q3",
        question: "Maqsadga erishish uchun nima qilish kerak?",
        options: [
          "Hamma pulni sarflash",
          "Muntazam tejash",
          "Qarz olish",
          "Hech narsa"
        ],
        correctIndex: 1,
        explanation: "Har daromadingizdan bir qismini maqsad uchun ajratib, muntazam tejash kerak."
      },
      {
        id: "q4",
        question: "SMART maqsadda 'T' nimani anglatadi?",
        options: [
          "Team (Jamoa)",
          "Time-bound (Muddatli)",
          "Technology (Texnologiya)",
          "Training (Trening)"
        ],
        correctIndex: 1,
        explanation: "SMART maqsadda T - Time-bound, ya'ni aniq muddatli bo'lishi kerak."
      },
      {
        id: "q5",
        question: "Katta maqsadga qanday erishish osonroq?",
        options: [
          "Hammasi birdan",
          "Kichik bosqichlarga bo'lib",
          "O'ylamasdan",
          "Boshqalar yordamida"
        ],
        correctIndex: 1,
        explanation: "Katta maqsadlarni kichik, bajariladigan bosqichlarga bo'lish muvaffaqiyat kaliti."
      },
      {
        id: "q6",
        question: "Moliyaviy maqsadga misol qaysi?",
        options: [
          "Baxtli bo'lish",
          "6 oy ichida 5 million so'm yig'ish",
          "Ko'proq pul",
          "Yaxshi yashash"
        ],
        correctIndex: 1,
        explanation: "\"6 oy ichida 5 million so'm yig'ish\" - aniq, o'lchanadigan va muddatli maqsad."
      },
      {
        id: "q7",
        question: "Maqsadga erishishda eng katta to'siq nima?",
        options: [
          "Maosh kamligi",
          "Impulsiv xaridlar va intizom yo'qligi",
          "Bank xizmatlari",
          "Valyuta kursi"
        ],
        correctIndex: 1,
        explanation: "Impulsiv xaridlar va moliyaviy intizom yo'qligi maqsadga erishishda asosiy to'siq."
      }
    ]
  },
  {
    id: "lesson_firibgarlik",
    moduleId: "advanced",
    icon: "⚠️",
    difficulty: "advanced",
    xpReward: 80,
    estimatedTime: 8,
    title: "Moliyaviy firibgarlik",
    description: "Firibgarlikdan o'zingizni himoya qilish",
    content: [
      "Moliyaviy firibgarlar turli usullar bilan aldash mumkin.",
      "Bank kartasi ma'lumotlarini hech kimga bermang.",
      "PIN kod va CVV kodni maxfiy saqlang.",
      "Shubhali havolalarga bosmang.",
      "Agar shubhalanadigan bo'lsangiz, kattalardan yordam so'rang.",
      "Fishingni aniqlashni o'rganing - soxta saytlar va xabarlar.",
      "Haqiqiy bank hech qachon SMS orqali karta ma'lumotlarini so'ramaydi."
    ],
    keyPoints: [
      "Ma'lumotlarni bermang",
      "Shubhali havolalar xavfli",
      "Kattalardan so'rang"
    ],
    quiz: [
      {
        id: "q1",
        question: "Firibgarlikdan himoyalanish uchun nimani bermaslik kerak?",
        options: [
          "Telefon raqamini",
          "Karta ma'lumotlarini",
          "Manzilni",
          "Ismni"
        ],
        correctIndex: 1,
        explanation: "Bank kartasi ma'lumotlarini hech kimga bermang."
      },
      {
        id: "q2",
        question: "Shubhali havolaga nima qilish kerak?",
        options: [
          "Bosish",
          "Do'stlarga yuborish",
          "Bosmaslik",
          "Ko'p marta bosish"
        ],
        correctIndex: 2,
        explanation: "Shubhali havolalarga bosmang."
      },
      {
        id: "q3",
        question: "Shubhali vaziyatda kimdan yordam so'rash kerak?",
        options: [
          "Notanish odamlardan",
          "Internetdan",
          "Kattalardan",
          "Hech kimdan"
        ],
        correctIndex: 2,
        explanation: "Agar shubhalanadigan bo'lsangiz, kattalardan yordam so'rang."
      },
      {
        id: "q4",
        question: "Fishing nima?",
        options: [
          "Baliq ovlash",
          "Soxta sayt va xabarlar orqali aldash",
          "Bank xizmati",
          "Kredit turi"
        ],
        correctIndex: 1,
        explanation: "Fishing - soxta saytlar va xabarlar orqali shaxsiy ma'lumotlarni o'g'irlash."
      },
      {
        id: "q5",
        question: "Bank SMS orqali nima so'ramaydi?",
        options: [
          "Ismingiz",
          "Karta raqami va CVV",
          "Telefon raqamingiz",
          "Manzil"
        ],
        correctIndex: 1,
        explanation: "Haqiqiy bank hech qachon SMS orqali karta raqami va CVV ni so'ramaydi."
      },
      {
        id: "q6",
        question: "Notanish raqamdan qo'ng'iroq kelib, bank xodimi ekanini aytsa, nima qilish kerak?",
        options: [
          "Karta ma'lumotlarini aytish",
          "Hech narsa aytmaslik va bankka o'zingiz qo'ng'iroq qilish",
          "PIN kodni aytish",
          "Pulni o'tkazish"
        ],
        correctIndex: 1,
        explanation: "Bank xodimi bo'lsa ham, karta ma'lumotlarini bermang. O'zingiz bank raqamiga qo'ng'iroq qiling."
      },
      {
        id: "q7",
        question: "Firibgarlik qurboni bo'lsangiz, birinchi nima qilish kerak?",
        options: [
          "Kutish",
          "Darhol bankka xabar berish",
          "Do'stlarga aytish",
          "Hech narsa"
        ],
        correctIndex: 1,
        explanation: "Firibgarlik qurboni bo'lsangiz, darhol bankka xabar bering va kartani bloklang."
      }
    ]
  }
];

// Helper function to get lessons by module
export function getLessonsByModule(moduleId: string): LessonData[] {
  return LESSONS.filter(lesson => lesson.moduleId === moduleId);
}

// Helper function to get total lessons count
export function getTotalLessonsCount(): number {
  return LESSONS.length;
}

// Helper function to get total XP available
export function getTotalXPAvailable(): number {
  return LESSONS.reduce((total, lesson) => total + lesson.xpReward, 0);
}
