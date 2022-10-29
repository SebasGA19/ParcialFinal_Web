<script lang="ts">
	import type { ArticleObj } from 'src/api/types';
	import { basket } from '../../stores/basket';
	import Orange from '../buttons/orange.svelte';
    
	export let article: ArticleObj;
	function addToBasket() {
		($basket)[article.id] = {article: article, amount: 1};
	}

	function removeFromBasket() {
        delete ($basket)[article.id];
		$basket = $basket;
    }
</script>

<Orange onclick={$basket[article.id] === undefined ? addToBasket : removeFromBasket}>
	<i class="fa-solid fa-basket-shopping" />{$basket[article.id] === undefined
		? 'Anadir a la cesta'
		: 'Remover de la cesta'}
</Orange>

<style>
</style>
