<script lang="ts">
	import type { ArticleObj } from '../../api/types';
	import { basket } from '../../stores/basket';

	export let article: ArticleObj;

	let value = $basket[article.id] === undefined ? 0 : $basket[article.id].amount;

	function updateHandle() {
		if (value === 0 && $basket[article.id] !== undefined) {
			delete $basket[article.id];
			$basket = $basket;
			return;
		}
		if ($basket[article.id] === undefined) {
			$basket[article.id] = { article: article, amount: value };
			return;
		}
		$basket[article.id].amount = value;
	}
</script>

<input
	on:change={updateHandle}
	class="form-control basket-counter"
	type="number"
	min="0"
	max="99"
	bind:value
/>

<style>
    .basket-counter {
        width: 100px;
    }
</style>