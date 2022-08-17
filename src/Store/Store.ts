import { Writable, writable } from "svelte/store";
import { BLACK, NUM_GUESSES, WHITE, WORD_LENGTH } from "../AppConfig";
import type { CharGuessBox, KeyboardColorStore, NotificationStore, PositionStore } from "./Models";

export const getGuessStoreInitialState = (): CharGuessBox[][] => {
    return Array.from({length: NUM_GUESSES}, () => Array.from({length: WORD_LENGTH}, (_, idx) => ({
        value: " ",
        charIdx: idx,
        backgroundColor: WHITE,
        color: BLACK
    })));
}

export const getPositionStoreInitialState = (): PositionStore => {
    return {currentGuess: 0, currentChar: 0, maxChar: WORD_LENGTH, maxGuess: NUM_GUESSES}
}

export const createGuessStore = (): Writable<CharGuessBox[][]> => {
    return writable(getGuessStoreInitialState());
}

export const createPositionStore = () => {
    return writable(getPositionStoreInitialState());
}

export const createNotificationStore = (): Writable<NotificationStore> => {
    return writable({notifications: []});
}

export const createGameWordStore = (gameWord: string): Writable<string> => {
    return writable(gameWord);
}

export const createKeyboardColorStore = (): Writable<KeyboardColorStore> => {
    return writable({});
}