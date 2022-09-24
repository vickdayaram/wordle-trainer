<script lang="ts">
import Nav from "./Nav/Nav.svelte";
import Canvas from "./Canvas/Canvas.svelte";
import { createAllowedWordsStore, createGameWordStore, createGuessStore, createKeyboardColorStore, createNotificationStore, createPositionStore } from "./Store/Store";
import { onMount, setContext } from "svelte";
import { AppContext, appContextKey } from "./AppContext";
import { getWordValid, getAllowedWordsSet } from "./Words/Words";
import { logVersion } from "./Version";

let guessStore = createGuessStore();
let positionStore = createPositionStore();
let notificationStore = createNotificationStore();
let gameWordStore = createGameWordStore("");
let keyboardColorStore = createKeyboardColorStore();
let allowedWordsStore = createAllowedWordsStore();

onMount(async () => {
    const gameWord = await getWordValid();
	const allowedWords = await getAllowedWordsSet();
    gameWordStore.update(_ => gameWord);
	allowedWordsStore.update(_ => allowedWords);
	await logVersion();
});

setContext<AppContext>(appContextKey, {
	guessStore,
	positionStore,
	notificationStore,
	gameWordStore,
	keyboardColorStore,
	allowedWordsStore
});

</script>

<main>
	<Nav/>
	<div class="app-container">
		<Canvas/>
	</div>
</main>

<style>

	main {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-flow: column;
		align-items: center;
	}

	.app-container {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
		height: 100%;
		max-width: 350px;
	}

	:global(.green) {
		background-color: #8fce00 !important;
		color: #ffffff !important;
	}

	:global(.yellow) {
		background-color: #ffd966 !important;
		color: #ffffff !important;
	}

	:global(.gray) {
		background-color: #808080 !important;
		color: #ffffff !important;
	}
	
</style>