<script lang="ts">
import { backspace, isGameComplete, isGuessComplete, isLastGuess, multiLineNotify, notify, processCharInput, updateCurrentGuess, validateGuess } from "../../Store/Utils";

import Key from "./Key.svelte";
import { AppContext, appContextKey } from "../../AppContext";
import { getContext } from "svelte";
import { CLOSE, getTheWordWasMessage, INCOMPLETE_GUESS, YOU_LOOSE, YOU_WIN } from "../../AppConfig";
import { get } from "svelte/store";

const { guessStore, positionStore, notificationStore, gameWordStore }: AppContext = getContext(appContextKey);

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "<x"]
]

const onKeyPress = (keyValue: string) => {
    
    if (isGameComplete(positionStore)) {
        return;
    }

    if (keyValue === "Enter" && !isGuessComplete(positionStore)) {
        notify(notificationStore, INCOMPLETE_GUESS);
        return;
    }
    
    if (keyValue === "Enter") {
        const isCorrectGuess = validateGuess(guessStore, positionStore, gameWordStore);
        if (isCorrectGuess) {
            notify(notificationStore, YOU_WIN);
            return;
        }
        updateCurrentGuess(positionStore);
        if (isLastGuess(positionStore)) {
            const gameword = get(gameWordStore);
            multiLineNotify(notificationStore, [YOU_LOOSE, getTheWordWasMessage(gameword)])
            return;
        }        
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