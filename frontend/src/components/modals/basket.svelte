<script>
	import { apiBaseURL } from '../../api/config';
	import { basket } from '../../stores/basket';
</script>

<!--Basket Modal-->
<div
	class="modal fade"
	id="basketModal"
	tabindex="-1"
	aria-labelledby="basketModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title text-success" id="basketModalLabel">
					Mi carrito (<span>0</span>)
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="justify-content-center">
						{#key $basket}
							{#each Object.keys($basket) as articleId}
								<div class="row row-cols-1 row-cols-md-7">
									<div class="col">
										<img
											style="width: 100px;"
											src={`${apiBaseURL}${$basket[articleId].article.image}`}
											alt={$basket[articleId].article.alt}
										/>
									</div>
									<div class="col">
										<div class="container">
											<div class="row w-100">
												<div class="col col-8">
													<h3 class="text-left wrap-text">{$basket[articleId].article.name}</h3>
												</div>
												<div class="col col-4">
													<button type="button" class="col-2 btn-close" />
												</div>
											</div>
											<h6>{1}</h6>
											<div class="d-flex justify-content-between">
												<h6>Canitdad: {$basket[articleId].amount}</h6>
												<h5>
													{$basket[articleId].article.price * $basket[articleId].amount} &euro;
												</h5>
											</div>
										</div>
									</div>
								</div>
							{/each}
						{/key}
					</div>
					<hr />
					<div class="d-flex justify-content-between">
						<h7>Subtotal:</h7>
						<h7><span />&euro;</h7>
					</div>
					<hr />
					<div class="d-flex justify-content-between text-success">
						<h4 style="color: #009929;">TOTAL (IVA incluido):</h4>
						<h4 class="text-success"><span />&euro;</h4>
					</div>
					<hr />
					<p class="text-success">Te falta 6.99 &euro; para disfrutar del envio gratis</p>
				</div>
				<button class="btn w-100 green-button" style="border-radius: 50px;">Ir al carrito</button>
				<button class="btn w-100 mt-2 mb-2 green-button" style="border-radius: 50px;"
					>Realizar el pedido</button
				>
			</div>
		</div>
	</div>
</div>
