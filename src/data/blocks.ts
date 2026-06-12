// Building blocks that the story engine mixes together to create
// hundreds of unique bedtime tales.

export interface Hero {
  name: string;
  emoji: string;
  kind: string; // "little bunny", used inside sentences
  pronoun: 'she' | 'he';
  Pronoun: 'She' | 'He';
  their: 'her' | 'his';
}

export interface Friend {
  name: string;
  emoji: string;
  kind: string;
}

export interface Setting {
  id: string;
  name: string; // "the Whispering Woods"
  emoji: string;
  sky: 'night' | 'dusk' | 'aurora' | 'underwater' | 'space';
  gradient: string; // tailwind gradient classes for the scene background
  ambient: string[]; // little emojis that drift around the scene
  ground: string[]; // emoji row along the bottom of the stage
}

export interface MagicObject {
  name: string; // "golden acorn"
  emoji: string;
}

const her = { pronoun: 'she', Pronoun: 'She', their: 'her' } as const;
const him = { pronoun: 'he', Pronoun: 'He', their: 'his' } as const;

export const HEROES: Hero[] = [
  { name: 'Luna', emoji: '🐰', kind: 'little bunny', ...her },
  { name: 'Bruno', emoji: '🐻', kind: 'fuzzy bear cub', ...him },
  { name: 'Felix', emoji: '🦊', kind: 'clever little fox', ...him },
  { name: 'Olive', emoji: '🦉', kind: 'wise baby owl', ...her },
  { name: 'Pip', emoji: '🐧', kind: 'waddly penguin', ...him },
  { name: 'Kiki', emoji: '🐱', kind: 'curious kitten', ...her },
  { name: 'Banjo', emoji: '🐶', kind: 'bouncy puppy', ...him },
  { name: 'Milo', emoji: '🐭', kind: 'tiny brave mouse', ...him },
  { name: 'Ellie', emoji: '🐘', kind: 'gentle baby elephant', ...her },
  { name: 'Hazel', emoji: '🦔', kind: 'snuggly hedgehog', ...her },
  { name: 'Daisy', emoji: '🦆', kind: 'cheerful duckling', ...her },
  { name: 'Coco', emoji: '🐨', kind: 'sleepy koala', ...her },
  { name: 'Sparky', emoji: '🐉', kind: 'small friendly dragon', ...him },
  { name: 'Stella', emoji: '🦄', kind: 'gentle young unicorn', ...her },
  { name: 'Tilly', emoji: '🐯', kind: 'playful tiger cub', ...her },
  { name: 'Rocky', emoji: '🦝', kind: 'silly raccoon', ...him },
  { name: 'Lily', emoji: '🐑', kind: 'soft little lamb', ...her },
  { name: 'Freddie', emoji: '🐸', kind: 'hoppy green frog', ...him },
  { name: 'Sunny', emoji: '🐿️', kind: 'busy little squirrel', ...her },
  { name: 'Pomelo', emoji: '🐼', kind: 'roly-poly panda', ...him },
];

export const FRIENDS: Friend[] = [
  { name: 'Glow', emoji: '🪲', kind: 'firefly' },
  { name: 'Bella', emoji: '🦋', kind: 'butterfly' },
  { name: 'Twinkle', emoji: '⭐', kind: 'little star' },
  { name: 'Sam', emoji: '🐌', kind: 'slow snail' },
  { name: 'Dot', emoji: '🐞', kind: 'ladybug' },
  { name: 'Buzz', emoji: '🐝', kind: 'bumblebee' },
  { name: 'Sheldon', emoji: '🐢', kind: 'old turtle' },
  { name: 'Pippa', emoji: '🐦', kind: 'songbird' },
  { name: 'Puff', emoji: '☁️', kind: 'fluffy cloud' },
  { name: 'Misty', emoji: '🦢', kind: 'graceful swan' },
  { name: 'Chirp', emoji: '🦗', kind: 'cricket' },
  { name: 'Finn', emoji: '🐠', kind: 'shiny fish' },
];

export const SETTINGS: Setting[] = [
  {
    id: 'woods', name: 'the Whispering Woods', emoji: '🌲', sky: 'night',
    gradient: 'from-indigo-950 via-indigo-900 to-emerald-950',
    ambient: ['🍃', '🪲', '🌿'], ground: ['🌲', '🌳', '🍄', '🌲', '🌳'],
  },
  {
    id: 'meadow', name: 'Starlight Meadow', emoji: '🌼', sky: 'night',
    gradient: 'from-indigo-950 via-purple-900 to-teal-900',
    ambient: ['🌼', '🦋', '✨'], ground: ['🌸', '🌼', '🌷', '🌿', '🌼'],
  },
  {
    id: 'mountain', name: 'Moonbeam Mountain', emoji: '⛰️', sky: 'night',
    gradient: 'from-slate-950 via-indigo-900 to-slate-800',
    ambient: ['❄️', '✨', '🦅'], ground: ['⛰️', '🏔️', '🌲', '⛰️', '🗻'],
  },
  {
    id: 'seaside', name: 'the Sleepy Seaside', emoji: '🌊', sky: 'dusk',
    gradient: 'from-indigo-900 via-purple-800 to-cyan-900',
    ambient: ['🐚', '🌊', '✨'], ground: ['🌊', '🏖️', '🐚', '🌊', '⛵'],
  },
  {
    id: 'clouds', name: 'the Candy Cloud Kingdom', emoji: '☁️', sky: 'dusk',
    gradient: 'from-purple-900 via-pink-900 to-indigo-900',
    ambient: ['☁️', '🍭', '✨'], ground: ['☁️', '🌈', '☁️', '🍬', '☁️'],
  },
  {
    id: 'firefly', name: 'Firefly Forest', emoji: '✨', sky: 'night',
    gradient: 'from-emerald-950 via-teal-950 to-indigo-950',
    ambient: ['✨', '🪲', '💛'], ground: ['🌳', '🌿', '🍄', '🌳', '🌿'],
  },
  {
    id: 'cave', name: 'the Crystal Cave', emoji: '💎', sky: 'night',
    gradient: 'from-slate-950 via-violet-950 to-fuchsia-950',
    ambient: ['💎', '✨', '🔮'], ground: ['🪨', '💎', '🪨', '💎', '🪨'],
  },
  {
    id: 'rainbow', name: 'Rainbow Valley', emoji: '🌈', sky: 'dusk',
    gradient: 'from-indigo-900 via-purple-900 to-rose-900',
    ambient: ['🌈', '🦋', '🌸'], ground: ['🌈', '🌺', '🌈', '🌻', '🌈'],
  },
  {
    id: 'snowy', name: 'the Snowy Pinetops', emoji: '❄️', sky: 'night',
    gradient: 'from-slate-900 via-blue-950 to-indigo-950',
    ambient: ['❄️', '⛄', '✨'], ground: ['🌲', '⛄', '🌲', '❄️', '🌲'],
  },
  {
    id: 'lagoon', name: 'Bubble Lagoon', emoji: '🫧', sky: 'underwater',
    gradient: 'from-blue-950 via-cyan-900 to-teal-900',
    ambient: ['🫧', '🐠', '🪸'], ground: ['🪸', '🐚', '🌿', '🪸', '🐚'],
  },
  {
    id: 'sunflower', name: 'the Sunflower Field', emoji: '🌻', sky: 'dusk',
    gradient: 'from-indigo-900 via-violet-900 to-amber-900',
    ambient: ['🌻', '🐝', '🦋'], ground: ['🌻', '🌻', '🌾', '🌻', '🌻'],
  },
  {
    id: 'town', name: 'Twinkle Town', emoji: '🏘️', sky: 'night',
    gradient: 'from-indigo-950 via-blue-950 to-purple-950',
    ambient: ['🏮', '✨', '🌟'], ground: ['🏠', '🏡', '🏠', '💡', '🏡'],
  },
  {
    id: 'mushroom', name: 'Mushroom Village', emoji: '🍄', sky: 'night',
    gradient: 'from-purple-950 via-fuchsia-950 to-indigo-950',
    ambient: ['🍄', '🪲', '✨'], ground: ['🍄', '🍄', '🌿', '🍄', '🍄'],
  },
  {
    id: 'aurora', name: 'Northern Lights Bay', emoji: '🌌', sky: 'aurora',
    gradient: 'from-indigo-950 via-teal-900 to-purple-950',
    ambient: ['✨', '❄️', '💫'], ground: ['🧊', '🌊', '🧊', '🌊', '🧊'],
  },
  {
    id: 'lavender', name: 'the Lavender Hills', emoji: '💜', sky: 'dusk',
    gradient: 'from-indigo-950 via-purple-900 to-violet-900',
    ambient: ['💜', '🦋', '🌙'], ground: ['🪻', '🪻', '🌿', '🪻', '🪻'],
  },
  {
    id: 'space', name: 'the Dreamy Sky Garden', emoji: '🪐', sky: 'space',
    gradient: 'from-slate-950 via-indigo-950 to-violet-950',
    ambient: ['🪐', '💫', '🌟'], ground: ['☁️', '🌙', '☁️', '⭐', '☁️'],
  },
];

export const OBJECTS: MagicObject[] = [
  { name: 'golden acorn', emoji: '🌰' },
  { name: 'silver bell', emoji: '🔔' },
  { name: 'glowing pebble', emoji: '🪨' },
  { name: 'tiny lantern', emoji: '🏮' },
  { name: 'velvet blanket', emoji: '🧣' },
  { name: 'music box', emoji: '🎵' },
  { name: 'dream feather', emoji: '🪶' },
  { name: 'honey jar', emoji: '🍯' },
  { name: 'magic seed', emoji: '🌱' },
  { name: 'jar of starlight', emoji: '✨' },
  { name: 'wishing coin', emoji: '🪙' },
  { name: 'moonflower', emoji: '🌸' },
];
