import db from "@/lib/db";
import { seedMenuItemsData } from "./menuItemData";

async function main() {
  console.log("🗑 Deleting existing MenuItems...");
  // delete all existing records
  await db.menuItem.deleteMany();
  //  console.log("🌱 Seeding new MenuItems...");

  // // insert new data
  await seedMenuItemsData();
  console.log("✅ MenuItems seeded successfully");
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

// import {
//   ItemCategory,
//   NotificationType,
//   OrderStatus,
//   OrderType,
//   PaymentMethod,
//   PaymentStatus,
//   PreparationStation,
//   PrismaClient,
//   UserRole,
// } from "@/generated/client";
// import db from "@/lib/db";
// import { hash } from "bcryptjs";
// import {
//   addDays,
//   addHours,
//   addMinutes,
//   subDays,
//   subHours,
//   startOfDay,
//   endOfDay,
//   setHours,
//   setMinutes,
//   setSeconds,
// } from "date-fns";

// async function main() {
//   console.log("🌱 Starting seed...");

//   // Clear existing data (optional - be careful in production!)
//   await clearDatabase();

//   // Create data in sequence
//   await createUsers();
//   await createTables();
//   await createInventory();
//   await createMenuItems();
//   // await createCarts();
//   await createOrders();
//   await createReservations();
//   await createStaffShifts();
//   await createNotifications();

//   console.log("✅ Seed completed successfully!");
// }

// async function clearDatabase() {
//   console.log("Clearing existing data...");

//   const tablenames = await db.$queryRaw<
//     Array<{ tablename: string }>
//   >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

//   for (const { tablename } of tablenames) {
//     if (tablename !== "_prisma_migrations") {
//       try {
//         await db.$executeRawUnsafe(
//           `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
//         );
//       } catch (error) {
//         console.log(`Error truncating ${tablename}:`, error);
//       }
//     }
//   }
// }

// async function createUsers() {
//   console.log("Creating users...");

//   const hashedPassword = await hash("password123", 10);

//   // Create admin users
//   const admin1 = await db.user.create({
//     data: {
//       name: "John Manager",
//       email: "john@restaurant.com",
//       phone: "+1234567890",
//       password: hashedPassword,
//       role: UserRole.MANAGER,
//       loyalityPoints: 500,
//       addresses: {
//         create: [
//           {
//             name: "Home",
//             phone: "+1234567890",
//             street: "123 Main St",
//             city: "New York",
//             state: "NY",
//             postalCode: "10001",
//             country: "USA",
//             isDefault: true,
//           },
//         ],
//       },
//     },
//   });

//   const admin2 = await db.user.create({
//     data: {
//       name: "Sarah Admin",
//       email: "sarah@restaurant.com",
//       phone: "+1234567891",
//       password: hashedPassword,
//       role: UserRole.MANAGER,
//       loyalityPoints: 750,
//     },
//   });

//   // Create chef users
//   const chef1 = await db.user.create({
//     data: {
//       name: "Michael Gordon",
//       email: "michael@restaurant.com",
//       phone: "+1234567892",
//       password: hashedPassword,
//       role: UserRole.CHEF,
//       loyalityPoints: 0,
//     },
//   });

//   const chef2 = await db.user.create({
//     data: {
//       name: "Emma Thompson",
//       email: "emma@restaurant.com",
//       phone: "+1234567893",
//       password: hashedPassword,
//       role: UserRole.CHEF,
//       loyalityPoints: 0,
//     },
//   });

//   // Create bartender users
//   const bartender1 = await db.user.create({
//     data: {
//       name: "David Martinez",
//       email: "david@restaurant.com",
//       phone: "+1234567894",
//       password: hashedPassword,
//       role: UserRole.BARTENDER,
//       loyalityPoints: 0,
//     },
//   });

//   // Create waiter users
//   const waiter1 = await db.user.create({
//     data: {
//       name: "Lisa Chen",
//       email: "lisa@restaurant.com",
//       phone: "+1234567895",
//       password: hashedPassword,
//       role: UserRole.WAITER,
//       loyalityPoints: 0,
//     },
//   });

//   const waiter2 = await db.user.create({
//     data: {
//       name: "James Wilson",
//       email: "james@restaurant.com",
//       phone: "+1234567896",
//       password: hashedPassword,
//       role: UserRole.WAITER,
//       loyalityPoints: 0,
//     },
//   });

//   // Create regular customers (50 customers)
//   const customers = [];
//   const firstNames = [
//     "Alice",
//     "Bob",
//     "Charlie",
//     "Diana",
//     "Eve",
//     "Frank",
//     "Grace",
//     "Henry",
//     "Ivy",
//     "Jack",
//     "Karen",
//     "Leo",
//     "Mona",
//     "Nick",
//     "Olga",
//     "Paul",
//     "Quinn",
//     "Rose",
//     "Sam",
//     "Tina",
//     "Umar",
//     "Vera",
//     "Will",
//     "Xena",
//     "Yuri",
//     "Zara",
//     "Adam",
//     "Bella",
//     "Chris",
//     "Dora",
//     "Eric",
//     "Fiona",
//     "George",
//     "Hannah",
//     "Ian",
//     "Julia",
//     "Kevin",
//     "Laura",
//     "Mike",
//     "Nina",
//     "Oscar",
//     "Patricia",
//     "Quentin",
//     "Rachel",
//     "Steve",
//     "Tracy",
//     "Ulysses",
//     "Victoria",
//     "Walter",
//     "Xavier",
//   ];

//   const lastNames = [
//     "Smith",
//     "Johnson",
//     "Williams",
//     "Brown",
//     "Jones",
//     "Garcia",
//     "Miller",
//     "Davis",
//     "Rodriguez",
//     "Martinez",
//     "Hernandez",
//     "Lopez",
//     "Gonzalez",
//     "Wilson",
//     "Anderson",
//     "Thomas",
//     "Taylor",
//     "Moore",
//     "Jackson",
//     "Martin",
//     "Lee",
//     "Perez",
//     "Thompson",
//     "White",
//     "Harris",
//     "Sanchez",
//     "Clark",
//     "Ramirez",
//     "Lewis",
//     "Robinson",
//   ];

//   for (let i = 0; i < 50; i++) {
//     const firstName = firstNames[i % firstNames.length];
//     const lastName = lastNames[Math.floor(i / 2) % lastNames.length];
//     const daysAgo = Math.floor(Math.random() * 365); // Random signup date in last year

//     const customer = await db.user.create({
//       data: {
//         name: `${firstName} ${lastName}`,
//         email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
//         phone: `+1${Math.floor(1000000000 + Math.random() * 900000000)}`,
//         password: i < 10 ? hashedPassword : null, // Some users have password, some don't (social login)
//         role: UserRole.USER,
//         loyalityPoints: Math.floor(Math.random() * 1000),
//         createdAt: subDays(new Date(), daysAgo),
//         addresses:
//           Math.random() > 0.3
//             ? {
//                 // 70% have addresses
//                 create: [
//                   {
//                     name: "Home",
//                     phone: `+1${Math.floor(1000000000 + Math.random() * 900000000)}`,
//                     street: `${Math.floor(100 + Math.random() * 900)} ${["Main", "Oak", "Pine", "Maple", "Cedar"][Math.floor(Math.random() * 5)]} St`,
//                     city: [
//                       "New York",
//                       "Los Angeles",
//                       "Chicago",
//                       "Houston",
//                       "Phoenix",
//                     ][Math.floor(Math.random() * 5)],
//                     state: ["NY", "CA", "IL", "TX", "AZ"][
//                       Math.floor(Math.random() * 5)
//                     ],
//                     postalCode: `${Math.floor(10000 + Math.random() * 90000)}`,
//                     country: "USA",
//                     isDefault: true,
//                   },
//                 ],
//               }
//             : undefined,
//       },
//     });
//     customers.push(customer);
//   }

//   console.log(`Created ${customers.length + 8} users`);
//   return {
//     admin1,
//     admin2,
//     chef1,
//     chef2,
//     bartender1,
//     waiter1,
//     waiter2,
//     customers,
//   };
// }

// async function createTables() {
//   console.log("Creating tables...");

//   const tables = [];
//   for (let i = 1; i <= 20; i++) {
//     const table = await db.table.create({
//       data: {
//         tableNumber: i,
//         capacity: [2, 4, 6, 8][Math.floor(Math.random() * 4)],
//         isAvailable: true,
//         location: ["Window", "Patio", "Main Hall", "Private Room", "Bar Area"][
//           Math.floor(Math.random() * 5)
//         ],
//       },
//     });
//     tables.push(table);
//   }

//   console.log(`Created ${tables.length} tables`);
//   return tables;
// }

// async function createInventory() {
//   console.log("Creating inventory...");

//   const inventoryItems = [
//     // Vegetables
//     {
//       name: "Tomatoes",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 10,
//       quantity: 25,
//     },
//     {
//       name: "Onions",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 15,
//       quantity: 30,
//     },
//     {
//       name: "Potatoes",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 20,
//       quantity: 45,
//     },
//     {
//       name: "Lettuce",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 8,
//     },
//     {
//       name: "Bell Peppers",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 12,
//     },
//     {
//       name: "Garlic",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 3,
//       quantity: 4,
//     },
//     {
//       name: "Spinach",
//       category: "Vegetables",
//       unit: "kg",
//       minThreshold: 4,
//       quantity: 3,
//     }, // Low stock

//     // Meats
//     {
//       name: "Chicken Breast",
//       category: "Meat",
//       unit: "kg",
//       minThreshold: 15,
//       quantity: 22,
//     },
//     {
//       name: "Beef Tenderloin",
//       category: "Meat",
//       unit: "kg",
//       minThreshold: 10,
//       quantity: 18,
//     },
//     {
//       name: "Salmon Fillet",
//       category: "Seafood",
//       unit: "kg",
//       minThreshold: 8,
//       quantity: 12,
//     },
//     {
//       name: "Shrimp",
//       category: "Seafood",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 7,
//     },
//     {
//       name: "Pork Chops",
//       category: "Meat",
//       unit: "kg",
//       minThreshold: 8,
//       quantity: 6,
//     }, // Low stock
//     {
//       name: "Lamb Rack",
//       category: "Meat",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 2,
//     }, // Critical

//     // Dairy
//     {
//       name: "Milk",
//       category: "Dairy",
//       unit: "liters",
//       minThreshold: 20,
//       quantity: 35,
//     },
//     {
//       name: "Cream",
//       category: "Dairy",
//       unit: "liters",
//       minThreshold: 10,
//       quantity: 15,
//     },
//     {
//       name: "Butter",
//       category: "Dairy",
//       unit: "kg",
//       minThreshold: 8,
//       quantity: 12,
//     },
//     {
//       name: "Cheese",
//       category: "Dairy",
//       unit: "kg",
//       minThreshold: 10,
//       quantity: 14,
//     },
//     {
//       name: "Eggs",
//       category: "Dairy",
//       unit: "dozen",
//       minThreshold: 30,
//       quantity: 45,
//     },
//     {
//       name: "Yogurt",
//       category: "Dairy",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 2,
//     }, // Critical

//     // Beverages
//     {
//       name: "Coffee Beans",
//       category: "Beverages",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 8,
//     },
//     {
//       name: "Tea Leaves",
//       category: "Beverages",
//       unit: "kg",
//       minThreshold: 3,
//       quantity: 4,
//     },
//     {
//       name: "Orange Juice",
//       category: "Beverages",
//       unit: "liters",
//       minThreshold: 10,
//       quantity: 12,
//     },
//     {
//       name: "Soda Syrup",
//       category: "Beverages",
//       unit: "liters",
//       minThreshold: 15,
//       quantity: 18,
//     },

//     // Alcohol
//     {
//       name: "Vodka",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 10,
//       quantity: 25,
//     },
//     {
//       name: "Whiskey",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 8,
//       quantity: 15,
//     },
//     {
//       name: "Gin",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 6,
//       quantity: 10,
//     },
//     {
//       name: "Rum",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 6,
//       quantity: 12,
//     },
//     {
//       name: "Tequila",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 5,
//       quantity: 3,
//     }, // Low stock
//     {
//       name: "Red Wine",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 15,
//       quantity: 28,
//     },
//     {
//       name: "White Wine",
//       category: "Alcohol",
//       unit: "bottles",
//       minThreshold: 15,
//       quantity: 22,
//     },
//     {
//       name: "Beer",
//       category: "Alcohol",
//       unit: "cases",
//       minThreshold: 20,
//       quantity: 35,
//     },

//     // Dry Goods
//     {
//       name: "Flour",
//       category: "Dry Goods",
//       unit: "kg",
//       minThreshold: 25,
//       quantity: 40,
//     },
//     {
//       name: "Sugar",
//       category: "Dry Goods",
//       unit: "kg",
//       minThreshold: 20,
//       quantity: 35,
//     },
//     {
//       name: "Rice",
//       category: "Dry Goods",
//       unit: "kg",
//       minThreshold: 20,
//       quantity: 30,
//     },
//     {
//       name: "Pasta",
//       category: "Dry Goods",
//       unit: "kg",
//       minThreshold: 15,
//       quantity: 18,
//     },
//     {
//       name: "Olive Oil",
//       category: "Dry Goods",
//       unit: "liters",
//       minThreshold: 10,
//       quantity: 14,
//     },
//     {
//       name: "Spices",
//       category: "Dry Goods",
//       unit: "kg",
//       minThreshold: 5,
//       quantity: 7,
//     },

//     // Cleaning Supplies
//     {
//       name: "Dish Soap",
//       category: "Cleaning",
//       unit: "bottles",
//       minThreshold: 5,
//       quantity: 8,
//     },
//     {
//       name: "Sanitizer",
//       category: "Cleaning",
//       unit: "bottles",
//       minThreshold: 5,
//       quantity: 6,
//     },
//     {
//       name: "Paper Towels",
//       category: "Cleaning",
//       unit: "rolls",
//       minThreshold: 20,
//       quantity: 25,
//     },
//   ];

//   for (const item of inventoryItems) {
//     await db.inventory.create({
//       data: {
//         itemName: item.name,
//         category: item.category,
//         quantity: item.quantity,
//         unit: item.unit,
//         minThreshold: item.minThreshold,
//         lastRestocked: subDays(new Date(), Math.floor(Math.random() * 7)),
//       },
//     });
//   }

//   console.log(`Created ${inventoryItems.length} inventory items`);
// }

// async function createMenuItems() {
//   console.log("Creating menu items...");

//   const menuItems = [
//     // Appetizers
//     {
//       name: "Bruschetta",
//       description:
//         "Toasted bread topped with fresh tomatoes, garlic, and basil",
//       price: 8.99,
//       category: ItemCategory.APPETIZER,
//       station: PreparationStation.KITCHEN,
//       prepTime: 10,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 250,
//       ingredients: ["Bread", "Tomatoes", "Garlic", "Basil", "Olive Oil"],
//       tags: ["Vegetarian", "Italian"],
//       imageUrl: "/images/bruschetta.jpg",
//     },
//     {
//       name: "Calamari Fritti",
//       description: "Crispy fried squid served with marinara sauce",
//       price: 12.99,
//       category: ItemCategory.APPETIZER,
//       station: PreparationStation.FRY_STATION,
//       prepTime: 15,
//       vegetarian: false,
//       spicy: false,
//       alcoholic: false,
//       calories: 450,
//       ingredients: ["Squid", "Flour", "Eggs", "Breadcrumbs", "Marinara"],
//       tags: ["Seafood", "Fried"],
//       imageUrl: "/images/calamari.jpg",
//     },
//     {
//       name: "Stuffed Mushrooms",
//       description: "Mushrooms filled with herb cream cheese and breadcrumbs",
//       price: 10.99,
//       category: ItemCategory.APPETIZER,
//       station: PreparationStation.KITCHEN,
//       prepTime: 12,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 320,
//       ingredients: ["Mushrooms", "Cream Cheese", "Herbs", "Breadcrumbs"],
//       tags: ["Vegetarian", "Baked"],
//       imageUrl: "/images/stuffed-mushrooms.jpg",
//     },

//     // Main Courses
//     {
//       name: "Grilled Salmon",
//       description:
//         "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables",
//       price: 24.99,
//       category: ItemCategory.MAIN_COURSE,
//       station: PreparationStation.GRILL_STATION,
//       prepTime: 20,
//       vegetarian: false,
//       spicy: false,
//       alcoholic: false,
//       calories: 650,
//       ingredients: ["Salmon", "Lemon", "Butter", "Vegetables", "Herbs"],
//       tags: ["Seafood", "Healthy"],
//       imageUrl: "/images/grilled-salmon.jpg",
//     },
//     {
//       name: "Beef Tenderloin",
//       description: "8oz center-cut beef tenderloin with red wine reduction",
//       price: 34.99,
//       category: ItemCategory.MAIN_COURSE,
//       station: PreparationStation.GRILL_STATION,
//       prepTime: 25,
//       vegetarian: false,
//       spicy: false,
//       alcoholic: true,
//       calories: 800,
//       ingredients: ["Beef", "Red Wine", "Butter", "Thyme", "Garlic"],
//       tags: ["Premium", "Steak"],
//       imageUrl: "/images/beef-tenderloin.jpg",
//     },
//     {
//       name: "Chicken Parmesan",
//       description: "Breaded chicken breast with marinara and melted mozzarella",
//       price: 18.99,
//       category: ItemCategory.MAIN_COURSE,
//       station: PreparationStation.KITCHEN,
//       prepTime: 18,
//       vegetarian: false,
//       spicy: false,
//       alcoholic: false,
//       calories: 950,
//       ingredients: [
//         "Chicken",
//         "Marinara",
//         "Mozzarella",
//         "Parmesan",
//         "Breadcrumbs",
//       ],
//       tags: ["Italian", "Popular"],
//       imageUrl: "/images/chicken-parmesan.jpg",
//     },
//     {
//       name: "Vegetable Lasagna",
//       description: "Layers of pasta with seasonal vegetables and three cheeses",
//       price: 16.99,
//       category: ItemCategory.MAIN_COURSE,
//       station: PreparationStation.KITCHEN,
//       prepTime: 15,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 720,
//       ingredients: ["Pasta", "Zucchini", "Spinach", "Ricotta", "Mozzarella"],
//       tags: ["Vegetarian", "Italian"],
//       imageUrl: "/images/vegetable-lasagna.jpg",
//     },

//     // Desserts
//     {
//       name: "Tiramisu",
//       description:
//         "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
//       price: 8.99,
//       category: ItemCategory.DESSERT,
//       station: PreparationStation.DESSERT_STATION,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 450,
//       ingredients: ["Ladyfingers", "Coffee", "Mascarpone", "Cocoa", "Rum"],
//       tags: ["Italian", "Popular"],
//       imageUrl: "/images/tiramisu.jpg",
//     },
//     {
//       name: "Chocolate Lava Cake",
//       description:
//         "Warm chocolate cake with a molten center, served with vanilla ice cream",
//       price: 9.99,
//       category: ItemCategory.DESSERT,
//       station: PreparationStation.DESSERT_STATION,
//       prepTime: 12,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 580,
//       ingredients: ["Chocolate", "Butter", "Eggs", "Flour", "Sugar"],
//       tags: ["Chocolate", "Warm"],
//       imageUrl: "/images/lava-cake.jpg",
//     },
//     {
//       name: "New York Cheesecake",
//       description: "Creamy classic cheesecake with berry compote",
//       price: 7.99,
//       category: ItemCategory.DESSERT,
//       station: PreparationStation.DESSERT_STATION,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 520,
//       ingredients: [
//         "Cream Cheese",
//         "Graham Crackers",
//         "Sugar",
//         "Eggs",
//         "Berries",
//       ],
//       tags: ["Classic"],
//       imageUrl: "/images/cheesecake.jpg",
//     },

//     // Beverages
//     {
//       name: "Fresh Lemonade",
//       description: "Freshly squeezed lemons with a hint of mint",
//       price: 4.99,
//       category: ItemCategory.BEVERAGE,
//       station: PreparationStation.BAR,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 180,
//       ingredients: ["Lemons", "Sugar", "Mint", "Water"],
//       tags: ["Refreshing", "Non-Alcoholic"],
//       imageUrl: "/images/lemonade.jpg",
//     },
//     {
//       name: "Iced Caramel Latte",
//       description: "Espresso with milk, caramel syrup, and ice",
//       price: 5.99,
//       category: ItemCategory.BEVERAGE,
//       station: PreparationStation.BAR,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 250,
//       ingredients: ["Espresso", "Milk", "Caramel Syrup", "Ice"],
//       tags: ["Coffee", "Cold"],
//       imageUrl: "/images/iced-latte.jpg",
//     },
//     {
//       name: "Fresh Orange Juice",
//       description: "Freshly squeezed orange juice",
//       price: 4.99,
//       category: ItemCategory.BEVERAGE,
//       station: PreparationStation.BAR,
//       prepTime: 3,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 150,
//       ingredients: ["Oranges"],
//       tags: ["Fresh", "Healthy"],
//       imageUrl: "/images/orange-juice.jpg",
//     },

//     // Alcoholic Beverages
//     {
//       name: "Classic Margarita",
//       description: "Tequila, lime juice, and orange liqueur",
//       price: 11.99,
//       category: ItemCategory.ALCOHOLIC,
//       station: PreparationStation.BAR,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 220,
//       ingredients: ["Tequila", "Lime Juice", "Triple Sec", "Simple Syrup"],
//       tags: ["Cocktail", "Popular"],
//       imageUrl: "/images/margarita.jpg",
//     },
//     {
//       name: "Old Fashioned",
//       description: "Bourbon, sugar, bitters, and orange twist",
//       price: 13.99,
//       category: ItemCategory.ALCOHOLIC,
//       station: PreparationStation.BAR,
//       prepTime: 5,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 190,
//       ingredients: [
//         "Bourbon",
//         "Sugar Cube",
//         "Angostura Bitters",
//         "Orange Peel",
//       ],
//       tags: ["Classic", "Strong"],
//       imageUrl: "/images/old-fashioned.jpg",
//     },
//     {
//       name: "Mojito",
//       description: "White rum, mint, lime juice, sugar, and soda water",
//       price: 10.99,
//       category: ItemCategory.ALCOHOLIC,
//       station: PreparationStation.BAR,
//       prepTime: 6,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 180,
//       ingredients: ["Rum", "Mint", "Lime", "Sugar", "Soda Water"],
//       tags: ["Refreshing", "Popular"],
//       imageUrl: "/images/mojito.jpg",
//     },
//     {
//       name: "Red Wine - Cabernet",
//       description: "Full-bodied red wine with notes of black cherry and oak",
//       price: 9.99,
//       category: ItemCategory.ALCOHOLIC,
//       station: PreparationStation.BAR,
//       prepTime: 2,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 125,
//       ingredients: ["Cabernet Sauvignon"],
//       tags: ["Wine", "Red"],
//       imageUrl: "/images/cabernet.jpg",
//     },

//     // Snacks
//     {
//       name: "French Fries",
//       description: "Crispy golden fries with sea salt",
//       price: 5.99,
//       category: ItemCategory.SNACK,
//       station: PreparationStation.FRY_STATION,
//       prepTime: 8,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 420,
//       ingredients: ["Potatoes", "Oil", "Salt"],
//       tags: ["Classic", "Shareable"],
//       imageUrl: "/images/fries.jpg",
//     },
//     {
//       name: "Truffle Fries",
//       description: "Fries with truffle oil, parmesan, and parsley",
//       price: 8.99,
//       category: ItemCategory.SNACK,
//       station: PreparationStation.FRY_STATION,
//       prepTime: 10,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 480,
//       ingredients: ["Potatoes", "Truffle Oil", "Parmesan", "Parsley"],
//       tags: ["Gourmet", "Shareable"],
//       imageUrl: "/images/truffle-fries.jpg",
//     },
//     {
//       name: "Onion Rings",
//       description: "Beer-battered onion rings with dipping sauce",
//       price: 6.99,
//       category: ItemCategory.SNACK,
//       station: PreparationStation.FRY_STATION,
//       prepTime: 10,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: true,
//       calories: 520,
//       ingredients: ["Onions", "Beer Batter", "Flour", "Spices"],
//       tags: ["Shareable", "Fried"],
//       imageUrl: "/images/onion-rings.jpg",
//     },

//     // Side Dishes
//     {
//       name: "Garlic Mashed Potatoes",
//       description: "Creamy mashed potatoes with roasted garlic",
//       price: 4.99,
//       category: ItemCategory.SIDE_DISH,
//       station: PreparationStation.KITCHEN,
//       prepTime: 10,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 280,
//       ingredients: ["Potatoes", "Garlic", "Butter", "Cream"],
//       tags: ["Comfort Food"],
//       imageUrl: "/images/mashed-potatoes.jpg",
//     },
//     {
//       name: "Grilled Vegetables",
//       description: "Seasonal vegetables grilled with herbs",
//       price: 5.99,
//       category: ItemCategory.SIDE_DISH,
//       station: PreparationStation.GRILL_STATION,
//       prepTime: 8,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 120,
//       ingredients: ["Zucchini", "Bell Peppers", "Eggplant", "Herbs"],
//       tags: ["Healthy", "Vegetarian"],
//       imageUrl: "/images/grilled-vegetables.jpg",
//     },
//     {
//       name: "Steamed Broccoli",
//       description: "Fresh broccoli with lemon butter",
//       price: 4.99,
//       category: ItemCategory.SIDE_DISH,
//       station: PreparationStation.KITCHEN,
//       prepTime: 6,
//       vegetarian: true,
//       spicy: false,
//       alcoholic: false,
//       calories: 80,
//       ingredients: ["Broccoli", "Lemon", "Butter"],
//       tags: ["Healthy", "Light"],
//       imageUrl: "/images/broccoli.jpg",
//     },
//   ];

//   const createdItems = [];
//   for (const item of menuItems) {
//     const menuItem = await db.menuItem.create({
//       data: {
//         name: item.name,
//         description: item.description,
//         price: item.price,
//         category: item.category,
//         preparationStation: item.station,
//         preparationTime: item.prepTime,
//         isVegetarian: item.vegetarian,
//         isSpicy: item.spicy,
//         isAlcoholic: item.alcoholic,
//         calories: item.calories,
//         ingredients: item.ingredients,
//         tags: item.tags,
//         imageUrl: item.imageUrl,
//         isAvailable: Math.random() > 0.1, // 90% available
//       },
//     });
//     createdItems.push(menuItem);
//   }

//   console.log(`Created ${createdItems.length} menu items`);
//   return createdItems;
// }

// // async function createCarts() {
// //   console.log("Creating shopping carts...");

// //   const users = await db.user.findMany({
// //     where: { role: UserRole.USER },
// //     take: 20,
// //   });

// //   const menuItems = await db.menuItem.findMany();

// //   for (const user of users) {
// //     if (Math.random() > 0.7) {
// //       // 30% of users have active carts
// //       const cart = await db.cart.create({
// //         data: {
// //           userId: user.id,
// //         },
// //       });

// //       // Add 1-5 random items to cart
// //       const numItems = Math.floor(Math.random() * 5) + 1;
// //       for (let i = 0; i < numItems; i++) {
// //         const menuItem =
// //           menuItems[Math.floor(Math.random() * menuItems.length)];
// //         await db.cartItem.create({
// //           data: {
// //             cartId: cart.id,
// //             menuItemId: menuItem.id,
// //             quantity: Math.floor(Math.random() * 3) + 1,
// //             specialInstructions:
// //               Math.random() > 0.7 ? "No onions please" : null,
// //           },
// //         });
// //       }
// //     }
// //   }

// //   // Create some guest carts
// //   for (let i = 0; i < 5; i++) {
// //     const sessionId = `session_${Math.random().toString(36).substring(7)}`;
// //     const cart = await db.cart.create({
// //       data: {
// //         sessionId,
// //       },
// //     });

// //     const numItems = Math.floor(Math.random() * 3) + 1;
// //     for (let j = 0; j < numItems; j++) {
// //       const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
// //       await db.cartItem.create({
// //         data: {
// //           cartId: cart.id,
// //           menuItemId: menuItem.id,
// //           quantity: Math.floor(Math.random() * 2) + 1,
// //         },
// //       });
// //     }
// //   }

// //   console.log("Created carts");
// // }

// async function createOrders() {
//   console.log("Creating orders...");

//   const users = await db.user.findMany({
//     where: { role: UserRole.USER },
//   });

//   const menuItems = await db.menuItem.findMany();
//   const addresses = await db.address.findMany();
//   const tables = await db.table.findMany();

//   // Generate orders for the last 90 days
//   const startDate = subDays(new Date(), 90);
//   const endDate = new Date();

//   let orderNumber = 1000;
//   const orders = [];

//   for (let day = 0; day <= 90; day++) {
//     const currentDate = addDays(startDate, day);

//     // Determine number of orders for this day (weekends have more orders)
//     const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
//     const baseOrders = isWeekend ? 30 : 20;

//     // Add some randomness
//     const numOrders = Math.floor(baseOrders + (Math.random() * 20 - 10));

//     for (let i = 0; i < numOrders; i++) {
//       // Random order time throughout the day (peak hours: 12-2pm, 6-9pm)
//       let hour;
//       if (Math.random() > 0.6) {
//         // Peak hours
//         hour =
//           Math.random() > 0.5
//             ? 12 + Math.floor(Math.random() * 2) // Lunch: 12-2pm
//             : 18 + Math.floor(Math.random() * 3); // Dinner: 6-9pm
//       } else {
//         // Off-peak
//         hour = Math.floor(Math.random() * 24);
//       }

//       const minute = Math.floor(Math.random() * 60);
//       const orderDate = setMinutes(setHours(currentDate, hour), minute);

//       // Determine order type
//       const orderTypeRoll = Math.random();
//       let orderType: OrderType;
//       let tableNumber = null;
//       let deliveryAddressId = null;

//       if (orderTypeRoll < 0.5) {
//         orderType = OrderType.DINE_IN;
//         tableNumber =
//           tables[Math.floor(Math.random() * tables.length)].tableNumber;
//       } else if (orderTypeRoll < 0.75) {
//         orderType = OrderType.TAKEAWAY;
//       } else {
//         orderType = OrderType.DELIVERY;
//         deliveryAddressId =
//           addresses.length > 0
//             ? addresses[Math.floor(Math.random() * addresses.length)].id
//             : null;
//       }

//       // Random user (80% registered, 20% guest - represented by random user)
//       const user = users[Math.floor(Math.random() * users.length)];

//       // Generate order items
//       const numItems = Math.floor(Math.random() * 4) + 1;
//       const orderItems = [];
//       let totalAmount = 0;

//       for (let j = 0; j < numItems; j++) {
//         const menuItem =
//           menuItems[Math.floor(Math.random() * menuItems.length)];
//         const quantity = Math.floor(Math.random() * 3) + 1;
//         const unitPrice = menuItem.price;
//         const totalPrice = unitPrice * quantity;
//         totalAmount += totalPrice;

//         orderItems.push({
//           menuItemId: menuItem.id,
//           quantity,
//           unitPrice,
//           totalPrice,
//           specialInstructions:
//             Math.random() > 0.8 ? "Extra sauce please" : null,
//         });
//       }

//       // Calculate taxes and discounts
//       const taxAmount = totalAmount * 0.08; // 8% tax
//       const discountAmount = Math.random() > 0.9 ? totalAmount * 0.1 : 0; // 10% discount occasionally
//       const finalAmount = totalAmount + taxAmount - discountAmount;

//       // Determine order status based on order date
//       let status: OrderStatus;
//       let paymentStatus: PaymentStatus;
//       const now = new Date();

//       if (orderDate > now) {
//         // Future orders (shouldn't happen, but just in case)
//         status = OrderStatus.PENDING;
//         paymentStatus = PaymentStatus.PENDING;
//       } else {
//         const hoursSinceOrder =
//           (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

//         if (hoursSinceOrder < 1) {
//           // Recent orders
//           const statusRoll = Math.random();
//           if (statusRoll < 0.3) status = OrderStatus.PENDING;
//           else if (statusRoll < 0.6) status = OrderStatus.CONFIRMED;
//           else if (statusRoll < 0.8) status = OrderStatus.PREPARING;
//           else status = OrderStatus.READY;

//           paymentStatus =
//             Math.random() > 0.2 ? PaymentStatus.PAID : PaymentStatus.PENDING;
//         } else if (hoursSinceOrder < 3) {
//           // Orders from a few hours ago
//           const statusRoll = Math.random();
//           if (statusRoll < 0.2) status = OrderStatus.PREPARING;
//           else if (statusRoll < 0.5) status = OrderStatus.READY;
//           else if (statusRoll < 0.8) status = OrderStatus.SERVED;
//           else status = OrderStatus.COMPLETED;

//           paymentStatus =
//             Math.random() > 0.1 ? PaymentStatus.PAID : PaymentStatus.PENDING;
//         } else {
//           // Older orders - mostly completed
//           const statusRoll = Math.random();
//           if (statusRoll < 0.7) status = OrderStatus.COMPLETED;
//           else if (statusRoll < 0.85) status = OrderStatus.CANCELLED;
//           else status = OrderStatus.SERVED;

//           paymentStatus =
//             status === OrderStatus.CANCELLED
//               ? PaymentStatus.REFUNDED
//               : Math.random() > 0.05
//                 ? PaymentStatus.PAID
//                 : PaymentStatus.FAILED;
//         }
//       }

//       // Calculate timestamps based on status
//       let estimatedReadyTime = null;
//       let readyAt = null;
//       let servedAt = null;
//       let completedAt = null;
//       let cancelledAt = null;

//       if (status !== OrderStatus.PENDING && status !== OrderStatus.CANCELLED) {
//         estimatedReadyTime = addMinutes(orderDate, 25); // Estimated 25 min prep time
//       }

//       if (
//         status === OrderStatus.READY ||
//         status === OrderStatus.SERVED ||
//         status === OrderStatus.COMPLETED
//       ) {
//         readyAt = addMinutes(orderDate, 20 + Math.floor(Math.random() * 10));
//       }

//       if (status === OrderStatus.SERVED || status === OrderStatus.COMPLETED) {
//         servedAt = addMinutes(
//           readyAt || orderDate,
//           5 + Math.floor(Math.random() * 10),
//         );
//       }

//       if (status === OrderStatus.COMPLETED) {
//         completedAt = addMinutes(
//           servedAt || orderDate,
//           30 + Math.floor(Math.random() * 30),
//         );
//       }

//       if (status === OrderStatus.CANCELLED) {
//         cancelledAt = addMinutes(
//           orderDate,
//           10 + Math.floor(Math.random() * 20),
//         );
//       }

//       // Create the order
//       const order = await db.order.create({
//         data: {
//           orderNumber: `ORD-${orderNumber++}`,
//           userId: user.id,
//           tableNumber,
//           orderType,
//           status,
//           paymentStatus,
//           paymentMethod: [
//             PaymentMethod.COD,
//             PaymentMethod.ESEWA,
//             PaymentMethod.KHALTI,
//           ][Math.floor(Math.random() * 3)],
//           totalAmount,
//           taxAmount,
//           discountAmount,
//           finalAmount,
//           deliveryAddressId,
//           specialInstructions:
//             Math.random() > 0.9 ? "Please deliver to back door" : null,
//           estimatedReadyTime,
//           readyAt,
//           servedAt,
//           completedAt,
//           cancelledAt,
//           createdAt: orderDate,
//           items: {
//             create: orderItems.map((item) => ({
//               ...item,
//               isReady:
//                 status === OrderStatus.READY ||
//                 status === OrderStatus.SERVED ||
//                 status === OrderStatus.COMPLETED,
//               readyAt:
//                 status === OrderStatus.READY ||
//                 status === OrderStatus.SERVED ||
//                 status === OrderStatus.COMPLETED
//                   ? addMinutes(orderDate, 20 + Math.floor(Math.random() * 10))
//                   : null,
//             })),
//           },
//         },
//       });

//       orders.push(order);

//       // Create station assignments for each item
//       const orderItemsFromDb = await db.orderItem.findMany({
//         where: { orderId: order.id },
//         include: { menuItem: true },
//       });

//       for (const orderItem of orderItemsFromDb) {
//         await db.orderStationAssignment.create({
//           data: {
//             orderItemId: orderItem.id,
//             station: orderItem.menuItem.preparationStation,
//             assignedTo: null, // Will be assigned in staff shifts
//             status: orderItem.isReady ? "COMPLETED" : "PENDING",
//             estimatedCompletionTime: addMinutes(
//               orderDate,
//               orderItem.menuItem.preparationTime,
//             ),
//             startedAt: orderItem.isReady ? addMinutes(orderDate, 5) : null,
//             completedAt: orderItem.readyAt,
//           },
//         });
//       }

//       // Create payment record
//       if (order.paymentMethod) {
//         await db.payment.create({
//           data: {
//             orderId: order.id,
//             amount: finalAmount,
//             paymentMethod: order.paymentMethod,
//             status: order.paymentStatus,
//             transactionId: `TXN-${Math.random().toString(36).substring(7).toUpperCase()}`,
//             paymentGateway: ["Stripe", "PayPal", "ESEWA"][
//               Math.floor(Math.random() * 3)
//             ],
//             paidAt:
//               order.paymentStatus === PaymentStatus.PAID
//                 ? addMinutes(orderDate, 5)
//                 : null,
//           },
//         });
//       }
//     }
//   }

//   console.log(`Created ${orders.length} orders`);
//   return orders;
// }

// async function createReservations() {
//   console.log("Creating reservations...");

//   const users = await db.user.findMany({
//     where: { role: UserRole.USER },
//   });
//   const tables = await db.table.findMany();

//   // Create reservations for the next 30 days
//   const startDate = new Date();
//   const endDate = addDays(startDate, 30);

//   for (let day = 0; day < 30; day++) {
//     const currentDate = addDays(startDate, day);

//     // More reservations on weekends
//     const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
//     const numReservations = isWeekend ? 15 : 8;

//     for (let i = 0; i < numReservations; i++) {
//       // Random time between 11 AM and 10 PM
//       const hour = 11 + Math.floor(Math.random() * 11);
//       const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

//       const reservationDate = setMinutes(setHours(currentDate, hour), minute);
//       const partySize = [2, 4, 6][Math.floor(Math.random() * 3)];

//       // Find available table (simplified - just assign random)
//       const table = tables[Math.floor(Math.random() * tables.length)];
//       const user = users[Math.floor(Math.random() * users.length)];

//       // Random status based on date
//       let status;
//       const now = new Date();

//       if (reservationDate < now) {
//         // Past reservations
//         const statusRoll = Math.random();
//         if (statusRoll < 0.7) status = "COMPLETED";
//         else if (statusRoll < 0.9) status = "CANCELLED";
//         else status = "CONFIRMED";
//       } else {
//         // Future reservations
//         status = Math.random() > 0.2 ? "CONFIRMED" : "PENDING";
//       }

//       await db.reservation.create({
//         data: {
//           userId: user.id,
//           reservationDate,
//           partySize,
//           tableNumber: table.tableNumber,
//           specialRequests: Math.random() > 0.7 ? "Prefer window table" : null,
//           status,
//           checkedInAt:
//             status === "COMPLETED" ? addMinutes(reservationDate, -5) : null,
//           completedAt:
//             status === "COMPLETED" ? addMinutes(reservationDate, 90) : null,
//           cancelledAt:
//             status === "CANCELLED" ? addMinutes(reservationDate, -30) : null,
//           tables: {
//             connect: { id: table.id },
//           },
//         },
//       });
//     }
//   }

//   console.log("Created reservations");
// }

// async function createStaffShifts() {
//   console.log("Creating staff shifts...");

//   const staff = await db.user.findMany({
//     where: {
//       role: {
//         in: [
//           UserRole.CHEF,
//           UserRole.BARTENDER,
//           UserRole.WAITER,
//           UserRole.MANAGER,
//         ],
//       },
//     },
//   });

//   // Create shifts for the last 30 days and next 7 days
//   const startDate = subDays(new Date(), 30);
//   const endDate = addDays(new Date(), 7);

//   for (let day = 0; day <= 37; day++) {
//     const currentDate = addDays(startDate, day);
//     const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

//     // Different shift patterns for different roles
//     for (const staffMember of staff) {
//       // Not everyone works every day
//       const workProbability = isWeekend ? 0.6 : 0.8;
//       if (Math.random() > workProbability) continue;

//       // Determine shift time based on role
//       let startHour, endHour;

//       if (staffMember.role === UserRole.CHEF) {
//         // Chefs come early
//         startHour = 8 + Math.floor(Math.random() * 2);
//         endHour = 16 + Math.floor(Math.random() * 2);
//       } else if (staffMember.role === UserRole.BARTENDER) {
//         // Bartenders come later
//         startHour = 16 + Math.floor(Math.random() * 2);
//         endHour = 24 + Math.floor(Math.random() * 2);
//       } else {
//         // Waiters and managers have split shifts
//         const shiftType = Math.random();
//         if (shiftType < 0.4) {
//           // Morning shift
//           startHour = 10 + Math.floor(Math.random() * 2);
//           endHour = 18 + Math.floor(Math.random() * 2);
//         } else if (shiftType < 0.8) {
//           // Evening shift
//           startHour = 16 + Math.floor(Math.random() * 2);
//           endHour = 24 + Math.floor(Math.random() * 2);
//         } else {
//           // Double shift (long day)
//           startHour = 10 + Math.floor(Math.random() * 2);
//           endHour = 22 + Math.floor(Math.random() * 2);
//         }
//       }

//       const startTime = setHours(currentDate, startHour);
//       const endTime = setHours(currentDate, endHour);

//       // Determine if shift is active (checked in/out)
//       const now = new Date();
//       let checkedInAt = null;
//       let checkedOutAt = null;

//       if (currentDate.toDateString() === now.toDateString()) {
//         // Today's shift
//         if (startTime <= now) {
//           checkedInAt = startTime;
//           if (endTime <= now) {
//             checkedOutAt = endTime;
//           }
//         }
//       } else if (currentDate < now) {
//         // Past shift
//         checkedInAt = startTime;
//         checkedOutAt = endTime;
//       }

//       await db.staffShift.create({
//         data: {
//           userId: staffMember.id,
//           shiftDate: currentDate,
//           startTime,
//           endTime,
//           station:
//             staffMember.role === UserRole.CHEF
//               ? [
//                   PreparationStation.KITCHEN,
//                   PreparationStation.GRILL_STATION,
//                   PreparationStation.FRY_STATION,
//                 ][Math.floor(Math.random() * 3)]
//               : staffMember.role === UserRole.BARTENDER
//                 ? PreparationStation.BAR
//                 : null,
//           checkedInAt,
//           checkedOutAt,
//         },
//       });
//     }
//   }

//   console.log("Created staff shifts");
// }

// async function createNotifications() {
//   console.log("Creating notifications...");

//   const users = await db.user.findMany();
//   const orders = await db.order.findMany({
//     take: 50,
//     orderBy: { createdAt: "desc" },
//   });

//   const notificationTypes = [
//     NotificationType.ORDER_READY,
//     NotificationType.ORDER_PREPARING,
//     NotificationType.ORDER_SERVED,
//     NotificationType.ORDER_CANCELLED,
//     NotificationType.GENERAL,
//   ];

//   // Create notifications for users
//   for (const user of users) {
//     const numNotifications = Math.floor(Math.random() * 10) + 5;

//     for (let i = 0; i < numNotifications; i++) {
//       const daysAgo = Math.floor(Math.random() * 30);
//       const notificationDate = subDays(new Date(), daysAgo);

//       const type =
//         notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
//       const order =
//         Math.random() > 0.5 && orders.length > 0
//           ? orders[Math.floor(Math.random() * orders.length)]
//           : null;

//       let title, message;
//       switch (type) {
//         case NotificationType.ORDER_READY:
//           title = "Order Ready for Pickup";
//           message = `Your order #${order?.orderNumber || "ORD-1234"} is ready for pickup.`;
//           break;
//         case NotificationType.ORDER_PREPARING:
//           title = "Order is Being Prepared";
//           message = `Your order #${order?.orderNumber || "ORD-1234"} is now being prepared.`;
//           break;
//         case NotificationType.ORDER_SERVED:
//           title = "Order Served";
//           message = `Your order #${order?.orderNumber || "ORD-1234"} has been served. Enjoy your meal!`;
//           break;
//         case NotificationType.ORDER_CANCELLED:
//           title = "Order Cancelled";
//           message = `Your order #${order?.orderNumber || "ORD-1234"} has been cancelled.`;
//           break;
//         default:
//           title = "Special Offer";
//           message = "Check out our new seasonal menu items!";
//       }

//       await db.notification.create({
//         data: {
//           userId: user.id,
//           orderId: order?.id,
//           type,
//           title,
//           message,
//           isRead: Math.random() > 0.3, // 70% read
//           createdAt: notificationDate,
//         },
//       });
//     }
//   }

//   console.log("Created notifications");
// }

// main()
//   .catch((e) => {
//     console.error("Error during seed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });
