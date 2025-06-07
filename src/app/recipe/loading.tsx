export default function RecipesLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-md w-64 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-md w-96 animate-pulse"></div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="flex mb-6 space-x-2">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>

      {/* Category Pills Skeleton */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-full w-20 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Count Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}