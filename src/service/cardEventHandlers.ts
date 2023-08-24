export default function playAudio(audioSrc: string, gameMode: boolean): void {
  if (gameMode) {
    return;
  }
  const audio = new Audio(audioSrc);
  audio.play();
}
