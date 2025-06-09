import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 text-gray-400 mb-6">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Category Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Category not found. Please check the URL or return to the homepage.
        </p>
        <div className="space-x-4">
          <Link
            href="/recipes"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            View All Recipes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </main>
  );
}