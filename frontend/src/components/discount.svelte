<script lang="ts">
    export let discount: number = 0;
</script>

<p
	style="top: 5%; left: 15%;"
	class="position-absolute translate-middle badge rounded-pill favorite-button"
>
	-{discount}%
</p>

<style>
	.favorite-button {
		z-index: +1000;
		font-size: medium;
		color: white;
        background-color: #ef2947;
        border-radius: 100%;
	}

	.favorite-button:hover {
		z-index: +1000;
	}
</style>