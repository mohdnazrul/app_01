import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
    const hashedPassword = await bcrypt.hash("password", SALT_ROUNDS);

    await prisma.user.upsert({
        where: { email: "demo@example.com" },
        update: {
            // ✅ overwrite existing row with hashed password
            name: "Demo User",
            password: hashedPassword,
        },
        create: {
            email: "demo@example.com",
            name: "Demo User",
            password: hashedPassword,
        },
    });

    console.log("Seed done with hashed password");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
