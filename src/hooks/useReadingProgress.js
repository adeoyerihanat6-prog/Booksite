import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "readingProgress";

const getAllProgress = () => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
};

function useReadingProgress(bookId) {
  const [progress, setProgress] = useState(null);

  /* -----------------------------
     LOAD PROGRESS
  ----------------------------- */

  useEffect(() => {
    if (!bookId) return;

    const allProgress = getAllProgress();

    setProgress(allProgress[bookId] || null);
  }, [bookId]);

  /* -----------------------------
     SAVE PROGRESS
  ----------------------------- */

  const saveProgress = useCallback(
    (updates) => {
      if (!bookId) return;

      const allProgress = getAllProgress();

      const updatedProgress = {
        ...(allProgress[bookId] || {}),
        ...updates,
        updatedAt: Date.now(),
      };

      allProgress[bookId] = updatedProgress;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(allProgress)
      );

      setProgress(updatedProgress);
    },
    [bookId]
  );

  /* -----------------------------
     CLEAR PROGRESS
  ----------------------------- */

  const clearProgress = useCallback(() => {
    if (!bookId) return;

    const allProgress = getAllProgress();

    delete allProgress[bookId];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(allProgress)
    );

    setProgress(null);
  }, [bookId]);

  /* -----------------------------
     BOOK PROGRESS
  ----------------------------- */

  const chapterIndex =
    progress?.chapterIndex ?? 0;

  const chapterProgress =
    progress?.chapterProgress ?? 0;

  const completedChapters =
    progress?.completedChapters ?? [];

  const getBookProgress = (totalChapters) => {
    if (!totalChapters) return 0;

    const completedChapterCount =
      completedChapters.length;

    const currentChapterProgress =
      chapterProgress / 100;

    const calculatedProgress =
      ((completedChapterCount +
        currentChapterProgress) /
        totalChapters) *
      100;

    return Math.min(
      100,
      Math.max(0, calculatedProgress)
    );
  };

  return {
    progress,
    chapterIndex,
    chapterProgress,
    completedChapters,
    getBookProgress,
    saveProgress,
    clearProgress,
  };
}

export default useReadingProgress;