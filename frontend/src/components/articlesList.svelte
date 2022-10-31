<script lang="ts">
	import { onMount } from 'svelte';
	import { articles } from '../api/routes';
	import type { ArticleResult, Filter } from '../api/types';
	import Article from './article.svelte';

	let currentPage: number = 1;
	let result: ArticleResult = { pages: 1, articles: [] };
	export let filter: Filter;
	onMount(() => {
		if (result == undefined) {
			{
			}
			articles(1, filter).then((r) => {
				result = r;
				currentPage = 1;
			});
		}
	});
	$: {
		filter;
		articles(1, filter).then((r) => {
			result = r;
			currentPage = 1;
		});
	}
</script>

{#key result}
	<div class="row row-cols-1 row-cols-md-4 mt-3">
		{#each result.articles as article}
			<Article {article} />
		{/each}
	</div>

	<div class="container mt-1 p-5 text-center">
		{#each Array(result.pages) as _, page}
			{#if page + 1 === currentPage}
				<button
					class="btn border-5 btn-secondary pagination-button"
					on:click={() => {
						articles(page + 1, filter).then((r) => {
							result = r;
							currentPage = page + 1;
							scroll(0, 0);
						});
					}}>{page + 1}</button
				>
			{:else}
				<button
					class="btn border-5 pagination-button"
					on:click={() => {
						articles(page + 1, filter).then((r) => {
							result = r;
							currentPage = page + 1;
							scroll(0, 0);
						});
					}}>{page + 1}</button
				>
			{/if}
		{/each}
	</div>
{/key}

<style>
	.pagination-button {
    border-radius: 0;
    border: 0.5px solid black;
    margin-left: 10px;
}

.pagination-button:hover {
    background-color: aliceblue;
}

</style>