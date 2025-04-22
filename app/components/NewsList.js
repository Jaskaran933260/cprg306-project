export default function NewsList({ articles = [] }) {
    if (!articles || articles.length === 0) {
        return <p className="text-center mt-10 text-gray-600">No news found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
            {articles.map((article, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    {article.urlToImage && (
                        <img src={article.urlToImage} alt="" className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">{article.title}</h2>
                        <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm block mt-3"
                        >
                            Read more →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
