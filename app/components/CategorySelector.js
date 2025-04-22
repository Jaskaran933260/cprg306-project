const categories = [
    "general", "business", "technology",
    "sports", "entertainment", "health", "science"
];

export default function CategorySelector({ selected, onSelect }) {
    return (
        <div className="flex flex-wrap justify-center gap-3 bg-white py-4 shadow">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-2 rounded-full text-sm capitalize transition
              ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-100'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
