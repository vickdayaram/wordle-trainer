<script lang="ts">
    export let value: string;
</script>

<div class="char-input">
    {value}
</div>

<style>
	.char-input {
        display: flex;
        width: 100%;
        height: 58px;
        margin: 0 4px;
        border: 1px solid grey;
        align-items: center;
        justify-content: center;
    }

</style>