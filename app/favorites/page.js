// app/favorites/page.js
'use client';

import { useEffect, useState } from 'react';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        setFavorites(stored ? JSON.parse(stored) : []);
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">⭐ Your Favorite Articles</h2>
            {favorites.length === 0 ? (
                <p className="text-gray-600">No favorites added yet.</p>
            ) : (
                <div className="grid gap-4">
                    {favorites.map((article, i) => (
                        <div key={i} className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold">{article.title}</h3>
                            <p className="text-sm text-gray-600">{article.description}</p>
                            <a href={article.url} target="_blank" className="text-blue-500 text-sm underline">
                                Read more →
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
