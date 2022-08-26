<script lang="ts">
import { getContext, onDestroy } from "svelte";
import { BLACK, WHITE } from "../../AppConfig";
import { AppContext, appContextKey } from "../../AppContext";


    export let keyValue: string;
    export let onKeyPress: (keyValue: string) => void;

    const defaultBackgroundColor = "gainsboro";
    const { keyboardColorStore }: AppContext = getContext(appContextKey);
    let backgroundColor: string;
    let color: string;
    const unsub = keyboardColorStore.subscribe(colors => {
        backgroundColor = colors[keyValue] ? colors[keyValue] : defaultBackgroundColor;
        color = backgroundColor === defaultBackgroundColor ? BLACK : WHITE;
    })
	onDestroy(unsub);

    const handleClick = (e) => {
        e.preventDefault();
        onKeyPress(keyValue)
    }

</script>

<button 
    class="key" 
    on:click={handleClick} 
    style="--background-color: {backgroundColor}; --color: {color}">
    {keyValue}
</button>

<style>
	.key {
        display: flex;
        height: 58px;
        color: var(--color);
        background-color: var(--background-color);
        flex: 1;
        margin: 0 4px;
        align-items: center;
        justify-content: center;
    }
    .key:focus {
        border-color: transparent
    }
</style>