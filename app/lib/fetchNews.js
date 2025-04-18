// lib/fetchNews.js
export async function fetchNews(category = "general") {
    try {
        const res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
        );
        const data = await res.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
