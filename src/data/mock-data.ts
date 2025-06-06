// Mock data for fallback or development
export const mockCategories = [
  { id: 'mon-chinh', name: 'Món chính', image: '/images/categories/pasta 1.png' },
  { id: 'mon-an-vat', name: 'Món ăn vặt', image: '/images/categories/pizza 1.png' },
  { id: 'trang-mieng', name: 'Tráng miệng', image: '/images/categories/dessert 1.png' },
  { id: 'do-uong', name: 'Đồ uống', image: '/images/categories/smoothie 1.png' },
  { id: 'com-rang', name: 'Cơm rang', image: '/images/categories/breakfast 1.png' },
  { id: 'canh-soup', name: 'Canh & Soup', image: '/images/categories/vegan food 1.png' }
];

export const mockRecipes = [
  {
    id: 'spinach-cheese-pasta',
    title: 'Spinach and Cheese Pasta',
    image: '/images/spinach and cheese pasta.png',
    prepTime: 25,
    servings: 4,
    category: 'mon-chinh'
  },
  {
    id: 'glazed-donuts',
    title: 'Fancy Glazed Donuts',
    image: '/images/donut 1.png',
    prepTime: 45,
    servings: 6,
    category: 'trang-mieng'
  },
  {
    id: 'cheese-burger',
    title: 'Cheese Burger',
    image: '/images/cheese burger.png',
    prepTime: 20,
    servings: 2,
    category: 'mon-chinh'
  }
];