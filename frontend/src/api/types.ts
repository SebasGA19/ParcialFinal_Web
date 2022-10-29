type Filter = {
    pattern?: string
    "price-from"?: number
    "price-to"?: number
};

type ArticleObj = {
    id: number,
    amount: number,
    metric: string,
    name: string,
    description: string,
    price: number,
    image: string,
    alt: string,
    discount: number
};

type ArticleResult = {
    pages: number,
    articles: ArticleObj[]
};

export type { ArticleObj, Filter, ArticleResult};