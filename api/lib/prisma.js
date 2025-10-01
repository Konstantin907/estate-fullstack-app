import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

// connect check:
async function testDB() {
  try {
    await prisma.$connect()
    console.log("Database connected successfully")
  } catch (err) {
    console.error("Database connection failed:", err)
  }
}
testDB()

export default prisma