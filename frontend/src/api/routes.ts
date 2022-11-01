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

export async function register(
    names: string,
    lastNames: string,
    email: string,
    password: string
): Promise<string> {
    const response = await fetch(apiBaseURL + `/register`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "names": names,
            "last-names": lastNames
        })
    });
    const results = await response.json();
    return results["cookie"];
}

export async function buy(
    session: any,
    basket: any
) {
    await fetch(apiBaseURL + `/basket`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "session": session,
            articles: basket
        })
    });
}