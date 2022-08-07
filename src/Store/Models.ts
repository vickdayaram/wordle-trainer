export interface CharGuessBox {
    value: string;
    charIdx: number;
    backgroundColor: string;
}

export interface PositionStore {
    currentGuess: number;
    currentChar: number;
    maxChar: number;
    maxGuess: number;
}

export interface Notification {
    message: string;
    id: string;
}

export interface NotificationStore {
    notifications: Notification[];
}
