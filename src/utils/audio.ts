// Persistent Global Audio Manager for YOLO
const HOVER_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

let hoverSound: HTMLAudioElement | null = null;
let isUnblocked = false;

if (typeof window !== 'undefined') {
  hoverSound = new Audio(HOVER_SOUND_URL);
  hoverSound.volume = 0.5;
  hoverSound.preload = 'auto';

  // GLOBAL LISTENERS: Unblock as soon as ANY interaction happens on the window
  const unlock = () => {
    if (isUnblocked || !hoverSound) return;
    
    hoverSound.play()
      .then(() => {
        hoverSound!.pause();
        hoverSound!.currentTime = 0;
        isUnblocked = true;
        console.log(">>> YOLO Audio Engine Authorized");
        
        // Remove listeners once authorized
        window.removeEventListener('mousedown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
        window.removeEventListener('wheel', unlock);
      })
      .catch(() => {});
  };

  window.addEventListener('mousedown', unlock);
  window.addEventListener('keydown', unlock);
  window.addEventListener('touchstart', unlock);
  window.addEventListener('wheel', unlock);
}

/**
 * Public unblock call for backup
 */
export const unblockAudio = () => {
  if (isUnblocked || !hoverSound) return;
  hoverSound.play().then(() => {
    hoverSound!.pause();
    hoverSound!.currentTime = 0;
    isUnblocked = true;
  }).catch(() => {});
};

/**
 * Rapid-fire hover sound
 */
export const playHoverSound = () => {
  if (!hoverSound) return;

  // Use a clone for overlapping playback
  const playInstance = hoverSound.cloneNode() as HTMLAudioElement;
  playInstance.volume = 0.35;
  playInstance.play().catch(() => {
    // If blocked, try to unblock original
    if (!isUnblocked) unblockAudio();
  });
};
