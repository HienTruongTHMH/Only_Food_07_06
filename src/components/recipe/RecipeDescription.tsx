import { Circle } from "lucide-react";

interface Ingredient {
  amount: string;
  item: string;
}

interface InstructionStep {
  step: number;
  text: string;
}

const crustIngredients: Ingredient[] = [
  { amount: "400g", item: "graham crackers" },
  { amount: "150g", item: "unsalted butters, melted" },
];

const cheesecakeIngredients: Ingredient[] = [
  { amount: "300g", item: "marshmallows" },
  { amount: "300g", item: "marshmallows" },
  { amount: "500g", item: "Philadelphia cream cheese, softened" },
  { amount: "250ml", item: "thickened/whipping cream, warm" },
  { amount: "3tsp", item: "powdered gelatin + 3 tbsp water" },
  { amount: "6", item: "drops purple food gel" },
  { amount: "3", item: "drops blue food gel" },
];

const instructions: InstructionStep[] = [
  {
    step: 1,
    text: "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
  },
  {
    step: 2,
    text: 'Pour mixture into a 20cm (8") tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.',
  },
  {
    step: 3,
    text: "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
  },
  {
    step: 4,
    text: "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
  },
  {
    step: 5,
    text: "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
  },
  {
    step: 6,
    text: "Add the warm cream and melted gelatine mixture and mix until well combined.",
  },
];

export default function RecipeDescription() {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Ingredients */}
        <div className="space-y-8">
          {/* Ingredients Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ingredients
            </h2>

            {/* For the crust */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                For the crust
              </h3>
              <div className="space-y-3">
                {crustIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">
                      <span className="font-medium">{ingredient.amount}</span>{" "}
                      {ingredient.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* For the cheesecake */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                For the cheesecake
              </h3>
              <div className="space-y-3">
                {cheesecakeIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">
                      <span className="font-medium">{ingredient.amount}</span>{" "}
                      {ingredient.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nutrition Facts
            </h2>
          </div>
        </div>

        {/* Right Column - Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Instructions
          </h2>
          <div className="space-y-6">
            {instructions.map((instruction) => (
              <div key={instruction.step} className="flex gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {instruction.step}
                    </span>
                  </div>
                </div>

                {/* Step Text */}
                <div className="flex-1 pt-1">
                  <p className="text-gray-700 leading-relaxed">
                    {instruction.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}