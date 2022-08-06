<script lang="ts">
import type { Writable } from 'svelte/store';

    import CharInput from './CharInput.svelte';
    export let guessStore: Writable<string[][]>;
    let board;
    guessStore.subscribe(guessState => {
        board = guessState;
    })
    	
</script>

<div class="guess-board">
    {#each board as guess}
        <div class="guess">
            {#each guess as char}
                <CharInput value={char}/>
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