/* Haris Bahasa – content for Cambridge IGCSE Malay as a Foreign Language (0546)
   Words: [malay, english, optionalEmoji]   Sentences: [malay, english, keyWordFromUnit]
   Topic areas follow the syllabus: A Everyday activities, B Personal & social life,
   C The world around us, D The world of work, E The international world. */
window.BAHASA_DATA = (function () {

const worlds = [
  { id: '0', name: 'Akademi Ninja', area: 'Starter', desc: 'Greetings & numbers – your first training', icon: '🏯' },
  { id: 'A', name: 'Desa Api',      area: 'Area A', desc: 'Everyday activities', icon: '🔥' },
  { id: 'B', name: 'Desa Air',      area: 'Area B', desc: 'Personal & social life', icon: '💧' },
  { id: 'C', name: 'Desa Angin',    area: 'Area C', desc: 'The world around us', icon: '🌪️' },
  { id: 'D', name: 'Desa Petir',    area: 'Area D', desc: 'The world of work', icon: '⚡' },
  { id: 'E', name: 'Desa Bumi',     area: 'Area E', desc: 'The international world', icon: '🌏' }
];

const units = [
/* ───────────── STARTER ───────────── */
{ id: '0a', world: '0', title: 'Salam & Sopan', en: 'Greetings & manners', icon: '🙏',
  words: [
    ['Selamat pagi', 'Good morning'], ['Selamat tengah hari', 'Good afternoon (midday)'],
    ['Selamat petang', 'Good afternoon / evening'], ['Selamat malam', 'Good night / good evening'],
    ['Apa khabar', 'How are you?'], ['Khabar baik', 'I am fine'], ['Terima kasih', 'Thank you'],
    ['Sama-sama', 'You are welcome'], ['Maaf', 'Sorry / excuse me'], ['Tolong', 'Please (help me) / help'],
    ['Sila', 'Please (go ahead)'], ['Ya', 'Yes'], ['Tidak', 'No / not'],
    ['Selamat tinggal', 'Goodbye (to someone staying)'], ['Jumpa lagi', 'See you again'], ['Nama saya', 'My name is']
  ],
  sents: [
    ['Selamat pagi, cikgu.', 'Good morning, teacher.', 'Selamat pagi'],
    ['Apa khabar, cikgu?', 'How are you, teacher?', 'Apa khabar'],
    ['Nama saya Haris.', 'My name is Haris.', 'Nama saya'],
    ['Terima kasih, cikgu.', 'Thank you, teacher.', 'Terima kasih'],
    ['Maaf, saya terlambat.', 'Sorry, I am late.', 'Maaf']
  ]},
{ id: '0b', world: '0', title: 'Nombor', en: 'Numbers', icon: '🔢',
  words: [
    ['kosong', 'zero (0)'], ['satu', 'one (1)'], ['dua', 'two (2)'], ['tiga', 'three (3)'], ['empat', 'four (4)'],
    ['lima', 'five (5)'], ['enam', 'six (6)'], ['tujuh', 'seven (7)'], ['lapan', 'eight (8)'], ['sembilan', 'nine (9)'],
    ['sepuluh', 'ten (10)'], ['sebelas', 'eleven (11)'], ['dua belas', 'twelve (12)'], ['dua puluh', 'twenty (20)'],
    ['seratus', 'one hundred (100)'], ['seribu', 'one thousand (1000)']
  ],
  sents: [
    ['Saya ada lima ekor kucing.', 'I have five cats.', 'lima'],
    ['Ada tujuh hari dalam seminggu.', 'There are seven days in a week.', 'tujuh'],
    ['Adik saya berumur sepuluh tahun.', 'My younger sibling is ten years old.', 'sepuluh'],
    ['Buku ini ada seratus muka surat.', 'This book has one hundred pages.', 'seratus'],
    ['Kelas saya ada dua puluh murid.', 'My class has twenty pupils.', 'dua puluh']
  ]},

/* ───────────── AREA A ───────────── */
{ id: 'A1', world: 'A', title: 'Hari & Masa', en: 'Days & time', icon: '⏰',
  words: [
    ['Isnin', 'Monday'], ['Selasa', 'Tuesday'], ['Rabu', 'Wednesday'], ['Khamis', 'Thursday'], ['Jumaat', 'Friday'],
    ['Sabtu', 'Saturday'], ['Ahad', 'Sunday'], ['hari', 'day'], ['minggu', 'week'], ['pagi', 'morning'],
    ['petang', 'late afternoon / evening'], ['malam', 'night'], ['hari ini', 'today'], ['esok', 'tomorrow'],
    ['semalam', 'yesterday'], ['sekarang', 'now'], ['jam', 'hour / clock'], ['pukul', "o'clock"], ['minit', 'minute']
  ],
  sents: [
    ['Hari ini hari Isnin.', 'Today is Monday.', 'Isnin'],
    ['Kami pergi ke sekolah esok.', 'We go to school tomorrow.', 'esok'],
    ['Saya bangun pada waktu pagi.', 'I wake up in the morning.', 'pagi'],
    ['Kelas bermula pada pukul lapan.', 'Class starts at eight o\'clock.', 'pukul'],
    ['Perjalanan itu mengambil dua jam.', 'The journey takes two hours.', 'jam'],
    ['Hari Sabtu dan hari Ahad ialah hujung minggu.', 'Saturday and Sunday are the weekend.', 'minggu']
  ]},
{ id: 'A2', world: 'A', title: 'Bulan & Musim', en: 'Months & seasons', icon: '📅',
  words: [
    ['Januari', 'January'], ['Februari', 'February'], ['Mac', 'March'], ['April', 'April'], ['Mei', 'May'],
    ['Jun', 'June'], ['Julai', 'July'], ['Ogos', 'August'], ['September', 'September'], ['Oktober', 'October'],
    ['November', 'November'], ['Disember', 'December'], ['bulan', 'month / moon'], ['tahun', 'year'],
    ['musim bunga', 'spring'], ['musim panas', 'summer'], ['musim luruh', 'autumn'], ['musim sejuk', 'winter']
  ],
  sents: [
    ['Hari lahir saya pada bulan Mei.', 'My birthday is in May.', 'Mei'],
    ['Sekolah bermula pada bulan September.', 'School starts in September.', 'September'],
    ['Di London, musim sejuk sangat sejuk.', 'In London, winter is very cold.', 'musim sejuk'],
    ['Disember ialah bulan terakhir dalam setahun.', 'December is the last month of the year.', 'bulan'],
    ['Pada musim panas, cuaca sangat panas.', 'In summer, the weather is very hot.', 'musim panas']
  ]},
{ id: 'A3', world: 'A', title: 'Makanan & Minuman', en: 'Food & drink', icon: '🍚',
  words: [
    ['nasi', 'rice', '🍚'], ['roti', 'bread', '🍞'], ['ikan', 'fish', '🐟'], ['ayam', 'chicken', '🍗'],
    ['daging', 'meat / beef', '🥩'], ['telur', 'egg', '🥚'], ['sayur', 'vegetables', '🥬'], ['buah', 'fruit', '🍎'],
    ['susu', 'milk', '🥛'], ['air', 'water', '💧'], ['teh', 'tea', '🍵'], ['kopi', 'coffee', '☕'],
    ['kek', 'cake', '🍰'], ['sarapan', 'breakfast'], ['makan malam', 'dinner'], ['lapar', 'hungry'],
    ['dahaga', 'thirsty'], ['sedap', 'delicious'], ['sudu', 'spoon', '🥄']
  ],
  sents: [
    ['Saya makan nasi dan ayam.', 'I eat rice and chicken.', 'ayam'],
    ['Adik minum susu setiap pagi.', 'My younger sibling drinks milk every morning.', 'susu'],
    ['Makanan ini sangat sedap.', 'This food is very delicious.', 'sedap'],
    ['Saya lapar kerana belum sarapan.', 'I am hungry because I have not had breakfast yet.', 'sarapan'],
    ['Ayah suka minum kopi tetapi saya suka minum teh.', 'Dad likes to drink coffee but I like to drink tea.', 'kopi']
  ]},
{ id: 'A4', world: 'A', title: 'Badan & Kesihatan', en: 'Body & health', icon: '🩺',
  words: [
    ['kepala', 'head'], ['mata', 'eye'], ['telinga', 'ear', '👂'], ['hidung', 'nose', '👃'], ['mulut', 'mouth', '👄'],
    ['gigi', 'tooth / teeth', '🦷'], ['tangan', 'hand / arm', '✋'], ['kaki', 'foot / leg', '🦶'], ['perut', 'stomach'],
    ['sakit', 'sick / painful'], ['demam', 'fever'], ['batuk', 'cough'], ['selesema', 'cold / flu'],
    ['doktor', 'doctor', '🧑‍⚕️'], ['ubat', 'medicine', '💊'], ['sihat', 'healthy']
  ],
  sents: [
    ['Dia demam dan tidak pergi ke sekolah.', 'He/she has a fever and did not go to school.', 'demam'],
    ['Doktor memberi ubat kepada saya.', 'The doctor gave me medicine.', 'ubat'],
    ['Kita mesti makan sayur supaya sihat.', 'We must eat vegetables so that we are healthy.', 'sihat'],
    ['Perut saya sakit selepas makan.', 'My stomach hurts after eating.', 'perut'],
    ['Dia batuk sepanjang malam.', 'He/she coughed all night.', 'batuk']
  ]},
{ id: 'A5', world: 'A', title: 'Perjalanan', en: 'Travel & transport', icon: '🚆',
  words: [
    ['kereta', 'car', '🚗'], ['bas', 'bus', '🚌'], ['kereta api', 'train', '🚆'], ['kapal terbang', 'aeroplane', '✈️'],
    ['basikal', 'bicycle', '🚲'], ['teksi', 'taxi', '🚕'], ['bot', 'boat', '⛵'], ['lapangan terbang', 'airport'],
    ['stesen', 'station'], ['tiket', 'ticket', '🎫'], ['jalan', 'road / street'], ['pergi', 'go'],
    ['balik', 'return / go home'], ['tiba', 'arrive'], ['percutian', 'holiday'], ['jauh', 'far'], ['dekat', 'near']
  ],
  sents: [
    ['Kami pergi ke sekolah dengan bas.', 'We go to school by bus.', 'bas'],
    ['Kapal terbang tiba di lapangan terbang pada pukul tiga.', 'The aeroplane arrives at the airport at three o\'clock.', 'lapangan terbang'],
    ['Rumah saya dekat dengan stesen.', 'My house is near the station.', 'dekat'],
    ['Ayah membeli dua tiket kereta api.', 'Dad bought two train tickets.', 'tiket'],
    ['Percutian kami sangat seronok.', 'Our holiday was very fun.', 'percutian']
  ]},

/* ───────────── AREA B ───────────── */
{ id: 'B1', world: 'B', title: 'Keluarga & Kawan', en: 'Family & friends', icon: '👨‍👩‍👧',
  words: [
    ['keluarga', 'family', '👨‍👩‍👧'], ['ibu', 'mother'], ['bapa', 'father'], ['ibu bapa', 'parents'], ['abang', 'older brother'],
    ['kakak', 'older sister'], ['adik', 'younger brother / sister'], ['nenek', 'grandmother', '👵'], ['datuk', 'grandfather', '👴'],
    ['pak cik', 'uncle'], ['mak cik', 'aunt'], ['sepupu', 'cousin'], ['anak', 'child'], ['kawan', 'friend'], ['bayi', 'baby', '👶']
  ],
  sents: [
    ['Ini keluarga saya.', 'This is my family.', 'keluarga'],
    ['Nenek saya tinggal di Kuala Lumpur.', 'My grandmother lives in Kuala Lumpur.', 'nenek'],
    ['Kakak saya seorang doktor.', 'My older sister is a doctor.', 'kakak'],
    ['Kawan saya suka bermain bola sepak.', 'My friend likes playing football.', 'kawan'],
    ['Pak cik saya ada dua orang anak.', 'My uncle has two children.', 'anak']
  ]},
{ id: 'B2', world: 'B', title: 'Rumah', en: 'Home', icon: '🏠',
  words: [
    ['rumah', 'house / home', '🏠'], ['bilik', 'room'], ['bilik tidur', 'bedroom'], ['bilik air', 'bathroom', '🚿'],
    ['dapur', 'kitchen'], ['ruang tamu', 'living room'], ['taman', 'garden / park', '🌳'], ['katil', 'bed', '🛏️'],
    ['meja', 'table'], ['kerusi', 'chair', '🪑'], ['almari', 'cupboard / wardrobe'], ['tingkap', 'window', '🪟'],
    ['pintu', 'door', '🚪'], ['lampu', 'lamp / light', '💡'], ['televisyen', 'television', '📺'], ['peti sejuk', 'fridge'], ['tinggal', 'live / stay']
  ],
  sents: [
    ['Saya tidur di atas katil.', 'I sleep on the bed.', 'katil'],
    ['Ibu memasak di dapur.', 'Mum cooks in the kitchen.', 'dapur'],
    ['Keluarga saya menonton televisyen di ruang tamu.', 'My family watches television in the living room.', 'ruang tamu'],
    ['Ada sebuah taman kecil di belakang rumah.', 'There is a small garden behind the house.', 'taman'],
    ['Tolong tutup pintu dan tingkap.', 'Please close the door and the window.', 'tingkap']
  ]},
{ id: 'B3', world: 'B', title: 'Warna & Pakaian', en: 'Colours & clothes', icon: '👕',
  words: [
    ['merah', 'red', '🟥'], ['biru', 'blue', '🟦'], ['hijau', 'green', '🟩'], ['kuning', 'yellow', '🟨'], ['putih', 'white', '⬜'],
    ['hitam', 'black', '⬛'], ['oren', 'orange', '🟧'], ['ungu', 'purple', '🟪'], ['coklat', 'brown', '🟫'],
    ['merah jambu', 'pink'], ['kelabu', 'grey'], ['baju', 'shirt / clothes', '👕'], ['seluar', 'trousers', '👖'],
    ['kasut', 'shoes', '👟'], ['topi', 'hat / cap', '🧢'], ['stoking', 'socks', '🧦']
  ],
  sents: [
    ['Saya memakai baju biru dan seluar hitam.', 'I am wearing a blue shirt and black trousers.', 'biru'],
    ['Kasut sukan saya berwarna putih.', 'My sports shoes are white.', 'putih'],
    ['Epal itu merah tetapi pisang itu kuning.', 'The apple is red but the banana is yellow.', 'kuning'],
    ['Dia memakai topi merah ke sekolah.', 'He/she wears a red cap to school.', 'topi'],
    ['Warna kegemaran saya ialah hijau.', 'My favourite colour is green.', 'hijau']
  ]},
{ id: 'B4', world: 'B', title: 'Masa Lapang', en: 'Hobbies & leisure', icon: '⚽',
  words: [
    ['hobi', 'hobby'], ['suka', 'like'], ['bermain', 'play'], ['membaca', 'read'], ['menulis', 'write'], ['berenang', 'swim', '🏊'],
    ['berlari', 'run', '🏃'], ['menyanyi', 'sing', '🎤'], ['menari', 'dance', '💃'], ['melukis', 'draw / paint', '🎨'],
    ['memasak', 'cook'], ['menonton', 'watch'], ['bola sepak', 'football', '⚽'], ['badminton', 'badminton', '🏸'],
    ['muzik', 'music', '🎵'], ['filem', 'film', '🎬'], ['permainan', 'game', '🎮']
  ],
  sents: [
    ['Hobi saya ialah membaca buku.', 'My hobby is reading books.', 'membaca'],
    ['Kami bermain bola sepak pada hari Sabtu.', 'We play football on Saturday.', 'bola sepak'],
    ['Adik suka menari dan menyanyi.', 'My younger sibling likes dancing and singing.', 'menyanyi'],
    ['Saya tidak pandai berenang.', 'I am not good at swimming.', 'berenang'],
    ['Kami menonton filem pada malam Jumaat.', 'We watch a film on Friday night.', 'filem']
  ]},

/* ───────────── AREA C ───────────── */
{ id: 'C1', world: 'C', title: 'Bandar & Tempat', en: 'Town & places', icon: '🏙️',
  words: [
    ['bandar', 'town / city', '🏙️'], ['kampung', 'village'], ['kedai', 'shop', '🏪'], ['pasar', 'market'],
    ['pasar raya', 'supermarket'], ['bank', 'bank', '🏦'], ['perpustakaan', 'library', '📚'], ['restoran', 'restaurant', '🍽️'],
    ['pejabat pos', 'post office'], ['balai polis', 'police station'], ['masjid', 'mosque', '🕌'], ['muzium', 'museum'],
    ['panggung wayang', 'cinema'], ['hotel', 'hotel', '🏨'], ['kiri', 'left'], ['kanan', 'right'], ['lurus', 'straight ahead']
  ],
  sents: [
    ['Saya tinggal di bandar besar.', 'I live in a big city.', 'bandar'],
    ['Perpustakaan berada di sebelah bank.', 'The library is next to the bank.', 'perpustakaan'],
    ['Belok kiri, kemudian jalan terus.', 'Turn left, then keep going straight.', 'kiri'],
    ['Kami makan malam di restoran itu.', 'We had dinner at that restaurant.', 'restoran'],
    ['Datuk saya tinggal di kampung.', 'My grandfather lives in a village.', 'kampung']
  ]},
{ id: 'C2', world: 'C', title: 'Cuaca & Alam', en: 'Weather & nature', icon: '🌦️',
  words: [
    ['cuaca', 'weather'], ['panas', 'hot'], ['sejuk', 'cold'], ['hujan', 'rain', '🌧️'], ['ribut', 'storm', '⛈️'],
    ['angin', 'wind', '💨'], ['awan', 'cloud', '☁️'], ['matahari', 'sun', '☀️'], ['langit', 'sky'], ['laut', 'sea', '🌊'],
    ['sungai', 'river'], ['gunung', 'mountain', '⛰️'], ['hutan', 'forest', '🌲'], ['pantai', 'beach', '🏖️'],
    ['pokok', 'tree', '🌳'], ['bunga', 'flower', '🌸'], ['banjir', 'flood']
  ],
  sents: [
    ['Hari ini cuaca sangat panas.', 'The weather is very hot today.', 'cuaca'],
    ['Semalam hujan turun dengan lebat.', 'Yesterday the rain fell heavily.', 'hujan'],
    ['Kami bermain di pantai.', 'We play at the beach.', 'pantai'],
    ['Ada banyak pokok dan bunga di taman.', 'There are many trees and flowers in the garden.', 'bunga'],
    ['Pada waktu petang, angin bertiup kuat.', 'In the evening, the wind blows strongly.', 'angin']
  ]},
{ id: 'C3', world: 'C', title: 'Teknologi', en: 'Technology', icon: '💻',
  words: [
    ['komputer', 'computer', '💻'], ['telefon bimbit', 'mobile phone', '📱'], ['internet', 'internet'], ['e-mel', 'email', '📧'],
    ['laman web', 'website'], ['kata laluan', 'password', '🔑'], ['kamera', 'camera', '📷'], ['gambar', 'picture / photo', '🖼️'],
    ['mesej', 'message'], ['aplikasi', 'app / application'], ['skrin', 'screen'], ['papan kekunci', 'keyboard', '⌨️'],
    ['cetak', 'print', '🖨️'], ['muat turun', 'download'], ['dalam talian', 'online'], ['pengecas', 'charger', '🔌']
  ],
  sents: [
    ['Saya menghantar e-mel kepada cikgu.', 'I send an email to the teacher.', 'e-mel'],
    ['Ayah menggunakan komputer di pejabat.', 'Dad uses a computer at the office.', 'komputer'],
    ['Jangan kongsi kata laluan anda.', 'Do not share your password.', 'kata laluan'],
    ['Saya mengambil gambar dengan telefon bimbit.', 'I take a photo with a mobile phone.', 'gambar'],
    ['Adik memuat turun aplikasi baharu.', 'My younger sibling downloads a new app.', 'aplikasi']
  ]},
{ id: 'C4', world: 'C', title: 'Membeli-belah & Ukuran', en: 'Shopping & size', icon: '🛍️',
  words: [
    ['membeli', 'buy'], ['menjual', 'sell'], ['harga', 'price'], ['wang', 'money', '💵'], ['ringgit', 'ringgit (RM)'],
    ['murah', 'cheap'], ['mahal', 'expensive'], ['tunai', 'cash'], ['resit', 'receipt', '🧾'], ['besar', 'big'],
    ['kecil', 'small'], ['panjang', 'long'], ['pendek', 'short'], ['tinggi', 'tall / high'], ['berat', 'heavy'],
    ['ringan', 'light (weight)'], ['bulat', 'round'], ['segi empat', 'square']
  ],
  sents: [
    ['Saya membeli sebuah buku di kedai.', 'I buy a book at the shop.', 'membeli'],
    ['Baju ini terlalu mahal.', 'This shirt is too expensive.', 'mahal'],
    ['Berapakah harga kasut ini?', 'How much is the price of these shoes?', 'harga'],
    ['Rumah itu besar tetapi bilik air itu kecil.', 'That house is big but the bathroom is small.', 'kecil'],
    ['Beg saya sangat berat.', 'My bag is very heavy.', 'berat']
  ]},

/* ───────────── AREA D ───────────── */
{ id: 'D1', world: 'D', title: 'Sekolah', en: 'School & learning', icon: '🏫',
  words: [
    ['sekolah', 'school', '🏫'], ['kelas', 'class'], ['cikgu', 'teacher'], ['murid', 'pupil'], ['buku', 'book', '📖'],
    ['pen', 'pen', '🖊️'], ['pensel', 'pencil', '✏️'], ['pemadam', 'eraser'], ['pembaris', 'ruler', '📏'],
    ['kerja rumah', 'homework'], ['ujian', 'test'], ['peperiksaan', 'exam'], ['mata pelajaran', 'subject'],
    ['matematik', 'mathematics'], ['sains', 'science', '🔬'], ['sejarah', 'history'], ['geografi', 'geography', '🗺️'],
    ['belajar', 'study / learn'], ['mengajar', 'teach'], ['waktu rehat', 'break time']
  ],
  sents: [
    ['Cikgu mengajar matematik di dalam kelas.', 'The teacher teaches maths in the classroom.', 'matematik'],
    ['Saya membawa pensel dan pemadam ke sekolah.', 'I bring a pencil and an eraser to school.', 'pemadam'],
    ['Saya belajar bahasa Melayu di sekolah.', 'I learn Malay at school.', 'belajar'],
    ['Kami ada ujian sains pada hari Rabu.', 'We have a science test on Wednesday.', 'ujian'],
    ['Murid-murid membuat kerja rumah pada waktu petang.', 'The pupils do homework in the evening.', 'kerja rumah']
  ]},
{ id: 'D2', world: 'D', title: 'Pekerjaan', en: 'Jobs & work', icon: '👩‍🔧',
  words: [
    ['pekerjaan', 'job / occupation'], ['jururawat', 'nurse', '👩‍⚕️'], ['jurutera', 'engineer'], ['peguam', 'lawyer'],
    ['polis', 'police officer', '👮'], ['bomba', 'firefighter', '🧑‍🚒'], ['pemandu', 'driver'], ['tukang masak', 'cook / chef', '🧑‍🍳'],
    ['petani', 'farmer', '🧑‍🌾'], ['nelayan', 'fisherman'], ['juruterbang', 'pilot', '🧑‍✈️'], ['akauntan', 'accountant'],
    ['pejabat', 'office'], ['syarikat', 'company'], ['kilang', 'factory', '🏭'], ['gaji', 'salary'],
    ['bekerja', 'to work'], ['temu duga', 'interview']
  ],
  sents: [
    ['Ibu saya seorang jururawat di hospital.', 'My mother is a nurse at the hospital.', 'jururawat'],
    ['Ayah bekerja di sebuah syarikat besar.', 'Dad works at a big company.', 'bekerja'],
    ['Apabila besar, saya mahu menjadi juruterbang.', 'When I grow up, I want to become a pilot.', 'juruterbang'],
    ['Nelayan menangkap ikan di laut.', 'Fishermen catch fish at sea.', 'nelayan'],
    ['Dia menghadiri temu duga pada hari Selasa.', 'He/she attends an interview on Tuesday.', 'temu duga']
  ]},

/* ───────────── AREA E ───────────── */
{ id: 'E1', world: 'E', title: 'Negara & Bahasa', en: 'Countries & languages', icon: '🌍',
  words: [
    ['negara', 'country'], ['benua', 'continent'], ['Asia', 'Asia'], ['Eropah', 'Europe'], ['Afrika', 'Africa'],
    ['Amerika', 'America'], ['Australia', 'Australia'], ['Jepun', 'Japan', '🇯🇵'], ['Perancis', 'France', '🇫🇷'],
    ['Jerman', 'Germany', '🇩🇪'], ['Sepanyol', 'Spain', '🇪🇸'], ['Singapura', 'Singapore', '🇸🇬'], ['Malaysia', 'Malaysia', '🇲🇾'],
    ['orang asing', 'foreigner'], ['bahasa', 'language'], ['bahasa Inggeris', 'English (language)'], ['bahasa Cina', 'Chinese (language)']
  ],
  sents: [
    ['Kuala Lumpur ialah ibu negara Malaysia.', 'Kuala Lumpur is the capital of Malaysia.', 'negara'],
    ['Ramai orang bercakap bahasa Inggeris.', 'Many people speak English.', 'bahasa Inggeris'],
    ['Singapura terletak di sebelah selatan Malaysia.', 'Singapore is located south of Malaysia.', 'Singapura'],
    ['Eropah ialah sebuah benua.', 'Europe is a continent.', 'benua'],
    ['Kawan saya berasal dari Jepun.', 'My friend comes from Japan.', 'Jepun']
  ]},
{ id: 'E2', world: 'E', title: 'Budaya & Perayaan', en: 'Culture & celebrations', icon: '🎆',
  words: [
    ['perayaan', 'celebration / festival'], ['budaya', 'culture'], ['adat', 'custom / tradition'], ['Hari Raya', 'Hari Raya (Eid)'],
    ['Tahun Baru Cina', 'Chinese New Year'], ['Deepavali', 'Deepavali'], ['Krismas', 'Christmas', '🎄'], ['Hari Merdeka', 'National Day'],
    ['agama', 'religion'], ['kuih', 'traditional cake / snack'], ['pakaian tradisional', 'traditional clothing'], ['tarian', 'dance (noun)'],
    ['lagu', 'song'], ['bunga api', 'fireworks', '🎆'], ['hadiah', 'gift / prize', '🎁'], ['rumah terbuka', 'open house'], ['ang pau', 'red packet']
  ],
  sents: [
    ['Malaysia mempunyai banyak budaya yang berbeza.', 'Malaysia has many different cultures.', 'budaya'],
    ['Kami menyambut Hari Raya bersama keluarga.', 'We celebrate Hari Raya with family.', 'Hari Raya'],
    ['Pada Tahun Baru Cina, kanak-kanak menerima ang pau.', 'At Chinese New Year, children receive red packets.', 'ang pau'],
    ['Kami melihat bunga api pada malam Tahun Baharu.', 'We watched fireworks on New Year\'s night.', 'bunga api'],
    ['Semua orang memakai pakaian tradisional semasa perayaan itu.', 'Everyone wore traditional clothing during that celebration.', 'pakaian tradisional']
  ]}
];

/* ─────────── Grammar scrolls ─────────── */
const scrolls = [
{ id: 'G1', title: 'Kata Ganti Nama', en: 'Pronouns', icon: '👤',
  lesson: [
    ['saya', 'I / me (polite, safe to use everywhere)'], ['aku', 'I / me (informal, with close friends)'],
    ['awak / kamu', 'you (friendly)'], ['anda', 'you (formal)'], ['dia', 'he / she (Malay has no he/she difference!)'],
    ['kami', 'we (NOT including the person you talk to)'], ['kita', 'we (INCLUDING the person you talk to)'], ['mereka', 'they']
  ],
  tip: 'Malay does not change the verb for I / you / he / she / they. "Saya makan", "dia makan", "mereka makan" – the verb stays the same!',
  quiz: [
    ['___ ialah pelajar. (He / She is a student.)', ['Dia', 'Kami', 'Mereka', 'Anda'], 0],
    ['___ pergi ke taman. (Let us go – you and I together.)', ['Kami', 'Kita', 'Mereka', 'Dia'], 1],
    ['___ tinggal di Kuala Lumpur. (They live in Kuala Lumpur.)', ['Saya', 'Awak', 'Mereka', 'Kita'], 2],
    ['Which word is the most FORMAL way to say "you"?', ['aku', 'anda', 'dia', 'kami'], 1],
    ['___ suka makan nasi. (I like eating rice.)', ['Mereka', 'Anda', 'Kita', 'Saya'], 3]
  ]},
{ id: 'G2', title: 'Ini & Itu', en: 'This, that & "is"', icon: '👉',
  lesson: [
    ['ini', 'this / these (near you). Ini buku saya. = This is my book.'], ['itu', 'that / those (far away). Itu rumah saya. = That is my house.'],
    ['ialah', '"is / are" before a NOUN. Ayah saya ialah doktor. = My father is a doctor.'],
    ['(nothing!)', 'Before an ADJECTIVE we use nothing. Rumah itu besar. = That house is big.']
  ],
  tip: 'Malay has no "am / is / are". For a noun, use "ialah" (or nothing in short sentences). For adjectives, just put the adjective after the noun. Ini and itu go AFTER the noun: rumah itu = that house.',
  quiz: [
    ['How do you say "This is my bag."?', ['Ini beg saya.', 'Beg ini saya.', 'Saya ini beg.', 'Itu ialah beg.'], 0],
    ['How do you say "That house is big."?', ['Itu rumah besar ialah.', 'Rumah itu besar.', 'Besar itu rumah.', 'Rumah ialah itu besar.'], 1],
    ['Bapa saya ___ doktor. (My father is a doctor.)', ['itu', 'ialah', 'ini', 'tidak'], 1],
    ['Which word means "that"?', ['ini', 'itu', 'ada', 'dia'], 1],
    ['Kereta ___ mahal. (This car is expensive.)', ['itu', 'ialah', 'ini', 'kami'], 2]
  ]},
{ id: 'G3', title: 'Tidak & Bukan', en: 'Making sentences negative', icon: '🚫',
  lesson: [
    ['tidak', 'not – before VERBS and ADJECTIVES. Saya tidak lapar. = I am not hungry.'],
    ['bukan', 'not – before NOUNS and pronouns. Ini bukan buku saya. = This is not my book.'],
    ['belum', 'not yet. Saya belum makan. = I have not eaten yet.'],
    ['jangan', 'don\'t! (a command). Jangan bising! = Don\'t be noisy!']
  ],
  tip: 'Quick test: is the next word a THING/PERSON (noun)? Use "bukan". Is it an ACTION or DESCRIPTION (verb/adjective)? Use "tidak".',
  quiz: [
    ['Saya ___ lapar. (I am not hungry.)', ['bukan', 'tidak', 'belum', 'jangan'], 1],
    ['Ini ___ buku saya. (This is not my book.)', ['tidak', 'bukan', 'jangan', 'ialah'], 1],
    ['Dia ___ guru. (He is not a teacher.)', ['tidak', 'belum', 'bukan', 'jangan'], 2],
    ['Adik ___ suka sayur. (My sibling does not like vegetables.)', ['bukan', 'tidak', 'ialah', 'sudah'], 1],
    ['Saya ___ makan lagi. (I have not eaten yet.)', ['bukan', 'jangan', 'tidak', 'belum'], 3]
  ]},
{ id: 'G4', title: 'Masa: Sudah, Sedang, Akan', en: 'Tense words', icon: '⏳',
  lesson: [
    ['sudah', 'already / (past). Saya sudah makan. = I have eaten.'], ['sedang', 'in the middle of (now). Ibu sedang memasak. = Mum is cooking.'],
    ['akan', 'will (future). Kami akan pergi esok. = We will go tomorrow.'], ['belum', 'not yet. Dia belum tiba. = He has not arrived yet.']
  ],
  tip: 'The verb NEVER changes for past, present or future! You add a little time word (sudah / sedang / akan) or a time expression (semalam, sekarang, esok).',
  quiz: [
    ['Saya ___ makan nasi. (I have already eaten rice.)', ['akan', 'sudah', 'sedang', 'belum'], 1],
    ['Ibu ___ memasak sekarang. (Mum is cooking now.)', ['akan', 'sudah', 'sedang', 'belum'], 2],
    ['Kami ___ pergi ke pantai esok. (We will go to the beach tomorrow.)', ['sudah', 'sedang', 'belum', 'akan'], 3],
    ['Dia ___ tiba. (He has not arrived yet.)', ['belum', 'akan', 'sudah', 'sedang'], 0],
    ['Which word shows the FUTURE?', ['sudah', 'sedang', 'akan', 'belum'], 2]
  ]},
{ id: 'G5', title: 'Kata Penjodoh Bilangan', en: 'Counting words (classifiers)', icon: '🔟',
  lesson: [
    ['orang', 'people: tiga orang murid = three pupils'], ['ekor', 'animals: dua ekor kucing = two cats'],
    ['buah', 'big things – houses, cars, books, countries: sebuah rumah = a house'], ['biji', 'small round things – eggs, fruit: dua biji telur = two eggs'],
    ['helai', 'thin flat things – shirts, paper: sehelai baju = a shirt'], ['batang', 'long thin things – pens, trees: sebatang pen = a pen']
  ],
  tip: '"se-" + classifier = "one" (seorang, seekor, sebuah). Beware: "beberapa" means "several / some".',
  quiz: [
    ['Saya ada dua ___ kucing.', ['orang', 'ekor', 'biji', 'helai'], 1],
    ['Tiga ___ murid berada di dalam kelas.', ['buah', 'biji', 'orang', 'ekor'], 2],
    ['Dia makan dua ___ telur.', ['biji', 'orang', 'buah', 'ekor'], 0],
    ['Kami tinggal di dua ___ rumah.', ['helai', 'buah', 'ekor', 'orang'], 1],
    ['Ibu membeli sehelai ___.', ['baju', 'pen', 'kucing', 'telur'], 0]
  ]},
{ id: 'G6', title: 'Kata Tanya', en: 'Question words', icon: '❓',
  lesson: [
    ['apa', 'what'], ['siapa', 'who'], ['di mana', 'where (at)'], ['ke mana', 'where to'], ['dari mana', 'where from'],
    ['bila', 'when'], ['kenapa / mengapa', 'why'], ['bagaimana', 'how'], ['berapa', 'how many / how much'], ['yang mana', 'which']
  ],
  tip: 'Question words usually come at the START (Apa nama awak?) or the END (Nama awak apa?). Answer with "kerana / sebab" (because) for kenapa.',
  quiz: [
    ['___ nama awak? (What is your name?)', ['Siapa', 'Apa', 'Bila', 'Berapa'], 1],
    ['___ dia? (Who is she?)', ['Siapa', 'Apa', 'Kenapa', 'Di mana'], 0],
    ['Awak tinggal ___? (Where do you live?)', ['bila', 'berapa', 'di mana', 'siapa'], 2],
    ['___ harga baju ini? (How much is this shirt?)', ['Bila', 'Berapa', 'Apa', 'Ke mana'], 1],
    ['___ awak tidak datang? (Why did you not come?)', ['Kenapa', 'Siapa', 'Berapa', 'Dari mana'], 0]
  ]},
{ id: 'G7', title: 'Kata Sendi', en: 'Prepositions', icon: '📍',
  lesson: [
    ['di', 'at / in / on (a place) – written joined to nothing: di rumah'], ['ke', 'to (a place): ke sekolah'],
    ['dari', 'from (a place): dari Kuala Lumpur'], ['daripada', 'from (a person / thing), also "than": daripada nenek'],
    ['kepada', 'to (a person): kepada cikgu'], ['dengan', 'with / by (transport): dengan bas'],
    ['untuk', 'for: untuk ibu'], ['pada', 'on / at (time): pada hari Isnin']
  ],
  tip: 'Place = di / ke / dari. Person = kepada / daripada. Time = pada. Watch out: di- as a prefix (dimakan) is joined, but di as a preposition (di rumah) is separate.',
  quiz: [
    ['Saya tinggal ___ Kuala Lumpur.', ['ke', 'di', 'dari', 'pada'], 1],
    ['Kami pergi ___ sekolah.', ['di', 'dari', 'ke', 'untuk'], 2],
    ['Hadiah ini ___ ibu saya. (This gift is for my mum.)', ['untuk', 'di', 'pada', 'dari'], 0],
    ['Saya menerima surat ___ nenek. (from Grandma)', ['ke', 'di', 'daripada', 'untuk'], 2],
    ['Dia pergi ke sekolah ___ bas. (by bus)', ['pada', 'dengan', 'di', 'kepada'], 1],
    ['Kami bertemu ___ hari Isnin. (on Monday)', ['pada', 'ke', 'di', 'dari'], 0]
  ]},
{ id: 'G8', title: 'Kata Sifat & Perbandingan', en: 'Adjectives & comparing', icon: '📏',
  lesson: [
    ['sangat / amat', 'very. Makanan ini sangat sedap.'], ['lebih … daripada', 'more … than. Abang lebih tinggi daripada saya.'],
    ['paling', 'the most (-est). Dia paling pandai. = He is the cleverest.'], ['se-', 'as … as. Dia setinggi saya. = He is as tall as me.'],
    ['kurang', 'less. Kurang manis = less sweet.']
  ],
  tip: 'Adjectives come AFTER the noun: kereta merah (red car), rumah besar (big house). Put "paling" in front to make it superlative.',
  quiz: [
    ['Gajah ___ besar daripada kucing.', ['paling', 'lebih', 'sangat', 'kurang'], 1],
    ['Dia murid yang ___ pandai dalam kelas. (the cleverest)', ['lebih', 'kurang', 'paling', 'daripada'], 2],
    ['Makanan ini ___ sedap. (very delicious)', ['sangat', 'lebih', 'paling', 'kurang'], 0],
    ['Kakak lebih tinggi ___ saya.', ['dengan', 'daripada', 'kepada', 'untuk'], 1],
    ['Which is correct for "a red car"?', ['merah kereta', 'kereta merah', 'sangat kereta', 'kereta ialah merah'], 1]
  ]},
{ id: 'G9', title: 'Milik & -nya', en: 'Possession', icon: '🎒',
  lesson: [
    ['buku saya', 'my book (owner comes AFTER the thing)'], ['kereta ayah', "Dad's car"], ['rumah kami', 'our house (not including you)'],
    ['sekolah mereka', 'their school'], ['namanya', 'his / her name (-nya = his / her / its / the)'], ['rumahnya', 'his / her house']
  ],
  tip: 'English says "my book"; Malay says "book my" – buku saya. There is no \'s: kereta ayah = Dad\'s car.',
  quiz: [
    ['How do you say "my book"?', ['saya buku', 'buku saya', 'buku ialah saya', 'buku ke saya'], 1],
    ['How do you say "Dad\'s car"?', ['ayah kereta', 'kereta di ayah', 'kereta ayah', 'kereta untuk ayah'], 2],
    ['How do you say "Her name is Aina"?', ['Namanya Aina.', 'Nama dia ke Aina.', 'Aina nama dirinya.', 'Dia nama Aina.'], 0],
    ['How do you say "our house"? (not including you)', ['rumah mereka', 'rumah dia', 'rumah kami', 'rumah anda'], 2],
    ['How do you say "their school"?', ['mereka sekolah', 'sekolah kami', 'sekolah mereka', 'sekolah saya'], 2]
  ]},
{ id: 'G10', title: 'Kata Hubung', en: 'Joining words', icon: '🔗',
  lesson: [
    ['dan', 'and'], ['atau', 'or'], ['tetapi', 'but'], ['kerana / sebab', 'because'], ['jadi', 'so'],
    ['sambil', 'while / as (two things at once)'], ['walaupun', 'although'], ['kecuali', 'except'], ['supaya', 'so that'], ['jika / kalau', 'if']
  ],
  tip: 'Use joining words to make longer sentences – examiners love them! Saya lapar kerana belum sarapan. = I am hungry because I have not had breakfast.',
  quiz: [
    ['Saya suka nasi ___ ayam. (rice AND chicken)', ['atau', 'dan', 'tetapi', 'kerana'], 1],
    ['Awak mahu teh ___ kopi? (tea OR coffee)', ['dan', 'sambil', 'atau', 'jadi'], 2],
    ['Dia penat ___ dia tidak tidur. (because)', ['tetapi', 'kerana', 'atau', 'walaupun'], 1],
    ['Saya mahu keluar, ___ hujan turun. (but)', ['dan', 'jadi', 'tetapi', 'supaya'], 2],
    ['Dia makan ___ menonton televisyen. (while)', ['sambil', 'atau', 'kerana', 'kecuali'], 0],
    ['___ hujan, kami pergi ke pantai. (Although)', ['Kerana', 'Walaupun', 'Supaya', 'Atau'], 1]
  ]},
{ id: 'G11', title: 'Kata Kerja: ber- & me-', en: 'Verb prefixes', icon: '⚙️',
  lesson: [
    ['ber-', 'berjalan (walk), bermain (play), berlari (run), berenang (swim), bekerja (work), belajar (study)'],
    ['me- + baca', 'membaca (read) – me- becomes mem- before b'], ['me- + tulis', 'menulis (write) – t drops, me- becomes men-'],
    ['me- + masak', 'memasak (cook) – m stays, me- becomes mem-'], ['me- + beli', 'membeli (buy)'],
    ['me- + tonton', 'menonton (watch)'], ['me- + dengar', 'mendengar (listen)']
  ],
  tip: 'Most verbs you meet in school Malay start with ber- or me-. You do not need to master the rules yet – just learn each verb as a whole word!',
  quiz: [
    ['Root word "baca" becomes…', ['berbaca', 'membaca', 'menbaca', 'dibaca'], 1],
    ['Root word "masak" becomes…', ['memasak', 'bermasak', 'menmasak', 'masakan'], 0],
    ['"berenang" means…', ['to read', 'to cook', 'to swim', 'to buy'], 2],
    ['Root word "tulis" becomes…', ['membulis', 'menulis', 'bertulis', 'mentulis'], 1],
    ['Saya ___ bola sepak. (I play football.)', ['memasak', 'menulis', 'bermain', 'membeli'], 2]
  ]},
{ id: 'G12', title: 'Arahan & Sopan', en: 'Commands & polite requests', icon: '📣',
  lesson: [
    ['sila', 'please (invite): Sila duduk. = Please sit.'], ['tolong', 'please help / could you: Tolong tutup pintu. = Please close the door.'],
    ['jangan', "don't: Jangan bising! = Don't be noisy!"], ['mari', "let's / come: Mari kita pergi! = Let's go!"],
    ['boleh', 'can / may: Boleh saya keluar? = May I go out?'], ['mesti', 'must: Kita mesti belajar. = We must study.']
  ],
  tip: '"Boleh" is super useful for speaking exams: Boleh saya minta air? = Can I have some water? Add "tolong" to be extra polite.',
  quiz: [
    ['___ duduk. (Please sit – you are inviting someone.)', ['Jangan', 'Sila', 'Mari', 'Belum'], 1],
    ['___ bising! (Don\'t be noisy!)', ['Jangan', 'Sila', 'Boleh', 'Mesti'], 0],
    ['___ kita pergi! (Let us go!)', ['Tolong', 'Jangan', 'Mari', 'Tidak'], 2],
    ['___ tutup pintu. (Please help by closing the door.)', ['Mari', 'Tolong', 'Mesti', 'Belum'], 1],
    ['Saya ___ berenang. (I can swim.)', ['mesti', 'jangan', 'boleh', 'sila'], 2]
  ]}
];

/* ─────────── Ranks (XP) ─────────── */
const ranks = [
  { xp: 0,    name: 'Pelajar Akademi',   short: 'Student',  icon: '🥋' },
  { xp: 150,  name: 'Genin',             short: 'Genin',    icon: '🥷' },
  { xp: 400,  name: 'Chunin',            short: 'Chunin',   icon: '🍃' },
  { xp: 800,  name: 'Tokubetsu Jonin',   short: 'Special Jonin', icon: '🌀' },
  { xp: 1400, name: 'Jonin',             short: 'Jonin',    icon: '⚔️' },
  { xp: 2200, name: 'ANBU',              short: 'ANBU',     icon: '🎭' },
  { xp: 3500, name: 'Kage',              short: 'Kage',     icon: '👑' }
];

return { worlds, units, scrolls, ranks };
})();
