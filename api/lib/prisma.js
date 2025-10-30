import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    setInterval(async () => {
      try {
        await prisma.$runCommandRaw({ ping: 1 });
        console.log("🔁 Pinged Mongo cluster to keep it alive");
      } catch (err) {
        console.error("Ping failed:", err.message);
      }
    }, 30 * 60 * 1000);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}
testDB()

export default prisma