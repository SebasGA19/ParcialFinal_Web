<script>
	export let onclick = () => {};
</script>

<button on:click={onclick} class="btn green-button">
	<slot />
</button>

<style>
	.green-button {
		border-radius: 50px;
		background-color: #009929;
		color: white;
	}

	.green-button:hover {
		background-color: #006414;
		color: white;
	}
</style>
