<script lang="ts">
	import type {Filter} from "../api/types";
	import { articles } from "../api/routes";

    let page: number = 1;
    let filter: Filter = {};
    articles(page, filter)
    .then(results => console.log(results));
</script>

<div class="container">

</div>