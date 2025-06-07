-- Migration Template: Thêm indexes cho performance
-- File: prisma/migrations/[timestamp]_add_performance_indexes/migration.sql

-- 1. Indexes cho tìm kiếm recipes
CREATE INDEX IF NOT EXISTS "recipes_category_idx" ON "recipes"("category");
CREATE INDEX IF NOT EXISTS "recipes_published_idx" ON "recipes"("isPublished");
CREATE INDEX IF NOT EXISTS "recipes_created_at_idx" ON "recipes"("createdAt" DESC);

-- 2. Full-text search index cho title (PostgreSQL specific)
CREATE INDEX IF NOT EXISTS "recipes_title_search_idx" ON "recipes" USING gin(to_tsvector('english', "title"));

-- 3. Composite indexes
CREATE INDEX IF NOT EXISTS "recipes_category_published_idx" ON "recipes"("category", "isPublished");
CREATE INDEX IF NOT EXISTS "favorites_user_created_idx" ON "favorites"("userId", "createdAt" DESC);

-- 4. Indexes cho relations
CREATE INDEX IF NOT EXISTS "comments_recipe_created_idx" ON "comments"("recipeId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "reviews_recipe_rating_idx" ON "reviews"("recipeId", "rating" DESC);
