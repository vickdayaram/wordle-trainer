import type { Writable } from "svelte/store";
import type { CharGuessBox, NotificationStore, PositionStore } from "./Store/Models";

export const appContextKey = Symbol();

export interface AppContext {
   guessStore: Writable<CharGuessBox[][]>;
   positionStore: Writable<PositionStore>;
   notificationStore: Writable<NotificationStore>;
   gameWordStore: Writable<string>;
}