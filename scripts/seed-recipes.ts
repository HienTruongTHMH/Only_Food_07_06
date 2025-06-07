import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleRecipes = [
  {
    title: "Bánh mì kẹp thịt nướng",
    image: "/images/banh-mi-kep-thit-nuong.jpg",
    prepTime: 30,
    servings: 2,
    category: "Món chính",
    ingredients: [
      "2 ổ bánh mì",
      "300g thịt ba chỉ",
      "Rau xà lách",
      "Cà chua",
      "Dưa chuột",
      "Tương ớt",
      "Mayonnaise"
    ],
    instructions: [
      "Ướp thịt với gia vị trong 30 phút",
      "Nướng thịt đến khi chín vàng",
      "Rửa sạch rau củ",
      "Xắt bánh mì, phết sauce",
      "Cho thịt và rau vào bánh mì",
      "Thưởng thức ngay"
    ],
    difficulty: "Dễ",
    calories: 450,
    tags: ["Việt Nam", "Nhanh", "Ngon"]
  },
  {
    title: "Phở bò Hà Nội",
    image: "/images/pho-bo-ha-noi.jpg",
    prepTime: 120,
    servings: 4,
    category: "Món chính",
    ingredients: [
      "500g xương bò",
      "300g thịt bò",
      "Bánh phở",
      "Hành tây",
      "Gừng",
      "Thì là, hồi",
      "Nước mắm",
      "Rau thơm"
    ],
    instructions: [
      "Niêu xương bò 2-3 tiếng",
      "Thái thịt bò mỏng",
      "Chuẩn bị rau thơm",
      "Trần bánh phở",
      "Múc nước dùng vào t그릇",
      "Thêm thịt và rau thơm",
      "Thưởng thức nóng"
    ],
    difficulty: "Khó",
    calories: 380,
    tags: ["Việt Nam", "Truyền thống", "Ngon"]
  },
  {
    title: "Gỏi cuốn tôm thịt",
    image: "/images/goi-cuon-tom-thit.jpg",
    prepTime: 45,
    servings: 4,
    category: "Khai vị",
    ingredients: [
      "Bánh tráng",
      "Tôm luộc",
      "Thịt heo luộc",
      "Bún tươi",
      "Rau xà lách",
      "Rau thơm",
      "Tương ớt pha"
    ],
    instructions: [
      "Luộc tôm và thịt heo",
      "Chuẩn bị rau sạch",
      "Làm mềm bánh tráng",
      "Đặt nguyên liệu lên bánh tráng",
      "Cuốn chặt tay",
      "Chấm với nước chấm"
    ],
    difficulty: "Trung bình",
    calories: 180,
    tags: ["Việt Nam", "Healthy", "Tươi mát"]
  },
  {
    title: "Cơm gà Hải Nam",
    image: "/images/com-ga-hai-nam.jpg",
    prepTime: 90,
    servings: 3,
    category: "Món chính",
    ingredients: [
      "1 con gà",
      "Gạo thơm",
      "Gừng",
      "Hành tây",
      "Tỏi",
      "Dầu ăn",
      "Nước mắm",
      "Rau thơm"
    ],
    instructions: [
      "Luộc gà với gừng",
      "Cho gạo vào nước luộc gà nấu cơm",
      "Làm nước chấm gừng",
      "Thái gà ra đĩa",
      "Trình bày cơm và gà",
      "Ăn kèm nước chấm và rau"
    ],
    difficulty: "Trung bình",
    calories: 520,
    tags: ["Á châu", "Đậm đà", "Bổ dưỡng"]
  },
  {
    title: "Bánh flan caramel",
    image: "/images/banh-flan-caramel.jpg",
    prepTime: 60,
    servings: 6,
    category: "Tráng miệng",
    ingredients: [
      "6 quả trứng",
      "400ml sữa tươi",
      "100g đường",
      "Vanilla",
      "50g đường làm caramel"
    ],
    instructions: [
      "Làm caramel với đường",
      "Đánh trứng với sữa và đường",
      "Lọc hỗn hợp qua rây",
      "Đổ caramel vào khuôn",
      "Đổ hỗn hợp trứng vào",
      "Hấp 30 phút",
      "Để nguội rồi thưởng thức"
    ],
    difficulty: "Trung bình",
    calories: 250,
    tags: ["Tráng miệng", "Ngọt", "Mát lạnh"]
  }
];

async function seedRecipes() {
  try {
    console.log('Seeding recipes...');
    
    for (const recipe of sampleRecipes) {
      // Generate slug from title
      const slug = recipe.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

      await prisma.recipe.upsert({
        where: { slug },
        update: {},
        create: {
          ...recipe,
          slug
        }
      });
    }
    
    console.log('Recipes seeded successfully!');
  } catch (error) {
    console.error('Error seeding recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRecipes();
