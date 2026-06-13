import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Moon, Search, Sparkles } from 'lucide-react';
import { CATEGORIES, getAllStories, STORY_COUNT } from '../data/stories';
import { useFavorites } from '../useFavorites';
import { useChildName } from '../useChildName';

const PAGE_SIZE = 48;

const CATEGORY_EMOJI: Record<string, string> = {
  Adventure: '🗺️',
  Friendship: '🤝',
  Magic: '✨',
  Kindness: '💗',
  'Sleepy Tales': '😴',
  Nature: '🌿',
};

export default function Library() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyFamous, setOnlyFamous] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { name: childName, setName: setChildName } = useChildName();

  // Deterministically interleave so neighbouring cards show different
  // heroes and plots (53 is coprime with the story count).
  const allStories = useMemo(() => {
    const all = getAllStories();
    return all.map((_, i) => all[(i * 53) % all.length]);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allStories.filter((s) => {
      if (onlyFavorites && !favorites.has(s.id)) return false;
      if (onlyFamous && !s.hero.famous) return false;
      if (category && s.category !== category) return false;
      if (
        q &&
        !s.title.toLowerCase().includes(q) &&
        !s.hero.name.toLowerCase().includes(q) &&
        !s.setting.name.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [allStories, search, category, onlyFavorites, onlyFamous, favorites]);

  const surpriseMe = () => {
    const pool = filtered.length ? filtered : allStories;
    const story = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/story/${story.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 text-purple-50">
      {/* header */}
      <header className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-3">
          <Moon className="anim-float text-amber-300" size={36} />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Dreamy Tales
          </h1>
          <span className="anim-twinkle text-3xl">✨</span>
        </div>
        <p className="text-lg text-purple-200">
          {STORY_COUNT} animated bedtime stories, read aloud just for you
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <label htmlFor="child-name" className="text-sm text-purple-300">
            Tonight's listener:
          </label>
          <input
            id="child-name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="your name ✏️"
            maxLength={20}
            className="w-36 rounded-full bg-white/10 px-4 py-1.5 text-center text-sm placeholder-purple-300/60 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </header>

      {/* surprise me + learning time */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={surpriseMe}
          className="anim-breathe flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-xl font-extrabold text-white shadow-lg shadow-purple-900/50 hover:from-pink-400 hover:to-purple-400"
        >
          <Sparkles size={24} /> Surprise me with a story!
        </button>
        <Link
          to="/learn"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-xl font-extrabold text-white shadow-lg shadow-teal-900/50 hover:from-emerald-400 hover:to-teal-400"
        >
          🎓 Learning Time!
        </Link>
      </div>

      {/* search + filters */}
      <div className="mb-6 flex flex-col items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search a hero or a place…"
            className="w-full rounded-full bg-white/10 py-3 pl-12 pr-4 text-lg placeholder-purple-300/60 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setCategory(null);
              setVisible(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              category === null
                ? 'bg-amber-400 text-indigo-950'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🌟 All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(category === c ? null : c);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                category === c
                  ? 'bg-amber-400 text-indigo-950'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {CATEGORY_EMOJI[c]} {c}
            </button>
          ))}
          <button
            onClick={() => {
              setOnlyFamous((f) => !f);
              setVisible(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              onlyFamous
                ? 'bg-amber-400 text-indigo-950'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            📺 Famous Pals
          </button>
          <button
            onClick={() => {
              setOnlyFavorites((f) => !f);
              setVisible(PAGE_SIZE);
            }}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold ${
              onlyFavorites
                ? 'bg-pink-500 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Heart size={14} className={onlyFavorites ? 'fill-white' : ''} />
            Favorites {favorites.size > 0 && `(${favorites.size})`}
          </button>
        </div>
      </div>

      {/* story grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-purple-300">
          <span className="mb-4 block text-6xl">🔭</span>
          <p className="text-xl">No stories found… try another search!</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-center text-sm text-purple-300/80">
            {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.slice(0, visible).map((story) => (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition-transform hover:-translate-y-1 hover:ring-purple-400/60"
              >
                <div
                  className={`flex h-28 items-center justify-center gap-2 bg-gradient-to-b ${story.setting.gradient} text-5xl sm:h-32`}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {story.hero.emoji}
                  </span>
                  <span className="text-3xl opacity-80">{story.setting.emoji}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(story.id);
                  }}
                  aria-label="Toggle favorite"
                  className="absolute right-2 top-2 rounded-full bg-black/30 p-2 backdrop-blur-sm hover:bg-black/50"
                >
                  <Heart
                    size={16}
                    className={
                      isFavorite(story.id)
                        ? 'fill-pink-400 text-pink-400'
                        : 'text-white/80'
                    }
                  />
                </button>
                <div className="p-3">
                  <h2 className="mb-1 line-clamp-2 text-sm font-extrabold leading-snug sm:text-base">
                    {story.title}
                  </h2>
                  <p className="text-xs text-purple-300">
                    {CATEGORY_EMOJI[story.category]} {story.category} · ~
                    {story.minutes} min
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full bg-white/10 px-8 py-3 font-bold hover:bg-white/20"
              >
                Show more stories ({filtered.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}

      <footer className="mt-12 text-center text-sm text-purple-300/60">
        Made with 💜 for sweet dreams · tap 🔊 in a story to hear it read aloud
      </footer>
    </div>
  );
}
