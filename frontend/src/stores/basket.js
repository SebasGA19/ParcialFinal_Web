import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const basket = writable(browser && (JSON.parse(localStorage.getItem('basket') || '{}')));
export const unsubscribeBasket = basket.subscribe(value => browser && (localStorage.setItem('basket', JSON.stringify(value))));
