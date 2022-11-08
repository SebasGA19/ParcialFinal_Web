<script lang="ts">
	import { buy } from '../../api/routes';
	import { onMount } from 'svelte';
	import { apiBaseURL } from '../../api/config';
	import { session } from '../../stores/session';
	import { basket } from '../../stores/basket';
	import BasketButtonOperation from '../basket/basketButtonOperation.svelte';
	import BasketCounterOperation from '../basket/basketCounterOperation.svelte';

	let total: number = 0;
	let subTotal: number = 0;
	let keys: string[];
	let amount: number = 0;
	function refresh() {
		keys = Object.keys($basket);
		amount = keys.length;
		subTotal = 0;
		keys.forEach((id) => {
			const entry = $basket[id];
			subTotal += entry.amount * entry.article.price * (1 - entry.article.discount / 100);
		});
		total = subTotal * 1.19;
	}

	function doBuy() {
		if ($session !== undefined && $basket !== undefined) {
			if (process && process.browser) {
			buy($session, $basket).then(() => alert("Compra realizada con exito")).catch();
			}
		}
	}
	onMount(refresh);
	$: {
		$basket;
		refresh();
	}
</script>

<!--Basket Modal-->
<div
	class="modal fade"
	id="basketModal"
	tabindex="-1"
	aria-labelledby="basketModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title text-success" id="basketModalLabel">
					Mi carrito (<span>{amount}</span>)
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="justify-content-center">
						{#key $basket}
							{#each keys as articleId}
								<div class="row">
									<div class="col text-center">
										<img
											class="w-50"
											src={`${apiBaseURL}${$basket[articleId].article.image}`}
											alt={$basket[articleId].article.alt}
										/>
									</div>
									<div class="col">
										<div class="d-flex justify-content-between">
											<h3 class="text-left wrap-text">{$basket[articleId].article.name}</h3>
											
										</div>
										<div class="d-flex justify-content-between">
											<h6>Canitdad:</h6>
											<h5>
												{$basket[articleId].amount}
											</h5>
										</div>
										<div class="d-flex justify-content-between">
											<h6>Precio:</h6>
											<h5>
												{(
													$basket[articleId].article.price *
													$basket[articleId].amount *
													(1 - $basket[articleId].article.discount / 100)
												).toFixed(2)} &euro;
											</h5>
										</div>
										<div class="d-flex justify-content-between">
											<BasketButtonOperation article={$basket[articleId].article} />
											<BasketCounterOperation article={$basket[articleId].article} />
										</div>
									</div>
								</div>
							{/each}
						{/key}
					</div>
					<hr />
					<div class="d-flex justify-content-between">
						<h7>Subtotal:</h7>
						<h7>{subTotal.toFixed(2)}<span />&euro;</h7>
					</div>
					<hr />
					<div class="d-flex justify-content-between text-success">
						<h4 style="color: #009929;">TOTAL (IVA incluido):</h4>
						<h4 class="text-success">{total.toFixed(2)}<span />&euro;</h4>
					</div>
					<hr />
					{#if total < 50 && subTotal > 0}
						<p class="text-success">
							Te falta {(50 - total).toFixed(2)} &euro; para disfrutar del envio gratis
						</p>
					{:else if total >= 50 && subTotal > 0}
						<p class="text-success">Tu envio es gratis</p>
					{/if}
				</div>
				<button class="btn w-100 green-button" style="border-radius: 50px;"> Ir al carrito </button>
				<button
					class="btn w-100 mt-2 mb-2 green-button"
					style="border-radius: 50px;"
					on:click={doBuy}
				>
					Realizar el pedido
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.green-button {
		border-radius: 50px;
		background-color: #009929;
		color: white;
	}

	.green-button:hover {
		background-color: #006414;
		color: white;
	}
</style>
