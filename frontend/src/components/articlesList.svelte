<script lang="ts">
	import type { ArticleObj } from "../api/types";
	import Article from "./article.svelte";

    export let articles: ArticleObj[];

    $ : {
        console.log(articles)
    }
</script>

<div class="row row-cols-1 row-cols-md-4 mt-3">
{#key articles}
	{#each articles as article}
		<Article article={article}/>
	{/each}
{/key}
</div>
