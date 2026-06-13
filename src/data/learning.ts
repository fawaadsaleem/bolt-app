// Learning Time content: playgroup through grade two.

export interface LearnItem {
  display: string; // big visual: emoji, letter, word or number
  label: string; // short name: "Red", "A", "cat", "5"
  sub?: string; // flashcard subtitle: "A is for Apple 🍎"
  speak: string; // spoken when the flashcard is tapped
  hint?: string; // used inside quiz questions (animal sound, opposite…)
  color?: string; // css color — rendered as a big swatch instead of text
}

export interface LearnTopic {
  id: string;
  name: string;
  emoji: string;
  items: LearnItem[];
  quiz: 'find' | 'answer'; // find: tap the right picture · answer: tap the right label
  question: (item: LearnItem) => string; // shown AND spoken in play mode
}

export interface LearnLevel {
  id: string;
  name: string;
  age: string;
  emoji: string;
  topics: LearnTopic[];
}

/* ---------- playgroup ---------- */

const COLORS: LearnItem[] = [
  { display: '', label: 'Red', color: '#ef4444', speak: 'Red! Like a juicy apple!' },
  { display: '', label: 'Blue', color: '#3b82f6', speak: 'Blue! Like the big sky!' },
  { display: '', label: 'Green', color: '#22c55e', speak: 'Green! Like the grass!' },
  { display: '', label: 'Yellow', color: '#facc15', speak: 'Yellow! Like the sun!' },
  { display: '', label: 'Orange', color: '#fb923c', speak: 'Orange! Like a yummy orange!' },
  { display: '', label: 'Purple', color: '#a855f7', speak: 'Purple! Like sweet grapes!' },
  { display: '', label: 'Pink', color: '#f472b6', speak: 'Pink! Like a pretty flower!' },
  { display: '', label: 'Brown', color: '#92400e', speak: 'Brown! Like a teddy bear!' },
  { display: '', label: 'Black', color: '#1e293b', speak: 'Black! Like the night sky!' },
  { display: '', label: 'White', color: '#f8fafc', speak: 'White! Like fluffy clouds!' },
];

const SHAPES: LearnItem[] = [
  { display: '⭕', label: 'Circle', speak: 'Circle! Round and round like a ball!' },
  { display: '🟦', label: 'Square', speak: 'Square! Four sides, all the same!' },
  { display: '🔺', label: 'Triangle', speak: 'Triangle! One, two, three sides!' },
  { display: '⭐', label: 'Star', speak: 'Star! Twinkle twinkle little star!' },
  { display: '❤️', label: 'Heart', speak: 'Heart! Full of love!' },
  { display: '🔶', label: 'Diamond', speak: 'Diamond! Sparkly and pointy!' },
  { display: '🌙', label: 'Crescent', speak: 'Crescent! Like the sleepy moon!' },
  { display: '🥚', label: 'Oval', speak: 'Oval! Like a little egg!' },
];

const ANIMAL_SOUNDS: LearnItem[] = [
  { display: '🐄', label: 'Cow', hint: 'moo', speak: 'The cow says: moo, moo!' },
  { display: '🐶', label: 'Dog', hint: 'woof', speak: 'The dog says: woof, woof!' },
  { display: '🐱', label: 'Cat', hint: 'meow', speak: 'The cat says: meow, meow!' },
  { display: '🦆', label: 'Duck', hint: 'quack', speak: 'The duck says: quack, quack!' },
  { display: '🐑', label: 'Sheep', hint: 'baa', speak: 'The sheep says: baa, baa!' },
  { display: '🦁', label: 'Lion', hint: 'roar', speak: 'The lion says: roar!' },
  { display: '🐴', label: 'Horse', hint: 'neigh', speak: 'The horse says: neigh, neigh!' },
  { display: '🐸', label: 'Frog', hint: 'ribbit', speak: 'The frog says: ribbit, ribbit!' },
  { display: '🐷', label: 'Pig', hint: 'oink', speak: 'The pig says: oink, oink!' },
  { display: '🐝', label: 'Bee', hint: 'buzz', speak: 'The bee says: buzz, buzz!' },
];

/* ---------- letters & numbers ---------- */

const LETTER_DATA: [string, string, string, string][] = [
  // letter, word, emoji, phonic sound
  ['A', 'Apple', '🍎', 'ah'], ['B', 'Ball', '⚽', 'buh'], ['C', 'Cat', '🐱', 'kuh'],
  ['D', 'Dog', '🐶', 'duh'], ['E', 'Egg', '🥚', 'eh'], ['F', 'Fish', '🐟', 'fff'],
  ['G', 'Grapes', '🍇', 'guh'], ['H', 'Hat', '🎩', 'huh'], ['I', 'Ice cream', '🍦', 'ih'],
  ['J', 'Juice', '🧃', 'juh'], ['K', 'Kite', '🪁', 'kuh'], ['L', 'Lion', '🦁', 'lll'],
  ['M', 'Moon', '🌙', 'mmm'], ['N', 'Nest', '🪺', 'nnn'], ['O', 'Orange', '🍊', 'oh'],
  ['P', 'Penguin', '🐧', 'puh'], ['Q', 'Queen', '👑', 'kwuh'], ['R', 'Rainbow', '🌈', 'rrr'],
  ['S', 'Sun', '☀️', 'sss'], ['T', 'Tree', '🌳', 'tuh'], ['U', 'Umbrella', '☂️', 'uh'],
  ['V', 'Violin', '🎻', 'vvv'], ['W', 'Whale', '🐋', 'wuh'], ['X', 'Xylophone', '🎵', 'ks'],
  ['Y', 'Yo-yo', '🪀', 'yuh'], ['Z', 'Zebra', '🦓', 'zzz'],
];

const LETTERS: LearnItem[] = LETTER_DATA.map(([l, word, emoji]) => ({
  display: l,
  label: l,
  sub: `${l} is for ${word} ${emoji}`,
  speak: `${l}! ${l} is for ${word}!`,
}));

const PHONICS: LearnItem[] = LETTER_DATA.map(([l, word, emoji, sound]) => ({
  display: l,
  label: l,
  sub: `${l} says "${sound}" — ${word} ${emoji}`,
  hint: sound,
  speak: `${l} says ${sound}, ${sound}, ${word}!`,
}));

const NUMBER_WORDS = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen', 'twenty',
];

function numberItems(from: number, to: number): LearnItem[] {
  const items: LearnItem[] = [];
  for (let n = from; n <= to; n++) {
    items.push({
      display: String(n),
      label: String(n),
      sub: n <= 10 ? '🎈'.repeat(n) : NUMBER_WORDS[n - 1],
      speak: `${n}! ${NUMBER_WORDS[n - 1]}!`,
    });
  }
  return items;
}

/* ---------- words ---------- */

const CVC_WORDS: [string, string][] = [
  ['cat', '🐱'], ['dog', '🐶'], ['sun', '☀️'], ['hat', '🎩'], ['bed', '🛏️'],
  ['pig', '🐷'], ['cup', '☕'], ['bus', '🚌'], ['fox', '🦊'], ['jam', '🍓'],
];

const FIRST_WORDS: LearnItem[] = CVC_WORDS.map(([w, emoji]) => ({
  display: w,
  label: w,
  sub: emoji,
  speak: `${w.split('').join(', ')}, spells ${w}!`,
}));

const SIGHT_WORDS: LearnItem[] = [
  'the', 'and', 'you', 'was', 'are', 'said', 'have', 'they', 'this', 'what',
  'when', 'your',
].map((w) => ({
  display: w,
  label: w,
  speak: `${w}! Can you say ${w}?`,
}));

const OPPOSITES: LearnItem[] = [
  { display: 'big', label: 'small', sub: 'big 🐘 ↔ small 🐭', speak: 'The opposite of big is small!' },
  { display: 'hot', label: 'cold', sub: 'hot 🔥 ↔ cold ❄️', speak: 'The opposite of hot is cold!' },
  { display: 'up', label: 'down', sub: 'up ⬆️ ↔ down ⬇️', speak: 'The opposite of up is down!' },
  { display: 'happy', label: 'sad', sub: 'happy 😊 ↔ sad 😢', speak: 'The opposite of happy is sad!' },
  { display: 'day', label: 'night', sub: 'day ☀️ ↔ night 🌙', speak: 'The opposite of day is night!' },
  { display: 'fast', label: 'slow', sub: 'fast 🐇 ↔ slow 🐢', speak: 'The opposite of fast is slow!' },
  { display: 'open', label: 'closed', sub: 'open 📭 ↔ closed 📪', speak: 'The opposite of open is closed!' },
  { display: 'wet', label: 'dry', sub: 'wet 💧 ↔ dry 🏜️', speak: 'The opposite of wet is dry!' },
];

const SPELLING_WORDS: LearnItem[] = [
  'because', 'before', 'animal', 'mother', 'friend', 'school', 'water',
  'little', 'people', 'again',
].map((w) => ({
  display: w,
  label: w,
  speak: `${w.split('').join(', ')}, spells ${w}!`,
}));

/* ---------- math ---------- */

function additionItems(max: number): LearnItem[] {
  const items: LearnItem[] = [];
  for (let a = 1; a < max; a++) {
    for (let b = 1; a + b <= max; b++) {
      items.push({
        display: `${a} + ${b}`,
        label: String(a + b),
        speak: `${a} plus ${b} equals ${a + b}!`,
      });
    }
  }
  return items;
}

function subtractionItems(max: number): LearnItem[] {
  const items: LearnItem[] = [];
  for (let a = 2; a <= max; a++) {
    for (let b = 1; b < a; b++) {
      items.push({
        display: `${a} − ${b}`,
        label: String(a - b),
        speak: `${a} minus ${b} equals ${a - b}!`,
      });
    }
  }
  return items;
}

const COUNT_BY_TENS: LearnItem[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
  (n, i) => ({
    display: String(n),
    label: String(n),
    sub: `${i + 1} ten${i ? 's' : ''}`,
    speak: `${n}!`,
  })
);

/* ---------- levels ---------- */

export const LEVELS: LearnLevel[] = [
  {
    id: 'playgroup',
    name: 'Playgroup',
    age: 'ages 2–3',
    emoji: '🧸',
    topics: [
      {
        id: 'colors', name: 'Colors', emoji: '🌈', items: COLORS, quiz: 'find',
        question: (i) => `Find the color ${i.label}!`,
      },
      {
        id: 'shapes', name: 'Shapes', emoji: '🔺', items: SHAPES, quiz: 'find',
        question: (i) => `Find the ${i.label}!`,
      },
      {
        id: 'animal-sounds', name: 'Animal Sounds', emoji: '🐄', items: ANIMAL_SOUNDS, quiz: 'find',
        question: (i) => `Who says "${i.hint}"?`,
      },
    ],
  },
  {
    id: 'nursery',
    name: 'Nursery',
    age: 'ages 3–4',
    emoji: '🎨',
    topics: [
      {
        id: 'letters', name: 'Letters A–Z', emoji: '🔤', items: LETTERS, quiz: 'find',
        question: (i) => `Find the letter ${i.label}!`,
      },
      {
        id: 'numbers', name: 'Numbers 1–10', emoji: '🔢', items: numberItems(1, 10), quiz: 'find',
        question: (i) => `Find the number ${i.label}!`,
      },
    ],
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    age: 'ages 4–5',
    emoji: '✏️',
    topics: [
      {
        id: 'phonics', name: 'Letter Sounds', emoji: '🗣️', items: PHONICS, quiz: 'find',
        question: (i) => `Which letter says "${i.hint}"?`,
      },
      {
        id: 'numbers-20', name: 'Numbers 11–20', emoji: '🔟', items: numberItems(11, 20), quiz: 'find',
        question: (i) => `Find the number ${i.label}!`,
      },
      {
        id: 'first-words', name: 'First Words', emoji: '📖', items: FIRST_WORDS, quiz: 'find',
        question: (i) => `Find the word "${i.label}"!`,
      },
    ],
  },
  {
    id: 'grade1',
    name: 'Grade One',
    age: 'ages 5–6',
    emoji: '🎒',
    topics: [
      {
        id: 'sight-words', name: 'Sight Words', emoji: '👀', items: SIGHT_WORDS, quiz: 'find',
        question: (i) => `Find the word "${i.label}"!`,
      },
      {
        id: 'addition', name: 'Addition', emoji: '➕', items: additionItems(10), quiz: 'answer',
        question: (i) => `What is ${i.display}?`,
      },
      {
        id: 'opposites', name: 'Opposites', emoji: '↔️', items: OPPOSITES, quiz: 'answer',
        question: (i) => `What is the opposite of "${i.display}"?`,
      },
    ],
  },
  {
    id: 'grade2',
    name: 'Grade Two',
    age: 'ages 6–7',
    emoji: '🚀',
    topics: [
      {
        id: 'spelling', name: 'Big Words', emoji: '🔡', items: SPELLING_WORDS, quiz: 'find',
        question: (i) => `Find the word "${i.label}"!`,
      },
      {
        id: 'subtraction', name: 'Subtraction', emoji: '➖', items: subtractionItems(20), quiz: 'answer',
        question: (i) => `What is ${i.display}?`,
      },
      {
        id: 'tens', name: 'Counting by Tens', emoji: '💯', items: COUNT_BY_TENS, quiz: 'find',
        question: (i) => `Find the number ${i.label}!`,
      },
    ],
  },
];

export function getTopic(levelId: string, topicId: string) {
  const level = LEVELS.find((l) => l.id === levelId);
  const topic = level?.topics.find((t) => t.id === topicId);
  return level && topic ? { level, topic } : undefined;
}
