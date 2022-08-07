<script lang="ts">

import Notification from "./Notification/Notification.svelte";
import GuessBoard from "./GuessBoard/GuessBoard.svelte";
import Keyboard from "./Keyboard/Keyboard.svelte";

</script>

<div class="canvas">
    <Notification />
    <GuessBoard />
    <Keyboard />
</div>

<style>
	.canvas {
        display: flex;
        flex-flow: column;
        flex-grow: 1;
        width: 100%;
    }
</style>