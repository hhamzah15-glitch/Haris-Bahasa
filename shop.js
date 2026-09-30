/* Wardrobe & abilities catalogue for the Kedai (shop).
   Costume sets equip several slots at once. Gear fits one slot. Auras are glowing effects.
   Abilities are expensive upgrades that give real perks in missions.
   Add your own items here – no other code changes needed. */
window.BAHASA_SHOP = {
  sets: [
    { id: 'halloween', name: 'Halloween', cost: 150, slots: { head: '🎃', held: '🕯️', back: '🦇', aura: 'shadow' } },
    { id: 'krismas', name: 'Krismas', cost: 150, slots: { head: '🎄', held: '🎁', back: '🧣', aura: 'ice' } },
    { id: 'rock', name: 'Bintang Rock', cost: 220, slots: { head: '🎧', face: '🕶️', held: '🎸', aura: 'rainbow' } },
    { id: 'fire', name: 'Ninja Api', cost: 300, slots: { head: '🔥', face: '😷', held: '🗡️', aura: 'fire' } },
    { id: 'water', name: 'Ninja Air', cost: 300, slots: { head: '💧', face: '😷', held: '🔱', aura: 'water' } },
    { id: 'wind', name: 'Ninja Angin', cost: 300, slots: { head: '🌀', face: '😷', held: '🪃', aura: 'wind' } },
    { id: 'lightning', name: 'Ninja Petir', cost: 350, slots: { head: '⚡', face: '😷', held: '🗡️', aura: 'lightning' } },
    { id: 'earth', name: 'Ninja Bumi', cost: 300, slots: { head: '⛰️', face: '😷', held: '🛡️', aura: 'gold' } },
    { id: 'samurai', name: 'Samurai', cost: 280, slots: { head: '🪖', held: '⚔️', back: '🎌' } },
    { id: 'wizard', name: 'Ahli Sihir', cost: 260, slots: { head: '🎩', held: '🪄', aura: 'purple' } },
    { id: 'pirate', name: 'Lanun', cost: 240, slots: { head: '🏴‍☠️', face: '👓', held: '🗡️' } },
    { id: 'sakura', name: 'Festival Sakura', cost: 200, slots: { head: '🌸', held: '🏮', aura: 'sakura' } },
    { id: 'raya', name: 'Hari Raya', cost: 200, slots: { head: '🌙', held: '🏮', back: '🎇', aura: 'gold' } },
    { id: 'cny', name: 'Tahun Baru Cina', cost: 200, slots: { head: '🐉', held: '🧧', aura: 'fire' } },
    { id: 'deepavali', name: 'Deepavali', cost: 200, slots: { head: '🪷', held: '🪔', aura: 'gold' } },
    { id: 'royal', name: 'Kage Diraja', cost: 600, slots: { head: '👑', held: '📜', back: '🎖️', aura: 'gold' } }
  ],
  gear: {
    head: [
      { e: '🧢', name: 'Topi Kap', cost: 40 }, { e: '👒', name: 'Topi Jerami', cost: 50 }, { e: '🎩', name: 'Topi Tinggi', cost: 60 },
      { e: '🎧', name: 'Fon Kepala', cost: 70 }, { e: '⛑️', name: 'Topi Keledar', cost: 70 }, { e: '🎓', name: 'Topi Graduasi', cost: 80 },
      { e: '🪖', name: 'Helmet Perang', cost: 90 }, { e: '👑', name: 'Mahkota', cost: 300 }
    ],
    face: [
      { e: '😷', name: 'Topeng Ninja', cost: 40 }, { e: '👓', name: 'Cermin Mata', cost: 40 }, { e: '🕶️', name: 'Cermin Hitam', cost: 50 },
      { e: '🥽', name: 'Gogal', cost: 60 }, { e: '🎭', name: 'Topeng Misteri', cost: 120 }
    ],
    held: [
      { e: '📜', name: 'Gulungan', cost: 60 }, { e: '🗡️', name: 'Belati', cost: 80 }, { e: '🎸', name: 'Gitar', cost: 90 },
      { e: '🪄', name: 'Tongkat Sihir', cost: 100 }, { e: '⚔️', name: 'Pedang', cost: 100 }, { e: '🛡️', name: 'Perisai', cost: 110 },
      { e: '🏹', name: 'Busur', cost: 120 }, { e: '🔱', name: 'Trisula', cost: 150 }
    ],
    back: [
      { e: '🧣', name: 'Skarf', cost: 50 }, { e: '🎒', name: 'Beg Belakang', cost: 60 }, { e: '🦇', name: 'Sayap Kelawar', cost: 100 },
      { e: '🦋', name: 'Sayap Rama-rama', cost: 120 }, { e: '🐲', name: 'Naga Kecil', cost: 400 }
    ]
  },
  auras: [
    { id: 'fire', name: 'Aura Api', cost: 150 }, { id: 'water', name: 'Aura Air', cost: 150 }, { id: 'wind', name: 'Aura Angin', cost: 150 },
    { id: 'ice', name: 'Aura Ais', cost: 150 }, { id: 'sakura', name: 'Aura Sakura', cost: 150 }, { id: 'lightning', name: 'Aura Petir', cost: 200 },
    { id: 'shadow', name: 'Aura Bayang', cost: 200 }, { id: 'purple', name: 'Aura Sihir', cost: 200 }, { id: 'gold', name: 'Aura Emas', cost: 350 },
    { id: 'rainbow', name: 'Aura Pelangi', cost: 500 }
  ],
  abilities: [
    { id: 'pusaran', name: 'Bola Pusaran Chakra', en: 'Whirling Chakra Sphere', fx: '🌀', cost: 800, perk: 'Chakra Burst comes every 4 correct answers instead of 5.' },
    { id: 'klon', name: 'Klon Bayang', en: 'Shadow Clone', fx: '👥', cost: 1000, perk: 'Your first mistake in each mission does NOT break your combo.' },
    { id: 'mata', name: 'Mata Ilusi Bulan', en: 'Moon Illusion Eye', fx: '👁️', cost: 1200, perk: 'One free hint (Petunjuk) in every mission.' },
    { id: 'naga', name: 'Naga Api', en: 'Fire Dragon', fx: '🐲', cost: 1500, perk: '+20% ryo from every mission.' },
    { id: 'kilat', name: 'Bilah Kilat', en: 'Lightning Blade', fx: '⚡', cost: 1800, perk: '+5 XP for every word you type correctly.' },
    { id: 'bijak', name: 'Mod Bijak', en: 'Sage Mode', fx: '🍃', cost: 2000, perk: '+15% XP from every mission.' }
  ]
};
