<script lang="ts">
import { getContext, onDestroy } from 'svelte';
import { appContextKey } from '../../AppContext';
import type { CharGuessBox } from '../../Store/Models';

import CharInput from './CharInput.svelte';

const { guessStore } = getContext(appContextKey);
let board: CharGuessBox[][];
const unsub = guessStore.subscribe(guessState => {
    board = guessState;
})

onDestroy(unsub);
</script>

<div class="guess-board">
    {#each board as guess}
        <div class="guess">
            {#each guess as cgb}
                <CharInput 
                   value={cgb.value} 
                   --background-color={cgb.backgroundColor} 
                   --color={cgb.color}
                 />
            {/each}
        </div>
    {/each}
</div>

<style>
	.guess-board {
        display: flex;
        flex-grow: 1;
        flex-flow: column;
    }

    .guess {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
</style>