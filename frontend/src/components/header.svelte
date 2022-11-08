<script lang="ts">
	import { register } from '../api/routes';
	import { session } from '../stores/session';
	import { basket } from '../stores/basket';
	import Basket from './modals/basket.svelte';

	export let minPrice: number = 0;
	export let maxPrice: number = 100;
	export let pattern: string = '';
	export let searchCallback: () => any;
	export let priceCallback: () => any;

	let names: string;
	let lastNames: string;
	let email: string;
	let password: string;
	let confirmPassword: string;

	function doRegister() {
		if (password !== confirmPassword) {
			alert('Las contrasenas no coinciden');
			return;
		}
		register(names, lastNames, email, password)
			.then((s) => {
				$session = s;
				alert('Usuario registrado con exito');
				names = '';
				lastNames = '';
				email = '';
				password = '';
				confirmPassword = '';
			})
			.catch(() => alert('registration failed'));
	}
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
						bind:value={pattern}
					/>
					<button
						class="btn text-reset"
						style="background-color: transparent;"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasFilter"
						aria-controls="offcanvasFilter"
					>
						<i class="fa-solid fa-filter" />
					</button>
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
								<a
									class="dropdown-item"
									href="#"
									data-bs-toggle="modal"
									data-bs-target="#registrationModal"
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

<!--Filters-->
<div
	class="offcanvas offcanvas-start"
	tabindex="-1"
	id="offcanvasFilter"
	aria-labelledby="offcanvasFilterLabel"
>
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasFilterLabel">Filtros</h5>
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
	</div>
	<div class="offcanvas-body">
		<div class="container mt-3">
			<input
				type="range"
				class="form-range"
				id="filterMaxPriceValueRange"
				min="0"
				max="100"
				bind:value={maxPrice}
			/>
			<div class="d-flex">
				<div class="w-50 me-1">
					<label>Desde:</label>
					<input
						class="form-control"
						type="number"
						id="filterMinPriceValueNumber"
						min="0"
						max="100"
						bind:value={minPrice}
					/>
				</div>
				<div class="w-50">
					<label>Hasta:</label>
					<input
						class="form-control"
						type="number"
						id="filterMaxPriceValueNumber"
						min="0"
						max="100"
						bind:value={maxPrice}
					/>
				</div>
			</div>
			<button
				class="btn w-100 mt-2 mb-2 green-button"
				style="border-radius: 50px;"
				on:click={priceCallback}>Filtrar</button
			>
		</div>
	</div>
</div>

<Basket />

<!-- Registration modal -->
<div
	class="modal fade"
	id="registrationModal"
	tabindex="-1"
	aria-labelledby="registrationModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<form on:submit|preventDefault={doRegister}>
						<h4>Crear nueva cuenta</h4>
						<input
							required
							type="text"
							class="form-control mt-3"
							placeholder="Nombres"
							bind:value={names}
						/>
						<input
							required
							type="text"
							class="form-control mt-3"
							placeholder="Apellidos"
							bind:value={lastNames}
						/>
						<h4 class="mt-3">Informacion de inicio de sesion</h4>
						<input
							required
							type="email"
							class="form-control mt-3"
							placeholder="Email"
							bind:value={email}
						/>
						<input
							required
							type="password"
							class="form-control mt-3"
							pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{8,}'}"
							placeholder="Contrasena"
							bind:value={password}
						/>
						<input
							required
							type="password"
							class="form-control mt-3"
							pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{8,}'}"
							placeholder="Repetir contrasena"
							bind:value={confirmPassword}
						/>
						<div class="mt-4 g-recaptcha" data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ" />
						<button class="btn w-100 green-button mt-3" style="border-radius: 50px;" type="submit"
							>Crear cuenta</button
						>
					</form>
				</div>
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
