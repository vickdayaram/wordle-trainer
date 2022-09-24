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
export const INCOMPLETE_GUESS = "Your guess is incomplete...";
export const INVALID_GUESS = "Not a valid word, try again..."
export const CLOSE = "Close but not quite";
export const YOU_LOOSE = "Game Over, Nice Effort...";
export const YOU_WIN_NOTIFICATIONS = [
    "Impressive",
    "Impressive",
    "You Got It",
    "You Got It",
    "Nice Work!",
    "Nice Work!"
];

export const getTheWordWasMessage = (word) => `The word was ${word}....`;
export const NOTIFICATION_TIMEOUT = 2000;

// Data Size
export const ALLOWED_SIZE = 10657;
export const ANSWERS_SIZE = 2315;

// Tile Flip
export const TILE_FLIP_DELAY = 400;