import { prisma } from '../src/lib/prisma';
import fs from 'fs/promises';

async function backupDatabase() {
  console.log('🔄 Starting Prisma-based backup...');
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = 'backups';
    
    // Tạo thư mục backup
    await fs.mkdir(backupDir, { recursive: true });
    
    // Backup tất cả data
    const [recipes, categories, users, favorites, comments, reviews] = await Promise.all([
      prisma.recipe.findMany(),
      prisma.category.findMany(),
      prisma.user.findMany(),
      prisma.favorite.findMany(),
      prisma.comment.findMany(),
      prisma.review.findMany(),
    ]);
    
    const backupData = {
      timestamp: new Date().toISOString(),
      recipes,
      categories,
      users,
      favorites,
      comments,
      reviews,
    };
    
    const backupFile = `${backupDir}/prisma_backup_${timestamp}.json`;
    await fs.writeFile(backupFile, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Backup completed: ${backupFile}`);
    console.log(`📊 Stats:`);
    console.log(`   - Recipes: ${recipes.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Favorites: ${favorites.length}`);
    console.log(`   - Comments: ${comments.length}`);
    console.log(`   - Reviews: ${reviews.length}`);
    
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backupDatabase();
