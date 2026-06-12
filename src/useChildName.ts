import { useCallback, useState } from 'react';

const KEY = 'dreamy-tales-child-name';

export function useChildName() {
  const [name, setNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(KEY) ?? '';
    } catch {
      return '';
    }
  });

  const setName = useCallback((n: string) => {
    setNameState(n);
    try {
      localStorage.setItem(KEY, n);
    } catch {
      // private browsing — name just won't persist
    }
  }, []);

  return { name, setName };
}
