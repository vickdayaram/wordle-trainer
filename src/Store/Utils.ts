import { get, Writable } from "svelte/store";
import { GRAY, GREEN, NOTIFICATION_TIMEOUT, WHITE, YELLOW } from "../AppConfig";
import type { CharGuessBox, KeyboardColorStore, NotificationStore, PositionStore } from "./Models";
import { getGuessStoreInitialState, getPositionStoreInitialState } from "./Store";
import { v4 as uuidv4 } from 'uuid';
import { getWordValid } from "../Words/Words";

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

const computeNextColor = (charValue: string, gameWord: string, charIdx: number) => {
    if (gameWord[charIdx] === charValue) {
        return GREEN;
    }
    if (gameWord.indexOf(charValue) !== -1) {
        return YELLOW;
    }
    return GRAY;
}

const updateGuessRowCharState = (guessStore: Writable<CharGuessBox[][]>, currentGuess: number, gameWord: string, charIdx: number) => {
    guessStore.update(storeState => {
        let nextState = [...storeState];
        let charBox = nextState[currentGuess][charIdx];
        let backgroundColor = computeNextColor(charBox.value, gameWord, charIdx);
        nextState[currentGuess][charIdx] = {...charBox, backgroundColor, color: WHITE};
        return nextState;
    });
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const validateGuess = async (
    guessStore: Writable<CharGuessBox[][]>, 
    positionStore: Writable<PositionStore>, 
    gameWordStore: Writable<string>,
    keyboardColorStore: Writable<KeyboardColorStore>
    ) => {
    const gameWord = get(gameWordStore);
    const { currentGuess } = get(positionStore);
    for(let i = 0; i < 5; i++) {
        updateGuessRowCharState(guessStore, currentGuess, gameWord, i);
        await sleep(300);
    }
    const lastGuess = getCurrentGuess(guessStore, positionStore);
    for(let i = 0; i < 5; i++) {
        let char = lastGuess[i];
        let backgroundColor = computeNextColor(char, gameWord, i);
        updateKeyboardColorStore(keyboardColorStore, char, backgroundColor);
    }
}

export const reset = async (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, gameWordStore: Writable<String>, keyboardColorStore: Writable<KeyboardColorStore>) => {
    guessStore.update(_ => getGuessStoreInitialState());
    positionStore.update(_ => getPositionStoreInitialState());
    keyboardColorStore.update(_ => ({}));
    const nextGameWord = await getWordValid();
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

export const isValidGuess = (guessStore: Writable<CharGuessBox[][]>, positionStore: Writable<PositionStore>, allowedWordsStore: Writable<Set<string>>) => {
    const currentGuess = getCurrentGuess(guessStore, positionStore);
    const allowedWords = get(allowedWordsStore);
    return allowedWords.has(currentGuess);
}
