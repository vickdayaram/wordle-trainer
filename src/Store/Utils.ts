import { get, Writable } from "svelte/store";
import { GRAY, GREEN, NOTIFICATION_TIMEOUT, YELLOW } from "../AppConfig";
import type { CharGuessBox, NotificationStore, PositionStore } from "./Models";
import { getGuessStoreInitialState, getPositionStoreInitialState } from "./Store";
import { v4 as uuidv4 } from 'uuid';

export const notify = (notificationStore: Writable<NotificationStore>, msg: string) => {
    const id = uuidv4()
    notificationStore.update(storeState => {
        const {notifications} = storeState;
        const notificationsUpdate = [...notifications, {message: msg, id}];
        return {...storeState, notifications: notificationsUpdate};
    })
    setTimeout(() => {
        notificationStore.update(storeState => {
            const nextNotifications = storeState.notifications.filter((n) => n.id !== id);
            return {...storeState, notifications: nextNotifications};
        })
    }, NOTIFICATION_TIMEOUT);
}

export const multiLineNotify = (notificationStore: Writable<NotificationStore>, messages: string[]) => {
    messages.forEach((msg, idx) => {
        const timeout = idx * NOTIFICATION_TIMEOUT;
        setTimeout(() => notify(notificationStore, msg), timeout);
    });
}

export const updateCurrentGuess = (positionStore: Writable<PositionStore>) => {
    const { currentGuess, maxGuess} = get(positionStore);
    const nextGuess = Math.min(currentGuess + 1, maxGuess)
    positionStore.update(storeState => {
        return {...storeState, currentChar: 0, currentGuess: nextGuess};
    })
}

export const backspace = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>) => {
    const { currentChar, currentGuess, maxChar} = get(positionStore);
    guessStore.update(storeState => {
        const nextState = [...storeState];
        const charIdx = Math.max(Math.min(currentChar - 1, maxChar - 1), 0);
        const charBox = nextState[currentGuess][charIdx];
        nextState[currentGuess][charIdx] = {...charBox, value: ""};
        return nextState;
    })
    positionStore.update(storeState => {
        return {...storeState, currentChar: Math.max(currentChar - 1, 0)};
    });
}

export const processCharInput = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, keyValue: string) => {
    const { currentChar, currentGuess, maxChar} = get(positionStore);
    if (currentChar < maxChar) {
        guessStore.update(storeState => {
            const nextState = [...storeState];
            const charBox = nextState[currentGuess][currentChar];
            nextState[currentGuess][currentChar] = {...charBox, value: keyValue};
            return nextState;
        })
        positionStore.update(storeState => {
            return {...storeState, currentChar: Math.min(currentChar + 1, maxChar)};
        })
    }
}

export const getCurrentGuess = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>) => {
    const board = get(guessStore);
    const { currentGuess } = get(positionStore);
    return board[currentGuess].slice().map(cgb => cgb.value).join("");
}

export const isGameComplete = (positionStore: Writable<PositionStore>) => {
    const {currentGuess, maxGuess} = get(positionStore);
    return currentGuess === maxGuess;
}

export const isGuessComplete = (positionStore: Writable<PositionStore>) => {
    const {currentChar, maxChar} = get(positionStore);
    return currentChar === maxChar;
}

export const isCorrectGuess = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, gameWordStore: Writable<String>) => {
    return get(gameWordStore) === getCurrentGuess(guessStore, positionStore);
}

export const validateGuess = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, gameWordStore: Writable<String>): boolean => {
    const gameWord = get(gameWordStore);
    const { currentGuess } = get(positionStore);
    guessStore.update(storeState => {
        return storeState.map((guessRow, idx) => {
            if (currentGuess === idx) {
                return guessRow.map((charBox, charIdx) => {
                    const { value } = charBox;
                    if (gameWord[charIdx] === value) {
                        return {...charBox, backgroundColor: GREEN};
                    }
                    if (gameWord.indexOf(value) !== -1) {
                        return {...charBox, backgroundColor: YELLOW};
                    }
                    return {...charBox, backgroundColor: GRAY};
                })
            }
            return guessRow;
        })
    })
    const isCorrect = isCorrectGuess(guessStore, positionStore, gameWordStore);
    return isCorrect;
}

export const reset = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>) => {
    guessStore.update(_ => getGuessStoreInitialState());
    positionStore.update(_ => getPositionStoreInitialState());
}

export const isLastGuess = (positionStore: Writable<PositionStore>) => {
    const { currentGuess, maxGuess } = get(positionStore);
    return currentGuess === maxGuess;
}
