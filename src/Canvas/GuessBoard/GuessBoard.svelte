<script lang="ts">
import { getContext, onDestroy } from 'svelte';
import { appContextKey } from '../../AppContext';
import type { CharGuessBox } from '../../Store/Models';
import FlipTile from './FlipTile.svelte';

const { guessStore } = getContext(appContextKey);
let board: CharGuessBox[][];
const unsub = guessStore.subscribe(guessState => {
    board = guessState;
})

onDestroy(unsub);
</script>

<div class="guess-board">
    {#each board as guess}
        {#each guess as cgb, idx}
            <FlipTile
                value={cgb.value}
                backgroundColor={cgb.backgroundColor}
                animationDelay={idx}
            />
        {/each}
    {/each}
</div>

<style>
	.guess-board {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: auto auto auto auto auto;
        height: 360px;
    }
</style>