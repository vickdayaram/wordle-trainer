<script lang="ts">
    export let keyValue: string;
    export let onKeyPress: (keyValue: string) => void;
	
</script>

<button class="key" on:click={() => onKeyPress(keyValue)}>
    {keyValue}
</button>

<style>
	.key {
        display: flex;
        height: 58px;
        color: black;
        background-color: gainsboro;
        flex: 1;
        margin: 0 4px;
        align-items: center;
        justify-content: center;
    }
</style>