import { CookpadCrawler } from '../src/lib/cookpad-crawler';
import { prisma } from '../src/lib/prisma';

const cookpadUrls = [
  "https://cookpad.com/vn/cong-thuc/24359944-ga-kho-g%E1%BB%ABng-th%C6%A1m-l%E1%BB%ABng-hao-c%C6%A1m?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/24756992-canh-n%E1%BA%A5m-kim-cham-n%E1%BA%A5u-th%E1%BB%8Bt-vien?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/24360328-nui-n%E1%BA%A5u-m%E1%BB%8Dc-n%E1%BA%A5m-l%E1%BB%99c-nhung?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/24096080-canh-c%E1%BA%A3i-xanh-n%E1%BA%A5u-m%E1%BB%8Dc?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/22607339-th%E1%BB%8Bt-rang-th%C6%A1mkhom?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/21880856-th%E1%BB%8Bt-ba-r%E1%BB%8Di-rang-n%C6%B0%E1%BB%9Bc-m%E1%BA%AFm?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/17280882-th%E1%BB%8Bt-xay-rang-hanh-va-ca-r%E1%BB%91t?ref=search_top",
  "https://cookpad.com/vn/cong-thuc/11314511-th%E1%BB%8Bt-ba-ch%E1%BB%89-rang-tom?ref=search_top"
];

async function seedCategories() {
  const categories = [
    { id: 'mon-chinh', name: 'Món chính', image: '/images/categories/pasta 1.png' },
    { id: 'mon-an-vat', name: 'Món ăn vặt', image: '/images/categories/pizza 1.png' },
    { id: 'trang-mieng', name: 'Tráng miệng', image: '/images/categories/dessert 1.png' },
    { id: 'do-uong', name: 'Đồ uống', image: '/images/categories/smoothie 1.png' },
    { id: 'com-rang', name: 'Cơm rang', image: '/images/categories/breakfast 1.png' },
    { id: 'canh-soup', name: 'Canh & Soup', image: '/images/categories/vegan food 1.png' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    });
  }
  console.log('✅ Categories seeded');
}

async function main() {
  console.log('🚀 Starting crawl and save process...');
  
  // Seed categories first
  await seedCategories();
  
  // Crawl recipes
  const crawler = new CookpadCrawler();
  const crawledRecipes = await crawler.crawlMultipleRecipes(cookpadUrls);
  
  console.log(`📝 Crawled ${crawledRecipes.length} recipes. Saving to database...`);
  
  for (const recipe of crawledRecipes) {
    try {
      // Generate unique ID từ title
      const id = recipe.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      await prisma.recipe.upsert({
        where: { id },
        update: {
          title: recipe.title,
          image: recipe.image,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          category: recipe.category,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        },
        create: {
          id,
          title: recipe.title,
          image: recipe.image,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          category: recipe.category,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        }
      });
      
      console.log(`✅ Saved: ${recipe.title}`);
    } catch (error) {
      console.error(`❌ Error saving ${recipe.title}:`, error);
    }
  }
  
  console.log('🎉 Crawling and saving completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });