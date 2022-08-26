<script lang="ts">

export let value: string;

const customEasing = (t: number) => {
    return Math.min(t + .75, 1.3);
}

const customTransition = (node, params) => {
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

{#if value !== ""}
<div class="char-input char-border" in:customTransition>
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
        background-color: var(--background-color);
        color: var(--color);
        font-weight: bold;
        border-radius: 10%
    }

    .char-border {
        border: 2px solid black;
    }

</style>