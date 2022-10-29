import { apiBaseURL } from "./config";
import type { Filter, ArticleResult } from "./types";

export async function articles(page: number, filter: Filter): Promise<ArticleResult> {
    const response = await fetch(apiBaseURL + `/articles/${page}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
    });
    const results = await response.json();
    return results;
}
