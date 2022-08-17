export interface CharGuessBox {
    value: string;
    charIdx: number;
    backgroundColor: string;
    color: string;
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

export interface KeyboardColorStore {
    [key: string]: string;
}
