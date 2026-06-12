import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';
import { getTopic } from '../data/learning';
import type { LearnItem } from '../data/learning';
import { speak, stopSpeaking } from '../speak';

const PRAISE = ['Great job!', 'Yay! You did it!', 'Amazing!', 'Super!', 'Wonderful!'];

function ItemVisual({ item, size }: { item: LearnItem; size: 'big' | 'option' }) {
  if (item.color) {
    return (
      <span
        className={`inline-block rounded-full ring-4 ring-white/30 ${
          size === 'big' ? 'h-32 w-32 sm:h-40 sm:w-40' : 'h-16 w-16 sm:h-20 sm:w-20'
        }`}
        style={{ backgroundColor: item.color }}
      />
    );
  }
  return (
    <span
      className={
        size === 'big'
          ? 'text-7xl font-extrabold sm:text-8xl'
          : 'text-4xl font-extrabold sm:text-5xl'
      }
    >
      {item.display}
    </span>
  );
}

interface Question {
  answer: LearnItem;
  options: LearnItem[];
}

function makeQuestion(items: LearnItem[]): Question {
  const answer = items[Math.floor(Math.random() * items.length)];
  const options = [answer];
  let guard = 0;
  while (options.length < 3 && guard++ < 200) {
    const c = items[Math.floor(Math.random() * items.length)];
    if (!options.some((o) => o.label === c.label || o.display === c.display)) {
      options.push(c);
    }
  }
  // gentle shuffle
  options.sort(() => Math.random() - 0.5);
  return { answer, options };
}

export default function LearnGame() {
  const { levelId, topicId } = useParams();
  const found = getTopic(levelId ?? '', topicId ?? '');

  const [mode, setMode] = useState<'learn' | 'play'>('learn');
  const [card, setCard] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [wrongPick, setWrongPick] = useState<string | null>(null);

  const items = useMemo(() => found?.topic.items ?? [], [found]);

  const nextQuestion = useCallback(() => {
    if (!found) return;
    const q = makeQuestion(items);
    setQuestion(q);
    setFeedback(null);
    setWrongPick(null);
    speak(found.topic.question(q.answer));
  }, [found, items]);

  useEffect(() => {
    if (mode === 'play' && !question) nextQuestion();
  }, [mode, question, nextQuestion]);

  useEffect(() => stopSpeaking, []);

  if (!found) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-purple-100">
        <span className="text-6xl">🔭</span>
        <p className="text-xl">Hmm, that lesson floated away…</p>
        <Link to="/learn" className="rounded-full bg-purple-600 px-6 py-2 font-bold">
          Back to Learning Time
        </Link>
      </div>
    );
  }

  const { level, topic } = found;
  const current = items[card];

  const pickAnswer = (item: LearnItem) => {
    if (!question || feedback === 'correct') return;
    if (item.label === question.answer.label && item.display === question.answer.display) {
      setFeedback('correct');
      setStars((s) => s + 1);
      speak(`${PRAISE[Math.floor(Math.random() * PRAISE.length)]} ${question.answer.speak}`);
      window.setTimeout(nextQuestion, 2200);
    } else {
      setFeedback('wrong');
      setWrongPick(item.label + item.display);
      speak('Oops! Try again!');
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-6 pt-4 text-purple-50">
      {/* top bar */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <Link
          to="/learn"
          onClick={stopSpeaking}
          className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Lessons
        </Link>
        <h1 className="flex-1 truncate text-center text-base font-extrabold sm:text-xl">
          {topic.emoji} {topic.name}
          <span className="ml-2 hidden text-sm font-normal text-purple-300 sm:inline">
            · {level.name}
          </span>
        </h1>
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-amber-200">
          ⭐ {stars}
        </span>
      </div>

      {/* mode toggle */}
      <div className="mb-5 flex justify-center gap-2">
        <button
          onClick={() => {
            stopSpeaking();
            setMode('learn');
          }}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-bold ${
            mode === 'learn' ? 'bg-amber-400 text-indigo-950' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <BookOpen size={18} /> Learn
        </button>
        <button
          onClick={() => {
            stopSpeaking();
            setQuestion(null);
            setMode('play');
          }}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-bold ${
            mode === 'play' ? 'bg-pink-500 text-white' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <Gamepad2 size={18} /> Play
        </button>
      </div>

      {mode === 'learn' ? (
        /* ---- flashcards ---- */
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <button
            key={card}
            onClick={() => speak(current.speak)}
            className="anim-scene-in flex min-h-[16rem] w-full max-w-md flex-col items-center justify-center gap-4 rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <ItemVisual item={current} size="big" />
            <span className="text-2xl font-extrabold">{current.label}</span>
            {current.sub && (
              <span className="text-lg text-purple-200">{current.sub}</span>
            )}
            <span className="text-sm text-purple-300/70">tap to hear 🔊</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                stopSpeaking();
                setCard((c) => (c - 1 + items.length) % items.length);
              }}
              aria-label="Previous card"
              className="rounded-full bg-white/10 p-4 hover:bg-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="min-w-20 text-center text-sm text-purple-300">
              {card + 1} of {items.length}
            </span>
            <button
              onClick={() => {
                stopSpeaking();
                setCard((c) => (c + 1) % items.length);
              }}
              aria-label="Next card"
              className="rounded-full bg-white/10 p-4 hover:bg-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      ) : (
        /* ---- quiz ---- */
        question && (
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <button
              onClick={() => speak(topic.question(question.answer))}
              className="rounded-3xl bg-white/10 px-8 py-5 text-center text-2xl font-extrabold ring-1 ring-white/10 hover:bg-white/15 sm:text-3xl"
            >
              {topic.question(question.answer)}{' '}
              <span className="text-lg text-purple-300">🔊</span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {question.options.map((opt) => {
                const isAnswer =
                  opt.label === question.answer.label &&
                  opt.display === question.answer.display;
                const isWrongPick = wrongPick === opt.label + opt.display;
                return (
                  <button
                    key={opt.label + opt.display}
                    onClick={() => pickAnswer(opt)}
                    className={`flex min-h-28 min-w-28 flex-col items-center justify-center gap-2 rounded-3xl p-6 ring-1 ring-white/10 transition-transform sm:min-h-32 sm:min-w-32 ${
                      feedback === 'correct' && isAnswer
                        ? 'anim-pop bg-emerald-500/40 ring-emerald-300'
                        : isWrongPick
                          ? 'anim-shake bg-rose-500/30'
                          : 'bg-white/10 hover:scale-105 hover:bg-white/15'
                    }`}
                  >
                    {topic.quiz === 'find' ? (
                      <ItemVisual item={opt} size="option" />
                    ) : (
                      <span className="text-3xl font-extrabold sm:text-4xl">
                        {opt.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {feedback === 'correct' && (
              <p className="anim-text-in text-2xl font-extrabold text-emerald-300">
                🎉 {question.answer.speak}
              </p>
            )}
            {feedback === 'wrong' && (
              <p className="anim-text-in text-xl text-purple-200">
                Almost! Try again 💪
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}
