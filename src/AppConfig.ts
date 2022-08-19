export const NUM_GUESSES = 6;
export const WORD_LENGTH = 5;

export const APP_NAME = "Wordle Prep"

// CheckBox Colors
export const WHITE = "#ffffff";
export const YELLOW = "#ffd966";
export const GREEN = "#8fce00";
export const GRAY = "#808080";
export const BLACK = "#000000"

// Notification Messages
export const YOU_WIN = "You got it, you win!";
export const INCOMPLETE_GUESS = "Your guess is incomplete...";
export const CLOSE = "Close but not quite";
export const YOU_LOOSE = "Game Over, Nice Effort...";
export const getTheWordWasMessage = (word) => `The word was ${word}....`;
export const NOTIFICATION_TIMEOUT = 2000;