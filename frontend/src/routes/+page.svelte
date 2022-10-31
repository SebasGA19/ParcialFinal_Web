<script lang="ts">
	import type { Filter } from '../api/types';
	import ArticleList from '../components/articlesList.svelte';
	import Header from "../components/header.svelte";

	let filter: Filter = {};
	let pattern: string = "";

	function patternCallback() {
		filter.pattern = pattern;
		filter = filter;
	}
</script>

<Header bind:patternFilter={pattern} searchCallback={patternCallback}/>

<slot></slot>

<div class="container">
	<ArticleList bind:filter/>
</div>
