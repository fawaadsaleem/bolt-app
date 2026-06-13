import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { getStory, STORY_COUNT } from '../data/stories';
import SceneStage from './SceneStage';
import { useFavorites } from '../useFavorites';
import { useChildName } from '../useChildName';

// Pick the gentlest-sounding English voice available on the device.
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  if (!voices.length) return null;
  const english = voices.filter((v) => v.lang.startsWith('en'));
  const pool = english.length ? english : voices;
  const preferred = pool.find((v) =>
    /female|samantha|karen|moira|tessa|victoria|zira|aria|jenny|natasha/i.test(v.name)
  );
  return preferred ?? pool[0];
}

export default function StoryPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storyId = Number(id);
  const story = Number.isInteger(storyId) ? getStory(storyId) : undefined;

  const [scene, setScene] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [finished, setFinished] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { name: rawChildName } = useChildName();
  const childName = rawChildName.trim();

  // Weave the listening child into the opening and closing of every story.
  const personalize = useCallback(
    (text: string, idx: number) => {
      if (!childName || !story) return text;
      if (idx === 0) return `Snuggle in, ${childName}. ${text}`;
      if (idx === story.scenes.length - 1)
        return `${text} And goodnight to you too, ${childName}.`;
      return text;
    },
    [childName, story]
  );

  const autoRef = useRef(autoPlay);
  autoRef.current = autoPlay;
  const soundRef = useRef(soundOn);
  soundRef.current = soundOn;
  const timerRef = useRef<number | null>(null);

  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stopAll = useCallback(() => {
    if (speechSupported) window.speechSynthesis.cancel();
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [speechSupported]);

  const goTo = useCallback(
    (next: number) => {
      stopAll();
      if (!story) return;
      if (next >= story.scenes.length) {
        setFinished(true);
        setAutoPlay(false);
      } else if (next >= 0) {
        setFinished(false);
        setScene(next);
      }
    },
    [story, stopAll]
  );

  // Narrate the current scene (and auto-advance when in auto-play mode).
  useEffect(() => {
    if (!story || finished) return;
    stopAll();
    const text = personalize(story.scenes[scene].text, scene);

    const scheduleAdvance = (ms: number) => {
      timerRef.current = window.setTimeout(() => {
        if (autoRef.current) goTo(scene + 1);
      }, ms);
    };

    if (soundOn && speechSupported) {
      const speak = () => {
        const utter = new SpeechSynthesisUtterance(text);
        const voice = pickVoice();
        if (voice) utter.voice = voice;
        utter.rate = 0.88;
        utter.pitch = 1.05;
        utter.onend = () => {
          if (autoRef.current) scheduleAdvance(1600);
        };
        window.speechSynthesis.speak(utter);
      };
      // Voices may load asynchronously the first time.
      if (window.speechSynthesis.getVoices().length) {
        speak();
      } else {
        const onVoices = () => {
          window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
          if (soundRef.current) speak();
        };
        window.speechSynthesis.addEventListener('voiceschanged', onVoices);
        // Fallback if voiceschanged never fires.
        timerRef.current = window.setTimeout(() => {
          window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
          if (soundRef.current && !window.speechSynthesis.speaking) speak();
        }, 600);
      }
    } else if (autoPlay) {
      // No narration: advance on a gentle reading-speed timer.
      scheduleAdvance(Math.max(6000, text.length * 65));
    }

    return stopAll;
  }, [story, scene, soundOn, autoPlay, finished, speechSupported, stopAll, goTo, personalize]);

  useEffect(() => stopAll, [stopAll]);

  if (!story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-purple-100">
        <span className="text-6xl">🌙</span>
        <p className="text-xl">Oops, that story floated away…</p>
        <Link to="/" className="rounded-full bg-purple-600 px-6 py-2 font-bold">
          Back to the library
        </Link>
      </div>
    );
  }

  const fav = isFavorite(story.id);
  const current = story.scenes[scene];

  // Suggest the next bedtime story (same hero, next plot).
  const nextStoryId = (story.id + 1) % STORY_COUNT;

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-6 pt-4 text-purple-50">
      {/* top bar */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            stopAll();
            navigate('/');
          }}
          className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Library
        </button>
        <h1 className="flex-1 truncate text-center text-base font-extrabold sm:text-xl">
          {story.title}
        </h1>
        <button
          onClick={() => toggleFavorite(story.id)}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"
        >
          <Heart
            size={18}
            className={fav ? 'fill-pink-400 text-pink-400' : 'text-purple-200'}
          />
        </button>
      </div>

      {finished ? (
        /* ---- The End ---- */
        <div className="anim-scene-in flex flex-1 flex-col items-center justify-center gap-5 rounded-3xl bg-gradient-to-b from-indigo-950 to-purple-950 p-8 text-center ring-1 ring-white/10">
          <div className="flex gap-3 text-4xl">
            <span className="anim-twinkle">⭐</span>
            <span className="anim-twinkle" style={{ animationDelay: '0.5s' }}>🌙</span>
            <span className="anim-twinkle" style={{ animationDelay: '1s' }}>⭐</span>
          </div>
          <p className="text-3xl font-extrabold">The End</p>
          <p className="max-w-md text-lg text-purple-200">
            <span className="text-2xl">{story.hero.emoji}</span>{' '}
            {story.moral}
          </p>
          <p className="text-xl text-purple-300">
            Sweet dreams{childName ? `, ${childName}` : ''}! 💤
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setFinished(false);
                setScene(0);
              }}
              className="rounded-full bg-white/10 px-6 py-3 font-bold hover:bg-white/20"
            >
              Read it again
            </button>
            <button
              onClick={() => {
                stopAll();
                setFinished(false);
                setScene(0);
                navigate(`/story/${nextStoryId}`);
              }}
              className="rounded-full bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
            >
              One more story →
            </button>
          </div>
        </div>
      ) : (
        <>
          <SceneStage story={story} sceneIndex={scene} />

          {/* story text */}
          <div
            key={scene}
            className="anim-text-in mt-4 flex-1 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6"
          >
            <p className="text-lg leading-relaxed text-purple-50 sm:text-2xl sm:leading-relaxed">
              {personalize(current.text, scene)}
            </p>
          </div>

          {/* progress dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {story.scenes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-3 rounded-full transition-all ${
                  i === scene
                    ? 'w-8 bg-amber-300'
                    : i < scene
                      ? 'w-3 bg-purple-400'
                      : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* controls */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => goTo(scene - 1)}
              disabled={scene === 0}
              aria-label="Previous page"
              className="rounded-full bg-white/10 p-4 hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setSoundOn((s) => !s)}
              aria-label={soundOn ? 'Turn voice off' : 'Turn voice on'}
              title="Read-aloud voice"
              className={`rounded-full p-4 ${
                soundOn ? 'bg-amber-400/90 text-indigo-950' : 'bg-white/10'
              }`}
            >
              {soundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <button
              onClick={() => setAutoPlay((a) => !a)}
              aria-label={autoPlay ? 'Pause auto-play' : 'Start auto-play'}
              title="Auto-play the whole story"
              className={`rounded-full p-5 ${
                autoPlay
                  ? 'bg-pink-500 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              {autoPlay ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button
              onClick={() => goTo(scene + 1)}
              aria-label="Next page"
              className="rounded-full bg-white/10 p-4 hover:bg-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <p className="mt-2 text-center text-sm text-purple-300/70">
            Page {scene + 1} of {story.scenes.length}
            {autoPlay ? ' · auto-playing ✨' : ''}
          </p>
        </>
      )}
    </div>
  );
}
