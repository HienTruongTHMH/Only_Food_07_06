import { PrismaClient } from '@prisma/client';
import mockData from '../src/data/mock-recipes.json';

const prisma = new PrismaClient();

async function seedFromMockData() {
  console.log('Seeding from mock-recipes.json...');

  try {
    // Clear existing data
    await prisma.favorite.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.category.deleteMany();

    // Seed categories
    for (const category of mockData.categories) {
      await prisma.category.create({
        data: {
          slug: category.id,
          name: category.name,
          image: category.image,
          description: `Danh mục ${category.name}`,
          recipeCount: 0
        }
      });
    }

    // Seed recipes
    for (const recipe of mockData.recipes) {
      const slug = recipe.id;
      
      await prisma.recipe.create({
        data: {
          title: recipe.title,
          slug: slug,
          image: recipe.src,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          category: mockData.categories.find(cat => cat.id === recipe.category)?.name || 'Khác',
          difficulty: 'Trung bình',
          calories: 300,
          tags: [recipe.category, 'Ngon'],
          isPublished: true
        }
      });
    }

    // Update category recipe counts
    for (const category of mockData.categories) {
      const recipeCount = mockData.recipes.filter(recipe => recipe.category === category.id).length;
      
      await prisma.category.update({
        where: { slug: category.id },
        data: { recipeCount }
      });
    }

    console.log('Mock data seeded successfully!');
  } catch (error) {
    console.error('Error seeding mock data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFromMockData();
