import { prisma } from "../config/db";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export type CreateUserInput = {
    email: string;
    name: string;
    password: string;
};

export type UpdateUserInput = {
    name?: string;
    email?: string;
    password?: string;
};

export const UserService = {
    // ---- existing methods ----
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    },

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    },

    // ---- new CRUD methods ----

    async listUsers(): Promise<User[]> {
        return prisma.user.findMany({
            orderBy: { id: "asc" },
        });
    },

    async createUser(data: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

        return prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            },
        });
    },

    async updateUser(id: number, data: UpdateUserInput): Promise<User | null> {
        // Build update data
        const updateData: Partial<CreateUserInput> = {};

        if (data.name !== undefined) {
            updateData.name = data.name;
        }

        if (data.email !== undefined) {
            updateData.email = data.email;
        }

        if (data.password !== undefined) {
            updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
        }

        try {
            return await prisma.user.update({
                where: { id },
                data: updateData,
            });
        } catch (e) {
            // If user not found, Prisma throws; we convert to null
            return null;
        }
    },

    async deleteUser(id: number): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    },
};
