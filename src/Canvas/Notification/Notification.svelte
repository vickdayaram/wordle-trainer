<script lang="ts">
import { fly, fade } from 'svelte/transition';
import { getContext, onDestroy } from "svelte";
import { appContextKey } from '../../AppContext';

const { notificationStore } = getContext(appContextKey);

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