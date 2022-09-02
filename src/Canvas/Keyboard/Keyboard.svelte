<script lang="ts">
import { backspace, isCorrectGuess, isGameComplete, isGuessComplete, isLastGuess, isValidGuess, multiLineNotify, notify, processCharInput, updateCurrentGuess, validateGuess } from "../../Store/Utils";

import Key from "./Key.svelte";
import { AppContext, appContextKey } from "../../AppContext";
import { getContext } from "svelte";
import { CLOSE, getTheWordWasMessage, INCOMPLETE_GUESS, INVALID_GUESS, YOU_LOOSE, YOU_WIN } from "../../AppConfig";
import { get } from "svelte/store";

const { guessStore, positionStore, notificationStore, gameWordStore, keyboardColorStore, allowedWordsStore }: AppContext = getContext(appContextKey);

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "&#9003;"]
]

const onKeyPress = async (keyValue: string) => {
    
    if (isGameComplete(positionStore)) {
        return;
    }

    if (keyValue === "Enter" && !isGuessComplete(positionStore)) {
        notify(notificationStore, INCOMPLETE_GUESS);
        return;
    }

    if (keyValue === "Enter" && !isValidGuess(guessStore, positionStore, allowedWordsStore)) {
        notify(notificationStore, INVALID_GUESS);
        return;
    }
    
    if (keyValue === "Enter") {
        await validateGuess(guessStore, positionStore, gameWordStore, keyboardColorStore);
        const isCorrect = isCorrectGuess(guessStore, positionStore, gameWordStore);
        if (isCorrect) {
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

    if (keyValue === "&#9003;") {
        backspace(guessStore, positionStore);
        return;
    }

    processCharInput(guessStore, positionStore, keyValue);
}
	
</script>

<div class="keyboard">
    {#each keys as row, rowIdx}
        <div class="row" class:center={rowIdx === 1}>
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
        align-items: center;
    }

    .row {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    .center {
        width: 90%;
    }
</style>