import { get, Writable } from "svelte/store";
import type { NotificationStore, PositionStore } from "./Store";

export const notify = (notificationStore: Writable<NotificationStore>, msg: string) => {
    notificationStore.update(storeState => {
        const {notifications} = storeState;
        const notificationsUpdate = [...notifications, {message: msg}];
        return {...storeState, notifications: notificationsUpdate};
    })
    setTimeout(() => {
        notificationStore.update(storeState => {
            return {...storeState, notifications: []};
        })
    }, 2000);
}

export const updateCurrentGuess = (positionStore: Writable<PositionStore>) => {
    const { currentGuess, maxGuess} = get(positionStore);
    const nextGuess = Math.min(currentGuess + 1, maxGuess)
    positionStore.update(storeState => {
        return {...storeState, currentChar: 0, currentGuess: nextGuess};
    })
}

export const backspace = (guessStore: Writable<string[][]>, positionStore: Writable<PositionStore>) => {
    const { currentChar, currentGuess, maxChar} = get(positionStore);
    guessStore.update(storeState => {
        const nextState = [...storeState];
        const charIdx = Math.max(Math.min(currentChar - 1, maxChar - 1), 0);
        nextState[currentGuess][charIdx] = " ";
        return storeState;
    })
    positionStore.update(storeState => {
        return {...storeState, currentChar: Math.max(currentChar - 1, 0)};
    });
}

export const processCharInput = (guessStore: Writable<string[][]>, positionStore: Writable<PositionStore>, keyValue: string) => {
    const { currentChar, currentGuess, maxChar} = get(positionStore);
    if (currentChar < maxChar) {
        guessStore.update(storeState => {
            const nextState = [...storeState];
            nextState[currentGuess][currentChar] = keyValue;
            return nextState;
        })
        positionStore.update(storeState => {
            return {...storeState, currentChar: Math.min(currentChar + 1, maxChar)};
        })
    }
}

export const getCurrentGuess = (guessStore: Writable<string[][]>, positionStore: Writable<PositionStore>) => {
    const board = get(guessStore);
    const { currentGuess } = get(positionStore);
    return board[currentGuess].slice().join("").toLowerCase();
}

export const isGameComplete = (positionStore: Writable<PositionStore>) => {
    const {currentGuess, maxGuess} = get(positionStore);
    return currentGuess === maxGuess;
}

export const isGuessComplete = (positionStore: Writable<PositionStore>) => {
    const {currentChar, maxChar} = get(positionStore);
    console.log(currentChar);
    console.log(maxChar);
    return currentChar === maxChar;
}

export const isCorrectGuess = (guessStore: Writable<string[][]>, positionStore: Writable<PositionStore>, gameWordStore: Writable<String>) => {
    return get(gameWordStore) === getCurrentGuess(guessStore, positionStore);
}