<script lang="ts">
import Reset from "carbon-icons-svelte/lib/Reset.svelte";
import { getContext } from "svelte";
import { APP_NAME } from "../AppConfig";
import { AppContext, appContextKey } from "../AppContext";
import { reset } from "../Store/Utils";

const { guessStore, positionStore, gameWordStore, keyboardColorStore }: AppContext = getContext(appContextKey);

const handleResetClick = () => {
    reset(guessStore, positionStore, gameWordStore, keyboardColorStore);
}

</script>

<div class="nav">
    <div class="left-menu" on:click={handleResetClick}>
        <Reset size={24}/>
    </div>
   <div class="app-name">
        {APP_NAME}
   </div> 
   <div>
   </div>
</div>

<style>

    .nav {
        height: 40px;
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