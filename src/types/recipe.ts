export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  servings: number;
  category: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}