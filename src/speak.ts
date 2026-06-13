// Shared gentle text-to-speech for the learning games.

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

export function speak(text: string, rate = 0.9) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) utter.voice = voice;
  utter.rate = rate;
  utter.pitch = 1.05;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
