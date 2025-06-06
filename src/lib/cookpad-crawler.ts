import axios from 'axios';
import * as cheerio from 'cheerio';

export interface CrawledRecipe {
  title: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  ingredients: string[];
  instructions: string[];
}

export class CookpadCrawler {
  private baseUrl = 'https://cookpad.com';
  
  async crawlRecipe(url: string): Promise<CrawledRecipe | null> {
    try {
      console.log(`🕷️ Crawling: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 15000
      });

      const $ = cheerio.load(response.data);
      
      // Extract title từ h1
      const title = $('h1').first().text().trim();
      console.log(`📝 Title found: ${title}`);
      
      // Extract image từ các selector phổ biến
      let image = '';
      const imageSources = [
        'meta[property="og:image"]',
        '.recipe-photo img',
        '.recipe_image img',
        'img[alt*="recipe"]',
        'img[src*="recipe"]',
        '.main-photo img',
        '.hero-image img'
      ];
      
      for (const selector of imageSources) {
        const imgSrc = $(selector).first().attr('content') || $(selector).first().attr('src');
        if (imgSrc) {
          image = imgSrc.startsWith('http') ? imgSrc : 
                 imgSrc.startsWith('//') ? `https:${imgSrc}` : 
                 `${this.baseUrl}${imgSrc}`;
          break;
        }
      }
      console.log(`🖼️ Image found: ${image}`);
      
      // Extract prep time
      let prepTime = 30; // default
      const timeSelectors = [
        '.recipe-info-time',
        '.cooking-time',
        '.prep-time',
        '[class*="time"]'
      ];
      
      for (const selector of timeSelectors) {
        const timeText = $(selector).text();
        const timeMatch = timeText.match(/(\d+)/);
        if (timeMatch) {
          prepTime = parseInt(timeMatch[1]);
          break;
        }
      }
      
      // Extract servings
      let servings = 2; // default
      const servingSelectors = [
        '.recipe-info-serving',
        '.serving-size',
        '[class*="serving"]'
      ];
      
      for (const selector of servingSelectors) {
        const servingText = $(selector).text();
        const servingMatch = servingText.match(/(\d+)/);
        if (servingMatch) {
          servings = parseInt(servingMatch[1]);
          break;
        }
      }
      
      // Extract ingredients từ div#ingredients
      const ingredients: string[] = [];
      
      // Thử selector chính xác mà bạn tìm thấy
      $('#ingredients li, #ingredients .ingredient, #ingredients p').each((_, element) => {
        const ingredient = $(element).text().trim();
        if (ingredient && ingredient.length > 1) {
          ingredients.push(ingredient);
        }
      });
      
      // Nếu không tìm thấy, thử các selector khác
      if (ingredients.length === 0) {
        $('.ingredients li, .ingredient-list li, .recipe-ingredients li').each((_, element) => {
          const ingredient = $(element).text().trim();
          if (ingredient && ingredient.length > 1) {
            ingredients.push(ingredient);
          }
        });
      }
      
      console.log(`🥕 Ingredients found: ${ingredients.length}`);
      
      // Extract instructions từ div#steps
      const instructions: string[] = [];
      
      // Thử selector chính xác
      $('#steps li, #steps .step, #steps p, #steps ol li').each((_, element) => {
        const instruction = $(element).text().trim();
        if (instruction && instruction.length > 5) {
          instructions.push(instruction);
        }
      });
      
      // Nếu không tìm thấy, thử các selector khác
      if (instructions.length === 0) {
        $('.steps li, .instruction-list li, .recipe-instructions li, .cooking-steps li').each((_, element) => {
          const instruction = $(element).text().trim();
          if (instruction && instruction.length > 5) {
            instructions.push(instruction);
          }
        });
      }
      
      console.log(`📋 Instructions found: ${instructions.length}`);
      
      // Determine category
      const category = this.categorizeRecipe(title, ingredients);
      
      const recipe: CrawledRecipe = {
        title: title || 'Món ăn ngon',
        image: image || '/images/default-food.jpg',
        prepTime,
        servings,
        category,
        ingredients: ingredients.length > 0 ? ingredients : ['Nguyên liệu đang được cập nhật'],
        instructions: instructions.length > 0 ? instructions : ['Hướng dẫn đang được cập nhật']
      };
      
      console.log(`✅ Successfully crawled: ${recipe.title}`);
      console.log(`   - Ingredients: ${recipe.ingredients.length}`);
      console.log(`   - Instructions: ${recipe.instructions.length}`);
      
      return recipe;
      
    } catch (error) {
      console.error(`❌ Error crawling ${url}:`, error);
      return null;
    }
  }
  
  private categorizeRecipe(title: string, ingredients: string[]): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('gà') || titleLower.includes('chicken')) return 'mon-chinh';
    if (titleLower.includes('thịt') || titleLower.includes('pork') || titleLower.includes('beef')) return 'mon-chinh';
    if (titleLower.includes('canh') || titleLower.includes('soup')) return 'canh-soup';
    if (titleLower.includes('cơm') || titleLower.includes('rice')) return 'com-rang';
    if (titleLower.includes('bánh') || titleLower.includes('cake') || titleLower.includes('chè')) return 'trang-mieng';
    if (titleLower.includes('nước') || titleLower.includes('drink')) return 'do-uong';
    if (titleLower.includes('nui') || titleLower.includes('pasta')) return 'mon-chinh';
    
    return 'mon-chinh';
  }
  
  async crawlMultipleRecipes(urls: string[]): Promise<CrawledRecipe[]> {
    const recipes: CrawledRecipe[] = [];
    
    for (const url of urls) {
      try {
        const recipe = await this.crawlRecipe(url);
        if (recipe) {
          recipes.push(recipe);
        }
        // Delay để tránh bị block
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
      }
    }
    
    return recipes;
  }
}