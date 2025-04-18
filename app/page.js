'use client';

import { useEffect, useState } from 'react';

// Load Google Font using next/font if you're using app directory
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

const categories = [
    'general',
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science',
];

export default function HomePage() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('general');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=1e26cff82a524232815e05cb03df7f07`
                );
                const data = await res.json();
                setArticles(data.articles || []);
            } catch (err) {
                console.error('Error fetching news:', err);
                setArticles([]);
            }
            setTimeout(() => setIsLoading(false), 300); // smoother UX
        };
        fetchNews();
    }, [category]);

    return (
        <main className="min-h-screen bg-gray-100 font-sans">
            {/* Header with stylish font */}
            <header className="bg-indigo-800 text-white text-center py-8 shadow-lg">
                <h1
                    className={`text-5xl tracking-wide uppercase drop-shadow-md ${playfair.className}`}
                >
                    🗞️ NewsNext
                </h1>
                <p className="text-lg text-indigo-200 mt-3 font-light italic">
                    Your trusted source for today’s top headlines
                </p>
            </header>

            {/* Category buttons */}
            <section className="flex flex-wrap justify-center gap-3 p-5 bg-white shadow">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-sm capitalize font-medium transition-all duration-300 ${category === cat
                                ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-md'
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:scale-105'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* News Articles with transition on category change */}
            <section
                key={category}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-500 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100'
                    }`}
            >
                {articles.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No news found.</p>
                ) : (
                    articles.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                        >
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
                                <p className="text-sm text-gray-600">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm mt-2 block"
                                >
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}
