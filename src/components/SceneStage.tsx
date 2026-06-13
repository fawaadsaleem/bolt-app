import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Story } from '../data/stories';
import type { Mood } from '../data/plots';

interface Props {
  story: Story;
  sceneIndex: number;
}

interface Sprite {
  emoji: string;
  left: number; // percent
  top: number; // percent
  size: number; // rem
  delay: number; // s
  duration: number; // s
}

function seeded(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HERO_ANIM: Record<Mood, string> = {
  calm: 'anim-bob',
  happy: 'anim-bounce',
  curious: 'anim-wobble',
  worried: 'anim-bob',
  magic: 'anim-float',
  cozy: 'anim-breathe',
  sleepy: 'anim-breathe',
  brave: 'anim-bounce',
};

const MOOD_EFFECT: Record<Mood, string | null> = {
  calm: null,
  happy: '💛',
  curious: '❔',
  worried: '💭',
  magic: '✨',
  cozy: '🤍',
  sleepy: '💤',
  brave: '⭐',
};

// One-shot sparkle burst shown when a character is tapped.
function Burst() {
  const parts = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        bx: (Math.random() - 0.5) * 130,
        by: -30 - Math.random() * 90,
        delay: Math.random() * 0.12,
      })),
    []
  );
  return (
    <>
      {parts.map((p, i) => (
        <span
          key={i}
          className="burst-item left-1/2 top-1/3 text-2xl"
          style={
            {
              '--bx': `${p.bx}px`,
              '--by': `${p.by}px`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        >
          ✨
        </span>
      ))}
    </>
  );
}

export default function SceneStage({ story, sceneIndex }: Props) {
  const scene = story.scenes[sceneIndex];
  const { setting, hero, friend } = story;
  const showFriend = scene.text.includes(friend.name);

  // Tap-to-react characters + hidden star hunt.
  const [pop, setPop] = useState<{ who: 'hero' | 'friend'; key: number } | null>(null);
  const [found, setFound] = useState<number[]>([]);
  useEffect(() => {
    setPop(null);
    setFound([]);
  }, [story.id, sceneIndex]);

  const { stars, drifters, effects, hidden } = useMemo(() => {
    const rnd = seeded(story.id * 1000 + sceneIndex * 17 + 3);
    const stars: Sprite[] = [];
    const starCount = setting.sky === 'space' ? 26 : 18;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        emoji: rnd() > 0.85 ? '✧' : '✦',
        left: rnd() * 96,
        top: rnd() * 55,
        size: 0.4 + rnd() * 0.6,
        delay: rnd() * 4,
        duration: 1.8 + rnd() * 2.4,
      });
    }
    const drifters: Sprite[] = [];
    for (let i = 0; i < 4; i++) {
      drifters.push({
        emoji: setting.ambient[i % setting.ambient.length],
        left: 0,
        top: 12 + rnd() * 50,
        size: 1 + rnd() * 0.8,
        delay: rnd() * 14,
        duration: 16 + rnd() * 14,
      });
    }
    const effects: Sprite[] = [];
    const fx = MOOD_EFFECT[scene.mood];
    if (fx) {
      for (let i = 0; i < 5; i++) {
        effects.push({
          emoji: fx,
          left: 38 + rnd() * 26,
          top: 42 + rnd() * 18,
          size: 0.9 + rnd() * 0.7,
          delay: rnd() * 3,
          duration: 2.6 + rnd() * 2,
        });
      }
    }
    const hidden: Sprite[] = [];
    for (let i = 0; i < 3; i++) {
      hidden.push({
        emoji: '⭐',
        left: 6 + rnd() * 84,
        top: 8 + rnd() * 55,
        size: 1.05 + rnd() * 0.4,
        delay: rnd() * 2,
        duration: 3 + rnd() * 2,
      });
    }
    return { stars, drifters, effects, hidden };
  }, [story.id, sceneIndex, setting, scene.mood]);

  const isLast = sceneIndex === story.scenes.length - 1;

  return (
    <div
      key={`${story.id}-${sceneIndex}`}
      className={`anim-scene-in relative w-full overflow-hidden rounded-3xl bg-gradient-to-b ${setting.gradient} shadow-2xl shadow-purple-950/50 ring-1 ring-white/10`}
      style={{ height: 'min(46vh, 420px)' }}
    >
      {/* hidden-star counter */}
      <div className="absolute left-3 top-3 z-20 rounded-full bg-black/30 px-3 py-1 text-sm font-bold text-amber-200 backdrop-blur-sm">
        {found.length === 3 ? '🌟 You found all the stars!' : `⭐ ${found.length}/3`}
      </div>
      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="anim-twinkle pointer-events-none absolute select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}rem`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            color: '#fde68a',
          }}
        >
          {s.emoji}
        </span>
      ))}

      {/* aurora ribbons */}
      {setting.sky === 'aurora' && (
        <>
          <div
            className="absolute inset-x-0 top-4 h-24 rounded-full bg-gradient-to-r from-teal-400/30 via-fuchsia-400/30 to-emerald-400/30 blur-xl"
            style={{ animation: 'aurora-wave 7s ease-in-out infinite' }}
          />
          <div
            className="absolute inset-x-8 top-16 h-16 rounded-full bg-gradient-to-r from-purple-400/30 via-cyan-300/30 to-pink-300/30 blur-xl"
            style={{ animation: 'aurora-wave 9s ease-in-out 1s infinite' }}
          />
        </>
      )}

      {/* underwater shimmer */}
      {setting.sky === 'underwater' && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 to-transparent"
          style={{ animation: 'shimmer 5s ease-in-out infinite' }}
        />
      )}

      {/* moon */}
      <span
        className="anim-glow pointer-events-none absolute right-[8%] top-[8%] select-none text-5xl sm:text-6xl"
      >
        {setting.sky === 'space' ? '🪐' : setting.sky === 'underwater' ? '🫧' : '🌙'}
      </span>

      {/* drifting ambient emojis */}
      {drifters.map((d, i) => (
        <span
          key={`drift-${i}`}
          className="drift-item pointer-events-none select-none opacity-80"
          style={{
            top: `${d.top}%`,
            fontSize: `${d.size}rem`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        >
          {d.emoji}
        </span>
      ))}

      {/* hidden stars to find */}
      {hidden.map((h, i) =>
        found.includes(i) ? (
          <span
            key={`hid-${i}`}
            className="burst-item z-10"
            style={
              {
                left: `${h.left}%`,
                top: `${h.top}%`,
                fontSize: `${h.size * 1.4}rem`,
                '--bx': '0px',
                '--by': '-50px',
              } as CSSProperties
            }
          >
            🌟
          </span>
        ) : (
          <button
            key={`hid-${i}`}
            onClick={() => setFound((f) => [...f, i])}
            aria-label="A hidden star!"
            className="anim-twinkle absolute z-10 select-none"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: `${h.size}rem`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          >
            ⭐
          </button>
        )
      )}

      {/* mood effects rising around the hero */}
      {effects.map((e, i) => (
        <span
          key={`fx-${i}`}
          className="rise-item pointer-events-none select-none"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            fontSize: `${e.size}rem`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        >
          {e.emoji}
        </span>
      ))}

      {/* characters — tap them for a happy wiggle */}
      <div className="absolute inset-x-0 bottom-10 z-10 flex items-end justify-center gap-6 sm:gap-10">
        <button
          onClick={() => setPop({ who: 'hero', key: Date.now() })}
          aria-label={`Tickle ${hero.name}`}
          className="relative cursor-pointer select-none"
        >
          <span
            className={`${HERO_ANIM[scene.mood]} block text-7xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] sm:text-8xl`}
          >
            <span
              key={pop?.who === 'hero' ? pop.key : 'idle'}
              className={pop?.who === 'hero' ? 'anim-pop block' : 'block'}
            >
              {hero.emoji}
            </span>
          </span>
          {pop?.who === 'hero' && <Burst key={pop.key} />}
        </button>
        {showFriend && (
          <button
            onClick={() => setPop({ who: 'friend', key: Date.now() })}
            aria-label={`Tickle ${friend.name}`}
            className="relative cursor-pointer select-none"
          >
            <span className="anim-float block text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] sm:text-6xl">
              <span
                key={pop?.who === 'friend' ? pop.key : 'idle'}
                className={pop?.who === 'friend' ? 'anim-pop block' : 'block'}
              >
                {friend.emoji}
              </span>
            </span>
            {pop?.who === 'friend' && <Burst key={pop.key} />}
          </button>
        )}
        {isLast && (
          <span className="sleepy-z text-3xl" style={{ left: '58%', top: '-20%' }}>
            💤
          </span>
        )}
      </div>

      {/* ground */}
      <div className="absolute inset-x-0 bottom-0 flex justify-around bg-gradient-to-t from-black/40 to-transparent pb-1 pt-4 text-3xl sm:text-4xl">
        {setting.ground.map((g, i) => (
          <span
            key={i}
            className="anim-sway select-none"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}
