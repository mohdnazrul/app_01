import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';

const SALT_ROUNDS = 10;

export interface UpdateUserData {
  email?: string;
  password?: string;
  name?: string;
}

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  const updateData: Record<string, string> = {};

  if (data.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser && existingUser.id !== id) {
      throw new Error('Email already in use');
    }

    updateData.email = data.email;
  }

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });

  return { message: 'User deleted successfully' };
};
