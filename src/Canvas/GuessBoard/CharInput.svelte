<script lang="ts">
import { GRAY, GREEN, WHITE, YELLOW } from "../../AppConfig";

export let value: string;
export let backgroundColor: string;

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

const revealGuessTransition = (node, params) => {
    return {
      css: (t) => {
        return `
        transform: rotateX(180deg);
        `;
      },
      easing: customEasing,
      duration: 750,
    };
}

</script>

{#if value !== "" && backgroundColor !== WHITE}
    <div 
        class="char-input char-border"
        class:green={backgroundColor === GREEN}
        class:gray={backgroundColor === GRAY}
        class:yellow={backgroundColor === YELLOW}>
        {value}
    </div>
{:else if value !== ""}
    <div class="char-input char-border" in:enterCharTransition>
        {value}
    </div>
{:else}
    <div class="char-input">
        {value}
    </div>
{/if}


<style>
	.char-input {
        display: flex;
        width: 100%;
        height: 58px;
        max-width: 58px;
        margin: 0 4px;
        border: 2px solid grey;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 10%;
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .char-border {
        border: 2px solid black;
    }

</style>