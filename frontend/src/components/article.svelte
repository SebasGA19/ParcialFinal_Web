<script lang="ts">
	import { apiBaseURL } from '../api/config';
	import type { ArticleObj } from 'src/api/types';
	import { basket } from '../stores/basket';
	import BasketButtonOperation from './basket/basketButtonOperation.svelte';
	import BasketCounterOperation from './basket/basketCounterOperation.svelte';
	import Favourite from './favourite.svelte';
	import Discount from './discount.svelte';

	export let article: ArticleObj;
</script>

<!--Card-->
<div class="col">
	<div class="card product-card positiion-relative">
		<a href="#" data-bs-toggle="modal" data-bs-target="#articleModal{article.id}">
			<img
				class="card-img-top position-relative"
				alt={article.alt}
				src={`${apiBaseURL}${article.image}`}
			/>
		</a>
		<div style="top: 5%; left: 90%;" class="position-absolute translate-middle badge rounded-pill">
			<Favourite />
		</div>
		<div style="top: 5%; left: 15%;" class="position-absolute translate-middle badge rounded-pill">
			<Discount discount={article.discount} />
		</div>
		<div class="card-body text-center">
			<div class="article-body">
				<h4 class="card-title">{article.name}</h4>
				<h6 class="card-text">{`${article.amount} ${article.metric}`}</h6>
				<h5 class="text-success">{article.price} &euro</h5>
			</div>
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
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row row-cols-1 row-cols-md-2 g-4">
						<div class="col text-center align-items-center">
							<img
								alt={article.alt}
								src={`${apiBaseURL}${article.image}`}
								class="w-75"
							/>
						</div>
						<div class="col p-5">
							<div class="d-flex align-items-center">
								<h1 class="mb-3 me-3">{article.name}</h1>
								<div class="me-3"><Favourite /></div>
								<Discount discount={article.discount} />
							</div>
							<div class="row">
								<div class="col">
									<h2>Units:</h2>
								</div>
								<div class="col">
									<h5 class="mb-3">{`${article.amount} ${article.metric}`}</h5>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<h2>Price:</h2>
								</div>
								<div class="col">
									<h2 class="text-success mb-0">{article.price} &euro</h2>
								</div>
							</div>
							<p class="mt-5" style="text-align: justify;">{article.description}</p>
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
		height: 600px;
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

	.article-body {
		height: 140px;
	}

	.card-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.product-card:hover .card-title {
		white-space: initial;
		overflow: visible;
		text-overflow: none;
		max-height: 100px;
		overflow: hidden;
		line-height: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
	}
</style>
