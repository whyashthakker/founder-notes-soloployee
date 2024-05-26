const { placeholderNotes } = require("./placeholder-data");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    placeholderNotes.map(async (note) => {
      await prisma.note.upsert({
        where: {
          slug: note.slug,
        },
        update: note,
        create: note,
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
