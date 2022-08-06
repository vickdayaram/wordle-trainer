import { Writable, writable } from "svelte/store";

export const createGuessStore = (wordLength: number, numGuesses: number): Writable<string[][]> => {
    let board = Array.from({length: numGuesses}, () => Array.from({length: wordLength}, () => " "));
    return writable(board);
}

export interface PositionStore {
    currentGuess: number;
    currentChar: number;
    maxChar: number;
    maxGuess: number;
}

export const createPositionStore = (wordLength: number, numGuesses: number) => {
    return writable({currentGuess: 0, currentChar: 0, maxChar: wordLength, maxGuess: numGuesses});
}

export interface Notification {
    message;
}

export interface NotificationStore {
    notifications: Notification[];
}

export const createNotificationStore = (): Writable<NotificationStore> => {
    return writable({notifications: []});
}

export const createGameWordStore = (gameWord: string): Writable<string> => {
    return writable(gameWord);
}