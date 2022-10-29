<script lang="ts">
	import { apiBaseURL } from '../api/config';
	import { basket } from '../stores/basket';
</script>

<!-- Navbar-->
<nav class="navbar navbar-expand-lg">
	<div class="container-fluid">
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navarToggler"
			aria-controls="navarToggler"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse text-center" id="navarToggler">
			<ul class="navbar-nav mx-auto mb-2 mb-lg-0 w-75">
				<form class="d-flex p-1 ps-2 pe-2 mt-1 w-100 search-box">
					<input
						class="form-control"
						type="search"
						placeholder="Que productos estas buscando?"
						aria-label="Que productos estas buscando?"
						id="searchBar"
					/>
					<button class="btn" type="submit">
						<i class="fa-solid fa-magnifying-glass" />
					</button>
				</form>
				<li class="nav-item">
					<button class="btn navbar-button">
						<i class="fa-regular fa-heart" />
						<span>Mis Favoritos</span>
					</button>
				</li>
				<li class="nav-item">
					<div class="dropdown">
						<button
							class="btn navbar-button"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i class="fa-regular fa-circle-user" />
							<span>Mi Cuenta</span>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<li><a class="dropdown-item" href="#"><i class="fa-solid fa-user" /> Cuenta</a></li>
							<li>
								<a class="dropdown-item" href="#"><i class="fa-regular fa-heart" /> Mis Favoritos</a
								>
							</li>
							<li>
								<a class="dropdown-item" href="#"><i class="fa-solid fa-check" /> Mi Carrito</a>
							</li>
							<li>
								<a class="dropdown-item" href="#"><i class="fa-solid fa-lock" /> Entrar</a>
							</li>
							<li>
								<a class="dropdown-item" href="#"
									><i class="fa-solid fa-user-plus" /> Crear una Cuenta</a
								>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<button
						class="btn position-relative navbar-button"
						data-bs-toggle="modal"
						data-bs-target="#basketModal"
					>
						<i class="fa-solid fa-basket-shopping" />
						<span
							class="position-absolute translate-middle badge rounded-pill bg-secondary"
							style="top: 10%;"
							id="numberOfProductsInBasket"
						>
							{Object.keys($basket).length}
							<span class="visually-hidden">unread messages</span>
						</span>

						<span>Mi Carrito</span>
					</button>
				</li>
			</ul>
		</div>
	</div>
</nav>

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
					Mi carrito (<span id="numberOfProductsInBasketTitle">0</span>)
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div id="basketProducts" class="justify-content-center">
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
                                                <h5>{$basket[articleId].article.price * $basket[articleId].amount} &euro;</h5>
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
						<h7><span id="subtotalBasket" />&euro;</h7>
					</div>
					<hr />
					<div class="d-flex justify-content-between text-success">
						<h4 style="color: #009929;">TOTAL (IVA incluido):</h4>
						<h4 class="text-success"><span id="totalBasket" />&euro;</h4>
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

<style>
	.wrap-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
