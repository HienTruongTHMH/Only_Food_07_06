import { useState, useEffect, useRef } from "react";
import data from "@/data/recipes.json";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(data);
  const [showAll, setShowAll] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(data);
    } else {
      setResults(
        data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    setShowAll(false); // Reset showAll khi search mới
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup khi unmount hoặc khi đóng modal
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Chỉ lấy 5 kết quả đầu nếu chưa bấm showAll
  const displayedResults = showAll ? results : results.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex flex-col items-center justify-start pt-6">
      <div className="bg-white w-full max-w-4xl rounded-b-2xl shadow-lg p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-6 text-2xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food..."
          className="w-full border-b border-gray-400 text-lg px-2 py-2 outline-none"
        />
        {/* Results */}
        <div className="mt-6 max-h-[300px] overflow-y-auto">
          {displayedResults.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-2 border-b last:border-b-0"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={100}
                height={100}
                className="rounded"
              />
              <span className="text-gray-800">{item.title}</span>
            </div>
          ))}
        </div>
        {/* See all results */}
        {results.length > 5 && (
          <div className="flex justify-center mt-8">
            <button
              className="border px-6 py-2 rounded hover:bg-gray-100"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show less" : `See all ${results.length} results`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
