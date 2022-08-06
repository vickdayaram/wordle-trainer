<script lang="ts">
import Nav from "./Nav/Nav.svelte";
import Canvas from "./Canvas/Canvas.svelte";

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
		max-width: 500px;
	}
	
</style>