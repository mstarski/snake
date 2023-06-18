class AudioPlayer {
  playGameOverSfx() {
    new Audio("sfx/game-over.mp3").play();
  }

  playStartSfx() {
    new Audio("sfx/game-start.mp3").play();
  }

  playPointSfx() {
    const audio = new Audio("sfx/point.mp3");
    audio.currentTime = 0.25;
    audio.play();
  }
}

export const audioPlayer = new AudioPlayer();
