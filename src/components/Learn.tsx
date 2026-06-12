import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { LEVELS } from '../data/learning';

export default function Learn() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 text-purple-50">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Stories
        </Link>
      </div>

      <header className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-3">
          <GraduationCap className="anim-float text-amber-300" size={36} />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learning Time
          </h1>
          <span className="anim-twinkle text-3xl">✨</span>
        </div>
        <p className="text-lg text-purple-200">
          Pick your class, then pick something fun to learn!
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10"
          >
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-3xl">{level.emoji}</span>
              <h2 className="text-2xl font-extrabold">{level.name}</h2>
              <span className="text-sm text-purple-300">{level.age}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {level.topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/learn/${level.id}/${topic.id}`}
                  className="flex items-center gap-2 rounded-full bg-purple-600 px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-purple-500"
                >
                  <span className="text-xl">{topic.emoji}</span> {topic.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
