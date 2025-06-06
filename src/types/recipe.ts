export interface Recipe {
  id: string;
  title: string;
  image: string; // Đây là sau khi convert từ 'src'
  src?: string;   // Optional, để tương thích với JSON
  prepTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}