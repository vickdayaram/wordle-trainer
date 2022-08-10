<script lang="ts">
import Nav from "./Nav/Nav.svelte";
import Canvas from "./Canvas/Canvas.svelte";
import { createGameWordStore, createGuessStore, createNotificationStore, createPositionStore } from "./Store/Store";
import { onMount, setContext } from "svelte";
import { AppContext, appContextKey } from "./AppContext";
import { getWord } from "./API/Api";

let guessStore = createGuessStore();
let positionStore = createPositionStore();
let notificationStore = createNotificationStore();
let gameWordStore = createGameWordStore("");;

onMount(async () => {
    const res = await getWord();
    // const res = "CLEEK";
    gameWordStore.update(_ => res);
});

setContext<AppContext>(appContextKey, {
	guessStore,
	positionStore,
	notificationStore,
	gameWordStore
});

</script>

<main>
	<div class="app-container">
		<Nav/>
		<Canvas/>
	</div>
</main>

<style>

	main {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.app-container {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
		height: 100%;
		max-width: 350px;
	}
	
</style>