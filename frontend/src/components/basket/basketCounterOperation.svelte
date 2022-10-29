<script>
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { basket } from '../../stores/basket';

	export let article = {
		id: Math.floor(Math.random() * 1000),
		name: 'Example article',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt beatae fugiat numquam ullam in, iure quaerat perferendis expedita! Maxime assumenda, officia quisquam adipisci ab voluptatibus sequi laborum dolor illo reiciendis aut voluptas aperiam. Inventore odio obcaecati nulla provident reiciendis, doloribus sint, amet nesciunt similique aliquam numquam voluptatem impedit, ullam reprehenderit aut qui cupiditate animi! Amet quasi quibusdam voluptate. Voluptate nemo sed fugiat perspiciatis consectetur totam animi amet accusamus. Eius, minima eaque! Libero omnis, provident unde voluptatem illo nam possimus, reprehenderit cum sint atque tempora in. Quo, corporis non. Est quis minima officia aliquid? Optio numquam consectetur odit, suscipit quas deleniti.',
		amount: Math.floor(Math.random() * 1000),
		metric: 'UND',
		price: Math.floor(Math.random() * 1000),
		discount: Math.floor(Math.random() * 50),
		alt: 'img',
		image: 'https://piel.net.co/3726-thickbox_default/bonac-locion-eritromicina-2-x60ml.jpg'
	};

	let value = $basket[article.id] === undefined ? 0 : $basket[article.id].amount;

	function updateHandle() {
		if (value === 0 && $basket[article.id] !== undefined) {
			delete $basket[article.id];
			$basket = $basket;
			return;
		}
		if ($basket[article.id] === undefined) {
			$basket[article.id] = { article: article, amount: value };
			return;
		}
		$basket[article.id].amount = value;
	}
</script>

<input
	on:change={updateHandle}
	class="form-control basket-counter"
	type="number"
	min="0"
	max="99"
	bind:value
/>

<style>
    .basket-counter {
        width: 100px;
    }
</style>