import { HEROES, FRIENDS, SETTINGS, OBJECTS } from './blocks';
import type { Hero, Friend, Setting, MagicObject } from './blocks';
import { PLOTS } from './plots';
import type { Category, SceneDef } from './plots';

export interface Story {
  id: number;
  title: string;
  category: Category;
  moral: string;
  hero: Hero;
  friend: Friend;
  setting: Setting;
  object: MagicObject;
  scenes: SceneDef[];
  minutes: number;
}

// Small deterministic RNG so every visitor gets the same 320 stories.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}

// Every hero stars in every plot exactly once: 20 heroes x 16 plots = 320 stories.
export const STORY_COUNT = HEROES.length * PLOTS.length;

const cache = new Map<number, Story>();

export function getStory(id: number): Story | undefined {
  if (id < 0 || id >= STORY_COUNT) return undefined;
  const cached = cache.get(id);
  if (cached) return cached;

  const plot = PLOTS[id % PLOTS.length];
  const hero = HEROES[Math.floor(id / PLOTS.length) % HEROES.length];
  const rnd = mulberry32(id * 2654435761 + 7);
  const friend = pick(FRIENDS, rnd);
  const setting = pick(SETTINGS, rnd);
  const object = pick(OBJECTS, rnd);

  const ctx = { hero, friend, setting, object };
  const scenes = plot.scenes(ctx);
  const story: Story = {
    id,
    title: plot.title(ctx),
    category: plot.category,
    moral: plot.moral,
    hero,
    friend,
    setting,
    object,
    scenes,
    minutes: Math.max(2, Math.round(scenes.length * 0.5)),
  };
  cache.set(id, story);
  return story;
}

export function getAllStories(): Story[] {
  const stories: Story[] = [];
  for (let i = 0; i < STORY_COUNT; i++) stories.push(getStory(i)!);
  return stories;
}

export const CATEGORIES: Category[] = [
  'Adventure',
  'Friendship',
  'Magic',
  'Kindness',
  'Sleepy Tales',
  'Nature',
];
