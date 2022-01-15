import React from 'react';

import Chapter from './Chapter';

export default function DailyChapters({ dailyChapters, onPress }) {
  return (
    <>
      {dailyChapters &&
        dailyChapters.items.map((chapter, index) => (
          <Chapter key={index} time={dailyChapters.title} chapter={chapter} onPress={() => onPress(chapter)}/>
        ))}
    </>
  );
}
