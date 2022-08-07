<script lang="ts">
import type { CharGuessBox } from "../../Store/Models";

export let cgb: CharGuessBox;

</script>

<div class="char-input">
    {cgb.value}
</div>

<style>
	.char-input {
        display: flex;
        width: 100%;
        height: 58px;
        max-width: 58px;
        margin: 0 4px;
        border: 1px solid grey;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color);
    }

</style>