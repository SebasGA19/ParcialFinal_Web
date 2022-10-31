<script lang="ts">
	import type { Filter } from '../api/types';
	import ArticleList from '../components/articlesList.svelte';

	let filter: Filter = {};
</script>

<div class="container">
	<ArticleList bind:filter/>
</div>
