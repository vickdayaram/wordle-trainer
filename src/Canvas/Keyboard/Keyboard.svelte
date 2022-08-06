<script lang="ts">
import { get, Writable } from "svelte/store";
import { CLOSE, INCOMPLETE_GUESS, YOU_WIN } from "../Notification/NotificationMessages";
import type { NotificationStore, PositionStore } from "../Store/Store";
import { backspace, getCurrentGuess, isCorrectGuess, isGameComplete, isGuessComplete, notify, processCharInput, updateCurrentGuess } from "../Store/Utils";

import Key from "./Key.svelte";

export let guessStore: Writable<string[][]>;
export let positionStore: Writable<PositionStore>;
export let notificationStore: Writable<NotificationStore>;
export let gameWordStore: Writable<string>;

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "<x"]
]

const onKeyPress = (keyValue: string) => {
    
    console.log(keyValue);
    if (isGameComplete(positionStore)) {
        return;
    }

    if (keyValue === "Enter" && !isGuessComplete(positionStore)) {
        notify(notificationStore, INCOMPLETE_GUESS);
    }
    
    if (keyValue === "Enter") {
        if (isCorrectGuess(guessStore, positionStore, gameWordStore)) {
            notify(notificationStore, YOU_WIN);
            return;
        }
        updateCurrentGuess(positionStore);        
        notify(notificationStore, CLOSE);
        return;
    }

    if (keyValue === "<x") {
        backspace(guessStore, positionStore);
        return;
    }

    processCharInput(guessStore, positionStore, keyValue);
}
	
</script>

<div class="keyboard">
    {#each keys as row}
        <div class="row">
            {#each row as key}
                <Key keyValue={key} {onKeyPress}/>
            {/each}
        </div>
    {/each}
</div>

<style>
	.keyboard {
        display: flex;
        flex-grow: 1;
        flex-flow: column;
        justify-content: space-evenly;
    }

    .row {
        display: flex;
        justify-content: space-evenly;
    }
</style>