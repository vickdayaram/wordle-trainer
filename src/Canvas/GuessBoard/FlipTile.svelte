<script lang="ts">

import { TILE_FLIP_DELAY, WHITE } from "../../AppConfig";
import { sleep } from "../../Utils";
import TextTile from './TextTile.svelte';

export let value: string;
export let backgroundColor: string;
export let animationDelay: number;
let flip = false;

$: if (value !== "" && backgroundColor !== WHITE) {
    readyForFlip();
}

$: if (value == "" && backgroundColor === WHITE) {
    flip = false;
}

const readyForFlip = async () => {
    await sleep(TILE_FLIP_DELAY * animationDelay);
    flip = true;
}

</script>

<div class="char-input">
    <div class="flip-box">
        <div class="flip-box-inner" class:flip={flip}>    
            {#if value !== ""}
                <TextTile 
                    value={value}
                    front={true}
                    charBorder={true}
                    backgroundColor={WHITE}
                />
            {:else}
                <TextTile 
                    value={value}
                    charBorder={false}
                    backgroundColor={WHITE}/>
            {/if}
            <TextTile
                value={value}
                back={true}
                charBorder={true}
                backgroundColor={backgroundColor}
            />
        </div>
    </div>
</div>

    
<style>
    .char-input {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .flip-box {
        background-color: transparent;
        width: 100%;
        height: 100%;
        perspective: 1000px;
    }

    .flip-box-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip {
        transform: rotateX(180deg);
    }
</style>