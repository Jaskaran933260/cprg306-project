'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Playfair_Display } from 'next/font/google';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

export default function HomePage() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('general');
    const [favorites, setFavorites] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    const categories = [
        'general',
        'business',
        'technology',
        'sports',
        'entertainment',
        'health',
        'science',
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        setFavorites(stored ? JSON.parse(stored) : []);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=1e26cff82a524232815e05cb03df7f07`
            );

            const data = await res.json();
            setArticles(data.articles || []);
        };
        fetchNews();
    }, [category]);

    const handleFavorite = (article) => {
        const isFav = favorites.find((a) => a.title === article.title);
        let updated;
        if (isFav) {
            updated = favorites.filter((a) => a.title !== article.title);
        } else {
            updated = [...favorites, article];
        }
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const isFavorite = (title) => favorites.some((a) => a.title === title);

    const handleLogout = () => {
        signOut(auth);
        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navbar */}
            <nav className="bg-blue-800 text-white px-4 py-4 flex items-center justify-between relative shadow-md">
                {/* Menu button on the left */}
                <div className="absolute left-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="bg-white px-3 py-1 rounded text-black hover:bg-blue-100"
                    >
                        ☰ Menu
                    </button>
                </div>

                <h1 className={`text-4xl text-white mx-auto ${playfair.className}`}>
                    📰NewsNext
                </h1>

                <div className="absolute right-4 text-sm text-white">
                    {user && `Welcome, ${user.displayName || user.email}`}
                </div>
            </nav>

            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="bg-white shadow-lg w-full sm:w-64 p-4 absolute z-50 top-20 left-0 sm:left-auto">
                    <nav className="flex flex-col gap-3 text-sm">
                        <Link href="/" className="hover:underline text-blue-600">
                            Home
                        </Link>
                        <Link href="/favorites" className="hover:underline text-blue-600">
                            Favorites
                        </Link>
                        {!user ? (
                            <Link href="/login" className="hover:underline text-blue-600">
                                Log In / Sign Up
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-left text-blue-600 hover:underline"
                            >
                                Log Out
                            </button>
                        )}
                    </nav>
                </aside>
            )}

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 p-4 mt-4 bg-white shadow">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-sm capitalize font-medium transition ${category === cat
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* News Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {articles.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No news found.</p>
                ) : (
                    articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-semibold">{article.title}</h2>
                                    <button onClick={() => handleFavorite(article)}>
                                        {isFavorite(article.title) ? (
                                            <FaStar className="text-yellow-500" />
                                        ) : (
                                            <FiStar className="text-gray-400 hover:text-yellow-400" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    className="text-blue-600 hover:underline text-sm mt-2 block"
                                >
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
