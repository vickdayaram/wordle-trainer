import type { Writable } from "svelte/store";
import type { CharGuessBox, KeyboardColorStore, NotificationStore, PositionStore } from "./Store/Models";

export const appContextKey = Symbol();

export interface AppContext {
   guessStore: Writable<CharGuessBox[][]>;
   positionStore: Writable<PositionStore>;
   notificationStore: Writable<NotificationStore>;
   gameWordStore: Writable<string>;
   keyboardColorStore: Writable<KeyboardColorStore>;
   allowedWordsStore: Writable<Set<string>>;
}