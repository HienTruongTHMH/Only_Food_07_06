export default function RecipeInstructions() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>To prepare crust add graham crackers to a food processor...</li>
        <li>Pour mixture into a 20cm (8&quot;) tart tin...</li>
        <li>Begin by adding marshmallows and butter...</li>
        {/* ...các bước khác tương tự */}
        <li>Slice with a knife to serve.</li>
      </ol>
    </div>
  );
}