import { apiBaseURL } from "./config";
import type { ArticleObj, Filter } from "./types";

export async function articles(page: number, filter: Filter): Promise<ArticleObj[]> {
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
