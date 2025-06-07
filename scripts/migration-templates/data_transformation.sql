-- Migration Template: Data transformation với conditional logic
-- File: prisma/migrations/[timestamp]_transform_existing_data/migration.sql

-- 1. Cập nhật data có điều kiện
UPDATE "recipes" 
SET "difficulty" = CASE 
    WHEN "prepTime" <= 15 THEN 'Dễ'
    WHEN "prepTime" <= 45 THEN 'Trung bình'
    ELSE 'Khó'
END
WHERE "difficulty" IS NULL OR "difficulty" = '';

-- 2. Tạo slug từ title cho records cũ
UPDATE "recipes" 
SET "slug" = LOWER(
    TRIM(
        REGEXP_REPLACE(
            REGEXP_REPLACE("title", '[^a-zA-Z0-9\s]', '', 'g'),
            '\s+', '-', 'g'
        )
    )
)
WHERE "slug" IS NULL;

-- 3. Đảm bảo slug unique
WITH numbered_recipes AS (
    SELECT id, slug, ROW_NUMBER() OVER (PARTITION BY slug ORDER BY "createdAt") as rn
    FROM "recipes"
    WHERE slug IS NOT NULL
)
UPDATE "recipes" 
SET "slug" = "recipes"."slug" || '-' || numbered_recipes.rn
FROM numbered_recipes
WHERE "recipes".id = numbered_recipes.id 
AND numbered_recipes.rn > 1;

-- 4. Set default values
UPDATE "categories" 
SET "recipeCount" = (
    SELECT COUNT(*) 
    FROM "recipes" 
    WHERE "recipes"."category" = "categories"."id"
)
WHERE "recipeCount" = 0;
