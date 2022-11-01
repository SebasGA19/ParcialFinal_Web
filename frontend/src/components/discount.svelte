<script lang="ts">
    export let discount: number = 0;
</script>

<p
	class="favorite-button"
>
	-{discount}%
</p>

<style>
	.favorite-button {
		font-size: medium;
		color: white;
        background-color: #ef2947;
        border-radius: 30px;
		padding: 5px;
		max-width: 50px;
		text-align: center;
	}
</style>