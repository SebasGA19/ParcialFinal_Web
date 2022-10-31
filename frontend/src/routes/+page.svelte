<script lang="ts">
	import type { Filter } from '../api/types';
	import ArticleList from '../components/articlesList.svelte';
	import Header from '../components/header.svelte';

	let filter: Filter = {};
	let pattern: string = '';
	let minPrice: number;
	let maxPrice: number;

	function searchCallback() {
		filter.pattern = pattern;
		filter = filter;
	}

	function priceCallback() {
		filter['price-from'] = minPrice;
		filter['price-to'] = maxPrice;
		filter = filter;
	}
</script>

<Header bind:pattern bind:minPrice bind:maxPrice {searchCallback} {priceCallback} />

<slot />

<div class="container">
	<ArticleList bind:filter />
</div>
