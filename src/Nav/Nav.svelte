<script lang="ts">
import Reset from "carbon-icons-svelte/lib/Reset.svelte";
import { getContext } from "svelte";
import { AppContext, appContextKey } from "../AppContext";
import { reset } from "../Store/Utils";

const { guessStore, positionStore, gameWordStore }: AppContext = getContext(appContextKey);

const handleResetClick = () => {
    reset(guessStore, positionStore, gameWordStore);
}

</script>

<div class="nav">
    <div class="left-menu" on:click={handleResetClick}>
        <Reset size={24}/>
    </div>
   <div class="app-name">
        Wordle Trainer
   </div> 
   <div>
   </div>
</div>

<style>

    .nav {
        height: 65px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        padding: 1em;
        box-sizing: border-box;
    }

    .app-name {
        font-weight: bold;
        font-size: 16px;
    }

    .left-menu {
        font-size: 16px;
    }
    
</style>