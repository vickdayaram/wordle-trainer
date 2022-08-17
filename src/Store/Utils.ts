import { get, Writable } from "svelte/store";
import { GRAY, GREEN, NOTIFICATION_TIMEOUT, WHITE, YELLOW } from "../AppConfig";
import type { CharGuessBox, KeyboardColorStore, NotificationStore, PositionStore } from "./Models";
import { getGuessStoreInitialState, getPositionStoreInitialState } from "./Store";
import { v4 as uuidv4 } from 'uuid';
import { getWord } from "../API/Api";

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

export const validateGuess = (
    guessStore: Writable<CharGuessBox[][]>, 
    positionStore: Writable<PositionStore>, 
    gameWordStore: Writable<String>,
    keyboardColorStore: Writable<KeyboardColorStore>
    ): boolean => {
    const gameWord = get(gameWordStore);
    const { currentGuess } = get(positionStore);
    guessStore.update(storeState => {
        return storeState.map((guessRow, idx) => {
            if (currentGuess === idx) {
                return guessRow.map((charBox, charIdx) => {
                    const { value } = charBox;
                    if (gameWord[charIdx] === value) {
                        updateKeyboardColorStore(keyboardColorStore, value, GREEN);
                        return {...charBox, backgroundColor: GREEN, color: WHITE};
                    }
                    if (gameWord.indexOf(value) !== -1) {
                        updateKeyboardColorStore(keyboardColorStore, value, YELLOW);
                        return {...charBox, backgroundColor: YELLOW, color: WHITE};
                    }
                    updateKeyboardColorStore(keyboardColorStore, value, GRAY);
                    return {...charBox, backgroundColor: GRAY, color: WHITE};
                })
            }
            return guessRow;
        })
    })
    const isCorrect = isCorrectGuess(guessStore, positionStore, gameWordStore);
    return isCorrect;
}

export const reset = async (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, gameWordStore: Writable<String>) => {
    guessStore.update(_ => getGuessStoreInitialState());
    positionStore.update(_ => getPositionStoreInitialState());
    const nextGameWord = await getWord();
    gameWordStore.update(_ => nextGameWord);
}

export const isLastGuess = (positionStore: Writable<PositionStore>) => {
    const { currentGuess, maxGuess } = get(positionStore);
    return currentGuess === maxGuess;
}

const updateKeyboardColorStore = (keyboardColorStore: Writable<KeyboardColorStore>, char: string, color: string) => {
    keyboardColorStore.update(storeState => {
        const currentColor = storeState[char];
        if ((currentColor === undefined) || (currentColor === YELLOW && color === GREEN)) {
            storeState[char] = color;
            return storeState;
        }
        return storeState;
    })
    
}
