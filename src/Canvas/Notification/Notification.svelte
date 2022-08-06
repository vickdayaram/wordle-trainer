<script lang="ts">
import type { NotificationStore } from "../Store/Store";
import { fly, fade } from 'svelte/transition';
import type { Writable } from "svelte/store";
import { flip } from "svelte/animate";
import { slide } from 'svelte/transition';
import { onDestroy } from "svelte";

export let notificationStore: Writable<NotificationStore>;

let notifications
const unsubscribe = notificationStore.subscribe(storeState => {
    notifications = storeState.notifications;
})
onDestroy(unsubscribe)
</script>

<div class="notification-container">
    {#each notifications as notification}
        <div class="notification" in:fly="{{ y: 75, duration: 2000 }}" out:fade>
            {notification.message}
        </div>
    {/each}
</div>

<style>
	.notification-container {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
    }

    .notification {
        display: flex;
        position: fixed;
    }
</style>