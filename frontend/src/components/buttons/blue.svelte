<script>
	export let onclick = () => {};
</script>

<button on:click={onclick} class="btn blue-button">
	<slot />
</button>

<style>
	.blue-button {
		border-radius: 50px;
		background-color: #3498db;
		color: white;
	}

	.blue-button:hover {
		background-color: #2980b9;
		color: white;
	}
</style>
