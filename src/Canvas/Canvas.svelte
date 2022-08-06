<script lang="ts">

import Notification from "./Notification/Notification.svelte";
import GuessBoard from "./GuessBoard/GuessBoard.svelte";
import Keyboard from "./Keyboard/Keyboard.svelte";
import { createGameWordStore, createGuessStore, createNotificationStore, createPositionStore } from "./Store/Store";
import { getWord } from "../API/Api";
import { onMount } from 'svelte';

let guessStore = createGuessStore(5, 3);
let positionStore = createPositionStore(5, 3);
let notificationStore = createNotificationStore();
let gameWordStore;

onMount(async () => {
    // const res = await getWord();
    const res = "cleek";
    gameWordStore = createGameWordStore(res);
});

</script>

<div class="canvas">
    <Notification {notificationStore}/>
    <GuessBoard {guessStore}/>
    <Keyboard {guessStore} {positionStore} {notificationStore} {gameWordStore}/>
</div>

<style>
	.canvas {
        display: flex;
        flex-flow: column;
        flex-grow: 1;
        width: 100%;
    }
</style>