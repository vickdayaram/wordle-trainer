<script lang="ts">
import { getContext, onDestroy } from "svelte";
import { GRAY, GREEN, YELLOW } from "../../AppConfig";
import { AppContext, appContextKey } from "../../AppContext";

export let keyValue: string;
export let onKeyPress: (keyValue: string) => void;

let key;
const { keyboardColorStore }: AppContext = getContext(appContextKey);

let backgroundColor: string;
const unsub = keyboardColorStore.subscribe(colors => {
    backgroundColor = colors[keyValue] ? colors[keyValue] : "";
})

onDestroy(unsub);

const handleMouseDown = (e) => {
    e.preventDefault();
    key.classList.add('key-press');
}

const handleClick = (e) => {
    e.preventDefault();
    onKeyPress(keyValue);
}

const handleMouseUp = (e) => {
    e.preventDefault();
    key.classList.remove('key-press');
}

</script>

<button
    class:green={backgroundColor === GREEN}
    class:gray={backgroundColor === GRAY}
    class:yellow={backgroundColor === YELLOW}
    bind:this={key} 
    class="key" 
    on:click={handleClick}
    on:mouseup={handleMouseUp}
    on:mousedown={handleMouseDown}>
    {@html keyValue}
</button>

<style>
	.key {
        display: flex;
        height: 58px;
        color: #000000;
        background-color: gainsboro;
        align-items: center;
        justify-content: center;
        min-width: 30px;
    }

    .key:focus {
        border-color: transparent;
    }

    .key:active {
        filter: brightness(0.85);
    }

</style>