import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'flavorboss-catering-basket';

const readStoredBasket = (): Record<string, number> => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed)
        .map(([key, value]) => [key, Math.max(0, Math.floor(Number(value) || 0))] as const)
        .filter(([, value]) => value > 0),
    );
  } catch {
    return {};
  }
};

export const useCateringBasket = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => readStoredBasket());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncFromStorage = () => setQuantities(readStoredBasket());

    window.addEventListener('storage', syncFromStorage);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  const setQty = useCallback((id: string, value: number) => {
    setQuantities((current) => {
      const nextValue = Math.max(0, Math.floor(value) || 0);
      if (nextValue === 0) {
        const { [id]: _removed, ...rest } = current;
        return rest;
      }

      return { ...current, [id]: nextValue };
    });
  }, []);

  const inc = useCallback((id: string) => {
    setQuantities((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }, []);

  const dec = useCallback((id: string) => {
    setQuantities((current) => {
      const nextValue = Math.max(0, (current[id] || 0) - 1);
      if (nextValue === 0) {
        const { [id]: _removed, ...rest } = current;
        return rest;
      }

      return { ...current, [id]: nextValue };
    });
  }, []);

  const clear = useCallback(() => setQuantities({}), []);

  const totalItems = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities],
  );

  return {
    quantities,
    setQty,
    inc,
    dec,
    clear,
    totalItems,
  };
};