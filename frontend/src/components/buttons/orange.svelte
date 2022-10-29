<script lang="ts">
	export let onclick: () => any;
</script>

<button on:click={onclick} class="btn orange-button">
	<slot />
</button>

<style>
	.orange-button {
		border-radius: 50px;
		background-color: #efa229;
		color: white;
	}

	.orange-button:hover {
		background-color: #f3b24a;
		color: white;
	}
</style>
