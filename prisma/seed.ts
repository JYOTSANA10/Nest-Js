// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.user.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       email: 'jyotsanachauhan1010@gmail.com',
//       pass: 'JJjj1010',
//       role: "Admin",
//     },
//   });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
