<script lang="ts">
	import type { ArticleObj, Filter } from '../api/types';
	import { articles } from '../api/routes';
	import { onMount } from 'svelte';
	import ArticlesList from '../components/articlesList.svelte';

	let page: number = 1;
	let filter: Filter = {};
	let articlesToRender: ArticleObj[] = [];
	onMount(() => {
		articles(page, filter)
        .then(articleList => {
			articlesToRender = articleList.articles;
		});
	});
</script>

<div class="container">
	<ArticlesList bind:articles={articlesToRender}/>
</div>
