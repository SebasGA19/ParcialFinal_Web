<script lang="ts">
	import type { ArticleObj } from 'src/api/types';
	import { basket } from '../stores/basket';
	import BasketButtonOperation from './basket/basketButtonOperation.svelte';
	import BasketCounterOperation from './basket/basketCounterOperation.svelte';
	import Favourite from './favourite.svelte';

	export let article: ArticleObj;
</script>

<!--Card-->
<div class="col">
	<div class="card product-card positiion-relative">
		<Favourite />
		<a href="#" data-bs-toggle="modal" data-bs-target="#articleModal{article.id}">
			<img class="card-img-top position-relative" alt={article.alt} src={article.image} />
		</a>
		<div class="card-body text-center">
			<h4 class="card-title">{article.name}</h4>
			<h6 class="card-text">{`${article.amount} ${article.metric}`}</h6>
			<h5 class="text-success">{article.price} &euro</h5>
			<div class="card-basket-button">
				<BasketButtonOperation bind:article />
			</div>
		</div>
	</div>
</div>

<!--Modal-->
<div
	class="modal fade"
	id="articleModal{article.id}"
	tabindex="-1"
	aria-labelledby="{article.id}Label"
	aria-hidden="true"
>
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row row-cols-1 row-cols-md-2 g-4">
						<div class="col">
							<img id="{article.id}Image" alt={article.alt} src={article.image} class="w-50" />
						</div>
						<div class="col">
							<h1 class="mb-3">{article.name}</h1>
							<h5 class="mb-3">{`${article.amount} ${article.metric}`}</h5>
							<h2 class="text-success mb-0">{article.price} &euro</h2>
							<h7 class="mt-0">{article.discount}</h7>
							<p class="mt-5">{article.description}</p>
							<div class="d-flex justify-content-between">
								<BasketButtonOperation bind:article />
								{#key $basket}
									{#if $basket[article.id] !== undefined}
										<BasketCounterOperation bind:article />
									{/if}
								{/key}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.product-card {
		transition-duration: 1s;
		padding: 2vh 1vw;
		border: none;
		height: 500px;
	}

	.product-card:hover {
		border: 1px solid black;
		z-index: +100;
		transform: scale(1.025);
	}

	.product-card > .card-body > .card-basket-button {
		display: none;
	}

	.product-card:hover > .card-body > .card-basket-button {
		display: inline;
	}

	.product-card > .card-body > .card-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.product-card:hover > .card-body > .card-title {
		white-space: initial;
		overflow: visible;
		text-overflow: none;
	}
</style>
