import React from 'react';

export default function createStar(isCorrect: boolean): JSX.Element {
  const src = isCorrect ? 'Assets/svg/star-win.svg' : 'Assets/svg/star.svg';

  return <img src={src} alt="" />;
}
