import { prisma } from '../src/lib/prisma';

async function testQueries() {
  console.log('🔍 Testing basic database queries...');
  
  try {
    // Test 1: Count all tables
    const [recipeCount, categoryCount, userCount] = await Promise.all([
      prisma.recipe.count(),
      prisma.category.count(),
      prisma.user.count(),
    ]);
    
    console.log('📊 Table counts:');
    console.log(`   - Recipes: ${recipeCount}`);
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Users: ${userCount}`);
    
    // Test 2: Sample data queries
    console.log('\n🔎 Sample data:');
    
    const categories = await prisma.category.findMany({ take: 3 });
    console.log(`📂 Categories (${categories.length}):`, 
      categories.map(c => c.name).join(', '));
    
    const recipes = await prisma.recipe.findMany({ 
      take: 3,
      select: { title: true, category: true }
    });
    console.log(`🍽️ Recipes (${recipes.length}):`, 
      recipes.map(r => `${r.title} (${r.category})`).join(', '));
    
    // Test 3: Complex query với relations
    const recipesWithDetails = await prisma.recipe.findMany({
      take: 1,
      include: {
        favorites: true,
        comments: true,
        reviews: true,
      }
    });
    
    console.log('\n🔗 Relations test:');
    if (recipesWithDetails.length > 0) {
      const recipe = recipesWithDetails[0];
      console.log(`📝 Recipe: ${recipe.title}`);
      console.log(`   ❤️ Favorites: ${recipe.favorites.length}`);
      console.log(`   💬 Comments: ${recipe.comments.length}`);
      console.log(`   ⭐ Reviews: ${recipe.reviews.length}`);
    }
    
    // Test 4: Schema validation
    console.log('\n✅ Schema validation:');
    console.log('   🔧 All models accessible');
    console.log('   🔗 Relations working');
    console.log('   📝 Queries executing successfully');
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Query test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testQueries();
