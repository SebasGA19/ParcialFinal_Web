<script lang="ts">
	import { apiBaseURL } from '../api/config';
	import { basket } from '../stores/basket';
	import Basket from './modals/basket.svelte';

	export let patternFilter: string = '';
	export let searchCallback: () => any;
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
				<form
					class="d-flex p-1 ps-2 pe-2 mt-1 w-100 search-box"
					on:submit|preventDefault={searchCallback}
				>
					<input
						class="form-control"
						placeholder="Que productos estas buscando?"
						aria-label="Que productos estas buscando?"
						bind:value={patternFilter}
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

<Basket />

<style>
	.wrap-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
