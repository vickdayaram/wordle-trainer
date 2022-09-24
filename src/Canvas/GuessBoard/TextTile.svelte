<script lang="ts">
import { GRAY, GREEN, YELLOW } from "../../AppConfig";

export let value: string;
export let backgroundColor: string;
export let charBorder: boolean = false;
export let front: boolean = true;
export let back: boolean = false;

const customEasing = (t: number) => {
    return Math.min(t + .75, 1.085);
}

const enterCharTransition = (node, params) => {
    return {
        css: (t) => {
        return `
        transform: scale(${t});
        `;
        },
        easing: customEasing,
        duration: 50,
    };
};

</script>

{#if charBorder} 
    <div 
        in:enterCharTransition
        class="char-input char-border" 
        class:green={backgroundColor === GREEN}
        class:gray={backgroundColor === GRAY}
        class:yellow={backgroundColor === YELLOW}
        class:front={front}
        class:back={back}>
        {value}
    </div>
{:else}
    <div class="char-input" class:front={front}>
        {value}
    </div>
{/if}


<style>
    .char-input {
        display: flex;
        width: 100%;
        height: 100%;
        border: 2px solid grey;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .char-border {
        border: 2px solid black;
    }

    .front, .back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
    }

    .back {
        transform: rotateX(180deg);
    }

</style>