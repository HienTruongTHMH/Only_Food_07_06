export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}